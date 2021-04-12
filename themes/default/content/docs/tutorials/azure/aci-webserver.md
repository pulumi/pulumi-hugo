---
title: Containerized web server using Azure Container Instances
meta_desc: Tutorial demonstrating how to deploy a basic containerized Node.js web server using Azure Container Instances.
---

{{< github-buttons "azure-ts-aci" "azure-py-aci" "azure-go-aci" "azure-cs-aci" >}}

In this tutorial, you will deploy a simple Node.js webserver in a container using [Azure Container Instances](https://azure.microsoft.com/en-us/services/container-instances/#overview). The full code examples for this tutorial are provided through the links above.

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

## Create the project

1. On your local machine, create a project directory, `aci-webserver`, and change into it.
2. Run `pulumi new azure-<language> --name myproject`({{< relref "/docs/reference/cli/pulumi_new" >}}) to create a new project using the AWS template for your chosen language. Replace `myproject` with your desired project name.

{{< chooser language "javascript,typescript,python,csharp" / >}}

{{% choosable language javascript %}}

```bash
$ mkdir webserver && cd webserver
$ pulumi new aws-javascript --name myproject
```

{{% /choosable %}}
{{% choosable language typescript %}}

```bash
$ mkdir webserver && cd webserver
$ pulumi new aws-typescript --name myproject
```

{{% /choosable %}}
{{% choosable language python %}}

```bash
$ mkdir webserver && cd webserver
$ pulumi new aws-python --name myproject
```

{{% /choosable %}}
{{% choosable language csharp %}}

```bash
$ mkdir webserver && cd webserver
$ pulumi new aws-csharp --name myproject
```

{{% /choosable %}}

## Create new ACI group

1.

## Deploy the App

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

        Type                                              Name              Status
    +   pulumi:pulumi:Stack                               azure-cs-aci-dev  created
    +   ├─ azure-native:resources:ResourceGroup           aci-rg            created
    +   └─ azure-native:containerinstance:ContainerGroup  helloworld        created

    Outputs:
        containerIPv4Address: "20.56.239.40"

    Resources:
        + 3 created

    Duration: 1m18s
    ```

1.  Check the deployed endpoints:

    ```
    $ pulumi stack output containerIPv4Address
    13.83.66.37
    $ curl "$(pulumi stack output containerIPv4Address)"
    <html>
    <head>
        <title>Welcome to Azure Container Instances!</title>
    </head>
    ...
    ```
