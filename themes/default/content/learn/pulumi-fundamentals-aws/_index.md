---
title: "Pulumi Fundamentals on AWS"
layout: module
date: 2021-09-10T09:42:50-05:00
draft: true
description: Learn how to apply Pulumi to Amazon Web Services (AWS).
meta_desc: Learn how to apply Pulumi to Amazon Web Services (AWS).
index: 1
meta_image: meta.png
youll_learn:
    - Working with the AWS resource provider
    - Creating remote resources
    - Using Pulumi with abstractions
tags:
    - fundamentals
    - aws
providers:
    - aws
block_external_search_index: true
---

In this tutorial, we're going to apply what we learned in
[Pulumi Fundamentals]({{< relref "/learn/pulumi-fundamentals" >}}) to
explore a new resource provider: AWS. This tutorial is a hands-on experience, so
you're going to find fewer definitions and more code.

## Time

How long this tutorial will take depends on your internet connection, reading
speed, and other factors. On average, this tutorial should take you about 30
minutes to complete.

## Prerequisites

You must already have completed [Pulumi
Fundamentals]({{< relref "/learn/pulumi-fundamentals" >}}).

You will need the following tools to complete this tutorial:
- A [Pulumi account and token](http:app.pulumi.com)
  - If you don't have an account, go to the
    [signup page](https://app.pulumi.com/signup).
- Python 3.8 or later
- An AWS account (free tier) and the [relevant keys](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys)
- The AWS CLI

{{% notes type="warning" %}}
Please follow the directions to [setup and configure the AWS CLI with
Pulumi]({{< relref "/docs/intro/cloud-providers/aws/setup/" >}}) before you
begin.
{{% /notes %}}

As to skills, you should be able to

- use your local terminal.
- read and understand basic Python code.

## Sample app

The sample app we're building, the Pulumipus Boba Tea Shop, is a progressive web
application (PWA) built with MongoDB, ExpressJS, React, and NodeJS (the MERN
stack). It's a fairly common implementation found in eCommerce applications. We
have adapted this application from
[this repository](https://github.com/shubhambattoo/shopping-cart). The app
consists of a frontend client, a backend REST server to manage transactions, and
a MongoDB instance for storing product data.

We will be referencing the DockerHub images for the app from here on out.

## About this tutorial

The Fundamentals on AWS tutorial discusses using Pulumi to create AWS
infrastructure, configure that infrastructure, and push your infrastructure to
production.

For this tutorial, we will explore how to use a Pulumi provider to work with
AWS.

Let's get started!