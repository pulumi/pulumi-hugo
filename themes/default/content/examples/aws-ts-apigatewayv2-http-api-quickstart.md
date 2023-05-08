---
title: "AWS API Gateway V2 HTTP API Quickstart"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-ts-apigatewayv2-http-api-quickstart
  settings:
    name: aws-ts-apigatewayv2-http-api-quickstart
    description: Quickstart example of using AWS API Gateway v2 HTTP API
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 6
    outputs:
      endpoint:
        value: https://z3um0rmje8.execute-api.us-west-2.amazonaws.com
        secret: false
    startTime: 1683413684000
    endTime: 1683413717000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-http-api-quickstart::pulumi:pulumi:Stack::aws-ts-apigatewayv2-http-api-quickstart-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-http-api-quickstart::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-http-api-quickstart::aws:iam/role:Role::lambdaRole
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-http-api-quickstart::aws:iam/rolePolicyAttachment:RolePolicyAttachment::lambdaRoleAttachment
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-http-api-quickstart::aws:lambda/function:Function::lambdaFunction
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-http-api-quickstart::aws:lambda/permission:Permission::lambdaPermission
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-ts-apigatewayv2-http-api-quickstart::aws:apigatewayv2/api:Api::httpApiGateway
      type: aws:apigatewayv2/api:Api

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-ts-apigatewayv2-http-api-quickcreate/README.md)

# AWS API Gateway V2 HTTP API Quickstart

Set up a simple HTTP API using AWS API Gateway V2 

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

        Type                             Name                                     Status
    +   pulumi:pulumi:Stack              aws-ts-apigatewayv2-quickstart-http-api  created
    +   ├─ aws:iam:Role                  lambdaRole                               created
    +   ├─ aws:lambda:Function           lambdaFunction                           created
    +   ├─ aws:iam:RolePolicyAttachment  lambdaRoleAttachment                     created
    +   ├─ aws:apigatewayv2:Api          httpApiGateway                           created
    +   └─ aws:lambda:Permission         lambdapermission                         created

    Outputs:
        endpoint: "https://****.execute-api.us-east-2.amazonaws.com"

    Resources:
        + 6 created

    Duration: 22s
    ```

1.  View the endpoint URL and curl a few routes:

    ```bash
    $ pulumi stack output
    Current stack outputs (1):
        OUTPUT            VALUE
        endpoint          https://***.execute-api.us-east-2.amazonaws.com

    $ curl $(pulumi stack output endpoint)
    Hello, Pulumi!
    ```

1.  To view the runtime logs of the Lambda function, use the `pulumi logs` command. To get a log stream, use `pulumi logs --follow`.

## Clean up

1.  Run `pulumi destroy` to tear down all resources.

1.  To delete the stack itself, run `pulumi stack rm`. Note that this command deletes all deployment history from the Pulumi console.

