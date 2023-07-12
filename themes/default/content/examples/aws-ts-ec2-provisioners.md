---
title: "AWS WebServer with Manual Provisioning"
meta_desc: ""
metadata:
  id: aws-ts-ec2-provisioners
  title: "AWS WebServer with Manual Provisioning"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/aws-ts-ec2-provisioners
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example demonstrates how to set up an EC2 instance for a web server in an AWS environment using TypeScript. It focuses on creating, managing, and configuring the instance and associated security groups, as well as deploying a web application to each instance. It uses the Amazon Web Services cloud provider and TypeScript as the programming language. It serves as an example of how to successfully provision, deploy, and run a web application on an EC2 instance in the cloud."
---

# AWS WebServer with Manual Provisioning

This demonstrates using the [`@pulumi/command`](https://www.pulumi.com/registry/packages/command/) package to accomplish post-provisioning configuration steps.

Using these building blocks, one can accomplish much of the same as Terraform provisioners.

## Running the Example

First, create a stack, using `pulumi stack init`.

Now, we need to ensure that our dependencies are installed:

```
$ npm install
``` 

Next, generate an OpenSSH keypair for use with your server - as per the AWS [Requirements][1]

```
$ ssh-keygen -t rsa -f rsa -m PEM
```

This will output two files, `rsa` and `rsa.pub`, in the current directory. Be sure not to commit these files!

We then need to configure our stack so that the public key is used by our EC2 instance, and the private key used
for subsequent SCP and SSH steps that will configure our server after it is stood up.

```
$ cat rsa.pub | pulumi config set publicKey --
$ cat rsa | pulumi config set privateKey --secret --
```

Notice that we've used `--secret` for `privateKey`. This ensures the private key is stored as an encrypted [Pulumi secret](https://www.pulumi.com/docs/intro/concepts/secrets/).

Also set your desired AWS region:

```
$ pulumi config set aws:region us-west-2
```

From there, you can run `pulumi up` and all resources will be provisioned and configured.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#how-to-generate-your-own-key-and-import-it-to-aws

