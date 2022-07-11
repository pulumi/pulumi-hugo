---
title: Get Started with Azure
meta_desc: This page provides an overview and guide on how to get started with Azure.
linktitle: Azure
weight: 1
menu:
  getstarted:
    identifier: azure
    weight: 2

aliases: [
  "/docs/quickstart/azure/",
  "/docs/quickstart/azure/begin/",
  "/docs/quickstart/azure/install-pulumi/",
  "/docs/quickstart/azure/install-language-runtime/",
  "/docs/quickstart/azure/configure/",
  "/docs/get-started/azure/install-pulumi/",
  "/docs/get-started/azure/install-language-runtime/",
  "/docs/get-started/azure/configure/",
  "/docs/get-started/azure/begin",
  "/docs/get-started/azure/create-project",
  "/docs/get-started/azure/deploy-changes",
  "/docs/get-started/azure/deploy-stack",
  "/docs/get-started/azure/destroy-stack",
  "/docs/get-started/azure/modify-program",
  "/docs/get-started/azure/next-steps",
  "/docs/get-started/azure/review-project",
  "/docs/quickstart/azure/create-project/",
  "/docs/quickstart/azure/review-project/",
  "/docs/quickstart/azure/deploy-stack/",
  "/docs/quickstart/azure/modify-program/",
  "/docs/quickstart/azure/deploy-changes/",
  "/docs/quickstart/azure/destroy-stack/",
  "/docs/quickstart/azure/next-steps/"
]
---

{{< cloud-intro "Microsoft Azure" >}}

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

{{< chooser language "typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language "typescript" %}}
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

Finally, configure Pulumi with Microsoft Azure.

### Configure Pulumi to access your Microsoft Azure account

Pulumi requires cloud credentials to manage and provision resources. Pulumi can authenticate to Azure using a user account or service principal that has **Programmatic access** with rights to deploy and manage your Azure resources.

{{% notes type="info" %}}
Pulumi relies on the Azure SDK to authenticate requests from your computer to Azure. Your credentials are never sent to pulumi.com.
{{% /notes %}}

In this guide, you will need a user account with permissions to create and populate Blob storage containers and provide anonymous access to a Blob file.

When developing locally, we recommend that you install the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) and then authorize access with a user account.

```bash
az login
```

After successfully logging in, you are ready to go.

{{% notes type="info" %}}
The Azure CLI, and thus Pulumi, will use the default subscription for the account. You can change the active subscription with the [`az account set`](https://docs.microsoft.com/en-us/cli/azure/account?view=azure-cli-latest#az_account_set) command.
{{% /notes %}}

For additional information on authenticating with Azure, or to login with a service principal, see [Azure Setup]({{< relref "/registry/packages/azure-native/installation-configuration" >}}).

Next, you'll create a new Pulumi project.

## Create a New Project

Now that you have set up your environment by installing Pulumi, installing your preferred language runtime,
and configuring your Azure credentials, let's create your first Pulumi program.

{{< chooser language "typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language typescript %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new azure-typescript
```

{{% /choosable %}}
{{% choosable language python %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new azure-python
```

{{% /choosable %}}
{{% choosable language csharp %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new azure-csharp
```

{{% /choosable %}}
{{% choosable language go %}}

```bash
# from within your $GOPATH
$ mkdir quickstart && cd quickstart
$ pulumi new azure-go
```

{{% /choosable %}}

{{% choosable language java %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new azure-java
```

{{% /choosable %}}

{{% choosable language yaml %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new azure-yaml
```

{{% /choosable %}}

The [`pulumi new`]({{< relref "/docs/reference/cli/pulumi_new" >}}) command creates a new Pulumi project with some basic scaffolding based on the cloud and language specified.

{{< cli-note >}}

After logging in, the CLI will proceed with walking you through creating a new project.

First, you will be asked for a project name and description. Hit `ENTER` to accept the default values or specify new values.

Next, you will be asked for the name of a stack. Hit `ENTER` to accept the default value of `dev`.

For Azure projects, you will be prompted for the Azure location. You can accept the default value of `WestUS` or choose another location.

To list all available locations, use the `az account list-locations` command.

```bash
$ az account list-locations --output table
```

You can then change the region for your stack by using the `pulumi config set` command as shown below:

```bash
pulumi config set azure-native:location eastus
```

> What are [projects]({{< relref "/docs/intro/concepts/project" >}}) and [stacks]({{< relref "/docs/intro/concepts/stack" >}})? Pulumi projects and stacks let you organize Pulumi code. Consider a Pulumi _project_ to be analogous to a GitHub repo---a single place for code---and a _stack_ to be an instance of that code with a separate configuration. For instance, _Project Foo_ may have multiple stacks for different development environments (Dev, Test, or Prod), or perhaps for different cloud configurations (geographic region for example). See [Organizing Projects and Stacks]({{< relref "/docs/guides/organizing-projects-stacks" >}}) for some best practices on organizing your Pulumi projects and stacks.

{{% choosable language "typescript" %}}
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

## Review the New Project

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

{{< chooser language "typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language typescript %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";

// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("resourceGroup");

// Create an Azure resource (Storage Account)
const storageAccount = new storage.StorageAccount("sa", {
    resourceGroupName: resourceGroup.name,
    sku: {
        name: storage.SkuName.Standard_LRS,
    },
    kind: storage.Kind.StorageV2,
});

// Export the primary key of the Storage Account
const storageAccountKeys = storage.listStorageAccountKeysOutput({
    resourceGroupName: resourceGroup.name,
    accountName: storageAccount.name
});
```

{{% /choosable %}}
{{% choosable language python %}}

```python
import pulumi
from pulumi_azure_native import storage
from pulumi_azure_native import resources

# Create an Azure Resource Group
resource_group = resources.ResourceGroup("resource_group")

# Create an Azure resource (Storage Account)
account = storage.StorageAccount('sa',
    resource_group_name=resource_group.name,
    sku=storage.SkuArgs(
        name=storage.SkuName.STANDARD_LRS,
    ),
    kind=storage.Kind.STORAGE_V2)

# Export the primary key of the Storage Account
primary_key = storage.list_storage_account_keys_output(
    resource_group_name=resource_group.name,
    account_name=account.name
).accountKeys.keys[0].value

pulumi.export("primary_storage_key", primary_key)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
package main

import (
    "github.com/pulumi/pulumi-azure-native/sdk/go/azure/resources"
	"github.com/pulumi/pulumi-azure-native/sdk/go/azure/storage"
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
    pulumi.Run(func(ctx *pulumi.Context) error {
        // Create an Azure Resource Group
        resourceGroup, err := resources.NewResourceGroup(ctx, "resourceGroup", nil)
        if err != nil {
            return err
        }

        // Create an Azure resource (Storage Account)
        account, err := storage.NewStorageAccount(ctx, "sa", &storage.StorageAccountArgs{
			ResourceGroupName: resourceGroup.Name,
			AccessTier:        storage.AccessTierHot,
			Sku: &storage.SkuArgs{
				Name: storage.SkuName_Standard_LRS,
			},
			Kind: storage.KindStorageV2,
        })
        if err != nil {
            return err
        }

        // Export the primary key of the Storage Account
		ctx.Export("primaryStorageKey", pulumi.All(resourceGroup.Name, account.Name).ApplyT(
			func(args []interface{}) (string, error) {
				resourceGroupName := args[0].(string)
				accountName := args[1].(string)
				accountKeys, err := storage.ListStorageAccountKeys(ctx, &storage.ListStorageAccountKeysArgs{
					ResourceGroupName: resourceGroupName,
					AccountName:       accountName,
				})
				if err != nil {
					return "", err
				}

				return accountKeys.Keys[0].Value, nil
			},
		))

        return nil
    })
}
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
using System.Threading.Tasks;
using Pulumi;
using Pulumi.AzureNative.Resources;
using Pulumi.AzureNative.Storage;
using Pulumi.AzureNative.Storage.Inputs;

class MyStack : Stack
{
    public MyStack()
    {
        // Create an Azure Resource Group
        var resourceGroup = new ResourceGroup("resourceGroup");

        // Create an Azure resource (Storage Account)
        var storageAccount = new StorageAccount("sa", new StorageAccountArgs
        {
            ResourceGroupName = resourceGroup.Name,
            Sku = new SkuArgs
            {
                Name = SkuName.Standard_LRS
            },
            Kind = Kind.StorageV2
        });

        // Export the primary key of the Storage Account
        this.PrimaryStorageKey = GetStorageAccountPrimaryKey(resourceGroup.Name, storageAccount.Name);
    }

    [Output]
    public Output<string> PrimaryStorageKey { get; set; }

    private static Output<string> GetStorageAccountPrimaryKey(Input<string> resourceGroupName, Input<string> accountName)
    {
        return ListStorageAccountKeys.Invoke(new ListStorageAccountKeysInvokeArgs
        {
            ResourceGroupName = resourceGroupName,
            AccountName = accountName
        }).Apply(accountKeys => Output.CreateSecret(accountKeys.Keys[0].Value));
    }
}
```

{{% /choosable %}}

{{% choosable language java %}}

```java
package myproject;

import com.pulumi.Pulumi;
import com.pulumi.azurenative.resources.ResourceGroup;
import com.pulumi.azurenative.storage.StorageAccount;
import com.pulumi.azurenative.storage.StorageAccountArgs;
import com.pulumi.azurenative.storage.StorageFunctions;
import com.pulumi.azurenative.storage.enums.Kind;
import com.pulumi.azurenative.storage.enums.SkuName;
import com.pulumi.azurenative.storage.inputs.ListStorageAccountKeysArgs;
import com.pulumi.azurenative.storage.inputs.SkuArgs;
import com.pulumi.core.Either;
import com.pulumi.core.Output;
import com.pulumi.deployment.InvokeOptions;

public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            var resourceGroup = new ResourceGroup("resourceGroup");
            var storageAccount = new StorageAccount("sa", StorageAccountArgs.builder()
                    .resourceGroupName(resourceGroup.name())
                    .sku(SkuArgs.builder()
                            .name(SkuName.Standard_LRS)
                            .build())
                    .kind(Kind.StorageV2)
                    .build());

            var primaryStorageKey = getStorageAccountPrimaryKey(
                    resourceGroup.name(),
                    storageAccount.name());

            ctx.export("primaryStorageKey", primaryStorageKey);
        });
    }

    private static Output<String> getStorageAccountPrimaryKey(Output<String> resourceGroupName,
                                                              Output<String> accountName) {
        return Output.tuple(resourceGroupName, accountName).apply(tuple -> {
            var actualResourceGroupName = tuple.t1;
            var actualAccountName = tuple.t2;
            var invokeResult = StorageFunctions.listStorageAccountKeys(ListStorageAccountKeysArgs.builder()
                    .resourceGroupName(actualResourceGroupName)
                    .accountName(actualAccountName)
                    .build(), InvokeOptions.Empty);
            return Output.of(invokeResult)
                    .applyValue(r -> r.keys().get(0).value())
                    .asSecret();
        });
    }
}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
name: quickstart
runtime: yaml
description: A minimal Azure Native Pulumi YAML program
resources:
  resourceGroup:
    type: azure-native:resources:ResourceGroup
  sa:
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
        accountName: ${sa.name}
outputs:
  primaryStorageKey: ${storageAccountKeys.keys[0].value}
```

{{% /choosable %}}

This Pulumi program creates an Azure resource group and storage account and then exports the storage account's primary key.

{{% notes %}}
In this program, the location of the resource group is set in the configuration setting `azure-native:location` (check the `Pulumi.dev.yaml` file). This is an easy way to set a global location for your program so you don't have to specify the location for each resource manually. The location for the storage account is automatically derived from the location of the resource group. To override the location for a resource, simply set the location property to one of Azure's [supported locations](https://azure.microsoft.com/en-us/global-infrastructure/locations/).
{{% /notes %}}

Next, you'll deploy your stack, which will provision a resource group and your storage account.

## Deploy the Stack

Let's go ahead and deploy your stack:

```bash
$ pulumi up
```

This command evaluates your program and determines the resource updates to make. First, a preview is shown that outlines the changes that will be made when you run the update:

```
Previewing update (dev):

    Type                                              Name             Plan
 +   pulumi:pulumi:Stack                              quickstart-dev   create
 +   ├─ azure-native:resources:ResourceGroup          resourceGroup    create
 +   └─ azure-native:storage:StorageAccount           sa               create

Resources:
    + 3 to create

Do you want to perform this update?
  yes
> no
  details
```

Once the preview has finished, you are given three options to choose from. Choosing `details` will show you a rich diff of the changes to be made. Choosing `yes` will create your new storage account in Azure. Choosing `no` will return you to the user prompt without performing the update operation.

```
Do you want to perform this update? yes
Updating (dev):

     Type                                             Name             Status
 +   pulumi:pulumi:Stack                              quickstart-dev   created
 +   ├─ azure-native:resources:ResourceGroup          resourceGroup    created
 +   └─ azure-native:storage:StorageAccount           sa               created

Outputs:
    primaryStorageKey: "<key_value>"

Resources:
    + 3 created

Duration: 26s
```

Remember the output you defined in the previous step? That [stack output]({{< relref "/docs/intro/concepts/stack#outputs" >}}) can be seen in the `Outputs:` section of your update. You can access your outputs from the CLI by running the `pulumi stack output [property-name]` command. For example you can print the primary key of your bucket with the following command:

{{% choosable language typescript %}}

```bash
$ pulumi stack output primaryStorageKey
```

{{% /choosable %}}

{{% choosable language python %}}

```bash
$ pulumi stack output primary_storage_key
```

{{% /choosable %}}

{{% choosable language go %}}

```bash
$ pulumi stack output primaryStorageKey
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
$ pulumi stack output PrimaryStorageKey
```

{{% /choosable %}}

{{% choosable language java %}}

```bash
$ pulumi stack output primaryStorageKey
```

{{% /choosable %}}

{{% choosable language yaml %}}

```bash
$ pulumi stack output primaryStorageKey
```

{{% /choosable %}}

Running that command will print out the storage account's primary key.

{{< console-note >}}

Now that your storage account has been provisioned, let's modify it to host a static website.

## Modify the Program

Now that your storage account is provisioned, let's add an object to it. First, from within your project directory, create a new `index.html` file with some content in it.

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

Now that you have your new `index.html` with some content, you can enable static website support, upload `index.html` to a storage container, and retrieve a public URL through the use of resource properties. These properties can be used to define dependencies between related resources or to retrieve property values for further processing.

{{< chooser language "typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language typescript %}}

To start, open `index.ts` and add the following right after the storage account creation:

```typescript
// Enable static website support
const staticWebsite = new storage.StorageAccountStaticWebsite("staticWebsite", {
    accountName: storageAccount.name,
    resourceGroupName: resourceGroup.name,
    indexDocument: "index.html",
});
```

{{% /choosable %}}
{{% choosable language python %}}

To start, open `__main__.py` and add the following right after the storage account creation:

```python
# Enable static website support
static_website = storage.StorageAccountStaticWebsite("staticWebsite",
    account_name=account.name,
    resource_group_name=resource_group.name,
    index_document="index.html")
```

{{% /choosable %}}
{{% choosable language go %}}

To start, open `main.go` and add the following right after the storage account creation:

```go
// Enable static website support
staticWebsite, err := storage.NewStorageAccountStaticWebsite(ctx, "staticWebsite", &storage.StorageAccountStaticWebsiteArgs{
    AccountName:       account.Name,
    ResourceGroupName: resourceGroup.Name,
    IndexDocument:     pulumi.String("index.html"),
})
if err != nil {
    return err
}
```

{{% /choosable %}}
{{% choosable language csharp %}}

To start, open `MyStack.cs` and add the following right after the storage account creation:

```csharp
// Enable static website support
var staticWebsite = new StorageAccountStaticWebsite("staticWebsite", new StorageAccountStaticWebsiteArgs
{
    AccountName = storageAccount.Name,
    ResourceGroupName = resourceGroup.Name,
    IndexDocument = "index.html",
});
```

{{% /choosable %}}

{{% choosable language java %}}

To start, open `App.java` and add the following imports:

```java
import com.pulumi.azurenative.storage.StorageAccountStaticWebsite;
import com.pulumi.azurenative.storage.StorageAccountStaticWebsiteArgs;
import com.pulumi.azurenative.storage.Blob;
import com.pulumi.azurenative.storage.BlobArgs;
import com.pulumi.azurenative.storage.outputs.EndpointsResponse;
import com.pulumi.asset.FileAsset;
```

Next, add the following right after the storage account creation:

```java
var staticWebsite = new StorageAccountStaticWebsite("staticWebsite",
                    StorageAccountStaticWebsiteArgs.builder()
                            .accountName(storageAccount.name())
                            .resourceGroupName(resourceGroup.name())
                            .indexDocument("index.html")
                            .build());
```

{{% /choosable %}}

{{% choosable language yaml %}}

To start, open `Pulumi.yaml` and add the following right after the storage account creation:

```yaml
resources:
  # ...
  staticWebsite:
    type: azure-native:storage:StorageAccountStaticWebsite
    properties:
      accountName: ${sa.name}
      resourceGroupName: ${resourceGroup.name}
      indexDocument: index.html
```

{{% /choosable %}}

The static website resource leverages the storage account and resource group names defined previously in your program.

Now use all of these cloud resources and a local `FileAsset` resource to upload `index.html` into your storage container by adding the following at the end of the file (after enabling the static website support):
{{% choosable language typescript %}}

```typescript
// Upload the file
const indexHtml = new storage.Blob("index.html", {
    resourceGroupName: resourceGroup.name,
    accountName: storageAccount.name,
    containerName: staticWebsite.containerName,
    source: new pulumi.asset.FileAsset("index.html"),
    contentType: "text/html",
});
```

{{% /choosable %}}

{{% choosable language python %}}

```python
# Upload the file
index_html = storage.Blob("index.html",
    resource_group_name=resource_group.name,
    account_name=account.name,
    container_name=static_website.container_name,
    source=pulumi.FileAsset("index.html"),
    content_type="text/html")
```

{{% /choosable %}}
{{% choosable language go %}}

```go
// Upload the file
_, err = storage.NewBlob(ctx, "index.html", &storage.BlobArgs{
    ResourceGroupName: resourceGroup.Name,
    AccountName:       account.Name,
    ContainerName:     staticWebsite.ContainerName,
    Source:            pulumi.NewFileAsset("index.html"),
    ContentType:       pulumi.String("text/html"),
})
if err != nil {
    return err
}
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
// Upload the file
var index_html = new Blob("index.html", new BlobArgs
{
    ResourceGroupName = resourceGroup.Name,
    AccountName = storageAccount.Name,
    ContainerName = staticWebsite.ContainerName,
    Source = new FileAsset("index.html"),
    ContentType = "text/html",
});
```

{{% /choosable %}}

{{% choosable language java %}}

```java
// Upload the file
var index_html = new Blob("index.html", BlobArgs.builder()
                    .resourceGroupName(resourceGroup.name())
                    .accountName(storageAccount.name())
                    .containerName(staticWebsite.containerName())
                    .source(new FileAsset("index.html"))
                    .contentType("text/html")
                    .build());
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
resources:
  # ...
  # Upload the file
  index-html:
    type: azure-native:storage:Blob
    properties:
      resourceGroupName: ${resourceGroup.name}
      accountName: ${sa.name}
      containerName: ${staticWebsite.containerName}
      source:
        Fn::FileAsset: ./index.html
      contentType: text/html
      blobName: index.html
      type: block
```

{{% /choosable %}}

{{% choosable language typescript %}}

Finally, at the end of `index.ts`, export the resulting storage container's endpoint URL to stdout for easy access:

```typescript
// Web endpoint to the website
export const staticEndpoint = storageAccount.primaryEndpoints.web;
```

{{% /choosable %}}

{{% choosable language python %}}

Finally, at the end of `__main__.py`, export the resulting storage container's endpoint URL to stdout for easy access:

```python
# Web endpoint to the website
pulumi.export("staticEndpoint", account.primary_endpoints.web)
```

{{% /choosable %}}

{{% choosable language go %}}

Finally, at the end of `main.go`, export the resulting storage container's endpoint URL to stdout for easy access:

```go
// Web endpoint to the website
ctx.Export("staticEndpoint", account.PrimaryEndpoints.Web())
```

{{% /choosable %}}

{{% choosable language csharp %}}

Finally, at the end of `MyStack.cs`, export the resulting storage container's endpoint URL to stdout for easy access:

```csharp
// Web endpoint to the website
this.StaticEndpoint = storageAccount.PrimaryEndpoints.Apply(
        primaryEndpoints => primaryEndpoints.Web);
```

```csharp
[Output]
public Output<string> StaticEndpoint { get; set; }
```

{{% /choosable %}}

{{% choosable language java %}}

Finally, at the end of `App.java`, export the resulting storage container's endpoint URL to stdout for easy access:

```java
ctx.export("staticEndpoint", storageAccount.primaryEndpoints()
        .applyValue(EndpointsResponse::web));
```

{{% /choosable %}}

{{% choosable language yaml %}}

Finally, at the end of `Pulumi.yaml` in the `outputs`, export the resulting storage container's endpoint URL to stdout for easy access:

```yaml
outputs:
  # ...
  staticEndpoint: ${sa.primaryEndpoints.web}
```

{{% /choosable %}}

Now that you have declared how you want your resources to be provisioned, it is time to deploy these remaining changes.

## Deploy the Changes

Deploy your changes by using `pulumi up` again.

```bash
$ pulumi up
```

Pulumi will run the `preview` step of the update, which computes the minimally disruptive change to achieve the desired state described by the program.

```
Previewing update (dev):

     Type                                                   Name                 Plan
     pulumi:pulumi:Stack                                    quickstart-dev
 +   ├─ azure-native:storage:StorageAccountStaticWebsite    staticWebsite        create
 +   └─ azure-native:storage:Blob                           index.html           create

Outputs:
  + staticEndpoint   : "https://sa8dd8af62.z22.web.core.windows.net/"

Resources:
    + 2 to create
    3 unchanged

Do you want to perform this update?
  yes
> no
  details
```

Choosing `yes` will proceed with the update by uploading the `index.html` file to a storage container in your account and enabling static website support on the container.

```
Do you want to perform this update? yes
Updating (dev):

     Type                                                   Name                Status
     pulumi:pulumi:Stack                                    quickstart-dev
 +   ├─ azure-native:storage:StorageAccountStaticWebsite    staticWebsite       created
 +   └─ azure-native:storage:Blob                           index.html          created

Outputs:
    primaryStorageKey: "<key_value>"
  + staticEndpoint   : "https://sa8dd8af62.z22.web.core.windows.net/"

Resources:
    + 2 created
    3 unchanged

Duration: 4s
```

You can check out your new static website at the URL in the `Outputs` section of your update or you can make a `curl` request and see the contents of your `index.html` object printed out in your terminal.

{{% choosable language typescript %}}

```bash
$ curl $(pulumi stack output staticEndpoint)
```

{{% /choosable %}}

{{% choosable language python %}}

```bash
$ curl $(pulumi stack output staticEndpoint)
```

{{% /choosable %}}

{{% choosable language go %}}

```bash
$ curl $(pulumi stack output staticEndpoint)
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
$ curl $(pulumi stack output StaticEndpoint)
```

{{% /choosable %}}

{{% choosable language java %}}

```bash
$ curl $(pulumi stack output staticEndpoint)
```

{{% /choosable %}}

{{% choosable language yaml %}}

```bash
$ curl $(pulumi stack output staticEndpoint)
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

Now that you have deployed your site, you will destroy the resources.

## Destroy the Stack

Now that you've seen how to deploy changes to our program, let's clean up and tear down the resources that are part of your stack.

To destroy resources, run the following:

```bash
$ pulumi destroy
```

You'll be prompted to make sure you really want to delete these resources. This can take a minute or two; Pulumi waits until all resources are shut down and deleted before it considers the destroy operation to be complete.

```
Previewing destroy (dev):

     Type                                                         Name                     Plan
 -   pulumi:pulumi:Stack                                          quickstart-dev           delete
 -   ├─ azure-native:storage:Blob                                 index.html               delete
 -   ├─ azure-native:storage:StorageAccountStaticWebsite          staticWebsite            delete
 -   ├─ azure-native:storage:StorageAccount                       sa                       delete
 -   └─ azure-native:resources:ResourceGroup                      resourceGroup            delete

Outputs:
  - primaryStorageKey: "<key_value>"
  - staticEndpoint   : "https://sa8dd8af62.z22.web.core.windows.net/"

Resources:
    - 5 to delete

Do you want to perform this destroy? yes
Destroying (dev):

     Type                                                   Name                Status
 -   pulumi:pulumi:Stack                                    quickstart-dev      deleted
 -   ├─ azure-native:storage:Blob                           index.html          deleted
 -   ├─ azure-native:storage:StorageAccountStaticWebsite    staticWebsite       deleted
 -   ├─ azure-native:storage:StorageAccount                 sa                  deleted
 -   └─ azure-native:resources:ResourceGroup                resourceGroup       deleted

Outputs:
  - primaryStorageKey: "<key_value>"
  - staticEndpoint   : "https://sa8dd8af62.z22.web.core.windows.net/"

Resources:
    - 5 deleted

Duration: 53s
```

To delete the stack itself, run [`pulumi stack rm`]({{< relref
"/docs/reference/cli/pulumi_stack_rm" >}}). Note that this removes the stack
entirely from the Pulumi Service, along with all of its update history.

Congratulations! You've successfully provisioned some cloud resources using Pulumi. By completing this guide you have successfully:

- Created a Pulumi new project.
- Provisioned a new Azure storage account and container.
- Added an `index.html` file to your container.
- Served the `index.html` as a static website.
- Destroyed the resources you've provisioned.

On the next page, we have a collection of examples and tutorials that you can deploy as they are or use them as a foundation for your own applications and infrastructure projects.

## Next Steps

Congrats! You've deployed your first project on Azure with Pulumi. Here are some next steps, depending on your learning style.

### Learn Pulumi

Dive into Learn Pulumi for a comprehensive walkthrough of key Pulumi concepts in the context of a real-life application.

{{< get-started-next-step path="/learn/pulumi-fundamentals" label="Learn Pulumi Fundamentals" ref="gs-azure-learn" >}}

### How-to Guides

Explore our how-to guides if you're looking for examples of specific architectures or application stacks. These guides are available in all Pulumi languages and cover many common architectures such as [static websites]({{< relref "/registry/packages/azure-native/how-to-guides/azure-ts-static-website" >}}), [virtual machines]({{< relref "/registry/packages/azure-native/how-to-guides/azure-ts-webserver" >}}), [AKS clusters]({{< relref "/registry/packages/azure-native/how-to-guides/azure-ts-aks" >}}), [container instances]({{< relref "/registry/packages/azure-native/how-to-guides/azure-ts-aci" >}}), and [functions]({{< relref "/registry/packages/azure-native/how-to-guides/azure-ts-functions" >}}).

{{< get-started-next-step path="/registry/packages/azure-native/how-to-guides" label="Explore How-to Guides" ref="gs-azure-guides" >}}

### How Pulumi Works

Learn how Pulumi works from its architecture to key concepts, including [stacks]({{< relref "/docs/intro/concepts/stack" >}}), [state]({{< relref "/docs/intro/concepts/state" >}}), [configuration]({{< relref "/docs/intro/concepts/config" >}}), and [secrets]({{< relref "/docs/intro/concepts/secrets" >}}).

{{< get-started-next-step path="/docs/intro/concepts" label="Read Documentation" ref="gs-azure-docs" >}}

### Blog Posts

Read through the latest blog posts about using Pulumi with Azure, including everything from new Azure features and products supported by Pulumi to technical architectures and best practices.

{{< get-started-next-step path="/blog/tag/azure" label="Read the Pulumi Blog" ref="gs-azure-blog" >}}
