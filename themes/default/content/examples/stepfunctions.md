---
title: "AWS Step Functions"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: stepfunctions
  settings:
    name: stepfunctions
    description: Basic example of AWS Step Functions
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 8
    outputs:
      stateMachineArn:
        value: >-
          arn:aws:states:us-west-2:894850187425:stateMachine:stateMachine-d97eba1
        secret: false
      readme:
        value: >+
          [![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new)


          # AWS Step Functions


          A basic example that demonstrates using AWS Step Functions with a
          Lambda function.



          # Start execution 


          From the
          [console](https://console.aws.amazon.com/states/home?region=us-west-2#/statemachines/view/${outputs.stateMachineArn}).


          Or from the AWS CLI:

          ```console

          $ aws stepfunctions start-execution --state-machine-arn
          ${outputs.stateMachineArn}

          ```

        secret: false
    startTime: 1683412677000
    endTime: 1683412716000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::stepfunctions::pulumi:pulumi:Stack::stepfunctions-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::stepfunctions::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: urn:pulumi:examples-api::stepfunctions::aws:iam/role:Role::sfnRole
      type: aws:iam/role:Role
    - urn: urn:pulumi:examples-api::stepfunctions::aws:iam/role:Role::lambdaRole
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::stepfunctions::aws:iam/rolePolicy:RolePolicy::sfnRolePolicy
      type: aws:iam/rolePolicy:RolePolicy
    - urn: >-
        urn:pulumi:examples-api::stepfunctions::aws:iam/rolePolicy:RolePolicy::lambdaRolePolicy
      type: aws:iam/rolePolicy:RolePolicy
    - urn: >-
        urn:pulumi:examples-api::stepfunctions::aws:lambda/function:Function::worldFunction
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::stepfunctions::aws:lambda/function:Function::helloFunction
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::stepfunctions::aws:sfn/stateMachine:StateMachine::stateMachine
      type: aws:sfn/stateMachine:StateMachine

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-ts-stepfunctions/README.md)

# AWS Step Functions

A basic example that demonstrates using AWS Step Functions with a Lambda function.

This example also utilizes our [Stack Readme](https://www.pulumi.com/docs/intro/pulumi-cloud/projects-and-stacks/#stack-readme) feature. You can view the stack readme by going to the console by running `pulumi console` and selecting the README tab. See the [`stack-readme-ts`](https://github.com/pulumi/examples/tree/master/stack-readme-ts) example for a more detailed example.

```
# Create and configure a new stack
$ pulumi stack init stepfunctions-dev
$ pulumi config set aws:region us-east-2

# Install dependencies
$ npm install

# Preview and run the deployment
$ pulumi up

# Start execution using the AWS CLI (or from the console at https://console.aws.amazon.com/states)
$ aws stepfunctions start-execution --state-machine-arn $(pulumi stack output stateMachineArn)

# Remove the app
$ pulumi destroy
```

