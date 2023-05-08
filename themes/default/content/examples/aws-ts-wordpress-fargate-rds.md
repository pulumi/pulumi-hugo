---
title: "WordPress Site in AWS Fargate with RDS DB Backend"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-ts-wordpress-fargate-rds
  settings:
    name: aws-ts-wordpress-fargate-rds
    description: Deploys Wordpress in ECS Fargate with RDS backend.
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 24
    outputs:
      webServiceUrl:
        value: >-
          http://wp-fargate-rds-fe-alb-ab5adbf-869952005.us-west-2.elb.amazonaws.com
        secret: false
      databaseEndpoint:
        value: wp-fargate-rds-db-rdse7b0e80.cws0ah986urg.us-west-2.rds.amazonaws.com
        secret: false
      databasePassword:
        value: uyc94nYuvape1wOw
        secret: true
      ecsClusterName:
        value: wp-fargate-rds-fe-ecs-44b03f9
        secret: false
      databaseUserName:
        value: admin
        secret: false
    startTime: 1683413011000
    endTime: 1683413349000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::pulumi:pulumi:Stack::aws-ts-wordpress-fargate-rds-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:WebService::wp-fargate-rds-fe
      type: custom:resource:WebService
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:DB::wp-fargate-rds-db
      type: custom:resource:DB
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:VPC::wp-fargate-rds-net
      type: custom:resource:VPC
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::pulumi:providers:random::default_4_13_0
      type: pulumi:providers:random
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::random:index/randomPassword:RandomPassword::dbPassword
      type: random:index/randomPassword:RandomPassword
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:WebService$aws:iam/role:Role::wp-fargate-rds-fe-task-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:WebService$aws:iam/rolePolicyAttachment:RolePolicyAttachment::wp-fargate-rds-fe-task-policy
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:WebService$aws:ecs/cluster:Cluster::wp-fargate-rds-fe-ecs
      type: aws:ecs/cluster:Cluster
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:VPC$aws:ec2/vpc:Vpc::wp-fargate-rds-net-vpc
      type: aws:ec2/vpc:Vpc
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:VPC$aws:ec2/internetGateway:InternetGateway::wp-fargate-rds-net-igw
      type: aws:ec2/internetGateway:InternetGateway
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:WebService$aws:lb/targetGroup:TargetGroup::wp-fargate-rds-fe-app-tg
      type: aws:lb/targetGroup:TargetGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:VPC$aws:ec2/routeTable:RouteTable::wp-fargate-rds-net-rt
      type: aws:ec2/routeTable:RouteTable
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:VPC$aws:ec2/securityGroup:SecurityGroup::wp-fargate-rds-net-rds-sg
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:VPC$aws:ec2/securityGroup:SecurityGroup::wp-fargate-rds-net-fe-sg
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:VPC$aws:ec2/subnet:Subnet::wp-fargate-rds-net-subnet-1
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:VPC$aws:ec2/subnet:Subnet::wp-fargate-rds-net-subnet-0
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:VPC$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-route-table-assoc-1
      type: aws:ec2/routeTableAssociation:RouteTableAssociation
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:VPC$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-route-table-assoc-0
      type: aws:ec2/routeTableAssociation:RouteTableAssociation
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:DB$aws:rds/subnetGroup:SubnetGroup::wp-fargate-rds-db-sng
      type: aws:rds/subnetGroup:SubnetGroup
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:WebService$aws:lb/loadBalancer:LoadBalancer::wp-fargate-rds-fe-alb
      type: aws:lb/loadBalancer:LoadBalancer
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:WebService$aws:lb/listener:Listener::wp-fargate-rds-fe-listener
      type: aws:lb/listener:Listener
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:DB$aws:rds/instance:Instance::wp-fargate-rds-db-rds
      type: aws:rds/instance:Instance
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:WebService$aws:ecs/taskDefinition:TaskDefinition::wp-fargate-rds-fe-app-task
      type: aws:ecs/taskDefinition:TaskDefinition
    - urn: >-
        urn:pulumi:examples-api::aws-ts-wordpress-fargate-rds::custom:resource:WebService$aws:ecs/service:Service::wp-fargate-rds-fe-app-svc
      type: aws:ecs/service:Service

---

# WordPress Site in AWS Fargate with RDS DB Backend

This example serves a WordPress site in AWS ECS Fargate using an RDS MySQL Backend.

It leverages the following Pulumi concepts/constructs:

- [Component Resources](https://www.pulumi.com/docs/intro/concepts/programming-model/#components): Allows one to create custom resources that encapsulate one's best practices. In this example, component resource is used to define a "VPC" custom resource, a "Backend" custom resource that sets up the RDS DB, and a "Frontend" resource that sets up the ECS cluster and load balancer and tasks.
- [Other Providers](https://www.pulumi.com/docs/reference/pkg/): Beyond the providers for the various clouds and Kubernetes, etc, Pulumi allows one to create and manage non-cloud resources. In this case, the program uses the Random provider to create a random password if necessary.

This sample uses the following AWS products (and related Pulumi providers):

- [Amazon VPC](https://aws.amazon.com/vpc): Used to set up a new virtual network in which the system is deployed.
- [Amazon RDS](https://aws.amazon.com/rds): A managed DB service used to provide the MySQL backend for WordPress.
- [Amazon ECS Fargate](https://aws.amazon.com/fargate): A container service used to run the WordPress frontend.

## Getting Started

There are no required configuration parameters for this project since the code will use defaults or generate values as needed - see the beginning of `index.ts` to see the defaults.
However, you can override these defaults by using `pulumi config` to set the following values (e.g. `pulumi config set serviceName my-wp-demo`).

- `serviceName` - This is used as a prefix for resources created by the Pulumi program.
- `dbName` - The name of the MySQL DB created in RDS.
- `dbUser` - The user created with access to the MySQL DB.
- `dbPassword` - The password for the DB user. Be sure to use `--secret` if creating this config value (e.g. `pulumi config set dbPassword --secret`).

## Deploying and running the program

Note: some values in this example will be different from run to run.

1. Create a new stack:

   ```bash
   $ pulumi stack init dev
   ```

1. Set the AWS region:

   ```bash
   $ pulumi config set aws:region us-west-2
   ```

1. Run `pulumi up` to preview and deploy changes. After the preview is shown you will be
   prompted if you want to continue or not. Note: If you set the `dbPassword` in the configuration as described above, you will not see the `RandomPassword` resource below.

   ```bash
   $ pulumi up
    + TBD

   ```

1. The program outputs the following values:

- `DB Endpoint`: This is the RDS DB endpoint. By default, the DB is deployed to disallow public access. This can be overriden in the resource declaration for the backend.
- `DB Password`: This is managed as a secret. To see the value, you can use `pulumi stack output --show-secrets`
- `DB User Name`: The user name for access the DB.
- `ECS Cluster Name`: The name of the ECS cluster created by the stack.
- `Web Service URL`: This is a link to the load balancer fronting the WordPress container. Note: It may take a few minutes for AWS to complete deploying the service and so you may see a 503 error initially.

1. To clean up resources, run `pulumi destroy` and answer the confirmation question at the prompt.

## Troubleshooting

### 503 Error for the Web Service

AWS can take a few minutes to complete deploying the WordPress container and connect the load balancer to the service. So you may see a 503 error for a few minutes right after launching the stack. You can see the status of the service by looking at the cluster in AWS.

## Deployment Speed

Since the stack creates an RDS instance, ECS cluster, load balancer, ECS service, as well as other elements, the stack can take about 4-5 minutes to launch and become ready.

