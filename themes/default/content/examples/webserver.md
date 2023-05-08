---
title: "AWS Web Server Component"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: webserver
  settings:
    name: webserver
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
        create: 4
    outputs:
      webUrl:
        value: http://ec2-52-33-199-59.us-west-2.compute.amazonaws.com
        secret: false
    startTime: 1683414061000
    endTime: 1683414115000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::webserver::pulumi:pulumi:Stack::webserver-examples-api
      type: pulumi:pulumi:Stack
    - urn: urn:pulumi:examples-api::webserver::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::webserver::aws:ec2/securityGroup:SecurityGroup::web-secgrp
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::webserver::aws:ec2/instance:Instance::web-server-www
      type: aws:ec2/instance:Instance
    - urn: >-
        urn:pulumi:examples-api::webserver::aws:ec2/instance:Instance::web-server-app
      type: aws:ec2/instance:Instance

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-js-webserver-component/README.md)

# AWS Web Server Component

Deploy an EC2 instance with the `@pulumi/aws` package, using a common module for creating an instance. We define a function, `createInstance`, in [webserver.js](webserver.js) and use it in the main program, [index.js](index.js).

For a walkthrough of the main example, see [Simple Web Server Using Amazon EC2](https://www.pulumi.com/docs/tutorials/aws/ec2-webserver/).

