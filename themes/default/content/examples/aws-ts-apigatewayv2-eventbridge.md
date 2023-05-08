---
title: "API Gateway V2 to EventBridge"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-ts-apigatewayv2-eventbridge
  settings:
    name: aws-ts-apigatewayv2-eventbridge
    description: An example that integrates API Gateway, EventBridge, and Lambda.
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 13
    outputs:
      url:
        value: https://8q33ookfgl.execute-api.us-west-2.amazonaws.com/examples-api
        secret: false
    startTime: 1683413377000
    endTime: 1683413410000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::pulumi:pulumi:Stack::aws-ts-apigatewayv2-eventbridge-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::aws:iam/role:Role::lambda
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::aws:apigatewayv2/api:Api::api
      type: aws:apigatewayv2/api:Api
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::aws:cloudwatch/eventBus:EventBus::bus
      type: aws:cloudwatch/eventBus:EventBus
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::aws:iam/role:Role::api-gateway-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::aws:iam/rolePolicyAttachment:RolePolicyAttachment::lambda-57e41134
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::aws:apigatewayv2/stage:Stage::stage
      type: aws:apigatewayv2/stage:Stage
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::aws:cloudwatch/eventRule:EventRule::rule
      type: aws:cloudwatch/eventRule:EventRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::aws:apigatewayv2/integration:Integration::integration
      type: aws:apigatewayv2/integration:Integration
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::aws:apigatewayv2/route:Route::route
      type: aws:apigatewayv2/route:Route
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::aws:lambda/function:Function::lambda
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::aws:lambda/permission:Permission::lambda-permission
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-eventbridge::aws:cloudwatch/eventTarget:EventTarget::lambda-target
      type: aws:cloudwatch/eventTarget:EventTarget

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

