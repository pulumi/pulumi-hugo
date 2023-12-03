﻿using Pulumi;
using Awsx = Pulumi.Awsx;
using Eks = Pulumi.Eks;
using System.Collections.Generic;

return await Deployment.RunAsync(() =>
{
    // Create a VPC for the Kubernetes cluster.
    var eksVpc = new Awsx.Ec2.Vpc("eks-vpc", new()
    {
        EnableDnsHostnames = true,
        CidrBlock = "10.0.0.0/16",
    });

    // Create the EKS itself.
    var eksCluster = new Eks.Cluster("eks-cluster", new()
    {
        VpcId = eksVpc.VpcId,
        PublicSubnetIds = eksVpc.PublicSubnetIds,
        PrivateSubnetIds = eksVpc.PrivateSubnetIds,
        InstanceType = "t3.medium",
        DesiredCapacity = 6,
        MinSize = 3,
        MaxSize = 3,
        NodeAssociatePublicIpAddress = false,
        EndpointPrivateAccess = false,
        EndpointPublicAccess = true,
    });

    // Export the cluster's kubeconfig.
    return new Dictionary<string, object?>
    {
        ["kubeconfig"] = eksCluster.Kubeconfig,
    };
});
