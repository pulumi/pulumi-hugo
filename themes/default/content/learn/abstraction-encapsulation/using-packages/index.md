---
title: "Using Packages"
layout: topic
date: 2021-11-17
draft: true
description: |
    Here is a brief description of what this topic will cover.
meta_desc: |
    Here is a brief description of what this topic will cover.
index: 2
estimated_time: 10
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - learn
    - registry
    - package
links:
    - text: Pulumi Registry
      url: https://registry.pulumi.com
block_external_search_index: true
---

Now that we understand more about abstraction and encapsulation, let's explore
actually using packages that other people have authored to understand how anyone
can use a package. We'll use this knowledge in the rest of the pathway as we
build our first package.

## Finding a package

There are three different kinds of packages, two of which you will be familiar
with from a user's perspective from prior pathways.

- The first kind is called a native provider. Native providers map cloud
  providers' resource model directly to the Pulumi resource model. If you've
  used Kubernetes with Pulumi, for example, or ever called a package with
  `-native` at the end, you've used a native provider package.
- The second kind is called a bridged provider. Bridged providers use models
  from other ecosystems and map them to the Pulumi resource model. We used a
  bridged provider package when we tested our AWS code in the
  [testing]({{< relref "learn/building-with-pulumi/testing" >}}) tutorial in the
  [Building with Pulumi]({{< relref "learn/building-with-pulumi" >}}) pathway.
- The third kind is called a component package. Think of a component package
  like the equivalent of a CompositeView pattern implementation. Component
  packages allow you to bundle resources together into a well-established
  architectural pattern, like ______ on GCP or ______ on AWS.

We'll be building a component package in a later tutorial.

## Exploring the SDK



## Building 