---
title: "Introducing the new Docker-Build provider"

# The date represents the post's publish date, and by default corresponds with
# the date and time this file was generated. Dates are used for display and
# ordering purposes only; they have no effect on whether or when a post is
# published. To influence the ordering of posts published on the same date, use
# the time portion of the date value; posts are sorted in descending order by
# date/time.
date: 2024-04-18T15:12:33-07:00

# The draft setting determines whether a post is published. Set it to true if
# you want to be able to merge the post without publishing it.
draft: false

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or
# social-media previews. This field is required or the build will fail the
# linter test. Max length is 160 characters.
meta_desc: >-
    Pulumi's new Docker Build provider offers support for Docker builds using modern buildx/BuildKit APIs.

# The meta_image appears in social-media previews and on the blog home page. A
# placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for you.
meta_image: meta.png

# At least one author is required. The values in this list correspond with the
# `id` properties of the team member files at /data/team/team. Create a file for
# yourself if you don't already have one.
authors:
    - bryce-lampe

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - docker
    - buildx
    - buildkit

# See the blogging docs at https://github.com/pulumi/pulumi-hugo/blob/master/BLOGGING.md
# for details, and please remove these comments before submitting for review.
---

We are thrilled to introduce the latest addition to the Pulumi Ecosystem -- the new _Docker-Build_ provider, designed to streamline and enhance Docker container builds. This addition builds on the solid foundation of our widly utilized Docker Provider. By embracing the power of Docker's [BuildKit] technology, this provider enhances your building experience, allowing you to modernize your container builds. This launch signifies our ongoing commitment to advancing technology and empowering developers to achieve new heights in container management.

The Docker-Build provider is crafted to optimize the efficiency and versatility of Docker builds, integrating modern capabilities such as multi-platform image support, advanced caching options, and comprehensive build configurations. It offers developers a more potent and flexible approach to building Docker images, ensuring that they can achieve high performance and scalability in their deployment workflows.

The new provider exposes the full power of Docker's next-gen [buildx](https://docs.docker.com/reference/cli/docker/buildx/build/) functionality and includes key features such as,

* __Multi-Platform Image Support__: Build and manage images that run seamlessly across different hardware architectures.

* __Advanced Caching Mechanisms__: Utilize various caching strategies to speed up build times and reduce resource consumption.

* __Support for Secrets and Pulumi [ESC](../environments-secrets-configurations-management) (Environments, Secrets and Configurations)__ - Safely manage sensitive information and configurations with first-class support, integrating seamlessly into your deployment workflows.

* __Support for multiple export Types__ - Supports multiple export types, enabling you to distribute your containers in various formats suited to different environments.

* __Docker Build Cloud__ (DBC) Support : Take advantage of [Docker Build Cloud](https://www.docker.com/products/build-cloud/) to scale your build processes effortlessly and manage build resources dynamically, enhancing productivity and performance.

## Getting started

{{< chooser language "typescript,python,csharp,go,yaml,java" / >}}

Add the "docker-build" package to your project to start taking advantage of modern container builds with Pulumi.

{{% choosable language typescript %}}

```typescript
import * as docker_build from "@pulumi/docker-build";
```

{{% /choosable %}}

{{% choosable language python %}}

```python
import pulumi_docker_build as docker_build
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
using DockerBuild = Pulumi.DockerBuild;
```

{{% /choosable %}}

{{% choosable language go %}}

```go
import "github.com/pulumi/pulumi-docker-build/sdk/go/dockerbuild"
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
resources:
    my-image:
        type: docker-build:Image
```

{{% /choosable %}}
{{% choosable language java %}}

```java
import com.pulumi.dockerbuild.Image
```

{{% /choosable %}}

If your Pulumi program has a directory called `app` alongside it, containing a
file named "Dockerfile" (which can be as simple as `FROM alpine` for the
purpose of example), then the example below shows how to build a multi-platform
image, publish it to a remote AWS ECR registry, and use an [inline cache] to
speed up subsequent builds.

{{% choosable language typescript %}}

```typescript
import * as aws from "@pulumi/aws";
import * as docker_build from "@pulumi/docker-build";

const ecrRepository = new aws.ecr.Repository("ecr-repository", {});

const authToken = aws.ecr.getAuthorizationTokenOutput({
    registryId: ecrRepository.registryId,
});

const myImage = new docker_build.Image("my-image", {
    cacheFrom: [{
        registry: {
            ref: pulumi.interpolate`${ecrRepository.repositoryUrl}:cache`,
        },
    }],
    cacheTo: [{
        inline: {},
    }],
    context: {
        location: "./app",
    },
    platforms: [
        "linux/amd64",
        "linux/arm64",
    ],
    push: true,
    registries: [{
        address: ecrRepository.repositoryUrl,
        password: authToken.password,
        username: authToken.userName,
    }],
    tags: [pulumi.interpolate`${ecrRepository.repositoryUrl}:latest`],
});

export const ref = myImage.ref;
```

{{% /choosable %}}

{{% choosable language python %}}

```python
import pulumi
import pulumi_aws as aws
import pulumi_docker_build as docker_build

ecr_repository = aws.ecr.Repository("ecr-repository")

auth_token = aws.ecr.get_authorization_token_output(registry_id=ecr_repository.registry_id)

my_image = docker_build.Image("my-image",
    cache_from=[docker_build.CacheFromArgs(
        registry=docker_build.CacheFromRegistryArgs(
            ref=ecr_repository.repository_url.apply(lambda repository_url: f"{repository_url}:cache"),
        ),
    )],
    cache_to=[docker_build.CacheToArgs(
        inline=docker_build.CacheToInlineArgs(),
    )],
    context=docker_build.BuildContextArgs(
        location="./app",
    ),
    platforms=[
        docker_build.Platform.LINUX_AMD64,
        docker_build.Platform.LINUX_ARM64,
    ],
    push=True,
    registries=[docker_build.RegistryArgs(
        address=ecr_repository.repository_url,
        password=auth_token.password,
        username=auth_token.user_name,
    )],
    tags=[ecr_repository.repository_url.apply(lambda repository_url: f"{repository_url}:latest")])

pulumi.export("ref", my_image.ref)
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
using System.Collections.Generic;
using System.Linq;
using Pulumi;
using Aws = Pulumi.Aws;
using DockerBuild = Pulumi.DockerBuild;

return await Deployment.RunAsync(() =>
{
    var ecrRepository = new Aws.Ecr.Repository("ecr-repository");

    var authToken = Aws.Ecr.GetAuthorizationToken.Invoke(new()
    {
        RegistryId = ecrRepository.RegistryId,
    });

    var myImage = new DockerBuild.Image("my-image", new()
    {
        CacheFrom = new[]
        {
            new DockerBuild.Inputs.CacheFromArgs
            {
                Registry = new DockerBuild.Inputs.CacheFromRegistryArgs
                {
                    Ref = ecrRepository.RepositoryUrl.Apply(repositoryUrl => $"{repositoryUrl}:cache"),
                },
            },
        },
        CacheTo = new[]
        {
            new DockerBuild.Inputs.CacheToArgs
            {
                Inline = null,
            },
        },
        Context = new DockerBuild.Inputs.BuildContextArgs
        {
            Location = "./app",
        },
        Platforms = new[]
        {
            DockerBuild.Platform.Linux_amd64,
            DockerBuild.Platform.Linux_arm64,
        },
        Push = true,
        Registries = new[]
        {
            new DockerBuild.Inputs.RegistryArgs
            {
                Address = ecrRepository.RepositoryUrl,
                Password = authToken.Apply(getAuthorizationTokenResult => getAuthorizationTokenResult.Password),
                Username = authToken.Apply(getAuthorizationTokenResult => getAuthorizationTokenResult.UserName),
            },
        },
        Tags = new[]
        {
            ecrRepository.RepositoryUrl.Apply(repositoryUrl => $"{repositoryUrl}:latest"),
        },
    });

    return new Dictionary<string, object?>
    {
        ["ref"] = myImage.Ref,
    };
});

```

{{% /choosable %}}

{{% choosable language go %}}

```go
package main

import (
    "fmt"

    "github.com/pulumi/pulumi-aws/sdk/v6/go/aws/ecr"
    "github.com/pulumi/pulumi-docker-build/sdk/go/dockerbuild"
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
    pulumi.Run(func(ctx *pulumi.Context) error {
        ecrRepository, err := ecr.NewRepository(ctx, "ecr-repository", nil)
        if err != nil {
            return err
        }
        authToken := ecr.GetAuthorizationTokenOutput(ctx, ecr.GetAuthorizationTokenOutputArgs{
            RegistryId: ecrRepository.RegistryId,
        }, nil)
        myImage, err := dockerbuild.NewImage(ctx, "my-image", &dockerbuild.ImageArgs{
            CacheFrom: dockerbuild.CacheFromArray{
                &dockerbuild.CacheFromArgs{
                    Registry: &dockerbuild.CacheFromRegistryArgs{
                        Ref: ecrRepository.RepositoryUrl.ApplyT(func(repositoryUrl string) (string, error) {
                            return fmt.Sprintf("%v:cache", repositoryUrl), nil
                        }).(pulumi.StringOutput),
                    },
                },
            },
            CacheTo: dockerbuild.CacheToArray{
                &dockerbuild.CacheToArgs{
                    Inline: nil,
                },
            },
            Context: &dockerbuild.BuildContextArgs{
                Location: pulumi.String("./app"),
            },
            Platforms: dockerbuild.PlatformArray{
                dockerbuild.Platform_Linux_amd64,
                dockerbuild.Platform_Linux_arm64,
            },
            Push: pulumi.Bool(true),
            Registries: dockerbuild.RegistryArray{
                &dockerbuild.RegistryArgs{
                    Address: ecrRepository.RepositoryUrl,
                    Password: authToken.ApplyT(func(authToken ecr.GetAuthorizationTokenResult) (*string, error) {
                        return &authToken.Password, nil
                    }).(pulumi.StringPtrOutput),
                    Username: authToken.ApplyT(func(authToken ecr.GetAuthorizationTokenResult) (*string, error) {
                        return &authToken.UserName, nil
                    }).(pulumi.StringPtrOutput),
                },
            },
            Tags: pulumi.StringArray{
                ecrRepository.RepositoryUrl.ApplyT(func(repositoryUrl string) (string, error) {
                    return fmt.Sprintf("%v:latest", repositoryUrl), nil
                }).(pulumi.StringOutput),
            },
        })
        if err != nil {
            return err
        }
        ctx.Export("ref", myImage.Ref)
        return nil
    })
}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
description: Push to AWS ECR with caching
name: ecr
outputs:
    ref: ${my-image.ref}
resources:
    ecr-repository:
        type: aws:ecr:Repository
    my-image:
        properties:
            cacheFrom:
                - registry:
                    ref: ${ecr-repository.repositoryUrl}:cache
            cacheTo:
                - inline: {}
            context:
                location: ./app
            platforms:
                - linux/amd64
                - linux/arm64
            push: true
            registries:
                - address: ${ecr-repository.repositoryUrl}
                  password: ${auth-token.password}
                  username: ${auth-token.userName}
            tags:
                - ${ecr-repository.repositoryUrl}:latest
        type: docker-build:Image
runtime: yaml
variables:
    auth-token:
        fn::aws:ecr:getAuthorizationToken:
            registryId: ${ecr-repository.registryId}
```

{{% /choosable %}}

{{% choosable language java %}}

```java
package myapp;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.aws.ecr.Repository;
import com.pulumi.aws.ecr.EcrFunctions;
import com.pulumi.aws.ecr.inputs.GetAuthorizationTokenArgs;
import com.pulumi.dockerbuild.Image;
import com.pulumi.dockerbuild.ImageArgs;
import com.pulumi.dockerbuild.inputs.CacheFromArgs;
import com.pulumi.dockerbuild.inputs.CacheFromRegistryArgs;
import com.pulumi.dockerbuild.inputs.CacheToArgs;
import com.pulumi.dockerbuild.inputs.CacheToInlineArgs;
import com.pulumi.dockerbuild.inputs.BuildContextArgs;
import com.pulumi.dockerbuild.inputs.RegistryArgs;
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
        var ecrRepository = new Repository("ecrRepository");

        final var authToken = EcrFunctions.getAuthorizationToken(GetAuthorizationTokenArgs.builder()
            .registryId(ecrRepository.registryId())
            .build());

        var myImage = new Image("myImage", ImageArgs.builder()
            .cacheFrom(CacheFromArgs.builder()
                .registry(CacheFromRegistryArgs.builder()
                    .ref(ecrRepository.repositoryUrl().applyValue(repositoryUrl -> String.format("%s:cache", repositoryUrl)))
                    .build())
                .build())
            .cacheTo(CacheToArgs.builder()
                .inline()
                .build())
            .context(BuildContextArgs.builder()
                .location("./app")
                .build())
            .platforms(
                "linux/amd64",
                "linux/arm64")
            .push(true)
            .registries(RegistryArgs.builder()
                .address(ecrRepository.repositoryUrl())
                .password(authToken.applyValue(getAuthorizationTokenResult -> getAuthorizationTokenResult).applyValue(authToken -> authToken.applyValue(getAuthorizationTokenResult -> getAuthorizationTokenResult.password())))
                .username(authToken.applyValue(getAuthorizationTokenResult -> getAuthorizationTokenResult).applyValue(authToken -> authToken.applyValue(getAuthorizationTokenResult -> getAuthorizationTokenResult.userName())))
                .build())
            .tags(ecrRepository.repositoryUrl().applyValue(repositoryUrl -> String.format("%s:latest", repositoryUrl)))
            .build());

        ctx.export("ref", myImage.ref());
    }
}
```

{{% /choosable %}}

The exported `ref` value provides a convenient way to reference the pushed
image in downstream Pulumi resources like ECS
[TaskDefinitions](https://www.pulumi.com/registry/packages/aws/api-docs/ecs/taskdefinition/)
or Kubernetes
[Deployments](https://www.pulumi.com/registry/packages/kubernetes/api-docs/apps/v1/deployment/).

## Why a new provider?

The [Pulumi Docker] provider was first introduced in 2018 and has seen wide
adoption. Over the years Pulumi has continued our investment in it, notably
introducing a version 4.0 [last year](../build-images-50x-faster-docker-v4) and
additional improvements to build-on-preview behavior after that.

At the same time, the Docker build ecosystem has seen tremendous advancements
in how images can be built and distributed. These changes were initially
experimental, but they became official when [BuildKit] graduated to become the
default builder in Docker version 23.

We have heard a large number of requests from users to expose more [BuildKit]
functionality in the Pulumi Docker provider. After some consideration, we
decided that a new, standalone provider, focused exclusively on building
images, would provide the best overall user experience as well as the best
platform for Pulumi to stay current with the evolving build landscape.

If you are wondering "Which provider should I use?" the answer depends on
whether you are doing anything related to `docker build`.

| Provider               | Use cases                                                                                                                                                |
| ----------------       | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@pulumi/docker-build` | Anything related to building images with `docker build`.                                                                                                 |
| `@pulumi/docker`       | Everything else -- including running containers and creating networks.                                                                                   |

## Migrating Docker images to Docker-Build

If you are already using the [Pulumi Docker] provider to build images there is
no action required on your part -- your images will continue to build normally.

However, please be aware that going forward the
[Image](https://www.pulumi.com/registry/packages/docker/api-docs/image/)
resource in the [Pulumi Docker] provider will be in maintenance mode. New build
functionality will only be available in the new Docker-Build provider.

If you are interested in leveraging [BuildKit] for your images, or if you
simply want to take advantage of the new provider's improved performance, the
migration process is straightforward and described in detail in the [API
documentation](TODO).

Docker-Build providers a superset of functionality over the previous Docker
provider's Image resource, and if you are familiar with the `docker`
command-line tool, the new Docker-Build Image's options will look very
familiar.

{{% notes %}}
The new Docker-Build provider matches the Docker CLI's behavior and _does not
push_ images by default. If you want to push to a registry, you should include
`push: true` just as you would include `--push` on the command line.
{{% /notes %}}

### Coming from Pulumi Docker v3

Version 3.x of Pulumi Docker is still widely used because it exposes some
BuildKit functionality through raw command-line arguments. The new Docker-Build
provider exposes those arguments as top-level fields on the resource.

Also note that the new Docker-Build provider will build images by default
in CI.

```typescript
// v3 Image
const v3 = new docker.Image("v3-image", {
  imageName: "myregistry.com/user/repo:latest",
  localImageName: "local-tag",
  skipPush: false,
  build: {
    dockerfile: "./Dockerfile",
    context: "../app",
    target: "mytarget",
    args: {
      MY_BUILD_ARG: "foo",
    },
    env: {
      DOCKER_BUILDKIT: "1",
    },
    extraOptions: [
      "--cache-from",
      "type=registry,myregistry.com/user/repo:cache",
      "--cache-to",
      "type=registry,myregistry.com/user/repo:cache",
      "--add-host",
      "metadata.google.internal:169.254.169.254",
      "--secret",
      "id=mysecret,src=/local/secret",
      "--ssh",
      "default=/home/runner/.ssh/id_ed25519",
      "--network",
      "host",
      "--platform",
      "linux/amd64",
    ],
  },
  registry: {
    server: "myregistry.com",
    username: "username",
    password: pulumi.secret("password"),
  },
});

// v3 Image after migrating to docker-build.Image
const v3Migrated = new dockerbuild.Image("v3-to-buildx", {
    tags: ["myregistry.com/user/repo:latest", "local-tag"],
    push: true,
    dockerfile: {
        location: "./Dockerfile",
    },
    context: {
        location: "../app",
    },
    target: "mytarget",
    buildArgs: {
        MY_BUILD_ARG: "foo",
    },
    cacheFrom: [{ registry: { ref: "myregistry.com/user/repo:cache" } }],
    cacheTo: [{ registry: { ref: "myregistry.com/user/repo:cache" } }],
    secrets: {
        mysecret: "value",
    },
    addHosts: ["metadata.google.internal:169.254.169.254"],
    ssh: {
        default: ["/home/runner/.ssh/id_ed25519"],
    },
    network: "host",
    platforms: ["linux/amd64"],
    registries: [{
        address: "myregistry.com",
        username: "username",
        password: pulumi.secret("password"),
    }],
});

```

### Coming from Pulumi Docker v4

The new Docker-Build provider largely exposes the same fields as v4 but
pluralized or renamed to better align with the Docker CLI.

It's important to note that the new Docker-Build provider matches the Docker
CLI's behavior and _does not push_ images by default. If you want to push to a
registry, you should include `push: true` just as you would include `--push` on
the command line.

Also note that the new Docker-Build provider will now build images by default
in CI, whereas the v4 provider did not build images during preview by default.

```typescript
// v4 Image
const v4 = new docker.Image("v4-image", {
    imageName: "myregistry.com/user/repo:latest",
    skipPush: false,
    build: {
        dockerfile: "./Dockerfile",
        context: "../app",
        target: "mytarget",
        args: {
            MY_BUILD_ARG: "foo",
        },
        cacheFrom: {
            images: ["myregistry.com/user/repo:cache"],
        },
        addHosts: ["metadata.google.internal:169.254.169.254"],
        network: "host",
        platform: "linux/amd64",
    },
    buildOnPreview: true,
    registry: {
        server: "myregistry.com",
        username: "username",
        password: pulumi.secret("password"),
    },
});

// v4 Image after migrating to docker-build.Image
const v4Migrated = new dockerbuild.Image("v4-to-buildx", {
    tags: ["myregistry.com/user/repo:latest"],
    push: true,
    dockerfile: {
        location: "./Dockerfile",
    },
    context: {
        location: "../app",
    },
    target: "mytarget",
    buildArgs: {
        MY_BUILD_ARG: "foo",
    },
    cacheFrom: [{ registry: { ref: "myregistry.com/user/repo:cache" } }],
    cacheTo: [{ registry: { ref: "myregistry.com/user/repo:cache" } }],
    addHosts: ["metadata.google.internal:169.254.169.254"],
    network: "host",
    platforms: ["linux/amd64"],
    registries: [{
        address: "myregistry.com",
        username: "username",
        password: pulumi.secret("password"),
    }],
});

```

[BuildKit]: https://docs.docker.com/build/buildkit/
[Pulumi Docker]: https://www.pulumi.com/registry/packages/docker/
[inline cache]: https://docs.docker.com/build/cache/backends/inline/

### Conclusion

The launch of the new Docker-Build provider marks a significant milestone in enhancing container management for developers. Leveraging the latest BuildKit technology, this tool is a testament to our commitment to innovation and user-driven development.

Your feedback is crucial to our ongoing improvement efforts. As we look ahead, we are dedicated to incorporating your insights to further enhance the Docker-Build provider. Letâ€™s continue to refine and advance our tools together.

For more details on how to utilize the Docker-Build provider, check out our documentation. Together, we can redefine the possibilities in container technology.
