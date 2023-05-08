---
title: "Amazon EKS Cluster"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-py-eks
  settings:
    name: aws-py-eks
    description: A minimal AWS Python EKS example cluster
    runtime: python

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 22
    outputs:
      cluster-name:
        value: eks-cluster-672cf05
        secret: false
      kubeconfig:
        value: >-
          {"apiVersion": "v1", "clusters": [{"cluster": {"server":
          "https://30460A3C2F758C82FD1D3C299D736FC7.gr7.us-west-2.eks.amazonaws.com",
          "certificate-authority-data":
          "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUMvakNDQWVhZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRJek1EVXdOakl5TkRRMU9Wb1hEVE16TURVd016SXlORFExT1Zvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTVdMCkxHOFI0allxUDUwaUd3NEoyRWE3RDluOTZJaXJlWHB4TU9LU09WeGUvbDJrOXhab3pzNDQvRmVaeXNJTlMyZk0KS3FSMlptSkx4N05MeGhGd0haMEl1dTMwWGFXQW9HRTgwbnlURW1PVXRkQTRwNGdtSE90VkhGdERBM1hnOFAyNApOeTBzMUJTWE02NnIwditqdU1pNEw2ejRVWlZ6MWIxaFJQQnBmUGdZb0Y1MUpvM1c0U2VmTzBieVd6d3BwTlRuCmFPNlBwaUN4TjBnQWlzRmQwT1doSC90R2NiVlRsN2NrTkxPM3drbWt0YTJUZVJYU21FNUlFRkgrWm9sV3BxU2MKcEtjbUpFaEluSlRJc3gvMDRIZkpaTnd1YUQyUVRwMVVSU3dNVW9NVmhTdElBUi9YcGZwQ3d6Y2hhSlNBYXJCMwpVYitpTUU5MjgrcXFiUzBXVzFzQ0F3RUFBYU5aTUZjd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0hRWURWUjBPQkJZRUZCNjRZYmRrU21EWHV2RVhJU2VsYTFLd1JCbWtNQlVHQTFVZEVRUU8KTUF5Q0NtdDFZbVZ5Ym1WMFpYTXdEUVlKS29aSWh2Y05BUUVMQlFBRGdnRUJBTGl3MzR6T3pVUmQyRm9lUU1HZQo2NWpwRzVMcWNSR2Q3VkZSNkE0VnRNczFxQjJRZWl0QjFEMkk3WC8wTXZhUE5UUzlHb0ZWaEJnb0U2N05qeFliCkd5WEt0UzVjWXd2NTQyRlBxWDV0QVptOE9kMGNrWVVBaEh1cTNBVWdTbzBDQ1g0UWdlRzZrV09yYXFPSlVxanAKTlptKzhCemxhM3o5cEc4ZURhODdEMm5rSmprYmJiR0RjS0ZlUjdqYzk1WGJHYjQzbEpITWczZWhoYlZkTzh0bQpoRDgzeDVEMUFwWWFwTk5DU2lxSEh2bjRBdFErQzJ2cFRPdWRRcDdISFhFQSswSEE0MHdIcGkrVEQzcjZGQ1pwCkdRVjd1blZIb1NmMkY5bU8veWx3SlhLUXVUWktSQzV0WG1FL2FVL0JiUXZoNVN5TXY2ZGc5NDlzeUpYdXpiSlMKb0xRPQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg=="},
          "name": "kubernetes"}], "contexts": [{"context": {"cluster":
          "kubernetes", "user": "aws"}, "name": "aws"}], "current-context":
          "aws", "kind": "Config", "users": [{"name": "aws", "user": {"exec":
          {"apiVersion": "client.authentication.k8s.io/v1beta1", "command":
          "aws-iam-authenticator", "args": ["token", "-i",
          "https://30460A3C2F758C82FD1D3C299D736FC7.gr7.us-west-2.eks.amazonaws.com"]}}}]}
        secret: false
    startTime: 1683412703000
    endTime: 1683413448000
    config: {}
  resources:
    - urn: urn:pulumi:examples-api::aws-py-eks::pulumi:providers:aws::default
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::pulumi:pulumi:Stack::aws-py-eks-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:iam/role:Role::ec2-nodegroup-iam-role
      type: aws:iam/role:Role
    - urn: urn:pulumi:examples-api::aws-py-eks::aws:iam/role:Role::eks-iam-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:iam/rolePolicyAttachment:RolePolicyAttachment::eks-workernode-policy-attachment
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:iam/rolePolicyAttachment:RolePolicyAttachment::ec2-container-ro-policy-attachment
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:iam/rolePolicyAttachment:RolePolicyAttachment::eks-cni-policy-attachment
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:iam/rolePolicyAttachment:RolePolicyAttachment::eks-service-policy-attachment
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:iam/rolePolicyAttachment:RolePolicyAttachment::eks-cluster-policy-attachment
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: urn:pulumi:examples-api::aws-py-eks::aws:ec2/vpc:Vpc::eks-vpc
      type: aws:ec2/vpc:Vpc
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:ec2/internetGateway:InternetGateway::vpc-ig
      type: aws:ec2/internetGateway:InternetGateway
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:ec2/routeTable:RouteTable::vpc-route-table
      type: aws:ec2/routeTable:RouteTable
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:ec2/securityGroup:SecurityGroup::eks-cluster-sg
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:ec2/subnet:Subnet::vpc-subnet-us-west-2b
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:ec2/subnet:Subnet::vpc-subnet-us-west-2d
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:ec2/subnet:Subnet::vpc-subnet-us-west-2a
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:ec2/subnet:Subnet::vpc-subnet-us-west-2c
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-route-table-assoc-us-west-2b
      type: aws:ec2/routeTableAssociation:RouteTableAssociation
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-route-table-assoc-us-west-2d
      type: aws:ec2/routeTableAssociation:RouteTableAssociation
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-route-table-assoc-us-west-2a
      type: aws:ec2/routeTableAssociation:RouteTableAssociation
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-route-table-assoc-us-west-2c
      type: aws:ec2/routeTableAssociation:RouteTableAssociation
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:eks/cluster:Cluster::eks-cluster
      type: aws:eks/cluster:Cluster
    - urn: >-
        urn:pulumi:examples-api::aws-py-eks::aws:eks/nodeGroup:NodeGroup::eks-node-group
      type: aws:eks/nodeGroup:NodeGroup

---


# Amazon EKS Cluster

This example deploys an EKS Kubernetes cluster inside a AWS VPC with proper NodeGroup and Networking Configured

## Deploying the App

To deploy your infrastructure, follow the below steps.

## Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
1. [Configure Pulumi for AWS](https://www.pulumi.com/docs/intro/cloud-providers/aws/setup/)
1. [Configure Pulumi for Python](https://www.pulumi.com/docs/intro/languages/python/)
1. *Optional for K8 Auth* [Install `iam-authenticator`](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html)

## Deploying and running the program

1.  Create a new stack:

    ```
    $ pulumi stack init python-eks-testing
    ```

1.  Set the AWS region:

    ```
    $ pulumi config set aws:region us-east-2
    ```

1.  Run `pulumi up` to preview and deploy changes:

    ```
    $ pulumi up
        Previewing stack 'python-eks-testing'
        Previewing changes:
        ...

        Do you want to perform this update? yes
        Updating (python-eks-testing):

            Type                              Name                                Status
        +   pulumi:pulumi:Stack               aws-py-eks-python-eks-testing       created
        +   ├─ aws:iam:Role                   ec2-nodegroup-iam-role              created
        +   ├─ aws:iam:Role                   eks-iam-role                        created
        +   ├─ aws:ec2:Vpc                    eks-vpc                             created
        +   ├─ aws:iam:RolePolicyAttachment   eks-workernode-policy-attachment    created
        +   ├─ aws:iam:RolePolicyAttachment   eks-cni-policy-attachment           created
        +   ├─ aws:iam:RolePolicyAttachment   ec2-container-ro-policy-attachment  created
        +   ├─ aws:iam:RolePolicyAttachment   eks-service-policy-attachment       created
        +   ├─ aws:iam:RolePolicyAttachment   eks-cluster-policy-attachment       created
        +   ├─ aws:ec2:InternetGateway        vpc-ig                              created
        +   ├─ aws:ec2:Subnet                 vpc-sn-1                            created
        +   ├─ aws:ec2:Subnet                 vpc-sn-2                            created
        +   ├─ aws:ec2:SecurityGroup          eks-cluster-sg                      created
        +   ├─ aws:ec2:RouteTable             vpc-route-table                     created
        +   ├─ aws:eks:Cluster                eks-cluster                         created
        +   ├─ aws:ec2:RouteTableAssociation  vpc-1-route-table-assoc             created
        +   ├─ aws:ec2:RouteTableAssociation  vpc-2-route-table-assoc             created
        +   └─ aws:eks:NodeGroup              eks-node-group                      created

        Outputs:
            cluster-name: "eks-cluster-96b87e8"

        Resources:
            + 18 created

        Duration: 14m15s

    ```

1.  View the cluster name via `stack output`:

    ```
    $ pulumi stack output
        Current stack outputs (1):
        OUTPUT                   VALUE
        cluster-name  eks-cluster-96b87e8
    ```    

1.  Verify that the EKS cluster exists, by either using the AWS Console or running `aws eks list-clusters`.

1. Update your KubeConfig, Authenticate to your Kubernetes Cluster and verify you have API access and nodes running.

```
$ aws eks --region us-east-2 update-kubeconfig --name $(pulumi stack output cluster-name)

    Added new context arn:aws:eks:us-east-2:account:cluster/eks-cluster-96b87e8
```


```
$ kubectl get nodes

    NAME                                         STATUS   ROLES    AGE   VERSION
    ip-10-100-0-182.us-east-2.compute.internal   Ready    <none>   10m   v1.14.7-eks-1861c5
    ip-10-100-1-174.us-east-2.compute.internal   Ready    <none>   10m   v1.14.7-eks-1861c5
```

## Clean up

To clean up resources, run `pulumi destroy` and answer the confirmation question at the prompt.

