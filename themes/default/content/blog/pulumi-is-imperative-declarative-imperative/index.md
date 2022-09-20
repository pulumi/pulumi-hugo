---
title: "Pulumi Is Imperative, Declarative and Imperative"

# The date represents the post's publish date, and by default corresponds with
# the date this file was generated. Posts with future dates are visible in development,
# but excluded from production builds. Use the time and timezone-offset portions of
# of this value to schedule posts for publishing later.
date: 2022-09-30T12:28:19+02:00

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or social-media
# previews. This field is required or the build will fail the linter test.
# Max length is 160 characters.
meta_desc: Pulumi is often debated to be imperative or declarative.
  What if I tell you that Pulumi is imperative, declarative and imperative?

# The meta_image appears in social-media previews and on the blog home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for you.
meta_image: meta.png

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - ringo-de-smet

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - cloud-engineering
    - infrastructure-as-code

# See the blogging docs at https://github.com/pulumi/pulumi-hugo/blob/master/BLOGGING.md.
# for additional details, and please remove these comments before submitting for review.
---

<!--
Summary:
- show single binary setup of Terraform: HCL processing & Engine
- show double binary setup of Pulumi: Language Host & Engine
- indicate that the chosen language (imperative or not) doesn't have any implications of the engine remaining declarative
- we chose a gRPC protocol, rather than an in-process call to request creation of resources to the engine
- the provisioning magic happens in the engine & the providers
- now comes the nifty part
- with this separation, Pulumi brings cloud engineering closer to developers
- we allow for components (Pulumi Packages) to be written in any language given a component is a resource by itself.
- we allow for policies to be written with the same ease as abstractions.
- we mix it all in a single setup

Sketch the setup of the article as the description of the PR for reviewers
-->

On a regular basis, articles and tweets pass by discussing whether or not some specific tool is imperative or declarative.
It's no surprise that Pulumi is often the tool being debated. What if I tell you that Pulumi is imperative, declarative and imperative?

<!--more-->

When we look at our [Frequently Asked Questions](/docs/support/faq/#is-pulumi-imperative-or-declarative), we read the following on the declarative versus imperative topic:

> Pulumi is a declarative tool that uses imperative languages to define your end state. The language is used for authoring your program.
> It’s not used for talking to the cloud provider API.

It is good to know to refresh what `declarative` and `imperative` mean:

> Both terms refer to how the user provides direction to the automation platform. With an imperative tool, you define the steps to execute in order to reach the desired solution. With a declarative tool, you define the desired state of the final solution, and the automation platform determines how to achieve that state. ([Source](https://www.linode.com/blog/devops/declarative-vs-imperative-in-iac/))

The title of the article mentions `imperative` and `declarative` both. Pulumi leverages the best of both worlds
into our product.

{{< tweet id="1553431913691430912" user="adamhjk" >}}

Pulumi tries to offer a solution where our customers are only limited by their imagination rather than the tool at hand.
Let me use the Pulumi architecture to highlight why I mention *imperative* twice.

## Pulumi Architecture

Here is the diagram from our [How Pulumi Works](/docs/intro/concepts/how-pulumi-works/) page:

![Pulumi Architecture](/images/docs/reference/engine-block-diagram.png)

You code your infrastructure in your preferred programming language. When you are done coding, you run `pulumi up` and the Pulumi CLI starts
the language host for your selected programming language, as well as the required providers. The interaction between these 3 parts of
the architecture results in the actual creation or modification of your infrastructure.

### Language Host

Under the hood, our Pulumi CLI does a lot of things, but one of the first actions is starting the language runtime which is configured in
the `Pulumi.yaml` project file. Here is a small Python example:

```python
from pulumi_aws import s3

bucket = s3.Bucket('bucket')

for i in range(10):
    s3.BucketObject(
        f'object-{i}',
        s3.BucketObjectArgs(
            bucket=bucket.id,
            key=str(i),
        )
    )
```

A Pulumi program models the to-be state of your infrastructure. If you read the program above, you can see that
we define 11 resources as our to be infrastructure:

* 1 [AWS S3](https://www.pulumi.com/registry/packages/aws/api-docs/s3/bucket/) bucket
* 10 [Objects](https://www.pulumi.com/registry/packages/aws/api-docs/s3/bucketobject/) in the bucket created in the previous step

The stack itself is also modelled as a resource and it is the parent to all other resources.

```sh
$ pulumi up

Updating (<masked>/dev)

View Live: https://app.pulumi.com/<masked>/blog_code/dev/updates/1

     Type                    Name           Status
 +   pulumi:pulumi:Stack     blog_code-dev  created
 +   ├─ aws:s3:Bucket        bucket         created
 +   ├─ aws:s3:BucketObject  object-0       created
 +   ├─ aws:s3:BucketObject  object-1       created
 +   ├─ aws:s3:BucketObject  object-3       created
 +   ├─ aws:s3:BucketObject  object-2       created
 +   ├─ aws:s3:BucketObject  object-6       created
 +   ├─ aws:s3:BucketObject  object-4       created
 +   ├─ aws:s3:BucketObject  object-5       created
 +   ├─ aws:s3:BucketObject  object-7       created
 +   ├─ aws:s3:BucketObject  object-9       created
 +   └─ aws:s3:BucketObject  object-8       created

Resources:
    + 12 created

Duration: 13s
```

While this is definitely an imperative program, there is one important thing to understand: instantiating an
`s3.Bucket`, `s3.BucketObject` or any other Pulumi resource should not be interpreted as an imperative creation
of the resource in the language host. Behind the scenes, any resource instantiation in the language host triggers a
`Register Resource` request to the Pulumi engine. All these `Register Resource` requests together form the
resource model you as an infrastructure developer want to get in the end.

Running your program always sends the full resource model to the Pulumi Engine regardless of what state your
current infrastructure is in.

Our previous example was shown in Python, but recently we also delivered [support for YAML](https://www.pulumi.com/docs/intro/languages/yaml/).
The creation of our S3 bucket could be converted to this snippet:

```yaml
resources:
  bucket:
    type: aws:s3:Bucket
```

The separation of language support from the engine allows us to offer both imperative & declarative solutions.
But remember that none of the supported languages do any of the provisioning directly in the language host.

If the resource provisioning is not taking place in the language host, where is the magic happening then?

### CLI and Engine

In the previous step, you found out that the language host sends requests to the engine to fullfil your to be
infrastructure.

It is now that our Pulumi engine gets to work. The engine combines the intended model of the infrastructure
received from the language host, the current state recorded in the state backend and the actual resource state
to compute which actions need to be executed to bring the actual state in line with the intended model.

Our little example contains dependencies:
every `s3.BucketObject` uses the `bucket.id` as way to define in which bucket these objects should be stored.
The property `id` from the `s3.Bucket` is an `Output`. Outputs are Pulumi's way of tracking which property of one resource
is required by another, hereby creating a dependency between the resources. Our engine uses all these outputs
passed from one resource to another as the vertices in a directed acyclic graph (DAG). The engine determines
the order of actions based on this graph.

On a first run of `pulumi up` of our example program, our engine will first create the bucket, wait for
the provisioning to be complete, after which the actual bucket id is passed to the creation of
all the bucket objects. Since none of the bucket objects depend on other resources, these bucket
objects can all be provisioned concurrently. The engine will

On a second run, assuming no modifications to our example program, the Pulumi engine will compare the to be model
with the actual state and conclude that nothing needs to be done.

Let's crank up the number of bucket objects to 11.

```python
from pulumi_aws import s3

bucket = s3.Bucket('bucket')

for i in range(11): # <- nr of objects increased by 1
    s3.BucketObject(
        f'object-{i}',
        s3.BucketObjectArgs(
            bucket=bucket.id,
            key=str(i),
        )
    )
```

The third Pulumi run will find the bucket and the first 10 objects in the state. The only action taken
now is the creation of the 11th bucket object. This brings the actual state back in sync with your
intended model.

```sh
$ pulumi up

Updating (<masked>/dev)

View Live: https://app.pulumi.com/<masked>/blog_code/dev/updates/2

     Type                    Name           Status
     pulumi:pulumi:Stack     blog_code-dev
 +   └─ aws:s3:BucketObject  object-10      created

Resources:
    + 1 created
    12 unchanged

Duration: 5s

```

Although you create the intended model of your infrastructure with an imperative language, our engine definitely
processes this in a declarative way.

### Providers

The above examples hopefully made clear that the Pulumi engine calculates a set of actions to declaratively bring
the actual state in sync with your intended model. But our engine is not the component which knows how to
talk to all the different APIs of cloud and tool vendors. That's the role of the providers.

The engine and the provider processes are connected with a gRPC connection. This is similar to the connection
between the language host and the engine, with the only difference of which requests are sent. The API
that providers expose are of a [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) nature:

* Create: create a new resource
* Check: read information of an existing resource
* Update: update an existing resource with modified information
* Delete: delete an existing resource when no longer needed

The providers receive requests from the engine dependent on the set of actions the engine calculated.
A provider doesn't know anything about the state, the correlation between resource and so forth.

The nature of the provider API is clearly imperative.

### Summary

If the question ever pops up again whether Pulumi is declarative or imperative, the answer is clearly we are both.
It is only based on which component of our architecture you are talking about:

* Language host: imperative & declarative
* Pulumi engine: declarative
* Providers: imperative

To us, it mainly matters if we can solve your infrastructure automation problem. If you still miss something
in our offering, we want to [hear from you](https://www.pulumi.com/contact/)!
