---
title_tag: CrossGuard Guides (Policy as Code)
title: Policy as code
meta_desc: Pulumi's Policy as Code offering, CrossGuard, allows you to set guardrails for resources so
           best practices and security compliance are always followed.
menu:
    usingpulumi:
        identifier: crossguard
        weight: 5
aliases:
- /docs/guides/crossguard/
---

CrossGuard is Pulumi's Policy as Code offering. CrossGuard empowers you to set guardrails to enforce compliance for resources so developers within an organization can provision their own infrastructure while sticking to best practices and security compliance. Using Policy as Code, you can write flexible business or security policies.

Using CrossGuard, organization administrators can apply these rules to particular stacks within their organization. When policies are executed as part of your Pulumi deployments, any violation will gate or block that update from proceeding.

Learn more about [Policy as Code core concepts](/docs/guides/crossguard/core-concepts/).

## Languages

Policies can be written in TypeScript/JavaScript (Node.js) or Python and can be applied to Pulumi stacks written in any language.

|                                                        | Language                                                                     | Status                                                                                                                                        |
|--------------------------------------------------------|------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| <img src="/logos/tech/logo-ts.png" class="h-10" />     | [TypeScript](/docs/reference/pkg/nodejs/pulumi/policy/)      | Stable                                                                                                                                        |
| <img src="/logos/tech/logo-js.png" class="h-10" />     | [JavaScript](/docs/reference/pkg/nodejs/pulumi/policy/)      | Stable                                                                                                                                        |
| <img src="/logos/tech/logo-python.png" class="h-10" /> | [Python](/docs/reference/pkg/python/pulumi_policy/)          | Stable                                                                                                                                        |
| <img src="/logos/tech/logo-opa.png" class="h-10" />    | [Open Policy Agent (OPA)](/blog/opa-support-for-crossguard) | Preview                                                                                                                                       |
| <img src="/logos/tech/dotnet.png" class="h-10" />      | .NET                                                                         | [Future](https://github.com/pulumi/pulumi-policy/issues/229) |
| <img src="/logos/tech/logo-golang.png" class="h-10" /> | Go                                                                           | [Future](https://github.com/pulumi/pulumi-policy/issues/230) |

## Getting Started

To get started with Pulumi CrossGuard, [download and install Pulumi](/docs/install/). Afterwards,
try the [Getting Started tutorial](/docs/get-started/).

## Pulumi CrossGuard policies for AWS (AWSGuard)

In addition to being able to implement your own CrossGuard policies, we've also created a set of policies that codifies best practices for AWS that you can adopt and use in a Policy Pack. AWSGuard is a configurable library that you can use to enforce best practices for your own Pulumi stacks or organization. [Learn more and get started with AWSGuard](/docs/guides/crossguard/awsguard/).

## Configuring Policy Packs

Using configurable Policy Packs, you can write flexible policies that can be re-used across your organization. By default, some fields like enforcement level, are configurable. You may also specify configurable variables alongside each policy. [Learn more about configurable Policy Packs](/docs/guides/crossguard/configuration/).

## Examples

If you're looking for some example Policy Packs, take a look at these:

{{< chooser language "typescript,python" >}}

{{% choosable language typescript %}}

* [AWS](https://github.com/pulumi/examples/tree/master/policy-packs/aws-ts)
* [Azure](https://github.com/pulumi/examples/tree/master/policy-packs/azure-ts)
* [Google Cloud](https://github.com/pulumi/examples/tree/master/policy-packs/gcp-ts)
* [Kubernetes](https://github.com/pulumi/examples/tree/master/policy-packs/kubernetes-ts)

{{% /choosable %}}
{{% choosable language python %}}

* [AWS](https://github.com/pulumi/examples/tree/master/policy-packs/aws-python)
* [Azure](https://github.com/pulumi/examples/tree/master/policy-packs/azure-python)
* [Google Cloud](https://github.com/pulumi/examples/tree/master/policy-packs/gcp-python)
* [Kubernetes](https://github.com/pulumi/examples/tree/master/policy-packs/kubernetes-python)

{{% /choosable %}}

{{< /chooser >}}

## FAQ

Get the answers to some [Frequently Asked Questions](/docs/guides/crossguard/faq/) about CrossGuard.
