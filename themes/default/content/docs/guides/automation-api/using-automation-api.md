---
title: Start Using Automation API
meta_desc: This page contains a getting started guide for Automation API.
weight: 1

menu:
  userguides:
    parent: automation-api
---

Pulumi’s Automation API enables you to provision your infrastructure programmatically using the Pulumi engine by exposing Pulumi programs and stacks as strongly-typed and composable building blocks.

In this guide, you will deploy an inline Pulumi program to create a static website using Automation API.

## Prerequisites

### Install Pulumi

{{< install-pulumi />}}

Install the required language runtime, if you have not already.

### Install Language Runtime

#### Choose Your Language

{{< chooser language "javascript,typescript,python,go,csharp" / >}}

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

### Obtain a Pulumi Access Token

You'll need a Pulumi access token so that your programs can store the resulting state in the Pulumi Service. The easiest way to obtain such a token is to run `pulumi login` from the command line.

### Author Your Program

{{% choosable language "javascript,typescript" %}}

Let's walk through the [`inlineProgram-ts` example](https://github.com/pulumi/automation-api-examples/tree/main/nodejs/inlineProgram-ts) in order to understand how to construct a simple Automation API program.

{{% /choosable %}}

{{% choosable language python %}}

Let's walk through the [`inline_program` example](https://github.com/pulumi/automation-api-examples/tree/main/python/inline_program) in order to understand how to construct a simple Automation API program.

{{% /choosable %}}

{{% choosable language go %}}

Let's walk through the [`inline_program` example](https://github.com/pulumi/automation-api-examples/tree/main/go/inline_program) in order to understand how to construct a simple Automation API program.

{{% /choosable %}}

{{% choosable language "csharp,fsharp,visualbasic" %}}

Let's walk through the [`InlineProgram` example](https://github.com/pulumi/automation-api-examples/tree/main/dotnet/InlineProgram) in order to understand how to construct a simple Automation API program.

{{% /choosable %}}
 
First, we'll define the Pulumi program we want to run as a function within our overall program. Note how it looks like a standard Pulumi program.

{{% choosable language "javascript,typescript" %}}

```typescript
const pulumiProgram = async () => {
    // Create a bucket and expose a website index document
    const siteBucket = new s3.Bucket("s3-website-bucket", {
        website: {
            indexDocument: "index.html",
        },
    });

    const indexContent = `<html><head>
<title>Hello S3</title><meta charset="UTF-8">
</head>
<body><p>Hello, world!</p><p>Made with ❤️ with <a href="https://pulumi.com">Pulumi</a></p>
</body></html>
`

    // write our index.html into the site bucket
    let object = new s3.BucketObject("index", {
        bucket: siteBucket,
        content: indexContent,
        contentType: "text/html; charset=utf-8",
        key: "index.html"
    });

    // Create an S3 Bucket Policy to allow public read of all objects in bucket
    function publicReadPolicyForBucket(bucketName): PolicyDocument {
        return {
            Version: "2012-10-17",
            Statement: [{
                Effect: "Allow",
                Principal: "*",
                Action: [
                    "s3:GetObject"
                ],
                Resource: [
                    `arn:aws:s3:::${bucketName}/*` // policy refers to bucket name explicitly
                ]
            }]
        };
    }

    // Set the access policy for the bucket so all objects are readable
    let bucketPolicy = new s3.BucketPolicy("bucketPolicy", {
        bucket: siteBucket.bucket, // refer to the bucket created earlier
        policy: siteBucket.bucket.apply(publicReadPolicyForBucket) // use output property `siteBucket.bucket`
    });

    return {
        websiteUrl: siteBucket.websiteEndpoint,
    };
};
```

{{% /choosable %}}

{{% choosable language python %}}

```python
def pulumi_program():
    # Create a bucket and expose a website index document
    site_bucket = s3.Bucket("s3-website-bucket", website=s3.BucketWebsiteArgs(index_document="index.html"))
    index_content = """
    <html>
        <head><title>Hello S3</title><meta charset="UTF-8"></head>
        <body>
            <p>Hello, world!</p>
            <p>Made with ❤️ with <a href="https://pulumi.com">Pulumi</a></p>
        </body>
    </html>
    """

    # Write our index.html into the site bucket
    s3.BucketObject("index",
                    bucket=site_bucket.id,  # reference to the s3.Bucket object
                    content=index_content,
                    key="index.html",  # set the key of the object
                    content_type="text/html; charset=utf-8")  # set the MIME type of the file

    # Set the access policy for the bucket so all objects are readable
    s3.BucketPolicy("bucket-policy", bucket=site_bucket.id, policy={
        "Version": "2012-10-17",
        "Statement": {
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject"],
            # Policy refers to bucket explicitly
            "Resource": [pulumi.Output.concat("arn:aws:s3:::", site_bucket.id, "/*")]
        },
    })

    # Export the website URL
    pulumi.export("website_url", site_bucket.website_endpoint)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
deployFunc := func(ctx *pulumi.Context) error {
  // similar go git_repo_program, our program defines a s3 website.
  // here we create the bucket
  siteBucket, err := s3.NewBucket(ctx, "s3-website-bucket", &s3.BucketArgs{
    Website: s3.BucketWebsiteArgs{
      IndexDocument: pulumi.String("index.html"),
    },
  })
  if err != nil {
    return err
  }

  // we define and upload our HTML inline.
  indexContent := `<html><head>
  <title>Hello S3</title><meta charset="UTF-8">
</head>
<body><p>Hello, world!</p><p>Made with ❤️ with <a href="https://pulumi.com">Pulumi</a></p>
</body></html>
`
  // upload our index.html
  if _, err := s3.NewBucketObject(ctx, "index", &s3.BucketObjectArgs{
    Bucket:      siteBucket.ID(), // reference to the s3.Bucket object
    Content:     pulumi.String(indexContent),
    Key:         pulumi.String("index.html"),               // set the key of the object
    ContentType: pulumi.String("text/html; charset=utf-8"), // set the MIME type of the file
  }); err != nil {
    return err
  }

  // Set the access policy for the bucket so all objects are readable.
  if _, err := s3.NewBucketPolicy(ctx, "bucketPolicy", &s3.BucketPolicyArgs{
    Bucket: siteBucket.ID(), // refer to the bucket created earlier
    Policy: pulumi.Any(map[string]interface{}{
      "Version": "2012-10-17",
      "Statement": []map[string]interface{}{
        {
          "Effect":    "Allow",
          "Principal": "*",
          "Action": []interface{}{
            "s3:GetObject",
          },
          "Resource": []interface{}{
            pulumi.Sprintf("arn:aws:s3:::%s/*", siteBucket.ID()), // policy refers to bucket name explicitly
          },
        },
      },
    }),
  }); err != nil {
    return err
  }

  // export the website URL
  ctx.Export("websiteUrl", siteBucket.WebsiteEndpoint)
  return nil
}
```

{{% /choosable %}}

{{% choosable language "csharp,fsharp,visualbasic" %}}

```csharp
var program = PulumiFn.Create(() =>
{
    // create a bucket and expose a website index document
    var siteBucket = new Pulumi.Aws.S3.Bucket(
        "s3-website-bucket",
        new Pulumi.Aws.S3.BucketArgs
        {
            Website = new Pulumi.Aws.S3.Inputs.BucketWebsiteArgs
            {
                IndexDocument = "index.html",
            },
        });

                const string indexContent = @"
<html>
    <head><titl>Hello S3</title><meta charset=""UTF-8""></head>
    <body>
        <p>Hello, world!</p>
        <p>Made with ❤️ with <a href=""https://pulumi.com"">Pulumi</a></p>
    </body>
</html>
";

    // write our index.html into the site bucket
    var @object = new Pulumi.Aws.S3.BucketObject(
        "index",
        new Pulumi.Aws.S3.BucketObjectArgs
        {
            Bucket = siteBucket.BucketName, // reference to the s3 bucket object
            Content = indexContent,
            Key = "index.html", // set the key of the object
            ContentType = "text/html; charset=utf-8", // set the MIME type of the file
        });

    var bucketPolicyDocument = siteBucket.Arn.Apply(bucketArn =>
    {
        return Output.Create(Pulumi.Aws.Iam.GetPolicyDocument.InvokeAsync(
            new Pulumi.Aws.Iam.GetPolicyDocumentArgs
            {
                Statements = new List<Pulumi.Aws.Iam.Inputs.GetPolicyDocumentStatementArgs>
                {
                    new Pulumi.Aws.Iam.Inputs.GetPolicyDocumentStatementArgs
                    {
                        Effect = "Allow",
                        Principals = new List<Pulumi.Aws.Iam.Inputs.GetPolicyDocumentStatementPrincipalArgs>
                        {
                            new Pulumi.Aws.Iam.Inputs.GetPolicyDocumentStatementPrincipalArgs
                            {
                                Identifiers = new List<string> { "*" },
                                Type = "AWS",
                            },
                        },
                        Actions = new List<string> { "s3:GetObject" },
                        Resources = new List<string> { $"{bucketArn}/*" },
                    },
                },
            }));
    });

    // set the access policy for the bucket so all objects are readable
    new Pulumi.Aws.S3.BucketPolicy(
        "bucket-policy",
        new Pulumi.Aws.S3.BucketPolicyArgs
        {
            Bucket = siteBucket.BucketName,
            Policy = bucketPolicyDocument.Apply(x => x.Json),
        });

    // export the website url
    return new Dictionary<string, object?>
    {
        ["website_url"] = siteBucket.WebsiteEndpoint,
    };
});
```

{{% /choosable %}}

As with executing Pulumi programs via the CLI, we need to associate our program with a `Stack`. Automation API provides methods to create or select stacks.
We'll use a convenience method to select an existing `Stack` or create one if none exists.

{{% choosable language "javascript,typescript" %}}

```typescript
const args: InlineProgramArgs = {
    stackName: "dev",
    projectName: "inlineNode",
    program: pulumiProgram
};

const stack = await LocalWorkspace.createOrSelectStack(args);
```

{{% /choosable %}}

{{% choosable language python %}}

```python
project_name = "inline_s3_project"
stack_name = "dev"

stack = auto.create_or_select_stack(stack_name=stack_name,
                                    project_name=project_name,
                                    program=pulumi_program)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
projectName := "inlineS3Project"
stackName := "dev"
s, err := auto.UpsertStackInlineSource(ctx, stackName, projectName, deployFunc)
```

{{% /choosable %}}

{{% choosable language "csharp,fsharp,visualbasic" %}}

```csharp
var projectName = "inline_s3_project";
var stackName = "dev";

var stackArgs = new InlineProgramArgs(projectName, stackName, program);
var stack = await LocalWorkspace.CreateOrSelectStackAsync(stackArgs);
```

{{% /choosable %}}

A `Stack` operates within the context of a `Workspace`. A `Workspace` is the execution context containing a single Pulumi project, a program, and multiple stacks. Workspaces are used to manage the execution environment, providing various utilities such as plugin installation, environment configuration (`$PULUMI_HOME`), and creation, deletion, and listing of stacks. Let's install the AWS provider plugin within our `Workspace` so that our Pulumi program has it available during execution.

The AWS plugin also needs configuration. We can provide that configuration just as we do with other Pulumi programs: either via config or environment variables. We'll use the `Stack` object to set the AWS region for the provider plugin.

{{% choosable language "javascript,typescript" %}}

```typescript
await stack.workspace.installPlugin("aws", "v3.37.0");
await stack.setConfig("aws:region", { value: "us-west-2" });
```

{{% /choosable %}}

{{% choosable language python %}}

```python
stack.workspace.install_plugin("aws", "v3.37.0")
stack.set_config("aws:region", auto.ConfigValue(value="us-west-2"))
```

{{% /choosable %}}

{{% choosable language go %}}

```go
err = w.InstallPlugin(ctx, "aws", "v3.37.0")
if err != nil {
  fmt.Printf("Failed to install program plugins: %v\n", err)
  os.Exit(1)
}

s.SetConfig(ctx, "aws:region", auto.ConfigValue{Value: "us-west-2"})
```

{{% /choosable %}}

{{% choosable language "csharp,fsharp,visualbasic" %}}

```csharp
await stack.Workspace.InstallPluginAsync("aws", "v3.37.0");
await stack.SetConfigValueAsync("aws:region", new ConfigValue("us-west-2"));
```

{{% /choosable %}}

We're now ready to execute commands against the `Stack`, including update, preview, refresh, destroy, import, and export.
If we want to update the stack, we simply invoke the update method against the `Stack` object:


{{% choosable language "javascript,typescript" %}}

```typescript
const upRes = await stack.up({ onOutput: console.info });
```

{{% /choosable %}}

{{% choosable language python %}}

```python
up_res = stack.up(on_output=print)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
res, err := s.Up(ctx, stdoutStreamer)
if err != nil {
  fmt.Printf("Failed to update stack: %v\n\n", err)
  os.Exit(1)
}
```

{{% /choosable %}}

{{% choosable language "csharp,fsharp,visualbasic" %}}

```csharp
var result = await stack.UpAsync(new UpOptions { OnStandardOutput = Console.WriteLine });
```

{{% /choosable %}}

Note how we can choose to have a callback function for standard output. In addition, the command returns a result of the update, which we can programmatically use to drive decisions within our program. For example, the result includes the stack outputs as well as a summary of the changes. For example, we could choose to take different actions if there were no resources updated. Or, we could use the stack outputs to drive another Pulumi program within the same Automation program.

By now, you've hopefully gained a clearer understanding of how to utilize the Automation API. The possibilities are endless and we look forward to your creations!
