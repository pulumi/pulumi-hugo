---
title: "Azure Kubernetes Service (AKS) Cluster"
meta_desc: ""
metadata:
  id: azure-fs-aks
  title: "Azure Kubernetes Service (AKS) Cluster"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-fs-aks
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example creates an AKS cluster in Azure using TypeScript. It deploys several components including storage, endpoints and a service principal for authentication. It sets up an Azure File Storage account and mounts it as a persistent volume to both the Kubernetes master and nodes. It serves as a use case for creating and configuring resources on the cloud using a programming language."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/classic-azure-fs-aks/README.md)

# Azure Kubernetes Service (AKS) Cluster

Stands up an [Azure Kubernetes Service](https://azure.microsoft.com/en-us/services/kubernetes-service/) (AKS) cluster.

## Prerequisite

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
2. [Install .NET Core 3.1+](https://dotnet.microsoft.com/download)
3. [Install Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)

Configure the environment:

```bash
$ pulumi config set azure:location westeurope
$ az login
```

## Deploying the App (short version)

To make it easier to try out you can use the available [Makefile](Makefile), like:

```bash
$ make deploy
```

This will build the project and run `pulumi up -y`. If you haven't created a stack you will be prompted to do so.


When the deploy is finished you can export the kubernetes config by running

```bash
$ make exportconfig
```

With the config exported you can now test to access the kubernetes cluster

```bash
$ KUBECONFIG=./kubeconfig.yaml kubectl get nodes
```

If you want to cleanup when you are done you can run

```bash
$ make destroy
$ make rmstack
```

To list all make targets run

```bash
$ make help
```

The [Makefile](Makefile) also works as documentation on what commands you need to run to deploy the application.

## Deploying the app (native version)

If you don't have make installed you will have to run the "native" commands. To deploy you run 

```bash
$ pulumi up --yes
```

This will prompt you to create a stack if you haven't done so already. When the deploy is ready you can export the kubernetes config with

```bash
$ pulumi stack output kubeconfig --show-secrets > kubeconfig.yaml
```

and then test the deployment with

```bash
$ KUBECONFIG=./kubeconfig.yaml kubectl get nodes
```

If you want to cleanup the cloud resources when you are done you can run

```bash
$ pulumi destroy -y
$ pulumi stack rm -y
```

