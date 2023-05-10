---
title: "Equinix Metal Webserver"
meta_desc: ""
metadata:
  id: equinix-metal-py-webserver
  title: "Equinix Metal Webserver"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/equinix-metal-py-webserver
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example deploys a single web server on Equinix Metal with a static website. It uses Python for the language, and Equinix Metal for the cloud provider. The use case is to provision and manage the server, along with deploying the website. In addition, it sets up DNS, security groups, and other miscellaneous configurations to ensure everything is secure and available. Finally, it offers monitoring for the application to ensure its up and running."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/equinix-metal-py-webserver/README.md)

# Equinix Metal Webserver

This example demonstrates creating a webserver in Equinix Metal with Python

# Running the Example

After cloning this repo, `cd` into it and run these commands.

1. Create a new stack, which is an isolated deployment target for this example:

    ```bash
    $ pulumi stack init
    ```

1. Install all of the dependencies for the application:

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

