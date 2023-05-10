---
title: "API Gateway V2 to EventBridge"
meta_desc: "An example that integrates API Gateway, EventBridge, and Lambda."
metadata:
  id: aws-ts-apigatewayv2-eventbridge
  title: "API Gateway V2 to EventBridge"
  description: "An example that integrates API Gateway, EventBridge, and Lambda."
  url: https://github.com/pulumi/examples/tree/master/aws-ts-apigatewayv2-eventbridge
  runtime: nodejs
  lastUpdate: 1683413410000
  duration: 33000
  resources:
  - pulumi:pulumi:Stack
  - pulumi:providers:aws
  - aws:iam/role:Role
  - aws:apigatewayv2/api:Api
  - aws:cloudwatch/eventBus:EventBus
  - aws:iam/role:Role
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:apigatewayv2/stage:Stage
  - aws:cloudwatch/eventRule:EventRule
  - aws:apigatewayv2/integration:Integration
  - aws:apigatewayv2/route:Route
  - aws:lambda/function:Function
  - aws:lambda/permission:Permission
  - aws:cloudwatch/eventTarget:EventTarget

summary: "This Pulumi example deploys an API Gateway v2 API with event-driven Lambda functions, using AWS, TypeScript, and the Serverless Architecture pattern. The example consists of an API Gateway endpoint and associated Lambda functions, which together form a complete API, triggered by incoming events from an EventBridge event bus. This implementation serves as a practical demonstration of the cloud-computing use case of developing API endpoints within an EventBridge-equipped AWS environment."
---

# API Gateway V2 to EventBridge

[![Deploy with Pulumi](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/tree/master/aws-ts-apigatewayv2-eventbridge)

This example creates an API Gateway V2 proxy integration with EventBridge and Lambda. It defines a single API Gateway endpoint that publishes events to an EventBridge event bus, and an accompanying event rule that matches those events and invokes a Lambda function.

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

1. Verify the deployment with `curl` and `pulumi logs`:

    ```bash
    curl --data '{"some-key": "some-value"}' --header "Content-Type: application/json" "$(pulumi stack output url)/uploads"

    {"Entries":[{"EventId":"cdc44763-6976-286c-9378-7cce674dff81"}],"FailedEntryCount":0}
    ```

    ```bash
    pulumi logs --follow

    Collecting logs for stack dev since 2022-01-06T16:18:48.000-08:00.
    ...

    {
        source: 'my-event-source',
        detail: { 'some-key': 'some-value' }
    }
    ```

1. When you're ready, destroy your stack and remove it:

    ```bash
    pulumi destroy --yes
    pulumi stack rm --yes
    ```

