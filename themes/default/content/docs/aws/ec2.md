---
title: "How to create AWS EC2 instances with Pulumi"
meta_desc: "Use Pulumi to code, deploy, and manage cloud, serverless, and container apps and infrastructure"
meta_image: "/images/docs/service/aws-ec2.png"

service: "EC2"
description: "is a web service that provides secure, resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers"
aws_here: "https://aws.amazon.com/ec2/"

layout: aws-single
menu:
  aws:
    name: EC2
---

## Create an AWS EC2 resource using `@pulumi/aws`

The `@pulumi/aws` library enables fine-grained control over the AWS EC2 resource meaning it can be coded, deployed, and managed entirely in code.

```javascript
const aws = require("@pulumi/aws");

// Create a VPC.
const vpc = new aws.ec2.Vpc("vpc", {
    cidrBlock: "10.0.0.0/16",
});

// Create an an internet gateway to give the instance access to the internet.
const internetGateway = new aws.ec2.InternetGateway("internet-gateway", {
    vpcId: vpc.id,
});

// Create a public subnet.
const subnet = new aws.ec2.Subnet("subnet", {
    vpcId: vpc.id,
    cidrBlock: "10.0.1.0/24",
    mapPublicIpOnLaunch: true,
});

// Create a route table.
const routes = new aws.ec2.RouteTable("routes", {
    vpcId: vpc.id,
    routes: [
        {
            cidrBlock: "0.0.0.0/0",
            gatewayId: internetGateway.id,
        },
    ],
});

// Associate the route table with the public subnet.
const routeTableAssociation = new aws.ec2.RouteTableAssociation("route-table-association", {
    subnetId: subnet.id,
    routeTableId: routes.id,
});

// Create an elastic IP for the public subnet.
const elasticIP = new aws.ec2.Eip("elastic-ip", {
    vpc: true,
});

// Create a security group allowing inbound access over port 80
// and outbound access to anywhere.
const securityGroup = new aws.ec2.SecurityGroup("security-group", {
    vpcId: vpc.id,
    ingress: [
        {
            cidrBlocks: [ "0.0.0.0/0" ],
            protocol: "tcp",
            fromPort: 80,
            toPort: 80,
        },
    ],
    egress: [
        {
            cidrBlocks: [ "0.0.0.0/0" ],
            fromPort: 0,
            toPort: 0,
            protocol: "-1",
        },
    ],
});

// Create and launch an Amazon Linux EC2 instance into the public subnet.
const instance = new aws.ec2.Instance("instance", {
    ami: "ami-098e42ae54c764c35",
    instanceType: "t3.nano",
    userData: `
        #!/bin/bash
        yum update -y
        amazon-linux-extras install nginx -y
        systemctl enable nginx
        systemctl start nginx
    `,
    subnetId: subnet.id,
    vpcSecurityGroupIds: [
        securityGroup.id,
    ],
});

// Export the instance's public IP address.
module.exports = {
    ipAddress: instance.publicIp
};

```
