---
title: "Pulumi Fundamentals on GCP"
layout: module
date: 2021-09-10T09:43:18-05:00
draft: true
description: Learn how to apply Pulumi to Google Cloud Product (GCP).
meta_desc: Learn how to apply Pulumi to Google Cloud Product (GCP).
index: 1
meta_image: meta.png
youll_learn:
    - Stuff
    - Things
    - Whatnot
tags:
    - fundamentals
    - gcp
providers:
    - gcp
block_external_search_index: true
---

In this tutorial, we're going to learn more about how to use Pulumi with GCP.
Specifically, we'll build on what we learned with
[Pulumi Fundamentals]({{< relref "/learn/pulumi-fundamentals" >}}) to
explore a new provider.

## Time

How long this tutorial will take depends on your internet connection, reading
speed, and other factors. On average, this tutorial should take you about 40
minutes to complete.

## Prerequisites

You should already have completed
[Pulumi Fundamentals]({{< relref "/learn/pulumi-fundamentals" >}}).

You will need the following tools to complete this tutorial:
- A [Pulumi account and token](http:app.pulumi.com)
  - If you don't have an account, go to the
    [signup page](https://app.pulumi.com/signup).
- Python 3.8 or later
- An GCP account (free tier)

As to skills, you should be able to

- use your local terminal.
- read and understand basic Python code.

## Sample app

The sample app we're building, the Pulumipus Boba Tea Shop, is a progressive web
application (PWA) built with MongoDB, ExpressJS, NodeJS, and React (the MERN
stack). It's a fairly common implementation found in eCommerce applications. We
have adapted this application from
[this repository](https://github.com/shubhambattoo/shopping-cart). The app
consists of a frontend client, a backend REST server to manage transactions, and
a MongoDB instance for storing product data.

We will be referencing the DockerHub images for the app from here on out.

## About this tutorial

The Fundamentals on GCP tutorial discusses using Pulumi to create GCP
infrastructure, configure that infrastructure, and push your infrastructure to
production.

For this tutorial, we will explore how to use a Pulumi provider to work with
GCP.

Let's get started!