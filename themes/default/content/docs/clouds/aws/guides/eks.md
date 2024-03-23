---
title_tag: "Using AWS Elastic Kubernetes Service (EKS) | Crosswalk"
title: EKS
h1: AWS Elastic Kubernetes Service (EKS)
meta_desc: Pulumi Crosswalk for AWS simplifies the creation, configuration, and management of EKS clusters
           offering a single programming model and deployment workflow.
meta_image: /images/docs/meta-images/docs-clouds-aws-meta-image.png
menu:
  clouds:
    parent: aws-guides
    identifier: aws-guides-eks
    weight: 6

aliases:
 - /docs/reference/crosswalk/aws/eks/
 - /eks/
 - /docs/guides/crosswalk/aws/eks/
---

{{< crosswalk-header >}}

[Amazon Elastic Kubernetes Service (Amazon EKS)](https://aws.amazon.com/eks) makes deploying, managing, and scaling containerized applications easy using Kubernetes on AWS. Amazon EKS runs the Kubernetes management infrastructure for you across multiple availability zones to eliminate a single point of failure. Amazon EKS is a certified Kubernetes conformant, meaning you can use existing tooling and plugins from partners and the Kubernetes community. Applications running on any standard Kubernetes environment are fully compatible, and you can migrate them to Amazon EKS.

## Overview

Pulumi Crosswalk for AWS simplifies the creation, configuration, and management of EKS clusters, offering a single programming model and deployment workflow that works for your Kubernetes application configuration and infrastructure. EKS resources are fully integrated with related AWS services, including:

* [ECR](/docs/clouds/aws/guides/ecr/) for private container images
* [ELB](/docs/clouds/aws/guides/elb/) for load balancing
* [IAM](/docs/clouds/aws/guides/iam/) for security
* [VPC](/docs/clouds/aws/guides/vpc/) for network isolation
* [CloudWatch](/docs/clouds/aws/guides/cloudwatch/) for monitoring

Amazon EKS runs up-to-date versions of the open-source Kubernetes software, so you can use all the existing plugins and tooling from the Kubernetes community, including Pulumi support for deploying Helm charts. Applications running on Amazon EKS are fully compatible with applications running on any standard Kubernetes environment, whether running in on-premises data centers or public clouds, easing porting from other Kubernetes environments to EKS.

Expressing your infrastructure and Kubernetes configuration in code using Pulumi Crosswalk for AWS ensures your resulting system is ready for production using built-in best practices.

## Prerequisites

Before getting started, ensure to install:

* The [Pulumi CLI](https://www.pulumi.com/docs/install/)
* [A language runtime for Pulumi](https://www.pulumi.com/docs/clouds/aws/get-started/begin/#install-language-runtime)
* [`aws-iam-authenticator`](https://github.com/kubernetes-sigs/aws-iam-authenticator)  - A tool to use AWS IAM credentials to authenticate to a Kubernetes cluster

Optionally, we recommend installing:

* [`kubectl`](https://kubernetes.io/docs/tasks/tools/install-kubectl/) - the standard Kubernetes CLI.
* [`helm`](https://helm.sh/docs/using_helm/) - if you plan on deploying Helm charts to your cluster.

{{% notes type="info" %}}
Consider jumpstarting your solution by using a Pulumi program template. Run `pulumi new <template>`, replacing `<template>` with one of the following:

* `kubernetes-aws-csharp`
* `kubernetes-aws-go`
* `kubernetes-aws-python`
* `kubernetes-aws-typescript`
* `kubernetes-aws-yaml`
{{% /notes %}}

## Provisioning a new EKS cluster

To create a new EKS cluster, define an instance of an [`eks.Cluster`](/registry/packages/aws/api-docs/eks/cluster/) class in your Pulumi program:

{{< example-program path="awsx-eks-cluster-new" >}}

The cluster uses defaults, meaning Pulumi will:

* Place the cluster into your default VPC with a CNI interface.
* Use AWS IAM Authenticator to leverage IAM for secure access to your cluster.
* Use two `t2.medium` nodes.

To deploy your new cluster, run:

```bash
$ pulumi up --yes
Updating (dev):

     Type                       Name                            Status
 +   pulumi:pulumi:Stack        crosswalk-aws-dev               created
 +   └─ eks:index:Cluster       my-cluster                      created
     ... dozens of resources omitted ...

Outputs:
    kubeconfig: {
        apiVersion     : "v1"
        clusters       : [
            [0]: {
                cluster: {
                    certificate-authority-data: "...",
                    server                    : "https://D34E7144F46CB.sk1.us-west-2.eks.amazonaws.com"
                }
                name   : "kubernetes"
            }
        ]
        contexts       : [
            [0]: {
                context: {
                    cluster: "kubernetes"
                    user   : "aws"
                }
                name   : "aws"
            }
        ]
        current-context: "aws"
        kind           : "Config"
        users          : [
            [0]: {
                name: "aws"
                user: {
                    exec: {
                        apiVersion: "client.authentication.k8s.io/v1alpha1"
                        args      : [
                            [0]: "token"
                            [1]: "-i"
                            [2]: "my-cluster-eksCluster-22c2275"
                        ]
                        command   : "aws-iam-authenticator"
                    }
                }
            }
        ]
    }

Resources:
    + 43 created

Duration: 11m26s
```

Export the `kubeconfig` file to then view the resulting cluster's configuration:

```bash
$ pulumi stack output kubeconfig > kubeconfig.yml
```

Point to the exported `kubeconfig` to obtain the cluster nodes:

```bash
$ KUBECONFIG=./kubeconfig.yml kubectl get nodes
NAME                                         STATUS    ROLES     AGE       VERSION
ip-172-31-29-62.us-west-2.compute.internal   Ready     <none>    1m       v1.12.7
ip-172-31-40-32.us-west-2.compute.internal   Ready     <none>    2m       v1.12.7
```

By default, Pulumi targets clusters based on your local `kubeconfig`, just like `kubectl` does. If you configure the `kubectl` client to talk to your EKS cluster, deployments will target it. You can, however, deploy into _any_ Kubernetes cluster created in your Pulumi program. Each Kubernetes object specification accepts an optional "provider" that can programmatically specify a `kubeconfig` to use.

To create a new [`kubernetes.Provider`](/registry/packages/kubernetes/api-docs/provider/) object, pass one or more of the following properties:

* `cluster`: If present, the name of the kubeconfig cluster to use.
* `context`: If present, the name of the kubeconfig context to use.
* `kubeconfig`: The contents of a kubeconfig file or the path to a kubeconfig file. It can also be sourced from the following environment variable: `KUBECONFIG`

Now, you have a fully functioning EKS cluster in Amazon to deploy Kubernetes applications. Any existing tools such as `kubectl`, helm, and CI/CD solutions can be used with it.

### Adding a canary application to your EKS cluster

Pulumi offers the ability to define Kubernetes application-level objects and configurations in code. For instance, we can deploy a canary to our EKS cluster in the same Pulumi program to test that it works as part of `pulumi up`:

{{< example-program path="awsx-eks-cluster-canary" >}}

If we deploy the above as changes to the existing stack (as opposed to a new stack), you will see the diff to be the creation of a Kubernetes deployment and service objects. The load-balanced URL will be updated.

To deploy the changes to the existing stack:

```bash
$ pulumi up --yes
```

Verify the pods are running:

```bash
$ pulumi stack output kubeconfig > kubeconfig.yml
$ KUBECONFIG=./kubeconfig.yml kubectl get pod
NAME                                 READY     STATUS    RESTARTS   AGE
my-app-de-6gfz4ap5-dc8c6584f-6xmcl   1/1       Running   0          3m
my-app-de-6gfz4ap5-dc8c6584f-wzlf9   1/1       Running   0          3m
```

Check the cluster health:

```bash
$ curl http://$(pulumi stack output url)
<html>
<head>
<title>Welcome to nginx!</title>
</head>
<body>
<h1>Welcome to nginx!</h1>
</body>
</html>
```

For more details on how to deploy Kubernetes applications using Pulumi, refer to one of these sections:

* [Deploying Kubernetes Apps to Your EKS Cluster](#deploying-kubernetes-apps-to-your-eks-cluster)
* [Deploying Existing Kubernetes YAML Config to Your EKS Cluster](#deploying-existing-kubernetes-yaml-config-to-your-eks-cluster)
* [Deploying Existing Helm Charts to Your EKS Cluster](#deploying-existing-helm-charts-to-your-eks-cluster)

## Changing the default settings on an EKS cluster

The above example uses default settings for the EKS cluster. You can override the default settings by passing arguments to the constructor.

The below example changes the desired capacity and enables specific cluster logging types:

{{< example-program path="awsx-eks-cluster-change-settings" >}}

## Configuring your EKS cluster's networking

By default, the EKS cluster is deployed in your region's default VPC. Network isolation and specific private subnet requirements are possible by editing the networking settings.

When creating an Amazon EKS cluster, you can specify the Amazon VPC subnets for your cluster. These must be in at least two availability zones. We recommend a network architecture that uses private subnets for the worker nodes and public subnets for Kubernetes. The public subnet allows you to create internet-facing load balancers. When you create your cluster, specify all subnets that will host resources for your cluster (including workers and load balancers). This network architecture is the default behavior for `eks.Cluster` objects.

Create a new VPC with public and private subnets for your EKS cluster:

{{< example-program path="awsx-eks-cluster-network" >}}

In the above example, we passed the private and public subnets from the VPC. The EKS package identifies which IPs are public and private. It then creates the worker nodes inside the private subnets if any are specified. EKS will tag the provided subnets so that Kubernetes can discover them. For additional controls over how load balancers are allocated to subnets, users can attach subnet tags as outlined in [Cluster VPC Considerations](https://docs.aws.amazon.com/eks/latest/userguide/network_reqs.html).

## Configuring your EKS cluster's worker nodes and node groups

Worker machines in Kubernetes are called nodes. Amazon EKS worker nodes run in your AWS account and connect to your cluster's control plane via the cluster API server endpoint. These are standard Amazon EC2 instances, and you are billed for them based on normal EC2 on-demand prices. By default, an AMI using Amazon Linux 2 is the base image for EKS worker nodes and includes Docker, kubelet, and the AWS IAM Authenticator.

Nodes exist in groups, and you can create multiple groups for workloads that require them. By default, your EKS cluster is given a default node group with the instance sizes and counts you specify (or the defaults of two `t2.medium` instances otherwise). The latest available version of Kubernetes is used by default.

If you would like to disable the creation of a default node group and instead rely on creating your own, pass [`skipDefaultNodeGroup`](/registry/packages/eks/api-docs/cluster/#skipdefaultnodegroup_nodejs) as `true` to the `eks.Cluster` constructor. To create additional node groups explicitly, see [creating an `eks.NodeGroupV2`](/registry/packages/eks/api-docs/nodegroupv2/). In both cases, you will likely want to configure IAM roles for your worker nodes, which can be supplied to your EKS cluster using the [`instanceRole`](/registry/packages/eks/api-docs/cluster/#instancerole_nodejs) or [`instanceRoles`](/registry/packages/eks/api-docs/cluster/#instanceroles_nodejs) properties.

For instance, let's say we want to have two node groups: one for a fixed, known workload and another that is burstable and might use more expensive computing but can be scaled down when possible (possibly to zero). We would skip the default node group and create our node groups:

{{< example-program path="awsx-eks-cluster-nodes" >}}

After configuring such a cluster, ensure your workload's pods are scheduled correctly on the right nodes. You may use a combination of node selectors, taints, and tolerances.

For more information,

* Learn about [Assigning Pods to Nodes](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/)  
* Use [Taints and Tolerances](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/).

## Managing EKS cluster authentication with IAM

When you create an Amazon EKS cluster, the IAM entity user or role (for example, for federated users) that creates the cluster is automatically granted `system:masters` permissions in the cluster's RBAC configuration. To grant additional AWS users or roles the ability to interact with your cluster, you must edit the `aws-auth` ConfigMap within Kubernetes.

The [`roleMappings` property](/registry/packages/eks/api-docs/cluster/#rolemappings_nodejs)
for your EKS cluster lets you configure custom IAM roles. For example, you can create different IAM roles for cluster admins, automation accounts (for CI/CD), and production roles. The IAM roles can then be supplied to `roleMappings`, which automatically places them in the `aws-auth` ConfigMap for your cluster. Because Pulumi lets you configure Kubernetes objects, you can define the RBAC cluster role bindings for your cluster in code.

For a complete example, see [Simplifying Kubernetes RBAC in Amazon EKS](/blog/simplify-kubernetes-rbac-in-amazon-eks-with-open-source-pulumi-packages/).

## Deploying Kubernetes apps to your EKS cluster

Pulumi supports the entire Kubernetes object model in the [@pulumi/kubernetes](/registry/packages/kubernetes/api-docs) package. For more information on these object types, including Deployments, Services, and Pods, see [Understanding Kubernetes Objects](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/).

With Pulumi, you describe your desired Kubernetes configuration in code. When you run the `pulumi up` command, Pulumi internally determines the difference between the current and desired state to bring your desired state into existence. To learn more, read about [how Pulumi manages state](https://www.pulumi.com/docs/concepts/state/)

The example below creates a simple load-balanced NGINX service and exports its URL:

{{< example-program path="awsx-eks-cluster-nginx" >}}

To deploy the Kubernetes objects, run:

```bash
$ pulumi up --yes

Updating (dev):

     Type                           Name               Status
     pulumi:pulumi:Stack            crosswalk-aws-dev
 +   ├─ kubernetes:core:Service     my-app-svc         created
 +   └─ kubernetes:apps:Deployment  my-app-dep         created

Outputs:
 + url       : "a2861638e011e98a329401e61c-1335818318.us-west-2.elb.amazonaws.com"

Resources:
    + 2 created

Duration: 22s
```

## Deploying existing Kubernetes YAML config to your EKS cluster

Specifying Kubernetes object configurations in Pulumi lets you take advantage of programming language features, like variables, loops, conditionals, functions, and classes. It is also possible to deploy existing Kubernetes YAML definitions. The two approaches may be used in tandem; this is useful when converting existing projects.

The [`ConfigFile` class](/registry/packages/kubernetes/api-docs/yaml/configfile) can be used to deploy a single YAML file, whereas the [`ConfigGroup` class](/registry/packages/kubernetes/api-docs/yaml/configgroup) can deploy a collection of files, either from a set of files or in-memory representations.

For example, we have a directory, `app/`, containing the YAML for the [Kubernetes Guestbook application](https://kubernetes.io/docs/tutorials/stateless-application/guestbook/) as a `guestbook.yaml` file. Because the app is in a single file, you'll use the `ConfigFile` class.

{{% notes type="warning" %}}
By default, Pulumi targets clusters based on your local `kubeconfig`. If you do not have an EKS cluster, see the [Provisioning a new EKS cluster](#provisioning-a-new-eks-cluster) section above.
{{% /notes %}}

Use Pulumi to reference the existing application configuration:

{{< example-program path="awsx-eks-cluster-guestbook" >}}

Deploy the application into your existing EKS Cluster:

```bash
$ pulumi up --yes
 ```

### Using transformations for your existing Kubernetes YAML config

The `ConfigFile` and `ConfigGroup` classes support the `transformations` [property](/registry/packages/kubernetes#transformations_nodejs) that can [monkey patch](https://en.wikipedia.org/wiki/Monkey_patch) the Kubernetes configuration on the fly. For instance, you may rewrite the configuration to include additional services such as sidecars or inject custom tags.

{{% notes type="warning" %}}
Use transformation with care, as it is possible to create invalid transformations that break your application inadvertently.
{{% /notes %}}

#### EKS transformation example

In the example below, a transformation makes all the services private to a cluster by changing `LoadBalancer` specs into `ClusterIP`. In addition, it places objects in a desired namespace:

{{< example-program path="awsx-eks-cluster-guestbook-transformation" >}}

Deploy the transformation changes:

```bash
$ pulumi up --yes
 ```

## Deploying Existing Helm Charts to Your EKS Cluster

Pulumi can deploy [Helm charts](https://helm.sh/) by name from any Helm repository over the Internet or on-premises. It can also deploy Helm charts via a tarball. Examples for each are found below.

{{% notes type="info" %}}
You will need to [install Helm](https://helm.sh/docs/using_helm/#installing-helm) and, once installed, initialize it with `helm init --client-only`.
{{% /notes %}}

### EKS app via Helm repository example

This program installs the WordPress chart into our EKS cluster using the [release resource type](/registry/packages/kubernetes/api-docs/helm/v3/release/):

{{< example-program path="awsx-eks-cluster-helm-chart" >}}

The `values` array provides the configurable parameters for the chart. If we omit the `version` field, Pulumi will fetch the latest available chart from the repository; this may trigger an upgrade if a new version becomes available in a subsequent update.

The `getResourceProperty` function on a chart is used to get an internal resource provisioned by the chart. Sometimes, this is needed to discover attributes such as a provisioned load balancer address. Be careful when depending on this, however, as it is an implementation detail of the chart and will change as the chart evolves.

Deploy the Helm application:

```bash
$ pulumi up --yes
 ```

{{% notes type="info" %}}
Pulumi support for Helm does not use Tiller. [Helm 3 removed Tiller](https://helm.sh/docs/faq/changes_since_helm2/#removal-of-tiller); there are known problems, particularly around security. Certain charts that depend on Tiller will not work with Pulumi. This is by design, and it affects a small number of charts.
{{% /notes %}}

### EKS app via a Helm tarball example

To use a tarball fetched from a web URL, update the Pulumi program:

{{< example-program path="awsx-eks-cluster-helm-chart-url" >}}

Deploy the Helm application:

```bash
$ pulumi up --yes
 ```

## Using an ECR Container Image from an EKS Kubernetes Deployment

[Pulumi Crosswalk for AWS ECR](/docs/clouds/aws/guides/ecr/) enables you to build, publish, and consume private Docker images easily using Amazon's Elastic Container Registry (ECR). In the following example, creating an `Image` resource will build an image from the `./app` directory (relative to the project and containing Dockerfile) and publish it to the provisioned ECR repository.

> *Note:* for more complete examples of building and publishing to _any_ private container registry, including AWS, Azure,
> Google Cloud, and the Docker Hub, please refer to the article [Build and publish container images to any cloud with
> Infrastructure as Code](/blog/build-publish-containers-iac/).

For example, let's say we have an `app/` directory containing a fully Dockerized application (including a `Dockerfile`). We would like to deploy that as a Deployment and Service running in our EKS cluster. This program accomplishes the above with a single `pulumi up` command:

{{< example-program path="awsx-ecr-eks-deployment-service" >}}

For more information about ECR, see [the Pulumi Crosswalk for AWS ECR documentation](/docs/clouds/aws/guides/ecr/).

## What's Next

For more information about Kubernetes and EKS, see the following:

* [Pulumi Kubernetes API Documentation](/registry/packages/kubernetes/api-docs/)
* [Pulumi EKS API Documentation](/registry/packages/eks/api-docs/)
* [Amazon Elastic Kubernetes Service homepage](https://aws.amazon.com/eks/)
* [Kubernetes Documentation](https://kubernetes.io)

Join our community [on Slack](https://slack.pulumi.com/) and share what you've built!
