---
title: Get started
title_tag: Get Started with Pulumi ESC (Environments, Secrets, and Configuration)
h1: Get Started with Pulumi ESC (Environments, Secrets, and Configuration)
meta_desc: Learn how to manage secrets and hierarchical configuration with Pulumi.
meta_image: /images/docs/meta-images/docs-meta.png
menu:
  pulumi-esc:
    identifier: get-started
    parent: esc
    weight: 1
aliases:
  - /docs/pulumi-cloud/esc/get-started/
---

In a typical development workflow, there's often a need to maintain multiple environments such as development, staging, and production. Each of these environments might have its own set of configuration values: API endpoints, database connection strings, third-party secrets, and more.

Hardcoding these values or keeping them inside source code is a security risk and makes managing configurations complex. Pulumi ESC (Environments, Secrets and Configuration) offers a centralized store to manage configuration data, plain-text data, and secrets.

In this tutorial, we’ll demonstrate the power of Pulumi ESC in managing configuration across multiple environments.

{{< notes type="warning" >}}
Currently WIP. Everything below this part will be getting moved into separate sections.
{{< /notes >}}

### Retrieve Environment Values

Now that you have populated your environment files, you can verify that your values have been successfully stored by retrieving them through the Pulumi ESC CLI. Start by running the following command to log into the CLI:

```bash
esc login
```

You will be prompted to log in to the Pulumi Cloud using either the browser or by optionally providing an access token.

```bash
$ esc login
Manage your Pulumi ESC environments by logging in.
Run `esc --help` for alternative login options.
Enter your access token from https://app.pulumi.com/account/tokens
    or hit <ENTER> to log in using your browser                   :
Logged in to https://api.pulumi.com/ as your-pulumi-org (https://app.pulumi.com/your-pulumi-org)
```

The CLI has a built-in `get` command that enables you to retrieve a single value from your environment. The format of the full command looks like the following:

```bash
esc env get <your-org>/<your-environment-name> <variable-key-name>
```

Let's assume that your Pulumi organization is named `acme` and the environment that you want to retrieve values from is named `app-env-dev`. If you want to retrieve the value of the `API_KEY` variable, the command to do so would look like the following:

```bash
esc env get acme/app-env-dev API_KEY
```

Running this command should return the value of the API key that you added to your environment file. The output will look similar to the following:

```bash
$ esc env get acme/app-env-dev API_KEY
"M28zraZb2b42Fu0MD1CA"
```

### Importing Environments

There may be scenarios where the value you need to retrieve is stored in a different environment file. For example, since your base application endpoint URL will be the same across environments, it would be more efficient to define it once in one place rather than multiple times across multiple environment files.

With Pulumi ESC, you can import other environments into your environment file and make use of the imported configuration values and secrets. Similar to `values`, `imports` is a top-level key you will need to define in the environment file, meaning the syntax to create an import looks like the following:

```yaml
imports:
  - environment-name-1
  - environment-name-2
values:
    ...
    ...
```

In both your `app-env-dev` and `app-env-test` environment files, add the following code to import the `app-env-global` environment:

```yaml
imports:
  - app-env-global
```

When you save the file, the environment preview will update to show that `ENDPOINT_URL` is now included in the list of accessible variables in this environment.

```yaml
{
  "API_KEY": "M28zraZb2b42Fu0MD1CA",
  "ENDPOINT_URL": "https://nixsrrftwh.execute-api.eu-central-1.amazonaws.com",
  "ENVIRONMENT": "dev"
}
```

You can validate that the import was successful by running the `esc env get` command against the `ENDPOINT_URL` variable as shown below:

```bash
$ esc env get acme/app-env-dev ENDPOINT_URL
"https://nixsrrftwh.execute-api.eu-central-1.amazonaws.com"
```

### Dynamically Generate Environment Values

For the purposes of this tutorial, you've manually added the values of your API keys to your `dev` and `test` environment files. However, this is not the recommended best practice when it comes to the storing, management, and retrieval of sensitive values.

With Pulumi ESC, you can dynamically retrieve those values directly from a provider. In this next section, you will learn how to configure your environment file to retrieve secret values from AWS Secrets Manager.

{{< notes >}}
This step assumes that you already have [Pulumi configured as an OIDC provider in AWS](/docs/pulumi-cloud/esc/providers/#setting-up-oidc).
{{< /notes >}}

In both your `app-env-dev` and `app-env-test` environment files, update your code to the following:

```yaml
# Example for the app-env-dev environment file
imports:
  - app-env-global
values:
  aws:
    login:
      fn::open::aws-login:
        oidc:
          roleArn: <your-oidc-role-arn-here>
          sessionName: pulumi-environments-session
          duration: 1h
    secrets:
      fn::open::aws-secrets:
        region: <your-aws-region-here>
        login: ${aws.login}
        get:
          api-key:
            secretId: escDevApiKey
  ENVIRONMENT: "dev"
  API_KEY: ${aws.secrets.api-key}
```

Make sure to do the following:

- replace the placeholder text for the `roleArn` parameter with the ARN of your OIDC role
- provide a value for `duration` no greater than the [maximum session duration](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html) of your OIDC role
- provide the name of the AWS region that you deployed your sample application into
- provide the relevant values for `secretId` and `ENVIRONMENT` in the corresponding environment file

As shown with the `${aws.login}` and `${aws.secrets.api-key}` references above, values within Pulumi ESC environments, as well as its imports, can be referenced through the use of interpolations. Below is an example of what this would look like in the console:

![Adding AWS provider integration into an environment](./esc-aws-provider-integration.png)

You can verify your provider connection and the retrieval of your secret from AWS Secrets Manager by running the `esc open acme/app-env-dev API_KEY` command.

{{< notes >}}
To see examples for how to accomplish this with other providers, take a look at the [syntax reference documentation for Pulumi ESC](/docs/pulumi-cloud/esc/reference).
{{< /notes >}}

### Exposing Values as Environment Variables

The Pulumi ESC CLI also has a `run` command that enables you to run other commands using environment variables (for example the `aws s3 ls` command) without having to locally set the environment variables first. This is great for when you have other components or applications that may need to interact with your endpoints as part of a larger application workflow.

For example, if you have a CI/CD pipeline that will automatically push blog post updates to a content-management system, you can enable it to retrieve the endpoint and API key specific to its environment and run the command to update the post.

However, values in your environment file are not exposed as environment variables by default. You can expose them by adding your key-value pairs under a second-level key labeled `environmentVariables`:

```yaml
values:
  environmentVariables: # Configuration will be exported to the provided environment variables.
    myEnvVarKey: myEnvVarValue
```

Following the above format, add the `environmentVariables` key to your `app-env-dev` and `app-env-test` environment files. Then, move your `ENDPOINT_URL`, `ENVIRONMENT` and `API_KEY` variables so that they are nested underneath it before saving your file.

```yaml
# Example for the app-env-dev environment file
imports:
  - app-env-global
values:
  aws:
    login:
      fn::open::aws-login:
        oidc:
          roleArn: <your-oidc-role-arn-here>
          sessionName: pulumi-environments-session
          duration: 1h
    secrets:
      fn::open::aws-secrets:
        region: <your-aws-region-here>
        login: ${aws.login}
        get:
          api-key:
            secretId: escDevApiKey
  environmentVariables: # Add this variable
    ENDPOINT_URL: ${ENDPOINT_URL} # explicitly referenced to be made accessible as an environment variable
    ENVIRONMENT: "dev"
    API_KEY: ${aws.secrets.api-key}
```

Now take a look at the contents of the `validate-endpoints.sh` bash script.

```bash
#! /bin/sh

esc run acme/app-env-dev \
-- bash -c "python3 test-endpoint.py \$ENDPOINT_URL \$ENVIRONMENT \$API_KEY"
```

This script executes a Python file that is meant to simulate an application that interacts with your endpoint.

As seen above, the `ENDPOINT_URL`, `ENVIRONMENT`, and `API_KEY` values that you defined in your environment file are referenced directly in the command as environment variables, without needing to explicitly set them locally and without needing to use the `esc env get` command to retrieve their values inline.

Replace the value of `acme/app-env-dev` with the name of your Pulumi organization and desired environment and save the file.

Then run the following commands to execute the script:

```bash
chmod a+x validate-endpoint.sh
./validate-endpoint.sh
```

When providing the name of your `app-env-dev` environment file, you should see a response similar to the following:

``` bash
$ ./validate-endpoints.sh
"You have reached the simulated DEV endpoint."
```

If you run the command with `app-env-test`, it will state `You have reached the simulated TEST endpoint.` instead.

## Integrating with Pulumi IaC

{{< notes >}}
This section of the tutorial is optional and requires the installation of the [Pulumi IaC CLI](/docs/cli/) and one of [Pulumi's supported language runtimes](/docs/languages-sdks/) as a prerequisite.
{{< /notes >}}

Pulumi ESC works independently of [Pulumi Infrastructure as Code (IaC)](/docs/get-started/), providing developers the flexibility to centrally manage their environment configuration regardless of how or where those environments are created.

Pulumi ESC also integrates seamlessly with Pulumi IaC, and this next section will demonstrate how to leverage Pulumi ESC in your own Pulumi programs. This works everywhere, including Pulumi Deployments and GitHub Actions, without any additional work or changes.

### Create and Configure a New Project

To start, [create a new Pulumi AWS project](/docs/clouds/aws/get-started/create-project/) and [ensure it is configured to use your AWS account](/registry/packages/aws/installation-configuration/).

During the creation of your project, you will typically be prompted for some configuration values for the stack.

```bash
$ pulumi new aws-python
This command will walk you through creating a new Pulumi project.

Enter a value or leave blank to accept the (default), and press <ENTER>.
Press ^C at any time to quit.

project name (pulumi-python):
project description (A minimal AWS Python Pulumi program):
Created project 'pulumi-python'

Please enter your desired stack name.
To create a stack in an organization, use the format <org-name>/<stack-name> (e.g. `acmecorp/dev`).
stack name (dev): zephyr/esc-dev
Created stack 'zephyr/esc-dev'

aws:region: The AWS region to deploy into (us-east-1): us-east-2
Saved config

Installing dependencies...

Finished installing dependencies

Your new project is ready to go!

To perform an initial deployment, run `pulumi up`
```

For AWS projects, you are prompted for the AWS region.

This value is stored in a file called `Pulumi.<your-stack-name>.yaml`.

```yaml
config:
  aws:region: us-east-2
```

Defining the configuration this way may be fine when dealing with a singular project, but it can become very challenging to maintain securely and consistently across multiple projects. Centralizing these configuration values provides more scalability without increasing administrative overhead along the way.

### Centralize the Configuration

To centralize this configuration for your Pulumi program, you will need to add a second-level key named `pulumiConfig` in your environment file that will expose the values nested underneath it to Pulumi IaC.

```yaml
values:
  pulumiConfig:
    aws:region: us-east-2
```

Then return to your `Pulumi.<your-stack-name>.yaml` file and update it to import your environment as shown below:

```yaml
environment:
  - app-env-dev
```

Make sure to update the value in the `environment` section with the name of your own environment before saving the file.

Then run the `pulumi up` command.

```bash
$ pulumi up -y
Previewing update (zephyr/esc-dev)

View in Browser (Ctrl+O): https://app.pulumi.com/zephyr/pulumi-python/esc-dev/previews/8bfb476b-7ef8-4843-ac0f-4f663577243f

     Type                 Name                   Plan       Info
 +   pulumi:pulumi:Stack  pulumi-python-esc-dev  create
 +   └─ aws:s3:Bucket     my-bucket              create

Outputs:
    bucket_name: output<string>

Resources:
    + 2 to create

Updating (zephyr/esc-dev)

View in Browser (Ctrl+O): https://app.pulumi.com/zephyr/pulumi-python/esc-dev/updates/5

     Type                 Name                   Status           Info
 +   pulumi:pulumi:Stack  pulumi-python-esc-dev  created (6s)
 +   └─ aws:s3:Bucket     my-bucket              created (2s)

Outputs:
    bucket_name: "my-bucket-6302f8e"

Resources:
    + 2 created

Duration: 7s
```

If you view your resource in the AWS console, you will see that your program resources will get created in the region you specified in your environment file.

![Showing AWS S3 bucket properties](./esc-show-s3-region.png)

### Access Configuration from Code

You can also reference the `pulumiConfig` environment values directly from within your Pulumi program in the same way that you would access them from the project's config file.

```yaml
# Example environment File
values:
  pulumiConfig:
    myKey: "Test value"
```

```python
# Example Pulumi Python Program
import pulumi

config = pulumi.Config()
myValue = config.get("myKey")

pulumi.export('Value', myValue)
```

```bash
# Example Program Output
$ pulumi up -y
Previewing update (zephyr/esc-dev)

View in Browser (Ctrl+O): https://app.pulumi.com/zephyr/pulumi-python/esc-dev/previews/d82a61b3-5405-4f6d-9ac7-336257f5a25f

     Type                 Name                   Plan       Info
 +   pulumi:pulumi:Stack  pulumi-python-esc-dev  create

Outputs:
    Value: "Test value"

Resources:
    + 1 to create

Updating (zephyr/esc-dev)

View in Browser (Ctrl+O): https://app.pulumi.com/zephyr/pulumi-python/esc-dev/updates/13

     Type                 Name                   Status              Info
 +   pulumi:pulumi:Stack  pulumi-python-esc-dev  created (0.51s)

Outputs:
    Value: "Test value"

Resources:
    + 1 created

Duration: 2s
```

See the Pulumi documentation on [Accessing Configuration from Code](https://www.pulumi.com/docs/concepts/config/#code) for more details.

## Clean Up

{{< cleanup >}}

Then run the following command from the root of the sample application folder to delete the AWS resources, replacing the placeholder text with the name of your CloudFormation stack as provided in your stack outputs:

```bash
aws cloudformation delete-stack --stack-name <your-stack-name>
```

## Next Steps

In this tutorial, you created and retrieved values from a Pulumi environment. You also exposed and programmatically consumed values as environment variables and as Pulumi configuration.

To learn more about managing configuration and secrets in Pulumi, take a look at the following resources:

- Learn more about [environments](/docs/concepts/environments/), [secrets](/docs/concepts/secrets/), and [configuration](/docs/concepts/config/) in the Pulumi documentation.
- Learn more about defining Pulumi ESC environment files in the [Pulumi ESC YAML Syntax Reference](/docs/pulumi-cloud/esc/reference).

{{< get-started-stepper >}}
