---
title_tag: Before You Begin | Pulumi ESC
title: Before you begin
h1: "Pulumi ESC: Before you begin"
meta_desc: This page provides an overview on how to get started with Pulumi ESC.
weight: 2
menu:
  pulumi-esc:
    parent: esc
    identifier: esc-get-started-begin
---

Before you get started using Pulumi ESC, let's run through a few quick steps to ensure your environment is set up correctly.

You will need the following prerequisites to complete this tutorial:

- A [Pulumi account](https://app.pulumi.com)
  - [Optional] Create an [access token](/docs/pulumi-cloud/access-management/access-tokens/)
- The [Pulumi ESC CLI](/docs/install/esc/)
{{< notes type="info" >}}
Pulumi ESC is a service of Pulumi Cloud that can be used with or without Pulumi IaC. This means that if you already have the [Pulumi IaC CLI](/docs/cli/) installed, you do not need to install the Pulumi ESC CLI, and you may substitute `pulumi env` anywhere you see the `esc env` command in this guide.
{{< /notes >}}
- An [Amazon Web Services](https://aws.amazon.com/) account
- The [AWS CLI](https://aws.amazon.com/cli/)
- OpenID Connect configured between Pulumi and one of the below cloud providers:
  - [OIDC Configuration for AWS](/docs/pulumi-cloud/oidc/aws/)
  - [OIDC Configuration for Azure](/docs/pulumi-cloud/oidc/azure/)
  - [OIDC Configuration for Google Cloud](/docs/pulumi-cloud/oidc/gcp/)
- Python 3.7 or higher installed

Let's get started!
