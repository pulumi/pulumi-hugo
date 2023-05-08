---
title: "Web Server Using Amazon EC2"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-ts-webserver
  settings:
    name: aws-ts-webserver
    description: Basic example of an AWS web server accessible over HTTP
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 3
    outputs:
      publicHostName:
        value: ec2-54-218-62-87.us-west-2.compute.amazonaws.com
        secret: false
      publicIp:
        value: 54.218.62.87
        secret: false
    startTime: 1683413368000
    endTime: 1683413436000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-ts-webserver::pulumi:pulumi:Stack::aws-ts-webserver-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-ts-webserver::pulumi:providers:aws::default_3_38_1
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-ts-webserver::aws:ec2/securityGroup:SecurityGroup::web-secgrp
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-webserver::aws:ec2/instance:Instance::web-server-www
      type: aws:ec2/instance:Instance

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-ts-webserver/README.md)

# Web Server Using Amazon EC2

This example deploys a simple AWS EC2 virtual machine running a Python web server.

## Deploying the App

To deploy your infrastructure, follow the below steps.

### Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
2. [Configure AWS Credentials](https://www.pulumi.com/docs/intro/cloud-providers/aws/setup/)

### Steps

After cloning this repo, from this working directory, run these commands:

1. Create a new stack, which is an isolated deployment target for this example:

    ```bash
    $ pulumi stack init
    ```

2. Set the required configuration variables for this program:

    ```bash
    $ pulumi config set aws:region us-east-1
    ```

3. Stand up the VM, which will also boot up your Python web server on port 80:

    ```bash
    $ pulumi up
    ```

4. After a couple minutes, your VM will be ready, and two stack outputs are printed:

    ```bash
    $ pulumi stack output
    Current stack outputs (2):
    OUTPUT          VALUE
    publicHostName  ec2-53-40-227-82.compute-1.amazonaws.com
    publicIp        53.40.227.82
    ```

5. Thanks to the security group making port 80 accessible to the 0.0.0.0/0 CIDR block (all addresses), we can curl it:

    ```bash
    $ curl $(pulumi stack output publicIp)
    Hello, World!
    ```

6. From there, feel free to experiment. Simply making edits and running `pulumi up` will incrementally update your VM.

7. Afterwards, destroy your stack and remove it:

    ```bash
    $ pulumi destroy --yes
    $ pulumi stack rm --yes
    ```

