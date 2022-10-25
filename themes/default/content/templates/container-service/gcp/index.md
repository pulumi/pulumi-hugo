---
title: Container Service on Google Cloud
layout: template

# Make sure this is description accurate for this template.
meta_desc: The Container Service template makes it easy to deploy a container service on Google Cloud with Pulumi and Google Cloud Run.

# Be sure to replace this image. Figma source file:
# https://www.figma.com/file/lGrSpwbGGmbixEuewMbtkh/Template-Architecture-Diagrams?node-id=15%3A196
meta_image: meta.png

# Appears on the cards on template-overview pages.
card_desc: Deploy a container service on Google Cloud with Pulumi and Google Cloud Run.

# Used for generating language-specific CLI commands and links to the templates repo on GitHub.
template:
  prefix: container-gcp
  dirname: my-container-service
  languages:
    - typescript
    - python
    - go
    - csharp

# Used for generating links to sibling templates in the right-hand nav. Slug is this template's parent directory.
cloud:
  name: Google Cloud
  slug: gcp

# The content below is meant help you get started and to serve as a guide to work by. Feel free to adjust it needed for your template.
---

The Container Service template creates an infrastructure as code project in your favorite language that deploys a container service to Google Cloud. You can then use the container service to build your own containerized application. The architecture includes [Google Cloud Run]({{< relref "/registry/packages/gcp/api-docs/cloudrun" >}}) for running containers on serverless compute and Artifact Registry for storing container images. The template generates a complete infrastructure project with example app content, providing you with a working project out of the box that you can customize easily and extend to suit your needs.

![An architecture diagram of the Pulumi Google Cloud Container Service template](./architecture.png)

## Using this template

To use this template to deploy your own container service, make sure you've [installed Pulumi]({{< relref "/docs/get-started/install" >}}) and [configured your Google Cloud credentials]({{< relref "/registry/packages/gcp/installation-configuration#credentials" >}}), then create a new [project]({{< relref "/docs/intro/concepts/project" >}}) using the template in your language of choice:

{{< templates/pulumi-new >}}

Follow the prompts to complete the new-project wizard. When it's done, you'll have a complete Pulumi project that's ready to deploy and configured with the most common settings. Feel free to inspect the code in {{< langfile >}} for a closer look.

## Deploying the project

You must supply an existing project ID and choose a region before deploying the container service. You can input both through the new-project wizard. The template requires no additional configuration. Once the new project is created, you can deploy it immediately with [`pulumi up`]({{< relref "/docs/reference/cli/pulumi_up" >}}):

```bash
$ pulumi up
```

When the deployment completes, Pulumi exports the following [stack output]({{< relref "/docs/intro/concepts/stack#outputs" >}}) values:

url
: The HTTP URL of your Cloud Run service.

Output values like these are useful in many ways, most commonly as inputs for other stacks or related cloud resources. The computed `url`, for example, can be used from the command line to open the newly deployed container in your favorite web browser:

```bash
$ open $(pulumi stack output url)
```

## Customizing the project

Projects created with the Container Service template expose the following [configuration]({{< relref "/docs/intro/concepts/config" >}}) settings:

container_port
: Specifies the port mapping for the container service. Defaults to port `8080`.

cpu
: Specifies the amount of CPU to use with each container instance. Defaults to `1` CPU.

memory
: Specifies the amount of memory to use with each container instance. Defaults to `1Gi`.

concurrency
: The maximum concurrent requests that can be received by a container instance. Defaults to `50`.

imageName
: The name of the container image deployed to your Cloud Run service. Defaults to `my-app`.

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

Congratulations! You're now well on your way to managing a production-grade container service on Google Cloud with Pulumi --- and there's lots more you can do from here:

* Discover more architecture templates in [Templates &rarr;]({{< relref "/templates" >}})
* Dive into the Google Cloud (Classic) package by exploring the [API docs in the Registry &rarr;]({{< relref "/registry/packages/gcp" >}})
* Expand your understanding of how Pulumi works in [Learn Pulumi &rarr;]({{< relref "/learn" >}})
* Read up on the latest new features [in the Pulumi Blog &rarr;](/blog/tag/containers)
