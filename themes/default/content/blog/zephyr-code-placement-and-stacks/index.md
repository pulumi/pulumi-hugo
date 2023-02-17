---
title: "Zephyr: Code Placement and Stacks"

# The date represents the post's publish date, and by default corresponds with
# the date this file was generated. Posts with future dates are visible in development,
# but excluded from production builds. Use the time and timezone-offset portions of
# of this value to schedule posts for publishing later.
date: 2023-02-15T13:01:26-07:00

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or social-media
# previews. This field is required or the build will fail the linter test.
# Max length is 160 characters.
meta_desc: This is the first in a series of blog posts on recommended practices for using Pulumi. In this first post, we discuss code placement and Pulumi stacks.

# The meta_image appears in social-media previews and on the blog home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for you.
meta_image: meta.png

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - scott-lowe
    - christian-nunciato
    - aaron-kao

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - development-environment
    - cloud-engineering

# See the blogging docs at https://github.com/pulumi/pulumi-hugo/blob/master/BLOGGING.md.
# for additional details, and please remove these comments before submitting for review.
---

This is the first in a series of blog posts where we'll explore how a fictional company---Zephyr Archaeotech Emporium---uses Pulumi to manage their online retail store. In this first post, we'll explore a couple common questions that users ask when working with Pulumi; specifically, where should I store my Pulumi code? And how do I support multiple environments with Pulumi? This post will provide some guidance and recommendations around these topics, using Zephyr and their online store as the use case.

<!--more-->

Here are links to all the blog posts in the series: <!--The names of these posts and the order in which we publish them is mutable-->

**Zephyr: Code Placement and Stacks** (this post)

Zephyr: Structuring Their Pulumi Projects

Zephyr: Moving Infrastructure State Between Projects

Zephyr: Tying Stacks Together with Stack References

Zephyr: Evolving the Application

Zephyr: Adding Pulumi Deployments

Zephyr: Refactoring for Reuse

Zephyr: Local Testing with Pulumi

## What is Zephyr?

Zephyr is short for Zephyr Archaeotech Emporium, the fictional company in our scenario. <!--Aaron, need details on the story/background here-->

## The application: Zephyr's online store

Zephyr's application is the second generation of their online store. Their first generation was a monolith that they manually deployed. It was sufficient in Zephyr's early days, but as word spread and volume increased, Zephyr found it difficult to make small, incremental changes to the store, and as a result the velocity of their development efforts slowed. In preparation for the next phase of their growth---driven by robust sales of arcane artifacts---Zephyr's team evaluated a number of different architectures that would enable them to increase development velocity and give them greater flexibility in scaling different aspects of their online store. In the end, they settled on a containerized architecture deployed to Kubernetes because some of the existing team was already familiar with these technologies.

Here's a diagram of their second-generation application architecture:

![Placeholder Image](meta.png)

Astute readers may note that this looks pretty similar to [this application](https://github.com/aws-containers/retail-store-sample-app/); in truth, we're using a fork of the AWS Containers retail store example as the basis for our fictional scenario (many thanks to the AWS Containers DA team for their hard work here!). This is an admittedly over-engineered application, but we wanted something that would allow us to address a range of customer scenarios in this blog series.

## Deploying the application with Pulumi

As part of the switch to their new architecture, Zephyr has decided they want to use Pulumi to manage the infrastructure and application. Why Pulumi? Zephyr’s team knew that adopting infrastructure as code would help them with fast and repeatable deployments. An added bonus was being able to use programming languages they already knew.

As they prepared to embark on using Pulumi, a couple of questions came up for the Zephyr team:

* Where should they store their Pulumi code? The ability for Zephyr's developers to use a full programming language to manage the infrastructure and deployment of their online store is a huge plus, but should this code go in the same repository as their application code? Or a different repository?
* How do they address the need for multiple environments? It's pretty clear to the Zephyr development team that they'll need multiple instances of the online store (for things like testing, QA, or development). What's the best way to handle this when using Pulumi?

Let's examine each of these issues in a bit more detail, and see how Zephyr is choosing to proceed.

### Storing their Pulumi code

When it comes to answering the question of where to store Pulumi code relative to the application(s) it supports, there are two basic options:

1. In the same repository as your application code
2. In a separate repository from your application code
<!--Do we need to consider the situation of using the same repository but a different branch?-->
Each of these options has its own advantages and disadvantages. For example, using a single repository for both application code and Pulumi code---the so-called monorepo approach---is simple, easy to understand and reason about, and straightforward. This approach may work well for small teams that are responsible for managing both codebases.

So which approach is best? That will depend on a number of different factors, many of which are outlined [here](/docs/guides/organizing-projects-stacks/). Some of the factors that users, like Zephyr, need to take into consideration include:

* Who is responsible for maintaining the code? If the application code and the Pulumi code are managed by different teams, then using separate repositories may be the best approach.
* What sort of access controls are needed? If the organization needs different access controls for the application code and the Pulumi code, then separate repositories are generally needed.
* What is the relationship between the infrastructure resources managed by Pulumi and the applications? If the infrastructure is "shared," meaning it is used by multiple applications, then keeping the Pulumi code in a separate repository may be preferred. If the infrastructure is dedicated to a specific application, then keeping the application code and the Pulumi code together may be preferred.
* What about CI/CD? If an organization will use CI/CD, that may affect how you organize your code. (This is something we'll delve into more deeply later in this series.)

The answers to these questions may change over time as organizations grow and their applications evolve. Addressing that change and its effects on an organization's Pulumi projects and stacks is also something we'll be discussing later in this series.

{{% notes type="info" %}}
The discussion above is working from the assumption that Pulumi users will store their Pulumi code in a version control system, like Git. Strictly speaking, using a version control system isn't required for Pulumi to function (there is one exception we'll touch on later in this series when we discuss Pulumi Deployments), but we **very strongly** recommend that all users use Pulumi in conjunction with version control.
{{% /notes %}}

In the case of Zephyr, our fictional company and use case, it is a relatively small organization with a single team of developers that are responsible for  managing both the cloud infrastructure as well as the development of the online store application. For their use case, Zephyr felt like a monorepo approach was most appropriate for their specific requirements. They're using a single Pulumi project---for now. (Stay tuned to this blog series to see how that evolves, and why!)

### Addressing the need for multiple environments

The other issue Zephyr encountered is how to handle the need for multiple instances of their application. In addition to a production instance---which is the instance behind Zephyr's public-facing online store---Zephyr also felt they needed an environment for the developers to use in testing changes to the online store.

This use case---needing to have multiple, separate instances of the infrastructure and applications created by a single Pulumi program---is exactly what Pulumi stacks were designed to address. Each stack is a separate instance of the resources created by a Pulumi program within a project. Further, each stack has its own independent state, and each stack has its own configuration values.

<!--Are there other considerations that are involved in deciding whether or not to use stacks?-->

Zephyr decided to go with two stacks: a production stack (named "prod") and a development stack (named "dev").

## The first iteration of Zephyr's code

You can view the first iteration of Zephyr's Pulumi and application code---the iteration that corresponds to the decisions described in this blog post---by navigating to [this GitHub repository](https://github.com/pulumi/zephyr-app/).

<!--Thinking that I'll create a tag for each "version" or "iteration"-->

From that GitHub repository, you can also choose to deploy the Pulumi code yourself. <!--Add instructions after repo tweaks are finished-->

## Summary

In this post, we introduced you to Zephyr, the fictional company and use case for this blog series. We briefly discussed Zephyr's application architecture (a containerized application running on Kubernetes). We also looked at some of the decisions Zephyr needed to make as they got started with Pulumi. Specifically, we discussed the considerations around code placement and the use of multiple stacks.

For now, Zephyr has decided to go with a monorepo approach---a single repository that contains both their application code and the Pulumi code to manage the infrastructure resources. All of the resources are managed in a single Pulumi project, with multiple stacks that correspond to development and production environments. Over the course of this series, we'll see how Zephyr's use of Pulumi changes as Zephyr grows and their application evolves.

In our next Zephyr blog post, we'll take a look at how changes in Zephyr's organizational structure impacts their Pulumi project structure, and explore considerations for how to structure your Pulumi projects.

<!--
Keeping these here for now for ease of use in case I need them:
![Placeholder Image](meta.png)
{{< youtube "kDB-YRKFfYE?rel=0" >}}
{{< tweet id="1202020186234048512" user="pulumipus" >}}
-->
