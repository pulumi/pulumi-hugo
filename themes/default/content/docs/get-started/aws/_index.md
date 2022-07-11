---
title: Get Started with AWS
meta_desc: This page provides an overview and guide on how to get started with AWS.
linktitle: AWS
weight: 1
menu:
  getstarted:
    identifier: aws
    weight: 2

aliases: ["/docs/quickstart/aws/"]
---

{{< cloud-intro "AWS" >}}

## Before You Begin

Before you get started using Pulumi, let's run through a few quick steps to ensure your environment is set up correctly.

### Install Pulumi

{{< install-pulumi >}}
{{% notes "info" %}}
All Windows examples in this tutorial assume you are running in PowerShell.
{{% /notes %}}
{{< /install-pulumi >}}

Next, install the required language runtime, if you have not already.

### Install Language Runtime

#### Choose Your Language

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language "javascript,typescript" %}}
{{< install-node >}}
{{% /choosable %}}

{{% choosable language python %}}
{{< install-python >}}
{{% /choosable %}}

{{% choosable language go %}}
{{< install-go >}}
{{% /choosable %}}

{{% choosable language "csharp,fsharp,visualbasic" %}}
{{< install-dotnet >}}
{{% /choosable %}}

{{% choosable language "java" %}}
{{< install-java >}}
{{% /choosable %}}

{{% choosable language "yaml" %}}
{{< install-yaml >}}
{{% /choosable %}}

### Configure Pulumi to access your AWS account

Pulumi requires cloud credentials to manage and provision resources. You must use an IAM user account that has **Programmatic access** with rights to deploy and manage resources handled through Pulumi.

If you have previously <a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html" target="_blank">installed</a> and <a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html" target="_blank">configured</a> the AWS CLI, Pulumi will respect and use your configuration settings.

If you do not have the AWS CLI installed or plan on using Pulumi from within a CI/CD pipeline, <a href="https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys" target="_blank">retrieve your access key ID and secret access key</a> and then set the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables on your workstation.

{{< chooser os "linux,macos,windows" >}}
{{% choosable os linux %}}

```bash
$ export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>
$ export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
```

{{% /choosable %}}

{{% choosable os macos %}}

```bash
$ export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>
$ export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
```

{{% /choosable %}}

{{% choosable os windows %}}

```powershell
> $env:AWS_ACCESS_KEY_ID = "<YOUR_ACCESS_KEY_ID>"
> $env:AWS_SECRET_ACCESS_KEY = "<YOUR_SECRET_ACCESS_KEY>"
```

{{% /choosable %}}
{{< /chooser >}}

For additional information on setting and using AWS credentials, see [AWS Setup]({{< relref "/registry/packages/aws/installation-configuration" >}}).

Next, you'll create a new Pulumi project.

## Create a New Project

Now that you have set up your environment by installing Pulumi, installing your preferred language runtime,
and configuring your AWS credentials, let's create your first Pulumi program.

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language javascript %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new aws-javascript
```

{{% /choosable %}}
{{% choosable language typescript %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new aws-typescript
```

{{% /choosable %}}
{{% choosable language python %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new aws-python
```

{{% /choosable %}}
{{% choosable language go %}}

```bash
# from within your $GOPATH
$ mkdir quickstart && cd quickstart
$ pulumi new aws-go
```

{{% /choosable %}}
{{% choosable language csharp %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new aws-csharp
```

{{% /choosable %}}
{{% choosable language java %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new aws-java
```

{{% /choosable %}}
{{% choosable language yaml %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new aws-yaml
```

{{% /choosable %}}

The [`pulumi new`]({{< relref "/docs/reference/cli/pulumi_new" >}}) command creates a new Pulumi project with some basic scaffolding based on the cloud and language specified.

{{< cli-note >}}

After logging in, the CLI will proceed with walking you through creating a new project.

First, you will be asked for a project name and description. Hit `ENTER` to accept the default values or specify new values.

Next, you will be asked for the name of a stack. Hit `ENTER` to accept the default value of `dev`.

Finally, you will be prompted for some configuration values for the stack. For AWS projects, you will be prompted for the AWS region. You can accept the default value or choose another value like `us-west-2`.

> What are [projects]({{< relref "/docs/intro/concepts/project" >}}) and [stacks]({{< relref "/docs/intro/concepts/stack" >}})? Pulumi projects and stacks let you organize Pulumi code. Consider a Pulumi _project_ to be analogous to a GitHub repo---a single place for code---and a _stack_ to be an instance of that code with a separate configuration. For instance, _Project Foo_ may have multiple stacks for different development environments (Dev, Test, or Prod), or perhaps for different cloud configurations (geographic region for example). See [Organizing Projects and Stacks]({{< relref "/docs/guides/organizing-projects-stacks" >}}) for some best practices on organizing your Pulumi projects and stacks.

{{% choosable language "javascript,typescript" %}}
After some dependency installations from `npm`, the project and stack will be ready.
{{% /choosable %}}

{{% choosable language python %}}
After the command completes, the project and stack will be ready.
{{% /choosable %}}

{{% choosable language go %}}
After the command completes, the project and stack will be ready.
{{% /choosable %}}

{{% choosable language "csharp,fsharp,visualbasic" %}}
After the command completes, the project and stack will be ready.
{{% /choosable %}}

Next, we'll review the generated project files.

## Review the New Project

Let's review some of the generated project files:

{{% choosable language "javascript,typescript,python,go,csharp,java" %}}

- `Pulumi.yaml` defines the [project]({{< relref "/docs/intro/concepts/project" >}}).

{{% /choosable %}}

{{% choosable language "yaml" %}}

- `Pulumi.yaml` defines both the [project]({{< relref "/docs/intro/concepts/project" >}}) and the program that manages your stack resources.

{{% /choosable %}}

- `Pulumi.dev.yaml` contains [configuration]({{< relref "/docs/intro/concepts/config" >}}) values for the [stack]({{< relref "/docs/intro/concepts/stack" >}}) you just initialized.

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

{{% choosable language java %}}

```java
package myproject;

import com.pulumi.Pulumi;
import com.pulumi.aws.s3.Bucket;

public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {

            // Create an AWS resource (S3 Bucket)
            var bucket = new Bucket("my-bucket");

            // Export the name of the bucket
            ctx.export("bucketName", bucket.getId());
        });
    }
}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
name: quickstart
runtime: yaml
description: A minimal AWS Pulumi YAML program

resources:
  # Create an AWS resource (S3 Bucket)
  my-bucket:
    type: aws:s3:Bucket

outputs:
  # Export the name of the bucket
  bucketName: ${my-bucket.id}
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

{{% choosable language java %}}

```java
ctx.export("bucketName", bucket.getId());
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
outputs:
  bucketName: ${my-bucket.id}
```

{{% /choosable %}}

Next, you'll deploy your stack, which will provision your S3 bucket.

## Deploy the Stack

Let's go ahead and deploy your stack:

```bash
$ pulumi up
```

This command evaluates your program and determines the resource updates to make. First, a preview is shown that outlines the changes that will be made when you run the update:

```
Previewing update (dev):

     Type                 Name            Plan
 +   pulumi:pulumi:Stack  quickstart-dev  create
 +   └─ aws:s3:Bucket     my-bucket       create

Resources:
    + 2 to create

Do you want to perform this update?
> yes
  no
  details
```

Once the preview has finished, you are given three options to choose from. Choosing `details` will show you a rich diff of the changes to be made. Choosing `yes` will create your new S3 bucket in AWS. Choosing `no` will return you to the user prompt without performing the update operation.

```
Do you want to perform this update? yes
Updating (dev):

     Type                 Name            Status
 +   pulumi:pulumi:Stack  quickstart-dev  created
 +   └─ aws:s3:Bucket     my-bucket       created

Outputs:
    bucketName: "my-bucket-68e33ec"

Resources:
    + 2 created

Duration: 14s
```

Remember the output you defined in the previous step? That [stack output]({{< relref "/docs/intro/concepts/stack#outputs" >}}) can be seen in the `Outputs:` section of your update. You can access your outputs from the CLI by running the `pulumi stack output [property-name]` command. For example you can print the name of your bucket with the following command:

{{% choosable language javascript %}}

```bash
$ pulumi stack output bucketName
```

{{% /choosable %}}

{{% choosable language typescript %}}

```bash
$ pulumi stack output bucketName
```

{{% /choosable %}}

{{% choosable language python %}}

```bash
$ pulumi stack output bucket_name
```

{{% /choosable %}}

{{% choosable language go %}}

```bash
$ pulumi stack output bucketName
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
$ pulumi stack output BucketName
```

{{% /choosable %}}

{{% choosable language java %}}

```bash
$ pulumi stack output bucketName
```

{{% /choosable %}}

{{% choosable language yaml %}}

```bash
$ pulumi stack output bucketName
```

{{% /choosable %}}

Running that command will print out the name of your bucket.

{{< console-note >}}

Now that your bucket has been provisioned, let's modify the bucket to host a static website.

## Modify the Program

Now that your S3 bucket is provisioned, let's add an object to it. First, from within your project directory, create a new `index.html` file with some content in it.

{{< chooser os "macos,linux,windows" / >}}

{{% choosable os macos %}}

```bash
cat <<EOT > index.html
<html>
    <body>
        <h1>Hello, Pulumi!</h1>
    </body>
</html>
EOT
```

{{% /choosable %}}

{{% choosable os linux %}}

```bash
cat <<EOT > index.html
<html>
    <body>
        <h1>Hello, Pulumi!</h1>
    </body>
</html>
EOT
```

{{% /choosable %}}

{{% choosable os windows %}}

```powershell
@"
<html>
  <body>
    <h1>Hello, Pulumi!</h1>
  </body>
</html>
"@ | Out-File -FilePath index.html
```

{{% /choosable %}}

Now that you have your new `index.html` with some content, open your program file and modify it to add the contents of your `index.html` file to your S3 bucket.

To accomplish this, you will use Pulumi's `FileAsset` class to assign the content of the file to a new  `BucketObject`.

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language javascript %}}

In `index.js`, create the `BucketObject` right after creating the bucket itself.

```javascript
const bucketObject = new aws.s3.BucketObject("index.html", {
    bucket: bucket,
    source: new pulumi.asset.FileAsset("index.html")
});
```

{{% /choosable %}}

{{% choosable language typescript %}}

In `index.ts`, create the `BucketObject` right after creating the bucket itself.

```typescript
const bucketObject = new aws.s3.BucketObject("index.html", {
    bucket: bucket,
    source: new pulumi.asset.FileAsset("index.html")
});
```

{{% /choosable %}}

{{% choosable language python %}}

In `__main__.py`, create a new bucket object by adding the following right after creating the bucket itself:

```python
bucketObject = s3.BucketObject(
    'index.html',
    bucket=bucket.id,
    source=pulumi.FileAsset('index.html')
)
```

{{% /choosable %}}

{{% choosable language go %}}

In `main.go`, create the `BucketObject` right after creating the bucket itself.

```go
_, err = s3.NewBucketObject(ctx, "index.html", &s3.BucketObjectArgs{
    Bucket:  bucket.ID(),
    Source: pulumi.NewFileAsset("index.html"),
})
if err != nil {
    return err
}
```

{{% /choosable %}}

{{% choosable language csharp %}}

In `MyStack.cs`, create the `BucketObject` right after creating the bucket itself.

```csharp
var bucketObject = new BucketObject("index.html", new BucketObjectArgs
{
    Bucket = bucket.BucketName,
    Source = new FileAsset("index.html")
});
```

{{% /choosable %}}

{{% choosable language java %}}

In {{< langfile >}}, import the `FileAsset`, `BucketObject`, and `BucketObjectArgs` classes, then create the `BucketObject` right after creating the bucket itself.

```java
// ...
import com.pulumi.asset.FileAsset;
import com.pulumi.aws.s3.BucketObject;
import com.pulumi.aws.s3.BucketObjectArgs;

public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            // var bucket = ...

            // Create an S3 Bucket object
            new BucketObject("index.html", BucketObjectArgs.builder()
                .bucket(bucket.getId())
                .source(new FileAsset("index.html"))
                .build()
            );
```

{{% /choosable %}}

{{% choosable language "yaml" %}}

In {{< langfile >}}, create the `BucketObject` right below the bucket itself.

```yaml
resources:
  # ...
  index.html:
    type: aws:s3:BucketObject
    properties:
      bucket: ${my-bucket}
      source:
        Fn::FileAsset: ./index.html
```

{{% /choosable %}}

Notice how you provide the bucket you created earlier as an input to your new `BucketObject`. This is so Pulumi knows what S3 bucket the object should live in.

Next, you'll deploy your changes.

## Deploy the Changes

Now let's deploy your changes.

```bash
$ pulumi up
```

Pulumi will run the `preview` step of the update, which computes the minimally disruptive change to achieve the desired state described by the program.

```
Previewing update (dev):

     Type                    Name            Plan       Info
     pulumi:pulumi:Stack     quickstart-dev
 +   └─ aws:s3:BucketObject  index.html                 create

Resources:
    + 1 to create
    2 unchanged

Do you want to perform this update?
> yes
  no
  details
```

Choosing `yes` will proceed with the update and upload your `index.html` file to your bucket.

```
Do you want to perform this update? yes
Updating (dev):

     Type                     Name            Status      Info
     pulumi:pulumi:Stack      quickstart-dev
  +   └─ aws:s3:BucketObject  index.html                  created

Outputs:
    bucketName: "my-bucket-68e33ec"

Resources:
    + 1 created
    2 unchanged

Duration: 6s
```

Once the update has completed, you can verify the object was created in your bucket by checking the AWS Console or by running the following AWS CLI command:

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

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
$ aws s3 ls $(pulumi stack output BucketName)
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

{{% choosable language javascript %}}

Now that your `index.html` is in your bucket, modify the program file to have the bucket serve `index.html` as a static website. First, set the `website` property on your bucket.

```javascript
const bucket = new aws.s3.Bucket("my-bucket", {
    website: {
        indexDocument: "index.html",
    },
});
```

Next, your `index.html` object will need two changes: an ACL of `public-read` so that it can be accessed anonymously over the Internet, and a content type so that it is served as HTML:

```javascript
const bucketObject = new aws.s3.BucketObject("index.html", {
    acl: "public-read",
    contentType: "text/html",
    bucket: bucket,
    source: new pulumi.asset.FileAsset("index.html"),
});
```

Finally, at the end of the program file, export the resulting bucket’s endpoint URL so you can easily access it:

```javascript
exports.bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
```

{{% /choosable %}}

{{% choosable language typescript %}}

Now that your `index.html` is in your bucket, modify the program file to have the bucket serve `index.html` as a static website. First, set the `website` property on your bucket.

```typescript
const bucket = new aws.s3.Bucket("my-bucket", {
    website: {
        indexDocument: "index.html",
    },
});
```

Next, your `index.html` object will need two changes: an ACL of `public-read` so that it can be accessed anonymously over the Internet, and a content type so that it is served as HTML:

```typescript
const bucketObject = new aws.s3.BucketObject("index.html", {
    acl: "public-read",
    contentType: "text/html",
    bucket: bucket,
    source: new pulumi.asset.FileAsset("index.html")
});
```

Finally, at the end of the program file, export the resulting bucket’s endpoint URL so you can easily access it:

```typescript
export const bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
```

{{% /choosable %}}

{{% choosable language python %}}

Now that your `index.html` is in your bucket, modify the program file to have the bucket serve `index.html` as a static website. First, set the `website` property on your bucket.

```python
bucket = s3.Bucket('my-bucket',
    website=s3.BucketWebsiteArgs(
        index_document="index.html",
    ))
```

Next, your `index.html` object will need two changes: an ACL of public-read so that it can be accessed anonymously over the Internet, and a content type so that it is served as HTML:

```python
bucketObject = s3.BucketObject(
    'index.html',
    acl='public-read',
    content_type='text/html',
    bucket=bucket,
    source=pulumi.FileAsset('index.html'),
)
```

Finally, at the end of the program file, export the resulting bucket’s endpoint URL so you can easily access it:

```python
pulumi.export('bucket_endpoint', pulumi.Output.concat('http://', bucket.website_endpoint))
```

{{% /choosable %}}

{{% choosable language go %}}

Now that your `index.html` is in your bucket, modify the program to have the bucket serve `index.html` as a static website. First, set the `Website` property on your bucket.

```go
bucket, err := s3.NewBucket(ctx, "my-bucket", &s3.BucketArgs{
    Website: s3.BucketWebsiteArgs{
        IndexDocument: pulumi.String("index.html"),
    },
})
```

Next, your `index.html` object will need two changes: an ACL of public-read so that it can be accessed anonymously over the Internet, and a content type so that it is served as HTML:

```go
_, err = s3.NewBucketObject(ctx, "index.html", &s3.BucketObjectArgs{
    Acl:         pulumi.String("public-read"),
    ContentType: pulumi.String("text/html"),
    Bucket:      bucket.ID(),
    Source:      pulumi.NewFileAsset("index.html"),
})
```

Finally, at the end of the program file, export the resulting bucket’s endpoint URL so you can easily access it:

```go
ctx.Export("bucketEndpoint", pulumi.Sprintf("http://%s", bucket.WebsiteEndpoint))
```

{{% /choosable %}}

{{% choosable language csharp %}}

Now that your `index.html` is in your bucket, modify the program to have the bucket serve `index.html` as a static website. First, set the `Website` property on your bucket.

```csharp
// Add this import
using Pulumi.Aws.S3.Inputs;
```

```csharp
var bucket = new Bucket("my-bucket", new BucketArgs
{
    Website = new BucketWebsiteArgs
    {
        IndexDocument = "index.html"
    }
});
```

Next, your `index.html` object will need two changes: an ACL of public-read so that it can be accessed anonymously over the Internet, and a content type so that it is served as HTML:

```csharp
var bucketObject = new BucketObject("index.html", new BucketObjectArgs
{
    Acl = "public-read",
    ContentType = "text/html",
    Bucket = bucket.BucketName,
    Source = new FileAsset("index.html")
});
```

Finally, at the end of the program file, export the resulting bucket’s endpoint URL so you can easily access it:

```csharp
// Export the name of the bucket
this.BucketName = bucket.Id;
this.BucketEndpoint = Output.Format($"http://{bucket.WebsiteEndpoint}");
```

```csharp
[Output]
public Output<string> BucketName { get; set; }

[Output]
public Output<string> BucketEndpoint { get; set; }
```

{{% /choosable %}}

{{% choosable language java %}}

Now that your `index.html` is in your bucket, modify the program to have the bucket serve `index.html` as a static website.

First, add the `BucketArgs` and `BucketWebsiteArgs` classes to the list of imports.

```java
// ...
import com.pulumi.aws.s3.BucketArgs;
import com.pulumi.aws.s3.inputs.BucketWebsiteArgs;
```

Next, extend the `Bucket` declaration to include a `website` property containing the filename to use as an `indexDocument`:

```java
// ...
public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {

            // Create an AWS resource (S3 Bucket)
            var bucket = new Bucket("my-bucket", BucketArgs.builder()
                .website(BucketWebsiteArgs.builder()
                    .indexDocument("index.html")
                    .build()
                )
                .build()
            );
```

Now add two properties to the `BucketObject`: an ACL of `public-read` so that it can be accessed anonymously over the Internet, and a content type ensure it's served as HTML:

```java
// ...
public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            // var bucket = ...

            // Create an S3 Bucket object
            new BucketObject("index.html", BucketObjectArgs.builder()
                .bucket(bucket.getId())
                .source(new FileAsset("index.html"))
                .acl("public-read")
                .contentType("text/html")
                .build()
            );
```

Finally, at the end of the program file, export the resulting bucket’s endpoint URL so you can access it easily. You can do that by importing the Pulumi `Output` class:

```java
// ...
import com.pulumi.core.Output;
```

And adding a line to read the endpoint from the `Bucket` instance:

```java
// ...
public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {

            // ...
            ctx.export("bucketEndpoint", Output.format("http://%s", bucket.websiteEndpoint()));
        });
```

{{% /choosable %}}

{{% choosable language yaml %}}

Now that your `index.html` is in your bucket, modify the program to have the bucket serve `index.html` as a static website. To do that, set the bucket's `website` property, passing the filename to use as an `indexDocument`:

```yaml
resources:
  my-bucket:
    type: aws:s3:Bucket
    properties:
      website:
        indexDocument: index.html
```

Now add two properties to the `BucketObject`: an ACL of `public-read` so that it can be accessed anonymously over the Internet, and a content type ensure it's served as HTML:

```yaml
resources:
  # ...
  index.html:
    type: aws:s3:BucketObject
    properties:
      bucket: ${my-bucket}
      source:
        Fn::FileAsset: ./index.html
      acl: public-read
      contentType: text/html
```

Finally, at the end of the file, export the resulting bucket’s endpoint URL so you can access it easily:

```yaml
# ...
outputs:
  bucketName: ${my-bucket.id}
  bucketEndpoint: http://${my-bucket.websiteEndpoint}
```

{{% /choosable %}}

Now update your stack to have your S3 bucket serve your `index.html` file as a static website.

```bash
$ pulumi up
```

First, you will see a preview of your changes:

```
Previewing update (dev):

     Type                    Name            Plan       Info
     pulumi:pulumi:Stack     quickstart-dev
 ~   ├─ aws:s3:Bucket        my-bucket           update     [diff: +website]
 ~   └─ aws:s3:BucketObject  index.html          update     [diff: ~acl,contentType]

Outputs:
  + bucketEndpoint: output<string>

Resources:
    ~ 2 to update
    1 unchanged

Do you want to perform this update?
> yes
  no
  details
```

Select `yes` to deploy both changes:

```
Do you want to perform this update? yes
Updating (dev):

     Type                     Name            Status      Info
     pulumi:pulumi:Stack      quickstart-dev
~   ├─ aws:s3:Bucket        my-bucket           updated     [diff: +website]
~   └─ aws:s3:BucketObject  index.html          updated     [diff: ~acl,contentType]

Outputs:
  + bucketEndpoint: "http://my-bucket-b9c2eaa.s3-website-us-east-1.amazonaws.com"
    bucketName    : "my-bucket-b9c2eaa"

Resources:
    ~ 2 updated
    1 unchanged

Duration: 12s
```

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
$ curl $(pulumi stack output BucketEndpoint)
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

## Destroy the Stack

Now that you've seen how to deploy changes to our program, let's clean up and tear down the resources that are part of your stack.

To destroy resources, run the following:

```bash
$ pulumi destroy
```

You'll be prompted to make sure you really want to delete these resources. This can take a minute or two; Pulumi waits until all resources are shut down and deleted before it considers the destroy operation to be complete.

```
Previewing destroy (dev):

     Type                 Name            Plan
 -   pulumi:pulumi:Stack  quickstart-dev  delete
 -   ├─ aws:s3:BucketObject  index.html          delete
 -   └─ aws:s3:Bucket        my-bucket           delete

Outputs:
  - bucketEndpoint: "http://my-bucket-b9c2eaa.s3-website-us-east-1.amazonaws.com"
  - bucketName    : "my-bucket-b9c2eaa"

Resources:
    - 3 to delete

Do you want to perform this destroy? yes
Destroying (dev):

     Type                 Name            Status
 -   pulumi:pulumi:Stack  quickstart-dev  deleted
 -   ├─ aws:s3:BucketObject  index.html          deleted
 -   └─ aws:s3:Bucket        my-bucket           deleted

Outputs:
  - bucketEndpoint: "http://my-bucket-b9c2eaa.s3-website-us-east-1.amazonaws.com"
  - bucketName    : "my-bucket-b9c2eaa"

Resources:
    - 3 deleted

Duration: 7s
```

> To delete the stack itself, run [`pulumi stack rm`]({{< relref
"/docs/reference/cli/pulumi_stack_rm" >}}). Note that this removes the stack
entirely from the Pulumi Service, along with all of its update history.

Congratulations! You've successfully provisioned some cloud resources using Pulumi. By completing this guide you have successfully:

- Created a Pulumi new project.
- Provisioned a new S3 bucket.
- Added an `index.html` file to your bucket.
- Served the `index.html` as a static website.
- Destroyed the resources you've provisioned.

On the next page, we have a collection of examples and tutorials that you can deploy as they are or use them as a foundation for your own applications and infrastructure projects.

## Next Steps

Congrats! You've deployed your first project on AWS with Pulumi. Here are some next steps, depending on your learning style.

### Learn Pulumi

Dive into Learn Pulumi for a comprehensive walkthrough of key Pulumi concepts in the context of a real-life application.

{{< get-started-next-step path="/learn/pulumi-fundamentals" label="Learn Pulumi Fundamentals" ref="gs-aws-learn" >}}

### How-to Guides

Explore our how-to guides if you're looking for examples of specific architectures or application stacks. These guides are available in all Pulumi languages and cover many common architectures such as [static websites]({{< relref "/registry/packages/aws-native/how-to-guides/aws-native-ts-s3-folder" >}}), [EC2 virtual machines]({{< relref "/registry/packages/aws/how-to-guides/ec2-webserver" >}}), [EKS clusters]({{< relref "/registry/packages/aws/how-to-guides/aws-ts-eks" >}}), [Fargate containers]({{< relref "/registry/packages/aws/how-to-guides/ecs-fargate" >}}), and [serverless applications]({{< relref "/registry/packages/aws/how-to-guides/rest-api" >}}).

{{< get-started-next-step path="/registry/packages/aws/how-to-guides" label="Explore How-to Guides" ref="gs-aws-guides" >}}

### How Pulumi Works

Learn how Pulumi works from its architecture to key concepts, including [stacks]({{< relref "/docs/intro/concepts/stack" >}}), [state]({{< relref "/docs/intro/concepts/state" >}}), [configuration]({{< relref "/docs/intro/concepts/config" >}}), and [secrets]({{< relref "/docs/intro/concepts/secrets" >}}).

{{< get-started-next-step path="/docs/intro/concepts" label="Read Documentation" ref="gs-aws-docs" >}}

### Blog Posts

Read through the latest blog posts about using Pulumi with AWS, including everything from new AWS features and products supported by Pulumi to technical architectures and best practices.

{{< get-started-next-step path="/blog/tag/aws" label="Read the Pulumi Blog" ref="gs-aws-blog" >}}
