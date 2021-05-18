---
title: Kubernetes Getting Started
h1: Get Started with Kubernetes
meta_desc: This page provides an overview and guide on how to get started with Kubernetes.
linktitle: Kubernetes
weight: 1
menu:
  getstarted:
    identifier: kubernetes
    weight: 2

aliases: ["/docs/quickstart/kubernetes/"]
---

Pulumi's Cloud Native SDK makes it easy to target any Kubernetes environment to
provision a cluster, configure and deploy applications, and update them as
required.

Pulumi supports programming against Kubernetes---Minikube, on-premises and
cloud-hosted custom Kubernetes clusters, and the managed services from Google
(GKE), Azure (AKS), and Amazon (EKS). The Pulumi Kubernetes provider
packages and [CLI]({{< relref "/docs/reference/cli" >}})
help you accomplish all these within minutes.

## Guide Goals

Let's get you up and running with Pulumi and deploy a static website in Kubernetes!

In this guide you will:

- Install Pulumi.
- Install your preferred language runtime.
- Configure access to your Kubernetes cluster.
- Create a new Pulumi project.
- Provision infrastructure on Kubernetes.

{{< get-started-stepper >}}
