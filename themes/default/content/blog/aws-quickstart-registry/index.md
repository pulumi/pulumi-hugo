---
title: "Using AWS Quick Starts with the Pulumi Registry"
date: 2021-10-28
meta_desc: "Pulumi releases AWS Quick Start packages in the Pulumi registry"
authors:
    - aidan-hoolachan
tags:
    - aws
    - vpc
    - postgres
    - postgresql
    - aurora
    - redshift
    - registry
---

Pulumi makes configuring, deploying, and managing criticial AWS resources straightforward, like it should be. AWS's core services are designed for modularity within the AWS ecosystem, which is great for flexibility but makes building best-practice AWS environments surprisingly difficult. Most "best practice" features on AWS should really be the standard practice, but complicated cross-service relationships are difficult to implement correctly. Pulumi and the AWS Quick Starts in the Pulumi registry abstract use higher-order components to abstract away that underlying complexity which makes building and deploying new applications faster than ever.

<!--more-->

Configuring an Aurora Postgresql database with best practices (again, what should really just be the standard practices) requires specialized AWS knowledge and provisioning a zoo of other critical resources:

  - Encryption - KMS Key + KMS Key Policy
  - Access logging - S3 + S3 Bucket Policy + Encryption (KMS, again)
  - Alarms with notifications - Cloudwatch Events + SNS
  - Networking infastructure - VPCs + Subnets + Gateways, etc.
  - Username and password - Secrets Manager Secret
  - Redundancy - RDS multi-AZ clusters
  - IAM - Various IAM roles and policies

If "Aurora Postgres RDS" were a third-party SAAS or PAAS service provider, the service would abstract away the above details and provide simple parameters for enabling encryption, alarms, notifications, network security, redundancy, monitoring, and logging. With Pulumi, that abstraction is possible while providing open source access to the underlying AWS resource definitions and with much more flexibility than traditional CloudFormation or Terraform. Those features can even be enabled by default. I believe that AWS "best practices" will also become the easiest approach with Pulumi as the ecosystem matures around the best packages.

When writing the Pulumi providers for AWS Quick Start VPC, AWS Quick Start Aurora Postgres, and AWS Quick Start Redshift, we were able to fight through the complexity and implement the best practices listed above. Those best practices are enabled by default but can be disabled using a flag (eg `enableEncryption: false`). The result is a simple interface for deploying a VPC, an Aurora Postgresql cluster, and a Redshift cluster along with all of the other resources needed for a best practice deployments. The process for writing these AWS providers was straightforward and intuitive. The Pulumi deployment and debug process was pleasant and I was able to go through most of the deploy + debug + tear down lifecycle without leaving the terminal.

The following code deploys a VPC, an Aurora Postgresql Cluster, a Redshift Cluster, and the various helper resources needed for encryption, logging, database alarms, vpc flow logs, etc. -- for a total of 47 resources deployed using only three functions with simple parameters. 

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as vpcQuickstart from "@pulumi/aws-quickstart-vpc";
import * as redshiftQuickstart from "@pulumi/aws-quickstart-redshift";
import * as auroraQuickstart from "@pulumi/aws-quickstart-aurora-postgres";

const notificationEmail = process.env.notificationEmail;
const dbPasswordSecret = pulumi.secret(process.env.databasePassword);

// Create a best-practices VPC
// Deploys 21 resources
const multiAvailabilityZoneVpc = new vpcQuickstart.Vpc("example-aurora-vpc", {
    cidrBlock: "10.0.0.0/16",
    availabilityZoneConfig: [{
        availabilityZone: "us-east-1a",
        publicSubnetCidr: "10.0.128.0/20",
        privateSubnetACidr: "10.0.32.0/19",
    }, {
        availabilityZone: "us-east-1b",
        privateSubnetACidr: "10.0.64.0/19",
    }]
})

// Create a best-practices Aurora Postgresql cluster
// Deploys 17 resources
const multiAvaialabilityZoneAuroraCluster = new auroraQuickstart.Cluster("example-aurora-cluster", {
  vpcID: multiAvailabilityZoneVpc.vpcID,
  dbName: "myDemoDatabase",
  dbEngineVersion: "11.9",
  dbInstanceClass: "db.t3.medium",
  availabilityZoneNames: ["us-east-1a", "us-east-1b"],
  dbNumDbClusterInstances: 2,
  dbMasterUsername: "mainuser",
  snsNotificationEmail: databaseNotificationEmail,
  enableEventSubscription: true,
  dbMasterPassword: dbPasswordSecret,
  dbParameterGroupFamily: "aurora-postgresql11",
  privateSubnetID1: multiAvailabilityZoneVpc.privateSubnetIDs.apply(x => x![0]),
  privateSubnetID2: multiAvailabilityZoneVpc.privateSubnetIDs.apply(x => x![1]),
});

// Create a best-practices Redshift cluster
// Deploys 8 resources
const cluster = new redshiftQuickstart.Cluster("example-redshift-cluster", {
  vpcID: multiAvailabilityZoneVpc.vpcID,
  dbPort: 5432,
  dbClusterIdentifier: "example-redshift-cluster",  
  dbMasterUsername: "mainuser",
  notificationEmail: notificationEmail,
  enableEventSubscription: true,
  dbMasterPassword: dbPasswordSecret,
  dbName: "main",
  dbNodeType: "dc2.large",
  subnetIDs: multiAvailabilityZoneVpc.privateSubnetIDs as pulumi.Output<string[]>
})

```

These AWS Quick Start components are recommended for developers with all levels of AWS skill. For developers who don't work with AWS frequently, these Quick Starts can replace the AWS Console Wizards for confidently provisioning resources.

For experienced AWS developers who want to use these components and are concerned about abstraction, there are several escape hatches and sanity checks: (1) review the underlying open source code, (2) do a quick proof-of-concept deployment and use Pulumi's resource management tools to review the resources, and (3) when neccessary, alter the underlying code! In my experience, because I was so accustomed to defining every painful detail of AWS infrastructue, the abstractions felt almost too easy to use. However, once I became comfortable with the underyling design patterns, these packages made deploying complicated AWS architectures incredibly easy, quick, and reliable. 

For service providers considering providing a Pulumi package for their service offering -- as an AWS developer, the most exciting part of this toolset is the ability to choose non-AWS tools without sacrificing convenience. I sometimes choose Cognito over Okta simply because Cognito is in the AWS ecosystem. If service provider packages are as convenient as using native AWS tools, they become more competitive with AWS' native services.

For getting started, I recommend starting with the examples for the [AWS Quick Start VPC](https://github.com/pulumi/pulumi-aws-quickstart-vpc/tree/main/examples), [AWS Quick Start Aurora Postgres](https://github.com/pulumi/pulumi-aws-quickstart-aurora-postgres/tree/master/examples), and [Aurora Quick Start Redshift](https://github.com/pulumi/pulumi-aws-quickstart-redshift/tree/main/examples).