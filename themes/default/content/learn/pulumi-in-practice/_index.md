---
title: "Pulumi in Practice"
layout: module

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-09-20T08:30:13-05:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the module for review.
draft: false

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Learn how to use Pulumi for more complex configurations.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Learn how to use Pulumi for more complex configurations.

# The order in which the module appears on the home page.
index: 5

# The meta_image appears in social-media previews and on the Learn Pulumi home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for reference.
meta_image: meta.png

youll_learn:
    - Using "stacks" for unique configurations
    - Sharing values from one Pulumi program to another
    - Secrets

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - change-me

# At least one provider is required.
providers:
    - aws

# Exclude from search-engine indexing for now.
block_external_search_index: true
---

This tutorial digs a little deeper into what it means to create multiple Pulumi programs, and work with them interdependently. We will also cover how Pulumi uses secrets.

## Time
How long this module will take depends on your internet connection, reading speed, and other factors. On average, this module should take you about 40 minutes to complete.

## Prerequisites
You will need the following tools to complete this module:

* A [Pulumi account and token](http://app.pulumi.com)
* * If you don’t have an account, go to the [signup page](https://app.pulumi.com/signup).
* Completion of the previous Pulumi Fundamentals tutorials.

As to skills, you should be able to

* use your local terminal.
* read and understand basic Typescript, Python, Go, or C# code.
