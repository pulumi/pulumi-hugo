---
title: Automation API
meta_desc: Pulumi’s approach to infrastructure as code is great for continuous delivery,
           secure collaboration, and easy management of common cloud services and operations.
menu:
    userguides:
        identifier: automation-api
        weight: 3
---

The Pulumi Automation API is a programmatic interface for running Pulumi programs without the Pulumi CLI. Conceptually, this can be thought of as encapsulating the functionality of the CLI (`pulumi up`, `pulumi preview`, `pulumi destroy`, `pulumi stack init`, etc.) but with more flexibility. It is a strongly typed and safe way to use Pulumi in embedded contexts such as web servers without having to shell out to a CLI.

Automation API allows you to define a Pulumi program as a function within your codebase rather than in a separate project and use methods to get and set configuration parameters programmatically. It uses a gRPC interface to execute programs that control and communicate with the core Pulumi engine.

{{% notes type="info" %}}
Automation API requires the Pulumi CLI to be installed and available on your `PATH` environment variable.
{{% /notes %}}

## Getting started

To get started with Automation API, see the [static website tutorial]({{< relref "/docs/guides/automation-api/using-automation-api.md" >}}).

## Examples

Visit the [Automation API Examples repo](https://github.com/pulumi/automation-api-examples) for the complete list of Automation API code examples written in TypeScript, Python, Go, and C#.

## Automation API reference

[TODO: Need link.]

## FAQs

Get the answers to some [Frequently Asked Questions]({{< relref "/docs/guides/automation-api/faq.md" >}}) about Automation API.