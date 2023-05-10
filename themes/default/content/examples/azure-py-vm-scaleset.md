---
title: "Azure VM Scale Sets"
meta_desc: ""
metadata:
  id: azure-py-vm-scaleset
  title: "Azure VM Scale Sets"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-py-vm-scaleset
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example creates an Azure virtual machine scale set with a load balancer in Python. It uses the Azure cloud provider and Python programming language to deploy multi-machine compute clusters that can easily be scaled up or down as needed. It is designed to serve the cloud-computing use case of quickly provisioning groups of virtual machines to save time and cost in easily managing deployments."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/classic-azure-py-vm-scaleset/README.md)

# Azure VM Scale Sets

This example provisions a Scale Set of Linux web servers with nginx deployed, configured the auto-scaling based on CPU load, puts a Load Balancer in front of them, and gives it a public IP address.

## Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
1. [Configure Pulumi for Azure](https://www.pulumi.com/docs/intro/cloud-providers/azure/setup/)
1. [Configure Pulumi for Python](https://www.pulumi.com/docs/intro/languages/python/)

## Running the App

1. Create a new stack:

    ```bash
    $ pulumi stack init dev
    ```

1. Configure the app deployment.

    ```bash
    $ pulumi config set azure:location westus    # any valid Azure region will do
    ```

    Optionally, configure the username and password for the admin user. Otherwise, they will be auto-generated.

    ```bash
    $ pulumi config set adminUser webmaster
    $ pulumi config set adminPassword <your-password> --secret
    ```

    Note that `--secret` ensures your password is encrypted safely.

1. Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```bash
    $ az login
    ```

1. Run `pulumi up` to preview and deploy changes:

    ```bash
    $ pulumi up
    Previewing update:
    ...

    Updating:
    ...
    Resources:
        13 created
    Update duration: 2m19s
    ```

1. Check the domain name of the PIP:

    ```bash
    $ pulumi stack output publicAddress
    dsuv3vqbgi.westeurope.cloudapp.azure.com
    $ curl http://$(pulumi stack output publicAddress)
    #nginx welcome screen HTML is returned
    ```

