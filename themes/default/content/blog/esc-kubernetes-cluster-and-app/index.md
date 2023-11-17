---
title: "Create a Kubernetes Cluster and App with Pulumi ESC"

# The date represents the post's publish date, and by default corresponds with
# the date and time this file was generated. Dates are used for display and
# ordering purposes only; they have no effect on whether or when a post is
# published. To influence the ordering of posts published on the same date, use
# the time portion of the date value; posts are sorted in descending order by
# date/time.
date: 2023-11-17T14:05:53-07:00

# The draft setting determines whether a post is published. Set it to true if
# you want to be able to merge the post without publishing it.
draft: false

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or
# social-media previews. This field is required or the build will fail the
# linter test. Max length is 160 characters.
meta_desc: Use Pulumi ESC to manage configuration for a Kubernetes cluster.

# The meta_image appears in social-media previews and on the blog home page. A
# placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for you.
meta_image: meta.png

# At least one author is required. The values in this list correspond with the
# `id` properties of the team member files at /data/team/team. Create a file for
# yourself if you don't already have one.
authors:
    - levi-blackstone

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - esc
    - kubernetes

# See the blogging docs at https://github.com/pulumi/pulumi-hugo/blob/master/BLOGGING.md
# for details, and please remove these comments before submitting for review.
---

Pulumi gives you great flexibility to [factor your infrastructure into reusable parts](/docs/using-pulumi/organizing-projects-stacks).
One of the challenges in factoring code is managing the shared configuration that needs to pass between the subcomponents. [Pulumi ESC](/product/esc/)
simplifies this problem by providing a common place for Pulumi Infrastructure as Code (IaC) programs and other cloud tools
to share configuration and secrets. In this post, we will create a Kubernetes cluster, deploy an application to the created cluster,
and then use `kubectl` to check on the deployed application.

## Create a Kubernetes Cluster

First, we create a Kubernetes cluster using the [pulumi-eks](https://www.pulumi.com/registry/packages/eks/) component.

```yaml
name: eks-yaml
runtime: yaml
description: EKS Kubernets Cluster
resources:
  eks-cluster:
    type: eks:Cluster
outputs:
  kubeconfig: ${eks-cluster.kubeconfig}
```

This component includes an output value for the cluster's kubeconfig that we can use to connect to the cluster. However,
before we create the cluster, we need to configure AWS credentials so that Pulumi can deploy the requested changes.
While it is possible to set this configuration directly on the stack, let's see how it can be done with Pulumi ESC. First,
we create the following ESC environment (the "aws" environment):

```yaml
values:
  aws:
    creds:
      fn::open::aws-login:
        oidc:
          duration: 1h
          roleArn: arn:aws:iam::0123456789:role/deploy-oidc
          sessionName: pulumi-environments-session
  environmentVariables:
    AWS_ACCESS_KEY_ID: ${aws.creds.keyId}
    AWS_SECRET_ACCESS_KEY: ${aws.creds.secretAccessKey}
    AWS_SESSION_TOKEN: ${aws.creds.sessionToken}
  pulumiConfig:
    aws:region: us-west-2
```

Notice that this environment uses the `aws-login` ESC provider to [dynamically load short-lived credentials using OIDC](/docs/pulumi-cloud/oidc/aws/).
These credentials are then exposed as environment variables for consumers of this environment. We also set the AWS region
in the `pulumiConfig` section to configure the region for `pulumi` to manage resources with the `pulumi-aws` provider.

To use this ESC environment for our cluster, we set the following configuration for our stack:

```yaml
environment:
  - aws
```

The `environment` key accepts a list of ESC environments to import. When the stack is updated, `pulumi` automatically
sets the configured environment variables and stack configuration based on the ESC environment. We run our update, and
Pulumi creates our EKS cluster.

```
pulumi up --skip-preview
Updating (demo)

     Type                                   Name                                           Status
 +   pulumi:pulumi:Stack                    eks-yaml-demo                                  created (577s)
 +   └─ eks:index:Cluster                   eks-cluster                                    created (561s)
 +      ├─ eks:index:ServiceRole            eks-cluster-eksRole                            created (2s)
 +      │  ├─ aws:iam:Role                  eks-cluster-eksRole-role                       created (0.78s)
 +      │  └─ aws:iam:RolePolicyAttachment  eks-cluster-eksRole-4b490823                   created (0.44s)
 +      ├─ eks:index:ServiceRole            eks-cluster-instanceRole                       created (3s)
 +      │  ├─ aws:iam:Role                  eks-cluster-instanceRole-role                  created (0.85s)
 +      │  ├─ aws:iam:RolePolicyAttachment  eks-cluster-instanceRole-3eb088f2              created (0.46s)
 +      │  ├─ aws:iam:RolePolicyAttachment  eks-cluster-instanceRole-03516f97              created (0.59s)
 +      │  └─ aws:iam:RolePolicyAttachment  eks-cluster-instanceRole-e1b295bd              created (0.75s)
 +      ├─ eks:index:RandomSuffix           eks-cluster-cfnStackName                       created (0.49s)
 +      ├─ aws:ec2:SecurityGroup            eks-cluster-eksClusterSecurityGroup            created (1s)
 +      ├─ aws:iam:InstanceProfile          eks-cluster-instanceProfile                    created (0.48s)
 +      ├─ aws:eks:Cluster                  eks-cluster-eksCluster                         created (441s)
 +      ├─ aws:ec2:SecurityGroupRule        eks-cluster-eksClusterInternetEgressRule       created (0.81s)
 +      ├─ aws:ec2:SecurityGroup            eks-cluster-nodeSecurityGroup                  created (1s)
 +      ├─ pulumi:providers:kubernetes      eks-cluster-eks-k8s                            created (0.14s)
 +      ├─ eks:index:VpcCni                 eks-cluster-vpc-cni                            created (2s)
 +      ├─ kubernetes:core/v1:ConfigMap     eks-cluster-nodeAccess                         created (0.60s)
 +      ├─ aws:ec2:SecurityGroupRule        eks-cluster-eksExtApiServerClusterIngressRule  created (1s)
 +      ├─ aws:ec2:SecurityGroupRule        eks-cluster-eksClusterIngressRule              created (1s)
 +      ├─ aws:ec2:SecurityGroupRule        eks-cluster-eksNodeInternetEgressRule          created (1s)
 +      ├─ aws:ec2:SecurityGroupRule        eks-cluster-eksNodeClusterIngressRule          created (2s)
 +      ├─ aws:ec2:SecurityGroupRule        eks-cluster-eksNodeIngressRule                 created (2s)
 +      ├─ aws:ec2:LaunchConfiguration      eks-cluster-nodeLaunchConfiguration            created (1s)
 +      ├─ aws:cloudformation:Stack         eks-cluster-nodes                              created (108s)
 +      └─ pulumi:providers:kubernetes      eks-cluster-provider                           created (0.12s)

Outputs:
    kubeconfig: {
        apiVersion     : "v1"
        clusters       : [
            [0]: {
                cluster: {
                    certificate-authority-data: "<redacted>"
                    server                    : "https://FB9978041F7B72B227B7E95F076822E4.gr7.us-west-2.eks.amazonaws.com"
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
                        apiVersion: "client.authentication.k8s.io/v1beta1"
                        args      : [
                            [0]: "eks"
                            [1]: "get-token"
                            [2]: "--cluster-name"
                            [3]: "eks-cluster-eksCluster-1268ff9"
                        ]
                        command   : "aws"
                        env       : [
                            [0]: {
                                name : "KUBERNETES_EXEC_INFO"
                                value: (json) {
                                    apiVersion: "client.authentication.k8s.io/v1beta1"
                                }

                            }
                        ]
                    }
                }
            }
        ]
    }

Resources:
    + 27 created

Duration: 9m38s
```

## Deploy an application to the cluster

Now, we want to deploy an application to our new EKS cluster. While we could have included this in the same stack as the
cluster, it is generally better to follow the [separation of concerns principle](/blog/iac-recommended-practices-structuring-pulumi-projects), and manage applications separately from
the underlying infrastructure. To achieve this goal, we create a new application stack with the following program:

```yaml
name: yaml-example
runtime: yaml
description: Deployment + Service
resources:
  nginx-deployment:
    type: kubernetes:apps/v1:Deployment
    properties:
      metadata:
        name: nginx
        labels:
          app: nginx
      spec:
        replicas: 3
        selector:
          matchLabels:
            app: nginx
        template:
          metadata:
            labels:
              app: nginx
          spec:
            containers:
            - name: nginx
              image: "nginx"
              ports:
              - containerPort: 80
  nginx-service:
    type: kubernetes:core/v1:Service
    properties:
      metadata:
        name: nginx
      spec:
        type: LoadBalancer
        selector:
          app: nginx
        ports:
        - protocol: TCP
          port: 80
```

Again, we need to set some configuration before we deploy this stack. In this case, we need a `kubeconfig` to allow
the `pulumi-kubernetes` provider to connect to our EKS cluster. Let's create another Pulumi ESC environment called
"kubernetes-cluster" to handle this:

```yaml
values:
  stacks:
    fn::open::pulumi-stacks:
      stacks:
        eks-cluster:
          stack: eks-yaml/demo
  kubeconfig: {'fn::toJSON': "${stacks.eks-cluster.kubeconfig}"}
  pulumiConfig:
    kubernetes:kubeconfig: ${kubeconfig}
  files:
    KUBECONFIG: ${kubeconfig}
```

This ESC environment uses another ESC provider to reference outputs from Pulumi stacks in your organization. In this case,
we specify that we want to read outputs from the `eks-yaml/demo` stack, and then export the `kubeconfig` output from that
stack as `pulumiConfig` and `files`. As we saw on the cluster environment, `pulumiConfig` sets configuration for Pulumi
providers, so this allows us to run our stack and deploy the application to our cluster.

We import this environment with the following stack configuration:

```yaml
environment:
  - kubernetes-cluster
```

We update our stack, and see that our application has been deployed to the cluster.

```
pulumi up --skip-preview
Updating (demo)

     Type                              Name               Status
 +   pulumi:pulumi:Stack               yaml-example-demo  created (0.31s)
 +   ├─ kubernetes:core/v1:Service     nginx-service      created (10s)
 +   └─ kubernetes:apps/v1:Deployment  nginx-deployment   created (2s)

Resources:
    + 3 created

Duration: 13s
```

Now that the application is deployed, we might want to check some things on the cluster using `kubectl`. To do this, we
can set the `KUBECONFIG` environment variable to the path of a cluster configuration file. Since we configured this
in our ESC environment, we can run `kubectl` in the context of this environment like this:

```
$ pulumi env run k8s -- kubectl cluster-info

Kubernetes control plane is running at https://2F3303BF9E03F8D61099AAB5ED6F31A4.gr7.us-west-2.eks.amazonaws.com
CoreDNS is running at https://2F3303BF9E03F8D61099AAB5ED6F31A4.gr7.us-west-2.eks.amazonaws.com/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

$ esc run kubernetes-cluster -- kubectl get deploy

NAME    READY   UP-TO-DATE   AVAILABLE   AGE
nginx   3/3     3            3           103s
```

{{% notes type="info" %}}
ESC environments can be used with the `pulumi` CLI using the [pulumi env](/docs/cli/commands/pulumi_env) command, or with
the new standalone [esc CLI](/docs/esc-cli).
{{% /notes %}}

## Conclusion

Pulumi ESC makes it easier than ever to tame infrastructure complexity. For this demo, we created two reusable
ESC environments to configure AWS and Kubernetes credentials, created an EKS cluster, deployed a load-balanced
application to the cluster, and configured our local toolchain to connect to the cluster in just 71 lines of YAML.
Since we factored the shared configuration into ESC environments, it is easy to extend this example to deploy additional
AWS or Kubernetes resources. Pulumi ESC supports dynamic credentials using OIDC across AWS, Azure, and Google Cloud, with
additional providers on the roadmap. Check out the following links to learn more about Pulumi ESC today!

* [Getting Started](/docs/pulumi-cloud/esc/get-started)
* [Documentation](/docs/pulumi-cloud/esc)
* [Open Source](https://github.com/pulumi/esc)
* [Community Slack](https://slack.pulumi.com/)
