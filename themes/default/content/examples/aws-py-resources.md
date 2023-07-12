---
title: "AWS Resources"
meta_desc: "A Pulumi program that demonstrates creating various AWS resources in Python"
metadata:
  id: aws-py-resources
  title: "AWS Resources"
  description: "A Pulumi program that demonstrates creating various AWS resources in Python"
  url: https://github.com/pulumi/examples/tree/master/aws-py-resources
  runtime: python
  lastUpdate: 1683413113000
  duration: 85000
  resources:
  - pulumi:pulumi:Stack
  - pulumi:providers:aws
  - aws:cloudwatch/eventRule:EventRule
  - aws:cloudwatch/logGroup:LogGroup
  - aws:sns/topic:Topic
  - aws:cloudwatch/metricAlarm:MetricAlarm
  - aws:ecr/repository:Repository
  - aws:iam/user:User
  - aws:iam/policy:Policy
  - aws:iam/group:Group
  - aws:iam/role:Role
  - aws:sns/topic:Topic
  - aws:ec2/eip:Eip
  - aws:ec2/vpc:Vpc
  - aws:cloudwatch/logStream:LogStream
  - aws:cloudwatch/logMetricFilter:LogMetricFilter
  - aws:cloudwatch/eventTarget:EventTarget
  - aws:ecr/repositoryPolicy:RepositoryPolicy
  - aws:ecr/lifecyclePolicy:LifecyclePolicy
  - aws:iam/rolePolicy:RolePolicy
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:ec2/internetGateway:InternetGateway
  - aws:ec2/securityGroup:SecurityGroup
  - aws:ec2/routeTable:RouteTable
  - aws:dynamodb/table:Table
  - aws:ecs/cluster:Cluster
  - aws:kinesis/stream:Stream
  - aws:sqs/queue:Queue
  - aws:sns/topicSubscription:TopicSubscription

summary: "This Pulumi example sets up a variety of cloud resources in AWS using Python. It creates S3 buckets and object, an SQS queue, a DynamoDB table and a Lambda function all using the AWS SDK. It is an example of how Python can be used to quickly and easily deploy cloud resources on AWS, making it useful for a variety of cloud computing use cases."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-py-resources/README.md)

# AWS Resources

A Pulumi program that demonstrates creating various AWS resources in Python

```bash
# Create and configure a new stack
$ pulumi stack init dev
$ pulumi config set aws:region us-east-2

# Preview and run the deployment
$ pulumi up

# Remove the app
$ pulumi destroy
$ pulumi stack rm
```

