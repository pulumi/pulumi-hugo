---
title: "Scheduled Function on AWS"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-ts-scheduled-function
  settings:
    name: aws-ts-scheduled-function
    description: Basic example of AWS Cloud Watch Scheduled Function
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 17
    outputs:
      bucketName:
        value: trash-8c8a648
        secret: false
    startTime: 1683412721000
    endTime: 1683412755000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::pulumi:pulumi:Stack::aws-ts-scheduled-function-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription::emptyTrash
      type: aws:cloudwatch:EventRuleEventSubscription
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:iam/role:Role::emptyTrash
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::emptyTrash-e1a3786d
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::emptyTrash-1b4caae3
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:cloudwatch/eventRule:EventRule::emptyTrash
      type: aws:cloudwatch/eventRule:EventRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::emptyTrash-019020e7
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::emptyTrash-b5aeb6b6
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::emptyTrash-6c156834
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::emptyTrash-74d12784
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::emptyTrash-4aaabb8e
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::emptyTrash-a1de8170
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::emptyTrash-7cd09230
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:s3/bucket:Bucket::trash
      type: aws:s3/bucket:Bucket
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:lambda/function:Function::emptyTrash
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:lambda/permission:Permission::emptyTrash
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-ts-scheduled-function::aws:cloudwatch:EventRuleEventSubscription$aws:cloudwatch/eventTarget:EventTarget::emptyTrash
      type: aws:cloudwatch/eventTarget:EventTarget

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

