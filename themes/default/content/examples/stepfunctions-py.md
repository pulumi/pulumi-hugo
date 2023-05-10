---
title: "AWS Step Functions"
meta_desc: "Basic example of AWS Step Functions in Python"
metadata:
  id: stepfunctions-py
  title: "AWS Step Functions"
  description: "Basic example of AWS Step Functions in Python"
  url: https://github.com/pulumi/examples/tree/master/stepfunctions-py
  runtime: python
  lastUpdate: 1683413077000
  duration: 55000
  resources:
  - pulumi:pulumi:Stack
  - pulumi:providers:aws
  - aws:iam/role:Role
  - aws:iam/role:Role
  - aws:iam/rolePolicy:RolePolicy
  - aws:iam/rolePolicy:RolePolicy
  - aws:lambda/function:Function
  - aws:sfn/stateMachine:StateMachine

summary: "This Pulumi example creates a serverless workflow using Amazon Step Functions and Amazon API Gateway in Python. It uses Amazon Web Services (AWS) as the cloud provider. The example creates a Step Function to recognize entity types in strings and a web service to get the results. It serves as a general cloud-computing use case for enabling serverless workflows on AWS."
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

