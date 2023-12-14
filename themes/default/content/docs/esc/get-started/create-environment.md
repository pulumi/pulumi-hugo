---
title_tag: Create a New Environment | Pulumi ESC
title: Create environment
h1: "Pulumi ESC: Create a new environment"
meta_desc: This page provides an overview on how to create a new Pulumi ESC environment.
weight: 3
menu:
  pulumiesc:
    parent: esc-get-started
    identifier: esc-get-started-create-environment

---

## Overview

In Pulumi ESC, an environment is a collection of configuration intended to capture the configuration values needed to work with a particular environment.

In an environment file, values are defined as a series of key-value pairs in YAML format. All variables will be defined under a top-level key named `values`. These values can be strings, numbers, or arrays, and they can be manually provided, dynamically generated from external sources, or referenced from other values in the file.

```yaml
values:
  myKey1: "myValue1"
  myNestedKey:
    myKey2: "myValue2"
```

An environment can be created one of two ways:

- via the Pulumi ESC console
- via the CLI

This tutorial will walk you through how to create an environment using either option.

## Create environment via the console

To create an environment via the console, navigate to [Pulumi Cloud](https://app.pulumi.com) and select the `Environments` link in the left-hand menu.

You will be directed to the Environments landing page. To create a new environment, click the `Create environment` button, and then enter a name for your environment (e.g., `my-dev-environment` for a development environment).

![Creating a new environment in the Pulumi Cloud console](./esc-create-environment.gif)

## Create environment via the CLI

TBD

{{< get-started-stepper >}}
