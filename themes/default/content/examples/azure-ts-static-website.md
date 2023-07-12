---
title: "Static Website Using Azure Blob Storage and CDN"
meta_desc: ""
metadata:
  id: azure-ts-static-website
  title: "Static Website Using Azure Blob Storage and CDN"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-ts-static-website
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This example from Pulumi is a static website hosted in Azure, written in TypeScript and created with Pulumi for infrastructure as code. It uses a Blob Storage account for hosting the website; an Azure Storage Container for static content; and an Azure CDN endpoint and profile for delivering content. It also configures an Azure Front Door to provide routing and TLS. This example serves the general cloud-computing use case of setting up a static website using the Azure cloud provider."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-ts-static-website/README.md)

# Static Website Using Azure Blob Storage and CDN
Based on https://github.com/zemien/static-website-ARM-template


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

1.  Restore NPM dependencies:

    ```
    $ npm install
    ```

1.  Set the Azure region location to use:

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

