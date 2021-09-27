---
title: "Understanding Stacks"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-09-20T08:33:14-05:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: false

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Here is a brief description of what this topic will cover.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Here is a brief description of what this topic will cover.

# The order in which the topic appears in the module.
index: 1

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

Every Pulumi program is deployed to a stack. A stack is an isolated, independently [configurable](https://www.pulumi.com/docs/intro/concepts/config/) instance of a Pulumi program. Stacks are commonly used to denote different phases of development (such as `development`, `staging`, and `production`) or feature branches (such as `feature-x-dev`).

A project can have as many stacks as you need. By default, Pulumi creates a stack for you when you start a new project using the `pulumi new` command. Let's create a new project now for use in this tutorial:

{{< chooser language "typescript,python,go,csharp" / >}}

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

{{% choosable language go %}}

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

{{% /choosable %}}

This prints output similar to the following with a bit more information and status as it goes:

```
Created stack 'dev'
...
Your new project is ready to go! ✨
To perform an initial deployment, run 'pulumi up'
```
## Create a stack
To create a new stack, we use the command `pulumi stack init stackName`. This creates an empty stack `stackName` and sets it as the _active_ stack. The project that the stack is associated with is determined by finding the nearest `Pulumi.yaml` file.

The stack name must be unique within a project. Stack names may only contain alphanumeric characters, hyphens, underscores, or periods.

Let's create a new stack in our project, for our staging environment:

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

```bash
$ pulumi stack init staging
```

{{% /choosable %}}

{{% choosable language python %}}

```bash
$ pulumi stack init staging
```

{{% /choosable %}}

{{% choosable language go %}}

```bash
$ pulumi stack init staging
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
$ pulumi stack init staging
```

{{% /choosable %}}

## Listing Stacks
We have a couple of stacks in our project now - but how do we know which ones we have? If we run the command `pulumi stack ls` it will tell us!

```bash
$ pulumi stack ls
NAME      LAST UPDATE  RESOURCE COUNT  URL
dev       n/a          n/a             https://app.pulumi.com/***/my-first-app/dev
staging*  n/a          n/a             https://app.pulumi.com/***/my-first-app/staging
```
Notice that the `staging` stack has an `*` after its name; this marks this as the active stack (i.e., the stack that all our commands will run on).
## Selecting Stacks

When we run a pulumi command (such as `config`, `up`, or `destroy`) this operates on the *active* stack. But what if we want to change which stack is active? For this, we use the `pulumi stack select` command:

```bash
$ pulumi stack select dev

$ pulumi stack ls
NAME     LAST UPDATE     RESOURCE COUNT  URL
dev*     n/a             n/a             https://app.pulumi.com/***/my-first-app/dev
staging  n/a             n/a             https://app.pulumi.com/***/my-first-app/staging
```

Notice that `dev` is now the active stack.
