---
title: "AWS Step Functions"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: stepfunctions-py
  settings:
    name: stepfunctions-py
    description: Basic example of AWS Step Functions in Python
    runtime: python

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 7
    outputs:
      state_machine_arn:
        value: >-
          arn:aws:states:us-west-2:894850187425:stateMachine:stateMachine-2855aa0
        secret: false
    startTime: 1683413022000
    endTime: 1683413077000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::stepfunctions-py::pulumi:pulumi:Stack::stepfunctions-py-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::stepfunctions-py::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: urn:pulumi:examples-api::stepfunctions-py::aws:iam/role:Role::sfnRole
      type: aws:iam/role:Role
    - urn: urn:pulumi:examples-api::stepfunctions-py::aws:iam/role:Role::lambdaRole
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::stepfunctions-py::aws:iam/rolePolicy:RolePolicy::sfnRolePolicy
      type: aws:iam/rolePolicy:RolePolicy
    - urn: >-
        urn:pulumi:examples-api::stepfunctions-py::aws:iam/rolePolicy:RolePolicy::lambdaRolePolicy
      type: aws:iam/rolePolicy:RolePolicy
    - urn: >-
        urn:pulumi:examples-api::stepfunctions-py::aws:lambda/function:Function::helloWorldFunction
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::stepfunctions-py::aws:sfn/stateMachine:StateMachine::stateMachine
      type: aws:sfn/stateMachine:StateMachine

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-py-stepfunctions/README.md)

# AWS Step Functions

A basic example that demonstrates using AWS Step Functions with a Lambda function, written in Python.

```bash
# Create and configure a new stack
pulumi stack init stepfunctions-dev
pulumi config set aws:region us-east-2

# Preview and run the deployment
pulumi up

# Start execution using the AWS CLI (or from the console at https://console.aws.amazon.com/states)
aws stepfunctions start-execution --state-machine-arn $(pulumi stack output state_machine_arn)

# Remove the app and its stack
pulumi destroy && pulumi stack rm -y
```

