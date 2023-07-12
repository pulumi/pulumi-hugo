---
title: "Instance Using Alicloud ECS"
meta_desc: ""
metadata:
  id: alicloud-ts-ecs
  title: "Instance Using Alicloud ECS"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/alicloud-ts-ecs
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example deploys an Elastic Compute Service (ECS) cluster on the Alibaba Cloud using TypeScript. It sets up a domain name and a SSH Keypair, as well as creating a Virtual Private Cloud, Security Groups and Network Interfaces. It is a great example of automating the creation of cloud resources in a reliable, repeatable and easy to understand way."
---

# Instance Using Alicloud ECS

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/alicloud-ts-ecs/README.md)

This example deploys a simple Alicloud ECS Instance

## Deploying the App

To deploy your infrastructure, follow the below steps.

### Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
2. [Configure Alicloud Credentials](https://www.pulumi.com/registry/packages/alicloud/installation-configuration/#configuring-credentials)

### Steps

After cloning this repo, from this working directory, run these commands:

1. Create a new stack, which is an isolated deployment target for this example:

    ```bash
    pulumi stack init
    ```

2. Set the required configuration variables for this program:

    ```bash
    pulumi config set alicloud:region us-east-1
    ```

3. Stand up the VM, which will also boot up your Python web server on port 80:

    ```bash
    pulumi up
    ```

4. After a couple of minutes, your VM will be ready, and one stack output is printed:

    ```bash
    $ pulumi stack output
    Current stack outputs (1):
    OUTPUT    VALUE
    publicIp  47.90.136.113
    ```

5. From there, feel free to experiment. Simply making edits and running `pulumi up` will incrementally update your VM.

6. Afterward, destroy your stack and remove it:

    ```bash
    pulumi destroy --yes
    pulumi stack rm --yes
    ```

