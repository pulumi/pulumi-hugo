---
title: "Equinix Metal Webserver"
meta_desc: ""
metadata:
  id: webserver-equinix-metal
  title: "Equinix Metal Webserver"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/webserver-equinix-metal
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example deploys a webserver stack on Equinix Metal, a bare-metal cloud provider. It uses the programming language JavaScript to provision and manage infrastructure. This example creates and configures AWS services such as EC2 instances, S3 buckets, and IAM roles for hosting a website. It also configures external-facing resources such as routing tables and Firewall rules. The example serves the general use case of providing the necessary infrastructure needed to deploy a website."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/equinix-metal-ts-webserver/README.md)

# Equinix Metal Webserver

This example demonstrates creating a webserver in Equinix Metal

# Running the Example

After cloning this repo, `cd` into it and run these commands.

1. Create a new stack, which is an isolated deployment target for this example:

    ```bash
    $ pulumi stack init
    ```
   
1. Install all of the dependencies for the application:

    ```bash
    $ npm install
    ```

1. Deploy everything with the `pulumi up` command. This provisions the webserver:

    ```bash
    $ pulumi up
    ```

1. After a couple minutes, your webserver will be ready.

    ```bash
    $ pulumi up
    ...

    Outputs:
      + ip  : "147.75.65.213"
      + name: "new-vervet"
    ```

1. Once you are done, you can destroy all of the resources, and the stack:

    ```bash
    $ pulumi destroy
    $ pulumi stack rm
    ```

