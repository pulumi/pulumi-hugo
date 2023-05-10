---
title: "Azure App Service Running Docker Containers on Linux"
meta_desc: ""
metadata:
  id: azure-py-appservice-docker
  title: "Azure App Service Running Docker Containers on Linux"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/azure-py-appservice-docker
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example deploys a Docker container image hosted on an Azure App Service on a Linux Web App, using the Python SDK. This example showcases how to use Pulumi to create and manage web applications on the Azure cloud provider. It also instructs users on storing secrets in Key Vault. Pulumi is used to do the work of provisioning and configuring the resources on Azure using the Python programming language. The example serves a general cloud-computing use case of deploying a website with a Docker container image to a Linux Web App."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/azure-py-appservice-docker/README.md)

# Azure App Service Running Docker Containers on Linux

Starting point for building a web application hosted in Azure App Service from Docker images.

The example shows two scenarios:

- Deploying an existing image from Docker Hub
- Deploying a new custom registry in Azure Container Registry, building a custom Docker image, and running the image from the custom registry

## Running the App

1. Create a new stack:

    ```bash
    $ pulumi stack init dev
    ```

1. Login to Azure CLI (you will be prompted to do this during deployment if you forget this step):

    ```bash
    $ az login
    ```
   
1. Create a Python virtualenv, activate it, and install dependencies:

   This installs the dependent packages [needed](https://www.pulumi.com/docs/intro/concepts/how-pulumi-works/) for our Pulumi program.

    ```bash
    $ python3 -m venv venv
    $ source venv/bin/activate
    $ pip3 install -r requirements.txt
    ```

1. Specify the Azure location to use:

    ```bash
    $ pulumi config set azure-native:location WestUS
    ```

1. Run `pulumi up` to preview and deploy changes:

    ```bash
    $ pulumi up
    Previewing changes:
    ...

    Performing changes:
    ...
    Resources:
        + 8 created

    Duration: 56s
    ```

1. Check the deployed endpoints:

    ```bash
    $ pulumi stack output helloEndpoint
    http://hello-app91dfea21.azurewebsites.net/hello
    $ curl "$(pulumi stack output helloEndpoint)"
    Hello, world!
    
    $ pulumi stack output getStartedEndpoint
    http://get-started-15da13.azurewebsites.net
    $ curl "$(pulumi stack output getStartedEndpoint)"
    <html>
    <body>
    <h1>Your custom docker image is running in Azure App Service!</h1>
    </body>
    </html>
    ```

