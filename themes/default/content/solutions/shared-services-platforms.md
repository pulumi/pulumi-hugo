---
title: Shared Services Platforms
meta_desc: This is a description about the solutions page and it does a good job of describing what this page is.

type: page
layout: shared-services-platform

overview:
    title: Building self-service infrastructure environments
    description: |
        A Shared Services Platform (aka Internal Developer Portal or Infrastructure Platform) is an internal company service that allows application developers to self-service infrastructure environments. SSPs are an extremely common amongst companies that have reached a certain size where they want to share common infrastructure and automate the provisioning of infrastructure for the development teams. Kubernetes (K8s) is becoming the de facto control plane for modern clouds, and it is frequently employed to power these internal platforms. The goal of a SSP is to increase developer velocity while maintaining centralized control over security, networking, compliance, and costs. Pulumi makes it easy to model and provision the SSP control plane as well as automate the provisioning of the data plane stacks.

benefits:
    title: Why Shared Services Platforms?
    items:
        - title: Benefits
          items:
            - title: Centralized control
              icon: code
              description: |
                Companies maintain centralized control over security, networking, compliance, and costs.

            - title: Direct infrastructure access
              icon: global
              description: |
                Developers can directly access and deploy to infrastructure (e.g., K8s clusters or cloud resources) without contacting operations/cluster managers

            - title: Start easily
              icon: puzzle
              description: |
                Developers can get started easily and do not have to adapt their workflows

        - title: How Pulumi helps
          items:
            - title: Languages you love
              icon: rocketship
              description: |
                Pulumi allows infrastructure or platform engineering teams to use the programming languages they already use for modeling their infrastructure. They can take advantage of all the existing testing tools, IDE plugins that are standard to their programming languages.

            - title: Build on any cloud
              icon: gear
              description: |
                Pulumi can provision any resource available in the K8s API. Pulumi supports all new resources and features in the K8s API on the same day as the release. Pulumi allows K8s users novel forms of cluster management and app workload deployments.

            - title: Policy-as-Code
              icon: eye
              description: |
                Pulumi also enables “policy as code”, which allows the platform team to enforce cost, security, and best practices across all infrastructure

            - title: Reusable components
              icon: team
              description: |
                Pulumi makes creating reusable and modular components easy which allows repeatable infrastructure building blocks to be templatized and easily reused.

diagrams:
    title: Kubernetes Platform Reference Architecture
    description: |
        Pulumi’s modern Infrastructure-as-Code SDK is an open-source project that’s supported by an active and enthusiastic community. We welcome feedback and contributions from anyone.

    items:
        - title: 1. Define your goals
          image: /images/some_diagram.svg
          content: |
            Deploy from a command line or programatically. Pulumi achieves your infrastructure’s desired state by creating, updating, or deleting cloud resources.

            **Deliver infrastructure and applications together**

            Use a common Git and CI/CD workflow for everything.

            **Deploy fearlessly and with confidence**

            Validate every change with unit tests and integration tests.

            **Write programmatic deployments**

            Run deployments from your code without using a CLI.

        - title: 2. Define the platform
          image: /images/some_diagram.svg
          content: |
            Deploy from a command line or programatically. Pulumi achieves your infrastructure’s desired state by creating, updating, or deleting cloud resources.

            **Deliver infrastructure and applications together**

            Use a common Git and CI/CD workflow for everything.

            **Deploy fearlessly and with confidence**

            Validate every change with unit tests and integration tests.

            **Write programmatic deployments**

            Run deployments from your code without using a CLI.

        - title: 3. Define your goals
          image: /images/some_diagram.svg
          content: |
            Deploy from a command line or programatically. Pulumi achieves your infrastructure’s desired state by creating, updating, or deleting cloud resources.

            **Deliver infrastructure and applications together**

            Use a common Git and CI/CD workflow for everything.

            **Deploy fearlessly and with confidence**

            Validate every change with unit tests and integration tests.

            **Write programmatic deployments**

            Run deployments from your code without using a CLI.

        - title: 4. Define your goals
          image: /images/some_diagram.svg
          content: |
            Deploy from a command line or programatically. Pulumi achieves your infrastructure’s desired state by creating, updating, or deleting cloud resources.

            **Deliver infrastructure and applications together**

            Use a common Git and CI/CD workflow for everything.

            **Deploy fearlessly and with confidence**

            Validate every change with unit tests and integration tests.

            **Write programmatic deployments**

            Run deployments from your code without using a CLI.

customer_logos:
  title: Leading engineering organizations are building with Pulumi
  logos:
    - items:
      - snowflake
      - tableau
      - atlassian
      - fauna
      - sans
    - items:
      - mindbody
      - sourcegraph
      - fenergo
      - skai
      - lemonade
    - items:
      - clearsale
      - angellist
      - webflow
      - supabase
      - ro

get_started:
    title: Getting started

    get_started:
        title: Talk with customer engineering
        description: |
            <something about talking with customer engineering>
        cta_text: Schedule now

    migrate:
        title: Migrating from other tools
        description: |
            Transition to Pulumi with converter tools for Terraform, AWS CloudFormation, Azure Resource Manager, and Kubernetes.
        cta_text: Explore Conversion Tools
---
