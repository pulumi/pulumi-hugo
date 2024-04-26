---
title: "Next-level IaC: Do more with languages!"
date: 2024-04-26
meta_desc: Learn how to use your language of choice to do more than simply declare cloud resources.
meta_image: meta.png
authors:
    - christian-nunciato
tags:
    - next-level-iac
    - nodejs
    - python
    - cloudformation
    - terraform
    - hcl
---

Our users are always telling us (particularly the ones who come to Pulumi from other IaC tools) that being able to use general-purpose languages to manage their infrastructure was a game changer for them.

I know it was for me. As a JavaScript developer, when I discovered Pulumi and saw that I could do pretty much everything I was doing with Terraform _but with TypeScript_, I was immediately hooked; that's all it took. For me, just being able to write my resource declarations in a full-featured language that I knew well, and that my IDE deeply understood, was huge.

But it's easy to forget, even when you've been using Pulumi for a while, that you aren't just getting the language alone --- you're getting the full breadth and capability of that language's runtime environment as well. Not just JavaScript, but all of Node.js. Not just C#, but everything the .NET framework and common-language runtime have to offer.

This is quite a big deal, actually. Whereas with other tools, you're bound by the limitations of the tool's DSL (CloudFormation YAML, Terraform HCL, etc.), with Pulumi, you have no such constraints; you can do just about anything your chosen language and runtime can do. That means much more than just declare long lists of cloud resources --- it means unlocking all sorts of capabilities that allow you do more with less, handle change easily, and really bring your infrastructure-management practice to a whole new level.

In this post, the first of a series, we'll show you a few things you can do to take advantage of this reality.

## Run pre-deployment tasks with Pulumi

Since a Pulumi program is just a regular program, you can take actions programmatically before runs --- specifically before Pulumi begins [registering resource declarations](https://www.pulumi.com/docs/concepts/how-pulumi-works).

Suppose you were writing a program to deploy a static website. With a traditional IaC tool, you might model the deployment in steps:

1. Build the website
1. Deploy the supporting infrastructure (cloud storage, content-delivery front-end)
1. Copy the content of the website into the infrastructure

To execute these steps, you might reach for something like Bash, writing a shell script similar to the following, which uses [Hugo](https://gohugo.io/), a popular static-site generator, to build the website, Pulumi to provision the infrastructure, and the AWS CLI to upload the content:

```bash
#!/bin/bash

# Build the website.
hugo --destination ./public

# Provision the infrastructure.
pulumi up --yes

# Copy the content of the website into the infrastructure.
aws s3 sync ./public s3://$(pulumi stack output bucketName)
```

And this would work --- but it's also unnecessary. You can get rid of the Bash wrapper entirely by just using your chosen language's built-in support for spawning shell processes:

{{< chooser language "typescript,python" />}}

{{% choosable language typescript %}}

```typescript
import * as aws from "@pulumi/aws";
import * as childProcess from "child_process";

// Build the website.
const proc = childProcess.execSync("hugo", { stdio: "inherit", cwd: "./www" });

// Provision a storage bucket for the website.
const bucket = new aws.s3.Bucket("bucket", {
    website: {
        indexDocument: "index.html"
    },
});

// Copy the website home page into the bucket.
const homepage = new aws.s3.BucketObject("index.html", {
    bucket: bucket.id,
    content: fs.readFileSync("./www/public/index.html", "utf-8"),
    contentType: "text/html",
    acl: "public-read",
});
```

{{% /choosable %}}

{{% choosable language python %}}

```python
import pulumi_aws as aws
import subprocess

# Build the website.
result = subprocess.run(["hugo"], stdout=subprocess.PIPE, cwd="./www")

# Provision a storage bucket for the website.
bucket = aws.s3.Bucket(
    "bucket", website=aws.s3.BucketWebsiteArgs(index_document="index.html")
)

# Copy the website home page into the bucket
homepage = aws.s3.BucketObject(
    "index.html",
    bucket=bucket.id,
    content=open("./www/public/index.html", "r").read(),
    content_type="text/html",
    acl="public-read",
)
```

{{% /choosable %}}

Because these processes run synchronously, they finish before the deployment engine gets going, terminating the containing process on error and logging any relevant output to the console:

```
$ pulumi up

Updating (dev)

     Type                               Name          Plan       Info
 +   pulumi:pulumi:Stack                example-dev   create     15 messages
 +   ├─ aws:s3:Bucket                   bucket        create
 +   └─ aws:s3:BucketObject             index.html    create

Diagnostics:
  pulumi:pulumi:Stack (example-dev):
    Start building sites ...

                       | EN
    -------------------+-----
      Pages            |  4
      Paginator pages  |  0
      Non-page files   |  0
      Static files     |  0
      Processed images |  0
      Aliases          |  0
      Sitemaps         |  1
      Cleaned          |  0
    Total in 11 ms

Outputs:
    bucketName: bucket-5b63cc9

Resources:
    + 3 created
```

Simple stuff, but flexible and powerful. With one line, you've made your deployment process simpler, dropping two tools you no longer need thanks to the built-in capabilities of your language of choice.

## Fetch data to generate resources dynamically

To build on the static-website scenario, suppose you wanted to retrieve some data from an external source and then use it to provision a set of cloud resources dynamically. For instance, you might want to let your marketing team create their own short URLs for social media posts. For this, you might once again reach for Bash to pull those URLs from a corporate CMS, either before or after running `pulumi` itself, to create the corresponding redirects imperatively using `curl` and the `aws` CLI.

Again, totally reasonable. But why bother, when you have the full capability of {{< langhost >}} at fingertips? Just add a few lines to the program to fetch the data and be on your way:

{{< chooser language "typescript,python" />}}

{{% choosable language typescript %}}

```typescript
// ...

// Fetch some redirects from a hypothetical CMS, pulling its URL from the environment.
const redirects = fetch(`${process.env.CMS_ENDPOINT}/redirects.json`)
    .then(response => response.json())
    .then(items => items.forEach((redirect: any, i: number) => {

        // Create an S3 website redirect for each one.
        new aws.s3.BucketObject(`redirect-${i}`, {
            bucket: bucket.id,
            key: redirect.from,
            websiteRedirect: redirect.to,
            acl: "public-read",
        });
    }),
);
```

{{% /choosable %}}

{{% choosable language python %}}

```python
#...
import json
import os
import requests

# ...

# Fetch some redirects from a hypothetical CMS.
response = requests.get(f"{os.environ['CMS_ENDPOINT']}/redirects.json")
redirects = json.loads(response.text)

# Create an S3 website redirect for each one.
for i, redirect in enumerate(redirects):
    aws.s3.BucketObject(f"redirect-{i}",
        bucket=bucket.id,
        key=redirect["from"],
        website_redirect=redirect["to"],
        acl="public-read",
    )
```

{{% /choosable %}}

Notice the example parses the response using the language's built-in JSON support. If your CMS happened to return data in some other format, or required some additional credentials for authorization, no problem --- your language and its ecosystem are already there to help you.

Also notice the example reads the source URL directly from the environment. This is typically more cumbersome (or even impossible) with other tools, requiring that you name your environment variables in specific ways, and then tack on additional blocks of configuration in order to read and assign them. But as you can see, since you're working with {{< langhost >}}, it's as easy as referencing a regular variable.

Finally, notice it also uses a familiar looping construct. That's next!

## Write clear, simple loops and conditionals

One of the fundamental difficulties of working with any strictly declarative syntax (whether that's YAML, JSON, HCL or something else) is figuring out how to express conditional and iterative logic. There's just no great way to do this without sacrificing usability or clarity somehow. This makes sense --- What would a loop even look like in JSON? --- but even so, reality demands that as engineers, we're able to control, at least somehow, whether or not (or how many times) a given thing happens.

Configuration languages often handle this by augmenting the syntax with meta-properties that _look_ neatly declarative, but can be awkward and hard to decipher in practice, such as here, which uses HCL to conditionally declare three S3 buckets:

```hcl
variable "enable_storage" {
    type = bool
    default = true
}

variable "bucket_count" {
    type = list(number)
    default = [1, 2, 3]
}

resource "aws_s3_bucket" "bucket" {
    count = var.enable_storage ? length(var.bucket_count) : 0
    bucket = "my-uniquely-named-bucket-${element(var.bucket_count, count.index)}"
}
```

General-purpose languages make this so much easier. Here's the same example rewritten in {{< langname >}} using a plain `if` statement and `for` loop. Anyone familiar with {{< langname >}} could look at this code and see what's going on --- and if they had debug it, they could do so by adding a log statement using the language's built-in support for that, too (which static languages aren't really able to do):

{{< chooser language "typescript,python" />}}

{{% choosable language typescript %}}

```typescript
const enableStorage = true;

if (enableStorage) {
    for (let i in [1, 2, 3]) {
        new aws.s3.Bucket(`bucket-${i}`);
    }
}
```

{{% /choosable %}}

{{% choosable language python %}}

```python
enable_storage = True

if enable_storage:
    for i in range(1, 3):
        bucket = aws.s3.Bucket(f"bucket-{i}")
```

{{% /choosable %}}

Again, things like these just make the job that much easier.

## Hook the event loop to run tasks after deployment

Finally, you can do nifty things like run tasks programmatically after a Pulumi deployment completes --- without ever having to leave the Pulumi program.

If your hypothetical website were sitting behind a CloudFront CDN, for example, you'd probably need some way to clear the CDN's cache after a deployment. This generally requires some imperative action, like using the AWS CLI to run `aws cloudfront create-invalidation` at some point later. How might you do something like this, given that Pulumi programs exit automatically when their operations complete?

One way --- again, since a Pulumi program is just a regular {{< langhost >}} program --- would be to write a {{< langname >}} function to create an invalidation request, and then ask the {{< langhost >}} runtime to run the function before exiting.

The mechanics of this vary slightly by language, but it works, and it's a handy way to keep all of your deployment logic in one place --- again avoiding the need to wrap anything in a Bash script:

{{< chooser language "typescript,python" />}}

{{% choosable language typescript %}}

```typescript
// ...
import * as cloudfront from "@aws-sdk/client-cloudfront";

const config = new pulumi.Config("aws");
const region = config.require("region");

// Create a CloudFront distribution for the website.
const cdn = new aws.cloudfront.Distribution("cdn", {
    enabled: true,
    defaultRootObject: "index.html",
    origins: [{
        originId: bucket.arn,
        domainName: bucket.websiteEndpoint,
        // ...
    }],
    // ...
});

// Register a function to be be invoked before the program exits.
process.on("beforeExit", () => {

    // Only invalidate after a deployment.
    if (pulumi.runtime.isDryRun()) {
        console.log("This is a Pulumi preview, so skipping cache invalidation.");
        return;
    }

    cdn.id.apply(id => {
        const client = new cloudfront.CloudFrontClient({ region });
        const command = new cloudfront.CreateInvalidationCommand({
            DistributionId: id,
            InvalidationBatch: {
                CallerReference: `invalidation-${Date.now()}`,
                Paths: {
                    Quantity: 1,
                    Items: [ "/*" ],
                },
            },
        });

        client.send(command)
            .then(result => {
                console.log(`Invalidation status for ${id}: ${result.Invalidation?.Status}.`);
                process.exit(0);
            })
            .catch(error => {
                console.error(error);
                process.exit(1);
            });
    });
});
```

The relevant code is the call to [`process.on("beforeExit")`](https://nodejs.org/api/process.html#event-beforeexit), which registers a function to be invoked just before the program exits using the resolved ID of the distribution. (For more on how the `apply()` method works, see [Inputs and Outputs](https://www.pulumi.com/docs/concepts/inputs-outputs/).) The function returns early for Pulumi previews --- no sense clearing the cache if the site hasn't changed --- and uses the [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-javascript/) to submit the invalidation request to CloudFront, naming it uniquely with a timestamp and logging the result to the console:

{{% /choosable %}}

{{% choosable language python %}}

```python
# ...
import boto3
import asyncio

# Create a CloudFront distribution for the website.
cdn = aws.cloudfront.Distribution("cdn",
    enabled=True,
    default_root_object="index.html",
    origins=[
        aws.cloudfront.DistributionOriginArgs(
            origin_id=bucket.arn,
            domain_name=bucket.website_endpoint,
            # ...
        )
    ],
    #...
)

def create_invalidation(id):

    # Don't bother invalidating unless it's an actual deployment.
    if pulumi.runtime.is_dry_run():
        print("This is a Pulumi preview, so skipping cache invalidation.")
        return

    client = boto3.client("cloudfront")
    result = client.create_invalidation(
        DistributionId=id,
        InvalidationBatch={
            "CallerReference": f"invalidation-{str(time.time)}",
            "Paths": {
                "Quantity": 1,
                "Items": [ "/*" ],
            },
        },
    )

    print(f"Cache invalidation of distribution {id}: {result['Invalidation']['Status']}.")

# Register a function to be be invoked before the program exits.
async def invalidate(id):
    await asyncio.to_thread(create_invalidation, id)

# Wait for the distribution ID to become available.
cdn.id.apply(lambda id: invalidate(id))
```

The relevant code is the call to [`asyncio.to_thread()`](https://docs.python.org/3/library/asyncio-task.html#running-in-threads), which registers a function to be invoked just before the program exits using the resolved ID of the distribution. (For more on how the `apply()` method works, see [Inputs and Outputs](https://www.pulumi.com/docs/concepts/inputs-outputs/).) The function returns early for Pulumi previews --- no sense clearing the cache if the site hasn't changed --- and uses [Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) to submit the invalidation request to CloudFront, naming it uniquely with a timestamp and logging the result to the console:

{{% /choosable %}}

```
$ pulumi preview

Previewing update (dev)
     Type                 Name           Info
     pulumi:pulumi:Stack  example-dev    16 messages

Diagnostics:
  pulumi:pulumi:Stack (example-dev):
    ...
    This is a Pulumi preview, so skipping cache invalidation.
```

```
$ pulumi up

Updating (dev)

     Type                 Name                        Status     Info
     pulumi:pulumi:Stack  example-dev             16 messages

Diagnostics:
  pulumi:pulumi:Stack (example-dev):
    ...
    Cache invalidation of distribution EAJOVC1QNGT13: InProgress.
```

Techniques like these are a great way to eliminate unnecessary scripts, glue code, and other dependencies while keeping your deployment logic clear, well contained, and amenable to change.

## Wrapping up

Hopefully this first post has given you a few new ways to think about how to do more with Pulumi and your language of choice. Over the next few weeks, as this series unfolds, we'll share a lot more, so keep an eye on this space --- and of course, if you haven't already, [consider giving Pulumi a try](/start).

You'll find the full source for the examples above on GitHub:

* [TypeScript version](https://github.com/pulumi/pulumi-hugo/tree/master/themes/default/static/programs/aws-static-website-with-runtime-logic-typescript)
* [Python version](https://github.com/pulumi/pulumi-hugo/tree/master/themes/default/static/programs/aws-static-website-with-runtime-logic-python)

Happy coding!
