import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";

const vpc = new awsx.ec2.DefaultVpc("default-vpc");

// Create a security group to allow egress out of the VPC.
const securityGroup = new aws.ec2.SecurityGroup("web-sg", {
    vpcId: vpc.vpcId,
    ingress: [
        {
            protocol: "tcp",
            fromPort: 80,
            toPort: 80,
            cidrBlocks: ["0.0.0.0/0"],
        },
    ],
    egress: [
        {
            protocol: "-1",
            fromPort: 0,
            toPort: 0,
            cidrBlocks: ["0.0.0.0/0"],
        },
    ],
});

// Creates an ALB associated with the default VPC for this region and listen on port 80.
const alb = new awsx.lb.ApplicationLoadBalancer("web-traffic", {
    listener: {
        port: 80,
    },
    securityGroups: [securityGroup.id],
});

vpc.publicSubnetIds.apply(subnetIds => {
    const ami = aws.ec2
        .getAmi({
            filters: [
                {
                    name: "name",
                    values: ["amzn2-ami-hvm-*"],
                },
            ],
            owners: ["amazon"],
            mostRecent: true,
        })
        .then(result => result.id);

    subnetIds.forEach((subnetId, i) => {
        const vm = new aws.ec2.Instance(`web-${i}`, {
            instanceType: "t2.micro",
            ami,
            subnetId,
            vpcSecurityGroupIds: alb.loadBalancer.securityGroups,
            userData: `#!/bin/bash
echo "Hello World, from Server ${i + 1}!" > index.html
nohup python -m SimpleHTTPServer 80 &
`,
        });

        const attachment = new awsx.lb.TargetGroupAttachment(`attachment-${i}`, {
            targetGroup: alb.defaultTargetGroup,
            instance: vm,
        });
    });
});

export const endpoint = pulumi.interpolate`http://${alb.loadBalancer.dnsName}`;
