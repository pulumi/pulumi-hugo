---
title: "WordPress Site in AWS Fargate with RDS DB Backend"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: wordpress-ecs-rds
  settings:
    name: wordpress-ecs-rds
    description: Deploys WordPress in ECS Fargate with RDS backend.
    runtime: python

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
      DB Endpoint:
        value: wp-example-be-rdsbe656db.cws0ah986urg.us-west-2.rds.amazonaws.com
        secret: false
      ECS Cluster Name:
        value: wp-example-fe-ecs-b332c58
        secret: false
      DB Password:
        value: nRkIS5_lli9qEdP8
        secret: true
      DB User Name:
        value: admin
        secret: false
      Web Service URL:
        value: >-
          http://wp-example-fe-alb-374ee14-2119906042.us-west-2.elb.amazonaws.com
        secret: false
    startTime: 1683412676000
    endTime: 1683413009000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::pulumi:providers:aws::default
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::pulumi:pulumi:Stack::wordpress-ecs-rds-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:VPC::wp-example-net
      type: custom:resource:VPC
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::pulumi:providers:random::default_4_13_0
      type: pulumi:providers:random
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:Backend::wp-example-be
      type: custom:resource:Backend
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:Frontend::wp-example-fe
      type: custom:resource:Frontend
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::random:index/randomPassword:RandomPassword::db_password
      type: random:index/randomPassword:RandomPassword
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:Frontend$aws:iam/role:Role::wp-example-fe-task-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:Frontend$aws:iam/rolePolicyAttachment:RolePolicyAttachment::wp-example-fe-task-policy
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:Frontend$aws:ecs/cluster:Cluster::wp-example-fe-ecs
      type: aws:ecs/cluster:Cluster
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:VPC$aws:ec2/vpc:Vpc::wp-example-net-vpc
      type: aws:ec2/vpc:Vpc
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:VPC$aws:ec2/internetGateway:InternetGateway::wp-example-net-igw
      type: aws:ec2/internetGateway:InternetGateway
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:Frontend$aws:lb/targetGroup:TargetGroup::wp-example-fe-app-tg
      type: aws:lb/targetGroup:TargetGroup
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:VPC$aws:ec2/routeTable:RouteTable::wp-example-net-rt
      type: aws:ec2/routeTable:RouteTable
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:VPC$aws:ec2/securityGroup:SecurityGroup::wp-example-net-rds-sg
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:VPC$aws:ec2/securityGroup:SecurityGroup::wp-example-net-fe-sg
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:VPC$aws:ec2/subnet:Subnet::wp-example-net-subnet-us-west-2a
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:VPC$aws:ec2/subnet:Subnet::wp-example-net-subnet-us-west-2b
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:VPC$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-route-table-assoc-us-west-2a
      type: aws:ec2/routeTableAssociation:RouteTableAssociation
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:VPC$aws:ec2/routeTableAssociation:RouteTableAssociation::vpc-route-table-assoc-us-west-2b
      type: aws:ec2/routeTableAssociation:RouteTableAssociation
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:Backend$aws:rds/subnetGroup:SubnetGroup::wp-example-be-sng
      type: aws:rds/subnetGroup:SubnetGroup
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:Frontend$aws:lb/loadBalancer:LoadBalancer::wp-example-fe-alb
      type: aws:lb/loadBalancer:LoadBalancer
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:Frontend$aws:lb/listener:Listener::wp-example-fe-listener
      type: aws:lb/listener:Listener
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:Backend$aws:rds/instance:Instance::wp-example-be-rds
      type: aws:rds/instance:Instance
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:Frontend$aws:ecs/taskDefinition:TaskDefinition::wp-example-fe-app-task
      type: aws:ecs/taskDefinition:TaskDefinition
    - urn: >-
        urn:pulumi:examples-api::wordpress-ecs-rds::custom:resource:Frontend$aws:ecs/service:Service::wp-example-fe-app-svc
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

There are no required configuration parameters for this project since the code will use defaults or generate values as needed - see the beginning of `__main__.py` to see the defaults.
However, you can override these defaults by using `pulumi config` to set the following values (e.g. `pulumi config set service_name my-wp-demo`).

- `service_name` - This is used as a prefix for resources created by the Pulumi program.
- `db_name` - The name of the MySQL DB created in RDS.
- `db_user` - The user created with access to the MySQL DB.
- `db_password` - The password for the DB user. Be sure to use `--secret` if creating this config value (e.g. `pulumi config set db_password --secret`).

## Deploying and running the program

Note: some values in this example will be different from run to run.

1. Create a new stack:

   ```bash
   $ pulumi stack init lamp-test
   ```

1. Set the AWS region:

   ```bash
   $ pulumi config set aws:region us-west-2
   ```

1. Run `pulumi up` to preview and deploy changes. After the preview is shown you will be
   prompted if you want to continue or not. Note: If you set the `db_password` in the configuration as described above, you will not see the `RandomPassword` resource below.

   ```bash
   $ pulumi up
    +   pulumi:pulumi:Stack                  lamp-rds-wordpress-testing        create
    +   ├─ custom:resource:VPC               wp-example-net                    create
    +   │  ├─ aws:ec2:Vpc                    wp-example-net-vpc                create
    +   pulumi:pulumi:Stack                  lamp-rds-wordpress-testing        create.
    +   pulumi:pulumi:Stack                  lamp-rds-wordpress-testing        create
    +   │  ├─ aws:ec2:Subnet                 wp-example-net-subnet-us-west-2a  create
    +   │  ├─ aws:ec2:Subnet                 wp-example-net-subnet-us-west-2b  create
    +   │  ├─ aws:ec2:SecurityGroup          wp-example-net-rds-sg             create
    +   │  ├─ aws:ec2:SecurityGroup          wp-example-net-fe-sg              create
    +   │  ├─ aws:ec2:RouteTableAssociation  vpc-route-table-assoc-us-west-2a  create
    +   │  └─ aws:ec2:RouteTableAssociation  vpc-route-table-assoc-us-west-2b  create
    +   ├─ random:index:RandomPassword       db_password                       create
    +   ├─ custom:resource:Backend           wp-example-be                     create
    +   │  ├─ aws:rds:SubnetGroup            wp-example-be-sng                 create
    +   │  └─ aws:rds:Instance               wp-example-be-rds                 create
    +   └─ custom:resource:Frontend          wp-example-fe                     create
    +      ├─ aws:ecs:Cluster                wp-example-fe-ecs                 create
    +      ├─ aws:iam:Role                   wp-example-fe-task-role           create
    +      ├─ aws:lb:TargetGroup             wp-example-fe-app-tg              create
    +      ├─ aws:iam:RolePolicyAttachment   wp-example-fe-task-policy         create
    +      ├─ aws:lb:LoadBalancer            wp-example-fe-alb                 create
    +      ├─ aws:lb:Listener                wp-example-fe-listener            create
    +      └─ aws:ecs:Service                wp-example-fe-app-svc             create

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

