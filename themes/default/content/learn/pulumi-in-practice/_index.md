---
title: "Pulumi in Practice"
layout: module
date: 2021-09-20T08:30:13-05:00
draft: false
description: Learn how to use Pulumi for more complex configurations.
meta_desc: Learn how to use Pulumi for more complex configurations.
index: 4
meta_image: meta.png
youll_learn:
    - Using "stacks" for unique configurations
    - Sharing values from one Pulumi program to another
    - Secrets
tags:
    - learn
providers:
    - aws
block_external_search_index: true
---

This tutorial digs a little deeper into what it means to create multiple Pulumi
programs, and work with them interdependently. We will also cover how Pulumi
uses secrets.

## Time

How long this module will take depends on your internet connection, reading
speed, and other factors. On average, this module should take you about 40
minutes to complete.

## Prerequisites

You should have completed the
[Pulumi Fundamentals pathway]({{< relref "./pulumi-fundamentals" >}}) already.

You will need the following tools to complete this module:

* A [Pulumi account and token](http://app.pulumi.com)

As to skills, you should be able to

* use your local terminal.
* read and understand basic Typescript or Python code.
