import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

// Create a VPC for the Kubernetes cluster.
const eksVpc = new awsx.ec2.Vpc("eks-vpc", {
    enableDnsHostnames: true,
    cidrBlock: "10.0.0.0/16",
});

// Create the EKS itself.
const eksCluster = new eks.Cluster("eks-cluster", {
    vpcId: eksVpc.vpcId,
    publicSubnetIds: eksVpc.publicSubnetIds,
    privateSubnetIds: eksVpc.privateSubnetIds,
    instanceType: "t3.medium",
    desiredCapacity: 6,
    minSize: 3,
    maxSize: 3,
    nodeAssociatePublicIpAddress: false,
    endpointPrivateAccess: false,
    endpointPublicAccess: true,
});

// Export the cluster's kubeconfig.
export const kubeconfig = eksCluster.kubeconfig;
