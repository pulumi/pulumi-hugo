---
title: Configuring OIDC
title_tag: Configuring OpenID Connect for Pulumi ESC
h1: Configuring OpenID Connect for Pulumi ESC
meta_desc: Learn how to configure Pulumi ESC to use OpenID Connect to authenticate to major cloud providers.
meta_image: /images/docs/meta-images/docs-meta.png
menu:
  pulumicloud:
    identifier: configure-oidc
    parent: esc
    weight: 5
---

## Overview

This document outlines the steps required to configure Pulumi ESC to use OpenID Connect (OIDC) to authenticate with the AWS, GCP, and Azure providers.

The below Pulumi-specific configuration details will be applicable across all providers:

| Name | Value |
|----------|----------|
| Issuer URL | https://api.pulumi.com/oidc   |
| Subject Claim | `pulumi:environments:org:<your-pulumi-org>:env:<your-environment-name>`   |
| Audience | This refers to the name of your Pulumi organization   |

Make a note of these values before following the steps of your chosen provider.

### Prerequisites

- You must be an admin of your Pulumi Organization
- You must have provider-specific permissions to create and configure OIDC-related resources

## Configuring OpenID Connect for AWS

{{< inject-section "docs/pulumi-cloud/esc/oidc-config/aws-content.txt" >}}

## Configuring OpenID Connect for Azure

{{< inject-section "docs/pulumi-cloud/esc/oidc-config/azure-content.txt" >}}

## Configuring OpenID Connect for Google Cloud

{{< inject-section "docs/pulumi-cloud/esc/oidc-config/gcp-content.txt" >}}

## Integrating OIDC in your Environments

TBD

[Pulumi ESC Syntax Reference](/docs/pulumi-cloud/esc/reference/)
