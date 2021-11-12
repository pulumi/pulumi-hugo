---
title: "Nov. 17 releases: TODO"
date: 2021-11-17T08:00:00-07:00
draft: false
meta_desc: TODO UPDATECloud Engineering Summit sessions on-demand, Pulumi Kubernetes Operator 1.0 & Pulumi Registry launches, new features in Pulumi Packages and
meta_image: meta.png
authors:
    - alex-mullans
tags:
    - features
---

TODO catchy intro

- Pulumi Registry, Pulumi Packages, & integrations
  - [New resources in the AWS Native provider]({{<relref "/blog/pulumi-release-notes-m64#new-resources-in-the-aws-native-provider">}})
  - [New resources in the Azure Native provider]({{<relref "/blog/pulumi-release-notes-m64#new-resources-in-the-azure-native-provider">}})
- Pulumi CLI and core technologies
- Pulumi Service & Pulumi.com

<!--more-->

## Pulumi Registry, Pulumi Packages, & integrations

### New resources in the AWS Native provider

We shipped new versions of the AWS Native provider (0.3.0 through 0.4.0) that added [38 new resources](https://github.com/pulumi/pulumi-aws-native/compare/v0.2.0...v0.4.0#diff-1ac835cc58d7899e9299c7570151c7b0d7732c78f1bd53fe25fd4189b72e168e) giving you access to resources like `AWS::EKS::Cluster`, `AWS::Lightsail::Database`, and several new resources in the `AWS::Redshift` namespace.

### New resources in the Azure Native provider

We shipped new versions of the Azure Native provider (1.43.0 through 1.45.0) that collectively added [4 new resources](https://github.com/pulumi/pulumi-azure-native/blob/master/CHANGELOG.md#1450-2021-11-05) giving you access to resources like Cognitive Services.

## Pulumi CLI and core technologies

In this milestone, we shipped Pulumi versions [3.16.1](https://github.com/pulumi/pulumi/releases/tag/v3.16.1) through [3.17.0](https://github.com/pulumi/pulumi/releases/tag/v3.17.0). The full list of changes in each version is available in the [changelog](https://github.com/pulumi/pulumi/blob/master/CHANGELOG.md); read on to learn about some of the biggest changes.

## Pulumi Service & Pulumi.com
