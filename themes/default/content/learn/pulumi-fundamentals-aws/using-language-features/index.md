---
title: "Using Language Features"
layout: topic
date: 2021-09-30T10:19:24-05:00
draft: false

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

authors:
    - laura-santamaria
tags:
    - learn
    - aws
    - fundamentals
links:
    - text: Some Website
      url: http://something.com
block_external_search_index: true
---

One of the biggest advantages of using Pulumi for Cloud Engineering is using the
language features of your favorite programming languages. For example, we can
break the Pulumi program you currently have in {{% langfile %}} into other files
and call them from the main file. We will be exploring more features like
testing in some later tutorials on other pathways, so we are going to prepare
our code here.

## Project architecture

Right now, your project only has a single file written in your programming
language. Most modern programming projects have many files that define various
components and then import or otherwise call those components in an
interconnected system. Since you're using a programming language, Pulumi can 
also handle that architecture. Let's pull out the AWS calls to their own file so
you can reuse the main code with other providers.

First, let's create a new file to hold the cloud provider code:

{{< chooser language "python" / >}}

{{% choosable language python %}}

```bash
touch infra.py
```

{{% /choosable %}}

Next, let's move the following code from your {{% langfile %}} to the new file
(remember we're using `...` to indicate other code in the file):


{{< chooser language "python" / >}}

{{% choosable language python %}}

```python
# ...
import pulumi_aws as aws

#...​
repo = aws.ecr.Repository('my_repo')

#...
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

# ...

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

# ...
```

{{% /choosable %}}


---

Congratulations! You've finished the Pulumi Fundamentals on AWS pathway! From
here, you'll want to try out [Pulumi in
Practice]({{< relref "/learn/pulumi-in-practice" >}}) to keep learning more
about using Pulumi.
