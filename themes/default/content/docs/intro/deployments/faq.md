---
title_tag: "FAQ and Pricing"
title: "FAQ and Pricing"
meta_desc: Frequently asked questions including pricing, general availability, and roadmap.
menu:
  intro:
    identifier: deploymenst-faq
    parent: deployments
    weight: 7
---

## General Availability

Pulumi Deployments is currently in preview and is expected to reach general availability (GA) by the end of 2023. We view the platform as stable, and production-ready with users including Pulumi itself relying on deployments in production environments every day. Pulumi does not make breaking changes, even to preview APIs. At GA we will cut a new version of the Deployments REST API, and continue to maintain the preview version for one year or until we’ve assisted all users in migrating. The most significant change that will come with GA is the addition of a pricing model with is discussed below.

## Pricing

Pulumi Deployments is free during the preview, with plans to add a pricing model when the platform becomes generally available. We will charge based on the number of deployment minutes that you consume, similar to the billing model of GitHub Actions. Custom contract pricing in advance of GA is available for Enterprise customers.  [Contact us for a quote](https://pulumi.com/contact/?form=sales).

## Roadmap

TODO

## Security and Isolation

Deployments run on single use virtual machines and compute and storage are never shared across runs. We designed our architecture to maximize isolation. In addition, security features like OIDC allow you to fine tune credential scope, lifetime, and expiration policies at a per-deployment level. Self-hosted deployment runners are on our roadmap.
