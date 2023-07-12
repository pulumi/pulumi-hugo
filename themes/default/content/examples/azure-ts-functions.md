---
title: "Deploying Azure Functions"
meta_desc: ""
metadata:
  id: azure-ts-functions
  title: "Deploying Azure Functions"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-ts-functions
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example provides a basic example of using Microsoft Azure and TypeScript to host Serverless Functions. It uses the Azure cloud provider and TypeScript programming language in order to deploy an Azure Function that is triggered by an HTTP request. This example demonstrates how to deploy a Function App with multiple functions and set up an associated storage account. It serves as a basic template for Serverless Functions development in Azure and can be used as the basis for more complex scenarios."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-ts-functions/README.md)

# Deploying Azure Functions

Starting point for building serverless applications hosted in Azure Functions.

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
        + 8 created

    Duration: 1m18s
    ```

1.  Check the deployed endpoint:

    ```
    $ pulumi stack output endpoint
    https://appg-fsprfojnnlr.azurewebsites.net/api/HelloNode?name=Pulumi
    $ curl "$(pulumi stack output endpoint)"
    Hello from Node.js, Pulumi
    ```

