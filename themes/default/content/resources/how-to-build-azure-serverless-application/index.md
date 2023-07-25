---
title: "How do build a serverless applications with Azure, blob storage and API management"
allow_long_title: true
meta_desc: "Learn to build a serverless applications with this step-by-step guide! Learn how to use Azure Functions for compute, Blob Storage for data, and API Management to expose your APIs. Ideal for developers and architects aiming for efficient, scalable solutions."
type: ai-answers
date: 2023-07-24
---


## How do build a serverless applications with Azure, blob storage and API management

To build a serverless application using Azure, Blob Storage, and API Management, we will need to create a few resources:

We can accomplish your goal by creating a Pulumi application that utilizes the Azure Functions (for serverless capabilities), Azure Blob Storage (for storing data), and Azure API Management (for managing and hosting your APIs). The general steps we can follow are:

Create an Azure Storage Account and a blob container in the Storage Account.
Create an Azure Function app which is connected to the blob storage to handle operations (like reading/writing data from/to the blob).
Set up Azure API Management Service, import the function app into it so it can be triggered through the API management service.

Here is a basic Pulumi program that accomplishes the steps above:

{{< chooser language "typescript,csharp,yaml" />}}

{{% choosable language typescript %}}

```typescript

sample typescript answer...

```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript

import * as from "@pulumiulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";
import * as web from "@pulumi/azure-native/web";
import * as apimanagement from "@pulumi/azure-native/apimanagement";

// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("resourceGroup");

// Create an Azure Storage Account
const storageAccount = new storage.StorageAccount("sa", {
    resourceGroupName: resourceGroup.name,
    sku: {
        name: storage.SkuName.Standard_LRS, // LRS = Locally redundant storage
    },
    kind: "StorageV2",
});

// Create an Azure Blob to store function code 
const storageBlob = new storage.Blob(`appcode`, {
    resourceGroupName: resource.name,
    accountName: storageAccount.name,
    containerName: "$web", // Static website container
    // Replace with your blob content or source
    source: new pulumi.asset.FileAsset("./app.zip"), // Upload app code from local disk
});

// Create an Azure function app using Blob code
const functionApp = new web.FunctionApp("fa", {
    resourceGroupName: resourceGroup.name,
    kind: "functionapp", 
    location: resourceGroup.location, // Inherit the location from the resource group
    serverFarmId: new web.AppServicePlan("plan", {
        resourceGroupName: resourceGroup.name,
        kind: "elastic", // Required for function apps
        sku: {
            name: "Y1", // Shared infrastructure and low cost
        },
    }).id,
    siteConfig: {
        appSettings: [
            { name: "runtime", value: "python" }, // Replace with your function app's runtime
            { name: "WEBSITE_RUN_FROM_PACKAGE", value: pulumi.interpolate`https://${storage}.blob.core.windows.net/${"$web"}/${storageBlob.name}` },
        ],
    },
});

// Set the connection string the storage account
new web.FunctionAppSetting("appsetting", {
    resourceGroupName: resourceGroup.name,
    name: functionApp.name,
    appSettingName: "AzureWebJobsStorage",
    appSettingValue: pulumi.interpolate`DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};AccountKey=${storageAccount.primaryKey};EndpointSuffix=core.windows.net`,
});

// Create an API Management instance
const apimInstance = new apimanagement.ApiManagementService("apim", {
    resourceGroupName: resourceGroup.name,
    sku: {
        name: apimanagement.SkuType.Developer, // Developer tier for testing purpose
        capacity: 1,
    },
});

// Create an API with a function backend
new apimanagement.Api("exampleApi", {
    resourceGroupName: resourceGroup.name,
    serviceName: apimInstance.name,
    protocols: ["https"],
    serviceName: functionApp.name,
    path: "example",
});

exports.endpoint = pulumi.interpolate`https://${functionApp.defaultHostName}/api`;


```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp

using System.Threading.Tasks;
using Pulumi;
using Pulumi.AzureNative.Resources;
using Pulumi.AzureNative.Storage;
usingulumi.AzureNative.Storage.Inputs;
using Pulumi.AzureNative.Web;
using Pulumi.AzureNative.Web.Inputs;

class MyStack : Stack
{
    public MyStack()
    {
        // Create an Azure Resource Group
        var resourceGroup = new ResourceGroup("resourceGroup");

        // Create an Azure Storage Account
        var storageAccount = new StorageAccount("storageAccount", new StorageAccountArgs
        {
            ResourceGroupName = resourceGroup.Name,
            Sku = new SkuArgs
            {
                Name = SkuName.Standard_LRS
            },
            Kind = Kind.StorageV2
        });

        // Create a blob container in the storage account
        var blobContainer = new BlobContainer("blobContainer", new BlobContainerArgs
        {
            AccountName = storageAccount.Name,
            ResourceGroupName = resourceGroup.Name,
            PublicAccess = PublicAccess.None
        });

        // Create a Consumption Plan for Azure Functions
        var consumptionPlan = new AppServicePlan("consumptionPlan", new AppServicePlanArgs
        {
            ResourceGroupName = resourceGroup.Name,
            Kind = "FunctionApp",
            Sku = new SkuDescriptionArgs
            {
                Tier = "Dynamic",
                Name = "Y1",
            },
        });

        // Create an Azure Function App
        var functionApp = new WebApp("functionApp", new WebAppArgs
        {
            ResourceGroupName = resourceGroup.Name,
            ServerFarmId = consumptionPlan.Id,
            Kind = "functionapp",
            SiteConfig = new SiteConfigArgs
            {
                AppSettings = new []
                {
                    new NameValuePairArgs { Name = "AzureWebJobsStorage", Value = storageAccount.PrimaryConnectionString },
                    new NameValuePairArgs { Name = "WEBSITE_RUN_FROM_PACKAGE", Value = "1" },
                }
            }
        });
    }
}

```
{{% /choosable %}}
{{% choosable language yaml %}}

```yaml

apiVersion: pulumi.com/v1alpha1
kind: Stack
metadata:
  name: azure-app
  runtime: go
spec:
  resources:
  - apiVersion azure-native.resources/latest
    kind: ResourceGroup
    metadata:
      name: resourceGroup
    spec:
      resourceGroupName: "myResourceGroup"
      location: "WestUS"

  - apiVersion: azure-native.storage/latest
    kind: StorageAccount
    spec:
      accountName: "myaccount"
      location: "WestUS"
      resourceGroupName: "myResourceGroup"
      sku:
        name: "Standard_LRS"
      kind: "StorageV2"
    metadata:
      name: storageAccount

  - apiVersion: azure-native.storage/latest
    kind: BlobContainer
    spec:
      accountName: "myaccount"
      containerName: "mycontainer"
      metadata: 
        name: "myMetadata"
        value: "myValue"
      publicAccess: "None"
      resourceGroupName: "myResourceGroup"
    metadata:
      name: blobContainer

  - apiVersion: azure-native.apimanagement/latest
    kind: ApiService
    spec:
      serviceName: "myService"
      resourceGroupName: "myResourceGroup"
      location: "WestUS"
      sku:
        capacity: 1
        name: "Consumption"
    metadata:
      name: apiService


```
{{% /choosable %}}

Please note that this is a basic outline of what's needed to set up a serverless application with Azure Blob Storage and Azure API Management. Depending on your application requirements, you may need to customize the setup, for example handle CORS settings, secure your Function app, and so on.

Also note that the Function app set up in this example doesn't actually do anything yet - it's a blank function app. You would have to deploy your functions into it, which usually involves creating a separate project for your functions, writing the function logic (in a language supported by Azure Functions), and deploying that project into the Function App. The deployment part can be handled in various ways, for example continuous deployment for Functions can be set up from a GitHub or Azure DevOps Repo.

Links to Pulumi Registry resources used:

[azure-native.resources.ResourceGroup](https://www.pulumi.com/registry/packages/azure-native/api-docs/resources/resourcegroup/)
[azure-native.storage.StorageAccount](https://www.pulumi.com/registry/packages/azure-native/api-docs/storage/storageaccount/)
[azure-native.storage.BlobContainer](https://www.pulumi.com/registry/packages/azure-native/api-docs/azurestackhci/storagecontainer/)
[azure-native.web.AppServicePlan](https://www.pulumi.com/registry/packages/azure-native/api-docs/web/appserviceplan/)
[azure-native.web.WebApp](https://www.pulumi.com/registry/packages/azure-native/api-docs/web/webapp/)