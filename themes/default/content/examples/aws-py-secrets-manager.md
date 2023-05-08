---
title: "Setup AWS Secrets manager"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-py-secrets-manager
  settings:
    name: aws-py-secrets-manager
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
        create: 3
    outputs:
      secret_id:
        value: >-
          arn:aws:secretsmanager:us-west-2:894850187425:secret:secret-a402666-oOPdaj
        secret: false
    startTime: 1683413013000
    endTime: 1683413060000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-py-secrets-manager::pulumi:pulumi:Stack::aws-py-secrets-manager-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-py-secrets-manager::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-py-secrets-manager::aws:secretsmanager/secret:Secret::secret
      type: aws:secretsmanager/secret:Secret
    - urn: >-
        urn:pulumi:examples-api::aws-py-secrets-manager::aws:secretsmanager/secretVersion:SecretVersion::secret_version
      type: aws:secretsmanager/secretVersion:SecretVersion

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new)

# Setup AWS Secrets manager

A simple program that creates an AWS secret and a version under AWS Secrets Manager

## Deploying and running the program

1.  Create a new stack:

    ```bash
    $ pulumi stack init dev
    ```

1.  Set the AWS region:

    ```
    $ pulumi config set aws:region us-east-1
    ```

1.  Run `pulumi up` to preview and deploy changes:

    ```
    $ pulumi up
    Previewing update (dev)
    ...

    Updating (dev)

    View Live: https://app.pulumi.com/acmecorp/aws-py-secrets-manager/dev/updates/1

        Type                                 Name                        Status

    - pulumi:pulumi:Stack aws-py-secrets-manager-dev created
    - ├─ aws:secretsmanager:Secret secret_container created
    - └─ aws:secretsmanager:SecretVersion secret_version created

    Outputs:
    secret_id: "arn:aws:secretsmanager:us-east-1:xxxxxxxx:secret:secret_container-d07f0c4-N3OSrw"

    Resources: + 3 created

    Duration: 6s
    ```

## Clean up

1.  Run `pulumi destroy` to tear down all resources.

1.  To delete the stack itself, run `pulumi stack rm`. Note that this command deletes all deployment history from the Pulumi console.

