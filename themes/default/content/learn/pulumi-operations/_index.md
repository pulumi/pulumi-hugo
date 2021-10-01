---
title: "Pulumi in Operations"
layout: module
date: 2021-09-15T12:19:39-05:00
draft: false
description: Learn how to use Pulumi from an operational perspective.
meta_desc: Learn how to use Pulumi from an operational perspective.
index: 5
meta_image: meta.png

youll_learn:
    - CI/CD
    - Access Control
    - Webhooks
    - Policy as Code

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - learn
    - tutorials
    - operations

# At least one provider is required.
providers:
    - aws
block_external_search_index: true
---

This pathway demonstrates how to use Pulumi from an operational perspective. We will go walk through integrating Pulumi with your CI/CD pipeline using GitHub Actions, talk about how Pulumi can help with access control, show you how to enforce policies in AWS using Pulumi Crosswalk, and demonstrate the setup of a webhook.

## Prerequisites

You will need the following tools to complete this module:
- A [Pulumi account and token]({{< relref "/docs/intro/console/accounts#access-tokens" >}})
  - If you don't have an account, go to the
    [signup page](https://app.pulumi.com/signup).
- The Boba Tea app from Pulumi Fundamentals
- Python 3.8 or later

As to skills, you should be able to:

- use your local terminal.
- read and understand basic Python code.