---
title: "Azure Container Instances on Linux"
meta_desc: ""
metadata:
  id: azure-go-aci
  title: "Azure Container Instances on Linux"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-go-aci
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example deploys a simple web application into Azure using Go and the Azure Container Instances (ACI) service. It will create an ACI instance running a Hello World web server and an Azure Load Balancer for routing HTTP requests to the ACI instance. The example demonstrates how Pulumi can be used to manage and automate Azure services using the Go programming language. This example provides a simple demonstration of how multiple Azure components can be coordinated with Pulumi to deploy cloud applications."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-go-aci/README.md)

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
