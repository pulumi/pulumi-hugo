---
title: "Azure Serverless Application"
layout: template

# Make sure this is description accurate for this template.
meta_desc: The Azure Serverless Template makes it easy to deploy a serverless application on Azure with Pulumi, Azure Functions, and Azure Blob Storage.

# Appears on the cards on template-overview pages.
card_desc: Deploy a serverless application on Azure with Pulumi, Azure Functions, and Azure Blob Storage.

# Used for generating language-specific links to templates on GitHub. (Example: `static-website-aws`)
template:
    prefix: serverless-azure

# Used for generating links to sibling templates in the right-hand nav. Slug is this template's parent directory.
cloud:
  name: Azure
  slug: azure

meta_image: meta.png

---

The Serverless Application template creates an infrastructure as code project in your favorite language that deploys a serverless application to Azure. It deploys an [Azure Storage Blob account]({{< relref "/registry/packages/azure-native/api-docs/storage/storageaccount" >}}) that's configured with a [container for static website hosting]({{< relref "/registry/packages/azure-native/api-docs/storage/storageaccountstaticwebsite" >}}) and an [Azure function]({{< relref "/registry/packages/azure-native/api-docs/web/webappfunction" >}}) that runs the business logic, which is written in the same language as the template. The application uses an [App Service plan]({{< relref "/registry/packages/azure-native/api-docs/web/appserviceplan" >}}) by default. The template ships with a placeholder website that displays the current time to give you a working Pulumi project out of the box that you can customize easily and extend to suit your needs.

![An architecture diagram of the Pulumi Azure Serverless Application template](./architecture.png)

## Using this template

To use this template to deploy your own serverless application, make sure you've [installed Pulumi]({{< relref "/docs/get-started/install" >}}) and [configured your Azure credentials]({{< relref "/registry/packages/azure/installation-configuration#credentials" >}}), then create a new [project]({{< relref "/docs/intro/concepts/project" >}}) using the template in your language of choice:

{{% chooser language "typescript,python,go,csharp,yaml" / %}}

{{% choosable language typescript %}}

```bash
$ mkdir my-serverless-app && cd my-serverless-app
$ pulumi new serverless-azure-typescript
```

{{% /choosable %}}

{{% choosable language python %}}

```bash
$ mkdir my-serverless-app && cd my-serverless-app
$ pulumi new serverless-azure-python
```

{{% /choosable %}}

{{% choosable language go %}}

```bash
$ mkdir my-serverless-app && cd my-serverless-app
$ pulumi new serverless-azure-go
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
$ mkdir my-serverless-app && cd my-serverless-app
$ pulumi new serverless-azure-csharp
```

{{% /choosable %}}

Follow the prompts to complete the new-project wizard. When it's done, you'll have a complete Pulumi project that's ready to deploy and configured with the most common settings. Feel free to inspect the code in {{< langfile >}} for a closer look.

## Deploying the project

The template requires no additional configuration. Once the new project is created, you can deploy it immediately with [`pulumi up`]({{< relref "/docs/reference/cli/pulumi_up" >}}):

```bash
$ pulumi up
```

When the deployment completes, Pulumi exports the following [stack output]({{< relref "/docs/intro/concepts/stack#outputs" >}}) values:

siteURL
: The HTTP URL of the static website.

apiURL
: The HTTP URL of the serverless function endpoint.

Output values like these are useful in many ways, most commonly as inputs for other stacks or related cloud resources. The computed `siteURL`, for example, can be used from the command line to open the newly deployed website in your favorite web browser:

```bash
$ open $(pulumi stack output siteURL)
```

## Customizing the project

Projects created with the Serverless Application template expose the following [configuration]({{< relref "/docs/intro/concepts/config" >}}) settings:

sitePath
: The path to the folder containing the files of the website. Defaults to `www`, which is the name (and relative path) of the folder included with the template.

appPath
: The path to the folder containing the serverless functions to be deployed. Defaults to `app`, which is also included with the template.

indexDocument
: The file to use for top-level pages. Defaults to `index.html`.

errorDocument
: The file to use for error pages. Defaults to `error.html`.

All of these settings are optional and may be adjusted either by editing the stack configuration file directly (by default, `Pulumi.dev.yaml`) or by changing their values with [`pulumi config set`]({{< relref "/docs/reference/cli/pulumi_config_set" >}}).

```bash
$ pulumi config set sitePath ../my-existing-website/build
$ pulumi up

## Tidying up

You can cleanly destroy the stack and all of its infrastructure with [`pulumi destroy`]({{< relref "/docs/reference/cli/pulumi_destroy" >}}):

```bash
$ pulumi destroy
```

## Learn more

Congratulations! You're now well on your way to managing a production-grade serverless application on Azure with Pulumi --- and there's lots more you can do from here:

* Discover more architecture templates in [Templates &rarr;]({{< relref "/templates" >}})
* Dive into the Azure Native package by exploring the [API docs in the Registry &rarr;]({{< relref "/registry/packages/azure-native" >}})
* Expand your understanding of how Pulumi works in [Learn Pulumi &rarr;]({{< relref "/learn" >}})
* Read up on the latest new Azure features [in the Pulumi Blog &rarr;](/blog/tag/azure)
