---
title: "Cloud Systems Part Two: Docker and Amazon ECS"

date: 2021-12-20T12:26:10-08:00

draft: false

meta_desc: In this series, learn modern cloud engineering practices and tooling, continuing with containerizing a personal website and deploying it to Amazon ECS!

meta_image: meta.png

authors:
    - kat-cosgrove

tags:
    - cloud-systems
    - tutorials
    - docker

---

Cloud engineering is taking over software development. In a lot of ways, this is great; it allows us to build and deploy more complicated applications with less difficulty, and maintaining those applications becomes less troublesome too. We can release smaller updates more quickly than ever, ensuring that we can stay on top of feature requests and security issues. That said, the rise of cloud engineering has also introduced a lot of complexity in the form of dozens of services even within just one cloud provider. Figuring out where to start can be tough, so let’s take a practical tour! In this series, I’ll walk you through building a personal website and deploying it using modern cloud engineering practices.

<!--more-->

## Part Two: Containers and AWS Elastic Container Service

In part one of this series, we built a personal website and deployed it to AWS S3. That works perfectly well for a static, single-page application with minimal interactivity, but if you want server-side routing or database interactivity, things have to get a little bit more complicated. In part two of this series, we’ll be adding a couple more pages to our personal website, adding server-side routing, containerizing it, and deploying it to AWS Elastic Container Service.

So, what’s a container and why would you want to use one? You can think of a container here the exact same way you think of containers on a shipping barge. On that barge is a bunch of shipping containers, and inside each shipping container is a bunch of packages. The barge itself is your computer (or your cloud environment), and the shipping containers house your applications. It may also help to think of them as smaller, more lightweight incarnations of virtual machines. While a virtual machine virtualizers the machine’s physical hardware through the use of a hypervisor, a container virtualizes only the operating system.

Deploying your application using containers allows you to package your application code alongside everything required to run it, including its dependencies and an operating system. You know how sometimes you hand code off to someone else, but it doesn’t run for them, so you go “Well, it works on *my* machine,” and just shrug? Using a container is pretty similar to just deploying your machine. The most popular container engine today is Docker, so that’s what we’ll be using today.

## Prerequisites:

- An AWS account

- [Pulumi account](https://app.pulumi.com)

- [Pulumi installed and configured for AWS](https://www.pulumi.com/docs/get-started/aws/begin/)

- Docker

- Python3

Before we go into containerizing and deploying our website, let’s make it a little bit more useful. For this, we’re going to be using Flask, a lightweight web framework for Python. Fork and clone [this GitHub repository](https://github.com/katcosgrove/cloud-systems-101) to get the full sample code for part two of this series.

Our file structure gets more complicated now that we are building a more dynamic website with server-side routing and throwing it into a Docker container. You will have something like this:

```
container-tutorial
├── Pulumi.yaml
├── requirements.txt
├── __main__.py
└── website
    ├── Dockerfile
    ├── requirements.txt
    └── app
        ├── server.py
        ├── static
        │   ├── normalize.css
        │   ├── style.css
        │   └── background.jpg
        └── templates
            ├── base.html
            ├── index.html
            ├── portfolio.html
            └── about.html
```

Everything contained within the `app` directory is the website itself. We now have server-side routing, and a few different pages. To run it locally and see what the new website looks like, `pip3 install flask` to install the Flask web framework and then run `python3 server.py` from the `app` directory. Flask will return an IP address where your website is running; navigate there in your browser and click around a bit!

## Dockerizing our Website

In the `website` directory, we have something called a Dockerfile. Dockerfiles tell the Docker engine what to do with your application, how your container should behave with respect to the wider internet or other containers, and what needs to be done inside of the container for your application to run. Ours looks like this:

```bash
FROM ubuntu:20.04

COPY app /app

WORKDIR /app

EXPOSE 80

RUN apt-get update && \
    apt install -y gcc python3-dev python3-pip python-markupsafe

COPY requirements.txt /app

RUN pip3 install -r requirements.txt

ENTRYPOINT [ "python3" ]

CMD [ "server.py" ]
```

This Dockerfile says that our container should be running ubuntu:20.04 as its operating system. It will pull the Ubuntu image from Docker Hub, their public image registry, though you can pull from another registry here as well. The `COPY` directive moves our website’s files (the `app` directory) into the container. We then set our working directory for all future commands run inside of the container to `/app` to reduce the amount of typing we have to do later on, update Ubuntu, and install some dependencies using both apt and from the requirements.txt file we also copy over. Lastly, an entrypoint and command to actually start our application are defined. There is a slightly less verbose way to start the application, but this way of defining an `ENTRYPOINT` and `CMD` is fairly common, so it’s worth seeing here.

To see this run locally, we first need to build and tag the image. From the same directory as your Dockerfile, run the following command:

`docker build --tag container-tutorial:latest .`

Note the trailing dot, which is the part of the command that indicates the location of the Dockerfile we want to build.

Now the container is built, we need to run it and forward the container’s port to a local port so we can see our site.

`docker run  -d -p 80:80 container-tutorial`

Go to `localhost` in your browser, and there’s the website! Neat. Let’s deploy this thing, though.

## Configuring Amazon ECS

Amazon’s ECS (Elastic Container Service) is a tool used for container orchestration. It allows you to deploy containerized applications into a cluster, defined as tasks. We’re going to use Pulumi to define all of the necessary rules and settings to do this in a secure manner, then create our infrastructure and deploy the containerized website. Let’s break down the code required to do that, found in `__main__.py`.

```python
import json
import base64
import pulumi
import pulumi_aws as aws
import pulumi_docker as docker
```

First, we have our imports. We’re working with both AWS and Docker, so we need both of those Pulumi providers.

```python
app_cluster = aws.ecs.Cluster("app-cluster")

app_vpc = aws.ec2.Vpc("app-vpc",
    cidr_block="172.31.0.0/16",
    enable_dns_hostnames=True)

app_vpc_subnet = aws.ec2.Subnet("app-vpc-subnet",
    cidr_block="172.31.32.0/20",
    vpc_id=app_vpc.id)
```

In this codeblock, we're first creating our ECS cluster and naming it `app-cluster`. Then create a VPC (Virtual Private Cloud), and a subnet for it.

```python
app_gateway = aws.ec2.InternetGateway("app-gateway",
    vpc_id=app_vpc.id)

app_routetable = aws.ec2.RouteTable("app-routetable",
    routes=[
        aws.ec2.RouteTableRouteArgs(
            cidr_block="0.0.0.0/0",
            gateway_id=app_gateway.id,
        )
    ],
    vpc_id=app_vpc.id)

app_routetable_association = aws.ec2.MainRouteTableAssociation("app_routetable_association",
    route_table_id=app_routetable.id,
    vpc_id=app_vpc.id)
```

Next, we need a gateway and a route table to associate with the VPC so that it can communicate with the internet.

```python
app_security_group = aws.ec2.SecurityGroup("security-group",
    vpc_id=app_vpc.id,
    description="Enables HTTP access",
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
    )])
```

Just about everything you do in AWS requires a security group. This one enables HTTP access by allowing ingress to and from port 80 only, and egress anywhere.

```python
# Creating an IAM role used by Fargate to execute all our services
app_exec_role = aws.iam.Role("app-exec-role",
    assume_role_policy="""{
        "Version": "2012-10-17",
        "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
                "Service": "ecs-tasks.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }]
    }""")

# Attaching execution permissions to the exec role
exec_policy_attachment = aws.iam.RolePolicyAttachment("app-exec-policy", role=app_exec_role.name,
    policy_arn="arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy")

# Creating an IAM role used by Fargate to manage tasks
app_task_role = aws.iam.Role("app-task-role",
    assume_role_policy="""{
        "Version": "2012-10-17",
        "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
                "Service": "ecs-tasks.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }]
    }""")

# Attaching execution permissions to the task role
task_policy_attachment = aws.iam.RolePolicyAttachment("app-access-policy", role=app_task_role.name,
    policy_arn=aws.iam.ManagedPolicy.AMAZON_ECS_FULL_ACCESS)
```

Services also require IAM roles. In this case, we need to allow AWS Fargate (the serverless compute engine that will actually be responsible for running things) to execute our services and manage our tasks, so we create new roles for both and apply execution permissions to both.

```python
# Creating storage space to upload a docker image of our app to
app_ecr_repo = aws.ecr.Repository("app-ecr-repo",
    image_tag_mutability="MUTABLE")

# Attaching an application life cycle policy to the storage
app_lifecycle_policy = aws.ecr.LifecyclePolicy("app-lifecycle-policy",
    repository=app_ecr_repo.name,
    policy="""{
        "rules": [
            {
                "rulePriority": 10,
                "description": "Remove untagged images",
                "selection": {
                    "tagStatus": "untagged",
                    "countType": "imageCountMoreThan",
                    "countNumber": 1
                },
                "action": {
                    "type": "expire"
                }
            }
        ]
    }""")
```

The last thing we need to do for our infrastructure before we can start deploying to it is create a repository on Amazon ECR (Elastic Container Registry) where our Docker image will live, then attach an application lifecycle policy to that repository. This makes sure that we expire and remove any untagged images in the repository.

## Deploying a Dockerized Flask Application to ECS

We're now ready to deploy our website and wire all of this up!

```python
flask_targetgroup = aws.lb.TargetGroup("flask-targetgroup",
    port=80,
    protocol="TCP",
    target_type="ip",
    vpc_id=app_vpc.id)

flask_balancer = aws.lb.LoadBalancer("flask-balancer",
    load_balancer_type="network",
    internal=False,
    security_groups=[],
    subnets=[app_vpc_subnet.id])

flask_listener = aws.lb.Listener("flask-listener",
    load_balancer_arn=flask_balancer.arn,
    port=80,
    protocol="TCP",
    default_actions=[aws.lb.ListenerDefaultActionArgs(
        type="forward",
        target_group_arn=flask_targetgroup.arn
    )])
```

First, we need to make it possible for our Flask application to communicate with the internet. That requires three pieces of configuration: a target group for port 80, a load balancer to spread out incoming requests and make sure our website doesn't get overwhelmed as easily, and a listener to forward public traffic to the defined target group.

```python
def get_registry_info(rid):
    creds = aws.ecr.get_credentials(registry_id=rid)
    decoded = base64.b64decode(creds.authorization_token).decode()
    parts = decoded.split(':')
    if len(parts) != 2:
        raise Exception("Invalid credentials")
    return docker.ImageRegistry(creds.proxy_endpoint, parts[0], parts[1])

app_registry = app_ecr_repo.registry_id.apply(get_registry_info)

flask_image = docker.Image("flask-dockerimage",
    image_name=app_ecr_repo.repository_url,
    build="./website",
    skip_push=False,
    registry=app_registry
)
```

A small helper function is required here. It's grabbing some of our AWS credentials, specificaly an authorization token, so that we can talk to the registry. Next, we build the Docker image for our website and push it to the repository we created in Amazon ECR earlier. The Dockerfile is in `./website`.

```python
flask_task_definition = aws.ecs.TaskDefinition("flask-task-definition",
    family="frontend-task-definition-family",
    cpu="256",
    memory="512",
    network_mode="awsvpc",
    requires_compatibilities=["FARGATE"],
    execution_role_arn=app_exec_role.arn,
    task_role_arn=app_task_role.arn,
    container_definitions=pulumi.Output.all(flask_image.image_name).apply(lambda args: json.dumps([{
        "name": "flask-container",
        "image": args[0],
        "memory": 512,
        "essential": True,
        "portMappings": [{
            "containerPort": 80,
            "hostPort": 80,
            "protocol": "tcp"
        }],
    }])))
```

We need a task definition for the Flask instance. AWS Fargate will be managing this for us, using the roles we defined earlier. We're also handing it a container definition, including the image name and a little bit of information about it, like the container and host ports.

```python
flask_service = aws.ecs.Service("flask-service",
    cluster=app_cluster.arn,
    desired_count=1,
    launch_type="FARGATE",
    task_definition=flask_task_definition.arn,
    wait_for_steady_state=False,
    network_configuration=aws.ecs.ServiceNetworkConfigurationArgs(
        assign_public_ip=True,
        subnets=[app_vpc_subnet.id],
        security_groups=[app_security_group.id]
    ),
    load_balancers=[aws.ecs.ServiceLoadBalancerArgs(
        target_group_arn=flask_targetgroup.arn,
        container_name="flask-container",
        container_port=80,
    )],
    opts=pulumi.ResourceOptions(depends_on=[flask_listener]),
)
```

Finally, we actually launch our website. We need to create a new service definition and hand it all of the resources we created earlier, beginning with the ECS cluster itself. It has the task definition, our network configurations, and our load balancers, and we make sure that this particular piece of code isn't executed until the listener we created to watch for traffic is online.

As a shortcut to finding our website, export the DNS name of our load balancer as an output from Pulumi:

```python
pulumi.export("app-url", flask_balancer.dns_name)
```

We're ready to go! Set your AWS region:

```bash
pulumi config aws:region us-west-2
```

Then run `pulumi up` to watch it go!

We now have a functional, multi-page website with server-side routing, packaged up into a Docker container and deployed to a fully-configured AWS ECS cluster in just a couple hundred lines of Python, all without leaving the same repository our website is stored in. What if we want to be able to scale really large, though? Some resiliency would be nice. Stay tuned for the next blog for an introduction to Kubernetes, where we'll learn to deploy our website to Amazon's Elastic Kubermetes Service!