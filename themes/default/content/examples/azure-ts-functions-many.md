---
title: "Azure Functions in All Supported Languages"
meta_desc: ""
metadata:
  id: azure-ts-functions-many
  title: "Azure Functions in All Supported Languages"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-ts-functions-many
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example is a TypeScript project that creates serverless functions on Microsoft Azure. It creates multiple Function Apps and deploys serverless functions inside of them. It uses Azure and TypeScript to serve as a general cloud-computing use case. Specifically, it helps to show how to use Pulumi to quickly create Function Apps and deploy many serverless functions in an automated way."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-ts-functions-many/README.md)

# Azure Functions in All Supported Languages

Azure Functions created from raw deployment packages in all supported languages.

.NET and Java are precompiled languages, and the deployment artifact contains compiled binaries. You will need the following tools to build these projects:

- [.NET Core SDK](https://dotnet.microsoft.com/download) for the .NET Function App
- [Apache Maven](https://maven.apache.org/) for the Java Function App

Please remove the corresponding resources from the program in case you don't need those runtimes.

## Running the App

1.  Build and publish the .NET Function App project:

    ```
    $ dotnet publish dotnet
    ```

1.  Build and publish the Java Function App project:

    ```
    $ mvn clean package -f java
    ```

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

1.  Configure the location to deploy the resources to:

    ```
    $ pulumi config set azure-native:location <location>
    ```

1.  Run `pulumi up` to preview and deploy changes:

    ```
    $ pulumi up
    Previewing update (dev):
    ...

    Updating (dev):
    ...
    Resources:
        + 20 created
    Duration: 2m42s
    ```

1.  Check the deployed function endpoints:

    ```
    $ pulumi stack output dotnetEndpoint
    https://http-dotnet1a2d3e4d.azurewebsites.net/api/HelloDotnet?name=Pulumi
    $ curl "$(pulumi stack output dotnetEndpoint)"
    Hello from .NET, Pulumi
    ```

