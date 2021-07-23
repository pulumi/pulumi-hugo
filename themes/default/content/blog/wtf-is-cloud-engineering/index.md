---
title: "Wtf Is Cloud Engineering?"
date: 2021-07-23T12:46:42-05:00
draft: false
meta_desc: "We talk a lot about cloud engineering. But what exactly is it? Let's find out!"
meta_image: cloud-engineering.png
authors:
    - matt-stratton
tags:
    - cloud-engineering
---
When we think about the idea of "cloud engineering", we often think about the concept of taking standard software engineering practices and tools, and making them available and consistent across development, infrastructure, and compliance teams.

This sounds a lot like what DevOps was supposed to accomplish, right? There are a lot of great practices that have come out of software engineering, which can be applied to operations and infrastructure as well. Likewise, practices from the operational disciplines can be applied to development teams.

In the practice of cloud engineering, we look at how all of these practices are available to multiple functions and teams. This is a really powerful concept, and the more that we refactor our thinking around this, the more effective we can be at delivering value to our customers and users.

<!--more-->

Cloud engineering is broken down into three main components: Build, Deploy, and Manage. These are all different areas, but they all have a lot in common. We will dig into each of these areas in detail in upcoming posts in this series, but here are the key concepts around each.

## Build

This might sound like it's just about writing code, but the build area of cloud engineering has to do with how we create the services and infrastructure that provide what our customers need. In today's world, we use cloud resources to build applications, services, and infrastructure. These resources can make up a shared service platform, for example, which give a single, consistent experience across multiple teams.

It's also advantageous to create reusable infrastructure components, so that application and service delivery is focused on differentiators, rather than "reinventing the wheel." Reusable components provide a consistent and standard implementation, using our organizations' and teams' existing practices.

Besides expressing our own best practices and common configurations and approaches, when we build our infrastructure using standard programming languages this allows us to take advantage of the entire ecosystem surrounding them! We can leverage existing IDEs, test frameworks and approaches, and all the other wonderful tools available for those languages. Using modern architectures also puts our focus on the value our services and platforms provide, rather than bespoke and custom implementations.

## Deploy

It doesn't count until it's in production, right? Code and infrastructure doesn't give any value until it's in front of our customers and users. But doing this in a manner that is highly efficient and quality-consistent is key. Deployment processes that take too long, or require too many manual steps can block us on getting new features to our customers or resolving service issues.

When we apply software engineering practices to our deployment processes, this can ensure that we ship the same way, ever time. It's become common practice to apply the principles of continuous integration and delivery to our application software, but we can use the same principles with our infrastructure. This means that new and changed infrastructure resources can meet our quality controls, as well as be tracked and understood when we are investigating the dreaded "what changed?" problem.

The value of automating deployment isn't just about providing the tests; it ensures all the steps we require are performed every time. Regardless of years of experience, every human is capable of missing a step or making an error. We want to have our skilled humans focus on the areas that benefit from human expertise, and not waste their time on the things that don't.

"But what about checklists?" Checklists are great! But they are even better when they are defined by a human, and run by software. The power of a checklist is in the definition of the steps - and in many ways, our automation is expressing our checklists in code. Code that can be tested, reviewed, and managed.

But beyond simple automation, having a unified approach to deployment for both application code and infrastructure changes allows us to consider the automation as the key part of application that it is. We think about infrastructure as a critical and essential component, rather than something that happens "on the side."

## Manage

Getting our services into production is a key step, but it's not the end. Our services and applications are being used by our customers constantly, and we need to be able to manage all of the resources that are being used. Visibility across all of our infrastructure, as it applies to our applications and services, allows everyone on our team, regardless of their role, to have a common understanding of what's going on.

You may be familiar with the adage "security is everyone's job". What that means in the world of cloud engineering is that we consider security and compliance (whether regulatory policies or organizational policies) to be closely integrated into our work. Treating our policy as code, just as we treat our infrastructure as code, is a powerful idea! When we express these policies as code, rather than prose in a document, we can apply these policy checks both before and after we deploy our services and infrastructure. This extends the common "vocabulary" for collaboration across all teams, regardless of where they sit in the org chart.

Another key piece of the manage story is that we need controls in place around who can make changes and what they can change! We trust our team members to want to do the right thing, but we also need guardrails and controls in place to ensure that they are able to do so. This means that we need visibility into any and all changes that occur - treating our infrastructure just like we do our source code in git! Additionally, having the capability and intentionality around fine-grained access controls is critical to make all of our team members successful - as well as providing reliability around our services - and providing confidence for our customers.

## Summary

When we take the ideas of cloud engineering and apply them to our own organizations, we can deliver value to our customers and users. We can do this by applying the practices and tools that are already available to our teams, and by applying the same principles to our infrastructure and application code. We get increased collaboration capability within our teams, a higher level of trust and confidence in our services and applications, and a better handle on the complexity of the modern cloud. In future posts, we will explore some specific practices and tools around each of these areas and how it can be applied to your own organization!
