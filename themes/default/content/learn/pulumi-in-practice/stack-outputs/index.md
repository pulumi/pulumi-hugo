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

In the {{% langfile %}} file of `my-first-app`, add the following line:

{{< chooser language "python" / >}}

{{% choosable language typescript %}}

```typescript
export let x = "hello";
```

{{% /choosable %}}

{{% choosable language python %}}

```python
pulumi.export("url", f"http://localhost:{frontend_port}")
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
...

Updating (dev)

View Live: https://app.pulumi.com/***/my-first-app/dev/updates/3


    pulumi:pulumi:Stack my-first-app-dev running 
    pulumi:pulumi:Stack my-first-app-dev  
 
Outputs:
  + url: "http://localhost:3001"

...

```

Notice that there is now a stack output for the value of `url`.

We can also get this value by running `pulumi stack output` on any particular stack.

```bash
$ pulumi stack output url

http://localhost:3001
```

And we can use this in the `curl` command to check our website:

```bash
$ curl $(pulumi stack output url)
```

## Making a Stack configurable

One of the main reasons to use stacks is to have different configurations
between them. In this example, we will set a configuration that varies between
our `dev` and `staging` stacks, and set it programmatically.

First, we need to define the configuration. We have already set this in the `dev` stack
in the Fundamentals tutorial. Let's take a look! Make sure the `dev` stack is active:

```bash
$ pulumi stack select dev
```

Now, run the following command to get the values for this stack's configuration
configuration:

```bash
$ pulumi config
```

```bash
KEY               VALUE
backend_port      3000
database          cart
frontend_port     3001
mongo_host        mongodb://mongo:27017
mongo_port        27017
node_environment  development
```

Let's set the configuration for the `staging` stack. We'll use the same values as `dev`, except the `frontend_port` will be set to `3002`.

```bash
$ pulumi stack select staging
pulumi config set frontend_port 3002
pulumi config set backend_port 3000
pulumi config set mongo_port 27017
pulumi config set mongo_host mongodb://mongo:27017
pulumi config set database cart
pulumi config set node_environment development
```

You should have two new files in your directory now: `Pulumi.dev.yaml` and
`Pulumi.staging.yaml`. If you take a look at them, you'll see each one has the
value for `frontend_port` set (along with some other values we set in the Fundamentals tutorial):

```bash
$ cat Pulumi.dev.yaml
config:
  my-first-app:backend_port: "3000"
  my-first-app:database: cart
  my-first-app:frontend_port: "3001"
  my-first-app:mongo_host: mongodb://mongo:27017
  my-first-app:mongo_port: "27017"
  my-first-app:node_environment: development
```

Now, if you run `pulumi up` while in the `staging` stack, we should see that the frontend port is now set to `3002`:

```bash
$ pulumi stack output url

http://localhost:3002
```
