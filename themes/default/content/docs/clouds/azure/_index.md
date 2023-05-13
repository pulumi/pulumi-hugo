---
title_tag: "Azure & Pulumi"
meta_desc: Pulumi offers full support for AWS, with two providers, 5+ components, and templates.
title: "Azure"
h1: Azure & Pulumi
notitle: true
h1_gradient_width: 200
h1_gradient_name: azure
menu:
  clouds:
    identifier: azure
    weight: 1
cloud_overview: true
description: Build infrastructure intuitively on Azure using TypeScript, Python, Go, C#, Java or YAML. The Azure Native provider is always up-to-date and covers 100% of the resources in Azure Resource Manager.
get_started_guide:
  link: get-started/
  icon:
providers:
- display_name: Azure Native
  recommended: true
  content_links: 
  - display_name: Overview
    icon: page-small-black
    url: azure-native/
  - display_name: Install & config
    icon: gear-small-black
    url: azure-native/installation-configuration/
  - display_name: API docs
    icon: book-small-black
    url: azure-native/api-docs/
  - display_name: How-to guides
    icon: question-small-black
    url: azure-native/how-to-guides/
- display_name: Azure Classic
  content_links:
  - display_name: Overview
    icon: page-small-black
    url: azure/
  - display_name: Install & config
    icon: gear-small-black
    url: azure/installation-configuration/
  - display_name: API docs
    icon: book-small-black
    url: azure/api-docs/
  - display_name: How-to guides
    icon: question-small-black
    url: azure/how-to-guides/
components:
- display_name: Azure Active Directory (Azure AD)
  url: azuread/
- display_name: Azure DevOps
  url: azuredevops/
- display_name: Azure QuickStart ACR Geo Replication
  url: azure-quickstart-acr-geo-replication/
- display_name: Azure static website
  url: azure-static-website/
convert:
- heading: Convert ARM Templates to Pulumi
  url: /arm2pulumi/
  description: Convert ARM Templates templates to your language of choice with Pulumi's conversion tool.
templates:
- display_name: Container service on Azure
  url: container-service/azure/
- display_name: Azure Serverless application
  url: serverless-application/azure/
- display_name: Azure static website
  url: static-website/azure/
- display_name: Virtual machine on Azure
  url: virtual-machine/azure/
---
