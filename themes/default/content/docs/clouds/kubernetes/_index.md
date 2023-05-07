---
title_tag: "Kubernetes & Pulumi"
title: "Kubernetes"
meta_desc: susan will write this later susan will write this later susan will write this later
menu:
  clouds:
    identifier: kube
    weight: 4
---

## Get started guide

- [Get started guide](get-started/)

## Providers

### Kubernetes

- [Overview](/registry/packages/kubernetes/)
- [Installation & configuration](/registry/packages/kubernetes/installation-configuration/)
- [API documentation](/registry/packages/kubernetes/api-docs/)
- [How-to guides](/registry/packages/kubernetes/how-to-guides/)

## Components

- [Kubernetes Cert Manager](/registry/packages/kubernetes-cert-manager/)
- [Kubernetes CoreDNS](/registry/packages/kubernetes-coredns/)
- [Pulumi Kubernetes Extensions](https://github.com/pulumi/pulumi-kubernetesx/)

## Templates

- [Kubernetes cluster on AWS](/templates/kubernetes/aws/)
- [Kubernetes cluster on Azure](/templates/kubernetes/azure/)
- [Kubernetes cluster on Google Cloud](/templates/kubernetes/gcp/)
- [Helm Chart on Kubernetes](/templates/kubernetes-application/helm-chart/)
- [Web application on Kubernetes](/templates/kubernetes-application/web-application/)

## Guides

- [Crosswalk playbooks for Kubernetes](kubernetes-crosswalk/playbooks/)
- [Control plane](kubernetes-crosswalk/control-plane/)
- [Worker node creation](kubernetes-crosswalk/worker-nodes/)
- [Accessing clusters](kubernetes-crosswalk/try-out-the-cluster/)
- [Cluster defaults](kubernetes-crosswalk/configure-defaults/)
- [Access control](kubernetes-crosswalk/configure-access-control/)
- [Cluster services](kubernetes-crosswalk/cluster-services/)
- [App services](kubernetes-crosswalk/app-services/)
- [IAM](kubernetes-crosswalk/identity/)
- [Apps](kubernetes-crosswalk/apps/)
- [Infra services](kubernetes-crosswalk/managed-infra/)
- [Updating worker nodes](kubernetes-crosswalk/update-worker-nodes/)
- [FAQ](kubernetes-crosswalk/faq/)

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
