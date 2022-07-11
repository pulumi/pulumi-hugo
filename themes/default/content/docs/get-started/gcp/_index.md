---
title: Get Started with Google Cloud
meta_desc: This page provides an overview and guide on how to get started with Google Cloud.
linktitle: Google Cloud
weight: 1
menu:
  getstarted:
    identifier: gcp
    weight: 2

aliases: [
  "/docs/quickstart/gcp/",
  "/docs/quickstart/gcp/begin/",
  "/docs/quickstart/gcp/install-pulumi/",
  "/docs/quickstart/gcp/install-language-runtime/",
  "/docs/quickstart/gcp/configure/",
  "/docs/get-started/gcp/install-pulumi/",
  "/docs/get-started/gcp/install-language-runtime/",
  "/docs/get-started/gcp/configure/",
  "/docs/quickstart/gcp/create-project/",
  "/docs/quickstart/gcp/review-project/",
  "/docs/quickstart/gcp/deploy-stack/",
  "/docs/quickstart/gcp/modify-program/",
  "/docs/quickstart/gcp/deploy-changes/",
  "/docs/quickstart/gcp/destroy-stack/",
  "/docs/quickstart/gcp/next-steps/",
  "/docs/get-started/gcp/begin",
  "/docs/get-started/gcp/create-project",
  "/docs/get-started/gcp/deploy-changes",
  "/docs/get-started/gcp/deploy-stack",
  "/docs/get-started/gcp/destroy-stack",
  "/docs/get-started/gcp/modify-program",
  "/docs/get-started/gcp/next-steps",
  "/docs/get-started/gcp/review-project"
]
---

{{< cloud-intro "Google Cloud" >}}

# Before You Begin

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

{{% choosable language java %}}
{{< install-java >}}
{{% /choosable %}}

{{% choosable language yaml %}}
{{< install-yaml >}}
{{% /choosable %}}

Finally, configure Pulumi with Google Cloud.

### Configure Pulumi to access your Google Cloud account

Pulumi requires cloud credentials to manage and provision resources. You must use an IAM user or service account that has **Programmatic access** with rights to deploy and manage your Google Cloud resources.

In this guide, you will need an IAM user account with permissions that can create and populate a Cloud Storage bucket, such as those in the predefined Storage Admin (`roles/storage.admin`) or the Storage Legacy Bucket Owner (`roles/storage.legacyBucketOwner`) roles.

{{% configure-gcp %}}

For additional information on setting and using Google Cloud credentials, see [Google Cloud Setup]({{< relref "/registry/packages/gcp/installation-configuration" >}}).

Next, you'll create a new Pulumi project.

# Create a New Project

Now that you have set up your environment by installing Pulumi, installing your preferred language runtime,
and configuring your Google Cloud credentials, let's create your first Pulumi program.

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language javascript %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new gcp-javascript
```

{{% /choosable %}}
{{% choosable language typescript %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new gcp-typescript
```

{{% /choosable %}}
{{% choosable language python %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new gcp-python
```

{{% /choosable %}}
{{% choosable language go %}}

```bash
# from within your $GOPATH
$ mkdir quickstart && cd quickstart
$ pulumi new gcp-go
```

{{% /choosable %}}
{{% choosable language csharp %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new gcp-csharp
```

{{% /choosable %}}

{{% choosable language java %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new gcp-java
```

{{% /choosable %}}

{{% choosable language yaml %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new gcp-yaml
```

{{% /choosable %}}

The [`pulumi new`]({{< relref "/docs/reference/cli/pulumi_new" >}}) command creates a new Pulumi project with some basic scaffolding based on the cloud and language specified.

{{< cli-note >}}

After logging in, the CLI will proceed with walking you through creating a new project.

First, you will be asked for a project name and description. Hit `ENTER` to accept the default values or specify new values.

Next, you will be asked for the name of a stack. Hit `ENTER` to accept the default value of `dev`.

Finally, you will be prompted for some configuration values for the stack. For Google Cloud projects, you will be prompted for the Google Cloud region. You can accept the default value or choose another value like `us-west1`.

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

{{% choosable language java %}}
After the command completes, the project and stack will be ready.
{{% /choosable %}}

{{% choosable language yaml %}}
After the command completes, the project and stack will be ready.
{{% /choosable %}}

Next, we'll review the generated project files.

# Review the New Project

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
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
outputs:
  bucketName: ${my-bucket.url}
```

{{% /choosable %}}

Next, you'll deploy your stack, which will provision your storage bucket.

# Deploy the Stack

Let's go ahead and deploy your stack:

```bash
$ pulumi up
```

This command evaluates your program and determines the resource updates to make. First, a preview is shown that outlines the changes that will be made when you run the update:

```
Previewing update (dev):
     Type                   Name            Plan
 +   pulumi:pulumi:Stack    quickstart-dev  create
 +   └─ gcp:storage:Bucket  my-bucket       create

Resources:
    + 2 to create

Do you want to perform this update?  [Use arrows to move, enter to select, type to filter]
  yes
> no
  details
```

Once the preview has finished, you are given three options to choose from. Choosing `details` will show you a rich diff of the changes to be made. Choosing `yes` will create your new storage bucket in Google Cloud. Choosing `no` will return you to the user prompt without performing the update operation.

```
Do you want to perform this update? yes
Updating (dev):

     Type                   Name            Status
     pulumi:pulumi:Stack    quickstart-dev  created
 +   └─ gcp:storage:Bucket  my-bucket       created

Outputs:
  + bucketName: "gs://my-bucket-62f8bc7"

Resources:
    + 2 created

Duration: 3s
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

# Modify the Program

Now that your storage bucket is provisioned, let's add an object to it. First, from within your project directory, create a new `index.html` file with some content in it.

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

Now that you have your new `index.html` with some content, open your program file and modify it to add the contents of your `index.html` file to your storage bucket.

To accomplish this, you will use Pulumi's `FileAsset` class to assign the content of the file to a new  `BucketObject`.

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language javascript %}}

In `index.js`, create the `BucketObject` right after creating the bucket itself.

```javascript
const bucketObject = new gcp.storage.BucketObject("index.html", {
    bucket: bucket.name,
    source: new pulumi.asset.FileAsset("index.html")
});
```

{{% /choosable %}}

{{% choosable language typescript %}}

In `index.ts`, create the `BucketObject` right after creating the bucket itself.

```typescript
const bucketObject = new gcp.storage.BucketObject("index.html", {
    bucket: bucket.name,
    source: new pulumi.asset.FileAsset("index.html")
});
```

{{% /choosable %}}

{{% choosable language python %}}

In `__main__.py`, create a new bucket object by adding the following right after creating the bucket itself:

```python
bucketObject = storage.BucketObject(
    'index.html',
    bucket=bucket.name,
    source=pulumi.FileAsset('index.html')
)
```

{{% /choosable %}}

{{% choosable language go %}}

In `main.go`, create the `BucketObject` right after creating the bucket itself.

```go
bucketObject, err := storage.NewBucketObject(ctx, "index.html", &storage.BucketObjectArgs{
    Bucket: bucket.Name,
    Source: pulumi.NewFileAsset("index.html"),
})
bucketEndpoint := pulumi.Sprintf("http://storage.googleapis.com/%s/%s", bucket.Name, bucketObject.Name)
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
    Bucket = bucket.Name,
    Source = new FileAsset("index.html")
});
```

{{% /choosable %}}

{{% choosable language java %}}

In {{< langfile >}}, import the `FileAsset`, `BucketObject`, and `BucketObjectArgs` classes, then create the `BucketObject` right after creating the bucket itself.

```java
// ...
import com.pulumi.asset.FileAsset;
import com.pulumi.gcp.storage.BucketObject;
import com.pulumi.gcp.storage.BucketObjectArgs;

public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            // var bucket = ...

            // Create a Bucket object
            var bucketObject = new BucketObject("index.html", BucketObjectArgs.builder()
                .bucket(bucket.name())
                .source(new FileAsset("index.html"))
                .build()
            );

            // ctx.export(...
        });
    }
}
```

{{% /choosable %}}

{{% choosable language yaml %}}

In {{< langfile >}}, create the `BucketObject` right below the bucket itself.

```yaml
resources:
  # ...
  index-object:
    type: gcp:storage:BucketObject
    properties:
      bucket: ${my-bucket}
      source:
        Fn::FileAsset: ./index.html
```

{{% /choosable %}}

Notice how you provide the bucket you created earlier as an input to your new `BucketObject`. This is so Pulumi knows what storage bucket the object should live in.

Next, you'll deploy your changes.

# Deploy the Changes

Now let's deploy your changes.

```bash
$ pulumi up
```

Pulumi will run the `preview` step of the update, which computes the minimally disruptive change to achieve the desired state described by the program.

```
Previewing update (dev):

     Type                         Name                   Plan
     pulumi:pulumi:Stack          quickstart-dev
 +   └─ gcp:storage:BucketObject  index.html             create


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

     Type                         Name                   Status
     pulumi:pulumi:Stack          quickstart-dev
 +   └─ gcp:storage:BucketObject  index.html             created


Outputs:
    bucketName: "gs://my-bucket-11a9046"

Resources:
    + 1 created
    2 unchanged

Duration: 3s
```

Once the update has completed, you can verify the object was created in your bucket by checking the Google Cloud Console or by running the following `gsutil` command:

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" >}}

{{% choosable language javascript %}}

```bash
$ gsutil ls $(pulumi stack output bucketName)
```

{{% /choosable %}}

{{% choosable language typescript %}}

```bash
$ gsutil ls $(pulumi stack output bucketName)
```

{{% /choosable %}}

{{% choosable language python %}}

```bash
$ gsutil ls $(pulumi stack output bucket_name)
```

{{% /choosable %}}

{{% choosable language go %}}

```bash
$ gsutil ls $(pulumi stack output bucketName)
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
$ gsutil ls $(pulumi stack output BucketName)
```

{{% /choosable %}}

{{% choosable language java %}}

```bash
$ gsutil ls $(pulumi stack output bucketName)
```

{{% /choosable %}}

{{% choosable language yaml %}}

```bash
$ gsutil ls $(pulumi stack output bucketName)
```

{{% /choosable %}}

{{< /chooser >}}

Notice that your `index.html` file has been added to the bucket:

```bash
gs://my-bucket-11a9046/index.html-77a5d80
```

{{% choosable language javascript %}}

Now that `index.html` is in your bucket, modify the program file to have the bucket serve `index.html` as a static website.

First, set the `website` property on your bucket. And, to align with Google Cloud Storage recommendations, set uniform bucket-level access on the bucket to `true`.

```javascript
const bucket = new gcp.storage.Bucket("my-bucket", {
    website: {
        mainPageSuffix: "index.html"
    },
    uniformBucketLevelAccess: true
});
```

Next, allow the contents of your bucket to be viewed anonymously over the Internet.

```javascript
const bucketIAMBinding = new gcp.storage.BucketIAMBinding("my-bucket-IAMBinding", {
    bucket: bucket.name,
    role: "roles/storage.objectViewer",
    members: ["allUsers"]
});
```

Also, change the content type of your `index.html` object so that it is served as HTML.

```javascript
const bucketObject = new gcp.storage.BucketObject("index.html", {
    bucket: bucket.name,
    contentType: "text/html",
    source: new pulumi.asset.FileAsset("index.html")
});
```

Finally, at the end of the program file, export the resulting bucket’s endpoint URL so you can easily access it:

```javascript
exports.bucketEndpoint = pulumi.concat("http://storage.googleapis.com/", bucket.name, "/", bucketObject.name);
```

{{% /choosable %}}

{{% choosable language typescript %}}

Now that `index.html` is in your bucket, modify the program file to have the bucket serve `index.html` as a static website.

First, set the `website` property on your bucket. And, to align with Google Cloud Storage recommendations, set uniform bucket-level access on the bucket to `true`.

```typescript
const bucket = new gcp.storage.Bucket("my-bucket", {
    website: {
        mainPageSuffix: "index.html"
    },
    uniformBucketLevelAccess: true
});
```

Next, allow the contents of your bucket to be viewed anonymously over the Internet.

```typescript
const bucketIAMBinding = new gcp.storage.BucketIAMBinding("my-bucket-IAMBinding", {
    bucket: bucket.name,
    role: "roles/storage.objectViewer",
    members: ["allUsers"]
});
```

Also, change the content type of your `index.html` object so that it is served as HTML.

```typescript
const bucketObject = new gcp.storage.BucketObject("index.html", {
    bucket: bucket.name,
    contentType: "text/html",
    source: new pulumi.asset.FileAsset("index.html")
});
```

Finally, at the end of the program file, export the resulting bucket’s endpoint URL so you can easily access it:

```typescript
export const bucketEndpoint = pulumi.concat("http://storage.googleapis.com/", bucket.name, "/", bucketObject.name);
```

{{% /choosable %}}

{{% choosable language python %}}

Now that `index.html` is in your bucket, modify the program file to have the bucket serve `index.html` as a static website.

First, set the `website` property on your bucket. And, to align with Google Cloud Storage recommendations, set uniform bucket-level access on the bucket to `True`.

```python
bucket = storage.Bucket('my-bucket',
    website=storage.BucketWebsiteArgs(
        main_page_suffix='index.html'),
    uniform_bucket_level_access=True,
)
```

Next, allow the contents of your bucket to be viewed anonymously over the Internet.

```python
bucketIAMBinding = storage.BucketIAMBinding('my-bucket-IAMBinding',
    bucket=bucket,
    role="roles/storage.objectViewer",
    members=["allUsers"]
)
```

Also, change the content type of your `index.html` object so that it is served as HTML.

```python
bucketObject = storage.BucketObject(
    'index.html',
    bucket=bucket,
    content_type='text/html',
    source=pulumi.FileAsset('index.html')
)
```

Finally, at the end of the program file, export the resulting bucket’s endpoint URL so you can easily access it:

```python
pulumi.export('bucket_endpoint', pulumi.Output.concat('http://storage.googleapis.com/', bucket.id, "/", bucketObject.name))
```

{{% /choosable %}}

{{% choosable language go %}}
Now that `index.html` is in your bucket, modify the program file to have the bucket serve `index.html` as a static website.

First, set the `website` property on your bucket. And, to align with Google Cloud Storage recommendations, set uniform bucket-level access on the bucket to `true`.

```go
bucket, err := storage.NewBucket(ctx, "my-bucket", &storage.BucketArgs{
    Website: storage.BucketWebsiteArgs{
        MainPageSuffix: pulumi.String("index.html"),
    },
    UniformBucketLevelAccess: pulumi.Bool(true),
})
if err != nil {
    return err
}
```

Next, allow the contents of your bucket to be viewed anonymously over the Internet.

```go
_, err = storage.NewBucketIAMBinding(ctx, "my-bucket-IAMBinding", &storage.BucketIAMBindingArgs{
    Bucket: bucket.Name,
    Role:   pulumi.String("roles/storage.objectViewer"),
    Members: pulumi.StringArray{
        pulumi.String("allUsers"),
    },
})
if err != nil {
    return err
}
```

Also, change the content type of your `index.html` object so that it is served as HTML.

```go
bucketObject, err := storage.NewBucketObject(ctx, "index.html", &storage.BucketObjectArgs{
    Bucket:      bucket.Name,
    ContentType: pulumi.String("text/html"),
    Source:      pulumi.NewFileAsset("index.html"),
})
bucketEndpoint := pulumi.Sprintf("http://storage.googleapis.com/%s/%s", bucket.Name, bucketObject.Name)
if err != nil {
    return err
}
```

Finally, at the end of the program file, export the resulting bucket’s endpoint URL so you can easily access it:

```go
ctx.Export("bucketEndpoint", bucketEndpoint)
```

{{% /choosable %}}

{{% choosable language csharp %}}

Now that `index.html` is in your bucket, modify the program file to have the bucket serve `index.html` as a static website.

First, set the `website` property on your bucket. And, to align with Google Cloud Storage recommendations, set uniform bucket-level access on the bucket to `true`.

```csharp
// Add this import
using Pulumi.Gcp.Storage.Inputs;
```

```csharp
var bucket = new Bucket("my-bucket", new BucketArgs
{
    Website = new BucketWebsiteArgs
    {
        MainPageSuffix = "index.html"
    },
    UniformBucketLevelAccess = true
});
```

Next, allow the contents of your bucket to be viewed anonymously over the Internet.

```csharp
var bucketIAMBinding = new BucketIAMBinding("my-bucket-IAMBinding", new BucketIAMBindingArgs
{
    Bucket = bucket.Name,
    Role = "roles/storage.objectViewer",
    Members = "allUsers"
});
```

Also, change the content type of your `index.html` object so that it is served as HTML.

```csharp
var bucketObject = new BucketObject("index.html", new BucketObjectArgs
{
    Bucket = bucket.Name,
    ContentType = "text/html",
    Source = new FileAsset("index.html")
});
```

Finally, at the end of the program file, export the resulting bucket’s endpoint URL so you can easily access it:

```csharp
this.BucketEndpoint = Output.Format($"http://storage.googleapis.com/{bucket.Name}/{bucketObject.Name}");
```

```csharp
[Output]
public Output<string> BucketEndpoint { get; set; }
```

{{% /choosable %}}

{{% choosable language java %}}

Now that your `index.html` is in your bucket, modify the program to have the bucket serve `index.html` as a static website.

First, add the `BucketArgs`,  `BucketWebsiteArgs`, `BucketIAMBinding`, and `BucketIAMBindingArgs` classes to the list of imports.

```java
// ...
import com.pulumi.gcp.storage.BucketArgs;
import com.pulumi.gcp.storage.inputs.BucketWebsiteArgs;
import com.pulumi.gcp.storage.BucketIAMBinding;
import com.pulumi.gcp.storage.BucketIAMBindingArgs;
```

Next, set the `website` property on your bucket. And, to align with Google Cloud Storage recommendations, set uniform bucket-level access on the bucket to `true`:

```java
// ...
public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            // Create an AWS resource (S3 Bucket)
            var bucket = new Bucket("my-bucket",
                    BucketArgs.builder()
                            .location("US")
                            .website(BucketWebsiteArgs.builder()
                                    .mainPageSuffix("index.html")
                                    .build())
                            .uniformBucketLevelAccess(true)
                            .build());
            //...
```

Next, allow the contents of your bucket to be viewed anonymously over the Internet.

```java
// ...
public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            // var bucket = ...
            var binding = new BucketIAMBinding("my-bucket-IAMBinding",
                    BucketIAMBindingArgs.builder()
                            .bucket(bucket.name())
                            .role("roles/storage.objectViewer")
                            .members("allUsers")
                            .build());
            // Create an S3 Bucket object ...
```

Also, change the content type of your index.html object so that it is served as HTML.

```java
// ...
public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            // var bucket = ...
            // var binding = ...
            // Create an S3 Bucket object
            var bucketObject = new BucketObject("index.html", BucketObjectArgs.builder()
                    .bucket(bucket.name())
                    .contentType("text/html")
                    .source(new FileAsset("index.html"))
                    .build());
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
            ctx.export("bucketEndpoint", Output.format("http://storage.googleapis.com/%s/%s", bucket.name(), bucketObject.name()));
        });
```

{{% /choosable %}}

{{% choosable language yaml %}}

Now that your `index.html` is in your bucket, modify the program to have the bucket serve `index.html` as a static website. To do that, set the bucket's `website` property, passing the filename to use as an `mainPageSuffix`. And, to align with Google Cloud Storage recommendations, set uniform bucket-level access on the bucket to `true`.

```yaml
resources:
  my-bucket:
    type: gcp:storage:Bucket
    properties:
      website:
        mainPageSuffix: index.html
      location: US
      uniformBucketLevelAccess: true
```

Next, allow the contents of your bucket to be viewed anonymously over the Internet.

```yaml
resources:
  # ...
  my-bucket-binding:
    type: gcp:storage:BucketIAMBinding
    properties:
      bucket: ${my-bucket.name}
      role: "roles/storage.objectViewer"
      members: ["allUsers"]
```

Also, change the content type of your `index.html` object so that it is served as HTML.

```yaml
resources:
  # ...
  index-object:
    type: gcp:storage:BucketObject
    properties:
      bucket: ${my-bucket}
      contentType: "text/html"
      source:
        Fn::FileAsset: ./index.html
```

Finally, at the end of the file, export the resulting bucket’s endpoint URL so you can access it easily:

```yaml
# ...
outputs:
  bucketName: ${my-bucket.url}
  bucketEndpoint: http://storage.googleapis.com/${my-bucket.name}/${index-object.name}
  ```

{{% /choosable %}}

Now update your stack to have your storage bucket serve your `index.html` file as a static website.

```bash
$ pulumi up
```

First, you will see a preview of your changes:

```
Previewing update (dev):

     Type                    Name            Plan       Info
     pulumi:pulumi:Stack              quickstart-dev
 ~   ├─ gcp:storage:Bucket            my-bucket              update     [diff: +website]
 +   └─ gcp:storage:BucketIAMBinding  my-bucket-IAMBinding   create
 +-  └─ gcp:storage:BucketObject      index.html             replace    [diff: ~contentType]

Outputs:
  + BucketEndpoint: "http://storage.googleapis.com/my-bucket-0167228/index.html-50b2ce9"

Resources:
    + 1 to create
    ~ 1 to update
    +-1 to replace
    3 changes. 1 unchanged

Do you want to perform this update?
> yes
  no
  details
```

Select `yes` to deploy the changes:

```
Do you want to perform this update? yes
Updating (dev):

     Type                     Name            Status      Info
    pulumi:pulumi:Stack              quickstart-dev
 ~   ├─ gcp:storage:Bucket            my-bucket              updated     [diff: +website]
 +   └─ gcp:storage:BucketIAMBinding  my-bucket-IAMBinding   created
 +-  └─ gcp:storage:BucketObject      index.html             replaced    [diff: ~contentType];
Outputs:
  + BucketEndpoint: "http://storage.googleapis.com/my-bucket-0167228/index.html-50b2ce9"
    BucketName    : "gs://my-bucket-0167228"

Resources:
    + 1 created
    ~ 1 updated
    +-1 replaced
    3 changes. 1 unchanged

Duration: 8s
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

# Destroy the Stack

Now that you've seen how to deploy changes to our program, let's clean up and tear down the resources that are part of your stack.

To destroy resources, run the following:

```bash
$ pulumi destroy
```

You'll be prompted to make sure you really want to delete these resources. This can take a minute or two; Pulumi waits until all resources are shut down and deleted before it considers the destroy operation complete.

```
Previewing destroy (dev):

 -   pulumi:pulumi:Stack              quickstart-dev         delete
 -   ├─ gcp:storage:BucketIAMBinding  my-bucket-IAMBinding   delete
 -   ├─ gcp:storage:BucketObject      index.html             delete
 -   └─ gcp:storage:Bucket            my-bucket              delete

Outputs:
  - BucketEndpoint: "http://storage.googleapis.com/my-bucket-0167228/index.html-50b2ce9"
  - BucketName    : "gs://my-bucket-0167228"

Resources:
    - 4 to delete

Do you want to perform this destroy? yes
Destroying (dev):

 -   pulumi:pulumi:Stack              quickstart-dev         deleted
 -   ├─ gcp:storage:BucketIAMBinding  my-bucket-IAMBinding   deleted
 -   ├─ gcp:storage:BucketObject      index.html             deleted
 -   └─ gcp:storage:Bucket            my-bucket              deleted

Outputs:
  - BucketEndpoint: "http://storage.googleapis.com/my-bucket-0167228/index.html-50b2ce9"
  - BucketName    : "gs://my-bucket-0167228"

Resources:
    - 4 deleted

Duration: 7s
```

> To delete the stack itself, run [`pulumi stack rm`]({{< relref "/docs/reference/cli/pulumi_stack_rm" >}}).
Note that this removes the stack entirely from the Pulumi Service, along with all of its update history.

Congratulations! You've successfully provisioned some cloud resources using Pulumi. By completing this guide you have successfully:

- Created a Pulumi new project.
- Provisioned a new storage bucket.
- Added an `index.html` file to your bucket.
- Served the `index.html` as a static website.
- Destroyed the resources you've provisioned.

On the next page, we have a collection of examples and tutorials that you can deploy as they are or use them as a foundation for your own applications and infrastructure projects.

# Next Steps

Congrats! You've deployed your first project on Google Cloud with Pulumi. Here are some next steps, depending on your learning style.

## Learn Pulumi

Dive into Learn Pulumi for a comprehensive walkthrough of key Pulumi concepts in the context of a real-life application.

{{< get-started-next-step path="/learn/pulumi-fundamentals" label="Learn Pulumi Fundamentals" ref="gs-gcp-learn" >}}

## How-to Guides

Explore our how-to guides if you're looking for examples of specific architectures or application stacks. These guides are available in all Pulumi languages and cover many common architectures such as [GKE clusters]({{< relref "/registry/packages/gcp/how-to-guides/gcp-ts-gke-hello-world" >}}), [Cloud Run containers]({{< relref "/registry/packages/gcp/how-to-guides/gcp-ts-cloudrun" >}}), and [Cloud Function HTTP endpoints]({{< relref "/registry/packages/gcp/how-to-guides/gcp-ts-functions" >}}).

{{< get-started-next-step path="/registry/packages/gcp/how-to-guides" label="Explore How-to Guides" ref="gs-gcp-guides" >}}

## How Pulumi Works

Learn how Pulumi works from its architecture to key concepts, including [stacks]({{< relref "/docs/intro/concepts/stack" >}}), [state]({{< relref "/docs/intro/concepts/state" >}}), [configuration]({{< relref "/docs/intro/concepts/config" >}}), and [secrets]({{< relref "/docs/intro/concepts/secrets" >}}).

{{< get-started-next-step path="/docs/intro/concepts" label="Read Documentation" ref="gs-gcp-docs" >}}

## Blog Posts

Read through the latest blog posts about using Pulumi with Google Cloud, including everything from new Google Cloud features and products supported by Pulumi to technical architectures and best practices.

{{< get-started-next-step path="/blog/tag/google-cloud" label="Read the Pulumi Blog" ref="gs-gcp-blog" >}}
