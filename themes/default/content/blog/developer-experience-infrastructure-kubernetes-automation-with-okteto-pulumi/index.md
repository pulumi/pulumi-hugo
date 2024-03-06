---
title: "Strategic DevEx: Developer Infrastructure with Pulumi and Okteto"
allow_long_title: true

# The date represents the post's publish date, and by default corresponds with
# the date and time this file was generated. Dates are used for display and
# ordering purposes only; they have no effect on whether or when a post is
# published. To influence the ordering of posts published on the same date, use
# the time portion of the date value; posts are sorted in descending order by
# date/time.
date: 2024-03-06T14:37:09Z

# The draft setting determines whether a post is published. Set it to true if
# you want to be able to merge the post without publishing it.
draft: false

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or
# social-media previews. This field is required or the build will fail the
# linter test. Max length is 160 characters.
meta_desc: "Platform engineers need to prioritize automating cloud resource provisioning. Watch the recording of this DevOps & Platform workshop to learn how to do it with Pulumi and Okteto."

# The meta_image appears in social-media previews and on the blog home page. A
# placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for you.
meta_image: meta.png

# At least one author is required. The values in this list correspond with the
# `id` properties of the team member files at /data/team/team. Create a file for
# yourself if you don't already have one.
authors:
    - arsh-sharma
    - sara-huddleston

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - developer-experience-devex
    - devops
    - platform-engineering
    - kubernetes

# See the blogging docs at https://github.com/pulumi/pulumi-hugo/blob/master/BLOGGING.md
# for details, and please remove these comments before submitting for review.
---

In today's landscape, it is common to build microservices-based applications that leverage resources like RDS databases, storage buckets, and more, from various cloud platforms. Consequently, providing developers access to these resources is crucial during the development phase. Failing to do so forces developers to code in an unrealistic environment, resulting in difficulties and the introduction of bugs. To tackle this challenge, platform engineers should prioritize automating the process. This article will explore how Pulumi and Okteto can effortlessly facilitate this automation.

<!--more-->

Pulumi and Okteto seamlessly integrate to automate the setup of development infrastructure for microservices-based applications. Leveraging Okteto's "External Resources" feature, you can employ your existing Pulumi configuration designed for production to create the development infrastructure seamlessly. What the workshop with a hands-on demo below.

***This article is based on Automate Provisioning Any Dev Resource on Any Cloud Provider With Pulumi and Okteto in Okteto's blog.***

## In this article

- [What is Pulumi?](/blog/developer-experience-infrastructure-kubernetes-automation-with-okteto-pulumi/#what-is-pulumi)
- [What is Okteto?](/blog/developer-experience-infrastructure-kubernetes-automation-with-okteto-pulumi/#what-is-Okteto)
- Watch the workshop [Developer Infrastructure with Pulumi and Okteto](/blog/developer-experience-infrastructure-kubernetes-automation-with-okteto-pulumi/#developer-infrastructure-with-pulumi-and-okteto)


## What is Pulumi?

Pulumi is an open-source infrastructure-as-code tool that allows you to define, deploy, and manage cloud resources on any cloud provider using popular programming languages like Python, TypeScript, Go, etc. 
[Pulumi for Platform Teams](https://www.pulumi.com/blog/developer-portal-platform-teams/) is a platform engineering solution that enables engineers to build a bridge to their developers, empowering them with rich Infrastructure as Code (IaC) components and [developer portals](https://www.pulumi.com/blog/building-developer-portals/) while leveraging the cloud with security, scalability, repeatability, and consistency.

## What is Okteto?

{{< youtube "hqLKqKuAdFA?si=s2w_jTe13Fh1KRlH&t=6?rel=0" >}}

[Okteto](https://www.okteto.com/?utm_source=Pulumi-website&utm_medium=partner-referral&utm_campaign=Okteto-Pulumi) enables Platform teams to bring parity from production to development through automated environments on Kubernetes. With self-service provisioning of defined, production-like environments, development teams can unlock an ultimate development experience with streamlined workflows, and developers can focus on innovation and delivering value to customers faster than ever.

## Developer Infrastructure with Pulumi and Okteto

Explored the fundamentals of automating cloud resource provisioning using Pulumi and Okteto. The hands-on session was specifically designed for developers and platform engineers keen on embracing Infrastructure as Code (IaC) practices through familiar programming languages. Participants learned to deploy cloud resources seamlessly across any cloud provider and elevate their development workflow by leveraging Okteto's on-demand environments.

{{< youtube "HuJNtRGXjs8?rel=0" >}}

The workshop aimed to provide practical skills for enhancing cloud resource management, catering to individuals seeking to optimize their development processes and promote improved collaboration between teams. You can access the workshop's [GitHub repo: Sample App here](https://github.com/okteto/todolist-pulumi-s3).

For a breakdown written tutorial, visit [Automate Provisioning Any Dev Resource on Any Cloud Provider With Pulumi and Okteto](https://www.okteto.com/blog/automate-provisioning-any-dev-resource-on-any-cloud-provider-with-pulumi-and-okteto/?utm_source=YouTube&utm_medium=partner-referral&utm_campaign=Okteto-Pulumi)

## Conclusion

And there you have it! Using Pulumi in conjunction with Okteto makes it incredibly simple to automate the creation of any infrastructure your application needs, all while providing developers with essential access during the development process. Ensuring developers have access to a realistic environment that automates the creation and removal of application resources is paramount, and both Pulumi and Okteto excel in this regard. 

Pulumi enables you to write infrastructure configurations in languages familiar to both platform engineers and developers, while Okteto handles the automation of creating and deleting this infrastructure. Do you want it firsthand? Begin by signing up for a [free open-source account with Pulumi](https://app.pulumi.com/signup) and a [free trial of Okteto](https://www.okteto.com/free-trial/?utm_source=YouTube&utm_medium=partner-referral&utm_campaign=Okteto-Pulumi)!

- Learn more about DevEx in [Beyond Productivity: Developer Experience is Business Critical](https://www.pulumi.com/blog/software-developer-experience-devex-devx-devops-culture/)
- Read [The Pulumi 'Push to start' GitOps Experience](https://www.pulumi.com/blog/pulumi-developer-workflow/)
- Discover [Pulumi for Platform Teams: New Features for Developer Portals, Policy and Deployments](https://www.pulumi.com/blog/developer-portal-platform-teams/)

