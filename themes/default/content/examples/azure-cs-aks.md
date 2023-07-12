---
title: "Azure Kubernetes Service (AKS) Cluster using the native Azure Provider"
meta_desc: ""
metadata:
  id: azure-cs-aks
  title: "Azure Kubernetes Service (AKS) Cluster using the native Azure Provider"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-cs-aks
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example creates a Kubernetes cluster on Microsoft Azure with an ARM template and a custom C# script. It utilizes Azure&#x27;s cloud services while making use of the C# programming language. The example serves the use case of setting up a scalable Kubernetes cluster on Azure with a reliable, low-cost infrastructure. The deployment includes an Azure Active Directory service, VNET, and an App Service Plan. It also involves setting up Application Insights for monitoring, logging, and alerting automated service-level objectives."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-cs-aks/README.md)

# Azure Kubernetes Service (AKS) Cluster using the native Azure Provider

This example deploys an AKS cluster, creates an Azure Active AD application, creates a Service Principal and sets credentials to manage access to the cluster.

## Deploying the App

To deploy your infrastructure, follow the below steps.

### Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
1. [Configure Azure Credentials](https://www.pulumi.com/docs/intro/cloud-providers/azure/setup/)

### Steps

After cloning this repo, from this working directory, run these commands:

1. Create a new stack, which is an isolated deployment target for this example:

    ```bash
    $ pulumi stack init dev
    ```

1.  Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```
    $ az login
    ```
    
1. Set the azure location in which to run the test:
    
    ```
    $ pulumi config set azure-native:location westus2
    ```

1. Stand up the cluster by invoking pulumi

    ```bash
    $ pulumi up
    ```

1. After 3-4 minutes, your cluster will be ready, and the kubeconfig YAML you'll use to connect to the cluster will be available as an output. You can save this kubeconfig to a file like so:

    ```bash
    $ pulumi stack output kubeconfig --show-secrets > kubeconfig.yaml
    ```

    Once you have this file in hand, you can interact with your new cluster as usual via `kubectl`:

    ```bash
    $ KUBECONFIG=./kubeconfig.yaml kubectl get nodes
    ```

1. From there, feel free to experiment. Simply making edits and running `pulumi up` will incrementally update your stack.

1. Once you've finished experimenting, tear down your stack's resources by destroying and removing it:

    ```bash
    $ pulumi destroy --yes
    $ pulumi stack rm --yes
    ```

