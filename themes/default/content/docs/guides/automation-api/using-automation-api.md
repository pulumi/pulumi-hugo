---
title: Using Automation API
meta_desc: This page contains an overview of core concepts when using Automation API.
weight: 1

menu:
  userguides:
    parent: automation-api
---

Pulumi’s Automation API enables you to provision your infrastructure programmatically using the Pulumi engine by exposing Pulumi programs and stacks as strongly-typed and composable building blocks.

In this guide, you will create an static website in S3 using Automation API.

## Prerequisites

### Install Pulumi

{{< install-pulumi />}}

Install the required language runtime, if you have not already.

### Install Language Runtime

#### Choose Your Language

{{< chooser language "javascript,typescript,python,go,csharp" / >}}

{{% choosable language "javascript,typescript" %}}
{{< install-node >}}
{{% /choosable %}}

{{% choosable language python %}}
{{< install-python >}}
{{% /choosable %}}

{{% choosable language go %}}
{{< install-go >}}
{{% /choosable %}}

{{% choosable language "csharp,fsharp,visualbasic" %}}
{{< install-dotnet >}}
{{% /choosable %}}

Finally, [configure Pulumi with AWS]({{ relref "/docs/intro/cloud-providers/aws/setup" }}).

##
