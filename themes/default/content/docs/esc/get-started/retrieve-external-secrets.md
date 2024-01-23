---
title_tag: Retrieve External Secrets | Pulumi ESC
title: Retrieve secrets from external sources
h1: "Pulumi ESC: Retrieve Secrets from External Sources"
meta_desc: This page provides an overview on how to retrieve secrets from external sources.
weight: 7
menu:
  pulumiesc:
    parent: esc-get-started
    identifier: esc-get-started-retrieve-external-secrets
---

## Overview

With Pulumi ESC, you can store configuration values as plaintext or as secrets directly in the environment file. You also have the option to dynamically import secrets from external sources such as:

- AWS Secrets Manager
- Azure KeyVault
- Google Secret Manager

This enables you to centralize both new and existing secrets and configurations and use them in multiple places without duplicating values across providers or environments.

## Retrieve external secrets

If you have not done so already, make sure you have [configured OIDC connectivity](/docs/esc/get-started/begin/#configure-openid-connect-oidc) between Pulumi and one of the below supported providers.

{{% chooser cloud "aws,azure,gcp" / %}}

{{% choosable cloud aws %}}

To retrieve secret values from AWS Secrets Manager, you must first [create a Secrets Manager secret](https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html) if you do not have one created already.

Once that is complete, you will need to update your environment definition to add the [`aws-secrets` provider](/docs/esc/providers/aws-secrets/) configuration. To do this, add the following configuration to your environment definition, making sure to:

- nest it under the `aws` second-level key
- replace the value of `<your-aws-region-here>` with your secret's region
- replace the value of `<your-secret-name-here>` with the name of your secret

```yaml
values:
  aws: # your existing oidc configuration
    login:
      ...
      ...
    secrets: # add the aws-secrets provider config
      fn::open::aws-secrets:
        region: <your-aws-region-here>
        login: ${aws.login}
        get:
          app-secret:
            secretId: <your-secret-name-here>
```

Your updated environment file should look similar to the following:

```yaml
# example environment definition
values:
  aws:
    login:
      fn::open::aws-login:
        oidc:
          roleArn: arn:aws:iam::0123456789:role/esc-oidc
          sessionName: pulumi-environments-session
          duration: 1h
    secrets:
      fn::open::aws-secrets:
        region: us-east-1
        login: ${aws.login}
        get:
          app-secret:
            secretId: my-app-secret
```

You can validate this configuration one of two ways:

- [Open the environment via the ESC console](/docs/esc/get-started/store-and-retrieve-secrets/#retrieve-via-the-console)
  - Click the **Open** button and then click the **Show secrets** slider
- [Open the environment via the ESC CLI](/docs/esc/get-started/store-and-retrieve-secrets/#retrieve-via-the-cli)
  - Run the `esc env open <your-org>/<your-environment-name>` command, making sure to replace the values of `<your-org>` and `<your-environment-name>` with the names of your Pulumi organization and ESC environment respectively.

If you need to retrieve multiple Secrets Manager secrets, you can do so as shown below:

```yaml
values:
  aws:
    login:
      ...
      ...
    secrets:
      fn::open::aws-secrets:
        region: us-east-1
        login: ${aws.login}
        get:
          app-secret:
            secretId: my-app-secret
          api-key: # additional AWS Secrets Manager secret
            secretId: my-api-key
```

{{% /choosable %}}

{{% choosable cloud azure %}}

TBD Azure KeyVault Steps

{{% /choosable %}}

{{% choosable cloud gcp %}}

TBD Google Secret Manager Steps

{{% /choosable %}}

In the next section, you will ...

{{< get-started-stepper >}}
