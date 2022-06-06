---
title: "Using Tools like tf2pulumi"
layout: topic
date: 2022-06-03T11:33:22-05:00
draft: false
description: Use the tf2pulumi tool to convert large blocks of HCL to your Pulumi language of choice.
meta_desc: Use the tf2pulumi tool to convert large blocks of HCL to your Pulumi language of choice.
index: 2
estimated_time: 10
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - terraform
    - tf2pulumi
    - yaml
---

Understanding how things are translated manually is nice, but in real life, people don't translate this kind of thing by hand. Instead, folks use tools that can automate 90% of the process and then tweak it to match what they want. We'll explore two tools here: tf2pulumi and the YAML Conversion tool.

## Installing tf2pulumi

The tf2pulumi tool is a CLI command that takes in a Terraform file and returns a Pulumi file in the language of your choice. The tool doesn't come automatically with the Pulumi CLI. [Install the tool](https://github.com/pulumi/tf2pulumi#building-and-installation). From here, we can then try it out on some of our code.

## Using tf2pulumi

Let's take the following file from the prior page and use the tool to convert it. Save it to a new directory on your machine.

```hcl
terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
      version = "~> 2.13.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "backend" {
  name         = "pulumi/tutorial-pulumi-fundamentals-backend:latest"
  keep_locally = false
}

resource "docker_image" "frontend" {
  name         = "pulumi/tutorial-pulumi-fundamentals-frontend:latest"
  keep_locally = false
}

resource "docker_image" "mongo" {
  name         = "pulumi/tutorial-pulumi-fundamentals-database-local:latest"
  keep_locally = false
}

resource "docker_network" "network" {
  name = "services-dev"
}

resource "docker_container" "mongo-container" {
  image = docker_image.mongo.latest
  name  = "mongo-dev"
  ports {
    internal = 27017
    external = 27017
  }
  networks_advanced {
    name = "services-dev"
    aliases = ["mongo"]
  }
}

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

resource "docker_container" "frontend-container" {
  image = docker_image.frontend.latest
  name  = "frontend-dev"
  envs  = [
    "LISTEN_PORT=3001",
    "HTTP_PROXY=backend-dev:3000",
    "PROXY_PROTOCOL=http://"
  ]
  ports {
    internal = 3001
    external = 3001
  }
  networks_advanced {
    name = "services-dev"
    aliases = ["frontend-dev"]
  }
}
```

In your terminal, change into that new directory. Next, let's create a new Pulumi project in the language we'll convert the HCL to. Replace the `<lang>` placeholder with your Pulumi-supported language of choice.

```bash
$ pulumi new <lang> -f
```

The `-f` flag might be new to you. It forces creation of a project in a directory that isn't empty.

Next, we'll run the actual command to convert the file. We pass in the language we used when we created the Pulumi project:

```bash
$ tf2pulumi --target-language <lang>
```

You may get an error like this if you're converting from HCL2:

```bash
$ tf2pulumi --target-language <lang>
Warning: default provider configuration is not supported

  on main.tf line 9:
  (source code not available)
```

You can safely ignore that error. The conversion tool overwrites the contents of {{% langfile %}} as such:

{{% chooser language "python,typescript" %}}

{{% choosable language python %}}

```python
import pulumi
import pulumi_docker as docker

backend = docker.RemoteImage("backend",
    name="pulumi/tutorial-pulumi-fundamentals-backend:latest",
    keep_locally=False)
frontend = docker.RemoteImage("frontend",
    name="pulumi/tutorial-pulumi-fundamentals-frontend:latest",
    keep_locally=False)
mongo = docker.RemoteImage("mongo",
    name="pulumi/tutorial-pulumi-fundamentals-database-local:latest",
    keep_locally=False)
network = docker.Network("network", name="services-dev")
mongo_container = docker.Container("mongo-container",
    image=mongo.latest,
    name="mongo-dev",
    ports=[docker.ContainerPortArgs(
        internal=27017,
        external=27017,
    )],
    networks_advanced=[docker.ContainerNetworksAdvancedArgs(
        name="services-dev",
        aliases=["mongo"],
    )])
backend_container = docker.Container("backend-container",
    image=backend.latest,
    name="backend-dev",
    envs=[
        "DATABASE_HOST=mongodb://mongo:27017",
        "DATABASE_NAME=cart",
        "NODE_ENV=development",
    ],
    ports=[docker.ContainerPortArgs(
        internal=3000,
        external=3000,
    )],
    networks_advanced=[docker.ContainerNetworksAdvancedArgs(
        name="services-dev",
        aliases=["backend-dev"],
    )])
frontend_container = docker.Container("frontend-container",
    image=frontend.latest,
    name="frontend-dev",
    envs=[
        "LISTEN_PORT=3001",
        "HTTP_PROXY=backend-dev:3000",
        "PROXY_PROTOCOL=http://",
    ],
    ports=[docker.ContainerPortArgs(
        internal=3001,
        external=3001,
    )],
    networks_advanced=[docker.ContainerNetworksAdvancedArgs(
        name="services-dev",
        aliases=["frontend-dev"],
    )])
```

{{% /choosable %}}

{{% choosable language typescript %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";

const backend = new docker.RemoteImage("backend", {
    name: "pulumi/tutorial-pulumi-fundamentals-backend:latest",
    keepLocally: false,
});
const frontend = new docker.RemoteImage("frontend", {
    name: "pulumi/tutorial-pulumi-fundamentals-frontend:latest",
    keepLocally: false,
});
const mongo = new docker.RemoteImage("mongo", {
    name: "pulumi/tutorial-pulumi-fundamentals-database-local:latest",
    keepLocally: false,
});
const network = new docker.Network("network", {name: "services-dev"});
const mongo_container = new docker.Container("mongo-container", {
    image: mongo.latest,
    name: "mongo-dev",
    ports: [{
        internal: 27017,
        external: 27017,
    }],
    networksAdvanced: [{
        name: "services-dev",
        aliases: ["mongo"],
    }],
});
const backend_container = new docker.Container("backend-container", {
    image: backend.latest,
    name: "backend-dev",
    envs: [
        "DATABASE_HOST=mongodb://mongo:27017",
        "DATABASE_NAME=cart",
        "NODE_ENV=development",
    ],
    ports: [{
        internal: 3000,
        external: 3000,
    }],
    networksAdvanced: [{
        name: "services-dev",
        aliases: ["backend-dev"],
    }],
});
const frontend_container = new docker.Container("frontend-container", {
    image: frontend.latest,
    name: "frontend-dev",
    envs: [
        "LISTEN_PORT=3001",
        "HTTP_PROXY=backend-dev:3000",
        "PROXY_PROTOCOL=http://",
    ],
    ports: [{
        internal: 3001,
        external: 3001,
    }],
    networksAdvanced: [{
        name: "services-dev",
        aliases: ["frontend-dev"],
    }],
});

```

{{% /choosable %}}

{{% /chooser %}}

If you were to compare this code to the [code from our Fundamentals pathway]({{< relref "/learn/pulumi-fundamentals" >}}), it's going to appear nearly the same! In fact, the only things that are really different are the variables, which are only not used because we didn't use any variables in our HCL. There always are some tweaks you'll need to do when using this tool as Terraform doesn't include the language features like loops and abstractions that we use general-purpose programming languages for with Pulumi. To learn more about how to add those kinds of features to your Pulumi code, [check out the Abstractions and Encapsulations pathway]({{< relref "/learn/abstraction-encapsulation" >}}) if you haven't already.

<br/>
<br/>

That works for the code, but what if you just want to write the code from scratch but keep all of the deployed resources? How can you get all of the resources into Pulumi? We can use the import tool. Let's explore. Onward!
