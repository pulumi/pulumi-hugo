---
title: "Pulumi DigitalOcean Droplets"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: digitalocean-py-loadbalanced-droplets
  settings:
    name: digitalocean-py-loadbalanced-droplets
    description: Basic example of load balanced droplets on DigitalOcean in Python
    runtime: python

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 7
    outputs:
      endpoint:
        value: 165.227.251.234
        secret: false
    startTime: 1683416267000
    endTime: 1683416388000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::digitalocean-py-loadbalanced-droplets::pulumi:pulumi:Stack::digitalocean-py-loadbalanced-droplets-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::digitalocean-py-loadbalanced-droplets::pulumi:providers:digitalocean::default_4_19_1
      type: pulumi:providers:digitalocean
    - urn: >-
        urn:pulumi:examples-api::digitalocean-py-loadbalanced-droplets::digitalocean:index/tag:Tag::web-0
      type: digitalocean:index/tag:Tag
    - urn: >-
        urn:pulumi:examples-api::digitalocean-py-loadbalanced-droplets::digitalocean:index/tag:Tag::demo-app-examples-api
      type: digitalocean:index/tag:Tag
    - urn: >-
        urn:pulumi:examples-api::digitalocean-py-loadbalanced-droplets::digitalocean:index/tag:Tag::web-1
      type: digitalocean:index/tag:Tag
    - urn: >-
        urn:pulumi:examples-api::digitalocean-py-loadbalanced-droplets::digitalocean:index/droplet:Droplet::web-0
      type: digitalocean:index/droplet:Droplet
    - urn: >-
        urn:pulumi:examples-api::digitalocean-py-loadbalanced-droplets::digitalocean:index/droplet:Droplet::web-1
      type: digitalocean:index/droplet:Droplet
    - urn: >-
        urn:pulumi:examples-api::digitalocean-py-loadbalanced-droplets::digitalocean:index/loadBalancer:LoadBalancer::public
      type: digitalocean:index/loadBalancer:LoadBalancer

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


