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
- Azure Key Vault
- Google Secret Manager

This enables you to centralize both new and existing secrets and configurations and use them in multiple places without duplicating values across providers or environments.

## Import external secrets

If you have not done so already, make sure you have [configured OIDC connectivity](/docs/esc/get-started/begin/#configure-openid-connect-oidc) between Pulumi and one of the below supported providers. During the configuration, you will need to make sure that you add the permissions necessary to interact with secrets in your chosen provider.

{{% chooser cloud "aws,azure,gcp" / %}}

{{% choosable cloud aws %}}

To retrieve secret values from AWS Secrets Manager, you must first:

- [create a Secrets Manager secret](https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html)

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

You can validate this configuration by [opening the environment via the ESC console](/docs/esc/get-started/store-and-retrieve-secrets/#retrieve-via-the-console), clicking the **Open** button and then clicking the **Show secrets** slider.

{{< video title="Opening imported AWS secrets in Pulumi ESC console" src="/docs/esc/get-started/esc-show-aws-secret.mp4" autoplay="true" loop="true" >}}

Alternatively, you can validate the configuration by [opening the environment via the ESC CLI](/docs/esc/get-started/store-and-retrieve-secrets/#retrieve-via-the-cli). Run the `esc env open <your-org>/<your-environment-name>` command, making sure to replace the values of `<your-org>` and `<your-environment-name>` with the names of your Pulumi organization and ESC environment respectively.

```bash
$ esc env open pulumi/aws-secrets-example
{
  "aws": {
    "login": {
      "accessKeyId": "ASIA...",
      "secretAccessKey": "Jdt...",
      "sessionToken": "Fwo..."
    },
    "secrets": {
      "app-secret": "pulumi-esc-get-started-secret"
    }
  }
}
```

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

To retrieve secret values from Azure Key Vault, you must first:

- [create an Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/quick-create-portal)
- add a Key Vault role assignment
  - On your Key Vault's service page, follow steps 3 - 8 in the [Azure OIDC guide](/docs/pulumi-cloud/oidc/azure/#create-a-service-principal), making sure to select the "Key Vault Secrets Officer" role under the **Job functions role** tab
- [create an Azure Key Vault secret](https://learn.microsoft.com/en-us/azure/key-vault/secrets/quick-create-portal)

Once that is complete, you will need to update your environment definition to add the [`azure-secrets` provider](/docs/esc/providers/azure-secrets/) configuration. To do this, add the following configuration to your environment definition, making sure to:

- nest it under the `azure` second-level key
- replace the value of `<your-vault-name-here>` with the name of your vault
- replace the value of `<your-secret-name-here>` with the name of your secret

```yaml
values:
  azure: # your existing oidc configuration
    login:
      ...
      ...
    secrets:
      fn::open::azure-secrets:
        login: ${azure.login}
        vault: <your-vault-name-here>
        get:
          app-secret:
            name: <your-secret-name-here>
```

Your updated environment file should look similar to the following:

```yaml
# example environment definition
values:
  azure:
    login:
      fn::open::azure-login:
        clientId: 99b...
        tenantId: 706...
        subscriptionId: 028...
        oidc: true
    secrets:
      fn::open::azure-secrets:
        login: ${azure.login}
        vault: pulumi-esc-vault
        get:
          app-secret:
            name: my-app-secret
```

You can validate this configuration by [opening the environment via the ESC console](/docs/esc/get-started/store-and-retrieve-secrets/#retrieve-via-the-console), clicking the **Open** button and then clicking the **Show secrets** slider.

{{< video title="Opening imported Azure secrets in Pulumi ESC console" src="/docs/esc/get-started/esc-show-azure-secret.mp4" autoplay="true" loop="true" >}}

Alternatively, you can validate the configuration by [opening the environment via the ESC CLI](/docs/esc/get-started/store-and-retrieve-secrets/#retrieve-via-the-cli). Run the `esc env open <your-org>/<your-environment-name>` command, making sure to replace the values of `<your-org>` and `<your-environment-name>` with the names of your Pulumi organization and ESC environment respectively.

```bash
$ esc env open pulumi/azure-secrets-example
{
  "azure": {
    "login": {
      "clientId": "99b...",
      "oidc": {
        "token": "eyJ..."
      },
      "subscriptionId": "028...",
      "tenantId": "706..."
    },
    "secrets": {
      "app-secret": "pulumi-esc-get-started-secret"
    }
  }
}
```

If you need to retrieve multiple Azure Key Vault secrets, you can do so as shown below:

```yaml
values:
  azure:
    login:
      ...
      ...
    secrets:
      fn::open::azure-secrets:
        login: ${azure.login}
        vault: pulumi-esc-vault
        get:
          app-secret:
            name: my-app-secret
          api-key: # additional Azure Key Vault secret
            secretId: my-api-key
```

{{% /choosable %}}

{{% choosable cloud gcp %}}

TBD Google Secret Manager Steps

{{% /choosable %}}

In the next section, you will ...

{{< get-started-stepper >}}
