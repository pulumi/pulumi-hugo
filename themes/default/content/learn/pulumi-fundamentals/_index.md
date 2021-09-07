---
title: "Pulumi Fundamentals"
layout: module
date: 2021-09-10T12:00:00-05:00
draft: true
description: Use Pulumi to build, configure, and deploy a modern application.
meta_desc: Use Pulumi to build, configure, and deploy a modern application.
index: 0
meta_image: meta.png
youll_learn:
    - creating Projects
    - configuring and provisioning infrastructure
    - exporting Outputs
tags:
    - fundamentals
providers:
    - docker
block_external_search_index: true
---

This tutorial module demonstrates how to use Pulumi to build, configure, and
deploy a modern application using Docker. We will create a frontend, a backend,
and MongoDB container to deploy the Pulumipus Boba Tea Shop. Along the way,
we'll learn more about cloud computing through how Pulumi operates.

## Time

How long this module will take depends on your internet connection, reading
speed, and other factors. On average, this module should take you 30 to 40
minutes to complete.

## Prerequisites

You will need the following tools to complete this module:
- A [Pulumi account and token](http:app.pulumi.com)
  - If you don't have an account, go to the
    [signup page](https://app.pulumi.com/signup).
- [Docker](https://docs.docker.com/get-docker/)
- Python 3.8 or later

As to skills, you should be able to

- use your local terminal.
- read and understand basic Python code.
- read and understand Dockerfiles or understand basic Docker concepts.

## Sample app

The sample app we're building, the Pulumipus Boba Tea Shop, is a progressive web
application (PWA) built with MongoDB, ExpressJS, NodeJS, and React (the MERN
stack). It's a fairly common implementation found in eCommerce applications. We
have adapted this application from
[this repository](https://github.com/shubhambattoo/shopping-cart). The app
consists of a frontend client, a backend REST server to manage transactions, and
a MongoDB instance for storing product data.

## About this module

The Fundamentals module discusses using Pulumi to create infrastructure,
configure that infrastructure, and push your infrastructure to production.

For this starting module, we will use Docker to let you learn the basics of
Pulumi without a cloud account. We will explore creating a Pulumi Project,
building Docker images, configuring and provisioning containers, and exporting
outputs.

Let's get started!
