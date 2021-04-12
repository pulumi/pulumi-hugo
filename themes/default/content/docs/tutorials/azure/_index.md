---
title: "Azure Tutorials and Examples"
meta_desc: A collection of tutorials that highlight complete end-to-end scenarios when
           using the Azure platform.
linktitle: "Azure"
menu:
  userguides:
    parent: tutorials
    identifier: tutorials-azure

aliases: ["/docs/reference/tutorials/azure/"]
---

The following tutorials highlight the Azure platform using complete end-to-end scenarios:

{{% notes type="info" %}}
If this is your first time using Pulumi with Azure, try <a href="{{< relref "/docs/get-started/azure" >}}">Get Started with Azure</a> first.
{{% /notes %}}

<div class="md:flex flex-row mt-6 mb-6">
    <div class="w-1/2 border-solid border-t-2 border-gray-200">
        <h3 class="no-anchor pt-4">
            <i class="fas fa-boxes pr-2"></i>
            <a href="{{< relref "appservice-docker" >}}" style="color: #4387c7">
                Azure App Service
            </a>
        </h3>
        <p>
            Build and deploy a containerized application
            using Azure Container Registry and Azure App Service.
        </p>
    </div>
        <div class="w-1/2 border-solid ml-4 border-t-2 border-gray-200">
        <h3 class="no-anchor pt-4">
            <i class="fas fa-boxes pr-2"></i>
            <a href="{{< relref "aci-webserver" >}}" style="color: #4387c7">
                Azure Container Instances
            </a>
        </h3>
        <p>
            Deploy a containerized web server using Azure Container Instances.
        </p>
    </div>
</div>
<div class="md:flex flex-row mt-6 mb-6">
    <div class="w-1/2 border-solid border-t-2 border-gray-200">
        <h3 class="no-anchor pt-4">
            <i class="fab fa-connectdevelop pr-2"></i>
            <a href="{{< relref "aks" >}}" style="color: #4387c7">
                Azure Kubernetes Service
            </a>
        </h3>
        <p>
            Deploy an AKS cluster and set credentials to manage access to the cluster.
        </p>
    </div>
    <div class="w-1/2 border-solid ml-4 border-t-2 border-gray-200">
        <h3 class="no-anchor pt-4">
            <i class="fas fa-server pr-2"></i>
            <a href="{{< relref "aks-helm" >}}" style="color: #4387c7">
                AKS with Helm
            </a>
        </h3>
        <p>
            Deploy an AKS cluster using a Helm Chart.
        </p>
    </div>
</div>
<div class="md:flex flex-row mt-6 mb-6">
    <div class="w-full border-solid border-t-2 border-gray-200">
        <h3 class="no-anchor pt-4">
            <i class="fas fa-globe pr-2"></i>
            <a href="{{< relref "aks-cluster" >}}" style="color: #4387c7">
                Multiple Azure Kubernetes Service (AKS) cluster deployments
            </a>
        </h3>
        <p>
            Create multiple Azure Kubernetes Service (AKS) clusters in different regions and with different node counts.
        </p>
    </div>
</div>

## Code Examples

The following code examples from the [Pulumi Examples repo](https://github.com/pulumi/examples) demonstrate how to use Pulumi for a variety of Azure use cases. Basic setup and deployment instructions are provided.

{{< chooser language "typescript,python,go,csharp" / >}}
{{< tutorials-index-azure >}}

If you'd like to see a new tutorial or example, please [request one](
https://github.com/pulumi/pulumi-hugo/issues/new?title=New%20Azure%20Tutorial%20Request) or [here](https://github.com/pulumi/examples/issues/new?title=New%20Azure%20Example%20Request).
Pull requests are also welcome!
