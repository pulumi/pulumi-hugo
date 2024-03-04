---
title: "Iac Recommended Practices: Wrapping Up"
date: 2024-03-11
draft: false
meta_desc: This wraps up the series on IaC recommended practices, summarizing the previous posts and pointing out areas of future growth for the Zephyr team.
meta_image: meta.png
authors:
    - aaron-kao
    - christian-nunciato
    - scott-lowe
tags:
    - best-practices
    - zephyr
---

Welcome to the final post in our series of articles focused on infrastructure as code (IaC) recommended practices. In this post, we'll wrap up our recommendations for IaC with Pulumi, summarizing the recommendations from previous posts as well as highlighting some areas of potential future growth for the team at Zephyr Archaeotech Emporium---the fictional company at the center of the story throughout this series.<!--more-->

For ease of navigation, here are links to all the blog posts in the series (any entries listed below that aren't linked haven't yet been published; this list will get updated as new posts go live):

* [IaC Recommended Practices: Code Organization and Stacks](/blog/iac-recommended-practices-code-organization-and-stacks/)
* [IaC Recommended Practices: Developer Stacks and Git Branches](/blog/iac-recommended-practices-developer-stacks-git-branches/)
* [IaC Recommended Practices: Structuring Pulumi Projects](/blog/iac-recommended-practices-structuring-pulumi-projects/)
* [IaC Recommended Practices: Using Stack References](/blog/iac-recommended-practices-using-stack-references/)
* [IaC Recommended Practices: RBAC and Security](/blog/iac-recommended-practices-rbac-and-security/)
* [IaC Recommended Practices: Using Automation API](/blog/iac-recommended-practices-using-automation-api/)
* **IaC Recommended Practices: Wrapping Up** (this post)

## Recapping infrastructure as code with Pulumi at Zephyr

As this series has progressed, we've been showing you how Zephyr's use of Pulumi has changed in response to the organization, the team, and the application has changed. In case you haven't been following along---or in case you need a refresher---here's a brief summary of what's happened in the series:

* Zephyr started with a single project in a single repository with two stacks, one for production and one for testing. _(Details are available in [the first blog post](/blog/iac-recommended-practices-code-organization-and-stacks/) in the series.)_
* Zephyr quickly added per-developer stacks as a way to enhance developer productivity. _(You can read about per-developer stacks in [the second post](/blog/iac-recommended-practices-developer-stacks-git-branches/) in the series.)_
* As Zephyr continued to grow, their single Pulumi project grew into three different Pulumi projects: one for base infrastructure, one for their Kubernetes platform, and one for the online store application. _(The [third post in the series](/blog/iac-recommended-practices-structuring-pulumi-projects/) describes the reasoning for adopting multiple projects.)_
* Accompanying the switch to multiple projects, Zephyr implemented stack references (to pass information between stacks in different projects) and applied role-based access control (RBAC) to the stacks in Pulumi Cloud. _(Refer back to [the fourth post](/blog/iac-recommended-practices-using-stack-references/) and [the fifth post](/blog/iac-recommended-practices-rbac-and-security/) in the series for more details on each of these areas.)_
* Zephyr realized a need to split out their data layer, going from three projects to four projects, and along the way saw an opportunity to add a higher level of orchestration using the Pulumi Automation API. _(Refer back to [our sixth post](/blog/iac-recommended-practices-using-automation-api/) for more details on Zephyr's initial use of Automation API.)_

Since the last blog post, the Zephyr team has continued to explore Automation API, and has added an Automation API program that allows their developers to deploy the Zephyr online store directly from the associated GitHub repositories---developers don't even need to clone down the repositories first.

{{% notes type="info" %}}
To see the latest Automation API programs for Zephyr, refer to [the `zephyr-automation` GitHub repository](https://github.com/pulumi-zephyr/zephyr-automation).
{{% /notes %}}

## Areas of future growth for Zephyr

We've stated before that recommended practices (or even "best practices," if you prefer that term) are always point-in-time recommendations based on the requirements of the organization/team/individual using Pulumi. What this means, in practice, is that there is almost always room for growth and evolution. Organizations, teams, and individuals rarely remain static, and therefore their use of Pulumi is also unlikely to remain entirely static.

So, what are some potential areas of future growth for Zephyr?

* **Splitting the deployment of the microservices.** We alluded to this [in the previous post](/blog/iac-recommended-practices-using-automation-api/). Right now, all the microservices that comprise the online store are deployed together. What if one particular team needs to deploy only their service? The current approach can certainly accommodate that---Pulumi will only change...

recommendations are point-in-time, change over time as organization grows, list of potential future growth areas
