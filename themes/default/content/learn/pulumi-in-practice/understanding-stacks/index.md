---
title: "Understanding Stacks"
layout: topic
date: 2021-09-20T08:33:14-05:00
draft: false
description: Learn a bit more about stacks.
meta_desc: Learn a bit more about stacks.
index: 1
estimated_time: 10
meta_image: meta.png
authors:
    - matt-stratton
tags:
    - stacks
    - learn
links:
    - text: Some Website
      url: http://something.com
block_external_search_index: true
---

Every Pulumi program is deployed to a stack. A stack is an isolated,
independently [configurable]({{< relref "/docs/intro/concepts/config/" >}})
instance of a Pulumi program. Stacks are commonly used to denote different
phases of development (such as `development`, `staging`, and `production`) or
feature branches (such as `feature-x-dev`).

A project can have as many stacks as you need. By default, Pulumi creates a
stack for you when you start a new project using the `pulumi new` command.
Let's create a new project now for use in this tutorial:

{{< chooser language "typescript,python" / >}}

{{% choosable language typescript %}}

```bash
mkdir my-first-app
cd my-first-app
$ pulumi new typescript -y
```

{{% /choosable %}}

{{% choosable language python %}}

```bash
mkdir my-first-app
cd my-first-app
$ pulumi new python -y
```

{{% /choosable %}}

<!-- {{% choosable language go %}}

```bash
mkdir my-first-app
cd my-first-app
$ pulumi new go -y
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
mkdir my-first-app
cd my-first-app
$ pulumi new csharp -y
```

{{% /choosable %}} -->

This command prints output similar to the following example with a bit more
information and status as it goes:

```
Created stack 'dev'
...
Your new project is ready to go! ✨
To perform an initial deployment, run 'pulumi up'
```
## Create a stack

To create a new stack, we use the command `pulumi stack init stackName`. This
command creates an empty stack `stackName` and sets it as the _active_ stack.
The project that the stack is associated with is determined by finding the
nearest `Pulumi.yaml` file.

The stack name must be unique within a project. Stack names may only contain
alphanumeric characters, hyphens, underscores, or periods.

Let's create a new stack in our project, for our staging environment:

{{< chooser language "typescript,python" / >}}

{{% choosable language typescript %}}

```bash
$ pulumi stack init staging
```

{{% /choosable %}}


```bash
$ pulumi stack init staging
```

{{% /choosable %}}

<!-- {{% choosable language go %}}

```bash
$ pulumi stack init staging
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
$ pulumi stack init staging
```

{{% /choosable %}} -->

## Listing Stacks
We have a couple of stacks in our project now&mdash;but how do we know which
ones we have? If we run the command `pulumi stack ls`, it will tell us!

```bash
$ pulumi stack ls
NAME      LAST UPDATE    RESOURCE COUNT  URL
dev       2 minutes ago  10              https://app.pulumi.com/***/my-first-app/dev
staging*  n/a            n/a             https://app.pulumi.com/***/my-first-app/staging

```
Notice that the `staging` stack has an `*` after its name; this asterisk marks
this stack as the active stack (i.e., the stack that all our commands will run
on).

## Selecting Stacks

When we run a Pulumi command (such as `config`, `up`, or `destroy`), the command
operates on the *active* stack. But what if we want to change which stack is
active? For this task, we use the `pulumi stack select` command:

```bash
$ pulumi stack select dev

$ pulumi stack ls
NAME     LAST UPDATE    RESOURCE COUNT  URL
dev*     3 minutes ago  10              https://app.pulumi.com/***/my-first-app/dev
staging  n/a            n/a             https://app.pulumi.com/***/my-first-app/staging

```

Notice that `dev` is now the active stack.