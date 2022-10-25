---
title: Container Service on Azure
layout: template

meta_desc: The Container Service template makes it easy to deploy a container service on Azure with Pulumi and Azure Container Instances (ACI).
meta_image: meta.png
card_desc: Deploy a container service on Azure with Pulumi and Azure Container Instances.

# Used for generating language-specific CLI commands and links to the templates repo on GitHub.
template:
  prefix: container-azure
  dirname: my-container-service
  languages:
    - typescript
    - python
    - go
    - csharp

# Used for generating links to sibling templates in the right-hand nav. Slug is this template's parent directory.
cloud:
  name: Microsoft Azure
  slug: Azure

# The content below is meant help you get started and to serve as a guide to work by. Feel free to adjust it needed for your template.
---

The Container Service template creates an infrastructure as code project in your favorite language that deploys a container service to Azure. You can then use the container service to build your own containerized application. The architecture includes [Azure Container Instances (ACI)]({{< relref "/registry/packages/azure-native/api-docs/containerinstance" >}}) for running containers on serverless compute and an [Azure Container Registry]({{< relref "/registry/packages/azure-native/api-docs/containerregistry" >}}) that stores the container image. The template generates a complete infrastructure project with example app content, providing you with a working project out of the box that you can customize easily and extend to suit your needs.

![An architecture diagram of the Pulumi Azure Container Service template](./architecture.png)

## Using this template

To use this template to deploy your own container service, make sure you've [installed Pulumi]({{< relref "/docs/get-started/install" >}}) and [configured your Azure credentials]({{< relref "/registry/packages/azure/installation-configuration#credentials" >}}), then create a new [project]({{< relref "/docs/intro/concepts/project" >}}) using the template in your language of choice:

{{< templates/pulumi-new >}}

Follow the prompts to complete the new-project wizard. When it's done, you'll have a complete Pulumi project that's ready to deploy and configured with the most common settings. Feel free to inspect the code in {{< langfile >}} for a closer look.

## Deploying the project

The template requires no additional configuration. Once the new project is created, you can deploy it immediately with [`pulumi up`]({{< relref "/docs/reference/cli/pulumi_up" >}}):

```bash
$ pulumi up
```

When the deployment completes, Pulumi exports the following [stack output]({{< relref "/docs/intro/concepts/stack#outputs" >}}) values:

hostname
: The host name of the container group.

ip
: The public IP address of the container group.

url
: The HTTP URL of the container group.

Output values like these are useful in many ways, most commonly as inputs for other stacks or related cloud resources. The computed `url`, for example, can be used from the command line to open the newly deployed container in your favorite web browser:

```bash
$ open $(pulumi stack output url)
```

## Customizing the project

Projects created with the Container Service template expose the following [configuration]({{< relref "/docs/intro/concepts/config" >}}) settings:

container_port
: Specifies the port mapping for the container. Defaults to port `80`.

cpu
: Specifies the amount of CPU to use with each container group. Defaults to `1` CPU.

memory
: Specifies the amount of memory to use with each container group. Defaults to `2` GB.

imageName
: The name of the container image deployed to your container group. Defaults to `my-app`.

imageTag
: The tag assigneed to the container image deployed to your container group. Defaults to `latest`.

appPath
: Specifies the location of the Dockerfile used to build the container image that is run. Defaults to the `./app` folder, which contains a "Hello World" example app.

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

Congratulations! You're now well on your way to managing a production-grade container service on Azure with Pulumi --- and there's lots more you can do from here:

* Discover more architecture templates in [Templates &rarr;]({{< relref "/templates" >}})
* Dive into the Azure Native package by exploring the [API docs in the Registry &rarr;]({{< relref "/registry/packages/azure-native" >}})
* Expand your understanding of how Pulumi works in [Learn Pulumi &rarr;]({{< relref "/learn" >}})
* Read up on the latest new features [in the Pulumi Blog &rarr;](/blog/tag/containers)
