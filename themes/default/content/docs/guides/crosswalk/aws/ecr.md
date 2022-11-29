---
title: "AWS Elastic Container Registry (ECR)"
meta_desc: Pulumi Crosswalk for AWS ECR makes the provisioning of new ECR repositories as simple as one line of code.
linktitle: Elastic Container Registry (ECR)
menu:
  userguides:
    parent: crosswalk-aws
    weight: 4

aliases: ["/docs/reference/crosswalk/aws/ecr/"]
---

<a href="./">
    <img src="/images/docs/reference/crosswalk/aws/logo.svg" align="right" width="280" style="margin: 0 0 32px 16px;">
</a>

[Amazon Elastic Container Registry (ECR)](https://aws.amazon.com/ecr/) is a managed Docker container registry that
makes it easy to store, manage, and deploy Docker container images. ECR supports private Docker registries with
resource-based permissions using AWS IAM, so specific users and instances can access images. Using ECR simplifies
going from development to production, and eliminates the need to operate your own container repositories or worry
about scaling the underlying infrastructure, while hosting your images in a highly available and scalable architecture.

## Overview

Pulumi Crosswalk for AWS ECR makes the provisioning of new ECR repositories as simple as one line of code,
integrates with Pulumi Crosswalk for AWS [ECS](/docs/guides/crosswalk/aws/ecs/) and [EKS](/docs/guides/crosswalk/aws/eks/) to ease
deployment of new application containers to your ECS, "Fargate", and/or Kubernetes clusters, and even supports
building and deploying Docker images from your developer desktop or CI/CD workflows.

## Provisioning an ECR Repository

Each AWS account automatically has an ECR [_registry_](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html),
and within each registry, you can create any number of [_repositories_](
https://docs.aws.amazon.com/AmazonECR/latest/userguide/Repositories.html) to actually contain your Docker images.

To create a new ECR repository, allocate an instance of the `awsx.ecr.Repository` class:

{{< chooser language "typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language "javascript,typescript" %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";

const repository = new awsx.ecr.Repository("repository", {});
export const url = repository.url;
```

{{% /choosable %}}

{{% choosable language python %}}

```python
import pulumi
import pulumi_awsx as awsx

repository = awsx.ecr.Repository("repository")
pulumi.export("url", repository.url)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
package main

import (
	"github.com/pulumi/pulumi-awsx/sdk/go/awsx/ecr"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		repository, err := ecr.NewRepository(ctx, "repository", nil)
		if err != nil {
			return err
		}
		ctx.Export("url", repository.Url)
		return nil
	})
}
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
using System.Collections.Generic;
using Pulumi;
using Awsx = Pulumi.Awsx;

return await Deployment.RunAsync(() =>
{
    var repository = new Awsx.Ecr.Repository("repository");

    return new Dictionary<string, object?>
    {
        ["url"] = repository.Url,
    };
});
```

{{% /choosable %}}

{{% choosable language java %}}

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.awsx.ecr.Repository;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        var repository = new Repository("repository");

        ctx.export("url", repository.url());
    }
}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
resources:
  repository:
    type: awsx:ecr:Repository
outputs:
  url: ${repository.url}
```

{{% /choosable %}}

From there, we can just run `pulumi up` to provision a new repository:

```bash
$ pulumi up
Updating (dev):

     Type                           Name               Status
 +   pulumi:pulumi:Stack            crosswalk-aws-dev  created
 +   ├─ awsx:ecr:Repository         repository         created
 +   │  └─ aws:ecr:Repository       repository         created
 +   └─ aws:ecr:LifecyclePolicy     repository         created

Outputs:
    url: "012345678901.dkr.ecr.us-west-2.amazonaws.com/repository-e2fe830"

Resources:
    + 4 created

Duration: 4s
```

The `url` emitted is what we will use to push and pull images to and from the newly created repository. We can do
so either using the Docker CLI or through infrastructure as code in our Pulumi program.

## Building and Publishing Container Images

Amazon ECR stores [_images_](https://docs.aws.amazon.com/AmazonECR/latest/userguide/images.html) inside of the
repositories you create. You can use the Docker CLI to push and pull images explicitly, using the `build`, `push`,
and `pull` commands, targeting the repository's URL. Alternatively, you can use your Pulumi program to build and
publish container images as part of your Pulumi deployment, and consume them from ECS or EKS directly.

### Building and Publishing Images Manually Using the Docker CLI

All repositories in your account's ECR registry will have a URL of the form
`<aws_account_id>.dkr.ecr.<region>.amazonaws.com/<repo>`, where `<aws_account_id>` is your AWS account ID,
`<region>` is the location for the repository, and `<repo>` is the name given to the repository. In the above example,
the resulting URL is exported and printed to the console.

To build and publish a new Docker image to such a repository, first retrieve your container image in the usual way,
e.g. either using [`docker build`](https://docs.docker.com/engine/reference/commandline/build/) or
[`docker pull`](https://docs.docker.com/engine/reference/commandline/pull/).

The image then needs to be tagged with the URL of the repository you're publishing to. This can be done using
`docker build`'s `-t` argument, while building the image, as in:

```bash
$ docker build -t 012345678901.dkr.ecr.us-west-2.amazonaws.com/my-repo-e2fe830 .
```

Alternatively, this can be done by tagging the image with [`docker tag`](
https://docs.docker.com/engine/reference/commandline/tag/) after building or pulling it. For example, if the image
ID to tag is `e9ae3c220b23`, then we would run the following:

```bash
$ docker tag e9ae3c220b23 012345678901.dkr.ecr.us-west-2.amazonaws.com/my-repo-e2fe830
```

By default, this tag will be tagged as `latest`; if you'd like to tag it using something else, do so as usual:

```bash
$ docker tag e9ae3c220b23 012345678901.dkr.ecr.us-west-2.amazonaws.com/my-repo-e2fe830:v2.0
```

After building and tagging, we then need to authenticate with the ECR registry. Each authentication token covers a
single registry and lasts 12 hours. The AWS CLI provides an easy way to do this:

```bash
$ $(aws ecr get-login --no-include-email)
```

Notice the `$(...)` part, which executes the command returned by the AWS CLI (which is a `docker login ...` sequence).
For more information on authentication, see [Registry Authentication](
https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html#registry_auth)

Finally, after building, tagging, and logging in, we are ready to push to our repository:

```bash
$ docker push 012345678901.dkr.ecr.us-west-2.amazonaws.com/my-repo-e2fe830
The push refers to repository [012345678901.dkr.ecr.us-west-2.amazonaws.com/my-repo-e2fe830]
8a453b312607: Pushed
e6b5722b9fb4: Pushed
137a99b96f0d: Pushed
d6c6b3975afa: Pushed
36daa25da760: Pushed
be03501d5dd0: Pushed
3f9a4fb2ec3f: Pushed
a464c54f93a9: Pushed
latest: digest: sha256:f2d7dca5c0800e2dce13b655a439f368587b77ad82de11675851be4c9f2cbf91 size: 1999
```

Afterwards, we can then pull the image from the registry by authenticating and pulling from the repository URL.

### Building and Publishing Images Automatically in Code

Instead of using the Docker CLI directly, Pulumi supports building, publishing, and consuming Docker images
entirely from code. This lets you version and deploy container changes easily alongside the supporting infrastructure.

In the following example, creating an `Image` resource will build an image from the "./app" directory (relative to our project and containing Dockerfile), and publish it to our ECR repository provisioned above.

{{< chooser language "typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language "javascript,typescript" %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";

const repository = new awsx.ecr.Repository("repository", {});
const image = new awsx.ecr.Image("image", {
    repositoryUrl: repository.url,
    path: "./app",
});
export const url = repository.url;
```

{{% /choosable %}}

{{% choosable language python %}}

```python
import pulumi
import pulumi_awsx as awsx

repository = awsx.ecr.Repository("repository")
image = awsx.ecr.Image("image",
    repository_url=repository.url,
    path="./app")
pulumi.export("url", repository.url)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
package main

import (
	"github.com/pulumi/pulumi-awsx/sdk/go/awsx/ecr"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		repository, err := ecr.NewRepository(ctx, "repository", nil)
		if err != nil {
			return err
		}
		_, err = ecr.NewImage(ctx, "image", &ecr.ImageArgs{
			RepositoryUrl: repository.Url,
			Path:          pulumi.String("./app"),
		})
		if err != nil {
			return err
		}
		ctx.Export("url", repository.Url)
		return nil
	})
}
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
using System.Collections.Generic;
using Pulumi;
using Awsx = Pulumi.Awsx;

return await Deployment.RunAsync(() =>
{
    var repository = new Awsx.Ecr.Repository("repository");

    var image = new Awsx.Ecr.Image("image", new()
    {
        RepositoryUrl = repository.Url,
        Path = "./app",
    });

    return new Dictionary<string, object?>
    {
        ["url"] = repository.Url,
    };
});
```

{{% /choosable %}}

{{% choosable language java %}}

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.awsx.ecr.Repository;
import com.pulumi.awsx.ecr.Image;
import com.pulumi.awsx.ecr.ImageArgs;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        var repository = new Repository("repository");

        var image = new Image("image", ImageArgs.builder()
            .repositoryUrl(repository.url())
            .path("./app")
            .build());

        ctx.export("url", repository.url());
    }
}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
resources:
  repository:
    type: awsx:ecr:Repository
  image:
    type: awsx:ecr:Image
    properties:
      repositoryUrl: ${repository.url}
      path: "./app"
outputs:
  url: ${repository.url}
```

{{% /choosable %}}

As we run `pulumi up`, we will see Docker build output in the Pulumi CLI display. If there is an error, it'll
be printed in the diagnostics section, but otherwise the resulting image name is printed:

```bash
$ pulumi up
Updating (dev):

     Type                           Name               Status
 +   pulumi:pulumi:Stack            crosswalk-aws-dev  created
 +   └─ awsx:ecr:Repository         my-repo            created
 +      ├─ aws:ecr:Repository       my-repo            created
 +      └─ aws:ecr:LifecyclePolicy  my-repo            created

Outputs:
    image: "012345678901.dkr.ecr.us-west-2.amazonaws.com/my-repo-e2fe830:latest"

Resources:
    + 4 created

Duration: 13s
```

This image URL can then be used anywhere you'd normally use a Docker image name. For example, we can run it:

```bash
$ docker run -p 80:80 012345678901.dkr.ecr.us-west-2.amazonaws.com/my-repo-e2fe830:latest
```

As we will see below, this can also be consumed from your container orchestrator, to run the container as a service.

### Deleting Images

If you are done using an image, you can delete it from your repository. This can be done by [defining a lifecycle
policy](#managing-container-image-lifecycles-using-policies) or manually using the AWS CLI. For more information on
how to manually delete an image, see the ECR documentation on [Deleting an Image](
https://docs.aws.amazon.com/AmazonECR/latest/userguide/delete_image.html).

## Using a Private Repository from Your Container Orchestrator

To use your ECR images with Amazon ECS and EKS, use the full repository name as the image name. As seen above,
this is of the form `<aws_account_id>.dkr.ecr.<region>.amazonaws.com/<repo>[:<tag>]`, where the `<tag>` is optional (it
defaults to `latest`). The container instances require IAM permissions which are typically enabled by default.

### Consuming a Private Repository from ECS

To use your private repository from an ECS task definition, reference it like so:

{{< chooser language "typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language "javascript,typescript" %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const repository = new awsx.ecr.Repository("repository", {});
const image = new awsx.ecr.Image("image", {
    repositoryUrl: repository.url,
    path: "./app",
});
const cluster = new aws.ecs.Cluster("cluster", {});
const lb = new awsx.lb.ApplicationLoadBalancer("lb", {});
const service = new awsx.ecs.FargateService("service", {
    cluster: cluster.arn,
    assignPublicIp: true,
    taskDefinitionArgs: {
        container: {
            image: image.imageUri,
            cpu: 512,
            memory: 128,
            essential: true,
            portMappings: [{
                targetGroup: lb.defaultTargetGroup,
            }],
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

repository = awsx.ecr.Repository("repository")
image = awsx.ecr.Image("image",
    repository_url=repository.url,
    path="./app")
cluster = aws.ecs.Cluster("cluster")
lb = awsx.lb.ApplicationLoadBalancer("lb")
service = awsx.ecs.FargateService("service",
    cluster=cluster.arn,
    assign_public_ip=True,
    task_definition_args=awsx.ecs.FargateServiceTaskDefinitionArgs(
        container=awsx.ecs.TaskDefinitionContainerDefinitionArgs(
            image=image.image_uri,
            cpu=512,
            memory=128,
            essential=True,
            port_mappings=[awsx.ecs.TaskDefinitionPortMappingArgs(
                target_group=lb.default_target_group,
            )],
        ),
    ))
pulumi.export("url", lb.load_balancer.dns_name)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ecs"
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/lb"
	"github.com/pulumi/pulumi-awsx/sdk/go/awsx/ecr"
	"github.com/pulumi/pulumi-awsx/sdk/go/awsx/ecs"
	"github.com/pulumi/pulumi-awsx/sdk/go/awsx/lb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		repository, err := ecr.NewRepository(ctx, "repository", nil)
		if err != nil {
			return err
		}
		image, err := ecr.NewImage(ctx, "image", &ecr.ImageArgs{
			RepositoryUrl: repository.Url,
			Path:          pulumi.String("./app"),
		})
		if err != nil {
			return err
		}
		cluster, err := ecs.NewCluster(ctx, "cluster", nil)
		if err != nil {
			return err
		}
		lb, err := lb.NewApplicationLoadBalancer(ctx, "lb", nil)
		if err != nil {
			return err
		}
		_, err = ecs.NewFargateService(ctx, "service", &ecs.FargateServiceArgs{
			Cluster:        cluster.Arn,
			AssignPublicIp: pulumi.Bool(true),
			TaskDefinitionArgs: &ecs.FargateServiceTaskDefinitionArgs{
				Container: &ecs.TaskDefinitionContainerDefinitionArgs{
					Image:     image.ImageUri,
					Cpu:       pulumi.Int(512),
					Memory:    pulumi.Int(128),
					Essential: pulumi.Bool(true),
					PortMappings: []ecs.TaskDefinitionPortMappingArgs{
						&ecs.TaskDefinitionPortMappingArgs{
							TargetGroup: lb.DefaultTargetGroup,
						},
					},
				},
			},
		})
		if err != nil {
			return err
		}
		ctx.Export("url", lb.LoadBalancer.ApplyT(func(loadBalancer *lb.LoadBalancer) (string, error) {
			return loadBalancer.DnsName, nil
		}).(pulumi.StringOutput))
		return nil
	})
}
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;
using Awsx = Pulumi.Awsx;

return await Deployment.RunAsync(() =>
{
    var repository = new Awsx.Ecr.Repository("repository");

    var image = new Awsx.Ecr.Image("image", new()
    {
        RepositoryUrl = repository.Url,
        Path = "./app",
    });

    var cluster = new Aws.Ecs.Cluster("cluster");

    var lb = new Awsx.Lb.ApplicationLoadBalancer("lb");

    var service = new Awsx.Ecs.FargateService("service", new()
    {
        Cluster = cluster.Arn,
        AssignPublicIp = true,
        TaskDefinitionArgs = new Awsx.Ecs.Inputs.FargateServiceTaskDefinitionArgs
        {
            Container = new Awsx.Ecs.Inputs.TaskDefinitionContainerDefinitionArgs
            {
                Image = image.ImageUri,
                Cpu = 512,
                Memory = 128,
                Essential = true,
                PortMappings = new[]
                {
                    new Awsx.Ecs.Inputs.TaskDefinitionPortMappingArgs
                    {
                        TargetGroup = lb.DefaultTargetGroup,
                    },
                },
            },
        },
    });

    return new Dictionary<string, object?>
    {
        ["url"] = lb.LoadBalancer.Apply(loadBalancer => loadBalancer.DnsName),
    };
});

```

{{% /choosable %}}

{{% choosable language java %}}

```java
package generated_program;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.awsx.ecr.Repository;
import com.pulumi.awsx.ecr.Image;
import com.pulumi.awsx.ecr.ImageArgs;
import com.pulumi.aws.ecs.Cluster;
import com.pulumi.awsx.lb.ApplicationLoadBalancer;
import com.pulumi.awsx.ecs.FargateService;
import com.pulumi.awsx.ecs.FargateServiceArgs;
import com.pulumi.awsx.ecs.inputs.FargateServiceTaskDefinitionArgs;
import com.pulumi.awsx.ecs.inputs.TaskDefinitionContainerDefinitionArgs;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        var repository = new Repository("repository");

        var image = new Image("image", ImageArgs.builder()
            .repositoryUrl(repository.url())
            .path("./app")
            .build());

        var cluster = new Cluster("cluster");

        var lb = new ApplicationLoadBalancer("lb");

        var service = new FargateService("service", FargateServiceArgs.builder()
            .cluster(cluster.arn())
            .assignPublicIp(true)
            .taskDefinitionArgs(FargateServiceTaskDefinitionArgs.builder()
                .container(TaskDefinitionContainerDefinitionArgs.builder()
                    .image(image.imageUri())
                    .cpu(512)
                    .memory(128)
                    .essential(true)
                    .portMappings(TaskDefinitionPortMappingArgs.builder()
                        .targetGroup(lb.defaultTargetGroup())
                        .build())
                    .build())
                .build())
            .build());

        ctx.export("url", lb.loadBalancer().applyValue(loadBalancer -> loadBalancer.dnsName()));
    }
}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
name: scratch-yaml
description: A Pulumi YAML program to deploy a serverless application on AWS
runtime: yaml
resources:
  repository:
    type: awsx:ecr:Repository
  image:
    type: awsx:ecr:Image
    properties:
      repositoryUrl: ${repository.url}
      path: "./app"
  cluster:
    type: aws:ecs:Cluster
  lb:
    type: awsx:lb:ApplicationLoadBalancer
  service:
    type: awsx:ecs:FargateService
    properties:
      cluster: ${cluster.arn}
      assignPublicIp: true
      taskDefinitionArgs:
        container:
          image: ${image.imageUri}
          cpu: 512
          memory: 128
          essential: true
          portMappings:
            - targetGroup: ${lb.defaultTargetGroup}
outputs:
  url: ${lb.loadBalancer.dnsName}
```

{{% /choosable %}}

For information about ECS, refer to the [Pulumi Crosswalk for AWS ECS documentation](/docs/guides/crosswalk/aws/ecs/). For
information about consuming ECR images from ECS services specifically, see
[Using Amazon ECR Images with Amazon ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/ECR_on_ECS.html).

### Consuming a Private Repository from EKS

To use your private repository from a Kubernetes service, such as one using EKS, reference it like so:

{{< chooser language "typescript,python,csharp" / >}}

{{% choosable language typescript %}}

```typescript
import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";
import * as k8s from "@pulumi/kubernetes";

// Build and publish to an ECR registry.
const repo = new awsx.ecr.Repository("my-repo");
const image = repo.buildAndPushImage("./app");

// Create a new EKS cluster.
const cluster = new eks.Cluster("cluster");

// Create a NGINX Deployment and load balanced Service, running our app.
const appName = "my-app";
const appLabels = { appClass: appName };
const deployment = new k8s.apps.v1.Deployment(`${appName}-dep`, {
    metadata: { labels: appLabels },
    spec: {
        replicas: 2,
        selector: { matchLabels: appLabels },
        template: {
            metadata: { labels: appLabels },
            spec: {
                containers: [{
                    name: appName,
                    image, // **Use the image built above**
                    ports: [{ name: "http", containerPort: 80 }]
                }],
            }
        }
    },
}, { provider: cluster.provider });
const service = new k8s.core.v1.Service(`${appName}-svc`, {
    metadata: { labels: appLabels },
    spec: {
        type: "LoadBalancer",
        ports: [{ port: 80, targetPort: "http" }],
        selector: appLabels,
    },
}, { provider: cluster.provider });

// Export the URL for the load balanced service.
export const url = service.status.loadBalancer.ingress[0].hostname;
```

{{% /choosable %}}

{{% choosable language python %}}

```python
import pulumi
import pulumi_awsx as awsx
from pulumi_kubernetes.apps.v1 import Deployment, DeploymentSpecArgs
from pulumi_kubernetes.core.v1 import (
    ContainerArgs,
    ContainerPortArgs,
    PodSpecArgs,
    PodTemplateSpecArgs,
    Service,
    ServicePortArgs,
    ServiceSpecArgs,
)
from pulumi_kubernetes.meta.v1 import LabelSelectorArgs, ObjectMetaArgs

repo = awsx.ecr.Repository("my-repo");

image = awsx.ecr.Image("image",
                       repository_url=repo.url,
                       path="./app")

app_labels = {
    "appName": "my-app",
}

deployment = Deployment(
    "my-deployment",
    spec=DeploymentSpecArgs(
        selector=LabelSelectorArgs(
            match_labels=app_labels,
        ),
        replicas=2,
        template=PodTemplateSpecArgs(
            metadata=ObjectMetaArgs(
                labels=app_labels,
            ),
            spec=PodSpecArgs(
                containers=[ContainerArgs(
                    name="my-app",
                    image=image.image_uri,
                    ports=[ContainerPortArgs(
                        container_port=80,
                        name="http"
                    )],
                )],
            ),
        ),
    ))

service = Service(
    "svc",
    metadata=ObjectMetaArgs(
        labels=app_labels
    ),
    spec=ServiceSpecArgs(
        ports=[ServicePortArgs(
            port=80,
            target_port="http",
        )],
        selector=app_labels
    ))
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
using System.Collections.Generic;
using System.Threading.Tasks;
using Pulumi;
using Pulumi.Awsx.Ecs.Inputs;
using Pulumi.Kubernetes.Types.Inputs.Apps.V1;
using Pulumi.Kubernetes.Types.Inputs.Core.V1;
using Pulumi.Kubernetes.Types.Inputs.Meta.V1;
using Ecr = Pulumi.Awsx.Ecr;
using Ecs = Pulumi.Awsx.Ecs;
using K8s = Pulumi.Kubernetes;
using CoreV1 = Pulumi.Kubernetes.Core.V1;
using AppsV1 = Pulumi.Kubernetes.Apps.V1;

class MyStack : Stack
{
    public MyStack()
    {
        var repo = new Ecr.Repository("my-repo");

        var image = new Ecr.Image("image", new Ecr.ImageArgs
        {
            RepositoryUrl = repo.Url,
            Path = "./app",
        });

        var cluster = new Eks.Cluster("eks-cluster")

        var appLabels = new InputMap<string>
        {
            {"appClass", "my-app"}
        };

        var deployment = new AppsV1.Deployment("app-dep", new DeploymentArgs
        {
            Metadata = new ObjectMetaArgs
            {
                Labels = appLabels
            },
            Spec = new DeploymentSpecArgs
            {
                Selector = new LabelSelectorArgs
                {
                    MatchLabels = appLabels
                },
                Replicas = 2,
                Template = new PodTemplateSpecArgs
                {
                    Metadata = new ObjectMetaArgs
                    {
                        Labels = appLabels
                    },
                    Spec = new PodSpecArgs
                    {
                        Containers =
                        {
                            new ContainerArgs
                            {
                                Name = "my-app",
                                Image = "image.imageUri,
                                Ports =
                                {
                                    new DeploymentPortArgs
                                    {
                                        Name = "http",
                                        ContainerPort = 80,
                                    },
                                },
                            }
                        }
                    }
                }
            },
        }, new CustomResourceOptions
        {
            Provider = cluster.Provider,
        });

        var service = new CoreV1.Service("app-service", new ServiceArgs
        {
            Metadata = new ObjectMetaArgs
            {
                Labels = appLabels,
            },
            Spec = new ServiceSpecArgs
            {
                Type = "LoadBalancer",
                Ports =
                {
                    new ServicePortArgs
                    {
                        Port = 80,
                        TargetPort = "http"
                    },
                },
                Selector = appLabels,
            },
        }, new CustomResourceOptions
        {
            Provider = cluster.Provider,
        });
    }
}

class Program
{
    static Task<int> Main(string[] args) => Deployment.RunAsync<MyStack>();
}
```

{{% /choosable %}}

For information about EKS, refer to the [Pulumi Crosswalk for AWS EKS documentation](/docs/guides/crosswalk/aws/eks/).

### IAM Permissions Required to use ECR

For the above examples to work, the container instances powering your ECS or EKS cluster need proper IAM
policy permissions to access your Amazon ECR registry. The following example defines such an IAM policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecr:BatchCheckLayerAvailability",
                "ecr:BatchGetImage",
                "ecr:GetDownloadUrlForLayer",
                "ecr:GetAuthorizationToken"
            ],
            "Resource": "*"
        }
    ]
}
```

See the [Pulumi Crosswalk for AWS IAM documentation](/docs/guides/crosswalk/aws/iam/) for instructions on how to manage
such policies.

## Managing Container Image Lifecycles using Policies

[ECR lifecycle policies](https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html) allow
you to specify the lifecycle management of images in a repository. A lifecycle policy is a set of one or more rules,
where each rule defines an action for Amazon ECR. The actions apply to images that contain tags prefixed with the
given strings. This allows the automation of cleaning up unused images, for example expiring images based on age or
count. You should expect that after creating a lifecycle policy the affected images are expired within 24 hours.

Pulumi Crosswalk for AWS ECR module makes it easy to configure a repository's lifecycle policy, using the
`lifeCyclePolicyArgs` property on the `Repository` class's constructor. Using this property, there are two main ways
to control how an image is purged from the repository:

1. Once a maximum number of images has been reached (`maximumNumberOfImages`).
2. Once an image reaches a maximum allowed age (`maximumAgeLimit`).

### Lifecycle Policy Rules

For more details, refer to [Amazon ECR Lifecycle Policies](
https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html), however we will now examine
a number of examples to demonstrate how lifecycle policies are applied.

## Additional ECR Resources

For more information about Amazon ECR, see the following:

* [Amazon Elastic Container Registry homepage](https://aws.amazon.com/ecr/)
