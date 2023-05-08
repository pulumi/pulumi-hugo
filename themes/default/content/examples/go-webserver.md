---
title: "Web Server Using Amazon EC2 (in Go)"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: go-webserver
  settings:
    name: go-webserver
    description: Basic example of an AWS web server accessible over HTTP
    runtime: go

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
        value: ec2-52-41-40-42.us-west-2.compute.amazonaws.com
        secret: false
      publicIp:
        value: 52.41.40.42
        secret: false
    startTime: 1683413025000
    endTime: 1683413122000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::go-webserver::pulumi:pulumi:Stack::go-webserver-examples-api
      type: pulumi:pulumi:Stack
    - urn: urn:pulumi:examples-api::go-webserver::pulumi:providers:aws::default
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::go-webserver::aws:ec2/securityGroup:SecurityGroup::web-secgrp
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::go-webserver::aws:ec2/instance:Instance::web-server-www
      type: aws:ec2/instance:Instance

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-go-webserver/README.md)

# Web Server Using Amazon EC2 (in Go)

This example deploys a simple AWS EC2 virtual machine running a Python web server. It uses Go as its infrastructure as
code language.

## Deploying the App

To deploy your infrastructure, follow the below steps.

### Prerequisites

1. [Install Go](https://golang.org/doc/install)
2. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
3. [Configure AWS Credentials](https://www.pulumi.com/docs/intro/cloud-providers/aws/setup/)

### Steps

After cloning this repo, from this working directory, run these commands:

2. Next, create a new Pulumi stack, which is an isolated deployment target for this example:

    ```bash
    $ pulumi stack init
    ```

3. Set the required configuration variables for this program:

    ```bash
    $ pulumi config set aws:region us-east-1
    ```

4. Stand up the VM, which will also boot up your Python web server on port 80:

    ```bash
    $ pulumi up
    ```

5. After a couple minutes, your VM will be ready, and two stack outputs are printed:

    ```bash
    $ pulumi stack output
    Current stack outputs (2):
    OUTPUT          VALUE
    publicIp        53.40.227.82
    ```

6. Thanks to the security group making port 80 accessible to the 0.0.0.0/0 CIDR block, we can curl it:

    ```bash
    $ curl $(pulumi stack output publicIp)
    Hello, World!
    ```

7. From there, feel free to experiment. Simply making edits and running `pulumi up` will incrementally update your VM.

8. Afterwards, destroy your stack and remove it:

    ```bash
    $ pulumi destroy --yes
    $ pulumi stack rm --yes
    ```

