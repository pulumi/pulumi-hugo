---
title: "Pulumi CLI now displays time elapsed per resource"
date: 2022-11-02T11:45:35-06:00
draft: false
meta_desc: See deployment times across different types of cloud provider resources.
authors:
    - kyle-dixler
tags: 
  - pulumi
  - features
---

If you’ve deployed resources to your favorite cloud provider, you have probably found yourself sitting in the console thinking: “I don’t know how long this is going to take.” Then you deploy the resource and think: “When did I even start this?” When using Pulumi, the CLI prints out how long the update took after it ran, but while you’re in the moment, it feels like ages.

## We’re excited to announce a CLI usability enhancement.

**You can now see how long each of your resources are taking to deploy.**

When you run `pulumi up`, you’ll see that individual resources have the time taken displayed during updates including up, destroy, import, and refresh.

{{< asciicast id="5Qf4oLoYOWvUHUMUXcPjHvXxL" >}}

## Comparing resource deployment times

I have a contrived Pulumi program that deploys comparable resources in AWS and GCP and you can see the differences in deployment times between them. It provides a rough idea of the orders of magnitude in deployment time between different resource classes.

Here’s a screenrecording of the output of the program (it took fairly long):

{{< asciicast id="8ZZe6iegHnahrPt8PpXSJtEnr" >}}

For those interested, the code is at the bottom of this post.

This is far from a perfect example. These numbers have many sources of error, including the load on the cloud provider, the chosen availability zone, quotas and throttling, whether the resource is ready for requests, inefficient resource options, and size of the images (for compute resources). Nonetheless, it provides more perspective as instead of a feeling short or long, we now see concrete numbers to help us quantify it.

Thanks for reading. If you have any feedback on how we can further improve our CLI experience, let us know by commenting or upvoting open issues tracking enhancements on GitHub. If you can’t find an existing issue, feel free to open a new one!

Code used in this example:

```typescript
// index.ts
// aws resources
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const aws_bucket = new aws.s3.Bucket("my-bucket");

new aws.s3.BucketObject("my-bucket-object", {
    bucket: aws_bucket.bucket,
    content: "hello world"
});


const ubuntu = aws.ec2.getAmi({
    mostRecent: true,
    filters: [
        {
            name: "name",
            values: ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"],
        },
        {
            name: "virtualization-type",
            values: ["hvm"],
        },
    ],
    owners: ["099720109477"],
});
new aws.ec2.Instance("web", {
    ami: ubuntu.then(ubuntu => ubuntu.id),
    instanceType: "t3.micro",
    tags: {
        Name: "HelloWorld",
    },
});

const aws_iam_role_example = new aws.iam.Role("example", {assumeRolePolicy: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
`});
const example_AmazonEKSClusterPolicy = new aws.iam.RolePolicyAttachment("example-AmazonEKSClusterPolicy", {
    policyArn: "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy",
    role: aws_iam_role_example.name,
});
// Optionally, enable Security Groups for Pods
// Reference: https://docs.aws.amazon.com/eks/latest/userguide/security-groups-for-pods.html
const example_AmazonEKSVPCResourceController = new aws.iam.RolePolicyAttachment("example-AmazonEKSVPCResourceController", {
    policyArn: "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController",
    role: aws_iam_role_example.name,
});

const mainVpc = new aws.ec2.Vpc("main", {
    cidrBlock: "10.0.0.0/16",
});

const subnet1 = new aws.ec2.Subnet("subnet1", {
    vpcId: mainVpc.id,
    cidrBlock: "10.0.3.0/24",
    tags: {
        Name: "Main",
    },
    availabilityZone: "us-east-1a",
});

const subnet2 = new aws.ec2.Subnet("subnet2", {
    vpcId: mainVpc.id,
    cidrBlock: "10.0.2.0/24",
    tags: {
        Name: "Main",
    },
    availabilityZone: "us-east-1b",
});

// eks Cluster
new aws.eks.Cluster("example", {
    roleArn: aws_iam_role_example.arn,
    vpcConfig: {
        subnetIds: [
            subnet1.id,
            subnet2.id,
        ],
    },
        }, {
        dependsOn: [
            example_AmazonEKSClusterPolicy,
            example_AmazonEKSVPCResourceController,
        ],
    });

// gcp resources
import * as gcp from "@pulumi/gcp";

const gcp_bucket = new gcp.storage.Bucket("static-site", {
    forceDestroy: true,
    location: "us-central1",
});

new gcp.storage.BucketObject("picture", {
    bucket: gcp_bucket.id,
    content: "hello world"
});


new gcp.compute.Instance("default-instance", {
    machineType: "e2-micro",
    zone: "us-central1-a",
    tags: [
        "foo",
        "bar",
    ],
    bootDisk: {
        initializeParams: {
            image: "debian-cloud/debian-11",
            labels: {
                my_label: "value",
            },
        },
    },
    networkInterfaces: [{
        network: "default",
        accessConfigs: [{}],
    }],
});

const name = "helloworld";

const config = new pulumi.Config();
const masterVersion = config.get("masterVersion") ||
    gcp.container.getEngineVersions().then(it => it.latestMasterVersion);

// Create a GKE cluster
new gcp.container.Cluster(name, {
    // We can't create a cluster with no node pool defined, but we want to only use
    // separately managed node pools. So we create the smallest possible default
    // node pool and immediately delete it.
    initialNodeCount: 1,

    minMasterVersion: masterVersion,
});
```
