---
title: "Creating and Running Containers"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-07-28T10:34:24-07:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: true

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Here is a brief description of what this topic will cover.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Here is a brief description of what this topic will cover.

# The order in which the topic appears in the module.
index: 1

# The estimated time, in minutes, for new users to complete the topic.
estimated_time: 10

# The meta_image appears in social-media previews and on the Learn Pulumi home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for reference.
meta_image: meta.png

# The optional meta_video also appears in social-media previews (taking precedence
# over the image) and on the module's index page. A placeholder video representing
# the recommended format, dimensions and aspect ratio has been provided for reference.
# meta_video:
#     url: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/video/2020-09-03-16-46-41.mp4'
#     thumb: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/thumbs/2020-09-03-16-46-41.jpg'
#     preview: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/previews/2020-09-03-16-46-41.jpg'
#     poster: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/posters/2020-09-03-16-46-41.jpg'

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - christian-nunciato

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - change-me

# When provided, links are rendered at the bottom of the topic page.
links:
    - text: Some Website
      url: http://something.com

# Exclude from search-engine indexing for now.
block_external_search_index: true
---

In this lab, we'll create our first Pulumi resource. We'll run Docker containers that we build locally using infrastructure as code.

## Verify your application

We have a preconfigured MERN (Mongo, Express, React, Node) shopping cart application adapted from this [shopping-cart repository](https://github.com/shubhambattoo/shopping-cart.git). The shopping cart application consists of a frontend client, a backend REST server to manage transactions, and a MongoDB instance for storing product data.

Take a look at `app/` directory. There is a backend, a frontend, and a data directory. Both the frontend and backend directories contain a Dockerfile that builds the application containers.

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

This `Dockerfile` copies the REST backend into the Docker container, installs the dependencies, and builds the image. Note that port 3000 must be open.

## Create a registry

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

Before we create images for the application containers, we'll need a place to store them. We'll create a private AWS ECR repository Add the following to `__main__.py`.

```bash
import pulumi_aws as aws

# Create a private ECR repository.
repo = aws.ecr.Repository('my_repo')
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

Because it's a private repository we will need to add a function to authenticate. This function generates a temporary access credential.

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

```python
# Get registry info (creds and endpoint).
def getRegistryInfo(rid):
    creds = aws.ecr.get_credentials(registry_id=rid)
    decoded = base64.b64decode(creds.authorization_token).decode()
    parts = decoded.split(':')
    if len(parts) != 2:
        raise Exception("Invalid credentials")
    return docker.ImageRegistry(creds.proxy_endpoint, parts[0], parts[1])

image_name = repo.repository_url
registry_info = repo.registry_id.apply(getRegistryInfo)
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

## Build your Docker image with Pulumi

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

Before yo can build an image or run a container, make sure you installed the `pulumi_docker` provider from pip inside your virtualenv:

```bash
source venv/bin/activate
pip3 install pulumi_docker
```

You should see output showing the pip package and the provider being installed

Back inside your Pulumi Program, let's build your first Docker image. Inside your program's `__main__.py` add the following:

```python
# [Existing imports]
import pulumi_docker as docker

# Get the stack name
stack = pulumi.get_stack()

# build our backend image!
backend_image_name = "backend"
backend = docker.Image("backend",
                        build=docker.DockerBuild(context="../app/backend"),
                        image_name=f"{backend_image_name}:{stack}",
                        registry=registry_info
)
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

Run `pulumi up` to build your docker image If you run `aws ecr list-images --repository-name my_repo` you should see your image.

Let's review what's going on in the code. The Docker [Image](https://www.pulumi.com/docs/reference/pkg/docker/image/) resource takes the following for inputs:

- `name`: a name for the Resource we are creating
- `build`: the Docker build context, i.e., the path to the app
- `image_name`: this is the qualified image name which can include a tag
- `registry`: push to ECR registry

Now that we've provisioned our first piece of infrastructure, let's add the other pieces of our application.

## Adding the frontend client and MongoDB

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

```python
# build our frontend image!
backend_image_name = "frontend"
backend = docker.Image("backend",
                        build=docker.DockerBuild(context="../app/frontend"),
                        image_name=f"{backend_image_name}:{stack}",
                        registry=registry_info
)
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

Our application includes a frontend client and MongoDB. We'll add them to the program.

We build the frontend client the same way we built the backend. However, we are going to use the official MongoDB image from Docker Hub, so we use the [RemoteImage](https://www.pulumi.com/docs/reference/pkg/docker/remoteimage/) resource.

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

```python
# build our mongodb image!
mongo_image = docker.RemoteImage("mongo",
                        name="mongo:bionic")
```

The complete program looks like this:

```python
import pulumi
import pulumi_docker as docker

stack = pulumi.get_stack()

# build our backend image!
backend_image_name = "backend"
backend = docker.Image("backend",
                        build=docker.DockerBuild(context="../app/backend"),
                        image_name=f"{backend_image_name}:{stack}",
                        registry=registry_info
)

# build our frontend image!
frontend_image_name = "frontend"
frontend = docker.Image("frontend",
                        build=docker.DockerBuild(context="../app/frontend"),
                        image_name=f"{frontend_image_name}:{stack}",
                        registry=registry_info
)

# build our mongodb image!
mongo_image = docker.RemoteImage("mongo",",
                        name="mongo:bionic"))
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

Run `pulumi up` to build and push images to your AWS registry.
