---
title: "Choosing the Right Helm Resource For Your Use Case"
meta_desc: Learn which Helm Resource is right for your use case
aliases: ["/docs/reference/tutorials/kubernetes/chart-vs-release/"]
layout: how-to-guide
---

The Kubernetes provider and SDK has supported a means to deploy [Helm Charts](https://helm.sh/) since [2018]({{< relref "/blog/using-helm-and-pulumi-to-define-cloud-native-infrastructure-as-code">}}) through the [`Helm V2 Chart`]({{< relref "/registry/packages/kubernetes/api-docs/helm/v2/chart">}}), and later, [`Helm V3 Chart`]({{< relref "/registry/packages/kubernetes/api-docs/helm/v3/chart">}}) resources. These resources simulated Helm installation by retrieving the templates for underlying resources from the chart and installing them on the target Kubernetes environment directly.

In September 2021 we announced the **public preview** of a new [`Helm Release`]({{< relref "/registry/packages/kubernetes/api-docs/helm/v3/release">}}) which adds an additional option to the mix for Pulumi's Kubernetes users. As of [v3.15.0](https://github.com/pulumi/pulumi-kubernetes/releases/tag/v3.15.0) of the Pulumi Kubernetes SDK and Provider, this resource is now **Generally Available**.

This guide discusses in some detail each of these options and provides a framework to determine using the right resource for your use case.

## Helm Chart Resources

The [`Helm V2 Chart`]({{< relref "/registry/packages/kubernetes/api-docs/helm/v2/chart">}}), and [`Helm V3 Chart`]({{< relref "/registry/packages/kubernetes/api-docs/helm/v3/chart">}}) resources render the templates from your chart and applies them directly, which means all provisioning happens client-side using your Kubernetes authentication setup without needing a server-side component such as `Tiller`. These resources are implemented as [`Component Resources`]({{< relref "/docs/intro/concepts/resources/components/" >}}) which unlocks a number of benefits for Pulumi users, e.g.:

### Benefits

1. Visibility into all resources encapsulated by the Chart in Pulumi's state, allowing users the ability to directly query properties of individual resources.
2. The above also allows Pulumi's Policy-as-Code framework - [`CrossGuard`]({{< relref "/docs/guides/crossguard/" >}}) to enforce policies on all resources installed by Helm charts
3. Ability to leverage transformations to programmatically manipulate resources installed by Helm charts in any of the Pulumi supported programming languages
4. Detailed previews and diffs rendered in the Pulumi CLI and Console for each Kubernetes resource resulting from Helm Chart config changes

We have seen significant adoption of these resources over the years. However, these resources also come with some limitations which have affected some of our Kubernetes users:

### Limitations

1. No support for [Helm Chart Hooks](https://helm.sh/docs/topics/charts_hooks/) - i.e. equivalent of running `helm install` with the `--no-hooks` option
2. No ability to import existing Helm releases into Pulumi state
3. No ability to interoperate using the Helm CLI on resources installed by Pulumi

## Helm Release Resource

The Pulumi Kubernetes provider uses an embedded version of the Helm SDK to natively manage [`Helm Releases`](https://helm.sh/docs/glossary/#release) on the target Kubernetes cluster. The addresses many of the main limitations with the `Chart` resources mentioned above:

### Benefits

1. Since we use Helm's native support for downloading, processing and installing charts, all the major features of Helm Charts such as hooks can be readily supported
2. Existing Helm releases installed via the Helm CLI can be imported into Pulumi state as of [v3.12.1](https://github.com/pulumi/pulumi-kubernetes/releases/tag/v3.12.1) of the Pulumi Kubernetes SDK
3. Releases installed via Pulumi are serialized by the chosen Helm driver in the cluster and can be queried by the Helm CLI.

However, in return for these improvements, Helm Release resource incurs a few inherrent limitations:

### Limitations

1. The ability to support transformations is limited to that offered by the `Helm` CLI (running `helm install` with `--post-renderer postrenderer`)
2. Pulumi doesn't have direct access to the underlying Kubernetes resources installed by `Helm`, as a result, `CrossGuard` policies can't be enforced on Helm Release resources.
3. Pulumi doesn't render fine-grained diffs in previews scoped to affected Kubernetes resources when Helm configuration changes.

## What Helm Resource is Right For My Use Case?

Pulumi users have the flexibility to choose between the `Chart` and `Release` resource for their use case. It is important to note that both resources can be used within the same Pulumi program and since they are both offered by the Kubernetes provider, require no additional configuration to authenticate against the target cluster.

This section provides a simple framework for users to decide between the two classes of resources. If your usage falls outside of this or there are more subtle tradeoffs, please reach out for advice on on [Community Slack](https://slack.pulumi.com) or filing an issue on [Github](https://github.com/pulumi/pulumi-kubernetes/issues).

### Recommendations by Use Case

| Use Case | Recommended Resource |
| --------- | ---------- |
| [*Fire-and-forget* Helm Chart installation?](#fire-and-forget-helm-chart-installation) | [Helm Release]({{< relref "/registry/packages/kubernetes/api-docs/helm/v3/release">}}) |
| [Interact with existing Helm-managed resources?](#interoperability-with-existing-helm-releases) | [Helm Release]({{< relref "/registry/packages/kubernetes/api-docs/helm/v3/release">}}) |
| [Need to customize/modify Helm Charts through transformations?](#fine-grained-diffs-and-transformations) | [Helm Chart]({{< relref "/registry/packages/kubernetes/api-docs/helm/v3/chart">}}) |
| [Need fine-grained diffs on Helm Chart updates?](#fine-grained-diffs-and-transformations) | [Helm Chart]({{< relref "/registry/packages/kubernetes/api-docs/helm/v3/chart">}}) |
| [Enforce CrossGuard policies on all Kubernetes resources?](#enforcing-crossguard-policies-on-kubernetes-resources) | [Helm Chart]({{< relref "/registry/packages/kubernetes/api-docs/helm/v3/chart">}}) |

#### *Fire-and-forget* Helm Chart Installation

In many cases, users simply want to install an unmodified Chart and manage its configuration in their IaC tool of choice by specifying the chart and the values in code. While both the Chart and Release resources accomplish this with aplomb, we would recommend the use of Helm Release in such situations due to the broader support of Helm features such as Hooks.

#### Interoperability with existing Helm releases

If you have existing Helm Releases deployed through a version of the Helm CLI and wish to now integrate them in Pulumi, the `Helm Release` resource is your best choice. Currently component resources like `Chart` don't offer the ability to `import` existing resources.

#### Fine Grained Diffs and Transformations

`Chart` resources have direct access to the Kubernetes resources installed by the chart before installation. As a result, `Chart` resources support `transformations` which allow program authors to programmatically manipulate resources before they are installed by Pulumi. This is a very powerful tool which has enabled several advanced use cases for our users. Unfortunately, `Helm Release` does not have the same flexibility in offering transformations support.

Similarly, `Chart` resources can enumerate underlying resources and their inputs, thus providing fine-grained diffs on individual resources and richer previews.

If these are important to your environment or use case, then the `Helm Chart` resource should be preferred.

#### Enforcing CrossGuard Policies on Kubernetes Resources

`Chart` resources extract all Kubernetes objects and deploy them as Pulumi resources, making each of them privy to applicable CrossGuard policies. While resources installed by `Helm Release` are directly installed by Helm bypassing CrossGuard policies.

## Next Steps

Now that you know which Helm resource is right for you, checkout some of the following resources for learning how to use each of them:

### Helm Chart

* [API Reference Docs with examples]({{< relref "/registry/packages/kubernetes/api-docs/helm/v3/chart/" >}})
* [Provisioning Helm Charts]({{< relref "/docs/guides/adopting/from_kubernetes/#provisioning-a-helm-chart" >}})
* [Sample Project that installs Wordpress via Helm Chart in Typescript]({{< relref "/registry/packages/kubernetes/how-to-guides/kubernetes-ts-helm-wordpress/" >}})

### Helm Release

* [API Reference Docs with examples]({{< relref "/registry/packages/kubernetes/api-docs/helm/v3/release/" >}})
* [Installing Helm Releases]({{< relref "/docs/guides/adopting/from_kubernetes/#installing-a-helm-release" >}})
* [Sample Project that installs Wordpress via Helm Release in Typescript]({{< relref "/registry/packages/kubernetes/how-to-guides/kubernetes-ts-helm-release-wordpress/" >}})
