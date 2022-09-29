---
title: "Cloud Systems 101: Part Four"

date: 2022-09-23T15:29:57-05:00

meta_desc: In this series, learn modern cloud engineering practices and tooling, continuing with deploying a containerized website to Amazon's Elastic Kubernetes Service!

meta_image: meta.png

authors:
    - kat-cosgrove

tags:
    - cloud-systems
    - tutorials
    - kubernetes

---

Cloud engineering is taking over software development. In a lot of ways, this is great; it allows us to build and deploy more complicated applications with less difficulty, and maintaining those applications becomes less troublesome, too. We can release smaller updates more quickly than ever, ensuring that we can stay on top of feature requests and security issues. That said, the rise of cloud engineering has also introduced a lot of complexity in the form of dozens of services even within just one cloud provider. Figuring out where to start can be tough, so let’s take a practical tour! In this series, I’ll walk you through building a personal website and deploying it using modern cloud engineering practices.

<!--more-->

## Elastic Kubernetes Service

In the previous tutorial, we extended our personal website to use the Flask web framework, added server-side routing, and packaged everything up into a Docker container. We then used Pulumi to deploy it to AWS Elastic Container Service (ECS). What if we want to go bigger, though? Maybe we're expecting a ton of traffic to the site. Let's make it a little more resilient by upgrading from Elastic Container Service to Kubernetes.

If you aren't familiar with Kubernetes, it's a container orchestration tool. Tools like this are responsible for the management, deployment, and scaling of containerized applications. It's possible to do all of that by hand, of course, but it's slow, difficult, and unreliable. If you're just now joining me, you can get the completed code by forking and cloning [this repository](https://github.com/katcosgrove/cloud-systems-101).

## Prerequisites:

- An AWS Account

- [Pulumi account](https://app.pulumi.com)
- [Pulumi CLI]({{< relref "/docs/get-started/install" >}})

- [Pulumi installed and configured for AWS]({{< relref "/docs/get-started/aws/begin" >}})

- [Docker](https://www.docker.com/products/docker-desktop)

- Python3

## Crosswalk, EKS, and Pulumi

We'll be re-using some things we did in the previous tutorials, but we do need some new dependencies. [Pulumi Crosswalk]({{< relref "/docs/guides/crosswalk/aws" >}}) is a collection of libraries for interacting with AWS while adhering to common best practices, without having to do most of the work yourself. It's great for getting off the ground with some of the most common first-step tasks when deploying infrastructure on AWS, so we'll be using it. We also need providers for AWS Elastic Kubernetes Service (EKS) and Kubernetes. The top of your `__main__.py` should include the following imports:

```python
import base64
import pulumi
import pulumi_awsx as awsx
import pulumi_eks as eks
import pulumi_kubernetes as k8s
```

Make sure you install all of the new things, and then add them to your `requirements.txt` file at some point:

```bash
pip3 install pulumi_awsx pulumi_eks pulumi_kubernetes
```

Now we're ready to build some things. First, we want to create an EKS cluster and an ECR repository. We created and used an ECR repository in part three of this series, but it took quite a bit of code. Since we're using Crosswalk to handle a lot of those default settings for us this time, we don't have to do as much work:

```python
cluster = eks.Cluster('my-cluster');

repo = awsx.ecr.Repository("my-repo");

image = awsx.ecr.Image("image",
                       repository_url=repo.url,
                       path="./website")

pulumi.export('kubeconfig', cluster.kubeconfig)
```

First, we're using the EKS package to create an EKS cluster with default settings. This one can be a little slow for AWS to spin up, but if you don't see an error, don't worry.

Second, we're using Crosswalk (AWSX) to create an Elastic Container Registry (ECR) repository with default settings, then deploying an image to it. Ensure that you are still pointing at the `./website` directory containing the Dockerfile we created for your website in the last tutorial, then run `pulumi up`, and you'll find a lot of resources come online:

```bash
     Type
         Name                                          Plan
     pulumi:pulumi:Stack                    part-four-dev                                 running...
     pulumi:pulumi:Stack                    part-four-dev                                 running
 +   │  ├─ aws:ecr:Repository               my-repo                                       create
 +   │  └─ aws:ecr:LifecyclePolicy          my-repo                                       create
     ├─ eks:index:Cluster
          my-cluster
 +   │  ├─ eks:index:ServiceRole            my-cluster-instanceRole                       create
 +   │  │  ├─ aws:iam:Role                  my-cluster-instanceRole-role                  create
 +   │  │  ├─ aws:iam:RolePolicyAttachment  my-cluster-instanceRole-3eb088f2              create
 +   │  │  ├─ aws:iam:RolePolicyAttachment  my-cluster-instanceRole-e1b295bd              create
 +   │  │  └─ aws:iam:RolePolicyAttachment  my-cluster-instanceRole-03516f97              create
 +   │  ├─ eks:index:ServiceRole            my-cluster-eksRole                            create
 +   │  │  ├─ aws:iam:Role                  my-cluster-eksRole-role                       create
 +   │  │  └─ aws:iam:RolePolicyAttachment  my-cluster-eksRole-4b490823                   create
 +   │  ├─ eks:index:RandomSuffix           my-cluster-cfnStackName                       create
 +   │  ├─ aws:iam:InstanceProfile          my-cluster-instanceProfile                    create
 +   │  ├─ aws:ec2:SecurityGroupRule        my-cluster-eksClusterInternetEgressRule       create
 +   │  ├─ aws:eks:Cluster                  my-cluster-eksCluster                         create
 +   │  ├─ eks:index:VpcCni                 my-cluster-vpc-cni                            create
 +   │  ├─ aws:ec2:SecurityGroup            my-cluster-nodeSecurityGroup                  create
 +   │  ├─ pulumi:providers:kubernetes      my-cluster-eks-k8s                            create
 +   │  ├─ aws:ec2:SecurityGroupRule        my-cluster-eksExtApiServerClusterIngressRule  create
 +   │  ├─ aws:ec2:SecurityGroupRule        my-cluster-eksNodeIngressRule                 create
 +   │  ├─ aws:ec2:SecurityGroupRule        my-cluster-eksNodeClusterIngressRule          create
 +   │  ├─ aws:ec2:SecurityGroupRule        my-cluster-eksNodeInternetEgressRule          create
 +   │  ├─ aws:ec2:SecurityGroupRule        my-cluster-eksClusterIngressRule              create
 +   │  ├─ kubernetes:core/v1:ConfigMap     my-cluster-nodeAccess                         create
 +   │  ├─ aws:ec2:LaunchConfiguration      my-cluster-nodeLaunchConfiguration            create
 +   │  ├─ aws:cloudformation:Stack         my-cluster-nodes                              create
 +   │  └─ pulumi:providers:kubernetes      my-cluster-provider                           create
 +   └─ awsx:ecr:Image                      image                                         create

Outputs:
  + kubeconfig: output<string>

Resources:
    + 27 to create
    4 unchanged
```

You'll also get your `kubeconfig` as the output of your Pulumi program. You don't need to do anything with this now, but it confirms your cluster exists and you will need it if you want to use `kubectl` to interact with the cluster from your terminal later on.

Pulumi Crosswalk is doing quite a bit of work for you here. Last time, we had to manually configure roles, policies, and security groups, but here we don't have to worry about it.

This is just an empty cluster, though. Nothing is using the image we pushed to our ECR repository. Let's change that and get our website online! Add the following to `__main__.py`:

```python
app_name = 'my-website'
app_labels = { 'app': app_name }
deployment = k8s.apps.v1.Deployment(f'{app_name}-dep',
    spec = k8s.apps.v1.DeploymentSpecArgs(
        selector = k8s.meta.v1.LabelSelectorArgs(match_labels = app_labels),
        replicas = 2,
        template = k8s.core.v1.PodTemplateSpecArgs(
            metadata = k8s.meta.v1.ObjectMetaArgs(labels = app_labels),
            spec = k8s.core.v1.PodSpecArgs(containers = [
                k8s.core.v1.ContainerArgs(
                    name = app_name,
                    image = image.image_uri
                )
            ]),
        ),
    )
)
service = k8s.core.v1.Service(f'{app_name}-svc',
    spec = k8s.core.v1.ServiceSpecArgs(
        type = 'LoadBalancer',
        selector = app_labels,
        ports = [ k8s.core.v1.ServicePortArgs(port = 80) ],
    )
)
```

Quite a lot is happening here. For an application to exist on Kubernetes, we need two things: a deployment and a service. In our `deployment` variable, we're telling Kubernetes how to behave with respect to the number of replicas of our website that should exist and the image that should be running in each. If you ever think your website is going to take on considerably more traffic and want to scale up, that `replicas` value is what you want to increase. We also need to give it some metadata, like a name. In our `service` variable, we're telling Kubernetes how to behave with respect to the outside world---services manage network access. Here, we're saying that we want our service to be a load balancer, managing access to our application on port 80.

One more thing has to be added here. We need the address of that load balancer so we can see our website! Add this last line to your `__main__.py` and Pulumi will return the address of your service:

```python
pulumi.export('ingress_ip', service.status.load_balancer.ingress[0].ip)
```

Now run `pulumi up` in your terminal, and things will begin to deploy. You'll see quite a bit changing between the Pulumi Preview stage and the actual deployment, including the building of your containerized application and it being pushed to ECR.

```bash
     Type                           Name           Plan        Info
     pulumi:pulumi:Stack            part-four-dev  running..   dockerBuild: {"context":"./website"}
 ~   ├─ kubernetes:core/v1:Service  my-app-svc     update
     └─ awsx:ecr:Image              image                      Building image './website'...
```

Once it's done, you'll have a wildly over-engineered personal website deployed with Kubernetes on AWS, in just 45 lines of Python. Incredible, huh?
