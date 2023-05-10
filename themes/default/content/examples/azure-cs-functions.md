---
title: "Azure Functions on a Linux App Service Plan"
meta_desc: ""
metadata:
  id: azure-cs-functions
  title: "Azure Functions on a Linux App Service Plan"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-cs-functions
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example uses the Azure cloud and the Javascript programming language to deploy a cloud-hosted serverless function. This example deploys a simple &quot;Hello world!&quot; function to an Azure Functions environment. The function outputs the sentence &quot;Hello world!&quot; when invoked. The example serves a general cloud-computing use case of demonstrating how to deploy a simple serverless function to the Azure cloud."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-cs-functions/README.md)

# Azure Functions on a Linux App Service Plan

Azure Functions created from deployment packages in Python and deployed to an App Service Plan on Linux.

## Deploying the App

To deploy your infrastructure, follow the below steps.

### Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
2. [Install .NET Core 3.1+](https://dotnet.microsoft.com/download)

### Steps

1.  Create a new stack:

    ```
    $ pulumi stack init dev
    ```

1.  Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```
    $ az login
    ```

1.  Configure the location to deploy the resources to:

    ```
    $ pulumi config set azure-native:location <location>
    ```

1.  Run `pulumi up` to preview and deploy changes:

    ```
    $ pulumi up
    Previewing update (dev):
    ...

    Updating (dev):
    ...
    Resources:
        + 8 created
    Duration: 2m42s
    ```

1.  Check the deployed function endpoints:

    ```
    $ pulumi stack output Endpoint
    https://app1a2d3e4d.azurewebsites.net/api/Hello?name=Pulumi
    $ curl "$(pulumi stack output Endpoint)"
    Hello, Pulumi
    ```

1. From there, feel free to experiment. Simply making edits and running `pulumi up` will incrementally update your stack.

1. Once you've finished experimenting, tear down your stack's resources by destroying and removing it:

    ```bash
    $ pulumi destroy --yes
    $ pulumi stack rm --yes
    ```

