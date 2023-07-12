---
title: "Globally Distributed Serverless URL Shortener Using Azure Functions and Cosmos DB"
meta_desc: ""
metadata:
  id: azure-ts-serverless-url-shorterner-global
  title: "Globally Distributed Serverless URL Shortener Using Azure Functions and Cosmos DB"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-ts-serverless-url-shorterner-global
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example creates a global URL shortener solution on Azure using TypeScript. It provides a serverless experience with two microservices, allowing users to generate short URLs as well as redirect short URLs to their original links. Resources used include Azure App Service, SQL database, Cosmos DB, with Azure Functions providing the solution&#x27;s logic. It serves as an example of how to build highly available, cost effective solutions on the Azure cloud."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/classic-azure-ts-serverless-url-shortener-global/README.md)

# Globally Distributed Serverless URL Shortener Using Azure Functions and Cosmos DB

Multi-region deployment of Azure Functions and Cosmos DB with Traffic Manager

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

1.  Specify the Azure regions to deploy the application:

    ```
    $ pulumi config set locations westus,westeurope
    ```

1.  Run `pulumi up` to preview and deploy changes:

    ``` 
    $ pulumi up
    Previewing changes:
    ...

    Performing changes:
    ...
    info: 23 changes performed:
        + 23 resources created
    Update duration: 21m33.3252322s
    ```

1.  Add a short URL:

    ```
    $ pulumi stack output addEndpoint
    https://urlshort-add94ac80f8.azurewebsites.net/api/urlshort-add
    $ curl -H "Content-Type: application/json" \
        --request POST \
        -d '{"id":"pulumi","url":"https://pulumi.com"}' \
        "$(pulumi stack output addEndpoint)"    
    Short URL saved
    ```

1.  Query a short URL:

    ```
    $ pulumi stack output endpoint
    http://urlshort-tm.trafficmanager.net/api/
    $ curl -L $(pulumi stack output endpoint)pulumi
    <!doctype html>
    <html lang="en-US" prefix="og: http://ogp.me/ns#">
        <head>
        <title>
            Pulumi
        </title>
    ...
    ```

