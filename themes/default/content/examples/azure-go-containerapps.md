---
title: "Azure Container Apps"
meta_desc: ""
metadata:
  id: azure-go-containerapps
  title: "Azure Container Apps"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-go-containerapps
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example demonstrates how to create a containerized application on Azure using Go. It uses Azure as the cloud provider and Go as the programming language. The example creates an App Service Plan and an App Service with a Docker container image and exposes the app using an Azure Load Balancer. It&#x27;s a general cloud-computing use case that creates a basic cloud-hosted containerized application."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-go-containerapps/README.md)

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
    $ pulumi config set azure-native:location canadacentral
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

1. Check the deployed endpoint:

    ```
    $ curl "$(pulumi stack output url)"
    <html>
    <body>
    <h1>Your custom docker image is running in Azure Container Apps!</h1>
    </body>
    </html>
    ```

