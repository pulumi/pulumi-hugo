---
title: "Azure Synapse Workspace and Pools"
meta_desc: ""
metadata:
  id: azure-cs-synapse
  title: "Azure Synapse Workspace and Pools"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-cs-synapse
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example deploys a serverless analytics solution on Microsoft Azure using TypeScript. It creates an Azure Synapse Analytics data warehouse and a Spark pool, as well as several related resources such as a network, storage accounts, and an Azure SQL server. The example also creates Azure Data Factory pipelines to move data between the data warehouse and the Spark pool. The end result is a serverless analytics platform that can handle data ingestion and analytics."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-cs-synapse/README.md)

# Azure Synapse Workspace and Pools

Starting point for enterprise analytics solutions based on Azure Synapse.

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

