---
title: "Stack References"
layout: topic
date: 2021-09-20T08:33:49-05:00
draft: false
description: Here is a brief description of what this topic will cover.
meta_desc: Here is a brief description of what this topic will cover.
index: 3
estimated_time: 10
meta_image: meta.png
authors:
    - matt-stratton
tags:
    - learn
    - stacks
    - outputs
links:
    - text: Some Website
      url: http://something.com
block_external_search_index: true
---

Stack references allow you to access the outputs of one stack from another
stack. Inter-stack dependencies allow one stack to reference the outputs of
another stack.

For this section, we are going to create a new Pulumi program that will bring in
the stack outputs from the program we just created.

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

Now comes the fun part! Let's add a little code to pull in the values from the
`my-first-app` stacks, based on the corresponding environment. In the following
code, change `YOURNAME` to the name/org for your Pulumi account.

Add this code to the {{< langfile >}} file inside of `my-second-app`.

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

```typescript
const env = pulumi.getStack();
const myFirstApp = new pulumi.StackReference(`YOURNAME/my-first-app/${env}`);
export let name =  myFirstApp.getOutput("name");
```

{{% /choosable %}}


{{% choosable language python %}}

```python
env = get_stack()
myFirstApp = StackReference(f"YOURNAME/my-first-app/{env}")
pulumi.export("name", myFirstApp.get_output("name"))
```

{{% /choosable %}}

{{% choosable language go %}}

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

If we run `pulumi up` on our new program, we will see that the value for `name`
matches the one we set for the matching stack in `my-first-app`:

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