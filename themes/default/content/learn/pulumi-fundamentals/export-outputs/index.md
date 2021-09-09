---
title: "Exporting Outputs and Understanding Stack References"
layout: topic
date: 2021-09-07T15:22:00-05:00
draft: true
description: Learn a bit more about stack outputs, stack references, and standing up a new stack.
meta_desc: Learn a bit more about stack outputs, stack references, and standing up a new stack.
index: 3
estimated_time: 15
meta_image: meta.png
authors:
    - sophia-parafina
    - laura-santamaria
tags:
    - fundamentals
    - outputs
    - stacks
links:
    - text: Code Repo
      url: https://github.com/pulumi/tutorial-pulumi-fundamentals
block_external_search_index: true
---

We've created some resources. Now, let's see how we can use outputs outside of
Pulumi. In this part, we're going to explore stacks, [_stack
outputs_](https://www.pulumi.com/docs/reference/glossary/#stack-output), and
[_stack
references_](https://www.pulumi.com/docs/reference/glossary/#stack-reference).
Stack outputs are, as you might guess, the values exported from any given stack.
These values can also be obtained from the [Pulumi
Console](https://app.pulumi.com), and they're extremely useful when you want to
run commands with the CLI that reference those values. Note, though, that stack
outputs are for the current stack only. If you want to get values from another
stack, you want to use stack references, which bridge different stacks through
inter-stack dependencies.

## Export the stack output values

In your program, add the following snippet at the very end to export the stack
output values for use in the command line:


```python
pulumi.export("container_id", mongo_container.id)
```

Your Pulumi program should now have a line at the end like this:

```python
import os
import pulumi
import pulumi_docker as docker

stack = pulumi.get_stack()
.
.
.
pulumi.export("container_id", mongo_container.id)

```

Run `pulumi up` to ensure the stack gets updated and the value is exported.

## Examine a running Docker container

You can now use this output value using the `pulumi stack output` command:

```bash
pulumi stack output container_id
44dde1c3ec15ed9bc372f7d513265cd4847f56223395983caed3188c2db214c8
```

Now that you've exported the values, you also can use those values in scripts,
like so:

```bash
docker stats --no-stream $(pulumi stack output container_id)
CONTAINER ID        NAME                   CPU %               MEM USAGE / LIMIT   MEM %               NET I/O             BLOCK I/O           PIDS
44dde1c3ec15        my-first-app-0d221af   0.00%               0B / 0B             0.00%               1.02kB / 796B       0B / 0B             0
```

## Create a "prod" stack

Next, let's start exploring stacks. List the existing stacks using `pulumi stack
ls`:

```bash
pulumi stack ls
NAME   LAST UPDATE    RESOURCE COUNT  URL
dev*   3 minutes ago  0               https://app.pulumi.com/spara/my-first-app/dev
```

We currently only have one stack. Let's add a new one with the `pulumi stack
init` command:

```bash
pulumi stack init prod
```

Now we have created a pulumi `prod` stack, and we've automatically been switched
over to that stack with the CLI. If you were to attempt to rerun `pulumi up`,
however, you'll get this error message:

```
Diagnostics:
  pulumi:pulumi:Stack (my-first-app-prod):
    error: Missing required configuration variable 'my-first-app:frontend_port'
        please set a value using the command `pulumi config set my-first-app:frontend_port <value>`
```

Recognize it? Our configuration error is back! This error happens because when
we configure values in Pulumi, they are specific to a stack. So, let's set the
`node_environment` to `production` in the prod stack and add all the other ports
and configuration variable values back to our environment:

```bash
pulumi config set frontend_port 3001
pulumi config set backend_port 3000
pulumi config set mongo_port 27017
pulumi config set mongo_host mongodb://mongo:27017
pulumi config set database cart
pulumi config set node_environment production
```

Remember that just because you're on a different stack, the ports are still
taken by the previous stack. We'll need to destroy the dev stack before the prod
stack can stand up here as we've hardwired the ports into the Docker image. You
could avoid this situation by modifying your Dockerfile to pull the port from
your Pulumi program. For now, though, let's switch back over to the dev stack
and take it down.

You can list your stacks with `pulumi stack ls` again:

```bash
pulumi stack ls
NAME   LAST UPDATE    RESOURCE COUNT  URL
dev    7 minutes ago  0               https://app.pulumi.com/spara/my-first-app/dev
prod*  3 minutes ago  9               https://app.pulumi.com/spara/my-first-app/prod
```

The asterisk (*) indicates that this stack is the current stack for your
terminal environment. To switch to another stack, you can use the `select`
command, so let's switch back to dev:

```bash
pulumi stack select dev
```

Then, run `pulumi destroy` to take down the current infrastructure in dev:

```bash
pulumi destroy
```

Once that command completes, switch back to prod:

```bash
pulumi stack select prod
```

Now that you have the basics of creating, selecting, examining stacks, and
exporting stack outputs, run `pulumi up` again. You should get new images and
containers, this time running in production mode!

You can also list the current stack's resources with `pulumi stack`:

```bash
pulumi stack
Current stack is prod:
    Owner: spara
    Last updated: 2 hours ago (2021-07-10 17:44:24.657842983 -0500 CDT)
    Pulumi version: v3.6.1
Current stack resources (9):
    TYPE                                         NAME
    pulumi:pulumi:Stack                          my-first-app-prod
    ├─ docker:image:Image                        backend
    ├─ docker:image:Image                        frontend
    ├─ docker:index/network:Network              network
    ├─ docker:index/remoteImage:RemoteImage      mongo
    ├─ docker:index/container:Container          mongo_container
    ├─ docker:index/container:Container          frontend_container
    ├─ docker:index/container:Container          backend_container
    └─ pulumi:providers:docker                   default_3_0_0

Current stack outputs (1):
    OUTPUT        VALUE
    container_id  ac3312e2ce48d6a268f8a05a757e4fdbd4c520d3b5bd7e3de23130563a33e456

More information at: https://app.pulumi.com/spara/my-first-app/prod
```

## Stack References

So what else can do with stack outputs? You can use them with other stacks
through a stack reference. Remember that stack references allow you to access
the outputs of one stack from another stack through inter-stack dependencies.

To see how this works, create a second project called `use-docker-id` in a new
directory:

```bash
mkdir ../use-docker-id
cd ../use-docker-id
pulumi new python
```

Use the defaults, and ensure you use the `prod` stack, the same one you
currently have up for the `my-first-app` project.

## Configure your stack reference

Now we need to add a stack reference in `use-docker-id` in the `__main__.py`
file:

```python
import pulumi

config = pulumi.Config()
stack = pulumi.get_stack()
org = config.require("org")

stack_ref = pulumi.StackReference(f"{org}/my-first-app/{stack}")

pulumi.export("containerId", stack_ref.get_output("container_id"))
```
The `org` environment variable is new, as is the `stack_ref` declaration. That
declaration sets up an instance of the `StackReference` class, which needs the
fully qualified name of the stack as an input. Here, the `org` is the
organization associated with your account, the `my-first-app` is the name of the
project you've been working in, and the stack is the stack that you want to
reference. If you have an individual account, the org is your account name. The
export then grabs the `containerId` output from the other stack.

Set the `org` environment variable, which is the organization associated with
your account:

```bash
pulumi config set org spara
```

Run `pulumi up`. You'll see the value gets exported from the other project's
stack to reference in this new project's stack:

```bash
View Live: https://app.pulumi.com/spara/use-docker-id/prod/updates/20

     Type                 Name               Status     
     pulumi:pulumi:Stack  use-docker-id-prod             
 
Outputs:
  + use-docker-id-ref: "5efdabb5ba8b5111f1aabe42d7911a99df5c18c5592d2ff00f7dfeba3930a818"
```
These exported values are incredibly useful when using Pulumi stacks.

Congratulations, you've now finished Pulumi Fundamentals! Head back to the main
page and explore some other modules to understand more about Pulumi.
