---
title: "AWS Elastic Container Service (ECS)"
meta_desc: Pulumi Crosswalk for AWS ECS simplifies deploying containerized applications into ECS and managing all of the
           associated resources.
linktitle: Elastic Container Service (ECS)
menu:
  userguides:
    parent: crosswalk-aws
    weight: 5

aliases: ["/docs/reference/crosswalk/aws/ecs/"]
---

<a href="{{< relref "./" >}}">
    <img src="/images/docs/reference/crosswalk/aws/logo.svg" align="right" width="280" style="margin: 0 0 32px 16px;">
</a>

[Amazon Elastic Container Service (Amazon ECS)](https://aws.amazon.com/ecs) is a scalable, high-performance container
orchestration service that supports Docker containers and allows you to easily run and scale containerized applications
on AWS. ECS eliminates the need for you to install and operate your own container orchestration software, manage and
scale a cluster of virtual machines, or schedule containers on those virtual machines.

## Overview

Pulumi Crosswalk for AWS ECS simplifies deploying containerized applications into ECS and managing all of the
associated resources. This includes simple support for load-balanced container services and one-off tasks, in addition
to managing the clusters and associated scaling, network, and security policies. This includes ECS Fargate---the
simplest option, alleviating the need to manage the cluster's servers themselves---in addition to ECS classic---
providing full control over the underlying EC2 machine resources that power your cluster.

> An alternative to ECS is Amazon's Elastic Kubernetes Service (EKS). Similar to ECS, EKS lets you operate
> containerized applications in a cluster. EKS tends to be more complex to provision and manage, but has
> the added advantage of using the industry standard container orchestrator, Kubernetes, and therefore can help
> with portability between clouds and self-hosted configurations. See
> [Pulumi Crosswalk for AWS EKS]({{< relref "eks" >}}) for more information about using EKS.

## Creating a Load Balanced ECS Service

To run a Docker container in ECS using default network and cluster settings, use the `awsx.ecs.FargateService`
class. Since we need to access this container over port 80 using a stable address, we will use a load balancer.

<!-- TODO: Re-add 'go' to all 'chooser' blocks -->
<!-- {{< chooser language "typescript,python,go,csharp" / >}} -->
{{< chooser language "typescript,python,csharp" / >}}

{{% choosable language "javascript,typescript" %}}

```typescript
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const cluster = new aws.ecs.Cluster("default-cluster");

const lb = new awsx.lb.ApplicationLoadBalancer("nginx-lb");

const service = new awsx.ecs.FargateService("my-service", {
    cluster: cluster.arn,
    desiredCount: 2,
    taskDefinitionArgs: {
        container: {
            image: "nginx:latest",
            cpu: 512,
            memory: 128,
            essential: true,
            portMappings: [
                {
                    containerPort: 80,
                    targetGroup: lb.defaultTargetGroup,
                },
            ],
        },
    },
});

export const url = lb.loadBalancer.dnsName;
```

{{% /choosable %}}

{{% choosable language python %}}

```python
import pulumi
import pulumi_aws as aws
import pulumi_awsx as awsx

cluster = aws.ecs.Cluster("default-cluster")

lb = awsx.lb.ApplicationLoadBalancer("nginx-lb")

service = awsx.ecs.FargateService("my-service",
    cluster=cluster.arn,
    desired_count=2,
    task_definition_args=awsx.ecs.FargateServiceTaskDefinitionArgs(
        container=awsx.ecs.TaskDefinitionContainerDefinitionArgs(
            image="nginx:latest",
            cpu=512,
            memory=128,
            essential=True,
            port_mappings=[awsx.ecs.TaskDefinitionPortMappingArgs(
                target_group=lb.default_target_group
            )],
        )
    )
)
```

{{% /choosable %}}

<!-- {{% choosable language go %}}

```go
// TODO
```

{{% /choosable %}} -->

{{% choosable language csharp %}}

```csharp
var cluster = new Aws.Ecs.Cluster("default-cluster");

var lb = new Awsx.Lb.ApplicationLoadBalancer("nginx-lb");

var service = new Awsx.Ecs.FargateService("my-service", new Awsx.Ecs.FargateServiceArgs
{
    Cluster = cluster.Arn,
    DesiredCount = 2,
    TaskDefinitionArgs = new Awsx.Ecs.Inputs.FargateServiceTaskDefinitionArgs
    {
        Container = new Awsx.Ecs.Inputs.TaskDefinitionContainerDefinitionArgs
        {
            Image = "nginx:latest",
            Cpu = 512,
            Memory = 128,
            Essential = true,
            PortMappings = {new Awsx.Ecs.Inputs.TaskDefinitionPortMappingArgs
            {
                TargetGroup = lb.DefaultTargetGroup,
            }},
        }
    }
});

this.Url = lb.LoadBalancer.Apply(lb => lb.DnsName);
```

{{% /choosable %}}

After deploying this program, `pulumi stack output url` can be used to access the Url output property. We can then access our  NGINX web server behind our load balancer via curl:

```bash
curl http://$(pulumi stack output url)
```

Giving the following output:

```bash
<!DOCTYPE html>
<html>
<body>
<h1>Welcome to nginx!</h1>
</body>
</html>
```

We have chosen to create an [Elastic Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing) so that we
can access our services over the Internet at a stable address, spread evenly across two instances. Any of the ELB
options described in the [Pulumi Crosswalk for ELB documentation]({{< relref "elb" >}}) can be used with our ECS service.

Behind the scenes, our program creates the ECS cluster in the default VPC to run the compute. This is something
[we can configure](#creating-an-ecs-cluster-in-a-vpc) if we want to use a different VPC.

Because we've used [`Fargate`](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html), we don't
need to specify anything about our machine instances. Instead, Fargate will manage that for us automatically based on
the optional `memory` and `cpu` values we request for our containers.

For many scenarios, this is exactly what we want: a simple way of just running containerized applications. While this
approach is simple and hides a lot of complexity, it's often desirable to control more of what is going on.

## Creating an ECS Cluster in a VPC

To create an ECS service inside of a VPC, we will first create or use an existing VPC using any of the techniques
described in [Pulumi Crosswalk for AWS VPC]({{< relref "vpc" >}}). Then we simply pass the subnets
from that VPC into the network configuration argument for our cluster:

{{< chooser language "typescript,python,csharp" / >}}

{{% choosable language "javascript,typescript" %}}

```typescript
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const vpc = new awsx.ec2.Vpc("vpc");
const securityGroup = new aws.ec2.SecurityGroup("sg", {
    vpcId: vpc.vpcId,
    // Add ingress and egress rules as required
});

const cluster = new awsx.ecs.Cluster("custom", { vpc });

const nginx = new awsx.ecs.FargateService("nginx", {
    networkConfiguration: {
        subnets: vpc.privateSubnetIds,
        securityGroups: [securityGroup.id],
    },
    cluster,
    // ... as before ...
});
```

{{% /choosable %}}

{{% choosable language python %}}

```python
import pulumi
import pulumi_aws as aws
import pulumi_awsx as awsx

vpc = awsx.ec2.Vpc("vpc")
cluster = aws.ecs.Cluster("default-cluster")

service = awsx.ecs.FargateService("my-service",
    cluster=cluster.arn,
    network_configuration=awsx.ecs.ServiceNetworkConfiguration(
        subnets=vpc.private_subnet_ids,
    ),
    # ... as before ...
)
```

{{% /choosable %}}

{{% choosable language go %}}

```go

```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
var vpc = new Aws.Ecs.Vpc("vpc");
var cluster = new Aws.Ecs.Cluster("default-cluster");

var service = new Awsx.Ecs.FargateService("my-service", new Awsx.Ecs.FargateServiceArgs
{
    NetworkConfiguration = new Awsx.Ecs.Inputs.ServiceNetworkConfiguration
    {
        Subnets = vpc.PrivateSubnetIds
    },
    Cluster = cluster.Arn,
    // ... as before ...
});
```

{{% /choosable %}}

When using a custom VPC, you will also need to specify your own security groups if you need to allow ingress or egress.

## Container Definitions Without Services

A Task Definition can be created independently of an ECS Service. An example use-case would be for running one-off,
fire and forget, or batch tasks.

For example, this example creates a standalone task definition as in the full load-balanced example, but without the service:

```typescript
import * as awsx from "@pulumi/awsx";

const listener = new awsx.lb.NetworkListener("listener", { port: 80 });
const task = new awsx.ecs.FargateTaskDefinition("task", {
    containers: {
        nginx: {
            image: "nginx",
            memory: 128,
            portMappings: [ listener ],
        },
    },
});
```

## ECS Tasks, Containers, and Services

We saw example uses above but didn't describe the details of how ECS core concepts work, or are authored in your
application.

To deploy your application to ECS, it must be containerized. This means authoring a `Dockerfile` that specifies
how all of your application's runtime dependencies are built and packaged up. This is then used to create an image
that is used by the ECS runtime to mount and run your code, as services scale out. For more information about container
technology, see [Docker Basics for Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html).

Given an image, ECS requires that you author a [Task Definition](
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html), which specifies what requirements
your Docker application has of the underlying cluster. This includes information about the container(s) to run.
After that, ECS containers may be run as one-off [Tasks](
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/scheduling_tasks.html), or long-lived [Services](
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html).

For full details of the available component arguments, please refer to the registry API documentation.

## Building and Publishing Docker Images Automatically

Containers with Pulumi Crosswalk for AWS ECS are far more flexible than just accepting a preexisting image URL,
and can even refer to a `Dockerfile` on disk so you do not need to build and publish
it separately ahead of time. This makes it very easy to use private registrations for your ECS workloads.

For example, [`fromPath`]({{< relref "/docs/reference/pkg/nodejs/pulumi/awsx/ecs#Image-fromPath" >}}) will run a `docker build` in that path, push the result up to the ECR repository that specified in the first argument, and then pass
the private ECR repostory path to the container:

```typescript
const task = new awsx.ecs.FargateTaskDefinition("task", {
    containers: {
        nginx: {
            image: awsx.ecs.Image.fromPath("<ecr-repository-name>", "/path/to/Dockerfile/"),
            // ...
        },
    },
});
```

For more control over how the Docker image is built and published, you can use [`fromDockerBuild`]({{< relref "/docs/reference/pkg/nodejs/pulumi/awsx/ecs#Image-fromDockerBuild" >}}). This allows you
to control the build context, whether to cache multi-stage builds, and so on:

```typescript
const task = new awsx.ecs.FargateTaskDefinition("task", {
    containers: {
        nginx: {
            image: awsx.ecs.Image.fromDockerBuild({
                context: "./app",
                dockerfile: "./app/Dockerfile-multistage",
                cacheFrom: { stages: [ "build" ] },
            }),
            // ...
        },
    },
});
```

Finally, you can create a container image from a callback function. This allows you to author the same code that
runs in the container within your Pulumi application directly, much like [magic functions for Lambda]({{< relref "lambda" >}}):

```typescript
const listener =
    new awsx.lb.NetworkTargetGroup("custom", { port: 8080 })
               .createListener("custom", { port: 80 });

const service = new awsx.ecs.EC2Service("custom", {
    cluster,
    desiredCount: 2,
    taskDefinitionArgs: {
        containers: {
            webserver: {
                memory: 128,
                portMappings: [ listener ],
                image: awsx.ecs.Image.fromFunction(() => {
                    const rand = Math.random();
                    const http = require("http");
                    http.createServer((req: any, res: any) => {
                        res.end(`Hello, world! (from ${rand})`);
                    }).listen(8080);
                }),
            },
        },
    },
});
```

This example runs an anonymous web server inside of an image built and published automatically to ECR.

For more information about using ECR, refer to [Pulumi Crosswalk for AWS ECR]({{< relref "ecr" >}}).

## Running Fire and Forget Tasks

An ECS TaskDefinition can be used to define a Service, or it can be run on demand in a "fire and forget" manner---from within a Lambda callback for example. This can be done by calling the `run` method on the Task instance. This
`run` call must be supplied a cluster to run in.

For example, continuing from before:

```ts
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const cluster = new awsx.ecs.Cluster("my-cluster");

const helloTask = new awsx.ecs.FargateTaskDefinition("hello-world", {
    container: {
        image: "hello-world",
        memory: 20,
    },
});

const api = new awsx.apigateway.API("hello-world-api", {
    routes: [{
        path: "/hello",
        method: "GET",
        eventHandler: async (req) => {
            // Anytime someone hits the /hello endpoint, schedule our task.
            const result = await helloTask.run({ cluster });
            return { statusCode: 200, body: "OK" };
        },
    }],
});
```

The calls to `run` must specify which `cluster` to run the task in, and may control other aspects of scheduling.

## Additional ECS Resources

* [Amazon Elastic Container Service](https://aws.amazon.com/ecs/)
