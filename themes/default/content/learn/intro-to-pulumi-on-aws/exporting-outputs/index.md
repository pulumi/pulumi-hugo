---
title: "Exporting Outputs"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-07-28T10:36:01-07:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: true

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Here is a brief description of what this topic will cover.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Here is a brief description of what this topic will cover.

# The order in which the topic appears in the module.
index: 4

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
    - christian-nunciato

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

We've created some resources, now let's see how we can use outputs outside of Pulumi.

## Export the values from `my-first-app`

In stack 1, modify your program to add an exported value:

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

```python
pulumi.export("container_id", mongo_container.id)
```

Your Pulumi program should now look like this:

```python
import pulumi
import pulumi_docker as docker

stack = pulumi.get_stack()
.
.
.
# create the mongo container
mongo_container = docker.Container("mongo_container",
                        image=mongo_image,
                        ports=[docker.ContainerPortArgs(
                          internal=mongo_port,
                          external=mongo_port
                        )],
                        networks_advanced=[docker.ContainerNetworksAdvancedArgs(
                            name=network.name,
                            aliases=["mongo"]
                        )]
)

pulumi.export("container_id", mongo_container.id)

```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}



Run `pulumi up` to make sure the stack gets updated, and the value is exported.

## Look at your running Docker container

You can now use this output value using the `pulumi stack output` command:

```bash
pulumi stack output container_id
44dde1c3ec15ed9bc372f7d513265cd4847f56223395983caed3188c2db214c8
```

Which also means you can use them in scripts, like so:

```bash
docker stats --no-stream $(pulumi stack output container_id)
CONTAINER ID        NAME                   CPU %               MEM USAGE / LIMIT   MEM %               NET I/O             BLOCK I/O           PIDS
44dde1c3ec15        my-first-app-0d221af   0.00%               0B / 0B             0.00%               1.02kB / 796B       0B / 0B             0
```

## Create a "prod" stack

We're now going to use the `pulumi stack` command to understand how stacks work. Let's list our existing stacks using: `pulumi stack ls`

We currently only have one stack. Let's add a new one!

```bash
pulumi stack init prod
```

Now we have created a pulumi `prod` stack, let's try rerun our `pulumi up`:

```
Diagnostics:
  pulumi:pulumi:Stack (my-first-app-prod):
    error: Missing required configuration variable 'my-first-app:frontend_port'
        please set a value using the command `pulumi config set my-first-app:frontend_port <value>`
```

Our configuration error is back! This is because when we configure values in pulumi, they are specific to a stack. So, let's set the `node_environment` to `production` in the prod stack:

```bash
pulumi config set frontend_port 3001
pulumi config set backend_port 3000
pulumi config set mongo_port 27017
pulumi config set mongo_host mongodb://mongo:27017
pulumi config set database cart
pulumi config set node_environment production
```

You can list your stacks with:

```bash
pulumi stack ls
NAME   LAST UPDATE    RESOURCE COUNT  URL
dev    7 minutes ago  0               https://app.pulumi.com/spara/my-first-app/dev
prod*  3 minutes ago  9               https://app.pulumi.com/spara/my-first-app/prod
```

The asterisk indicates that this is the current stack. To switch to another stack you can use the `select` command:

```bash
pulumi stack select <stack name>
```

You can also list the stack resources:

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

Now, that you have the basics of creating, selecting, examining stacks, and exporting stack outputs, run `pulumi up` again. You should get new images and containers, this time running in production mode!

## Stack References

So what else can do with stack outputs? You can use them with other stacks through a Stack Reference. Stack references allow you to access the outputs of one stack from another stack. Inter-Stack Dependencies allow one stack to reference the outputs of another stack.

To see how this works, create a second stack called `use-docker-id` in a new directory

```bash
mkdir use-docker-id
cd use-docker-id
pulumi new python
```

Use the defaults, and ensure you use the `dev` stack.

## Configure your stack reference

Now we need to add a stack reference in use-docker-id

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

```python
import pulumi

config = pulumi.Config()
stack = pulumi.get_stack()
org = config.require("org")

stack_ref = pulumi.StackReference(f"{org}/my-first-app/{stack}")

pulumi.export("containerId", stack_ref.get_output("container_id"))
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

Set the `org` environment variable,which is the organization associated with your account.

```bash
pulumi config set org spara
```

Run `pulumi up`. You'll see the value gets exported from this stack now too.

```bash
View Live: https://app.pulumi.com/spara/use-docker-id/dev/updates/20

     Type                 Name               Status
     pulumi:pulumi:Stack  use-docker-id-dev

Outputs:
  + use-docker-id-ref: "5efdabb5ba8b5111f1aabe42d7911a99df5c18c5592d2ff00f7dfeba3930a818"
```
These exported values are incredibly useful when using Pulumi stacks

Congratulations, you've now finished the introduction to Pulumi tutorial!

# Summary

This tutorial covered the following:

* How to create a [Pulumi Project and a Stack](../lab-01/Creating_a_Pulumi_Project.md#step-2--initialize-your-project).
* How to add a [Pulumi package to a Project](../lab-02/Create_Docker_Images.md#step-2---build-your-docker-image-with-pulumi).
* How to [create an application image as a resource](../lab-02/Create_Docker_Images.md#step-2---build-your-docker-image-with-pulumi).
* How to [configure resources](../lab-03/Configuring_and_Provisioning_Containers.md#step-1---configure-the-application).
* How [resources are declared and created](../lab-03/Configuring_and_Provisioning_Containers.md#step-2---create-a-container-resource).
* What is an [output and how to export them](../lab-04/Exporting_Outputs.md#step-1---export-the-values-from-my-first-app).
* How to [work with stacks](../lab-04/Exporting_Outputs.md#step-3---create-a-prod-stack).
* How to [create Stack References](../lab-04/Exporting_Outputs.md#step-4---stack-references).
