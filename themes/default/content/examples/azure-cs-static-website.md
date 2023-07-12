---
title: "Static Website Using Azure Blob Storage and CDN"
meta_desc: ""
metadata:
  id: azure-cs-static-website
  title: "Static Website Using Azure Blob Storage and CDN"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-cs-static-website
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example creates a static website on Azure using the TypeScript programming language. It sets up an Azure Storage Blob account to contain the site&#x27;s files and configures an Azure Content Delivery Network. It also configures an Azure DNS Zone and Custom Domain to expose the site to clients. By using Pulumi and TypeScript, this example shows how to rapidly create a high-performance, cloud-based static website on the Azure cloud platform."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-cs-static-website/README.md)

# Static Website Using Azure Blob Storage and CDN

This example configures [Static website hosting in Azure Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website).

In addition to the Storage itself, a CDN is configured to serve files from the Blob container origin. This may be useful if you need to serve files via HTTPS from a custom domain (not shown in the example).

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
    $ pulumi config set azure-native:location westus
    ```

1.  Run `pulumi up` to preview and deploy changes:

    ``` 
    $ pulumi up
    Previewing changes:
    ...

    Performing changes:
    ...
    Resources:
        + 9 created
    Duration: 2m52s
    ```

1.  Check the deployed website endpoint:

    ```
    $ pulumi stack output staticEndpoint
    https://websitesbc90978a1.z20.web.core.windows.net/
    $ curl "$(pulumi stack output staticEndpoint)"
    <html>
        <body>
            <h1>This file is served from Blob Storage (courtesy of Pulumi!)</h1>
        </body>
    </html>
    ```

