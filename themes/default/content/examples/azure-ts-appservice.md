---
title: "Azure App Service with SQL Database and Application Insights"
meta_desc: ""
metadata:
  id: azure-ts-appservice
  title: "Azure App Service with SQL Database and Application Insights"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-ts-appservice
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "The Pulumi example creates an Azure app service using TypeScript and the Azure SDK for JavaScript. It creates an application, web service plan, and a custom domain in Azure using Pulumi’s infrastructure-as-code programming model. It leverages Azure’s compute, database, and storage services for deployments, automations, and scalability. It serves as an example of using Pulumi to easily create cloud infrastructure for web applications on Azure in TypeScript."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-ts-appservice/README.md)

# Azure App Service with SQL Database and Application Insights

Starting point for building web application hosted in Azure App Service.

Provisions Azure SQL Database and Azure Application Insights to be used in combination
with App Service.

## Running the App

1.  Create a new stack:

    ```
    $ pulumi stack init dev
    ```

1.  Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```
    $ az login
    ```

1.  Restore NPM dependencies:

    ```
    $ npm install
    ```

1. Set the Azure region location to use:
    
    ```
    $ pulumi config set azure-native:location westus2
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
            <h1>Greetings from Azure App Service (courtesy of Pulumi)!</h1>
        </body>
    </html>
    ```

