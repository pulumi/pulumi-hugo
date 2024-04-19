---
title: Pulumi Deployments
layout: pulumi-deployments

meta_desc: Pulumi Deployments is an infrastructure lifecycle management service that automates infrastructure operations.

overview:
    title: The fastest way to go from code to cloud
    description: |
        Pulumi Deployments is a fast and flexible way to deploy infrastructure on any cloud and at any scale, using GitHub pull requests, API calls, and console. No CLI setup needed since [Pulumi Cloud](/product/pulumi-cloud/) manages deployments.

quotes:
    items:
        - company: mighty
          name: Aaron Gibralter
          name_title: Head of Engineering at Mighty
          quote: |
            “Pulumi allows every engineer to build and update infrastructure instead of only our infrastructure team. With Pulumi Deployments, we could easily set up a standardized CI/CD infrastructure workflow for every engineer that immediately makes them productive.”

        - company: alkira
          name: Santosh Dornal
          name_title: Head of Software Test & DevOps at Alkira
          quote: |
            “I’m making developers at Alkira significantly more productive while also making my job easier using Pulumi. I can get developers using IaC immediately with Pulumi Deployments and its GitHub integration, while Pulumi Insights makes it really easy to find idle developer environments that need to be shut down, which reduces our cloud costs.”

benefits:
    title: How will Pulumi Deployments benefit me?
    description: |
        Pulumi Deployments makes it easier for you and engineers on your team to collaborate on infrastructure changes and deploy changes automatically through your existing GitHub pull request workflow. There is minimal setup and you can standardize your deployment workflow through GitHub and Pulumi. In addition, you can build your own custom deployment workflows with [Automation API](/docs/using-pulumi/automation-api/) code and offload the deployment workload to Pulumi Deployments instead of running it locally with the Pulumi CLI. Pulumi Deployments is based on the same technology as [Pulumi Automation API](/docs/using-pulumi/automation-api/).

preview:
  youtube_url: https://www.youtube.com/embed/v48U7CNWutc

options:
    title: How can I use Pulumi Deployments today?
    description:
    items:
        - icon: git-merged
          icon_color: purple
          title: Git Push to Deploy
          description: Deploy infrastructure with each [push to a GitHub branch](/docs/pulumi-cloud/deployments/reference/#github-push-to-deploy), using pull requests to review changes in ephemeral [Review Stacks](/docs/pulumi-cloud/deployments/review-stacks/) before deploying them.
        - icon: upload-to-cloud
          icon_color: salmon
          title: Click to Deploy
          description: Deploy infrastructure with a click of a button from the Pulumi Cloud console. Run update, preview, refresh, and destroy commands.
        - icon: code-window
          icon_color: blue
          title: REST API
          description: Deploy infrastructure by calling the Pulumi Service REST API. You can also use the API to run [Remote Automation API](/docs/pulumi-cloud/deployments/reference/#rest-api) code.
        - icon: eye
          icon_color: fuchsia
          title: Review Stacks
          description: Automate creation and deletion of dedicated cloud environments for every pull request, enabling cost-effective reviews.
        - icon: lightning
          icon_color: violet
          title: TTL Stacks
          description: Automatically cleanup infrastructure with self-destroying (automatic deletion) stacks. 
        - icon: clock
          icon_color: yellow
          title: Scheduled Deployments
          description: Automate cloud operations (update, refresh, destroy) on defined schedules using cron expressions. 

form:
    hubspot_form_id: 35baf46c-fd6e-4321-a75f-fc9319e31efb

faq:
    items:
      - header: Question 1
        content: |
          Pulumi ESC (Environments, Secrets and Configuration), is an [open source project](https://github.com/pulumi/esc) and managed service of Pulumi Cloud that enables teams to manage hierarchical collections of configuration and secrets and consume them from a variety of different infrastructure and application services.

          Pulumi ESC integrates with Pulumi Cloud identity and RBAC to provide rich control over access to secret configuration within an organization. Pulumi ESC supports multiple configuration providers, enabling static key/value configuration as well as dynamically retrieved configuration and secrets via OIDC and additional providers like 1Password and Vault.  Pulumi ESC is available via the new `esc` CLI, Pulumi Cloud, the Pulumi Cloud REST API, and Pulumi IaC stack configuration.
      - header: Question 2
        content: |
          An environment describes a collection of secrets and configuration values. It is typically intended to capture the configuration needed to work with a particular environment - for example the production environment for your key customer or line of business service.

          An environment is represented by a YAML document. This document has two top level entries:  

          - `imports`: An optional set of other environments that this environment derives from, enabling composition of environments and avoiding repetition across environments.  

          - `values`: An arbitrary nested collection of key/value pairs representing top level configuration values.


learn:
    title: Get Started
    items:
        - title: Try Pulumi Deployments today
          description: Deploy infrastructure on any cloud by creating a free Pulumi account.
          buttons:
            - link: https://app.pulumi.com/signup
              type: primary
              action: Sign up for Pulumi Cloud
        - title: Documentation
          description: Review our documentation to learn more about Pulumi Deployments.
          buttons:
            - link: /docs/pulumi-cloud/deployments
              type: secondary
              action: Pulumi Deployments Docs
            - link: /docs/reference/deployments-rest-api
              type: secondary
              action: REST API Docs

aliases:
    - /deployments
---
