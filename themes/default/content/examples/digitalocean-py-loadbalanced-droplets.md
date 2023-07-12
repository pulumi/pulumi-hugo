---
title: "Pulumi DigitalOcean Droplets"
meta_desc: "Basic example of load balanced droplets on DigitalOcean in Python"
metadata:
  id: digitalocean-py-loadbalanced-droplets
  title: "Pulumi DigitalOcean Droplets"
  description: "Basic example of load balanced droplets on DigitalOcean in Python"
  url: https://github.com/pulumi/examples/tree/master/digitalocean-py-loadbalanced-droplets
  runtime: python
  lastUpdate: 1683416388000
  duration: 121000
  resources:
  - pulumi:pulumi:Stack
  - pulumi:providers:digitalocean
  - digitalocean:index/tag:Tag
  - digitalocean:index/tag:Tag
  - digitalocean:index/tag:Tag
  - digitalocean:index/droplet:Droplet
  - digitalocean:index/droplet:Droplet
  - digitalocean:index/loadBalancer:LoadBalancer

summary: "This Pulumi example uses the Python programming language and DigitalOcean cloud provider to demonstrate how to create and manage a load-balanced cluster of cloud resources. Specifically, it provisions three DigitalOcean Droplets and a Floating IP, plus a DigitalOcean Load Balancer to distribute traffic across the Droplets. This example shows a cloud-computing use case applicable to workloads such as web services, databases, and other applications that require load balancing across several instances."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/digitalocean-py-loadbalanced-droplets/README.md)

# Pulumi DigitalOcean Droplets

Starting point for building a Pulumi sample architecture on DigitalOcean.

## Running the App

1.  Create a new stack:

    ```bash
    $ pulumi stack init digitalocean-py-loadbalanced-droplets
    ```

1. Configure the project:

    ```bash
    $ pulumi config set --secret digitalocean:token YOURDIGITALOCEANTOKEN
    ```

1. Run `pulumi up` to preview and deploy changes:

    ```bash
    $ pulumi up
    Previewing update (digitalocean-py-loadbalanced-droplets):
    ...

Updating (digitalocean-py-loadbalanced-droplets):

     Type                              Name                                                                         Status
 +   pulumi:pulumi:Stack                 digitalocean-py-loadbalanced-droplets-digitalocean-py-loadbalanced-droplets  created
 +   ├─ digitalocean:index:Tag           demo-app                                                                     created
 +   ├─ digitalocean:index:Tag           web-2                                                                        created
 +   ├─ digitalocean:index:Tag           web-0                                                                        created
 +   ├─ digitalocean:index:Tag           web-1                                                                        created
 +   ├─ digitalocean:index:LoadBalancer  public                                                                       created
 +   ├─ digitalocean:index:Droplet       web-0                                                                        created
 +   ├─ digitalocean:index:Droplet       web-2                                                                        created
 +   └─ digitalocean:index:Droplet       web-1                                                                        created

Outputs:
    endpoint: "138.197.62.183"

Resources:
    + 9 created

Duration: 3m2s
    ```

1. Curl the HTTP server:

    ```bash
    curl "$(pulumi stack output endpoint)"
    ```

1. Cleanup

    ```bash
    $ pulumi destroy
    $ pulumi stack rm
    ```


