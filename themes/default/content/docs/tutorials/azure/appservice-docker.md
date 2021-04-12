---
title: Azure App Service Running Docker Containers
meta_desc: Tutorial demonstrates how to build and deploy a containerized application using Azure Container Registry and Azure App Service.
---

{{< github-buttons "azure-ts-appservice-docker" "azure-py-appservice-docker" "azure-go-appservice-docker" "azure-cs-appservice-docker" >}}

In this tutorial, you will deploy a new custom registry in Azure Container Registry, build a custom Docker image, and then run the image from the custom registry.

{{< azure-tutorial-prereqs >}}

{{< chooser language "typescript,python,go,csharp" >}}

{{% choosable language "typescript" %}}
{{< install-node >}}
{{% /choosable %}}

{{% choosable language python %}}
{{< install-python >}}
{{% /choosable %}}

{{% choosable language go %}}
{{< install-go >}}
{{% /choosable %}}

{{% choosable language "csharp,fsharp,visualbasic" %}}
{{< install-dotnet >}}
{{% /choosable %}}

{{< /chooser >}}

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

1.  Run `pulumi up` to preview and deploy changes:

    ```
    $ pulumi up
    Previewing changes:
    ...

    Performing changes:
    ...
    Resources:
        + 8 created

    Duration: 56s
    ```

1.  Check the deployed endpoints:

    ```
    $ pulumi stack output HelloEndpoint
    http://hello-app-91dfea.azurewebsites.net/hello
    $ curl "$(pulumi stack output HelloEndpoint)"
    Hello, world!

    $ pulumi stack output GetStartedEndpoint
    http://get-started-15da13.azurewebsites.net
    $ curl "$(pulumi stack output GetStartedEndpoint)"
    <html>
    <body>
    <h1>Your custom docker image is running in Azure App Service!</h1>
    </body>
    </html>
    ```
