import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as eks from "@pulumi/eks";

const vpcId = aws.ec2.getVpc({
    "default": true,
}).then(invoke => invoke.id);
const subnetIds = aws.ec2.getSubnetIds({
    vpcId: vpcId,
}).then(invoke => invoke.ids);
const cluster = new eks.Cluster("cluster", {
    vpcId: vpcId,
    subnetIds: subnetIds,
    instanceType: "t2.medium",
    desiredCapacity: 2,
    minSize: 1,
    maxSize: 2,
});
export const kubeconfig = cluster.kubeconfig;
