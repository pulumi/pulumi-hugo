---
title_tag: "Kubernetes & Pulumi"
meta_desc: Pulumi offers full support for Kubernetes, with a providers, 3+ components, templates, and guides.
title: "Kubernetes"
h1: Kubernetes & Pulumi
notitle: true
h1_gradient_width: 281
h1_gradient_name: kubernetes
menu:
  clouds:
    identifier: kube
    weight: 4
cloud_overview: true
description: Streamline Kubernetes cluster configuration, management, and app workload deployments using TypeScript, Python, Go, C#, Java or YAML. Use the Pulumi Kubernetes Operator to manage both Kubernetes and cloud resources.
get_started_guide: get-started/
providers:
- display_name: Kubernetes
  content_links:
  - display_name: Overview
    icon: page-small-black
    url: kubernetes/
  - display_name: Install & config
    icon: gear-small-black
    url: kubernetes/installation-configuration/
  - display_name: API docs
    icon: book-small-black
    url: kubernetes/api-docs/
  - display_name: How-to guides
    icon: question-small-black
    url: kubernetes/how-to-guides/
components:
- display_name: Kubernetes Cert Manager
  url: kubernetes-cert-manager/
- display_name: Kubernetes CoreDNS
  url: kubernetes-coredns/
- display_name: Pulumi Kubernetes Extensions
  url: pulumi-kubernetesx/
convert:
- heading: Convert Kubernetes YAML to Pulumi
  tools:
  - display_name: Convert Kubernetes YAML templates to Pulumi
    url: /kube2pulumi/
  - display_name: Generate types in Pulumi for Custom resources
    url: https://www.pulumi.com/blog/introducing-crd2pulumi/
templates:
- display_name: Kubernetes cluster on AWS
  url: kubernetes/aws/
- display_name: Kubernetes cluster on Azure
  url: templates/kubernetes/azure/
- display_name: Kubernetes cluster on Google Cloud
  url: templates/kubernetes/gcp/
- display_name: Helm Chart on Kubernetes
  url: templates/kubernetes-application/helm-chart/
guides-description: Learn how to use Pulumi & Kubernetes together.
guides:
  description: Learn how to use Kubernetes & Pulumi together.
  guides_list:
  - display_name: Crosswalk playbooks for Kubernetes
    url: guides/playbooks/
  - display_name: Control plane
    url: guides/control-plane/
  - display_name: Worker node creation
    url: guides/worker-nodes/
  - display_name: Accessing clusters
    url: guides/try-out-the-cluster/
---



## Cluster management

The following SDKs are available to work with IaaS resources, and managed or self-managed Kubernetes clusters.

The packages are available in Node.js (Javascript and Typescript), Python, Go, .NET and Java.

- AWS: [`pulumi/aws`](https://github.com/pulumi/aws/)
- Azure: [`pulumi/azure-native`](https://github.com/pulumi/pulumi-azure-native/)
- DigitalOcean: [`pulumi/digitalocean`](https://github.com/pulumi/pulumi-digitalocean/)
- Google Cloud: [`pulumi/gcp`](https://github.com/pulumi/gcp/)

## Pulumi Kubernetes Operator

The [Pulumi Kubernetes Operator](https://github.com/pulumi/pulumi-kubernetes-operator/) is an [extension pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) that enables Kubernetes users to create a `Stack` as a first-class API
resource, and use the `StackController` to drive the updates of the Stack until
success.

Deploying Pulumi stacks in Kubernetes provides the capability to build
out CI/CD and automation systems into your clusters, creating native support to manage your infrastructure alongside your Kubernetes workloads.

Get started using the [Pulumi Kubernetes Operator continuous delivery guide](/docs/using-pulumi/continuous-delivery/pulumi-kubernetes-operator).
