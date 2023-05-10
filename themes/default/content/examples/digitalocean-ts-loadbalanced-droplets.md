---
title: "Pulumi DigitalOcean Droplets"
meta_desc: "Basic example of load balanced droplets on DigitalOcean"
metadata:
  id: digitalocean-ts-loadbalanced-droplets
  title: "Pulumi DigitalOcean Droplets"
  description: "Basic example of load balanced droplets on DigitalOcean"
  url: https://github.com/pulumi/examples/tree/master/digitalocean-ts-loadbalanced-droplets
  runtime: nodejs
  lastUpdate: 1683416514000
  duration: 261000
  resources:
  - pulumi:pulumi:Stack
  - pulumi:providers:digitalocean
  - digitalocean:index/tag:Tag
  - digitalocean:index/tag:Tag
  - digitalocean:index/tag:Tag
  - digitalocean:index/droplet:Droplet
  - digitalocean:index/droplet:Droplet
  - digitalocean:index/loadBalancer:LoadBalancer

summary: "This example from Pulumi shows how to use the company&#x27;s JavaScript-based infrastructure-as-code platform to automate the creation of a simplified digital load balancer across two DigitalOcean droplets using TypeScript. It serves as a demonstration of how to use Pulumi to deploy cloud-native infrastructure to DigitalOcean and is applicable to any cloud-computing use case that requires spinning up servers and assigning public endpoints."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/digitalocean-ts-loadbalanced-droplets/README.md)

# Pulumi DigitalOcean Droplets

Starting point for building a Pulumi sample architecture on DigitalOcean.

## Running the App

1.  Create a new stack:

    ```
    $ pulumi stack init digitalocean-ts-loadbalanced-droplets
    ```

1.  Configure the project:

    ```
    $ pulumi config set --secret digitalocean:token YOURDIGITALOCEANTOKEN
    ```

1.  Restore NPM dependencies:

    ```
    $ npm install
    ```

1.  Run `pulumi up` to preview and deploy changes:

    ``` 
    $ pulumi up
    Previewing update (digitalocean-ts-loadbalanced-droplets):
    ...

Updating (digitalocean-ts-loadbalanced-droplets):

     Type                                Name                                                                         Status
 +   pulumi:pulumi:Stack                 digitalocean-ts-loadbalanced-droplets-digitalocean-ts-loadbalanced-droplets  created
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

1.  Curl the HTTP server:

    ```
    curl "$(pulumi stack output endpoint)"
    ```

1. Cleanup

    ```
    $ pulumi destroy
    $ pulumi stack rm
    ```

