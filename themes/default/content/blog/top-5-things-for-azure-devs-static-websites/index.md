---
title: "Top 5 an Azure Developer Needs to Know: Static Websites"
date: 2021-08-09
meta_desc: "Building and deploying static websites with Azure"
meta_image: meta.png
authors:
    - sophia-parafina
tags:
    - azure
    - static websites
---

Static web applications are a popular way to publish websites. There are many reasons for adopting static web applications, including speed, security, version control, scalability, and reduced cost.

This article goes into depth about the two types of static web applications that Azure offers. The first uses Azure Blob Storage to serve static data. The second method is Azure Static Web Apps which is follows the pattern of [Jamstack](https://jamstack.org) applications that use a static website generator integrated with source control that publishes to a [Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network). We'll take an in-depth look at both methods and consider the pros and cons of each.

<!--more-->

## Static Websites with Azure Storage

Hosting a static website on Azure Store is good option for serving web content without a web server. You can upload HTML, CSS, images, and JavaScript to an Azure storage container named $web. Because the content is in a storage container, you can also use other PaaS services like Azure Functions or Azure CDN.

### Azure Portal

Let's get started using the Azure Portal.

**Step 1**: Create a storage account (optional if you have an existing storage account)

In the Azure Portal navigate to `Storage accounts` and follow the defaults.

![Storage accounts](./image5.png)

**Step 2**: In the `Storage account`, select `Static website` under `Data management`

![Static website](./image2.png)

`Enable` the `Static website` and enter values for the `Index document` and `Error document` and `Save`.

![Enable static website](./image4.png)

**Step 3**: Upload files

Here are example files to upload or you can use your own.

index.html

```html
<html>
  <body>
    <h1>This file is served from Blob Storage (courtesy of Pulumi!)</h1>
  </body>
</html>
```

404.html

```html
<html>
  <body>
    <h1>That's a 404! Still, from the Blob Storage.</h1>
  </body>
</html>
```

We'll use `Storage Explorer (preview)` and select `BLOB CONTAINERS` then `$web`. In the `Upload blob` pane add the `index.html` and `404.html` files and click on `Upload`.

![Storage explorer](./image1.png)

**Step 4**: Get the URL

Click on `Static website` in the overview pane and the URL is the `Primary endpoint`.

![Endpoint](./image3.png)

### Build and deploy a static website with code

We can repeat the same process using a programming language. The process includes:

- Create a storage account
- Enable `Static website`
- Upload files
- Configure and publish endpoints

We can reproduce this process in code with C#, Go, Python, Typescript, or in any of the languages Pulumi supports. Let's step through the code.

**Step 1**: Create a `Resource group` and `Storage account`.

{{< chooser language "csharp,go,python,typescript" >}}

    {{% choosable language "csharp" %}}

            var resourceGroup = new Resources.ResourceGroup("resourceGroup");

            var storageAccount = new Storage.StorageAccount("storageaccount", new Storage.StorageAccountArgs
            {
                Kind = Storage.Kind.StorageV2,
                ResourceGroupName = resourceGroup.Name,
                Sku = new Storage.Inputs.SkuArgs
                {
                    Name = Storage.SkuName.Standard_LRS,
                },
            });

    {{% /choosable %}}
    {{% choosable language "go" %}}


        pulumi.Run(func(ctx *pulumi.Context) error {
            resourceGroup, err := resources.NewResourceGroup(ctx, "website-rg", nil)
            if err != nil {
                return err
            }

            storageAccount, err := storage.NewStorageAccount(ctx, "sa", &storage.StorageAccountArgs{
                ResourceGroupName: resourceGroup.Name,
                Kind:              storage.KindStorageV2,
                Sku: &storage.SkuArgs{
                    Name: storage.SkuName_Standard_LRS,
                },
            })
            if err != nil {
                return err
            }

    {{% /choosable %}}
    {{% choosable language "python" %}}

    resource_group = resources.ResourceGroup("resourceGroup")

    storage_account = storage.StorageAccount(
        "storageaccount",
        access_tier=storage.AccessTier.HOT,
        enable_https_traffic_only=True,
        encryption=storage.EncryptionArgs(
            key_source=storage.KeySource.MICROSOFT_STORAGE,
            services=storage.EncryptionServicesArgs(
                blob=storage.EncryptionServiceArgs(
                    enabled=True,
                ),
                file=storage.EncryptionServiceArgs(
                    enabled=True,
                ),
            ),
        ),
        kind=storage.Kind.STORAGE_V2,
        network_rule_set=storage.NetworkRuleSetArgs(
            bypass=storage.Bypass.AZURE_SERVICES,
            default_action=storage.DefaultAction.ALLOW,
        ),
        resource_group_name=resource_group.name,
        sku=storage.SkuArgs(
            name=storage.SkuName.STANDARD_LRS,
        ))

    {{% /choosable %}}
    {{% choosable language "typescript" %}}

    const resourceGroup = new resources.ResourceGroup("resourceGroup");

    const storageAccount = new storage.StorageAccount("storageaccount", {
        enableHttpsTrafficOnly: true,
        kind: storage.Kind.StorageV2,
        resourceGroupName: resourceGroup.name,
        sku: {
            name: storage.SkuName.Standard_LRS,
        },
    });

    {{% /choosable %}}
{{< /chooser >}}

**Step 2**: Enable static website.

{{< chooser language "csharp,go,python,typescript" >}}

    {{% choosable language "csharp" %}}

    // Enable static website support
    var staticWebsite = new Storage.StorageAccountStaticWebsite("staticWebsite", new Storage.StorageAccountStaticWebsiteArgs
    {
        AccountName = storageAccount.Name,
        ResourceGroupName = resourceGroup.Name,
        IndexDocument = "index.html",
        Error404Document = "404.html",
    });

    {{% /choosable %}}
    {{% choosable language "go" %}}

    // Enable static website support
    staticWebsite, err := storage.NewStorageAccountStaticWebsite(ctx, "staticWebsite", &storage.StorageAccountStaticWebsiteArgs{
        AccountName:       storageAccount.Name,
        ResourceGroupName: resourceGroup.Name,
        IndexDocument:     pulumi.String("index.html"),
        Error404Document:  pulumi.String("404.html"),
    })
    if err != nil {
        return err
    }

    {{% /choosable %}}
    {{% choosable language "python" %}}

    # Enable static website support
    static_website = storage.StorageAccountStaticWebsite(
        "staticWebsite",
        account_name=storage_account.name,
        resource_group_name=resource_group.name,
        index_document="index.html",
        error404_document="404.html")


    {{% /choosable %}}
    {{% choosable language "typescript" %}}

    // Enable static website support
    const staticWebsite = new storage.StorageAccountStaticWebsite("staticWebsite", {
        accountName: storageAccount.name,
        resourceGroupName: resourceGroup.name,
        indexDocument: "index.html",
        error404Document: "404.html",
    });

    {{% /choosable %}}
{{< /chooser >}}

**Step 3**: Upload content

{{< chooser language "csharp,go,python,typescript" >}}

    {{% choosable language "csharp" %}}

    var index_html = new Storage.Blob("index.html", new Storage.BlobArgs
    {
        ResourceGroupName = resourceGroup.Name,
        AccountName = storageAccount.Name,
        ContainerName = staticWebsite.ContainerName,
        Source = new FileAsset("./wwwroot/index.html"),
        ContentType = "text/html",
    });
    var notfound_html = new Storage.Blob("404.html", new Storage.BlobArgs
    {
        ResourceGroupName = resourceGroup.Name,
        AccountName = storageAccount.Name,
        ContainerName = staticWebsite.ContainerName,
        Source = new FileAsset("./wwwroot/404.html"),
        ContentType = "text/html",
    });

    {{% /choosable %}}
    {{% choosable language "go" %}}

    // Upload the files
    _, err = storage.NewBlob(ctx, "index.html", &storage.BlobArgs{
        ResourceGroupName: resourceGroup.Name,
        AccountName:       storageAccount.Name,
        ContainerName:     staticWebsite.ContainerName,
        Source:            pulumi.NewFileAsset("./wwwroot/index.html"),
        ContentType:       pulumi.String("text/html"),
    })
    if err != nil {
        return err
    }
    _, err = storage.NewBlob(ctx, "404.html", &storage.BlobArgs{
        ResourceGroupName: resourceGroup.Name,
        AccountName:       storageAccount.Name,
        ContainerName:     staticWebsite.ContainerName,
        Source:            pulumi.NewFileAsset("./wwwroot/404.html"),
        ContentType:       pulumi.String("text/html"),
    })
    if err != nil {
        return err
    }

    {{% /choosable %}}
    {{% choosable language "python" %}}

    # Upload the files
    index_html = storage.Blob(
        "index_html",
        resource_group_name=resource_group.name,
        account_name=storage_account.name,
        container_name=static_website.container_name,
        source=pulumi.FileAsset("./wwwroot/index.html"),
        content_type="text/html")
    notfound_html = storage.Blob(
        "notfound_html",
        resource_group_name=resource_group.name,
        account_name=storage_account.name,
        container_name=static_website.container_name,
        source=pulumi.FileAsset("./wwwroot/404.html"),
        content_type="text/html")

    {{% /choosable %}}
    {{% choosable language "typescript" %}}

    // Upload the files
    ["index.html", "404.html"].map(name =>
        new storage.Blob(name, {
            resourceGroupName: resourceGroup.name,
            accountName: storageAccount.name,
            containerName: staticWebsite.containerName,
            source: new pulumi.asset.FileAsset(`./wwwroot/${name}`),
            contentType: "text/html",
        }),
    );

    {{% /choosable %}}
{{< /chooser >}}

**Step 4**: Configure and publish endpoints.

{{< chooser language "csharp,go,python,typescript" >}}

    {{% choosable language "csharp" %}}

    // Web endpoint to the website
    this.StaticEndpoint = storageAccount.PrimaryEndpoints.Apply(primaryEndpoints => primaryEndpoints.Web);

    // (Optional) Add a CDN in front of the storage account.
    var profile = new Cdn.Profile("profile", new Cdn.ProfileArgs
    {
        ResourceGroupName = resourceGroup.Name,
        Location = "global",
        Sku = new Cdn.Inputs.SkuArgs
        {
            Name = Cdn.SkuName.Standard_Microsoft,
        },
    });

    var endpointOrigin = storageAccount.PrimaryEndpoints.Apply(pe => pe.Web.Replace("https://", "").Replace("/", ""));


    [Output("staticEndpoint")]
    public Output<string> StaticEndpoint { get; set; }
    }

    {{% /choosable %}}
    {{% choosable language "go" %}}

    endpointOrigin := storageAccount.PrimaryEndpoints.Web().ApplyT(func(endpoint string) string {
        endpoint = strings.ReplaceAll(endpoint, "https://", "")
        endpoint = strings.ReplaceAll(endpoint, "/", "")
        return endpoint
    }).(pulumi.StringOutput)

    // Web endpoint to the website
    ctx.Export("staticEndpoint", storageAccount.PrimaryEndpoints.Web())

    }

    {{% /choosable %}}
    {{% choosable language "python" %}}

    endpoint_origin = storage_account.primary_endpoints.apply(
        lambda primary_endpoints: primary_endpoints.web.replace("https://", "").replace("/", ""))

    # Web endpoint to the website
    pulumi.export("staticEndpoint", storage_account.primary_endpoints.web)

    {{% /choosable %}}
    {{% choosable language "typescript" %}}

    // Web endpoint to the website
    export const staticEndpoint = storageAccount.primaryEndpoints.web;

    {{% /choosable %}}
{{< /chooser >}}

The complete examples for [C#](https://github.com/pulumi/examples/tree/master/azure-cs-static-website),[Go](https://github.com/pulumi/examples/blob/master/azure-go-static-website/),[Python](https://github.com/pulumi/examples/blob/master/azure-py-static-website/), and [Typescript](https://github.com/pulumi/examples/blob/master/azure-ts-static-website/index.ts) are on Github.

## Azure Static Web Apps

Azure Static Web Apps (SWA) builds and deploys web apps from a code repository. Azure works directly with Githu or Azure Devops to watch a branch on your repository. When you push a commit or accept a pull request, your app is built and deployed to Azure. When you build web apps with SWA, your static assets are deployed to a CDN that serves files from geographically distributed points.

Static web apps can be built with popular frameworks that don't require server-side rendering, such as React, Angular, and Vue. A web applications typically include HTML, JavaScript, images, and CSS. In addition to these assets, you can create API endpoints hosted in an Azure Function.

The key things to remember with SWAs is that your application is built from a repo

Let's jump into Azure Static Web Apps!

### Build and deploy

**Step 1**: Push your web application to Github.

Azure provides a template for generating web applications. Click on this [link](https://github.com/login?return_to=%2Fstaticwebdev%2Freact-basic%2Fgenerate) to generate a React application.

![Generate app from template](./react-basic.png)

Clone the repository.

```bash
$ git clone https://github.com/spara/bookish-doodle.git
```

**Step 2**: Create a web app with Visual Studio (VS) Code

Open your repository with VS Code and activate the [Azure extension](https://code.visualstudio.com/docs/azure/extensions). On `APP SERVICE`item, click on the `+` to create a web app.

![Create web app](./APP_SERVICE.png)

Follow the prompts:

- Create a unique name
- Select a runtime (Node 14 LTS)
- Select a pricing tier (Free)

**Step 3**: Deploy

![Deploy](./deploy.png)

- Select your repository to deploy

![Deploy completed](./deploy_completed.png)

**Step 4**: View your app and make changes

![Website](./site.png)

Edit `./src/app.js` and change *World* to *Happy People.*

```javascript
function App() {
  const value = 'Happy People';
  return <div>Hello {value}</div>;
}
```

Add, commit, and push your change.

```bash
$ git add .
$ git commit -m 'change message'
[main d1dd7e1] change message
 1 file changed, 1 insertion(+), 1 deletion(-)
 $ git push
```

### Build and deploy with code and Pulumi





- Push your app code to Github.
- Sign-in to the Azure Portal, search for “Static Web App”, and select the Create button.
- Fill out the form, sign-in to Github, and select your repository and branch.
- Define where your app, APIs, and build output are located.
- Select the Create button and watch the magic happen!
- View your static web app.
