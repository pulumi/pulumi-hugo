---
title: "Creating Docker Images"
layout: topic
date: 2021-09-07T14:06:50-05:00
draft: true
description: Use Pulumi to build Docker images.
meta_desc: Use Pulumi to build Docker images.
index: 1
estimated_time: 10
meta_image: meta.png
authors:
    - sophia-parafina
    - laura-santamaria
tags:
    - fundamentals
    - docker
links:
    - text: Code Repo
      url: https://github.com/pulumi/tutorial-pulumi-fundamentals
block_external_search_index: true
---

In this part, we'll create our first Pulumi
[_resource_](https://www.pulumi.com/docs/reference/glossary/#resources).
Resources in Pulumi are the basic building blocks of your infrastructure,
whether that's a database instance or a compute instance or a specific storage
bucket. In Pulumi, you have resources managed by [_resource
providers_](https://www.pulumi.com/docs/reference/glossary/#resource-provider),
and then you can group those resources to abstract them (such as a group of
compute instances that all have the same configuration and implementation).

In this case, our resources are going to be Docker containers and images that we
build locally using infrastructure as code. Our resource provider is Docker, and
we're using Python as our [_language
host_](https://www.pulumi.com/docs/reference/glossary/#language-host), or the
executor that compiles the code we write and interprets it for Pulumi.

## Verify your application

Create a directory called `app` inside the directory you made in the previous
lesson. Clone the code repository there, then move everything from the code
repository directory to the `app/` directory.

```shell
mkdir app
cd app
git clone git@github.com:pulumi/tutorial-pulumi-fundamentals.git
mv -f tutorial-pulumi-fundamentals/* . && rm -rf tutorial-pulumi-fundamentals/ 
```

Let's explore the contents of the `app/` directory. There is a backend, a
frontend, and a data directory. Both the frontend and backend directories
contain a `Dockerfile` that builds the application images.

Let's examine the backend `Dockerfile` in `app/backend/Dockerfile`:

```docker
FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY ./src/package*.json ./
RUN npm install
COPY ./src .
RUN npm build
EXPOSE 3000

CMD [ "npm", "start" ]
```

This `Dockerfile` copies the REST backend into the Docker filesystem, installs
the dependencies, and builds the image. Note that port 3000 must be open on your
host machine.

## Build your Docker Image with Pulumi

Before we start writing our Pulumi program, we need to install the right
provider. In this case, we want to use the `pulumi_docker` provider for Python,
our language host. It's always good practice for Python to work inside a virtual
environment, or venv, so let's activate our venv and use `pip` to install the
provider along with the main Pulumi package:

```bash
cd ../
source venv/bin/activate
pip3 install pulumi_docker
```

You should see output showing the provider package being installed, just like
for any Python package install. You'll want to ensure the package gets added to
the `requirements.txt` file at some point.

Back inside your Pulumi program, let's build your first Docker image. Remember
that a Pulumi program is the code that defines the ideal configuration of your
infrastructure using a general-purpose programming language. In this case, we're
using Python, so our main file is `__main__.py`. Inside your program's
`__main__.py` file, use any editor to add the following code:


```python
import pulumi
import pulumi_docker as docker

stack = pulumi.get_stack()

# build our backend image!
backend_image_name = "backend"
backend = docker.Image("backend",
                        build=docker.DockerBuild(context="./app/backend"),
                        image_name=f"{backend_image_name}:{stack}",
                        skip_push=True
                        )
```
In this file, we import, or call, the main Pulumi package and the Docker
provider. Then, we figure out which stack we're on in the command line, and
populate the `stack` variable for later use. When we build our backend image,
we name it in our stack as "backend" before passing some arguments to the Docker
provider. The Docker provider uses the build context and the image name to build
an image, and it does not push the image up anywhere.

Run `pulumi up`, and Pulumi should build your Docker image. First, though, it
gives you a preview of the changes you'll be making to the stack and asks if the
changes appear okay to you. You'll need to reply "yes" to the prompt to actually
build the image. After the command finishes, you will see your image if you run
the command `docker images` or `docker image ls` (depending on your preference).

Let's dig a bit deeper into the code and explore the various Pulumi concepts. 
Every resource has
[_inputs_](https://www.pulumi.com/docs/intro/concepts/inputs-outputs/) and
[_outputs_](https://www.pulumi.com/docs/reference/glossary/#outputs). Inputs are
values that are provided to the resource. Outputs are the resource's properties.
Note that Pulumi can't know the output until the resource has completed
provisioning as some of those outputs are provided by the provider after
everything has loaded, booted, or otherwise has come online. More on outputs
later.

In our case here, the Docker
[`Image`](https://www.pulumi.com/docs/reference/pkg/docker/image/) resource
takes the following inputs:

- `name`: a name for the resource we are creating
- `build`: the Docker build context (i.e., the path to the app)
- `image_name`: the qualified image name which can include a tag
- `skip_push`: a flag that defines whether to push to a registry

Now that we've provisioned our first piece of infrastructure, let's add the
other pieces of our application.

## Add the frontend client and MongoDB

Our application includes a frontend client and MongoDB. We'll add them to the
program, so add this code after the previous fragment.

```python
# build our frontend image!
frontend_image_name = "frontend"
frontend = docker.Image("frontend",
                        build=docker.DockerBuild(context="./app/frontend"),
                        image_name=f"{frontend_image_name}:{stack}",
                        skip_push=True
                        )
```

We build the frontend client the same way we built the backend. However, we are
going to use the official MongoDB image from Docker Hub, so we use the
[RemoteImage](https://www.pulumi.com/docs/reference/pkg/docker/remoteimage/)
resource.

```python
# build our mongodb image!
mongo_image = docker.RemoteImage("mongo", name="mongo:bionic")
```

Compare your program now to this complete program before we move forward:

```python
import pulumi
import pulumi_docker as docker

stack = pulumi.get_stack()

# build our backend image!
backend_image_name = "backend"
backend = docker.Image("backend",
                        build=docker.DockerBuild(context="./app/backend"),
                        image_name=f"{backend_image_name}:{stack}",
                        skip_push=True
                        )

# build our frontend image!
frontend_image_name = "frontend"
frontend = docker.Image("frontend",
                        build=docker.DockerBuild(context="./app/frontend"),
                        image_name=f"{frontend_image_name}:{stack}",
                        skip_push=True
                        )

# build our mongodb image!
mongo_image = docker.RemoteImage("mongo", name="mongo:bionic")
```

If your code looks the same, great! Otherwise, update yours to match this code.
Now, run `pulumi up` to build all of the images that we'll need. From here, we
can move on to configuring and provisioning our containers.

Note that, in the future, you don't need to run `pulumi up` in stages like this
to create your infrastructure. You can write the entire program and then run it.
We're only doing a step-by-step process here to make learning easier. Onward!
