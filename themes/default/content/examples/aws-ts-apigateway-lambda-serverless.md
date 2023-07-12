---
title: "Lambda-backed REST API"
meta_desc: "Creates a serverless application using API Gateway backed by lambda functions"
metadata:
  id: aws-ts-apigateway-lambda-serverless
  title: "Lambda-backed REST API"
  description: "Creates a serverless application using API Gateway backed by lambda functions"
  url: https://github.com/pulumi/examples/tree/master/aws-ts-apigateway-lambda-serverless
  runtime: nodejs
  lastUpdate: 1683412760000
  duration: 51000
  resources:
  - pulumi:pulumi:Stack
  - aws:apigateway:x:API
  - pulumi:providers:aws
  - aws:iam/role:Role
  - aws:iam/role:Role
  - aws:iam/role:Role
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:lambda/function:Function
  - aws:lambda/function:Function
  - aws:lambda/function:Function
  - aws:apigateway/restApi:RestApi
  - aws:apigateway/deployment:Deployment
  - aws:lambda/permission:Permission
  - aws:lambda/permission:Permission
  - aws:lambda/permission:Permission
  - aws:apigateway/stage:Stage

summary: "This Pulumi example configures an application stack designed for serverless use cases with AWS. It uses TypeScript and creates an API Gateway working in tandem with a Lambda function to serve as a fully serverless backend. This allows the application to scale as demand increases, while also avoiding the complexity of managing a full server."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-ts-apigateway-lambda-serverless/README.md)

# Lambda-backed REST API

A simple API demonstrating an integration between AWS API Gateway (REST) and AWS Lambda.

## Deploying and running the program

This example provides API endpoints which are executed by lambda using TypeScript and AWS.

This sample uses the following AWS products:

- [Amazon API Gateway](https://aws.amazon.com/api-gateway/) is used as an API proxy
- [AWS Lambda](https://aws.amazon.com/lambda/) is used to process API events by executing typescript/javascript code

## Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
2.  Create a new stack:

    ```bash
    $ pulumi stack init aws-ts-apigateway-lambda-serverless
    ```

3.  Set the AWS region:

    ```bash
    $ pulumi config set aws:region us-east-2
    ```

4.  Install NPM modules via `npm install` or `yarn install`.

## Deploy the App

1.  Run `pulumi up` to preview and deploy changes:

  ```bash
  `Updating (aws-ts-apigateway-lambda-serverless)

  View Live: https://app.pulumi.com/***/aws-ts-apigateway-lambda-serverless/aws-ts-apigateway-lambda-serverless/updates/1

      Type                                Name                                                                     Status      
  +   pulumi:pulumi:Stack                 aws-ts-apigateway-lambda-serverless-aws-ts-apigateway-lambda-serverless  created     
  +   └─ aws:apigateway:x:API             hello-world                                                              created     
  +      ├─ aws:iam:Role                  hello-world40ecbb97                                                      created     
  +      ├─ aws:iam:Policy                hello-world2bb21f83-LambdaFullAccess                                     created     
  +      ├─ aws:iam:Role                  hello-world2bb21f83                                                      created     
  +      ├─ aws:iam:Role                  hello-world4fcc7b60                                                      created     
  +      ├─ aws:iam:Policy                hello-world40ecbb97-LambdaFullAccess                                     created     
  +      ├─ aws:iam:Policy                hello-world4fcc7b60-LambdaFullAccess                                     created     
  +      ├─ aws:lambda:Function           hello-world40ecbb97                                                      created     
  +      ├─ aws:lambda:Function           hello-world2bb21f83                                                      created     
  +      ├─ aws:iam:RolePolicyAttachment  hello-world2bb21f83-lambdaFullAccessCopyAttachment                       created     
  +      ├─ aws:iam:RolePolicyAttachment  hello-world40ecbb97-lambdaFullAccessCopyAttachment                       created     
  +      ├─ aws:lambda:Function           hello-world4fcc7b60                                                      created     
  +      ├─ aws:iam:RolePolicyAttachment  hello-world4fcc7b60-lambdaFullAccessCopyAttachment                       created     
  +      ├─ aws:apigateway:RestApi        hello-world                                                              created     
  +      ├─ aws:apigateway:Deployment     hello-world                                                              created     
  +      ├─ aws:lambda:Permission         hello-world-29d762f7                                                     created     
  +      ├─ aws:lambda:Permission         hello-world-86405973                                                     created     
  +      ├─ aws:lambda:Permission         hello-world-d21e9c98                                                     created     
  +      └─ aws:apigateway:Stage          hello-world                                                              created     
  
  Outputs:
      endpointUrl: "https://***.execute-api.us-east-2.amazonaws.com/stage/"

  Resources:
      + 20 created

  Duration: 36s`
  ```

2.  To view the runtime logs of the Lambda function, use the `pulumi logs` command. To get a log stream, use `pulumi logs --follow`.

## Clean Up

1.  Run `pulumi destroy` to tear down all resources.

2.  To delete the stack itself, run `pulumi stack rm`. Note that this command deletes all deployment history from the Pulumi console.

## Summary

In this tutorial, you built a lambda-backed API on AWS using API Gateway, lambda functions, and Pulumi. This serverless solution is highly scaleable, resilient, and stateless.


## Next Steps

- [Create a frontend to interact with this api](https://www.pulumi.com/docs/tutorials/aws/s3-website/)

