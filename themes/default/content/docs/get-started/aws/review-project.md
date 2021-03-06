---
title: Review the New Project | AWS
h1: Review the New Project
linktitle: Review the New Project
meta_desc: This page provides an overview on how to a review a new AWS project.
weight: 4
menu:
  getstarted:
    parent: aws
    identifier: aws-review-project

aliases: ["/docs/quickstart/aws/review-project/"]
---

Let's review some of the generated project files:

- `Pulumi.yaml` defines the [project]({{< relref "/docs/intro/concepts/project" >}}).
- `Pulumi.dev.yaml` contains [configuration]({{< relref "/docs/intro/concepts/config" >}}) values for the [stack]({{< relref "/docs/intro/concepts/stack" >}}) you initialized.

{{% choosable language csharp %}}

- `Program.cs` with a simple entry point.

{{% /choosable %}}

- {{< langfile >}} is the Pulumi program that defines your stack resources. Let's examine it.

{{< chooser language "javascript,typescript,python,go,csharp" / >}}

{{% choosable language javascript %}}

```javascript
"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket");

// Export the name of the bucket
exports.bucketName = bucket.id;
```

{{% /choosable %}}

{{% choosable language typescript %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket");

// Export the name of the bucket
export const bucketName = bucket.id;
```

{{% /choosable %}}

{{% choosable language python %}}

```python
import pulumi
from pulumi_aws import s3

# Create an AWS resource (S3 Bucket)
bucket = s3.Bucket('my-bucket')

# Export the name of the bucket
pulumi.export('bucket_name',  bucket.id)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
package main

import (
    "github.com/pulumi/pulumi-aws/sdk/v4/go/aws/s3"
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
    pulumi.Run(func(ctx *pulumi.Context) error {
        // Create an AWS resource (S3 Bucket)
        bucket, err := s3.NewBucket(ctx, "my-bucket", nil)
        if err != nil {
            return err
        }

        // Export the name of the bucket
        ctx.Export("bucketName", bucket.ID())
        return nil
    })
}
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
using Pulumi;
using Pulumi.Aws.S3;

class MyStack : Stack
{
    public MyStack()
    {
        // Create an AWS resource (S3 Bucket)
        var bucket = new Bucket("my-bucket");

        // Export the name of the bucket
        this.BucketName = bucket.Id;
    }

    [Output]
    public Output<string> BucketName { get; set; }
}
```

{{% /choosable %}}

This Pulumi program creates a new S3 bucket and exports the name of the bucket.

{{% choosable language javascript %}}

```javascript
exports.bucketName = bucket.id;
```

{{% /choosable %}}

{{% choosable language typescript %}}

```typescript
export const bucketName = bucket.id;
```

{{% /choosable %}}

{{% choosable language python %}}

```python
pulumi.export('bucket_name',  bucket.id)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
ctx.Export("bucketName", bucket.ID())
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
[Output]
public Output<string> BucketName { get; set; }
```

{{% /choosable %}}

Next, you'll deploy your stack, which will provision your S3 bucket.

{{< get-started-stepper >}}
