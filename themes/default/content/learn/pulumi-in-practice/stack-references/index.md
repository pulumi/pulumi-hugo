---
title: "Stack References"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-09-20T08:33:49-05:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: false

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Here is a brief description of what this topic will cover.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Here is a brief description of what this topic will cover.

# The order in which the topic appears in the module.
index: 3

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

Stack references allow you to access the outputs of one stack from another stack. Inter-Stack Dependencies allow one stack to reference the outputs of another stack.

For this section, we are going to create a new Pulumi program which will bring in the stack outputs from the program we just created.

Let's start by making our new Pulumi program in a new directory:

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

```bash
mkdir my-second-app
cd my-second-app
$ pulumi new typescript -y
```

{{% /choosable %}}

{{% choosable language python %}}

```bash
mkdir my-second-app
cd my-second-app
$ pulumi new python -y
```

{{% /choosable %}}

{{% choosable language go %}}

```bash
mkdir my-second-app
cd my-second-app
$ pulumi new go -y
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
mkdir my-second-app
cd my-second-app
$ pulumi new csharp -y
```

{{% /choosable %}}

Let's go ahead and create a `staging` stack here as well:

```bash
$ pulumi stack init staging
```

Now comes the fun part! Let's add a little code to pull in the values from the `my-first-app` stacks, based on the corresponding environment: (be sure to change `YOURNAME` to the name/org for your Pulumi account)

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

Add this to the `index.ts` file inside of `my-second-app`

```typescript

const env = pulumi.getStack();
const myFirstApp = new pulumi.StackReference(`YOURNAME/my-first-app/${env}`);
export let name =  myFirstApp.getOutput("name");

```

{{% /choosable %}}


{{% choosable language python %}}

Add this to the `__main__.py` file inside of `my-second-app`

```python

env = get_stack()
myFirstApp = StackReference(f"YOURNAME/my-first-app/{env}")
pulumi.export("name", myFirstApp.get_output("name"))

```

{{% /choosable %}}

{{% choosable language go %}}

Add this to the `main.go` file inside of `my-second-app`

```go

import (
  "fmt"

  "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
  pulumi.Run(func(ctx *pulumi.Context) error {
    slug := fmt.Sprintf("YOURNAME/my-first-app/%v", ctx.Stack())
    stackRef, err := pulumi.NewStackReference(ctx, slug, nil)

    ctx.Export("name", stackRef.GetOutput(pulumi.String("name")))

    return nil
  }
}

```

{{% /choosable %}}

{{% choosable language csharp %}}

Add this to the `MyStack.cs` file inside of `my-second-app`

```csharp

class AppStack : Stack
{
    public AppStack()
    {
        var MyFirstApp = new StackReference($"YOURNAME/my-first-app/{Deployment.Instance.StackName}");
        var name = MyFirstApp.RequireOutput("name").Apply(v => v.ToString());
        this.name = Output.Create(name);
    }
}

```

{{% /choosable %}}

If we run `pulumi up` on our new program, we will see that the value for `name` matches the one we set for the matching stack in `my-first-app`:

```bash
$ pulumi stack ls
NAME      LAST UPDATE    RESOURCE COUNT  URL
dev       n/a            n/a             https://app.pulumi.com/***/my-second-app/dev
staging*  7 minutes ago  3               https://app.pulumi.com/***/my-second-app/staging

$ pulumi up -y
Previewing update (staging)

View Live: https://app.pulumi.com/***/my-second-app/staging/previews/...

     Type                 Name                   Plan
     pulumi:pulumi:Stack  my-second-app-staging

Resources:
    1 unchanged

Updating (staging)

View Live: https://app.pulumi.com/***/my-second-app/staging/updates/3

     Type                 Name                   Status
     pulumi:pulumi:Stack  my-second-app-staging

Outputs:
    name: "Sally"

Resources:
    1 unchanged

Duration: 1s

$ pulumi stack output name
Sally


```