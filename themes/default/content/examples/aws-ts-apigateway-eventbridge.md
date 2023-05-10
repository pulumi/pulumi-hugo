---
title: "API Gateway V1 to EventBridge"
meta_desc: "A minimal AWS TypeScript Pulumi program"
metadata:
  id: aws-ts-apigateway-eventbridge
  title: "API Gateway V1 to EventBridge"
  description: "A minimal AWS TypeScript Pulumi program"
  url: https://github.com/pulumi/examples/tree/master/aws-ts-apigateway-eventbridge
  runtime: nodejs
  lastUpdate: 1683413709000
  duration: 41000
  resources:
  - pulumi:pulumi:Stack
  - pulumi:providers:aws
  - aws:cloudwatch/eventBus:EventBus
  - aws:iam/role:Role
  - aws:iam/role:Role
  - aws:apigateway/restApi:RestApi
  - aws:cloudwatch/eventRule:EventRule
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:apigateway/resource:Resource
  - aws:apigateway/model:Model
  - aws:apigateway/requestValidator:RequestValidator
  - aws:apigateway/method:Method
  - aws:apigateway/methodResponse:MethodResponse
  - aws:apigateway/integration:Integration
  - aws:apigateway/integrationResponse:IntegrationResponse
  - aws:apigateway/deployment:Deployment
  - aws:apigateway/stage:Stage
  - aws:lambda/function:Function
  - aws:lambda/permission:Permission
  - aws:cloudwatch/eventTarget:EventTarget

summary: "This Pulumi example creates a serverless REST API to trigger an AWS EventBridge event. Using Typescript and the AWS cloud provider, it demonstrates how to use AWS CloudFormation, API Gateway, and Lambda to enable a cloud-computing use case. This example shows how to set up a function which is triggered by an API call and sends an AWS EventBridge event which leads to other AWS services reacting and perform some tasks."
---

# API Gateway V1 to EventBridge

[![Deploy with Pulumi](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/tree/master/aws-ts-apigateway-eventbridge)

This example demonstrates an API Gateway V1 integration with EventBridge and Lambda that also validates request bodies (using an API Gateway model) and returns a custom HTTP response.

## Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/).
1. [Install Node.js](https://www.pulumi.com/docs/intro/languages/javascript/).
1. Configure your [AWS credentials](https://www.pulumi.com/docs/intro/cloud-providers/aws/setup/).

### Deploying the App

1. Clone this repo, change to this directory, then create a new [stack](https://www.pulumi.com/docs/intro/concepts/stack/) for the project:

    ```bash
    pulumi stack init
    ```

1. Specify an AWS region to deploy into:

    ```bash
    pulumi config set aws:region us-west-2
    ```

1. Install Node dependencies and run Pulumi:

    ```bash
    npm install
    pulumi up
    ```

1. In a few moments, the API Gateway instance service will be up and running and its public URL emitted as a Pulumi [stack output](https://www.pulumi.com/docs/intro/concepts/stack/#outputs).

    ```bash
    ...
    Outputs:
        url: "https://andchh8hg8.execute-api.us-west-2.amazonaws.com/dev"
    ```

1. Verify the deployment with `curl`:

    With invalid POST data:

    ```bash
    curl --data '{"some-invalid-property-name": "Chris"}' --header "Content-Type: application/json" "$(pulumi stack output url)/uploads"

    HTTP/2 400
    {"message": "Invalid request body"}
    ```

    With valid POST data:

    ```bash
    curl --data '{"name": "Chris"}' --header "Content-Type: application/json" "$(pulumi stack output url)/uploads"

    HTTP/2 201
    {"accepted":true}
    ```

1. Verify the Lambda was invoked with `pulumi logs`:

    ```bash
    pulumi logs --follow

    Collecting logs for stack dev since 2022-01-06T16:18:48.000-08:00.
    ...

    {
        source: 'my-event-source',
        detail: { 'name': 'Chris' }
    }
    ```

1. When you're ready, destroy your stack and remove it:

    ```bash
    pulumi destroy --yes
    pulumi stack rm --yes
    ```

