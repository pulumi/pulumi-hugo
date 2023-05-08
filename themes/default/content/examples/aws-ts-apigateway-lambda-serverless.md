---
title: "Lambda-backed REST API"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-ts-apigateway-lambda-serverless
  settings:
    name: aws-ts-apigateway-lambda-serverless
    description: >-
      Creates a serverless application using API Gateway backed by lambda
      functions
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 41
    outputs:
      endpointUrl:
        value: https://9xdex52ho0.execute-api.us-west-2.amazonaws.com/stage/
        secret: false
    startTime: 1683412709000
    endTime: 1683412760000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::pulumi:pulumi:Stack::aws-ts-apigateway-lambda-serverless-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API::hello-world
      type: aws:apigateway:x:API
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/role:Role::hello-world2bb21f83
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/role:Role::hello-world40ecbb97
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/role:Role::hello-world4fcc7b60
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world2bb21f83-6c156834
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world2bb21f83-1b4caae3
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world2bb21f83-019020e7
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world2bb21f83-4aaabb8e
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world2bb21f83-7cd09230
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world2bb21f83-74d12784
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world2bb21f83-e1a3786d
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world2bb21f83-a1de8170
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world2bb21f83-b5aeb6b6
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world40ecbb97-b5aeb6b6
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world40ecbb97-019020e7
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world40ecbb97-74d12784
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world40ecbb97-1b4caae3
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world40ecbb97-4aaabb8e
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world40ecbb97-a1de8170
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world40ecbb97-e1a3786d
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world40ecbb97-7cd09230
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world40ecbb97-6c156834
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world4fcc7b60-1b4caae3
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world4fcc7b60-b5aeb6b6
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world4fcc7b60-6c156834
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world4fcc7b60-74d12784
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world4fcc7b60-4aaabb8e
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world4fcc7b60-a1de8170
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world4fcc7b60-7cd09230
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world4fcc7b60-e1a3786d
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-world4fcc7b60-019020e7
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:lambda/function:Function::hello-world2bb21f83
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:lambda/function:Function::hello-world40ecbb97
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:lambda/function:Function::hello-world4fcc7b60
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:apigateway/restApi:RestApi::hello-world
      type: aws:apigateway/restApi:RestApi
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:apigateway/deployment:Deployment::hello-world
      type: aws:apigateway/deployment:Deployment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:lambda/permission:Permission::hello-world-29d762f7
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:lambda/permission:Permission::hello-world-d21e9c98
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:lambda/permission:Permission::hello-world-86405973
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-lambda-serverless::aws:apigateway:x:API$aws:apigateway/stage:Stage::hello-world
      type: aws:apigateway/stage:Stage

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

