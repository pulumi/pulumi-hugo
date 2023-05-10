---
title: "Azure Container Apps"
meta_desc: ""
metadata:
  id: azure-container-apps
  title: "Azure Container Apps"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-container-apps
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example demonstrates the deployment of a container-based application to Azure. It is written in TypeScript and enables the deployment of a Kubernetes cluster on Azure using Azure Container Services and Azure Container Registry. The general cloud-computing use case it serves is the deployment of cloud-native applications to Azure using container-based technology."
---

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

