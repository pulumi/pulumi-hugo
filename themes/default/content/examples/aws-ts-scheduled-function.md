---
title: "Scheduled Function on AWS"
meta_desc: "Basic example of AWS Cloud Watch Scheduled Function"
metadata:
  id: aws-ts-scheduled-function
  title: "Scheduled Function on AWS"
  description: "Basic example of AWS Cloud Watch Scheduled Function"
  url: https://github.com/pulumi/examples/tree/master/aws-ts-scheduled-function
  runtime: nodejs
  lastUpdate: 1683412755000
  duration: 34000
  resources:
  - pulumi:pulumi:Stack
  - aws:cloudwatch:EventRuleEventSubscription
  - pulumi:providers:aws
  - aws:iam/role:Role
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:cloudwatch/eventRule:EventRule
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:s3/bucket:Bucket
  - aws:lambda/function:Function
  - aws:lambda/permission:Permission
  - aws:cloudwatch/eventTarget:EventTarget

summary: "This Pulumi example creates a scheduled cloud function on AWS using TypeScript. It sets up an AWS Lambda and uses CloudWatch Events to trigger it to run at a user-defined frequency. The example demonstrates how to use Pulumi to create serverless infrastructure components and manage them through code, enabling more concise and repeatable deployments."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-ts-scheduled-function/README.md)

# Scheduled Function on AWS

A simple function in AWS that executes based on a schedule using CloudWatch.

In this example, an S3 Bucket will be created. A function will run every Friday at 11:00pm UTC
that will delete all of the objects it contains.

## Deploying and running the program

1.  Create a new stack:

    ```bash
    $ pulumi stack init dev
    ```

1.  Set the AWS region:

    ```
    $ pulumi config set aws:region us-east-1
    ```

1.  Restore NPM modules via `npm install` or `yarn install`.

1.  Run `pulumi up` to preview and deploy changes:

    ```
    $ pulumi up
    Previewing update of stack 'dev'
    ...

    Updating (dev):

        Type                                          Name                           Status
    +   pulumi:pulumi:Stack                           aws-ts-scheduled-function-dev  created
    +   ├─ aws:cloudwatch:EventRuleEventSubscription  emptyTrash                     created
    +   │  ├─ aws:cloudwatch:EventRule                emptyTrash                     created
    +   │  ├─ aws:iam:Role                            emptyTrash                     created
    +   │  ├─ aws:iam:RolePolicyAttachment            emptyTrash-32be53a2            created
    +   │  ├─ aws:lambda:Function                     emptyTrash                     created
    +   │  ├─ aws:cloudwatch:EventTarget              emptyTrash                     created
    +   │  └─ aws:lambda:Permission                   emptyTrash                     created
    +   └─ aws:s3:Bucket                              trash                          created

    Outputs:
        bucketName: "trash-28693b6"

    Resources:
        + 9 created

    Duration: 16s
    ```

## Clean up

1.  Run `pulumi destroy` to tear down all resources.

1.  To delete the stack itself, run `pulumi stack rm`. Note that this command deletes all deployment history from the Pulumi console.

