---
title: "AWS Resources"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-py-resources
  settings:
    name: aws-py-resources
    description: >-
      A Pulumi program that demonstrates creating various AWS resources in
      Python
    runtime: python

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 28
    outputs: {}
    startTime: 1683413028000
    endTime: 1683413113000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::pulumi:pulumi:Stack::aws-py-resources-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:cloudwatch/eventRule:EventRule::myeventrule
      type: aws:cloudwatch/eventRule:EventRule
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:cloudwatch/logGroup:LogGroup::myloggroup
      type: aws:cloudwatch/logGroup:LogGroup
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:sns/topic:Topic::myloginstopic
      type: aws:sns/topic:Topic
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:cloudwatch/metricAlarm:MetricAlarm::mymetricalarm
      type: aws:cloudwatch/metricAlarm:MetricAlarm
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:ecr/repository:Repository::myrepository
      type: aws:ecr/repository:Repository
    - urn: urn:pulumi:examples-api::aws-py-resources::aws:iam/user:User::myuser
      type: aws:iam/user:User
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:iam/policy:Policy::mypolicy
      type: aws:iam/policy:Policy
    - urn: urn:pulumi:examples-api::aws-py-resources::aws:iam/group:Group::mygroup
      type: aws:iam/group:Group
    - urn: urn:pulumi:examples-api::aws-py-resources::aws:iam/role:Role::myrole
      type: aws:iam/role:Role
    - urn: urn:pulumi:examples-api::aws-py-resources::aws:sns/topic:Topic::mytopic
      type: aws:sns/topic:Topic
    - urn: urn:pulumi:examples-api::aws-py-resources::aws:ec2/eip:Eip::myeip
      type: aws:ec2/eip:Eip
    - urn: urn:pulumi:examples-api::aws-py-resources::aws:ec2/vpc:Vpc::myvpc
      type: aws:ec2/vpc:Vpc
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:cloudwatch/logStream:LogStream::mylogstream
      type: aws:cloudwatch/logStream:LogStream
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:cloudwatch/logMetricFilter:LogMetricFilter::mylogmetricfilter
      type: aws:cloudwatch/logMetricFilter:LogMetricFilter
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:cloudwatch/eventTarget:EventTarget::myeventtarget
      type: aws:cloudwatch/eventTarget:EventTarget
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:ecr/repositoryPolicy:RepositoryPolicy::myrepositorypolicy
      type: aws:ecr/repositoryPolicy:RepositoryPolicy
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:ecr/lifecyclePolicy:LifecyclePolicy::mylifecyclepolicy
      type: aws:ecr/lifecyclePolicy:LifecyclePolicy
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:iam/rolePolicy:RolePolicy::myrolepolicy
      type: aws:iam/rolePolicy:RolePolicy
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:iam/rolePolicyAttachment:RolePolicyAttachment::myrolepolicyattachment
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:ec2/internetGateway:InternetGateway::myinternetgateway
      type: aws:ec2/internetGateway:InternetGateway
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:ec2/securityGroup:SecurityGroup::mysecuritygroup
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:ec2/routeTable:RouteTable::myroutetable
      type: aws:ec2/routeTable:RouteTable
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:dynamodb/table:Table::mytable
      type: aws:dynamodb/table:Table
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:ecs/cluster:Cluster::mycluster
      type: aws:ecs/cluster:Cluster
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:kinesis/stream:Stream::mystream
      type: aws:kinesis/stream:Stream
    - urn: urn:pulumi:examples-api::aws-py-resources::aws:sqs/queue:Queue::myqueue
      type: aws:sqs/queue:Queue
    - urn: >-
        urn:pulumi:examples-api::aws-py-resources::aws:sns/topicSubscription:TopicSubscription::mytopicsubscription
      type: aws:sns/topicSubscription:TopicSubscription

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

