---
title: "Azure App Service with SQL Database and Application Insights"
meta_desc: ""
metadata:
  id: azure-py-appservice
  title: "Azure App Service with SQL Database and Application Insights"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-py-appservice
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This example from Pulumi shows how to build and deploy an Azure web application using the Python programming language. It demonstrates how to use Pulumi to configure an App Service web application onto Azure and deploy it using Azure DevOps. It provides a simple web application implemented with Python web framework Flask. The example uses the Azure cloud provider and Python programming language to deploy a web application in a cloud-computing use case."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-py-appservice/README.md)

# Azure App Service with SQL Database and Application Insights

Starting point for building web application hosted in Azure App Service.

Provisions Azure SQL Database and Azure Application Insights to be used in combination
with App Service.

## Running the App

1. Create a new stack:

    ```bash
    $ pulumi stack init dev
    ```

1. Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```bash
    $ az login
    ```

1. Create a Python virtualenv, activate it, and install dependencies:

    This installs the dependent packages [needed](https://www.pulumi.com/docs/intro/concepts/how-pulumi-works/) for our Pulumi program.

    ```bash
    $ python3 -m venv venv
    $ source venv/bin/activate
    $ pip3 install -r requirements.txt
    ```

1. Specify the Azure location to use:

    ```bash
    $ pulumi config set azure-native:location WestUS
    ```

1. Define SQL Server password (make it complex enough to satisfy Azure policy):

    ```bash
    $ pulumi config set --secret sqlPassword <value>
    ```

1. Run `pulumi up` to preview and deploy changes:

    ``` bash
    $ pulumi up
    Previewing changes:
    ...

    Performing changes:
    ...
    info: 10 changes performed:
        + 10 resources created
    Update duration: 1m14.59910109s
    ```

1. Check the deployed website endpoint:

    ```bash
    $ pulumi stack output endpoint
    https://azpulumi-as0ef47193.azurewebsites.net
    $ curl "$(pulumi stack output endpoint)"
    <html>
        <body>
            <h1>Greetings from Azure App Service!</h1>
        </body>
    </html>
    ```

