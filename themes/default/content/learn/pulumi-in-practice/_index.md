---
title: "Pulumi in Practice"
layout: module
date: 2021-09-20T08:30:13-05:00
draft: false
description: Learn how to use Pulumi for more complex configurations with mulitple environments.
meta_desc: Learn how to use Pulumi for more complex configurations with multiple environments.
index: 4
meta_image: meta.png
youll_learn:
    - Using stacks for unique configurations of different environments
    - Sharing values from one Pulumi program or project to another
    - Working with secrets inside of Pulumi
    - Testing your Pulumi programs
tags:
    - learn
providers:
    - aws
block_external_search_index: true
---

This tutorial digs a little deeper into what it means to create multiple Pulumi
programs and work with them interdependently. We will also cover how Pulumi
uses secrets and how you can test your Pulumi programs.

## Time

How long this module will take depends on your internet connection, reading
speed, and other factors. On average, this module should take you about 50
minutes to complete.

## Prerequisites

You should have completed the
[Pulumi Fundamentals pathway]({{< relref "./pulumi-fundamentals" >}}) already.

You will need the following tools to complete this module:

* A [Pulumi account and token]({{< relref "/docs/intro/console/accounts#access-tokens" >}})

As to skills, you should be able to

* use your local terminal.
* read and understand basic Typescript or Python code.
