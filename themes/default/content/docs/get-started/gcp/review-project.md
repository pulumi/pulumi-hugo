---
title: Review the New Project | GCP
h1: Review the New Project
linktitle: Review the New Project
meta_desc: This page provides an overview on how to a review a new Google Cloud project.
weight: 4
menu:
  getstarted:
    parent: gcp
    identifier: gcp-review-project

aliases: ["/docs/quickstart/gcp/review-project/"]
---

Let's review some of the generated project files:

{{% choosable language "javascript,typescript,python,go,csharp,java" %}}

- `Pulumi.yaml` defines the [project]({{< relref "/docs/intro/concepts/project" >}}).

{{% /choosable %}}

{{% choosable language yaml %}}

- `Pulumi.yaml` defines both the [project]({{< relref "/docs/intro/concepts/project" >}}) and the program that manages your stack resources.

{{% /choosable %}}

- `Pulumi.dev.yaml` contains [configuration]({{< relref "/docs/intro/concepts/config" >}}) values for the [stack]({{< relref "/docs/intro/concepts/stack" >}}) you initialized.

{{% choosable language csharp %}}

- `Program.cs` with a simple entry point.

{{% /choosable %}}

{{% choosable language java %}}

- `src/main/java/myproject` defines the project's Java package root.

{{% /choosable %}}

{{% choosable language "javascript,typescript,python,go,csharp,java" %}}

<!-- The wrapping spans are infortunately necessary here; without them, the renderer gets confused and generates invalid markup. -->
- <span>{{< langfile >}}</span> is the Pulumi program that defines your stack resources.

{{% /choosable %}}

Let's examine {{< langfile >}}.

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language javascript %}}

```javascript
"use strict";
const pulumi = require("@pulumi/pulumi");
const gcp = require("@pulumi/gcp");

// Create a GCP resource (Storage Bucket)
const bucket = new gcp.storage.Bucket("my-bucket");

// Export the DNS name of the bucket
exports.bucketName = bucket.url;
```

{{% /choosable %}}

{{% choosable language typescript %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

// Create a GCP resource (Storage Bucket)
const bucket = new gcp.storage.Bucket("my-bucket");

// Export the DNS name of the bucket
export const bucketName = bucket.url;
```

{{% /choosable %}}

{{% choosable language python %}}

```python
import pulumi
from pulumi_gcp import storage

# Create a GCP resource (Storage Bucket)
bucket = storage.Bucket('my-bucket')

# Export the DNS name of the bucket
pulumi.export('bucket_name',  bucket.url)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
package main

import (
    "github.com/pulumi/pulumi-gcp/sdk/v6/go/gcp/storage"
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
    pulumi.Run(func(ctx *pulumi.Context) error {
        // Create a GCP resource (Storage Bucket)
	bucket, err := storage.NewBucket(ctx, "my-bucket", &storage.BucketArgs{
	    Location: pulumi.String("US"),
	})
	if err != nil {
	    return err
	}

        // Export the DNS name of the bucket
        ctx.Export("bucketName", bucket.Url)
        return nil
    })
}
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
using Pulumi;
using Pulumi.Gcp.Storage;

class MyStack : Stack
{
    public MyStack()
    {
        // Create a GCP resource (Storage Bucket)
        var bucket = new Bucket("my-bucket");

        // Export the DNS name of the bucket
        this.BucketName = bucket.Url;
    }

    [Output]
    public Output<string> BucketName { get; set; }
}
```

{{% /choosable %}}

{{% choosable language java %}}

```java
package myproject;

import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.gcp.storage.Bucket;
import com.pulumi.gcp.storage.BucketArgs;

public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            var bucket = new Bucket("my-bucket",
                                    BucketArgs.builder()
                                    .location("US")
                                    .build());
            ctx.export("bucketName", bucket.url());
            return ctx.exports();
        });
    }
}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
name: quickstart
runtime: yaml
description: A minimal Google Cloud Pulumi YAML program

resources:
  # Create a GCP resource (Storage Bucket)
  my-bucket:
    type: gcp:storage:Bucket
    properties:
      location: US

outputs:
  # Export the DNS name of the bucket
  bucketName: ${my-bucket.url}
```

{{% /choosable %}}

This Pulumi program creates a new storage bucket and exports the DNS name of the bucket.

{{% choosable language javascript %}}

```javascript
exports.bucketName = bucket.url;
```

{{% /choosable %}}

{{% choosable language typescript %}}

```typescript
export const bucketName = bucket.url;
```

{{% /choosable %}}

{{% choosable language python %}}

```python
pulumi.export('bucket_name',  bucket.url)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
ctx.Export("bucketName", bucket.Url)
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
[Output]
public Output<string> BucketName { get; set; }
```

{{% /choosable %}}

{{% choosable language java %}}

```java
ctx.export("bucketName", bucket.url());
return ctx.exports();
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
outputs:
  bucketName: ${bucket.url}
```

{{% /choosable %}}

Next, you'll deploy your stack, which will provision your storage bucket.

{{< get-started-stepper >}}
