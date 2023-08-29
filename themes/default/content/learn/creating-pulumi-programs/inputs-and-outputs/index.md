---
title_tag: Using Inputs and Outputs | Learn Pulumi
title: "Using Inputs and Output"
layout: topic
date: 2021-09-20T08:33:14-05:00
draft: false
description: Learn more about using inputs and outputs in Pulumi.
meta_desc: Learn what inputs and outputs are and how to use them in Pulumi.
index: 2
estimated_time: 10
meta_image: meta.png
authors:
    - torian-crane
tags:
    - aws
    - fundamentals
    - resources
    - inputs
    - outputs
---

All resources in Pulumi accept values that describe the way the resource behaves. We call these values inputs.

## Pre-Requisites

{{< tutorials/prereqs-aws >}}

## Understanding Outputs

A stack can export values as stack outputs. These outputs are shown during an update, can be easily retrieved with the Pulumi CLI, and are displayed in the Pulumi Cloud. They can be used for important values like resource IDs, computed IP addresses, and DNS names.

To export values from a stack, use the following definition in your project:

## Clean Up

{{< cleanup >}}

## Next Steps

In this tutorial, you ...

To learn more about creating resources in Pulumi, take a look at the following resources:

- Learn more about [inputs and outputs](https://www.pulumi.com/docs/concepts/inputs-outputs/) in the Pulumi documentation.
- Learn more about [resource options](https://www.pulumi.com/docs/concepts/options/), and [providers](https://www.pulumi.com/docs/concepts/resources/providers/) in the Pulumi documentation.
