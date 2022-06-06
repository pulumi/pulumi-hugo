---
title: "Terraform Migration and Interoperability"
layout: module
date: 2022-06-03T11:31:52-05:00
draft: false
description: Explore using Pulumi as a replacement for or in conjunction with Terraform.
meta_desc: Explore using Pulumi as a replacement for or in conjunction with Terraform.
index: 14
meta_image: meta.png
youll_learn:
    - how to identify the similaries and differences between HCL and Pulumi code
    - how to make simple translations
    - how to convert using tf2pulumi
    - how to import resources
    - how to ingest Terraform state files so Pulumi can coexist
tags:
    - terraform
providers:
    - terraform
---

## Time

How long this tutorial will take depends on your internet connection, reading speed, and other factors. On average, this tutorial should take you about 60 minutes to complete.

## Prerequisites

You will need the following tools to complete this pathway:

- A [Pulumi account and token]({{< relref "/docs/intro/pulumi-service/accounts#access-tokens" >}})
  - If you don't have an account, go to the [signup page](https://app.pulumi.com/signup).

In addition, you should be able to

- code in Python

We recommend that you either have completed [Pulumi Fundamentals]({{< relref "/learn/pulumi-fundamentals" >}}) and [Building with Pulumi]({{< relref "/learn/building-with-pulumi" >}}) OR have experience using Pulumi for other projects.

## About this pathway

In this pathway, we will explore how you could use Pulumi as a replacement for or in conjunction with Terraform. You will explore how to use various tools to migrate Terraform code and resources to Pulumi, and you will discover how to run Pulumi and Terraform side-by-side for the same infrastructure.

Note that this pathway has some examples we'll build, but you're welcome to use a code example of your own.