---
title_tag: "Pulumi CLI Overview"
title: Pulumi CLI
meta_desc: An overview of the Pulumi CLI and common commands used to deploy cloud applications.
menu:
  cli:
    name: Overview
    identifier: cli
    weight: 7

aliases: [/docs/reference/commands/]
---

Pulumi is controlled primarily using the command line interface (CLI). It works in conjunction with the Pulumi Cloud
to deploy changes to your cloud apps and infrastructure. It keeps a history of who updated what in your team and when.
This CLI has been designed for great inner loop productivity, in addition to
[continuous integration and delivery](/docs/guides/continuous-delivery/) scenarios.

## Installation

The Pulumi CLI is open source and free to use:

<a class="btn" href="/docs/get-started/install">Install Pulumi</a>

## Common Commands

The most common commands in the CLI that you'll be using are as follows:

* [`pulumi new`](pulumi_new): creates a new project using a template
* [`pulumi stack`](pulumi_stack): manage your stacks (at least one is required to perform an update)
* [`pulumi config`](pulumi_config): configure variables such as keys, regions, and so on
* [`pulumi up`](pulumi_up): preview and deploy changes to your program and/or infrastructure
* [`pulumi preview`](pulumi_preview): preview your changes explicitly before deploying
* [`pulumi destroy`](pulumi_destroy): destroy your program and its infrastructure when you're done

## Environment Variables

For a list of environment variables that you can use to work with the Pulumi CLI, see [Environment Variables](/docs/reference/cli/environment-variables/).

## Complete Reference

Below is the complete documentation for all available commands:

{{< pulumi-command >}}
