---
title: Introducing the AWS Static Website Component
date: 2022-06-27
meta_desc: Learn how to easily deploy your static website using the AWS Static Website Component. 
meta_image: "" 
authors:
    - roberta-leibovitz
tags:
    - aws
    - yaml
    - configuration
    - components
    - website
---

The AWS Static Website component drastically reduces the complexity it takesmakes it easy to deploy a static website to Amazon S3 and, optionally, add a CloudFront content distribution network (CDN). While you can use any of the programming languages Pulumi supports (TypeScript, JavaScript, Python, Go, .NET, Java, and YAML), the component is particularly useful if you use YAML or JSON. With the component, you only need to write a few simple lines of code. Without the component, you would have to write and debug many lines of code to get the same functionality. With the AWS Static Website component, you’ll have a complete, functioning site in a few minutes. Without it, you can spend hours or even days to get the same result.


## The Audience 

The component is designed to be simple to use and accessible to a broad range of developers. The only prerequisites are a basic knowledge of YAML or JSON, an AWS account, and an understanding of what a static website is. Even if you’re not used to thinking about infrastructure as code (IaC), you can use the component and let it handle the complexities that make setting up a website so time consuming.

You will need to have Pulumi on your machine to use the component because you run the pulumi up command to deploy the website. There’s a link to the installation instructions at the end of this article. You’ll also need an AWS account.


## What the Component Does 

As we said, the component deploys a static website to AWS and, optionally, a CloudFront CDN. You simply add a few lines of code, set a few configuration parameters, run pulumi up and let the component do the rest. The component sets up

First, make sure you've [installed]({{< relref "/docs/get-started/install" >}}) and [configured Pulumi for AWS]({{< relref "/registry/packages/aws/installation-configuration" >}}), then, in your shell of choice, create a new folder to contain our three stacks-to-be:

