---
title: "Translating Simple Terraform Systems"
layout: topic
date: 2022-06-03T11:33:05-05:00
draft: false
description: Use the API docs to translate HCL by hand to your language of choice for Pulumi.
meta_desc:  Use the API docs to translate HCL by hand to your language of choice for Pulumi.
index: 1
estimated_time: 10
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - terraform
---

If you're looking for a basic understanding of how to translate Terraform files by hand, here's a quick primer. Generally, we would only do this kind of manual conversion when we're working with small files, perhaps a handful of resources, and intend to move quickly from that basic file to more complex architectures. That being said, there are a few things that make translation easier.

## Reading the registry

The Pulumi Registry is a listing of all of the various cloud providers that Pulumi supports along with their API docs. Each provider has an installation and configuration page along with an overview of the use of the provider and, occasionally, some examples and guides to their use.

One key thing that the registry allows is identifying whether a provider uses the Terraform bridge (a classic provider) or is natively integrated with the provider's API (a native provider). If a provider is based off of the Terraform bridge, the *Notes* field in the **Package Details** section of the API docs will include a note that states the provider is based on a Terraform provider. For example, [going to the Civo provider API docs]({{< relref "/registry/packages/civo/api-docs#package-details" >}}) will reveal the note in the table at the bottom of the page.

## Working with providers based on the Terraform bridge

If the cloud provider you intend to work with is based off of the Terraform bridge, you're in luck. The translation is fairly straight-forward because the underlying interface is the same. Our Docker example is built on the Terraform bridge; here's the backend container as an example:

{{< code-filename file="main.tf" >}}

```hcl
#...
resource "docker_container" "backend-container" {
  image = docker_image.backend.latest
  name  = "backend-dev"
  envs  = [
    "DATABASE_HOST=mongodb://mongo:27017",
    "DATABASE_NAME=cart",
    "NODE_ENV=development"
  ]
  ports {
    internal = 3000
    external = 3000
  }
  networks_advanced {
    name = "services-dev"
    aliases = ["backend-dev"]
  }
}
#...
```

{{< /code-filename >}}

Let's explore this with Python as the Python SDK docs are more verbose. So, if we explore the Pulumi Registry, we find [this data for the container resource within the Python SDK]({{< relref "/registry/packages/docker/api-docs/container#create" >}}), which lists all of the properties available. It should appear very similar to [the same resource's documentation for Terraform](https://registry.terraform.io/providers/kreuzwerker/docker/latest/docs/resources/container#schema) in terms of properties because they're built on the same bridge/interface underneath. Let's explore the conversion, then, in Python side-by-side with the old Terraform code just for the backend container. Note the formatting isn't exactly PEP 8 for Python or exactly in the right order for HCL so that we can highlight the similar components cleanly from one side to the other:

<div style="display:flex; gap:1rem;">
<div class="container-left">

{{< code-filename file="main.tf" >}}

```hcl {.line-numbers}
#...
resource "docker_container" "backend_container" {
  name       = "backend-dev"
  image      = docker_image.backend.latest
  envs       = [
    "DATABASE_HOST=mongodb://mongo:27017",
    "DATABASE_NAME=cart",
    "NODE_ENV=development"
  ]
  ports {
    internal = 3000
    external = 3000
  }
  networks_advanced {
    name = "services-dev"
    aliases = ["backend-dev"]
  }
  depends_on = [
      docker_container.mongo_container
  ]
}
#...
```

{{< /code-filename >}}

</div>
<div class="container-right">

{{< code-filename file="sample.py" >}}

```python {.line-numbers}
# ...
backend_container = docker.Container( "backend_container",
    name=f"backend-{stack}",
    image=backend.repo_digest,
    envs=[
        f"DATABASE_HOST={mongo_host}",
        f"DATABASE_NAME={database}",
        f"NODE_ENV={node_environment}"
    ],
    ports=[docker.ContainerPortArgs(
        internal=backend_port,
        external=backend_port
    )],
    networks_advanced=[
        docker.ContainerNetworksAdvancedArgs(
            name=network.name
    )],
    opts=pulumi.ResourceOptions(depends_on=[
        mongo_container
    ])
)
#...
```

{{< /code-filename >}}

</div>
</div>

To compare, the `name`, `image`, `envs`, `ports`, `networks_advanced` and `depends_on` properties are present on both sides. The Python code uses variables to fill in each value ([head back to Fundamentals]({{< relref "/learn/pulumi-fundamentals/configure-and-provision" >}}) to explore where we set up those variables). The string on line 3 of the Python code is the internal name of the resource, similar to the `"backend-container"` value on line 2 of the HCL code. There are a couple of syntax differences, namely the `pulumi.ResourceOptions`, `docker.ContainerPortArgs`, and `docker.ContainerNetworksAdvancedArgs` calls. Those specific library calls are required by Python as a language quirk, rather than necessarily meaning anything different is happening.

Generally, if you're working with a bridged provider, you will be able to do these types of one-to-one conversions as shown here.

## Working with native providers

Let's say that you would rather work with the native providers, which are the Pulumi providers build directly on top of the APIs from the various cloud providers. Manually converting is a bit harder in that case. Let's take an example of a GCP resource: an Artifact Repository. We're going to explore in TypeScript this time:

<div style="display:flex; gap:1rem;">
<div class="container-left">

{{< code-filename file="main.tf" >}}

```hcl {.line-numbers}
# ...
resource "google_artifact_registry_repository" "gunicorn-image-dev" {
  provider = google-beta

  location = "us-central1"
  repository_id = "gunicorn-image-dev"
  description = "gunicorn custom image repository"
  format = "DOCKER"
}
# ...
```

{{< /code-filename >}}

</div>
<div class="container-right">

{{< code-filename file="sample.ts" >}}

```typescript {.line-numbers}
// ...
const registry = new ngcp.artifactregistry.v1beta2.Repository(
    "gunicorn-image-dev", {
        location: `${config.require("region")}`,
        repositoryId: "gunicorn-image-dev",
        description: "gunicorn custom image repository",
        format: "DOCKER",
    });
// ...
```

{{< /code-filename >}}

</div>
</div>

Still appears very similar, doesn't it? GCP's underlying API and the bridge were very similar, so the code appears similar. Compare that to the same two sets of code with an AWS Lambda:

<div style="display:flex; gap:1rem;">
<div class="container-left">

```hcl {.line-numbers}
# ...
resource "aws_lambda_function" "lambda" {
  function_name = "lambda_function_name"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "index.handler"
  s3_bucket     = "my_bucket"
  s3_key        = "function.zip"
  runtime       = "nodejs14.x"
  timeout       = 5
  tracing_config {
      mode: "Active"
  }
  vpc_config {
    subnet_ids         = ["sg-085912345678492fb"]
    security_group_ids = [
        "subnet-071f712345678e7c8",
        "subnet-07fd123456788a036",
    ]
  }
}
# ...
```

</div>
<div class="container-right">

```typescript {.line-numbers}
// ...
const func = new aws_native.lambda.Function("function", {
    handler: "index.handler",
    role: "arn:aws:iam::123456789012:role/lambda-role",
    code: {
        s3Bucket: "my-bucket",
        s3Key: "function.zip",
    },
    runtime: "nodejs14.x",
    timeout: 5,
    tracingConfig: {
        mode: aws_native.lambda.FunctionTracingConfigMode.Active,
    },
    vpcConfig: {
        securityGroupIds: ["sg-085912345678492fb"],
        subnetIds: [
            "subnet-071f712345678e7c8",
            "subnet-07fd123456788a036",
        ],
    },
});
// ...
```

</div>
</div>

Some small differences, but not much, right? Can you follow where each line leads to the same result? Using native providers isn't that much different from a code standpoint. We start to see significant differences when they get deployed and in the more complex parts of code. Since native providers connect directly into the APIs, they generally react faster (depending on the speed of the provider's API responses, of course). When we start doing loops and other programming language features, we begin to find the value of using the native providers because we can hook into the provider a lot easier with the native versions. In addition, native providers use the schema generated by the providers themselves to build the SDKs and integration into Pulumi, so new features released to those API schema are available almost immediately after release ([read more about the process]({{< relref "/blog/pulumiup-native-providers#full-api-coverage-via-automated-nightly-updates" >}})). As a result, if you have the option to use a native provider, we generally recommend using that over a classic (bridged) provider.

<br/>
<br/>

However, you don't have to translate everything manually! There are a number of tools that we can use. Let's start with tf2pulumi. Onward!