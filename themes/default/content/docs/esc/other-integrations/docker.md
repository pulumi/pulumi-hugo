---
title_tag: Integrate with Docker | Pulumi ESC
title: Docker
h1: "Pulumi ESC: Integrate with Docker"
meta_desc: This page provides an overview on how to use Pulumi ESC with Docker.
weight: 2
menu:
  pulumiesc:
    parent: esc-other-integrations
    identifier: esc-other-integrations-docker
---

## Overview

Pulumi ESC integrates with [Docker](https://www.docker.com/) to help developers automatically manage configuration and secrets while running `docker` commands.

## Prerequisites

To complete the steps in this tutorial, you will need to install the following prerequisites:

- the [Pulumi ESC CLI](/docs/esc-cli/)
- the [Docker CLI](https://www.docker.com/) and shell integration

## Manage environment variables for Docker containers

### Create an ESC environment with environment variables

ESC integrates with `docker` by exporting environment variables from an opened environment. Before you can configure `docker`, you'll need to create an environment that exports environment variables. For example, the environment below fetches AWS credentials via OIDC and exports these credentials in environment variables:

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

For the purposes of this guide, we'll create a simplified environment to demonstrate your options:

```yaml
values:
  environmentVariables:
    ESC_ORG: You are in the ${context.pulumi.organization.login} organization!
    ESC_HELLO_USER: Hello, ${context.pulumi.user.login}!
  files:
    DOCKER_ENVFILE: |
      ESC_ORG="You are in the ${context.pulumi.organization.login} organization!"
      ESC_HELLO_USER="Hello, ${context.pulumi.user.login}!"
```

### Set individual environment variables in a Docker container

You can [set environment variables for a Docker container](https://docs.docker.com/reference/cli/docker/container/run/#env) as part of a `docker run` command:

```bash
$ esc run <your-environment-name> -- docker run --rm -t -e ESC_ORG -e ESC_HELLO_USER alpine env
```

The output should look something like this, but with your own username and organization name set in the environment variables.

```bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=e2d74889ef6d
TERM=xterm
ESC_HELLO_USER=Hello, example-user!
ESC_ORG=You are in the example organization!
HOME=/root
```

### Set environment variables from a file

You can set environment variables dynamically by using an environment file as part of a `docker run` command:

```bash
$ esc run -i <your-environment-name> -- sh -c 'docker run --rm -t --env-file=$DOCKER_ENVFILE alpine env'
```

The output should look something like this, but with your own username and organization name set in the environment variables.

```bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=e2d74889ef6d
TERM=xterm
ESC_HELLO_USER=Hello, example-user!
ESC_ORG=You are in the example organization!
HOME=/root
```

## Manage Docker registry credentials

### Create an ESC environment with your Docker registry credentials

ESC integrates with `docker` by exporting environment variables from an opened environment. You can store login configuration securely with an ESC environment.
This example stores the username and encrypted password directly in the environment, but you can also reference external secrets with [ESC providers](/docs/esc/providers/).

```yaml
values:
  docker:
    username: <your-registry-username>
    password:
      fn::secret: <your-registry-password>
    registry: null # Provide a registry URL if you are not using Docker Hub
  environmentVariables:
    USERNAME: ${docker.username}
    PASSWORD: ${docker.password}
    REGISTRY: ${docker.registry}
```

### Log in to a Docker registry

You can [log into a Docker registry](https://docs.docker.com/reference/cli/docker/login/) without needing to manage the credentials directly in your shell:

```bash
$ esc run <your-environment-name> -- sh -c 'echo $PASSWORD | docker login --username $USERNAME --password-stdin $REGISTRY'

Login Succeeded
```

{{< get-started-stepper >}}
