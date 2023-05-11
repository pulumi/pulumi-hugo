---
title_tag: "AWS & Pulumi"
meta_desc: Pulumi offers full support for AWS, with two providers, 10+ components, templates and guides.
title: "AWS"
h1: AWS & Pulumi
menu:
  clouds:
    identifier: aws
    weight: 1
cloud_overview: true
description: Build infrastructure intuitively on AWS using TypeScript, Python, Go, C#, Java or YAML. Pulumi supports all AWS services and stays up-to-date with all AWS features.
get_started_guide: get-started/
providers:
- display_name: AWS Classic
  url: aws/
- display_name: AWS Native
  url: aws-native/
components:
- display_name: AWSx
  url: awsx/
- display_name: AWS API Gateway
  url: aws-apigateway/
- display_name: AWS IAM
  url: aws-iam/
- display_name: AWS static website
  url: aws-static-website/
convert:
- heading: Convert CloudFormation to Pulumi
  url: /cf2pulumi/
  description: Convert CloudFormation templates to your language of choice with Pulumi's conversion tool.
templates:
- display_name: Container service on AWS
  url: container-service/aws/
- display_name: AWS Serverless application
  url: serverless-application/aws/
- display_name: AWS static website
  url: static-website/aws/
- display_name: Virtual machine on AWS
  url: virtual-machine/aws/
guides:
  description: Learn how to use AWS & Pulumi together.
  guides_list:
  - display_name: Configuring AWS API Gateway
    url: guides/api-gateway/
  - display_name: Configuring AWS Auto Scaling
    url: guides/autoscaling/
  - display_name: Using AWS CloudWatch
    url: guides/cloudwatch/
  - display_name: Using AWS Elastic Container Registry (ECR)
    url: guides/ecr/
policy:
  url: /awsguard/
  description: Use AWSGuard to configure and enforce best practices for your Pulumi stacks.
---
