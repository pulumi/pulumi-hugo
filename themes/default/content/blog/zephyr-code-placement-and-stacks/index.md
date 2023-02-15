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

Here are links to all the blog posts in the series:

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

Zephyr's application is the second generation of their online store. Their first generation was a monolith that they manually deployed, but as they prepare for the next phase of their growth---driven by robust sales of arcane artifacts---they've moved to a containerized microservices architecture. Here's a diagram of their second-generation application architecture:

![Placeholder Image](meta.png)

Astute readers may note that this looks pretty similar to [this application](https://github.com/aws-containers/retail-store-sample-app/); in truth, we're using a fork of the AWS Containers retail store example as the basis for our fictional scenario (many thanks to the AWS Containers DA team for their hard work here!).

## Deploying the application with Pulumi

As part of the switch to their new architecture, Zephyr has decided they want to use Pulumi to manage the infrastructure and application. As they prepared to embark on using Pulumi, a couple of questions came up for the Zephyr team:

* Where should they store their Pulumi code? The ability for Zephyr's developers to use a full programming language to manage the infrastructure and deployment of their online store is a huge plus, but should this code go in the same repository as their application code? Or a different repository?
* How do they address the need for multiple environments? It's pretty clear to the Zephyr development team that they'll need multiple instances of the online store (for things like testing, QA, or development). What's the best way to handle this when using Pulumi?

Let's examine each of these issues in a bit more detail, and see how Zephyr is choosing to proceed.

### Storing their Pulumi code

When it comes to answering the question of where to store Pulumi code relative to the application(s) it supports, there are three basic options:

1. In the same repository and same branch as your application code
2. In the same repository as your application code, but in a different branch
3. In a separate repository from your application code

Each of these options has its own advantages and disadvantages. For example, ...

Additionally, there are other considerations that might affect which decision an organization might choose.

* Smaller organizations will typically have smaller teams that deal with both infrastructure as code artifacts as well as application development. In cases like this, using the same repository and same branch as the application code works well.
* As organizations grow, however, teams may split and the responsibility for different parts of the code may diverge. In that case, it may make more sense for the Pulumi code to be stored separately from the application code so that appropriate access controls can be enforced. This is also typically the situation for large organizations where there are already separate teams for application development and platform engineering-type functions.

{{% notes type="info" %}}
The discussion above is working from the assumption that Pulumi users will store their Pulumi code in a version control system, like Git. Strictly speaking, using a version control system isn't required for Pulumi to function (there is one exception we'll touch on later in this series when we discuss Pulumi Deployments), but we **very strongly** recommend that all users use Pulumi in conjunction with version control.
{{% /notes %}}

Zephyr is a small organization with a single team of developers that are responsible for both managing the cloud infrastructure as well as the development of the online store application. For their use case, Zephyr felt like a single repository/same branch approach was most appropriate for their specific requirements.

### Addressing the need for multiple environments

The other issue Zephyr encountered is how to handle the need for multiple instances of their application. In addition to a production instance---which is the instance behind Zephyr's public-facing online store---Zephyr also felt they needed an environment for the developers to use in testing changes to the online store.

This use case---needing to have multiple, separate instances of the infrastructure and applications created by a single Pulumi program---is exactly what Pulumi stacks were designed for. Each stack is a separate instance of the resources created by a Pulumi program within a project. Further, each stack has its own, independent state, and each stack has its own configuration values.

Zephyr decided to go with two stacks: prod and dev.

## The first iteration of their Pulumi code

You can view the first iteration of Zephyr's Pulumi code---the iteration that corresponds to the decisions described in this blog post---by navigating to [this GitHub repository](https://github.com/pulumi/zephyr-app/).

<!--Thinking that I'll create a tag for each "version" or "iteration"-->

## Summary

In this post, you saw how Zephyr used Pulumi to deploy their
application, and looked at some of the decisions Zephyr needed to make
along the way. Specifically:

* Zephyr chose to use a single Pulumi project
* Zephyr decided to store their Pulumi code in the same repo and branch as the code for their online store application
* Zephyr used multiple stacks to instantiate multiple instances of their online store: one for production, and one for development.

In our next Zephyr blog post, read about...

<!--
Keeping these here for now for ease of use in case I need them:
![Placeholder Image](meta.png)
{{< youtube "kDB-YRKFfYE?rel=0" >}}
{{< tweet id="1202020186234048512" user="pulumipus" >}}
-->
