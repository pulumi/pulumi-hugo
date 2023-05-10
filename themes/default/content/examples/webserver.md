---
title: "AWS Web Server Component"
meta_desc: "Basic example of an AWS web server accessible over HTTP"
metadata:
  id: webserver
  title: "AWS Web Server Component"
  description: "Basic example of an AWS web server accessible over HTTP"
  url: https://github.com/pulumi/examples/tree/master/webserver
  runtime: nodejs
  lastUpdate: 1683414115000
  duration: 54000
  resources:
  - pulumi:pulumi:Stack
  - pulumi:providers:aws
  - aws:ec2/securityGroup:SecurityGroup
  - aws:ec2/instance:Instance
  - aws:ec2/instance:Instance

summary: "This Pulumi example deploys a web server in the cloud using JavaScript. It uses the AWS cloud provider to deploy a simple web server on EC2 Instances. The web server serves a dynamic website which is configured in JavaScript. This example demonstrates how Pulumi can automate the deployment of applications in the cloud in a programmatic way."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-js-webserver-component/README.md)

# AWS Web Server Component

Deploy an EC2 instance with the `@pulumi/aws` package, using a common module for creating an instance. We define a function, `createInstance`, in [webserver.js](webserver.js) and use it in the main program, [index.js](index.js).

For a walkthrough of the main example, see [Simple Web Server Using Amazon EC2](https://www.pulumi.com/docs/tutorials/aws/ec2-webserver/).

