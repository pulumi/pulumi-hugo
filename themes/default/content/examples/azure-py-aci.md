---
title: "Azure Container Instances on Linux"
meta_desc: ""
metadata:
  id: azure-py-aci
  title: "Azure Container Instances on Linux"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-py-aci
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example uses Python to deploy a web application to Azure, allowing developers to rapidly spin up and host their applications on a generally accessible cloud service. It utilizes the Azure Container Instances (ACI) service to host the application, providing a straightforward way to package, deploy, and manage it. The example deploys a simple &quot;Hello World&quot; web application, showcasing the ability for developers to quickly use the cloud to host their applications. This is a general use case of cloud computing, using existing services from a cloud provider to quickly and easily host and deploy applications."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-py-aci/README.md)

# Azure Container Instances on Linux

Starting point for building web application hosted in Azure Container Instances.

## Running the App

1. Create a new stack:

    ```bash
    $ pulumi stack init dev
    ```

1. Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```bash
    $ az login
    ```

1. Set the Azure region location to use:

    ```
    $ pulumi config set azure-native:location westus2
    ```

1. Run `pulumi up` to preview and deploy changes:

    ```bash
    $ pulumi up
    Previewing changes:
    ...

    Performing changes:
    ...
    Resources:
        + 3 created

    Duration: 1m18s
    ```

1. Check the deployed endpoint:

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

