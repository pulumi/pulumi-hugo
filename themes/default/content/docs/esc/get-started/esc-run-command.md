---
title_tag: Run Commands Without Local Secrets | Pulumi ESC
title: Run commands without local secrets
h1: "Pulumi ESC: Run Commands Without Local Secrets"
meta_desc: This page provides an overview on how to run commands without using local secrets using the "esc run" command.
weight: 6
menu:
  pulumiesc:
    parent: esc-get-started
    identifier: esc-get-started-esc-run-command
---

## Overview

The Pulumi ESC CLI also has a [`run` command](/docs/esc-cli/commands/esc_run/) that enables you to run other commands using environment variables without having to locally set the environment variables first. This is great for when you have other components or applications that may need to interact with your endpoints as part of a larger application workflow.

For example, if you have a CI/CD pipeline that will automatically push blog post updates to a content-management system, you can enable it to retrieve the endpoint and API key specific to its environment and run the command to update the post.

## Expose environment variables

Values in your environment file are not exposed as environment variables by default. You can expose them by adding your key-value pairs under a second-level key labeled `environmentVariables`:

```yaml
values:
  environmentVariables: # Configuration will be exported to the provided environment variables.
    myEnvVarKey: myEnvVarValue
```

## Run commands with static secrets

Following the format above, add the following configuration to your environment file:

```yaml
values:
  environmentVariables:
    API_KEY:
      fn::secret: "my-api-key-1234567"
```

Then run the following command to echo the value of `API_KEY` which should be empty:

```bash
# The output should not return anything
$ echo $API_KEY

```

 Now run the command using `esc run` as shown below, making sure to replace <your-pulumi-org-name> and <your-environment-name> with the names of your own Pulumi organization and environment respectively

```bash
esc run <your-pulumi-org-name>/<your-environment-name> -- bash -c "echo \$API_KEY"
```

{{< notes type="info" >}}
It is important to note that commands run using `esc run` are not run in a subshell. This means that any commands that reference an environment variable like shown in the example above are not expanded by default. You will need to invoke the command inside a shell if you need environment variable expansion. The `bash -c` portion of the command is what does this.
{{< /notes >}}

Because you have stored the value of `API_KEY` as a secret, your output will resemble the following:

```bash
$ esc run pulumi/my-dev-environment -- bash -c "echo \$API_KEY"
[secret]
```

## Run commands with dynamic credentials

For supported cloud providers, the `esc run` command also enables you to run commands like `aws s3 ls` without having to manually configure provider credentials in your local environments. In this section, you will learn how to use Pulumi ESC with dynamically generated cloud credentials so that every provider command you run incorporates security best practices like short-term, scoped credentials issued via OpenID Connect (OIDC).

If you have not done so already, make sure you have [configured OIDC connectivity](/docs/esc/get-started/begin/#configure-openid-connect-oidc) between Pulumi and one of the below supported providers.

{{< notes type="info" >}}
This functionality is currently not available for the Azure cloud provider.
{{< /notes >}}

{{% chooser cloud "aws,gcp" / %}}

{{% choosable cloud aws %}}

First check that your local environment does not have any AWS credentials configured by running the `aws configure list` command as shown below:

```bash
$ aws configure list
      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                <not set>             None    None
access_key                <not set>             None    None
secret_key                <not set>             None    None
    region                <not set>             None    None
```

Then run the `aws s3 ls` command as normal. You should see the following response indicating that you do not have local credentials configured to run this command:

```bash
$ aws s3 ls

Unable to locate credentials. You can configure credentials by running "aws configure".
```

Now run the command using `esc run` as shown below, making sure to replace <your-pulumi-org-name> and <your-environment-name> with the names of your own Pulumi organization and environment respectively:

```bash
esc run <your-pulumi-org-name>/<your-environment-name> -- aws s3 ls
```

You should be presented with a list of S3 buckets in the account associated with your credentials.

```bash
# example command and output
esc run pulumi/my-dev-environment -- aws s3 ls

2023-12-10 02:52:46 my-bucket-4a67543
2023-11-16 21:37:40 my-bucket-4b1e6cb
2023-10-27 21:04:59 my-bucket-50da4ad
2023-11-02 18:57:36 my-bucket-51385eb
```

{{% /choosable %}}

{{% choosable cloud gcp %}}

First check that your local environment does not have any Google Cloud credentials configured by running the following command:

```bash
$ gcloud auth revoke
```

Then run the `gcloud iam service-accounts list` command as normal. You should see the following response indicating that you do not have local credentials configured to run this command:

```bash
$ gcloud iam service-accounts list
ERROR: (gcloud.iam.service-accounts.list) You do not currently have an active account selected.
Please run:

  $ gcloud auth login

to obtain new credentials.

If you have already logged in with a different account, run:

  $ gcloud config set account ACCOUNT

to select an already authenticated account to use.
```

Now run the command using `esc run` as shown below, making sure to replace <your-pulumi-org-name> and <your-environment-name> with the names of your own Pulumi organization and environment respectively:

```bash
esc run <your-pulumi-org-name>/<your-environment-name> -- gcloud iam service-accounts list
```

You should be presented with a list of Service Accounts in the account associated with your credentials.

```bash
# example command and output
$ esc run pulumi/my-dev-environment -- gcloud iam service-accounts list

DISPLAY NAME                            EMAIL                                                              DISABLED
service-account-1               service-account-1@my-project.iam.gserviceaccount.com                        False
service-account-2               service-account-2@my-project.iam.gserviceaccount.com                        False
```

{{% /choosable %}}

In the next section, you will learn how to retrieve secret values from external sources.

{{< get-started-stepper >}}
