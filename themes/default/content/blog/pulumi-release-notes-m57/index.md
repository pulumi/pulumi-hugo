---
title: "Pulumi release notes: June 9th"
date: 2021-06-09T09:00:00-07:00
draft: false
meta_desc: "New in Pulumi: Amazon ECS Anywhere and App Runner, Sumo Logic support, Pulumi Packages updates, and easier updates for teammates in the Pulumi Service"
meta_image: meta.png
authors:
    - alex-mullans
tags:
    - features
---

We regularly add new value across the Pulumi ecosystem, with a release of the Pulumi CLI every two weeks, frequent releases of our [cloud providers]({{< relref "/docs/intro/cloud-providers" >}}), and regular updates to the Pulumi Service. You can read about most of those changes in the the `CHANGELOG.md` files in each open source repository. To highlight some of the most exciting releases—including, for the first time, updates to the Pulumi Service—we're trying something new: a regular release notes post for Pulumi release news, features, and updates. If you find it useful, or have ideas on how we could improve it, let us know [on Twitter](https://twitter.com/pulumicorp) or in the [Pulumi Community Slack](https://slack.pulumi.com)!

In this update:

- New and updated cloud providers
  - [Pulumi supports Amazon ECS Anywhere and Amazon App Runner](#new-and-updated-cloud-providers)
  - [Pulumi supports Sumo Logic](#pulumi-supports-sumo-logic)
  - [100 new resources in the Azure Native provider](#100-new-resources-in-the-azure-native-provider)
- [Pulumi engine and core technologies](#pulumi-engine-and-core-technologies)
  - [Pulumi Packages: schema documentation and enhancements](#pulumi-packages-schema-documentation-and-enhancements)
  - [Input parameters can now be marked as secret](#input-parameters-can-now-be-marked-as-secret)
- [Pulumi Service and Pulumi.com](#pulumi-service-and-pulumicom)
  - [Easier acceptance of invites to organizations](#easier-acceptance-of-invites-to-organizations)
  - [Self-Hosted Pulumi Service now supports Azure Storage and Minio backends](#self-hosted-pulumi-service-now-supports-azure-storage-and-minio-backends)

<!--more-->

## New and updated cloud providers

### Pulumi supports Amazon ECS Anywhere and Amazon App Runner

Earlier this month, Amazon announced [ECS Anywhere](https://aws.amazon.com/blogs/containers/introducing-amazon-ecs-anywhere/), an extension of Amazon Elastic Container Service that allows you to deploy containers to almost any server, and [AWS App Runner](https://aws.amazon.com/blogs/containers/introducing-aws-app-runner/), a new fully-managed container application service. Pulumi had full same-day support for both new services.

Learn how to get started with [ECS Anywhere]({{< relref "/blog/ecs-anywhere-launch" >}}) and [App Runner]({{< relref "/blog/deploy-applications-with-aws-app-runner" >}}).

### Pulumi supports Sumo Logic

The new Sumo Logic provider for Pulumi allows you to manage Sumo Logic's big data and analytics services with Pulumi infrastructure-as-code.

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
const sumologic = require("@pulumi/sumologic")

const folder = new sumologic.Folder("folder", {
  description: "A test folder",
  parentId: "<personal folder id>",
});
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
import * as sumologic from "@pulumi/sumologic";

const folder = new sumologic.Folder("folder", {
  description: "A test folder",
  parentId: "<personal folder id>",
});

```

{{% /choosable %}}
{{% choosable language python %}}

```python
import pulumi_sumologic as sumologic

folder = sumologic.Folder("folder",
                          description="A test folder",
                          parent_id="<personal folder id>")
```

{{% /choosable %}}
{{% choosable language go %}}

```go
import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi-sumologic/sdk/go/sumologic"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := sumologic.NewFolder(ctx, "folder", &sumologic.FolderArgs{
			Description: pulumi.String("A test folder"),
            ParentId:    pulumi.String("<personal folder id>"),
		})
		if err != nil {
			return err
		}

		return nil
	})
}
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
using System.Collections.Generic;
using System.Threading.Tasks;
using Pulumi;
using Pulumi.SumoLogic;

class Program
{
    static Task Main() =>
        Deployment.Run(() => {
            var folder = new SumoLogic.Folder("folder", new SumoLogic.FolderArgs
            {
                Description = "A test folder",
                 ParentId = "<personal folder id>",
            });
        });
}
```

{{% /choosable %}}

{{< /chooser >}}

Get started in the [SumoLogic provider docs]({{< relref "/docs/intro/cloud-providers/sumologic" >}}).

### 100 new resources in the Azure Native provider

We shipped 3 new versions of the Azure Native provider (1.10.0, 1.9.0, and 1.8.0) that collectively added 100 new resources that you can manage with the Azure Native provider. These include new analytics, machine learning, and security capabilities across the breadth of the Azure platform.

[See the full list](https://github.com/pulumi/pulumi-azure-native/blob/v1.10.0/CHANGELOG.md)

## Pulumi engine and core technologies

In this milestone, we shipped Pulumi versions [3.3.0](https://github.com/pulumi/pulumi/releases/tag/v3.3.0), [3.3.1](https://github.com/pulumi/pulumi/releases/tag/v3.3.1), and [3.4.0](https://github.com/pulumi/pulumi/releases/tag/v3.4.0). This section highlights key changes in those versions; for the full list, click the links for each version to visit the changelog for that version.

### Input parameters can now be marked as secret

It's now possible to mark any input parameter as a secret, which can be helpful when you need to pass in secret data, like when creating a Kubernetes Secret resource. Pulumi will protect these input parameters by encrypting them in the state and obfuscating them in outputs.

[pulumi/pulumi#7062](https://github.com/pulumi/pulumi/issues/7062)

### Pulumi Packages: schema documentation and enhancements

[Pulumi Packages]({{< relref "/docs/guides/pulumi-packages/" >}}), released at [PulumiUP earlier this year]({{< relref "/blog/pulumiup-pulumi-packages-multi-language-components" >}}) enable you to share Pulumi components with your colleagues and with the Pulumi community. A key part of Pulumi Packages is the Pulumi schema that defines each resource in a package.  We have now introduced new [documentation for Pulumi Package Schema]({{< relref "/docs/guides/pulumi-packages" >}}).

We've also updated the Pulumi Package schema to make it more powerful. For more complex Pulumi Package scenarios, you may want to be able to reference the types in one Pulumi Package from another Pulumi Package. Previously, this was only possible if you authored your Pulumi Package in Go; now, it's possible in all Pulumi Languages.

[#6777](https://github.com/pulumi/pulumi/issues/6777)

## Pulumi Service and Pulumi.com

### Easier acceptance of invites to organizations

Previously, you could accept an invitation to join an organization even if you didn't have the required identity provider (say, a SAML identity) associated with your Pulumi account. This left you unable to access the organization to which you just accepted an invite. Now, the Pulumi Service will prompt you to connect the required identity provider to your existing Pulumi account so you can successfully accept the invitation and join the organization.

![Screenshot of identity provider setup prompt](saml.png)

### Self-Hosted Pulumi Service now supports Azure Storage and Minio backends

TODO?
