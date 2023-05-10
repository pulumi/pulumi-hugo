---
title: "AWS API Gateway V2 HTTP API"
meta_desc: "Example of using AWS API Gateway v2 HTTP API"
metadata:
  id: aws-ts-apigatewayv2-http-api
  title: "AWS API Gateway V2 HTTP API"
  description: "Example of using AWS API Gateway v2 HTTP API"
  url: https://github.com/pulumi/examples/tree/master/aws-ts-apigatewayv2-http-api
  runtime: nodejs
  lastUpdate: 1683412721000
  duration: 36000
  resources:
  - pulumi:pulumi:Stack
  - pulumi:providers:aws
  - aws:apigatewayv2/api:Api
  - aws:iam/role:Role
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:lambda/function:Function
  - aws:lambda/permission:Permission
  - aws:apigatewayv2/integration:Integration
  - aws:apigatewayv2/route:Route
  - aws:apigatewayv2/stage:Stage

summary: "This Pulumi example demonstrates how to use an AWS HTTP API with serverless TypeScript functions. It uses Amazon Web Services (AWS) and TypeScript as its cloud provider and programming language, respectively. The example creates an API Gateway v2 HTTP API endpoint, an AWS Lambda function to power its back-end, and an AWS IAM role to enable the Lambda function to access other AWS services. This example provides an example of cloud-computing use cases related to building and deploying web applications."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-ts-apigatewayv2-http-api/README.md)

# AWS API Gateway V2 HTTP API

Set up a HTTP API using AWS API Gateway V2, complete with a route, stage and integration.

## Deploying and running the program

Note: some values in this example will be different from run to run.  These values are indicated
with `***`.

1.  Create a new stack:

    ```bash
    $ pulumi stack init http-api
    ```

1.  Set the AWS region:

    ```
    $ pulumi config set aws:region us-east-2
    ```

1.  Restore NPM modules via `npm install` or `yarn install`.

1.  Run `pulumi up` to preview and deploy changes:

    ```
    $ pulumi up
    Previewing update (http-api)
    ...

    Updating (http-api)

         Type                             Name                                   Status
     +   pulumi:pulumi:Stack              aws-ts-apigatewayv2-http-api-http-api  created
     +   ├─ aws:apigatewayv2:Api          httpApiGateway                         created
     +   ├─ aws:iam:Role                  lambdaRole                             created
     +   ├─ aws:lambda:Function           lambdaFunction                         created
     +   ├─ aws:iam:RolePolicyAttachment  lambdaRoleAttachment                   created
     +   ├─ aws:lambda:Permission         lambdaPermission                       created
     +   ├─ aws:apigatewayv2:Integration  lambdaIntegration                      created
     +   ├─ aws:apigatewayv2:Route        apiRoute                               created
     +   └─ aws:apigatewayv2:Stage        apiStage                               created

    Outputs:
        endpoint: "https://****.execute-api.us-east-2.amazonaws.com/http-api"

    Resources:
        + 9 created

    Duration: 33s
    ```

1.  View the endpoint URL and curl a few routes:

    ```bash
    $ pulumi stack output
    Current stack outputs (1):
        OUTPUT            VALUE
        endpoint          https://***.execute-api.us-east-2.amazonaws.com/http-api

    $ curl $(pulumi stack output endpoint)
    Hello, Pulumi!
    ```

1.  To view the runtime logs of the Lambda function, use the `pulumi logs` command. To get a log stream, use `pulumi logs --follow`.

## Clean up

1.  Run `pulumi destroy` to tear down all resources.

1.  To delete the stack itself, run `pulumi stack rm`. Note that this command deletes all deployment history from the Pulumi console.
