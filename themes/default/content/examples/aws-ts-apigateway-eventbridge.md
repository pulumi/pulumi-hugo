---
title: "API Gateway V1 to EventBridge"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-ts-apigateway-eventbridge
  settings:
    name: aws-ts-apigateway-eventbridge
    description: A minimal AWS TypeScript Pulumi program
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 19
    outputs:
      url:
        value: https://hu7wm4wgtd.execute-api.us-west-2.amazonaws.com/dev
        secret: false
    startTime: 1683413668000
    endTime: 1683413709000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::pulumi:pulumi:Stack::aws-ts-apigateway-eventbridge-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:cloudwatch/eventBus:EventBus::bus
      type: aws:cloudwatch/eventBus:EventBus
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:iam/role:Role::lambda
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:iam/role:Role::api-gateway-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:apigateway/restApi:RestApi::api
      type: aws:apigateway/restApi:RestApi
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:cloudwatch/eventRule:EventRule::rule
      type: aws:cloudwatch/eventRule:EventRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:iam/rolePolicyAttachment:RolePolicyAttachment::lambda-57e41134
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:apigateway/resource:Resource::resource
      type: aws:apigateway/resource:Resource
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:apigateway/model:Model::model
      type: aws:apigateway/model:Model
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:apigateway/requestValidator:RequestValidator::validator
      type: aws:apigateway/requestValidator:RequestValidator
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:apigateway/method:Method::method
      type: aws:apigateway/method:Method
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:apigateway/methodResponse:MethodResponse::method-response
      type: aws:apigateway/methodResponse:MethodResponse
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:apigateway/integration:Integration::integration
      type: aws:apigateway/integration:Integration
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:apigateway/integrationResponse:IntegrationResponse::integration-response
      type: aws:apigateway/integrationResponse:IntegrationResponse
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:apigateway/deployment:Deployment::deployment
      type: aws:apigateway/deployment:Deployment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:apigateway/stage:Stage::stage
      type: aws:apigateway/stage:Stage
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:lambda/function:Function::lambda
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:lambda/permission:Permission::lambda-permission
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigateway-eventbridge::aws:cloudwatch/eventTarget:EventTarget::lambda-target
      type: aws:cloudwatch/eventTarget:EventTarget

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

