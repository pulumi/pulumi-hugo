---
title: "Easy container example"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-ts-containers
  settings:
    name: aws-ts-containers
    description: NGINX container example
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 20
    outputs:
      frontendURL:
        value: http://loadbalancer-aa539f0-14798330.us-west-2.elb.amazonaws.com
        secret: false
    startTime: 1683413074000
    endTime: 1683413302000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::pulumi:pulumi:Stack::aws-ts-containers-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::pulumi:providers:awsx::default_1_0_2
      type: pulumi:providers:awsx
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:lb:ApplicationLoadBalancer::loadbalancer
      type: awsx:lb:ApplicationLoadBalancer
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::pulumi:providers:aws::default_5_16_2
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:lb:ApplicationLoadBalancer$aws:lb/targetGroup:TargetGroup::loadbalancer
      type: aws:lb/targetGroup:TargetGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:lb:ApplicationLoadBalancer$aws:ec2/securityGroup:SecurityGroup::loadbalancer
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::aws:ecs/cluster:Cluster::cluster
      type: aws:ecs/cluster:Cluster
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:lb:ApplicationLoadBalancer$aws:lb/loadBalancer:LoadBalancer::loadbalancer
      type: aws:lb/loadBalancer:LoadBalancer
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:lb:ApplicationLoadBalancer$aws:lb/listener:Listener::loadbalancer-0
      type: aws:lb/listener:Listener
    - urn: urn:pulumi:examples-api::aws-ts-containers::awsx:ecr:Repository::repo
      type: awsx:ecr:Repository
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::pulumi:providers:pulumi::default
      type: pulumi:providers:pulumi
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:ecr:Repository$aws:ecr/repository:Repository::repo
      type: aws:ecr/repository:Repository
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:ecr:Repository$aws:ecr/lifecyclePolicy:LifecyclePolicy::repo
      type: aws:ecr/lifecyclePolicy:LifecyclePolicy
    - urn: urn:pulumi:examples-api::aws-ts-containers::awsx:ecr:Image::image
      type: awsx:ecr:Image
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:ecs:FargateService::service
      type: awsx:ecs:FargateService
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:ecs:FargateService$awsx:ecs:FargateTaskDefinition::service
      type: awsx:ecs:FargateTaskDefinition
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:ecs:FargateService$awsx:ecs:FargateTaskDefinition$aws:cloudwatch/logGroup:LogGroup::service
      type: aws:cloudwatch/logGroup:LogGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:ecs:FargateService$awsx:ecs:FargateTaskDefinition$aws:iam/role:Role::service-execution
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:ecs:FargateService$awsx:ecs:FargateTaskDefinition$aws:iam/role:Role::service-task
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:ecs:FargateService$awsx:ecs:FargateTaskDefinition$aws:iam/rolePolicyAttachment:RolePolicyAttachment::service-execution-9a42f520
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:ecs:FargateService$awsx:ecs:FargateTaskDefinition$aws:ecs/taskDefinition:TaskDefinition::service
      type: aws:ecs/taskDefinition:TaskDefinition
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:ecs:FargateService$aws:ec2/securityGroup:SecurityGroup::service-sg
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-containers::awsx:ecs:FargateService$aws:ecs/service:Service::service
      type: aws:ecs/service:Service

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-ts-containers/README.md)

# Easy container example

Companion to the tutorial [Provision containers on AWS](https://www.pulumi.com/docs/tutorials/aws/ecs-fargate/).

## Prerequisites

To run this example, make sure [Docker](https://docs.docker.com/engine/installation/) is installed and running.

## Running the App

Note: some values in this example will be different from run to run.  These values are indicated
with `***`.

1.  Create a new stack:

    ```
    $ pulumi stack init containers-dev
    ```

1.  Configure Pulumi to use an AWS region that supports Fargate. This is currently only available in `us-east-1`, `us-east-2`, `us-west-2`, and `eu-west-1`:

    ```
    $ pulumi config set aws:region us-west-2
    ```

1.  Restore NPM modules via `npm install` or `yarn install`.

1.  Preview and deploy the app via `pulumi up`. The preview will take a few minutes, as it builds a Docker container. A total of 19 resources are created.

    ```
    $ pulumi up
    ```

1.  View the endpoint URL, and run curl:

    ```bash
    $ pulumi stack output
    Current stack outputs (1)
        OUTPUT                  VALUE
        hostname                http://***.elb.us-west-2.amazonaws.com

    $ curl $(pulumi stack output hostname)
    <html>
        <head><meta charset="UTF-8">
        <title>Hello, Pulumi!</title></head>
    <body>
        <p>Hello, S3!</p>
        <p>Made with ❤️ with <a href="https://pulumi.com">Pulumi</a></p>
    </body></html>
    ```

1.  To view the runtime logs from the container, use the `pulumi logs` command. To get a log stream, use `pulumi logs --follow`.

    ```
    $ pulumi logs --follow
    Collecting logs for stack aws-ts-containers-dev since 2018-05-22T14:25:46.000-07:00.
    2018-05-22T15:33:22.057-07:00[                  pulumi-nginx] 172.31.13.248 - - [22/May/2018:22:33:22 +0000] "GET / HTTP/1.1" 200 189 "-" "curl/7.54.0" "-"
    ```

## Clean up

To clean up resources, run `pulumi destroy` and answer the confirmation question at the prompt.

