---
title: "Stack Outputs"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-09-20T08:33:26-05:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: false

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Here is a brief description of what this topic will cover.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Here is a brief description of what this topic will cover.

# The order in which the topic appears in the module.
index: 2

# The estimated time, in minutes, for new users to complete the topic.
estimated_time: 10

# The meta_image appears in social-media previews and on the Learn Pulumi home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for reference.
meta_image: meta.png

# The optional meta_video also appears in social-media previews (taking precedence
# over the image) and on the module's index page. A placeholder video representing
# the recommended format, dimensions and aspect ratio has been provided for reference.
# meta_video:
#     url: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/video/2020-09-03-16-46-41.mp4'
#     thumb: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/thumbs/2020-09-03-16-46-41.jpg'
#     preview: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/previews/2020-09-03-16-46-41.jpg'
#     poster: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/posters/2020-09-03-16-46-41.jpg'

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - matt-stratton

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - change-me

# When provided, links are rendered at the bottom of the topic page.
links:
    - text: Some Website
      url: http://something.com

# Exclude from search-engine indexing for now.
block_external_search_index: true
---

A stack can export values as stack outputs. These outputs are shown during an update, can be easily retrieved with the Pulumi CLI, and are displayed in the Pulumi Console. They can be used for important values like resource IDs, computed IP addresses, and DNS names. 

Typically, you will pass some value from your resources into the output, but to illustrate how this works, we will just set some stack outputs manually:

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

In the `index.ts` file of `my-first-app` add the following line:

```typescript
export let x = "hello";
```

{{% /choosable %}}

{{% choosable language python %}}

In the `__main__.py` file of `my-first-app` add the following line:

```python
pulumi.export("x", "hello")
```

{{% /choosable %}}

{{% choosable language go %}}

In the `main.go` file of `my-first-app` add the following line:

```go
ctx.Export("x", pulumi.String("hello"))
```

{{% /choosable %}}


{{% choosable language csharp %}}

In the `MyStack.cs` file of `my-first-app` add the following lines:

```csharp
class MyStack : Stack
{
    [Output] public Output<string> x { get; set; }

    public MyStack()
    {
        this.x = Output.Create("hello");
    }
}
```

{{% /choosable %}}

Now, run `pulumi up -y`

```bash
$ pulumi up

Previewing update (dev)

View Live: https://app.pulumi.com/***/my-first-app/dev/previews/...


    pulumi:pulumi:Stack my-first-app-dev running 
    pulumi:pulumi:Stack my-first-app-dev  
 
Resources:
    1 unchanged

Updating (dev)

View Live: https://app.pulumi.com/***/my-first-app/dev/updates/3


    pulumi:pulumi:Stack my-first-app-dev running 
    pulumi:pulumi:Stack my-first-app-dev  
 
Outputs:
    x: "hello"

Resources:
    1 unchanged

Duration: 1s

```

Notice that there is now a stack output for the value of `x`.

We can also get this value by running `pulumi stack output` on any particular stack.

```bash
$ pulumi stack output x

hello
```

## Making a Stack configurable

One of the main reasons to use stacks is to have different configurations between them. In this example, we will set a configuration that varies between our `dev` and `staging` stacks, and set it programmatically. 

First, we need to define the configuration. We will set this in the `dev` stack first. Make sure the `dev` stack is active:

```bash
$ pulumi stack select dev
```

Now, run the following command to set a value for the `platypusName` configuration:

```bash
$ pulumi config set platypusName Roger
```
Let's do the same for the `staging` stack:

```bash
$ pulumi stack select staging
$ pulumi config set platypusName Sally
```

You should have two new files in your directory now: `Pulumi.dev.yaml` and `Pulumi.staging.yaml`. If you take a look at them, you'll see each one has the value for `platypusName` set:

```bash
$ cat Pulumi.dev.yaml
config:
  my-first-app:platypusName: Roger
```

Let's set a stack output based upon this configuration value:

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

Inside `index.ts`

```typescript

let config = new pulumi.Config();
export let name = config.require("platypusName");

```

{{% /choosable %}}

And now we can apply and check our new values!

```bash

$ pulumi up -y

$ pulumi stack output name
Sally
```

