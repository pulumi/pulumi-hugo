---
title: "Amazon EKS Cluster"
meta_desc: "An EKS cluster"
metadata:
  id: aws-eks
  title: "Amazon EKS Cluster"
  description: "An EKS cluster"
  url: https://github.com/pulumi/examples/tree/master/aws-eks
  runtime: yaml
  lastUpdate: 1683414400000
  duration: 709000
  resources:
  - pulumi:pulumi:Stack
  - pulumi:providers:aws
  - pulumi:providers:eks
  - eks:index:Cluster
  - pulumi:providers:aws
  - eks:index:ServiceRole
  - eks:index:ServiceRole
  - eks:index:RandomSuffix
  - aws:iam/role:Role
  - aws:iam/role:Role
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:iam/instanceProfile:InstanceProfile
  - aws:ec2/securityGroup:SecurityGroup
  - aws:ec2/securityGroupRule:SecurityGroupRule
  - aws:eks/cluster:Cluster
  - pulumi:providers:kubernetes
  - aws:ec2/securityGroup:SecurityGroup
  - eks:index:VpcCni
  - kubernetes:core/v1:ConfigMap
  - aws:ec2/securityGroupRule:SecurityGroupRule
  - aws:ec2/securityGroupRule:SecurityGroupRule
  - aws:ec2/securityGroupRule:SecurityGroupRule
  - aws:ec2/launchConfiguration:LaunchConfiguration
  - aws:ec2/securityGroupRule:SecurityGroupRule
  - aws:ec2/securityGroupRule:SecurityGroupRule
  - aws:cloudformation/stack:Stack
  - pulumi:providers:kubernetes

summary: "This Pulumi example deploys an Amazon Web Services (AWS) Elastic Kubernetes System (EKS) using the Pulumi framework and Python programming language. It provision a VPC, EKS cluster, and EC2 nodes for the cluster, as well as an ingress controller for exposing services outside of the cluster. This example is intended to demonstrate how to set up and configure a Kubernetes cluster for cloud-native applications on an AWS platform."
---


# Amazon EKS Cluster

This example deploys an EKS Kubernetes cluster inside the default AWS VPC.

## Deploying the App

To deploy your infrastructure, follow the below steps.

## Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
1. [Configure Pulumi for AWS](https://www.pulumi.com/docs/intro/cloud-providers/aws/setup/)

## Deploying and running the program

1.  Create a new stack:

    ```
    $ pulumi stack init dev
    ```

1.  Set the AWS region:

    ```
    $ pulumi config set aws:region us-east-2
    ```

1.  Run `pulumi up` to preview and deploy changes:

    ```
    $ pulumi up
    Previewing changes:
    ...

    Performing changes:
    ...
    Resources:
        + 28 created

    Duration: 10m0s
    ```

1.  Check the deployed kubeconfig:

    ```
    $ pulumi stack output kubeconfig
    {"apiVersion":"v1","clusters":[{"cluster":{"certificate-authority-data":"LS0tLS1CRUdJTiBDR...
    ```

