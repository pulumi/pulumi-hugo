---
title: "Dockerized App Using ECS, ECR, and Fargate"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-ts-hello-fargate
  settings:
    name: aws-ts-hello-fargate
    description: A minimal "Hello, World" container in Fargate.
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 39
    outputs:
      url:
        value: net-lb-816be1a-141670846.us-west-2.elb.amazonaws.com
        secret: false
    startTime: 1683412660000
    endTime: 1683412868000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::pulumi:pulumi:Stack::aws-ts-hello-fargate-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:Cluster::cluster
      type: awsx:x:ecs:Cluster
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::aws:lb:ApplicationLoadBalancer::net-lb
      type: aws:lb:ApplicationLoadBalancer
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:FargateTaskDefinition::app-svc
      type: awsx:x:ecs:FargateTaskDefinition
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::pulumi:providers:awsx::default_1_0_2
      type: pulumi:providers:awsx
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:FargateService::app-svc
      type: awsx:x:ecs:FargateService
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup::cluster
      type: awsx:x:ec2:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::aws:lb:ApplicationLoadBalancer$awsx:lb:ApplicationTargetGroup::web
      type: awsx:lb:ApplicationTargetGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::aws:lb:ApplicationLoadBalancer$awsx:lb:ApplicationListener::web
      type: awsx:lb:ApplicationListener
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:ecr:Repository::repo
      type: awsx:ecr:Repository
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$awsx:x:ec2:IngressSecurityGroupRule::cluster-ssh
      type: awsx:x:ec2:IngressSecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$awsx:x:ec2:IngressSecurityGroupRule::cluster-containers
      type: awsx:x:ec2:IngressSecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::aws:lb:ApplicationLoadBalancer$awsx:lb:ApplicationListener$awsx:x:ec2:IngressSecurityGroupRule::web-external-0-ingress
      type: awsx:x:ec2:IngressSecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$awsx:x:ec2:EgressSecurityGroupRule::cluster-egress
      type: awsx:x:ec2:EgressSecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::aws:lb:ApplicationLoadBalancer$awsx:lb:ApplicationListener$awsx:x:ec2:EgressSecurityGroupRule::web-external-0-egress
      type: awsx:x:ec2:EgressSecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:FargateTaskDefinition$aws:iam/role:Role::app-svc-execution
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:FargateTaskDefinition$aws:iam/role:Role::app-svc-task
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:FargateTaskDefinition$aws:cloudwatch/logGroup:LogGroup::app-svc
      type: aws:cloudwatch/logGroup:LogGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::pulumi:providers:aws::default_5_16_2
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ec2:Vpc::default-vpc
      type: awsx:x:ec2:Vpc
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ec2:Vpc$aws:ec2/subnet:Subnet::default-vpc-public-1
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:FargateTaskDefinition$aws:iam/rolePolicyAttachment:RolePolicyAttachment::app-svc-execution-58ed699a
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:ecr:Repository$aws:ecr/repository:Repository::repo
      type: aws:ecr/repository:Repository
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ec2:Vpc$aws:ec2/subnet:Subnet::default-vpc-public-0
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:FargateTaskDefinition$aws:iam/rolePolicyAttachment:RolePolicyAttachment::app-svc-execution-9a42f520
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:FargateTaskDefinition$aws:iam/rolePolicyAttachment:RolePolicyAttachment::app-svc-task-b5aeb6b6
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:FargateTaskDefinition$aws:iam/rolePolicyAttachment:RolePolicyAttachment::app-svc-task-0cbb1731
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::aws:ec2/vpc:Vpc::default-vpc
      type: aws:ec2/vpc:Vpc
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet::default-vpc-public-1
      type: awsx:x:ec2:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet::default-vpc-public-0
      type: awsx:x:ec2:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:ecr:Repository$aws:ecr/lifecyclePolicy:LifecyclePolicy::repo
      type: aws:ecr/lifecyclePolicy:LifecyclePolicy
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::pulumi:providers:pulumi::default
      type: pulumi:providers:pulumi
    - urn: urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:ecr:Image::app-img
      type: awsx:ecr:Image
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::aws:lb:ApplicationLoadBalancer$awsx:lb:ApplicationTargetGroup$aws:lb/targetGroup:TargetGroup::web
      type: aws:lb/targetGroup:TargetGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:Cluster$aws:ecs/cluster:Cluster::cluster
      type: aws:ecs/cluster:Cluster
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$aws:ec2/securityGroup:SecurityGroup::cluster
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::aws:lb:ApplicationLoadBalancer$awsx:lb:ApplicationListener$awsx:x:ec2:EgressSecurityGroupRule$aws:ec2/securityGroupRule:SecurityGroupRule::web-external-0-egress
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$awsx:x:ec2:IngressSecurityGroupRule$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-ssh
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$awsx:x:ec2:EgressSecurityGroupRule$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-egress
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$awsx:x:ec2:IngressSecurityGroupRule$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-containers
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::aws:lb:ApplicationLoadBalancer$awsx:lb:ApplicationListener$awsx:x:ec2:IngressSecurityGroupRule$aws:ec2/securityGroupRule:SecurityGroupRule::web-external-0-ingress
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::aws:lb:ApplicationLoadBalancer$aws:lb/loadBalancer:LoadBalancer::net-lb
      type: aws:lb/loadBalancer:LoadBalancer
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::aws:lb:ApplicationLoadBalancer$awsx:lb:ApplicationListener$aws:lb/listener:Listener::web
      type: aws:lb/listener:Listener
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:FargateTaskDefinition$aws:ecs/taskDefinition:TaskDefinition::app-svc
      type: aws:ecs/taskDefinition:TaskDefinition
    - urn: >-
        urn:pulumi:examples-api::aws-ts-hello-fargate::awsx:x:ecs:FargateService$aws:ecs/service:Service::app-svc
      type: aws:ecs/service:Service

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-ts-hello-fargate/README.md)

# Dockerized App Using ECS, ECR, and Fargate

This example, inspired by the [Docker Getting Started Tutorial](https://docs.docker.com/get-started/), builds, deploys,
and runs a simple containerized application to a private container registry, and scales out five load balanced replicas,
all in just a handful of lines of Node.js code, and leveraging modern and best-in-class AWS features.

To do this, we use Pulumi infrastructure as code to provision an
[Elastic Container Service (ECS)](https://aws.amazon.com/ecs/) cluster, build our `Dockerfile` and deploy the
resulting image to a private [Elastic Container Registry (ECR)](https://aws.amazon.com/ecr/) repository, and then create
a scaled-out [Fargate](https://aws.amazon.com/fargate/) service behind an
[Elastic Application Load Balancer](https://aws.amazon.com/elasticloadbalancing/) that allows traffic from the Internet
on port 80. Because this example using AWS services directly, you can mix in other resources, like S3 buckets, RDS
databases, and so on.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Download and install the Pulumi CLI](https://www.pulumi.com/docs/get-started/install/)
- [Connect Pulumi with your AWS account](https://www.pulumi.com/docs/intro/cloud-providers/aws/setup/) (if your AWS CLI is configured, no further changes are required)

## Running the Example

After cloning this repo, `cd` into it and run these commands:

1. Create a new stack, which is an isolated deployment target for this example:

    ```bash
    $ pulumi stack init dev
    ```

2. Set your desired AWS region:

    ```bash
    $ pulumi config set aws:region us-east-1 # any valid AWS region will work
    ```

3. Deploy everything with a single `pulumi up` command. This will show you a preview of changes first, which
   includes all of the required AWS resources (clusters, services, and the like). Don't worry if it's more than
   you expected -- this is one of the benefits of Pulumi, it configures everything so that so you don't need to!

    ```bash
    $ pulumi up
    ```

    After being prompted and selecting "yes", your deployment will begin. It'll complete in a few minutes:

    ```
    Updating (dev):

         Type                                                        Name                        Status
     +   pulumi:pulumi:Stack                                         aws-ts-hello-fargate-dev    created
     +   ├─ awsx:x:ecs:Cluster                                       cluster                     created
     +   │  ├─ awsx:x:ec2:SecurityGroup                              cluster                     created
     +   │  │  ├─ awsx:x:ec2:EgressSecurityGroupRule                 cluster-egress              created
     +   │  │  │  └─ aws:ec2:SecurityGroupRule                       cluster-egress              created
     +   │  │  ├─ awsx:x:ec2:IngressSecurityGroupRule                cluster-ssh                 created
     +   │  │  │  └─ aws:ec2:SecurityGroupRule                       cluster-ssh                 created
     +   │  │  ├─ awsx:x:ec2:IngressSecurityGroupRule                cluster-containers          created
     +   │  │  │  └─ aws:ec2:SecurityGroupRule                       cluster-containers          created
     +   │  │  └─ aws:ec2:SecurityGroup                              cluster                     created
     +   │  └─ aws:ecs:Cluster                                       cluster                     created
     +   ├─ awsx:x:elasticloadbalancingv2:ApplicationLoadBalancer    net-lb                      created
     +   │  ├─ awsx:x:elasticloadbalancingv2:ApplicationTargetGroup  web                         created
     +   │  │  └─ aws:elasticloadbalancingv2:TargetGroup             ca84d134                    created
     +   │  ├─ awsx:x:elasticloadbalancingv2:ApplicationListener     web                         created
     +   │  │  ├─ awsx:x:ec2:IngressSecurityGroupRule                web-external-0-ingress      created
     +   │  │  │  └─ aws:ec2:SecurityGroupRule                       web-external-0-ingress      created
     +   │  │  └─ aws:elasticloadbalancingv2:Listener                web                         created
     +   │  └─ aws:elasticloadbalancingv2:LoadBalancer               218ffe37                    created
     +   ├─ awsx:x:ec2:Vpc                                           default-vpc                 created
     +   │  ├─ awsx:x:ec2:Subnet                                     default-vpc-public-0        created
     +   │  ├─ awsx:x:ec2:Subnet                                     default-vpc-public-1        created
     >   │  ├─ aws:ec2:Subnet                                        default-vpc-public-0        read
     >   │  └─ aws:ec2:Subnet                                        default-vpc-public-1        read
     +   ├─ awsx:x:ecs:FargateTaskDefinition                         app-svc                     created
     +   │  ├─ aws:ecr:Repository                                    app-img                     created
     +   │  ├─ aws:cloudwatch:LogGroup                               app-svc                     created
     +   │  ├─ aws:iam:Role                                          app-svc-task                created
     +   │  ├─ aws:iam:Role                                          app-svc-execution           created
     +   │  ├─ aws:ecr:LifecyclePolicy                               app-img                     created
     +   │  ├─ aws:iam:RolePolicyAttachment                          app-svc-task-32be53a2       created
     +   │  ├─ aws:iam:RolePolicyAttachment                          app-svc-task-fd1a00e5       created
     +   │  ├─ aws:iam:RolePolicyAttachment                          app-svc-execution-9a42f520  created
     +   │  └─ aws:ecs:TaskDefinition                                app-svc                     created
     +   ├─ awsx:x:ecs:FargateService                                app-svc                     created
     +   │  └─ aws:ecs:Service                                       app-svc                     created
     >   └─ aws:ec2:Vpc                                              default-vpc                 read

    Outputs:
        url: "218ffe37-e8023b7-1429118690.us-east-1.elb.amazonaws.com"

    Resources:
        + 34 created

    Duration: 3m30s

    Permalink: https://app.pulumi.com/acmecorp/aws-ts-hello-fargate/dev/updates/1
    ```

4. At this point, your app is running! The URL was published so it's easy to interact with:

    ```bash
    $ curl http://$(pulumi stack output url)
    <h3>Hello World!</h3>
    <b>Hostname:</b> ip-172-31-39-18.ec2.internal<br/>
    <b>Visits:</b> <i>cannot connect to Redis, counter disabled</i>
    ```

   For more details on how to enable Redis or advanced options, please see the instructions in the
   [Docker Getting Started guide](https://docs.docker.com/get-started/part6/).

6. Once you are done, you can destroy all of the resources, and the stack:

    ```bash
    $ pulumi destroy
    $ pulumi stack rm
    ```

