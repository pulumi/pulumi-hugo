---
title: Run 'aws s3 cp' using Dynamic Credentials
meta_desc: |
     Learn more about leveraging dynamic credentials in Pulumi ESC to run commands like aws s3 cp.

type: what-is
page_title: Run 'aws s3 cp' using Dynamic Credentials
---

Amazon Web Services (AWS) is a leader in cloud computing, transforming the way organizations manage their digital infrastructure. An important part of the cloud computing landscape is the management of secrets and configurations. The effective management of cloud credentials can pose a significant challenge, especially when it comes to managing them at scale. [Pulumi ESC (Environments, Secrets, and Configurations)](/docs/pulumi-cloud/esc/) is a service that helps to alleviate the burden of managing cloud configuration and secrets by providing a centralized way to handle these critical aspects of cloud development. The `esc run` command of this service in particular helps to resolve concerns around how to:

- securely share credentials with teammates in a consistent way
- minimize the risks associated with locally configured, long-lived and highly privileged credentials
- ensure teams can easily and safely run commands like aws s3 cp without requiring deep security expertise

## What is the esc run command?

The [Pulumi documentation for the `esc run` command](https://www.pulumi.com/docs/esc-cli/commands/esc_run/) states the following:

> This command opens the environment with the given name and runs the given command. If the opened environment contains a top-level ’environmentVariables’ object, each key-value pair in the object is made available to the command as an environment variable.

But what does this actually mean? If we use AWS as an example, it means that we can run commands like `aws s3 cp` without the need to configure AWS credentials locally each time. It’s a significant stride towards making your cloud interactions more efficient and less error-prone, and here’s a deeper dive into why:

- **Seamless Command Execution** - The `esc run` command lets you execute AWS commands effortlessly, freeing you from the intricacies of managing AWS credentials on your local machine. Simply put, it significantly reduces the overhead of credential setup and maintenance.

- **Enhanced Security** - One of the standout features of `esc run` is its commitment to security. By removing the local storage of credentials, it drastically reduces the risk of accidental exposure. Your credentials and secrets are securely managed within the Pulumi environment.

- **Streamlined Collaboration** - Because credentials will be centralized, `esc run` facilitates smoother team collaboration by providing a consistent environment for all team members to run commands with. Everyone can access the same secure environment which reduces the complexities of coordinating credentials and configurations across teams.

## Getting started with esc run

### Step 1: Install and login to Pulumi ESC

To begin, you’ll need to [install Pulumi ESC](/docs/install/esc/). Once the installation is complete, run the `esc login` command and follow the steps to login to the CLI.

```bash
$ esc login
Manage your Pulumi ESC environments by logging in.
Run `esc --help` for alternative login options.
Enter your access token from https://app.pulumi.com/account/tokens
    or hit <ENTER> to log in using your browser                   :  
Logged in to pulumi.com as …
```

### Step 2: Create the OIDC configuration

Pulumi ESC offers you the ability to manually set your credentials as secrets in your Pulumi ESC environment files. When it comes to something like OIDC configuration, a more secure and efficient alternative is to leverage yet another great feature of Pulumi ESC: dynamic credentials.

This service can dynamically generate credentials on your behalf each time you need to interact with your AWS environments. To do so, follow the steps in the [guide for configuring OIDC between Pulumi and AWS](/docs/pulumi-cloud/oidc/aws/). Make sure that the IAM role you create has sufficient permissions to perform S3 actions.

### Step 3: Create a new Pulumi ESC environment

Once OIDC has been configured between Pulumi and AWS, the next steps is to create a new environment in the [Pulumi Cloud](https://app.pulumi.com/). Make sure that you have the correct organization selected in the left-hand navigation menu. From there, click the **Environments** link, then click the **Create environment** button. In the following pop-up, provide a name for your environment before clicking the **Create environment** button.

{{< video title="Open environment in Pulumi ESC console" src="/what-is/esc-create-new-env.mp4" autoplay="true" loop="true" >}}

### Step 4: Add the AWS provider integration

Once you’ve created your new environment, you will be presented with a split-pane editor view. You’ll want to clear out the default placeholder content in the editor on the left-hand side and replace it with the following code, making sure to replace <your-oidc-iam-role-arn> with the value of your IAM role ARN from the configure OIDC step:

```yaml
values:
  aws:
    login:
      fn::open::aws-login:
        oidc:
          duration: 1h
          roleArn: <your-oidc-iam-role-arn>
          sessionName: pulumi-environments-session
  environmentVariables:
    AWS_ACCESS_KEY_ID: ${aws.login.accessKeyId}
    AWS_SECRET_ACCESS_KEY: ${aws.login.secretAccessKey}
    AWS_SESSION_TOKEN: ${aws.login.sessionToken}
```

### Step 5: Create a new S3 bucket

The `aws s3 cp` command can be used to copy files to, from, and between S3 buckets. If you do not already have an S3 bucket in your environment, you will need to create one. You can do so via the AWS CLI using the following command, making sure to replace the value of `<your-bucket-name>` with a [globally unique name](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html) for your bucket and the value of `<your-aws-region>` with your desired AWS region:

```bash
aws s3api create-bucket \
    --bucket <your-bucket-name> \
    --region <your-aws-region>
```

### Step 6: Create a sample file

In your local environment, create an empty file named `test.txt`.

```bash
# example CLI command for a Linux environment
$ touch test.txt
```

In the next step, you will use the `aws s3 cp` command to copy this file into your S3 bucket.

### Step 7: Run the aws s3 cp command

With your environment set up, validate your configuration by copying the local file to your S3 bucket. First make sure that your local environment does not have any AWS credentials configured. You can do this by running the `aws s3 cp` command normally as shown below:

```bash
$ aws s3 cp test.txt s3://<your-bucket-name>/copied-file.txt

Unable to locate credentials. You can configure credentials by running "aws configure".
```

Now run the command using `esc run` as shown below, making sure to replace `<your-pulumi-org-name>` and `<your-environment-name>` with the names of your own Pulumi organization and environment respectively:

```bash
esc run <your-pulumi-org-name>/<your-environment-name> -- aws s3 cp test.txt s3://<your-bucket-name>/copied-file.txt
```

Then validate that your file was successfully uploaded by running the following command, making sure to replace the value of `<your-bucket-name>` with the name of your S3 bucket:

```bash
aws s3api list-objects-v2 \
    --bucket <your-bucket-name>
```

You should see output similar to the following:

```bash
{
    "Contents": [
        {
            "LastModified": "2019-11-05T23:11:50.000Z",
            "ETag": "\"621503c373607d548b37cff8778d992c\"",
            "StorageClass": "STANDARD",
            "Key": "copied-file.txt",
            "Size": 391
        }
    ]
}
```

## Conclusion

TBD CTA

Our [community on Slack](https://slack.pulumi.com/) is always open for discussions, questions, and sharing experiences. Join us there and become part of our growing community of cloud professionals!
