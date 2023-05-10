---
title: "A SQLServer on Azure PaaS"
meta_desc: ""
metadata:
  id: azure-cs-sqlserver
  title: "A SQLServer on Azure PaaS"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-cs-sqlserver
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example deploys a SQL Azure Database within an Azure Cloud Service. It uses JavaScript to define infrastructure-as-code for provisioning compute, network, and storage resources for the cloud service and database. The example creates an Azure virtual network, public IP address, virtual machine, and cloud service along with a SQL database server and database within the cloud service. The example serves the use case of deploying cloud-computing resources using Infrastructure-as-Code with a common cloud provider and a popular programming language."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-cs-sqlserver/README.md)

# A SQLServer on Azure PaaS

This example configures [An example of a SQLServer on Azure PaaS](https://docs.microsoft.com/en-us/azure/azure-sql/database/logical-servers).

In addition to the server itself, a database is configured

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
    $ pulumi config set azure-native:location westus
    ```

1.  Run `pulumi up` to preview and deploy changes:

    ``` 
    $ pulumi up
    Previewing changes:
    ...

    Performing changes:
    ...
    Resources:
        + 5 created
    Duration: 3m16s
    ```

1.  Check the deployed sql server and database

