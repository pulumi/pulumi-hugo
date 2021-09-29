---
title: "Stack Outputs"
layout: topic
date: 2021-09-20T08:33:26-05:00
draft: false
description: Here is a brief description of what this topic will cover.
meta_desc: Here is a brief description of what this topic will cover.
index: 2
estimated_time: 10
meta_image: meta.png
authors:
    - matt-stratton
tags:
    - change-me
links:
    - text: Some Website
      url: http://something.com
block_external_search_index: true
---

We've created some resources. Now, let's see how we can use outputs outside of
Pulumi. In this part, we're going to explore [_stack
outputs_](https://www.pulumi.com/docs/reference/glossary/#stack-output).
Stack outputs are, as you might guess, the values exported from any given stack.
These values are shown during an update, can be retrieved with the Pulumi CLI, 
and are displayed in the [Pulumi Console](https://app.pulumi.com) once you've
exported them. Example values include resource IDs, computed IP addresses, and
DNS names. They're extremely useful when you want to run commands with the CLI
that reference those values. Note, though, that stack outputs are for the
current stack only. If you want to get values from another stack, you want to
use stack references, which bridge different stacks through inter-stack dependencies.

Typically, you will pass some value from your resources into the output, but to
illustrate how stack outputs work, we will set some stack outputs manually:

In the {{% langfile %}} file of `my-first-app`, add the following lines:

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

```typescript
export let x = "hello";
```

{{% /choosable %}}

{{% choosable language python %}}

```python
pulumi.export("x", "hello")
```

{{% /choosable %}}

{{% choosable language go %}}

```go
ctx.Export("x", pulumi.String("hello"))
```

{{% /choosable %}}


{{% choosable language csharp %}}

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

One of the main reasons to use stacks is to have different configurations
between them. In this example, we will set a configuration that varies between
our `dev` and `staging` stacks, and set it programmatically. 

First, we need to define the configuration. We will set this in the `dev` stack
first. Make sure the `dev` stack is active:

```bash
$ pulumi stack select dev
```

Now, run the following command to set a value for the `platypusName`
configuration:

```bash
$ pulumi config set platypusName Roger
```
Let's do the same for the `staging` stack:

```bash
$ pulumi stack select staging
$ pulumi config set platypusName Sally
```

You should have two new files in your directory now: `Pulumi.dev.yaml` and
`Pulumi.staging.yaml`. If you take a look at them, you'll see each one has the
value for `platypusName` set:

```bash
$ cat Pulumi.dev.yaml
config:
  my-first-app:platypusName: Roger
```

Let's set a stack output based upon this configuration value. Add these lines in
{{% langfile %}}:

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

```typescript

let config = new pulumi.Config();
export let name = config.require("platypusName");

```

{{% /choosable %}}

{{% choosable language python %}}
TODO
{{% /choosable %}}

{{% choosable language go %}}
TODO
{{% /choosable %}}

{{% choosable language csharp %}}
TODO
{{% /choosable %}}

And now we can apply and check our new values!

```bash

$ pulumi up -y

$ pulumi stack output name
Sally
```

