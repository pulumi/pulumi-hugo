---
title: "Setup AWS Secrets manager"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-go-secrets-manager
  settings:
    name: aws-go-secrets-manager
    description: A minimal AWS Go Pulumi program
    runtime: go

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
      secretContainer:
        value: >-
          arn:aws:secretsmanager:us-west-2:894850187425:secret:secretcontainer-2a00018-TuNlQp
        secret: false
    startTime: 1683386725000
    endTime: 1683386758000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-go-secrets-manager::pulumi:pulumi:Stack::aws-go-secrets-manager-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-go-secrets-manager::pulumi:providers:aws::default
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-go-secrets-manager::aws:secretsmanager/secret:Secret::secretcontainer
      type: aws:secretsmanager/secret:Secret
    - urn: >-
        urn:pulumi:examples-api::aws-go-secrets-manager::aws:secretsmanager/secretVersion:SecretVersion::secret
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

    View Live: https://app.pulumi.com/acmecorp/aws-go-secrets-manager/dev/updates/1

        Type                                 Name                        Status
    +   pulumi:pulumi:Stack                  aws-go-secrets-manager-dev  created
    +   ├─ aws:secretsmanager:Secret         secretcontainer             created
    +   └─ aws:secretsmanager:SecretVersion  secret                      created

    Outputs:
        secretContainer: "arn:aws:secretsmanager:us-east-1:xxxxxxxx:secret:secretcontainer-562188f-67Rt8n"

    Resources:
        + 3 created

    Duration: 11s
    ```

## Clean up

1.  Run `pulumi destroy` to tear down all resources.

1.  To delete the stack itself, run `pulumi stack rm`. Note that this command deletes all deployment history from the Pulumi console.

