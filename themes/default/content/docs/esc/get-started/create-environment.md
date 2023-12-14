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

An environment can be created one of two ways:

- via the Pulumi ESC console
- via the CLI

This tutorial will walk you through how to create an environment using either option.

## Create environment via the console

To create an environment via the console, navigate to [Pulumi Cloud](https://app.pulumi.com) and select the **Environments** link in the left-hand menu.

You will be directed to the Environments landing page. To create a new environment, click the **Create environment** button, and then enter a name for your environment (e.g., `my-dev-environment` for a development environment).

![Creating a new environment in the Pulumi Cloud console](./esc-create-environment.gif)

## Create environment via the CLI

To create an environment via the CLI, use the following command, where `<org-name>` is optional and defaults to your Pulumi Cloud username.

```bash
esc env init [<org-name>/]<environment-name>
```

Note that environment names must be unique within an organization and may only contain alphanumeric characters, hyphens, underscores, and periods.

```bash
$ esc env init myorg/test
Environment created.
```

You can validate that your environment was created by running the `esc env ls` which will list all of the environments that you have access to.

```bash
$ esc env ls
myorg/test
```

{{< get-started-stepper >}}
