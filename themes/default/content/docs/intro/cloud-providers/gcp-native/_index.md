---
title: GCP-Native
meta_desc: This page provides on an overview of the Native Google Cloud (GCP-Native) provider for Pulumi.
menu:
  intro:
    parent: cloud-providers
    identifier: clouds-gcp-native
    weight: 1

aliases: ["/docs/reference/clouds/gcp-native/"]
---
<div class="note note-info" role="alert">
    <p>
        GCP-Native provider is currently in <strong> public preview </strong>
    </p>
</div>


<img src="/logos/tech/gcp.svg" align="right" class="h-16 px-8 pb-4">

The Google Cloud Native (GCP-Native) provider for Pulumi can be used to provision any of the cloud resources available in [GCP](https://cloud.google.com/).  The GCP provider must be configured with credentials to deploy and update resources in Google Cloud.

See the [full API documentation]({{< relref "/docs/reference/pkg/gcp-native" >}}) for complete details of the available GCP provider APIs.

## Setup

The GCP provider supports several options for providing access to Google Cloud credentials.  See [GCP setup page]({{< relref "setup" >}}) for details.

## Getting Started

GCP Native is currently in *public preview*. The quickest way to get started with GCP is to follow the steps described in the [README](https://github.com/pulumi/pulumi-gcp-native#readme).

Some interesting examples are available complete with instructions:

* [Google Cloud Functions](https://github.com/pulumi/examples/tree/master/gcp-ts-functions): Create a serverless function
* [Google Kubernetes Engine](https://github.com/pulumi/examples/tree/master/gcp-ts-gke): Create a GKE cluster and deploy an NGINX pod into it
* [Ruby on Rails on GKE and Google Cloud SQL](https://github.com/pulumi/examples/tree/master/gcp-ts-k8s-ruby-on-rails-postgresql): Containerized Ruby on Rails app using Google Cloud SQL PostgresSQL, GKE and Docker Hub.

## Example

{{< chooser language "typescript,python,go,csharp" >}}

{{% choosable language typescript %}}

```typescript
import * as storage from "@pulumi/gcp-native/storage/v1";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config("gcp");
const project = config.require("project");
const bucketName = "pulumi-gcp-native-ts-01";

// Create a GCP resource (Storage Bucket)
const bucket = new storage.Bucket("my-bucket", {
    name:bucketName,
    bucket:bucketName,
    project: project,
});

// Export the DNS name of the bucket
export const bucketName = bucket.selfLink;
```

{{% /choosable %}}
{{% choosable language python %}}

```python
import pulumi
from pulumi_gcp_native.storage import v1 as storage

config = pulumi.Config()
project = config.require('project')
# Create a GCP resource (Storage Bucket)
bucket_name = "gcp-native-bucket-py-01"
bucket = storage.Bucket('my-bucket', name=bucket_name, bucket=bucket_name, project=project)

# Export the DNS name of the bucket
pulumi.export('bucket_name', bucket.self_link)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
package main

import (
        storage "github.com/pulumi/pulumi-gcp-native/sdk/go/gcp/storage/v1"
        "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	const bucketName = "gcp-native-bucket-go-01"
        pulumi.Run(func(ctx *pulumi.Context) error {
                conf    := config.New(ctx, "gcp")
                project := conf.Require("project")
                bucket, err := storage.NewBucket(ctx, "bucket", &storage.BucketArgs{
                        Name:    pulumi.StringPtr(bucketName),
                        Bucket:  pulumi.String(project),
                        Project: pulumi.String("pulumi-development"),
                })
                if err != nil {
                        return err
                }
                ctx.Export("bucketName", bucket.SelfLink)

                return nil
        })
}
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
using System.Threading.Tasks;
using Pulumi;
using Pulumi.Gcp;

class Program
{
    static Task Main() =>
        Deployment.Run(() => {
            var bucket = new Gcp.Storage.Bucket("my-bucket");
        });
}
```

{{% /choosable %}}

{{< /chooser >}}

You can find additional examples of using GCP-Native in
[the Pulumi examples repo](https://github.com/pulumi/examples).

## Libraries

The following packages are available in package managers:

* JavaScript/TypeScript: [`@pulumi/gcp-native`](https://www.npmjs.com/package/@pulumi/gcp-native)
* Python: [`pulumi-gcp-native`](https://pypi.org/project/pulumi-gcp-native/)
* Go: [`github.com/pulumi/pulumi-gcp-native/sdk/go/gcp`](https://github.com/pulumi/pulumi-gcp-native)
* .NET: [`Pulumi.Gcp.Native`](https://www.nuget.org/packages/Pulumi.Gcp.Native)

The GCP provider is open source and available in the [pulumi/pulumi-gcp-native](https://github.com/pulumi/pulumi-gcp-native) repo.

