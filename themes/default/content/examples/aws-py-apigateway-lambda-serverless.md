---
title: "Lambda-backed API Gateway"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-py-apigateway-lambda-serverless
  settings:
    name: aws-py-apigateway-lambda-serverless
    description: A minimal AWS Python Pulumi program
    runtime: python

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
      apigateway-rest-endpoint:
        value: >-
          https://xxvjdblft0.execute-api.us-west-2.amazonaws.com/example/{proxy+}
        secret: false
      apigatewayv2-http-endpoint:
        value: >-
          https://yd3bhog79f.execute-api.us-west-2.amazonaws.com/example-stage-39d331c/
        secret: false
    startTime: 1683412670000
    endTime: 1683412737000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::pulumi:pulumi:Stack::aws-py-apigateway-lambda-serverless-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::aws:iam/role:Role::lambdaRole
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::aws:apigatewayv2/api:Api::http-api-pulumi-example
      type: aws:apigatewayv2/api:Api
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::aws:iam/rolePolicy:RolePolicy::lambdaRolePolicy
      type: aws:iam/rolePolicy:RolePolicy
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::aws:lambda/function:Function::mylambda
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::aws:lambda/permission:Permission::api-http-lambda-permission
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::aws:apigatewayv2/integration:Integration::example
      type: aws:apigatewayv2/integration:Integration
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::aws:apigatewayv2/route:Route::example-route
      type: aws:apigatewayv2/route:Route
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::aws:apigateway/restApi:RestApi::api
      type: aws:apigateway/restApi:RestApi
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::aws:apigateway/deployment:Deployment::api-deployment
      type: aws:apigateway/deployment:Deployment
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::aws:apigatewayv2/stage:Stage::example-stage
      type: aws:apigatewayv2/stage:Stage
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::aws:apigateway/stage:Stage::api-stage
      type: aws:apigateway/stage:Stage
    - urn: >-
        urn:pulumi:examples-api::aws-py-apigateway-lambda-serverless::aws:lambda/permission:Permission::api-rest-lambda-permission
      type: aws:lambda/permission:Permission

---

# Lambda-backed API Gateway

This example provides API endpoints which are executed by AWS Lambda using Python. 
The example sets up up two Lambda-backed API Gateways: an API Gateway V1 (REST) and an API Gateway V2 (HTTP). AWS provides some information on the differences between these two API Gateway types: [Announcing HTTP APIs for Amazon API Gateway](https://aws.amazon.com/blogs/compute/announcing-http-apis-for-amazon-api-gateway/) and [API Gateway V2 FAQs](https://aws.amazon.com/api-gateway/faqs/)

This sample uses the following AWS products:

- [Amazon API Gateway](https://aws.amazon.com/api-gateway/) is used as an API proxy
- [AWS Lambda](https://aws.amazon.com/lambda/) is used to process API events by executing typescript/javascript code

## Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
2.  Create a new stack:

    ```bash
    $ pulumi stack init aws-py-apigateway-lambda-serverless
    ```

3.  Set the AWS region:

    ```bash
    $ pulumi config set aws:region us-east-2
    ```

## Deploy the App

1.  Run `pulumi up` to preview and deploy changes:

2.  To view the runtime logs of the Lambda function, use the `pulumi logs` command. To get a log stream, use `pulumi logs --follow`.

## Test the Endpoints

Use a HTTP tool like `curl` or [`httpie`](https://github.com/httpie/httpie) (`pip3 install httpie`) to query the API Gateway endpoints using the Pulumi stack outputs.

Example using `curl`:

```
curl $(pulumi stack output apigateway-rest-endpoint)
curl $(pulumi stack output apigatewayv2-http-endpoint)
```

Example using `httpie`:

```
http $(pulumi stack output apigateway-rest-endpoint)
http $(pulumi stack output apigatewayv2-http-endpoint)
```

Output should include `"Cheers from AWS Lambda!!"`.

## Clean Up

1.  Run `pulumi destroy` to tear down all resources.

2.  To delete the stack itself, run `pulumi stack rm`. Note that this command deletes all deployment history from the Pulumi console.

## Summary

In this tutorial, you built a lambda-backed API on AWS using API Gateway, lambda functions, and Pulumi. This serverless solution is highly scaleable, resilient, and stateless.

## Next Steps

- [Create a frontend to interact with this api](https://www.pulumi.com/docs/tutorials/aws/s3-website/)

