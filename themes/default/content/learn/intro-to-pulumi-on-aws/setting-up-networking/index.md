---
title: "Setting Up Networking"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-07-28T10:35:11-07:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: true

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Here is a brief description of what this topic will cover.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Here is a brief description of what this topic will cover.

# The order in which the topic appears in the module.
index: 2

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

Now we'll set up the resources required to run containers as services in Fargate.

## Create a Cluster and VPC

We'll first create an [ECS cluster](https://docs.aws.amazon.com/AmazonECS/latest/userguide/clusters.html) which is a logical grouping of services. Next we'll use the the default [Virtual Private Cloud (VPC)](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) which is the networking layer for ECS that lets containers communicate with each other and to the Internet. Our infrastructure will need a [SecurityGroup](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html) to limit inbound and outbound traffic from and to Internet. Note that the Security group only allows inbound traffic on port 80, we'll have to configure the deployment to route traffic to the port used by the frontend client.

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

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

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

## Create an Application Load Balancer

Our application uses an application load balancer to distribute incoming requests across multiple EC2 instances.

{{% notes %}}
Note: `aws.alb.LoadBalancer` is known as `aws.lb.LoadBalancer`. The functionality is identical.
{{% /notes %}}

The load balancer requires a [Listener](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html) which is a process that checks for connection requests with the speciied port and protocol. The listener sends the request to a [TargetGroup](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html) based on rules or actions that you define.

A target group sends request to registered target. The [target type](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html#target-type) is set to `ip` which sends the request to the default VPC networking layer.

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

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

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}

## Putting it all together

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
import pulumi_aws as aws
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
```

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}
