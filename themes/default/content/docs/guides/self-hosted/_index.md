---
title: Self-Hosted Pulumi Service
menu:
    userguides:
        identifier: self_hosted
        weight: 9
meta_desc: Pulumi Enterprise gives you the option to self-host Pulumi within your organization's infrastructure.
---

{{% notes type="info" %}}
Self-hosting is only available with **Pulumi Enterprise**. [Contact us]({{< relref "/contact.md" >}}) if you would like to evaluate Self-Hosted Pulumi Enterprise.

To manage your state with a self-managed backend, such as a cloud storage bucket, see [State and Backends]({{< relref "/docs/intro/concepts/state" >}}).
{{% /notes %}}

This guide walks you through the components that are required to get the Pulumi Service running in your own environment.

There are two services that need to be hosted for the purposes of remote state management and a management UI for users. To store user data, and the state for your [stacks]({{< relref "/docs/intro/concepts/stack" >}}), the following components are also needed:

* MySQL 5.6 DB server with at least 20GB storage space for data
* Minimum 50GB SSD for object storage

> **Note**: You are responsible for the safe backup and storage of the object storage volume, as well as your DB’s data volume.

## Self-Hosted vs. Managed Pulumi Service

The self-hosted version of the Pulumi Service also offers some features that are not available with the managed version (i.e. [app.pulumi.com](https://app.pulumi.com)). The self-hosted installation of Pulumi provides full control of your data -- a requirement for enterprises in certain industries with specific security compliance requirements.

If you are unsure about whether a self-hosted version of the Pulumi Service is right for your organization, [contact us]({{< relref "/contact.md" >}}) to learn more.

## Deployment Topology

Pulumi can be installed in almost any on-premise or cloud provider environment. The self-hosted install can be integrated with your preferred identity provider as well, such as:

* GitHub Enterprise
* GitLab Enterprise
* SAML SSO
* Email/password identity

Here are some examples of deployment topologies:

{{< figure src="/images/docs/guides/self-hosted/on-prem-internet-config.png" caption="Internet-Accessible Deployment" >}}

{{< figure src="/images/docs/guides/self-hosted/on-prem-intranet-config.png" caption="Intranet-Only Deployment" >}}

## Deployment Options

The Pulumi service Docker container images can be run using any OCI-compatible container orchestrator.
However, Pulumi provides installers to support common deployment environments.

* [Quickstart Install]({{< relref "quickstart" >}}): Using a Pulumi-provided set of docker-compose files and bash scripts, one can deploy a small system for **testing** in a local docker environment.
* [ECS-Hosted Install]({{< relref "ecs-hosted" >}}): Using a Pulumi-provided set of Pulumi programs written in Typescript or Go, one can automate the deployment and maintenance of a production-grade self-hosted solution.
* [EKS-Hosted Install]({{< relref "eks-hosted" >}}): Using a Pulumi-provided set of Pulumi programs written in Typescript, one can automate the deployment and maintenance of a production-grade self-hosted solution running on Amazon Elastic Kubernetes Sevice (EKS). This solution most closely matches the managed service deployment model.
* [AKS-Hosted Install]({{< relref "aks-hosted" >}}): Using a Pulumi-provided set of Pulumi programs written in Typescript, one can automate the deployment and maintenance of a production-grade self-hosted solution on Azure Kubernetes Service (AKS).
* [Local-Docker Install]({{< relref "local-docker" >}}): Using a Pulumi-provided Pulumi program written in Typescript, one can automate the deployment and maintenance of a production-grade self-hosted solution using a customer-provided docker environment,  a customer-provided MySQL database and a customer-provided object store (e.g. Minio).

## Components

The Pulumi self-hosted [Components]({{< relref "components" >}}) consist of Docker images Pulumi service's frontend UI and backend API.
