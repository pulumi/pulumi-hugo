---
title: "Abstracting Pulumi Code"
layout: topic
date: 2021-11-17
draft: true
description: |
    Learn more about abstracting Pulumi code into classes, models, and objects.
meta_desc: |
    Learn more about abstracting Pulumi code into classes, models, and objects.
index: 0
estimated_time: 10
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - learn
# links:
    # - text: Some Website
    #   url: http://something.com
block_external_search_index: true
---

Just like any application code, Pulumi infrastructure code can be abstracted,
enabling us to work with models or objects, dpendeding on which language we use
to define that code. If we use an object-oriented langauge such as Javascript,
Python, or Typescript, we can create and instantiate classes.




Breaking apart Pulumi code is essential to keeping a clean, well-organized, and
easily maintained code base that enables teams to collaborate to enhance current
systems. Let's try taking our boba shop application and building up a more
complex infrastructure.

## Breaking apart Pulumi code




## Understanding resources as objects

Depending on how familiar you are with object-oriented paradigms, this concept
of everything being an object may be confusing. 



## Sharing abstractions (or when is this a package?)

When we want to share the abstracted code that we have outside of a single team,
we likely want to package that code to share so others can export it without
needing to pull down and understand the code base itself. How do we know when we
have hit that point?