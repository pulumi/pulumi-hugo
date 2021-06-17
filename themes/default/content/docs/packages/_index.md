---
title: Packages
meta_desc: This page provides an overview of the different Cloud Providers supported by the Pulumi
           Cloud Development Platform.
menu:
  packages:
    name: Overview
    weight: 1
---

Pulumi Packages are the core technology that enables cloud infrastructure resource provisioning to be defined once, and made available to users in all Pulumi languages. With Pulumi Packages, [Resources and Components]({{<relref "/docs/intro/concepts/resources">}}) can be written once, in your preferred language, and made available in all the other languages supported by Pulumi.

## Types of Pulumi Packages

There are three different types of Pulumi Packages:

1. **Native Pulumi Provider Packages:** Use the full features of the Pulumi resource model to create a provider for a new cloud platform. Examples: the [`kubernetes`]({{<relref "/docs/reference/pkg/kubernetes">}}), [`azure-native`]({{<relref "/docs/reference/pkg/azure-native">}}), and [`google-native`]({{<relref "/docs/reference/pkg/google-native">}}) packages.
2. **Bridged Provider Packages:** Take an existing resource provider from another supported ecosystem (like a Terraform provider), and bridge it to be exposed as a Pulumi Package. Examples: the [`aws`]({{<relref "/docs/reference/pkg/aws">}}), [`tls`]({{<relref "/docs/reference/pkg/tls">}}), and [`cloudflare`]({{<relref "/docs/reference/pkg/cloudflare">}}) packages.
3. **Component Package:** Write a Pulumi Component in your language of choice and expose it to users in all Pulumi languages. Example: the [`eks`]({{<relref "/docs/reference/pkg/eks">}}) package.

