---
title: "Kubernetes Cluster on Azure"
layout: template

# Make sure this is description accurate for this template.
meta_desc: The Kubernetes Cluster template makes it easy to deploy a Kubernetes cluster on Azure with Pulumi and Azure Kubernetes Service (AKS).

# Appears on the cards on template-overview pages.
card_desc: Deploy a Kubernetes cluster on Azure with Pulumi and Azure Kubernetes Service (AKS).

# Used for generating language-specific links to templates on GitHub. (Example: `static-website-aws`)
template:
    prefix: kubernetes-azure

# Used for generating links to sibling templates in the right-hand nav. Slug is this template's parent directory.
cloud:
  name: Azure
  slug: azure

# Be sure to replace this image. Figma source file:
# https://www.figma.com/file/lGrSpwbGGmbixEuewMbtkh/Template-Architecture-Diagrams?node-id=15%3A196
meta_image: meta.png

# The content below is meant help you get started and to serve as a guide to work by. Feel free to adjust it needed for your template.
---

The Azure Kubernetes Cluster template creates an infrastructure as code project in your favorite language and deploys a managed Kubernetes cluster to Azure. The architecture includes an [Azure Virtual Network]({{< relref "registry/packages/azure-native/api-docs/network/virtualnetwork">}}) with three subnets (set to private by default) and deploys an [Azure Kubernetes Service (AKS) cluster]({{< relref "/registry/packages/azure-native/api-docs/containerservice/managedcluster" >}}) that provides a managed Kubernetes control plane. Kubernetes worker nodes are deployed on private subnets for improved security. The template generates a complete infrastructure as code program to give you a working project out of the box that you can customize easily and extend to suit your needs.

![An architecture diagram of the Pulumi $CLOUD $ARCHITECTURE template](./architecture.png)

## Using this template

To use this template to deploy your own Kubernetes cluster, make sure you've [installed Pulumi]({{< relref "/docs/get-started/install" >}}) and [configured your Azure credentials]({{< relref "/registry/packages/azure/installation-configuration#credentials" >}}), then create a new [project]({{< relref "/docs/intro/concepts/project" >}}) using the template in your language of choice:

{{% chooser language "typescript,python,go,csharp,yaml" / %}}

{{% choosable language typescript %}}

```bash
$ mkdir my-k8s-cluster && cd my-k8s-cluster
$ pulumi new kubernetes-azure-typescript
```

{{% /choosable %}}

{{% choosable language python %}}

```bash
$ mkdir my-k8s-cluster && cd my-k8s-cluster
$ pulumi new kubernetes-azure-python
```

{{% /choosable %}}

{{% choosable language go %}}

```bash
$ mkdir my-k8s-cluster && cd my-k8s-cluster
$ pulumi new kubernetes-azure-go
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
$ mkdir my-k8s-cluster && cd my-k8s-cluster
$ pulumi new kubernetes-azure-csharp
```

{{% /choosable %}}

{{% choosable language yaml %}}

```bash
$ mkdir my-k8s-cluster && cd my-k8s-cluster
$ pulumi new kubernetes-azure-yaml
```

{{% /choosable %}}

Follow the prompts to complete the new-project wizard. When it's done, you'll have a complete Pulumi project that's ready to deploy and configured with the most common settings. Feel free to inspect the code in {{< langfile >}} for a closer look.

## Deploying the project

You must first supply two values before deploying the template. No additional configuration is required.

mgmtGroupId
: The object ID of your existing Azure AD group which will serve as cluster administrator.

sshPubKey
: Contents of your public key which will be used for SSH access to the cluster nodes you will deploy.

Once the new project is created, you can deploy it immediately with [`pulumi up`]({{< relref "/docs/reference/cli/pulumi_up" >}}):

```bash
$ pulumi up
```

When the deployment completes, Pulumi exports the following [stack output]({{< relref "/docs/intro/concepts/stack#outputs" >}}) values:

rgname
: The name of the Azure Resource Group containing the Kubernetes cluster resources.

vnetName
: The name of the Azure Virtual Network used for worker nodes, apps, and workloads.

clusterName
: The name of the AKS cluster.

kubeconfig
: The cluster's kubeconfig file which you can use with `kubectl` to access and communicate with your clusters.

Output values like these are useful in many ways, most commonly as inputs for other stacks or related cloud resources.

## Customizing the project

Projects created with the Kubernetes Cluster template expose the following [configuration]({{< relref "/docs/intro/concepts/config" >}}) settings:

numWorkerNodes
: The number of nodes in your cluster. Defaults to `3`.

kubernetesVersion
: The version of Kubernetes used in your AKS cluster. Defaults to `1.24.3`.

prefixForDns
: The unique DNS prefix for your AKS cluster. Defaults to `pulumi`.

nodeVmSize
: The VM instance type used to run your nodes. Defaults to `Standard_DS2_v2`.

All of these settings are optional and may be adjusted either by editing the stack configuration file directly (by default, `Pulumi.dev.yaml`) or by changing their values with [`pulumi config set`]({{< relref "/docs/reference/cli/pulumi_config_set" >}}) as shown below:

```bash
$ pulumi config set someProp ../some/value
$ pulumi up
```

## Tidying up

You can cleanly destroy the stack and all of its infrastructure with [`pulumi destroy`]({{< relref "/docs/reference/cli/pulumi_destroy" >}}):

```bash
$ pulumi destroy
```

## Learn more

Congratulations! You're now well on your way to managing a production-grade Kubernetes cluster on Azure with Pulumi --- and there's lots more you can do from here:

* Discover more architecture templates in [Templates &rarr;]({{< relref "/templates" >}})
* Dive into the API docs to explore the [Azure Native package &rarr;]({{< relref "/registry/packages/azure-native" >}})
* Expand your understanding of how Pulumi works in [Pulumi Learn &rarr;]({{< relref "/learn" >}})
* Read up on the latest new features [in the Pulumi Blog &rarr;](/blog/tag/kubernetes)
