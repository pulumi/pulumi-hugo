---
title: Run the 'aws s3 cp' Command using Dynamic Credentials
meta_desc: |
     TBD placeholder for now because of the 50 characters limit.

type: what-is
page_title: Run the 'aws s3 cp' Command using Dynamic Credentials
---

Amazon Web Services (AWS) is a leader in cloud computing, transforming the way organizations manage their digital infrastructure. An important part of the cloud computing landscape is the management of secrets and configurations. The effective management of cloud credentials can pose a significant challenge, especially when it comes to managing them at scale. [Pulumi ESC (Environments, Secrets, and Configurations)](/docs/pulumi-cloud/esc/) is a service that helps to alleviate the burden of managing cloud configuration and secrets by providing a centralized way to handle these critical aspects of cloud development. The `esc run` command of this service in particular helps to resolve concerns around how to:

- securely share credentials with teammates in a consistent way
- minimize the risks associated with locally configured, long-lived and highly privileged credentials
- ensure teams can easily and safely run commands like aws s3 ls without requiring deep security expertise

## What is the `esc run` command?

The [Pulumi documentation for the `esc run` command](https://www.pulumi.com/docs/esc-cli/commands/esc_run/) states the following:

> This command opens the environment with the given name and runs the given command. If the opened environment contains a top-level ’environmentVariables’ object, each key-value pair in the object is made available to the command as an environment variable.

But what does this actually mean? If we use AWS as an example, it means that we can run commands like `aws s3 cp` without the need to configure AWS credentials locally each time. It’s a significant stride towards making your cloud interactions more efficient and less error-prone, and here’s a deeper dive into why:

- **Seamless Command Execution** - The `esc run` command lets you execute AWS commands effortlessly, freeing you from the intricacies of managing AWS credentials on your local machine. Simply put, it significantly reduces the overhead of credential setup and maintenance.

- **Enhanced Security** - One of the standout features of `esc run` is its commitment to security. By removing the local storage of credentials, it drastically reduces the risk of accidental exposure. Your credentials and secrets are securely managed within the Pulumi environment.

- **Streamlined Collaboration** - Because credentials will be centralized, `esc run` facilitates smoother team collaboration by providing a consistent environment for all team members to run commands with. Everyone can access the same secure environment which reduces the complexities of coordinating credentials and configurations across teams.

## Getting started with `esc run`run

### Step 1: Install and login to Pulumi ESC

### Step 2: Create the OIDC configuration

### Step 3: Create a new Pulumi ESC environment

### Step 4: Add the AWS provider integration

### Step 5: Create a new S3 bucket

This step is optional if you already have access to an existing S3 bucket.

### Step 5: Run the `aws s3 cp` command

## Conclusion

TBD

Our [community on Slack](https://slack.pulumi.com/) is always open for discussions, questions, and sharing experiences. Join us there and become part of our growing community of cloud professionals!
