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

Pulumi ESC is a service of Pulumi Cloud, meaning you will need to create a Pulumi account to be able to use it. To do so, navigate to the [Pulumi Cloud console](https://app.pulumi.com) and create a new account.

Once created, you can optionally create an [access token](/docs/pulumi-cloud/access-management/access-tokens/). Doing so will enable you an alternative way to sign into the Pulumi Cloud via the CLI. The token can also be used to automate your usage of the Pulumi Cloud using the REST API.

### Install the Pulumi ESC CLI

{{< notes type="info" >}}
Pulumi ESC can be used with or without Pulumi IaC. This means that if you already have the [Pulumi IaC CLI](/docs/cli/) installed, you do not need to install the Pulumi ESC CLI, and you may substitute `pulumi env` anywhere you see the `esc env` command in the rest of this tutorial.
{{< /notes >}}

{{< chooser os "macos,windows,linux" >}}

{{% choosable os macos %}}

```bash
$ brew update && brew install pulumi/tap/esc
```

{{% /choosable %}}

{{% choosable os linux %}}

```bash
$ curl -fsSL https://get.pulumi.com/esc/install.sh | sh
```

{{% /choosable %}}

{{% choosable os windows %}}

<div class="mb-6 border-solid border-b-2 border-gray-200">
<div class="w-full">
<h3 class="no-anchor pt-4"><i class="fas fa-download pr-2"></i>Windows Binary Download</h3>
<p>
<a class="btn btn-secondary mx-2" href="https://get.pulumi.com/esc/releases/esc-v{{< latest-version-esc >}}-windows-x64.zip">amd64</a>
</p>
</div>
</div>

{{% /choosable %}}

{{% /chooser %}}

Or explore [more installation options](/docs/install/esc/).

### Configure OpenID Connect (OIDC)

Pulumi supports [OpenID Connect (OIDC) integration](/docs/pulumi-cloud/oidc/) across various services including Pulumi ESC. OIDC enables secure interactions between Pulumi and cloud providers by leveraging signed, short-lived tokens issued by the Pulumi Cloud. Use one of the following guides below to configure OIDC between Pulumi and your chosen cloud provider:

- [OIDC Configuration for AWS](/docs/pulumi-cloud/oidc/aws/)
- [OIDC Configuration for Azure](/docs/pulumi-cloud/oidc/azure/)
- [OIDC Configuration for Google Cloud](/docs/pulumi-cloud/oidc/gcp/)

In the next section, you will start your journey with Pulumi ESC by creating a new environment.

{{< get-started-stepper >}}
