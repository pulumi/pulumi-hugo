---
title: "Azure Container Apps"
meta_desc: ""
metadata:
  id: azure-cs-containerapps
  title: "Azure Container Apps"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-cs-containerapps
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example deploys a container application in Azure using the Python programming language. The app consists of two container services which listen on different ports at the same address. It shows how to use Pulumi to create two new container services, one hosted on Windows and one on Linux, and exposes them externally. It also shows how to create a resource group, container registry and application gateway to deploy and manage the application. The example serves a container-application deployment use case in the cloud."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-cs-containerapps/README.md)

# Azure Container Apps

Starting point for building web application hosted in Azure Container Apps.

## Running the App

1.  Create a new stack:

    ```
    $ pulumi stack init dev
    ```

1.  Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```
    $ az login
    ```
    
1. Set the Azure region location to use:
    
    ```
    $ pulumi config set azure-native:location westus2
    ```

1.  Run `pulumi up` to preview and deploy changes:

    ```
    $ pulumi up
    Previewing changes:
    ...

    Performing changes:
    ...
    Resources:
        + 7 created

    Duration: 4m18s
    ```

1.  Check the deployed endpoint:

    ```
    $ curl "$(pulumi stack output url)"
    <html>
    <body>
    <h1>Your custom docker image is running in Azure Container Apps!</h1>
    </body>
    </html>
    ```

