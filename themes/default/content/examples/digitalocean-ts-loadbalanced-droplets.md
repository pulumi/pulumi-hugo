---
title: "Pulumi DigitalOcean Droplets"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: digitalocean-ts-loadbalanced-droplets
  settings:
    name: digitalocean-ts-loadbalanced-droplets
    description: Basic example of load balanced droplets on DigitalOcean
    runtime: nodejs

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
        value: 138.197.57.242
        secret: false
    startTime: 1683416253000
    endTime: 1683416514000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::digitalocean-ts-loadbalanced-droplets::pulumi:pulumi:Stack::digitalocean-ts-loadbalanced-droplets-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::digitalocean-ts-loadbalanced-droplets::pulumi:providers:digitalocean::default_4_19_1
      type: pulumi:providers:digitalocean
    - urn: >-
        urn:pulumi:examples-api::digitalocean-ts-loadbalanced-droplets::digitalocean:index/tag:Tag::web-0
      type: digitalocean:index/tag:Tag
    - urn: >-
        urn:pulumi:examples-api::digitalocean-ts-loadbalanced-droplets::digitalocean:index/tag:Tag::demo-app-examples-api
      type: digitalocean:index/tag:Tag
    - urn: >-
        urn:pulumi:examples-api::digitalocean-ts-loadbalanced-droplets::digitalocean:index/tag:Tag::web-1
      type: digitalocean:index/tag:Tag
    - urn: >-
        urn:pulumi:examples-api::digitalocean-ts-loadbalanced-droplets::digitalocean:index/droplet:Droplet::web-0
      type: digitalocean:index/droplet:Droplet
    - urn: >-
        urn:pulumi:examples-api::digitalocean-ts-loadbalanced-droplets::digitalocean:index/droplet:Droplet::web-1
      type: digitalocean:index/droplet:Droplet
    - urn: >-
        urn:pulumi:examples-api::digitalocean-ts-loadbalanced-droplets::digitalocean:index/loadBalancer:LoadBalancer::public
      type: digitalocean:index/loadBalancer:LoadBalancer

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

