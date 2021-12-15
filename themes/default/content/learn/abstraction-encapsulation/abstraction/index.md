---
title: "Abstracting Pulumi Code"
layout: topic
date: 2021-11-17
draft: false
description: |
    Learn more about abstracting Pulumi code into classes, models, and objects.
meta_desc: |
    Learn more about abstracting Pulumi code into classes, models, and objects.
index: 0
estimated_time: 5
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - learn
block_external_search_index: false
---

Just like any application code, Pulumi infrastructure code can be abstracted,
enabling us to work with models or objects, depending on which language we use
to define that code. If we use an object-oriented langauge such as Javascript,
Python, or Typescript, we can create and instantiate classes. For languages like
Go, we can build up interfaces. Either way, we're thinking in terms of taking
code that we've written and making it reusable in some form.

Breaking apart Pulumi code is essential to keeping a clean, well-organized, and
easily maintained code base that enables teams to collaborate to enhance current
systems. As the owners of the infrastructure for the Pulumipus brand, we've got
a lot of resources to maintain, and it's much better to reuse code that we write
once rather than repeating ourselves continuously in our program and throughout
all of the programs we maintain.

Let's first explore abstraction.

## Thinking in abstraction

When we use our code for our Pulumi program, we're generally starting out with a
declarative thought process. We write code that declares we want three resources
of a specific type, in that order, and run the code to create those three
resources in order.

To get to more complex architectures, we need to enable the ability to break
apart that code so we can reuse components and call things in any order we
choose, knowing that we will get the expected result each time. We also need to
allow others to use parts of our code without necessarily needing to know
precisely how it's put together. This abstractionist way of thinking means we're
thinking in terms of the mental models we use to understand the cloud
architectures that are available to us&mdash;or what we want to make available
to others in our organization.

## Exploring an example

Let's imagine the Pulumipus brand is expanding to all kinds of systems, and so
we don't know which infrastructure each team will need. However, each team will
need some kind of storage location that has an access policy, no matter whether
they're doing a serverless build or a compute-based build.

Mentally, we're defining a sort of abstraction like this:

![A diagram showing a user doing an action that touches the storage through a policy](./abstraction.png)

Seems pretty clean, doesn't it? Abstraction is thinking through what we
experience when we call the code, so that anyone calling that code experiences
the same thing. The part that gets complicated is when we start translating that
idea to code.

Let's now go explore the more practical encapsulation concept!
