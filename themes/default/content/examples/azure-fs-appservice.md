---
title: "Azure App Service with SQL Database and Application Insights"
meta_desc: ""
metadata:
  id: azure-fs-appservice
  title: "Azure App Service with SQL Database and Application Insights"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-fs-appservice
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example uses the Azure cloud provider and the TypeScript programming language to create a full serverless architecture with an Azure File Share and an App Service. The file share is a simple storage service, and the App Service will host web apps, APIs, and mobile backends. Together, these two services are used to create a cost-effective, highly available cloud-computing use case."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/classic-azure-fs-appservice/README.md)

# Azure App Service with SQL Database and Application Insights

Starting point for building web application hosted in Azure App Service.

Provisions Azure SQL Database and Azure Application Insights to be used in combination
with App Service.

## Deploying the App

To deploy your infrastructure, follow the below steps.

### Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
2. [Install .NET Core 3.0+](https://dotnet.microsoft.com/download)

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
    $ pulumi config set azure:location <location>
    ```

1. Define SQL Server password (make it complex enough to satisfy Azure policy):

    ```
    pulumi config set --secret sqlPassword <value>
    ```

1.  Run `pulumi up` to preview and deploy changes:

    ```
    $ pulumi up
    Previewing changes:
    ...

    Performing changes:
    ...
    info: 10 changes performed:
        + 10 resources created
    Update duration: 1m14.59910109s
    ```

1.  Check the deployed website endpoint:

    ```
    $ pulumi stack output endpoint
    https://azpulumi-as0ef47193.azurewebsites.net
    $ curl "$(pulumi stack output endpoint)"
    <html>
        <body>
            <h1>Greetings from Azure App Service!</h1>
        </body>
    </html>
    ```

6. From there, feel free to experiment. Simply making edits and running `pulumi up` will incrementally update your stack.

7. Once you've finished experimenting, tear down your stack's resources by destroying and removing it:

    ```bash
    $ pulumi destroy --yes
    $ pulumi stack rm --yes
    ```

