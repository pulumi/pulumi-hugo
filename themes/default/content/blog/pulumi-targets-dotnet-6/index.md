---
title: "Pulumi now targets .NET 6"
authors: ["zaid-ajaj"]
tags: ["dotnet", "csharp", "fsharp", "vb.net"]
meta_desc: "Introducing a static-code analyzer for C# which provides instant feedback on common mistakes defining Pulumi resources"
# meta_image: enhanced-static-code-analysis.png
date: "2022-07-20"
---

In this blog post, we will talk about how Pulumi is now using [.NET 6](https://docs.microsoft.com/en-us/dotnet/core/whats-new/dotnet-6) as our default across the ecosystem. We will discuss the changes applied to templates, program structure and code generation. We also explain how Pulumi C# projects can benefit from latest features in .NET 6 and how it simplifies your programs overall. Let's dive in, shall we?

<!--more-->

### Templates

All of our .NET templates have been updated which now use `net6.0` as the target framework. This means that projects created with `pulumi new` require at least the [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) to build and run the projects. The templates also simplified the program structure quite a bit and not longer use `MyStack` classes to define resources in case of C# and VB.NET templates. F# templates didn't change that much since these didn't use the class approach to define infrastructure. 

### Simplified program structure

Let us examine a new C# template. Create a new project using `pulumi new aws-csharp` in a new directory and notice that there is no longer a `MyStack.cs` file, only `Program.cs`. Open the latter in an editor and you should see the following:

```cs
using Pulumi;
using Pulumi.Aws.S3;
using System.Collections.Generic;

await Deployment.RunAsync(() =>
{
   // Create an AWS resource (S3 Bucket)
   var bucket = new Bucket("my-bucket");
   
   // Export the name of the bucket
   return new Dictionary<string, object?>
   {
      ["bucketName"] = bucket.Id
   };
});
```

This is how a stack looks like now with resource definitions and outputs. The [Get Started guide](https://www.pulumi.com/docs/get-started/) has been updated to follow this pattern as well.

Targeting .NET 6 means that we can use features from C# 10 and here we see them in action: using [top-level statements](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/tutorials/top-level-statements) that greatly simplify the entry point of the project and reduce it down to a single function call to `Deployment.RunAsync`. Inside this function is where we define our resources and return outputs for the stack. Top-level statements also allow us to `await` asynchronous functions without having an explicit `Main(string[] args)` function or a `Program` class.

The equivalent of the snippet above would have been this piece of code:

```cs
class MyStack : Stack
{
   public MyStack()
   {
      // Create an AWS resource (S3 Bucket)
      var bucket = new Bucket("my-bucket");
      // Export the name of the bucket
      this.BucketName = bucket.Id;
   }

   [Output("bucketName")]
   public Output<string> BucketName { get; internal set; }
}

class Program
{
   public static Task<int> Main(string[] args) => Deployment.RunAsync<MyStack>();
}
```

Which is a lot more verbose and contains unnecessary ceremony. 

Notice how you no longer have to define the types of your stack outsputs upfront. Instead, you simply return a dictionary of key-valued outputs. In fact, the function `Deployment.RunAsync` is very flexible. When you don't want to return outputs, simply don't:

```cs
await Deployment.RunAsync(() =>
{
   var bucket = new Bucket("my-bucket");
});
```

Moreover, when you want to `await` asynchronous functions alongside your resource definitions, just mark the lambda as `async`:

```cs
await Deployment.RunAsync(async () =>
{
    // create resources
    var bucket = new Bucket("my-bucket");
    // perform async tasks
    await Task.Delay(1000);
    // do more work...    
});
```

### Backward-compatibility

It is worth mentioning that although the new templates and the accompanying getting-started guides are updating to .NET 6, the main `Pulumi` SDK NuGet  package and cloud provider packages are still targeting `netcoreapp3.1`. This mean that if users are still using .NET SDK 3.1 to build and run your projects, everything will continue to work as always.

### Code generation

Pulumi provides tools to translate from several IaC languages and generates Pulumi programs in any of our supported languages. This includes:
 - Translating [Azure Resource Manager (ARM)](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) templates using [arm2pulumi](https://www.pulumi.com/arm2pulumi/)
 - Translating Terrafrom code using [tf2pulumi](https://www.pulumi.com/tf2pulumi/)
 - Translating Kubernetes YAML using [kube2pulumi](https://www.pulumi.com/kube2pulumi/)
 - Translating [Pulumi YAML](https://www.pulumi.com/docs/intro/languages/yaml/) with the Pulumi CLI using `pulumi convert`

All of these tools take their input language, convert it into the Pulumi intermediate language, then translate it into one of our supported languages. In case of C#, the code generation has been updated to generate code that uses latest features from .NET 6. It also fixed isuse as well as fix small issues that were present in the logic.

Let us take an example from Pulumi YAML and convert it to C#.

Generate a new Pulumi YAML project using `pulumi new azure-yaml`, it should give you this YAML program:

```yaml
name: azure-yaml
runtime: yaml
description: A minimal Azure Native Pulumi YAML program

resources:
  # Create an Azure Resource Group
  resourceGroup:
    type: azure-native:resources:ResourceGroup
  # Create an Azure resource (Storage Account)
  storageAccount:
    type: azure-native:storage:StorageAccount
    properties:
      resourceGroupName: ${resourceGroup.name}
      sku:
        name: Standard_LRS
      kind: StorageV2

variables:
  storageAccountKeys:
    Fn::Invoke:
      Function: azure-native:storage:listStorageAccountKeys
      Arguments:
        resourceGroupName: ${resourceGroup.name}
        accountName: ${storageAccount.name}

outputs:
  # Export the primary key of the Storage Account
  primaryStorageKey: ${storageAccountKeys.keys[0].value}
```

Now you can take this program and convert it to C# using

```
pulumi convert --language csharp --out csharp-from-yaml
```

This command generates a full C# project from the YAML program into the directory `./csharp-from-yaml`, then it restores the dependencies and builds the project. Now if you examine `Program.cs`, it contains the converted program and follows the succinct C# 10 syntax that targets .NET 6:

```csharp
using System.Collections.Generic;
using Pulumi;
using AzureNative = Pulumi.AzureNative;

await Deployment.RunAsync(() => 
{
    var resourceGroup = new AzureNative.Resources.ResourceGroup("resourceGroup");

    var storageAccount = new AzureNative.Storage.StorageAccount("storageAccount", new()
    {
        ResourceGroupName = resourceGroup.Name,
        Sku = new AzureNative.Storage.Inputs.SkuArgs
        {
            Name = "Standard_LRS",
        },
        Kind = "StorageV2",
    });

    var storageAccountKeys = AzureNative.Storage.ListStorageAccountKeys.Invoke(new()
    {
        ResourceGroupName = resourceGroup.Name,
        AccountName = storageAccount.Name,
    });

    return new Dictionary<string, object?>
    {
        ["primaryStorageKey"] = storageAccountKeys.Apply(listStorageAccountKeysResult => listStorageAccountKeysResult.Keys[0]?.Value),
    };
});
```
