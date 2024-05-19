const eks = require("@pulumi/eks");
const awsx = require("@pulumi/awsx");

// Create a VPC for our cluster.
const vpc = new awsx.ec2.Vpc("vpc", {});

// Create an EKS cluster inside of the VPC.
const cluster = new eks.Cluster("cluster", {
    vpcId: vpc.vpcId,
    publicSubnetIds: vpc.publicSubnetIds,
    privateSubnetIds: vpc.privateSubnetIds,
    nodeAssociatePublicIpAddress: false,
});

// Export the cluster's kubeconfig.
exports.kubeconfig = cluster.kubeconfig;