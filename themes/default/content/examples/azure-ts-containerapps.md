---
title: "Azure Container Apps"
meta_desc: ""
metadata:
  id: azure-ts-containerapps
  title: "Azure Container Apps"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-ts-containerapps
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example demonstrates how to deploy a container application to Azure with TypeScript. It uses the Microsoft Azure cloud provider, TypeScript for language bindings, and provides a general cloud computing use case. It allows users to create a resource group, App Service, Linux containers, and load balancer to run containers with a single command. This example is useful for creating a stack from scratch to run a containerized application in Azure."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-ts-containerapps/README.md)

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

1.  Restore NPM dependencies:

    ```
    $ npm install
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

