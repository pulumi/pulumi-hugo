---
title: "Amazon EKS Cluster"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-eks
  settings:
    name: aws-eks
    description: An EKS cluster
    runtime: yaml

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 27
    outputs:
      kubeconfig:
        value:
          current-context: aws
          apiVersion: v1
          contexts:
            - context:
                cluster: kubernetes
                user: aws
              name: aws
          clusters:
            - name: kubernetes
              cluster:
                server: >-
                  https://7B9E95C68C0FEE8AF66C49F1E6D2730D.gr7.us-west-2.eks.amazonaws.com
                certificate-authority-data: >-
                  LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUMvakNDQWVhZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRJek1EVXdOakl6TURFeE1sb1hEVE16TURVd016SXpNREV4TWxvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTEpECjR1V2ZRQ0ovdS9SSlVlbDdhNVp2Umx0d1MrTzMzZXJpM0ZqZHZUSHJwa0tVRVVpNGJYUjUwV1pCN1lMUFppZysKeFFIUmFTRXhqa0kxc1VhZE5vVitiS0NIczhuVDJZbzhmMXRFNmdDNWwwWVZ4RThwelBTc05FSzRVMG9jODIwdgpuaytIcnpGWnoyVFAvR2ROUVgvK1hwYnU5UkNyWlNlMWlUelg4cXgwbjBkemlPdGs3Q1hoVXZ5cS9HemZHTWVDCkszOUZHUHFNc20wa3ZKUk1qUzVuOUVHN0VOeG1TWThpTGcvb3YwMU55THJBTlBzekNkSDg5VXM2VDhxZmFiaXkKMWd4VG5MWFp6QkRqb3U1TGZ1VTlsbGNTd0pxSTladUwzSnVwZUhjaUFtZzd5bHRTbUdPMkQ2ajZsY3hIV1NIeApnLzhQR2paOXQ4UUZwb2tmSURzQ0F3RUFBYU5aTUZjd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0hRWURWUjBPQkJZRUZBMFJCamVqaTJBWkUySkkwSk5pbnlCWnRWZGpNQlVHQTFVZEVRUU8KTUF5Q0NtdDFZbVZ5Ym1WMFpYTXdEUVlKS29aSWh2Y05BUUVMQlFBRGdnRUJBSGZnS0M2dWpFQ0FkMmM3UmdrNQpqRW1lQWZOYmRhc0RNL1IzYnBWbHpOVHVsejliZkg5R1dTZ3BqSDJmdWJ2b1dZWk52RS9SRGlpK3FmSTEvdXlFCkZvcTQ1MXlXTXRWRDdyVGRxRVM3c2M5QWhSbFpRdm1WRm1CNVdnQllzMmovZ0VaZGppYk9YaDZFWWtLczFoUVMKUDV0OStJRzVzMzJqaFQ5VTJQcnBnRjRNaStIdlpzakZycnprTDVYNXZmQzF6TTFnVnBsUVdvNDE4NmNPVEo2ZQpDTDQ2U1RleENpbXQvU3lNcW0raVpGRzRyOXNaU1RKZUdVeGpNQllTOFB2ZmZibEJVZXEvRjRHamZ6SDRxb3dHCnVGaDYwVmZTdFZLMEZBbFJHNTN3SmpJckxRdWl5QVEzWkE4TTErbVhsTitSN2NHbzh0a3Fnd1VyMm1Ibm90Q1oKZ3dnPQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==
          kind: Config
          users:
            - name: aws
              user:
                exec:
                  args:
                    - eks
                    - get-token
                    - '--cluster-name'
                    - cluster-eksCluster-5e087d9
                  apiVersion: client.authentication.k8s.io/v1beta1
                  env:
                    - name: KUBERNETES_EXEC_INFO
                      value: '{"apiVersion": "client.authentication.k8s.io/v1beta1"}'
                  command: aws
        secret: false
    startTime: 1683413691000
    endTime: 1683414400000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-eks::pulumi:pulumi:Stack::aws-eks-examples-api
      type: pulumi:pulumi:Stack
    - urn: urn:pulumi:examples-api::aws-eks::pulumi:providers:aws::default
      type: pulumi:providers:aws
    - urn: urn:pulumi:examples-api::aws-eks::pulumi:providers:eks::default
      type: pulumi:providers:eks
    - urn: urn:pulumi:examples-api::aws-eks::eks:index:Cluster::cluster
      type: eks:index:Cluster
    - urn: urn:pulumi:examples-api::aws-eks::pulumi:providers:aws::default_5_31_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$eks:index:ServiceRole::cluster-eksRole
      type: eks:index:ServiceRole
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$eks:index:ServiceRole::cluster-instanceRole
      type: eks:index:ServiceRole
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$eks:index:RandomSuffix::cluster-cfnStackName
      type: eks:index:RandomSuffix
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$eks:index:ServiceRole$aws:iam/role:Role::cluster-eksRole-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$eks:index:ServiceRole$aws:iam/role:Role::cluster-instanceRole-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$eks:index:ServiceRole$aws:iam/rolePolicyAttachment:RolePolicyAttachment::cluster-eksRole-4b490823
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$eks:index:ServiceRole$aws:iam/rolePolicyAttachment:RolePolicyAttachment::cluster-instanceRole-e1b295bd
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$eks:index:ServiceRole$aws:iam/rolePolicyAttachment:RolePolicyAttachment::cluster-instanceRole-03516f97
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$eks:index:ServiceRole$aws:iam/rolePolicyAttachment:RolePolicyAttachment::cluster-instanceRole-3eb088f2
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$aws:iam/instanceProfile:InstanceProfile::cluster-instanceProfile
      type: aws:iam/instanceProfile:InstanceProfile
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$aws:ec2/securityGroup:SecurityGroup::cluster-eksClusterSecurityGroup
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksClusterInternetEgressRule
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$aws:eks/cluster:Cluster::cluster-eksCluster
      type: aws:eks/cluster:Cluster
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$pulumi:providers:kubernetes::cluster-eks-k8s
      type: pulumi:providers:kubernetes
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$aws:ec2/securityGroup:SecurityGroup::cluster-nodeSecurityGroup
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$eks:index:VpcCni::cluster-vpc-cni
      type: eks:index:VpcCni
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$kubernetes:core/v1:ConfigMap::cluster-nodeAccess
      type: kubernetes:core/v1:ConfigMap
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksExtApiServerClusterIngressRule
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksClusterIngressRule
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksNodeIngressRule
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$aws:ec2/launchConfiguration:LaunchConfiguration::cluster-nodeLaunchConfiguration
      type: aws:ec2/launchConfiguration:LaunchConfiguration
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksNodeInternetEgressRule
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksNodeClusterIngressRule
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$aws:cloudformation/stack:Stack::cluster-nodes
      type: aws:cloudformation/stack:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-eks::eks:index:Cluster$pulumi:providers:kubernetes::cluster-provider
      type: pulumi:providers:kubernetes

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

