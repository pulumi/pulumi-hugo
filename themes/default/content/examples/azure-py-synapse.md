---
title: "Azure Synapse Workspace and Pools"
meta_desc: ""
metadata:
  id: azure-py-synapse
  title: "Azure Synapse Workspace and Pools"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-py-synapse
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example deploys an Azure Synapse workspace using Python. It enables an automated and versioned deployment for the scalable analytics platform on Azure, a cloud provider. The example provisions and configures an additional subnet for Synapse within the given virtual network. It showcases how to create an Azure Storage account and associated containers needed to store various Synapse resources. Finally, this example can be used to serve a broad range of cloud-computing use cases as it allows data engineers to provision and manage a powerful analytics platform with ease."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-py-synapse/README.md)

# Azure Synapse Workspace and Pools

Starting point for enterprise analytics solutions based on Azure Synapse.

## Running the App

1. Create a new stack:

    ```bash
    $ pulumi stack init dev
    ```

1. Create a Python virtualenv, activate it, and install dependencies:

   This installs the dependent packages [needed](https://www.pulumi.com/docs/intro/concepts/how-pulumi-works/) for our Pulumi program.

    ```bash
    $ python3 -m venv venv
    $ source venv/bin/activate
    $ pip3 install -r requirements.txt
    ```
   
1. Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```bash
    $ az login
    ```

1. Set the Azure region location to use:
    
    ```
    $ pulumi config set azure-native:location westus2
    ```

1. Set the user ID to grant access to (e.g., your current user):
    
    ```
    $ pulumi config set userObjectId $(az ad signed-in-user show --query=objectId | tr -d '"')
    ```

1. Run `pulumi up` to preview and deploy changes:

    ```bash
    $ pulumi up
    Previewing changes:
    ...

    Performing changes:
    ...
    Resources:
        + 13 created

    Duration: 10m53s
    ```

1. Navigate to https://web.azuresynapse.net and sign in to your new workspace.

