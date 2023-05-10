---
title: "Azure Container Instances on Linux"
meta_desc: ""
metadata:
  id: azure-ts-aci
  title: "Azure Container Instances on Linux"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-ts-aci
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This example shows how to use the Pulumi programming framework to create and deploy a containerized TypeScript web application to Azure. It uses Azure as its cloud provider and TypeScript as its programming language. It creates an Azure Container Instance that serves as the web application&#x27;s host, and a storage account to store application files. It is an example of a general cloud-computing use case where an application is containerized and deployed to the cloud."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-ts-aci/README.md)

# Azure Container Instances on Linux

Starting point for building web application hosted in Azure Container Instances.

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
        + 3 created

    Duration: 1m18s
    ```

1.  Check the deployed endpoint:

    ```
    $ pulumi stack output containerIPv4Address
    13.83.66.37
    $ curl "$(pulumi stack output containerIPv4Address)"
    <html>
    <head>
        <title>Welcome to Azure Container Instances!</title>
    </head>
    ...
    ```

