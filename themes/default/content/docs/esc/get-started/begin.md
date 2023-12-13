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

### Create a Pulumi account

A [Pulumi account](https://app.pulumi.com)

TBD

#### [Optional] Create an access token

Create an [access token](/docs/pulumi-cloud/access-management/access-tokens/)

TBD

### Install the Pulumi ESC CLI

The [Pulumi ESC CLI](/docs/install/esc/)

TBD

{{< notes type="info" >}}
Pulumi ESC is a service of Pulumi Cloud that can be used with or without Pulumi IaC. This means that if you already have the [Pulumi IaC CLI](/docs/cli/) installed, you do not need to install the Pulumi ESC CLI, and you may substitute `pulumi env` anywhere you see the `esc env` command in this guide.
{{< /notes >}}

### Configure OpenID Connect (OIDC)

OpenID Connect configured between Pulumi and one of the below cloud providers:

- [OIDC Configuration for AWS](/docs/pulumi-cloud/oidc/aws/)
- [OIDC Configuration for Azure](/docs/pulumi-cloud/oidc/azure/)
- [OIDC Configuration for Google Cloud](/docs/pulumi-cloud/oidc/gcp/)

TBD

In the next section, you will create a new Pulumi ESC environment.

{{< get-started-stepper >}}
