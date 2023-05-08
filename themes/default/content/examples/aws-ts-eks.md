---
title: "Amazon EKS Cluster"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-ts-eks
  settings:
    name: aws-ts-eks
    description: EKS cluster example
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 57
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
                  https://389F62B2C2E8ABA6C1425F0CE3D0EA3C.gr7.us-west-2.eks.amazonaws.com
                certificate-authority-data: >-
                  LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUMvakNDQWVhZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRJek1EVXdOakl5TkRVd05Gb1hEVE16TURVd016SXlORFV3TkZvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTk1WCml3Wm9uSzVuNWJQMUFZMTZ2VFZ6b1hnMHYvUFVLMjhnNERVbWt4a1hFck1HRHI3NTlVNHRBaVZSUERpMTIyMmQKRDN3WmZyemhFWlVMSlhvQzVsQVVpYTZNNGRDYnNpb2FRS3UyU2FaTG4vM2dFQXpwTjZnYUNxK3VLMy9XcFlZYgpRNXV3Mm45RlpxTnlUb1I3Sk04L1VKZUlnRFJYbjRoQlRWSUZBbXFZd3JWZnRTZXVLQ0QxRHFXbFBwRFhJcVVsCk9xbGdkb3RxSTExaFhmTUh4b3UrS2tTQndLSmNKcnE1RCt6L3l4eCtlZFI1ZDdDTUVsSHQ5aFpkcWhxT3kwbVMKY0FzWmU1RWx4eGxrUUFKU1FUcjN4cmN5TW9ZQjNZdk5SSGxmaVdncVBCc0I1UmhkWjZBbnI5aWh1cHVqY1krUgpqczROM2JESGEyOXg2RHRVUXg4Q0F3RUFBYU5aTUZjd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0hRWURWUjBPQkJZRUZQblJaWkFXOWlyVU5yaDV4U0lSaFRTTUxCb0JNQlVHQTFVZEVRUU8KTUF5Q0NtdDFZbVZ5Ym1WMFpYTXdEUVlKS29aSWh2Y05BUUVMQlFBRGdnRUJBRTU0MFdsRDU0R2F3NHRUQXhqYQpEVnZSZHdhbnhLMER6U2lkbDIyYTdKcEl3YVphNTNvS3Vxd0s1blZhcFo5ODI2Um5VRWVydFo0NWVSQUJISUhmCmJMTnlZWGhSR0p6dXdYYVp0Vm9TemNuSit4TEJnUXpWTmJ5dUgxK0hMVWxMdW1RYlZWbGF4WHNFbzQvMnJkdFAKbDJ2Q3Q3R1dvdnI2WHdiRk9pZm00TForUWs3SCtDV2NYU0dIcm8zdWZOWWFxYkd0Vi9UOElXUzNmZzVHbHAzWgppYkF2WEhmOGV6dlNRa2ZIdDhnbERMOGUxUlV3SG91ZmN1UExSUDRPRmxVcWdDd2VKQmR4ZmNTUjBDcENZRnNICmNOWHYrZVlhVkFndzdIeXdwU0dCZUhOcUdldXVOc2hWZ2tCYzlOWElPTXptQms0V0t1MTcyczllODZRNlN4M2MKUEw0PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==
          kind: Config
          users:
            - name: aws
              user:
                exec:
                  args:
                    - eks
                    - get-token
                    - '--cluster-name'
                    - cluster-eksCluster-cb6c455
                  apiVersion: client.authentication.k8s.io/v1beta1
                  env:
                    - name: KUBERNETES_EXEC_INFO
                      value: '{"apiVersion": "client.authentication.k8s.io/v1beta1"}'
                  command: aws
        secret: false
    startTime: 1683412731000
    endTime: 1683413373000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::pulumi:pulumi:Stack::aws-ts-eks-examples-api
      type: pulumi:pulumi:Stack
    - urn: urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc::vpc
      type: awsx:x:ec2:Vpc
    - urn: urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster::cluster
      type: eks:index:Cluster
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$eks:index:ServiceRole::cluster-instanceRole
      type: eks:index:ServiceRole
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$eks:index:ServiceRole::cluster-eksRole
      type: eks:index:ServiceRole
    - urn: urn:pulumi:examples-api::aws-ts-eks::pulumi:providers:eks::default
      type: pulumi:providers:eks
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:NatGateway::vpc-0
      type: awsx:x:ec2:NatGateway
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet::vpc-private-0
      type: awsx:x:ec2:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:NatGateway::vpc-1
      type: awsx:x:ec2:NatGateway
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet::vpc-public-0
      type: awsx:x:ec2:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet::vpc-private-1
      type: awsx:x:ec2:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:InternetGateway::vpc
      type: awsx:x:ec2:InternetGateway
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet::vpc-public-1
      type: awsx:x:ec2:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$eks:index:RandomSuffix::cluster-cfnStackName
      type: eks:index:RandomSuffix
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$eks:index:ServiceRole$aws:iam/role:Role::cluster-instanceRole-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$eks:index:ServiceRole$aws:iam/role:Role::cluster-eksRole-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$eks:index:ServiceRole$aws:iam/rolePolicyAttachment:RolePolicyAttachment::cluster-instanceRole-03516f97
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$eks:index:ServiceRole$aws:iam/rolePolicyAttachment:RolePolicyAttachment::cluster-instanceRole-e1b295bd
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$eks:index:ServiceRole$aws:iam/rolePolicyAttachment:RolePolicyAttachment::cluster-instanceRole-3eb088f2
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:NatGateway$aws:ec2/eip:Eip::vpc-0
      type: aws:ec2/eip:Eip
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$eks:index:ServiceRole$aws:iam/rolePolicyAttachment:RolePolicyAttachment::cluster-eksRole-4b490823
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:NatGateway$aws:ec2/eip:Eip::vpc-1
      type: aws:ec2/eip:Eip
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$aws:iam/instanceProfile:InstanceProfile::cluster-instanceProfile
      type: aws:iam/instanceProfile:InstanceProfile
    - urn: urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$aws:ec2/vpc:Vpc::vpc
      type: aws:ec2/vpc:Vpc
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:InternetGateway$aws:ec2/internetGateway:InternetGateway::vpc
      type: aws:ec2/internetGateway:InternetGateway
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/routeTable:RouteTable::vpc-public-1
      type: aws:ec2/routeTable:RouteTable
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/routeTable:RouteTable::vpc-private-0
      type: aws:ec2/routeTable:RouteTable
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/routeTable:RouteTable::vpc-public-0
      type: aws:ec2/routeTable:RouteTable
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/routeTable:RouteTable::vpc-private-1
      type: aws:ec2/routeTable:RouteTable
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/subnet:Subnet::vpc-private-0
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/subnet:Subnet::vpc-private-1
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/route:Route::vpc-public-1-ig
      type: aws:ec2/route:Route
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/route:Route::vpc-public-0-ig
      type: aws:ec2/route:Route
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-private-1
      type: aws:ec2/routeTableAssociation:RouteTableAssociation
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-private-0
      type: aws:ec2/routeTableAssociation:RouteTableAssociation
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$aws:ec2/securityGroup:SecurityGroup::cluster-eksClusterSecurityGroup
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksClusterInternetEgressRule
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/subnet:Subnet::vpc-public-1
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-public-1
      type: aws:ec2/routeTableAssociation:RouteTableAssociation
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/subnet:Subnet::vpc-public-0
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-public-0
      type: aws:ec2/routeTableAssociation:RouteTableAssociation
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:NatGateway$aws:ec2/natGateway:NatGateway::vpc-1
      type: aws:ec2/natGateway:NatGateway
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/route:Route::vpc-private-1-nat-1
      type: aws:ec2/route:Route
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:NatGateway$aws:ec2/natGateway:NatGateway::vpc-0
      type: aws:ec2/natGateway:NatGateway
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet$aws:ec2/route:Route::vpc-private-0-nat-0
      type: aws:ec2/route:Route
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$aws:eks/cluster:Cluster::cluster-eksCluster
      type: aws:eks/cluster:Cluster
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$pulumi:providers:kubernetes::cluster-eks-k8s
      type: pulumi:providers:kubernetes
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$kubernetes:core/v1:ConfigMap::cluster-nodeAccess
      type: kubernetes:core/v1:ConfigMap
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$eks:index:VpcCni::cluster-vpc-cni
      type: eks:index:VpcCni
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$aws:ec2/securityGroup:SecurityGroup::cluster-nodeSecurityGroup
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksNodeClusterIngressRule
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksClusterIngressRule
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksExtApiServerClusterIngressRule
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$aws:ec2/launchConfiguration:LaunchConfiguration::cluster-nodeLaunchConfiguration
      type: aws:ec2/launchConfiguration:LaunchConfiguration
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksNodeIngressRule
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$aws:ec2/securityGroupRule:SecurityGroupRule::cluster-eksNodeInternetEgressRule
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$aws:cloudformation/stack:Stack::cluster-nodes
      type: aws:cloudformation/stack:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-ts-eks::eks:index:Cluster$pulumi:providers:kubernetes::cluster-provider
      type: pulumi:providers:kubernetes

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-ts-eks/README.md)

# Amazon EKS Cluster

This example deploys an EKS Kubernetes cluster with an EBS-backed StorageClass and deploys the Kubernetes Dashboard into the cluster.

## Deploying the App

To deploy your infrastructure, follow the below steps.

### Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
2. [Install Node.js](https://nodejs.org/en/download/)
3. [Configure AWS Credentials](https://www.pulumi.com/docs/intro/cloud-providers/aws/setup/)
4. [Install `aws-iam-authenticator`](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html)

If you'd like to follow the optional instructions in step 7 in order to deploy a Helm chart into your cluster, you'll
also need to set up the Helm client:

1. [Install the Helm client binaries](https://docs.helm.sh/using_helm/#installing-helm)
2. If you are using Helm v2, initialize the Helm client:

    ```bash
    $ helm init --client-only
    ```

### Steps

After cloning this repo, from this working directory, run these commands:

1. Install the required Node.js packages:

    ```bash
    $ npm install
    ```

2. Create a new stack, which is an isolated deployment target for this example:

    ```bash
    $ pulumi stack init
    ```

3. Set the required configuration variables for this program:

    ```bash
    $ pulumi config set aws:region us-west-2
    ```

   We recommend using `us-west-2` to host your EKS cluster as other regions (notably `us-east-1`) may have capacity
   issues that prevent EKS clusters from creating:

    ```
    Diagnostics:
      aws:eks:Cluster: eksCluster
        error: Plan apply failed: creating urn:pulumi:aws-ts-eks-example::aws-ts-eks::EKSCluster$aws:eks/cluster:Cluster::eksCluster: error creating EKS Cluster (eksCluster-233c968): UnsupportedAvailabilityZoneException: Cannot create cluster 'eksCluster-233c968' because us-east-1a, the targeted availability zone, does not currently have sufficient capacity to support the cluster. Retry and choose from these availability zones: us-east-1b, us-east-1c, us-east-1d
            status code: 400, request id: 9f031e89-a0b0-11e8-96f8-534c1d26a353
    ```

    We are tracking enabling the creation of VPCs limited to specific AZs to unblock this in `us-east-1`: pulumi/pulumi-awsx#32

4. Stand up the EKS cluster, which will also deploy the Kubernetes Dashboard:

    ```bash
    $ pulumi up
    ```

5. After 10-15 minutes, your cluster will be ready, and the kubeconfig JSON you'll use to connect to the cluster will
   be available as an output. You can save this kubeconfig to a file like so:

    ```bash
    $ pulumi stack output kubeconfig --show-secrets >kubeconfig.json
    ```

    Once you have this file in hand, you can interact with your new cluster as usual via `kubectl`:

    ```bash
    $ KUBECONFIG=./kubeconfig.json kubectl get nodes
    ```


6. You can now connect to the Kubernetes Dashboard by fetching an authentication token and starting the kubectl proxy.

    - Fetch an authentication token:

        ```bash
        $ KUBECONFIG=./kubeconfig.json kubectl -n kube-system get secret | grep eks-admin | awk '{print $1}'
        eks-admin-token-b5zv4
        $ KUBECONFIG=./kubeconfig.json kubectl -n kube-system describe secret eks-admin-token-b5zv4
        Name:         eks-admin-token-b5zv4
        Namespace:    kube-system
        Labels:       <none>
        Annotations:  kubernetes.io/service-account.name=eks-admin
                      kubernetes.io/service-account.uid=bcfe66ac-39be-11e8-97e8-026dce96b6e8

        Type:  kubernetes.io/service-account-token

        Data
        ====
        token:      <authentication_token>
        ca.crt:     1025 bytes
        namespace:  11 bytes
        ```

    - Run the kubectl proxy:

        ```bash
        $ KUBECONFIG=./kubeconfig.json kubectl proxy
        ```

    - Open `http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/` in a web
      browser.
    - Choose `Token` authentication, paste the token retrieved earlier into the `Token` field, and sign in.

7. From there, feel free to experiment. Make edits and run `pulumi up` to incrementally update your stack.
   For example, in order to deploy a Helm chart into your cluster, import the `@pulumi/kubernetes/helm` package,
   add a `Chart` resource that targets the EKS cluster to `index.ts`, and run `pulumi up`. Note that the Helm client
   must be set up in order for the chart to deploy. For more details, see the [Prerequisites](#prerequisites) list.

    ```typescript
    import * as helm from "@pulumi/kubernetes/helm";

    // ... existing code here ...

    const myk8s = new k8s.Provider("myk8s", {
        kubeconfig: cluster.kubeconfig.apply(JSON.stringify),
    });

    const postgres = new helm.v2.Chart("postgres", {
        // stable/postgresql@0.15.0
        repo: "stable",
        chart: "postgresql",
        version: "0.15.0",
        values: {
            // Use a stable password.
            postgresPassword: "some-password",
            // Expose the postgres server via a load balancer.
            service: {
                type: "LoadBalancer",
            },
        },
    }, { providers: { kubernetes: myk8s } });
    ```

    Once the chart has been deployed, you can find its public, load-balanced endpoint via the Kubernetes Dashboard.

8. Once you've finished experimenting, tear down your stack's resources by destroying and removing it:

    ```bash
    $ pulumi destroy --yes
    $ pulumi stack rm --yes
    ```

