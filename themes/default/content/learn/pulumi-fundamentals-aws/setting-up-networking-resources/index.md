---
title: "Setting up Networking Resources"
layout: topic
date: 2021-09-10T09:43:03-05:00
draft: false
# The description summarizes the course. It appears on the Learn home and module index pages.
description: Here is a brief description of what this topic will cover.
# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Here is a brief description of what this topic will cover.
index: 1
estimated_time: 10
meta_image: meta.png
authors:
    - sophia-parafina
    - laura-santamaria
tags:
    - learn
    - fundamentals
    - aws
links:
    - text: Some Website
      url: http://something.com
block_external_search_index: true
---

Now that we've created our first resources in AWS, we need to set up some
additional resources. We're working with a remote cloud, now, and that means
there's a bit more to do to wire everything. We're going to run our app in
containers as services in Fargate. Let's get started.

## Create a Cluster and VPC

We'll first create an [ECS
cluster](https://docs.aws.amazon.com/AmazonECS/latest/userguide/clusters.html),
which is a logical grouping of services. Next, we'll use the the default
[Virtual Private Cloud
(VPC)](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html),
which is the networking layer for ECS that lets containers communicate with each
other and to the internet. Our infrastructure will need a
[SecurityGroup](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
to limit inbound and outbound traffic from and to the internet, too. Note that
the SecurityGroup only allows inbound traffic on port 80, so we'll have to
configure the deployment to route traffic to the port used by the frontend
client.

Add the following code to {{% langfile %}} right after your `registry_info`
declaration:

{{< chooser language "python" / >}}

{{% choosable language python %}}

```python
# Create an ECS cluster to run a container-based service.
cluster = aws.ecs.Cluster('cluster')

# Read back the default VPC and public subnets, which we will use.
default_vpc = aws.ec2.get_vpc(default=True)
default_vpc_subnets = aws.ec2.get_subnet_ids(vpc_id=default_vpc.id)

# Create a SecurityGroup that permits HTTP ingress and unrestricted egress.
group = aws.ec2.SecurityGroup('web-secgrp',
	vpc_id=default_vpc.id,
	description='Enable HTTP access',
	ingress=[aws.ec2.SecurityGroupIngressArgs(
		protocol='tcp',
		from_port=80,
		to_port=80,
		cidr_blocks=['0.0.0.0/0'],
	)],
  	egress=[aws.ec2.SecurityGroupEgressArgs(
		protocol='-1',
		from_port=0,
		to_port=0,
		cidr_blocks=['0.0.0.0/0'],
	)],
)
```

{{% /choosable %}}

## Create an Application Load Balancer

Our application uses an application load balancer to distribute incoming
requests across multiple EC2 instances.

{{% notes type="info" %}}
`aws.alb.LoadBalancer` is known as `aws.lb.LoadBalancer`. The functionality is
identical.
{{% /notes %}}

The load balancer requires a
[Listener](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html),
which is a process that checks for connection requests with the speciied port
and protocol. The listener sends the request to a
[TargetGroup](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html)
based on rules or actions that you define.

A target group sends request to registered target. The [target
type](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html#target-type) is set to `ip`, which sends the request to the default VPC
networking layer.

{{< chooser language "python" / >}}

{{% choosable language python %}}

```python
# Create a load balancer to listen for HTTP traffic on port 80.
alb = aws.lb.LoadBalancer('app-lb',
	security_groups=[group.id],
	subnets=default_vpc_subnets.ids,
)

wl = aws.lb.Listener('web',
	load_balancer_arn=alb.arn,
	port=80,
	default_actions=[aws.lb.ListenerDefaultActionArgs(
		type='forward',
		target_group_arn=atg.arn,
	)],
)

atg = aws.lb.TargetGroup('app-tg',
	port=80,
	protocol='HTTP',
	target_type='ip',
	vpc_id=default_vpc.id,
)
```
{{% /choosable %}}

## Putting it all together

Here's what your whole program should match at this point:

{{< chooser language "python" / >}}

{{% choosable language python %}}

```python
import os
import pulumi
import pulumi_docker as docker
import pulumi_aws as aws
​
stack = pulumi.get_stack()
config = pulumi.Config()
repo = aws.ecr.Repository('my_repo')

frontend_port = config.require_int("frontend_port")
backend_port = config.require_int("backend_port")
mongo_port = config.require_int("mongo_port")
mongo_host = config.require("mongo_host")
database = config.require("database")
node_environment = config.require("node_environment")
​
# Get registry info (creds and endpoint).
def getRegistryInfo(rid):
    creds = aws.ecr.get_credentials(registry_id=rid)
    decoded = base64.b64decode(creds.authorization_token).decode()
    parts = decoded.split(':')
    if len(parts) != 2:
        raise Exception("Invalid credentials")
    return docker.ImageRegistry(creds.proxy_endpoint, parts[0], parts[1])
​
image_name = repo.repository_url
registry_info = repo.registry_id.apply(getRegistryInfo)

# build our backend image!
backend_image_name = "backend"
backend = docker.Image("backend",
                       build=docker.DockerBuild(context=f"{os.getcwd()}/app/backend"),
                       image_name=f"{backend_image_name}:{stack}",
                       skip_push=False,
                       registry=registry_info
                       )
)

# build our frontend image!
frontend_image_name = "frontend"
frontend = docker.Image("frontend",
                        build=docker.DockerBuild(context=f"{os.getcwd()}/app/frontend"),
                        image_name=f"{frontend_image_name}:{stack}",
                        skip_push=False,
                        registry=registry_info
                        )

# build our mongodb image!
mongo_image = docker.RemoteImage("mongo",",
                        name="mongo:bionic"))

# Create an ECS cluster to run a container-based service.
cluster = aws.ecs.Cluster('cluster')

# Read back the default VPC and public subnets, which we will use.
default_vpc = aws.ec2.get_vpc(default=True)
default_vpc_subnets = aws.ec2.get_subnet_ids(vpc_id=default_vpc.id)

# Create a SecurityGroup that permits HTTP ingress and unrestricted egress.
group = aws.ec2.SecurityGroup('web-secgrp',
	vpc_id=default_vpc.id,
	description='Enable HTTP access',
	ingress=[aws.ec2.SecurityGroupIngressArgs(
		protocol='tcp',
		from_port=80,
		to_port=80,
		cidr_blocks=['0.0.0.0/0'],
	)],
  	egress=[aws.ec2.SecurityGroupEgressArgs(
		protocol='-1',
		from_port=0,
		to_port=0,
		cidr_blocks=['0.0.0.0/0'],
	)],
)

# Create a load balancer to listen for HTTP traffic on port 80.
alb = aws.lb.LoadBalancer('app-lb',
	security_groups=[group.id],
	subnets=default_vpc_subnets.ids,
)

atg = aws.lb.TargetGroup('app-tg',
	port=80,
	protocol='HTTP',
	target_type='ip',
	vpc_id=default_vpc.id,
)

wl = aws.lb.Listener('web',
	load_balancer_arn=alb.arn,
	port=80,
	default_actions=[aws.lb.ListenerDefaultActionArgs(
		type='forward',
		target_group_arn=atg.arn,
	)],
)

#####################
# IMPORTANT: Everything below this line will get changed to work with Fargate.
# Don't worry too much if it's slightly different.
#####################

network = docker.Network("network", name=f"services-{stack}")
​
mongo_container = docker.Container("mongo_container",
                                   image=mongo_image.latest,
                                   name=f"mongo-{stack}",
                                   ports=[docker.ContainerPortArgs(
                                       internal=mongo_port,
                                       external=mongo_port
                                   )],
                                   networks_advanced=[docker.ContainerNetworksAdvancedArgs(
                                       name=network.name,
                                       aliases=["mongo"]
                                   )]
                                   )
​
backend_container = docker.Container("backend_container",
                                     image=backend.base_image_name,
                                     name=f"backend-{stack}",
                                     ports=[docker.ContainerPortArgs(
                                         internal=backend_port,
                                         external=backend_port
                                     )],
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
​
data_seed_container = docker.Container("data_seed_container",
                                       image=mongo_image.latest,
                                       name="data_seed",
                                       must_run=False,
                                       rm=True,
                                       opts=pulumi.ResourceOptions(depends_on=[backend_container]),
                                       mounts=[docker.ContainerMountArgs(
                                           target="/home/products.json",
                                           type="bind",
                                           source=f"{os.getcwd()}/products.json"
                                       )],
                                       command=[
                                           "sh", "-c",
                                           "mongoimport --host mongo --db cart --collection products --type json --file /home/products.json --jsonArray"
                                       ],
                                       networks_advanced=[docker.ContainerNetworksAdvancedArgs(
                                           name=network.name
                                       )]
                                       )
​
frontend_container = docker.Container("frontend_container",
                                      image=frontend.base_image_name,
                                      name=f"frontend-{stack}",
                                      ports=[docker.ContainerPortArgs(
                                          internal=frontend_port,
                                          external=frontend_port
                                      )],
                                      envs=[
                                          f"LISTEN_PORT={frontend_port}",
                                          f"HTTP_PROXY=backend-{stack}:{backend_port}"
                                      ],
                                      networks_advanced=[docker.ContainerNetworksAdvancedArgs(
                                          name=network.name
                                      )]
                                      )
```

{{% /choosable %}}

Next up, we're going to make some changes to our code and add some more
information for Pulumi to use to configure Fargate. Let's go!
