---
title: "Setup AWS Secrets manager"
meta_desc: "A minimal AWS Python Pulumi program"
metadata:
  id: aws-py-secrets-manager
  title: "Setup AWS Secrets manager"
  description: "A minimal AWS Python Pulumi program"
  url: https://github.com/pulumi/examples/tree/master/aws-py-secrets-manager
  runtime: python
  lastUpdate: 1683413060000
  duration: 47000
  resources:
  - pulumi:pulumi:Stack
  - pulumi:providers:aws
  - aws:secretsmanager/secret:Secret
  - aws:secretsmanager/secretVersion:SecretVersion

summary: "This Pulumi example from the Github repository sets up a secure Azure secrets manager using the Python programming language. The example shows how to set up access policies for a secrets manager, store a secret in the service, and then refer to it using an environment variable. The example also demonstrates how to retrieve encrypted secrets. This example serves as a use case for securely managing secrets in the cloud using Azure and Python."
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

