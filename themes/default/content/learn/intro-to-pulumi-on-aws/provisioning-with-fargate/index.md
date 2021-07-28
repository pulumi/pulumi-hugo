---
title: "Provisioning With Fargate"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-07-28T10:35:45-07:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: true

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Here is a brief description of what this topic will cover.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Here is a brief description of what this topic will cover.

# The order in which the topic appears in the module.
index: 3

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

AWS Fargate is a service that lets you run containers without having to manage servers or clusters of EC2 instances. We'll use Fargate to deploy the containers for our application.

Now that we've created our images, we can setup the Fargate service.

## Configure the application

Add the following configuration variables to your Pulumi program below the imports:

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

```python
config = pulumi.Config()
frontend_port = config.require_int("frontend_port")
backend_port = config.require_int("backend_port")
mongo_port = config.require_int("mongo_port")
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

Your Pulumi program should now look like this:

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

```python
import pulumi
import pulumi_docker as docker

# get configuration
config = pulumi.Config()
frontend_port = config.require_int("frontend_port")
backend_port = config.require_int("backend_port")
mongo_port = config.require_int("mongo_port")

# build our backend image!
backend_image_name = "backend"
backend = docker.Image("backend",
                        build=docker.DockerBuild(context="../app/backend"),
                        image_name=f"{backend_image_name}:{stack}",
                        skip_push=True
)

# build our frontend image!
frontend_image_name = "frontend"
frontend = docker.Image("frontend",
                        build=docker.DockerBuild(context="../app/frontend"),
                        image_name=f"{frontend_image_name}:{stack}",
                        skip_push=True
)

# build our mongodb image!
mongo_image = docker.RemoteImage("mongo",
                        name="mongo:4.4.6",
                        keep_locally=True)
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

Try and run your `pulumi up` again at this point. You should see an error like this:

```
Diagnostics:
  pulumi:pulumi:Stack (my-first-app-dev):
    error: Missing required configuration variable 'my-first-app:frontend_port'
        please set a value using the command `pulumi config set my-first-app:frontend_port <value>`
    error: an unhandled error occurred: Program exited with non-zero exit code: 1
```

This is because we have specified that this config option is _required_. Let's set the ports for this stack:

```bash
pulumi config set frontend_port 3001
pulumi config set backend_port 3000
pulumi config set mongo_port 27017
```

Now, try and rerun your Pulumi program.

Your Pulumi program should now run, but you're not actually using this newly configured ports, yet!

## Creating Fargate Tasks and Services

To run containers in AWS we need to create a task definition. The task definition specifie which image to use for a container, the CPU and memory assigned to a task, the Docker networking mode, the launch type tp use, and more parameters. To keep this example simple, we will define the entire application stack in a single stack. Keep in mind that an application can use multiple tasks definitions.

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

```python
task_definition = aws.ecs.TaskDefinition('app-task',
    family='fargate-task-definition',
    cpu='256',
    memory='512',
    network_mode='awsvpc',
    requires_compatibilities=['FARGATE'],
    execution_role_arn=role.arn,
    container_definitions=json.dumps([{
		'name': frontend',
		'image': '',
		'portMappings': [{
			'containerPort': 80,
			'hostPort': 80,
			'protocol': 'tcp'
		}]
	},
    {

      "name": "app",
      "image": "application_image",
      "portMappings": [
        {
          "containerPort": 9080,
          "hostPort": 9080,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "dependsOn": [
        {
          "containerName": "envoy",
          "condition": "HEALTHY"
        }
      ]
    },
    {

      "name": "app",
      "image": "application_image",
      "portMappings": [
        {
          "containerPort": 9080,
          "hostPort": 9080,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "dependsOn": [
        {
          "containerName": "envoy",
          "condition": "HEALTHY"
        }
      ]
    }
    ])
)
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

An Amazon ECS service allows you to run and maintain a specified number of instances of a task definition simultaneously in an Amazon ECS cluster. If any of your tasks should fail or stop for any reason, the Amazon ECS service scheduler launches another instance of your task definition to replace it in order to maintain the desired number of tasks in the service.

In addition to maintaining the desired number of tasks in your service, you can optionally run your service behind a load balancer. The load balancer distributes traffic across the tasks that are associated with the service.

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

```python
service = aws.ecs.Service('app-svc',
	cluster=cluster.arn,
    desired_count=3,
    launch_type='FARGATE',
    task_definition=task_definition.arn,
    network_configuration=aws.ecs.ServiceNetworkConfigurationArgs(
		assign_public_ip=True,
		subnets=default_vpc_subnets.ids,
		security_groups=[group.id],
	),
    load_balancers=[aws.ecs.ServiceLoadBalancerArgs(
		target_group_arn=atg.arn,
		container_name='my-app',
		container_port=80,
	)],
    opts=ResourceOptions(depends_on=[wl]),
)
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

## Create a Container resource

In lab 02 we built Docker images. Now we want to create Docker containers and pass our configuration to them. Our containers will need to connect to each other so we will need to create a network.

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

```python
# create a network!
network = docker.Network("network",
                        name="services")
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

Define a new resource in your Pulumi program below the `image` resource, like this:

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

```python
# create the backend container!
backend_container = docker.Container("backend_container",
                        image=backend.base_image_name,
                        ports=[docker.ContainerPortArgs(
                            internal=backend_port,
                            external=backend_port)],
                        envs=[
                            f"DATABASE_HOST={mongo_host}",
                            f"DATABASE_NAME={database}",
                            f"NODE_ENV={node_environment}"
                        ],
                        networks_advanced=[docker.ContainerNetworksAdvancedArgs(
                            name=network.name
                        )],
                        opts=pulumi.ResourceOptions(depends_on=[mongo_container])
)
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

It is important to note something here. In the Container resource, we are referencing `baseImageName` from the `image` resource. Pulumi now knows there is a dependency between these two resources, and will know to create the `container` resource _after_ the image resource. Another dependency to note is that the `backend_container` depends on the `mongo_container`. If we tried to run `pulumi up` without the `mongo_container` running, we would get an error message.

The backend container also requires environment variables to connect to the mongo container and set the node environment for Express.js. These are set in `./app/backend/src/.env`. Like before we can set them using `pulumi config`.

```bash
pulumi config set mongo_host mongodb:http://mongo:27017
pulumi config set database cart
pulumi config set node_environment development
```

## Putting it all together

Now that we know how to create a container we can complete our program.

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

```python
import pulumi
import pulumi_docker as docker

stack = pulumi.get_stack()
config = pulumi.Config()

frontend_port = config.require_int("frontend_port")
backend_port = config.require_int("backend_port")
mongo_port = config.require_int("mongo_port")
mongo_host = config.require_string("mongo_host")
database = config.require_string("database")
node_environment = config.require_string("environment")

# build our backend image!
backend_image_name = "backend"
backend = docker.Image("backend",
                        build=docker.DockerBuild(context="../app/backend"),
                        image_name=f"{backend_image_name}:{stack}",
                        skip_push=True
)

# build our frontend image!
frontend_image_name = "frontend"
frontend = docker.Image("frontend",
                        build=docker.DockerBuild(context="../app/frontend"),
                        image_name=f"{frontend_image_name}:{stack}",
                        skip_push=True
)

# build our mongodb image!
mongo_image = docker.RemoteImage("mongo",
                        name="mongo:bionic")

# create a network!
network = docker.Network("network",
                        name="services")

# create the mongo container
mongo_container = docker.Container("mongo_container",
                        image=mongo_image.latest,
                        name="mongo",
                        ports=[docker.ContainerPortArgs(
                          internal=mongo_port,
                          external=mongo_port
                        )],
                        networks_advanced=[docker.ContainerNetworksAdvancedArgs(
                            name=network.name,
                            aliases=["mongo"]
                        )]
)

# create the backend container!
backend_container = docker.Container("backend_container",
                        image=backend.base_image_name,
                        name="backend",
                        ports=[docker.ContainerPortArgs(
                            internal=backend_port,
                            external=backend_port)],
                        envs=[
                            f"DATABASE_HOST={mongo_host}",
                            f"DATABASE_NAME={database}",
                            f"NODE_ENV={node_environment}"
                        ],
                        networks_advanced=[docker.ContainerNetworksAdvancedArgs(
                            name=network.name
                        )],
                        opts=pulumi.ResourceOptions(depends_on=[mongo_container])
)

# create the frontend container!
frontend_container = docker.Container("frontend_container",
                        image=frontend.base_image_name,
                        name="frontend",
                        ports=[docker.ContainerPortArgs(
                            internal=frontend_port,
                            external=frontend_port)],
                        envs=[
                            f"LISTEN_PORT={frontend_port}",
                        ],
                        networks_advanced=[docker.ContainerNetworksAdvancedArgs(
                            name=network.name
                        )]
)
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

With Docker networking, we can use image names to refer to a container. In our example, the React frontend client sends requests to the Express backend client. The URL to the backend is set in the client's `package.json` file. If you change the name of the backend container, make sure the client is configured properly.

```json
  "proxy": "http://backend:3000",
  "devDependencies": {
    "cross-env": "^7.0.2"
  },
  ```

Run `pulumi up` and our application is running. However, the store is empty and we need to add products to the database.

## Populate the database

We'll use Docker to populate mongodb. First, we will copy the data to the mongodb container, then open a shell in the container and import the data.

```bash
docker cp ../app/data/products.json mongo:/tmp/products.json
docker exec -it mongo sh
```

This opens a shell in the mongo container and we can use `mongoimport` to load the data into the database.

```sh
mongoimport -d cart -c products --file /tmp/products.json --jsonArray
```

Open a browser to `http://localhost:3001` and our application is now deployed.
