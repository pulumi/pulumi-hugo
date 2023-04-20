---
title: Deploy the Changes | AWS
h1: Deploy the Changes
linktitle: Deploy the Changes
meta_desc: This page provides an overview of how deploy changes to an AWS project.
weight: 7
menu:
  getstarted:
    parent: aws
    identifier: aws-deploy-changes

aliases: ["/docs/quickstart/aws/deploy-changes/"]
---

Now let's deploy your changes.

```bash
$ pulumi up
```

Pulumi will run the `preview` step of the update, which computes the minimally disruptive change to achieve the desired state described by the program.

```
Previewing update (dev):

     Type                    Name            Plan
     pulumi:pulumi:Stack     quickstart-dev
 +   └─ aws:s3:BucketObject  index.html       create

Resources:
    + 1 to create
    2 unchanged

Do you want to perform this update?
> yes
  no
  details
```

Choosing `yes` will proceed with the update and upload the `index.html` file to your bucket:

```
Do you want to perform this update? yes
Updating (dev):

     Type                    Name            Status
     pulumi:pulumi:Stack     quickstart-dev
 +   └─ aws:s3:BucketObject  index.html       created

Outputs:
    bucketName: "my-bucket-b9c2eaa"

Resources:
    + 1 created
    2 unchanged

Duration: 6s
```

Once the update has completed, you can verify the object was created in your bucket by checking the AWS Console or by running the following AWS CLI command:

{{% choosable language javascript %}}

```bash
$ aws s3 ls $(pulumi stack output bucketName)
```

{{% /choosable %}}

{{% choosable language typescript %}}

```bash
$ aws s3 ls $(pulumi stack output bucketName)
```

{{% /choosable %}}

{{% choosable language python %}}

```bash
$ aws s3 ls $(pulumi stack output bucket_name)
```

{{% /choosable %}}

{{% choosable language go %}}

```bash
$ aws s3 ls $(pulumi stack output bucketName)
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
$ aws s3 ls $(pulumi stack output bucketName)
```

{{% /choosable %}}

{{% choosable language java %}}

```bash
$ aws s3 ls $(pulumi stack output bucketName)
```

{{% /choosable %}}

{{% choosable language yaml %}}

```bash
$ aws s3 ls $(pulumi stack output bucketName)
```

{{% /choosable %}}

Notice that your `index.html` file has been added to the bucket:

```bash
2020-08-27 12:30:24         70 index.html
```

Now that `index.html` is in the bucket, modify the program to serve `index.html` as the home page of the website.

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language "javascript,typescript" %}}

```typescript
const bucket = new aws.s3.Bucket("my-bucket", {
    website: {
        indexDocument: "index.html",
    },
});
```

{{% /choosable %}}

{{% choosable language python %}}

```python
bucket = s3.Bucket("my-bucket",
    website=s3.BucketWebsiteArgs(
        index_document="index.html",
    ),
)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
bucket, err := s3.NewBucket(ctx, "my-bucket", &s3.BucketArgs{
    Website: &s3.BucketWebsiteArgs{
        IndexDocument: pulumi.String("index.html"),
    },
})
if err != nil {
    return err
}
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
var bucket = new Aws.S3.Bucket("my-bucket", new()
{
    Website = new Aws.S3.Inputs.BucketWebsiteArgs
    {
        IndexDocument = "index.html",
    },
});
```

{{% /choosable %}}

{{% choosable language java %}}

```java
import com.pulumi.aws.s3.BucketArgs;
import com.pulumi.aws.s3.inputs.BucketWebsiteArgs;

var bucket = new Bucket("bucket", BucketArgs.builder()
    .website(BucketWebsiteArgs.builder()
        .indexDocument("index.html")
        .build())
    .build());
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
my-bucket:
  type: aws:s3:Bucket
  properties:
    website:
      indexDocument: index.html
```

{{% /choosable %}}

Finally, you'll make a few adjustments to allow these resources to be accessed anonymously over the Internet.

For the bucket itself, you'll need two new resources: a `BucketOwnershipControls` resource, which defines the bucket's object-ownership settings, and a `BucketPublicAccessBlock` resource, which allows the bucket to be accessed publicly.

For the `BucketObject`, you'll need an access-control (ACL) setting of `public-read` to allow the page to be accessed publicly, and a content type of `text/html` to tell AWS to serve the file as a web page:

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language "javascript,typescript" %}}

```typescript
const ownershipControls = new aws.s3.BucketOwnershipControls("ownership-controls", {
    bucket: bucket.id,
    rule: {
        objectOwnership: "ObjectWriter"
    }
});

const publicAccessBlock = new aws.s3.BucketPublicAccessBlock("public-access-block", {
    bucket: bucket.id,
    blockPublicAcls: false,
});

const bucketObject = new aws.s3.BucketObject("index.html", {
    bucket: bucket.id,
    source: new pulumi.asset.FileAsset("index.html"),
    contentType: "text/html",
    acl: "public-read",
}, { dependsOn: ownershipControls });
```

{{% /choosable %}}

{{% choosable language python %}}

```python
ownership_controls = aws.s3.BucketOwnershipControls(
    "ownership-controls",
    bucket=bucket.id,
    rule=aws.s3.BucketOwnershipControlsRuleArgs(
        object_ownership="ObjectWriter",
    ),
)

public_access_block = aws.s3.BucketPublicAccessBlock(
    "public-access-block", bucket=bucket.id, block_public_acls=False
)

bucket_object = s3.BucketObject(
    "index.html",
    bucket=bucket.id,
    source=homepage,
    content_type="text/html",
    acl="public-read",
    opts=pulumi.ResourceOptions(depends_on=[public_access_block]),
)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
_, err = s3.NewBucketOwnershipControls(ctx, "ownership-controls", &s3.BucketOwnershipControlsArgs{
    Bucket: bucket.ID(),
    Rule: &s3.BucketOwnershipControlsRuleArgs{
        ObjectOwnership: pulumi.String("ObjectWriter"),
    },
})
if err != nil {
    return err
}

publicAccessBlock, err := s3.NewBucketPublicAccessBlock(ctx, "public-access-block", &s3.BucketPublicAccessBlockArgs{
    Bucket:          bucket.ID(),
    BlockPublicAcls: pulumi.Bool(false),
})
if err != nil {
    return err
}

_, err = s3.NewBucketObject(ctx, "index.html", &s3.BucketObjectArgs{
    Bucket:      bucket.ID(),
    Source:      Asset(homepage),
    ContentType: pulumi.String("text/html"),
    Acl:         pulumi.String("public-read"),
}, pulumi.DependsOn([]pulumi.Resource{
    publicAccessBlock,
}))
if err != nil {
    return err
}
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
var ownershipControls = new Aws.S3.BucketOwnershipControls("ownership-controls", new()
{
    Bucket = bucket.Id,
    Rule = new Aws.S3.Inputs.BucketOwnershipControlsRuleArgs
    {
        ObjectOwnership = "ObjectWriter",
    },
});

var publicAccessBlock = new Aws.S3.BucketPublicAccessBlock("public-access-block", new()
{
    Bucket = bucket.Id,
    BlockPublicAcls = false,
});

var indexHtml = new Aws.S3.BucketObject("index.html", new()
{
    Bucket = bucket.Id,
    Source = homepage,
    ContentType = "text/html",
    Acl = "public-read",
}, new CustomResourceOptions
{
    DependsOn = new[]
    {
        publicAccessBlock,
    },
});
```

{{% /choosable %}}

{{% choosable language java %}}

```java
import com.pulumi.aws.s3.BucketOwnershipControls;
import com.pulumi.aws.s3.BucketOwnershipControlsArgs;
import com.pulumi.aws.s3.inputs.BucketOwnershipControlsRuleArgs;
import com.pulumi.aws.s3.BucketPublicAccessBlock;
import com.pulumi.aws.s3.BucketPublicAccessBlockArgs;

var ownershipControls = new BucketOwnershipControls("ownershipControls", BucketOwnershipControlsArgs.builder()
    .bucket(bucket.id())
    .rule(BucketOwnershipControlsRuleArgs.builder()
        .objectOwnership("ObjectWriter")
        .build())
    .build());

var publicAccessBlock = new BucketPublicAccessBlock("publicAccessBlock", BucketPublicAccessBlockArgs.builder()
    .bucket(bucket.id())
    .blockPublicAcls(false)
    .build());

var indexHtml = new BucketObject("indexHtml", BucketObjectArgs.builder()
    .bucket(bucket.id())
    .source(homepage)
    .contentType("text/html")
    .acl("public-read")
    .build(), CustomResourceOptions.builder()
        .dependsOn(publicAccessBlock)
        .build());
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
ownership-controls:
  type: aws:s3:BucketOwnershipControls
  properties:
    bucket: ${my-bucket.id}
    rule:
      objectOwnership: ObjectWriter

public-access-block:
  type: aws:s3:BucketPublicAccessBlock
  properties:
    bucket: ${my-bucket.id}
    blockPublicAcls: false

index.html:
  type: aws:s3:BucketObject
  properties:
    bucket: ${my-bucket.id}
    source: ${homepage}
    contentType: text/html
    acl: public-read
  options:
    dependsOn:
      - ${public-access-block}
```

{{% /choosable %}}

Notice the `BucketObject` also includes a Pulumi resource _option:_ [`dependsOn`](/docs/intro/concepts/resources/options/dependson/). This option tells Pulumi that the `BucketObject` relies indirectly on the `BucketPublicAccessBlock`, which is currently configuring the bucket to permit public access to its objects. If this setting were omitted, the attempt to grant `public-read` access to `index.html` would fail, as all S3 buckets and their objects are blocked from public access by default.

Finally, at the end of the program, export the resulting bucket’s endpoint URL so you can navigate to it easily:

{{% choosable language javascript %}}

```javascript
exports.bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
```

{{% /choosable %}}

{{% choosable language typescript %}}

```typescript
export const bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
```

{{% /choosable %}}

{{% choosable language python %}}

```python
pulumi.export("bucket_endpoint", pulumi.Output.concat("http://", bucket.website_endpoint))
```

{{% /choosable %}}

{{% choosable language go %}}

```go
// ...
ctx.Export("bucketEndpoint", bucket.WebsiteEndpoint.ApplyT(func(websiteEndpoint string) (string, error) {
    return fmt.Sprintf("http://%v", websiteEndpoint), nil
}).(pulumi.StringOutput))
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
return new Dictionary<string, object?>
{
    // ...
    ["bucketEndpoint"] = bucket.WebsiteEndpoint.Apply(websiteEndpoint => $"http://{websiteEndpoint}"),
};
```

{{% /choosable %}}

{{% choosable language java %}}

```java
// ...
ctx.export("bucketEndpoint", bucket.websiteEndpoint().applyValue(websiteEndpoint -> String.format("http://%s", websiteEndpoint)));
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
outputs:
  # ...
  bucketEndpoint: http://${my-bucket.websiteEndpoint}
```

{{% /choosable %}}

Finally, you can check out your new static website at the URL in the `Outputs` section of your update or you can make a `curl` request and see the contents of your `index.html` object printed out in your terminal.

{{% choosable language javascript %}}

```bash
$ curl $(pulumi stack output bucketEndpoint)
```

{{% /choosable %}}

{{% choosable language typescript %}}

```bash
$ curl $(pulumi stack output bucketEndpoint)
```

{{% /choosable %}}

{{% choosable language python %}}

```bash
$ curl $(pulumi stack output bucket_endpoint)
```

{{% /choosable %}}

{{% choosable language go %}}

```bash
$ curl $(pulumi stack output bucketEndpoint)
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
$ curl $(pulumi stack output bucketEndpoint)
```

{{% /choosable %}}

{{% choosable language java %}}

```bash
$ curl $(pulumi stack output bucketEndpoint)
```

{{% /choosable %}}

{{% choosable language yaml %}}

```bash
$ curl $(pulumi stack output bucketEndpoint)
```

{{% /choosable %}}

And you should see:

```bash
<html>
    <body>
        <h1>Hello, Pulumi!</h1>
    </body>
</html>
```

Next you will destroy the resources.

{{< get-started-stepper >}}
