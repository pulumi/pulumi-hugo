---
title: "Video Thumbnailer Using AWS Fargate"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: video-thumbnailer
  settings:
    name: video-thumbnailer
    description: A video thumbnail extractor using serverless functions and containers
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 48
    outputs:
      bucketName:
        value: bucket-767492c
        secret: false
    startTime: 1683413712000
    endTime: 1683413819000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::pulumi:pulumi:Stack::video-thumbnailer-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:FargateTaskDefinition::ffmpegThumbTask
      type: awsx:x:ecs:FargateTaskDefinition
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:Cluster::default-cluster
      type: awsx:x:ecs:Cluster
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::pulumi:providers:awsx::default_1_0_2
      type: pulumi:providers:awsx
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:iam/role:Role::onNewVideo
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup::default-cluster
      type: awsx:x:ec2:SecurityGroup
    - urn: urn:pulumi:examples-api::video-thumbnailer::awsx:x:ec2:Vpc::default-vpc
      type: awsx:x:ec2:Vpc
    - urn: urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket::bucket
      type: aws:s3/bucket:Bucket
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:FargateTaskDefinition$aws:iam/role:Role::ffmpegThumbTask-task
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:FargateTaskDefinition$aws:iam/role:Role::ffmpegThumbTask-execution
      type: aws:iam/role:Role
    - urn: urn:pulumi:examples-api::video-thumbnailer::awsx:ecr:Repository::repo
      type: awsx:ecr:Repository
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:FargateTaskDefinition$aws:cloudwatch/logGroup:LogGroup::ffmpegThumbTask
      type: aws:cloudwatch/logGroup:LogGroup
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:iam/rolePolicyAttachment:RolePolicyAttachment::onNewVideo-aadec3c3
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$awsx:x:ec2:IngressSecurityGroupRule::default-cluster-ssh
      type: awsx:x:ec2:IngressSecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:iam/rolePolicyAttachment:RolePolicyAttachment::onNewVideo-0cbb1731
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: urn:pulumi:examples-api::video-thumbnailer::aws:ec2/vpc:Vpc::default-vpc
      type: aws:ec2/vpc:Vpc
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$awsx:x:ec2:EgressSecurityGroupRule::default-cluster-egress
      type: awsx:x:ec2:EgressSecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$awsx:x:ec2:IngressSecurityGroupRule::default-cluster-containers
      type: awsx:x:ec2:IngressSecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ec2:Vpc$aws:ec2/subnet:Subnet::default-vpc-public-0
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ec2:Vpc$aws:ec2/subnet:Subnet::default-vpc-public-1
      type: aws:ec2/subnet:Subnet
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet::default-vpc-public-0
      type: awsx:x:ec2:Subnet
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ec2:Vpc$awsx:x:ec2:Subnet::default-vpc-public-1
      type: awsx:x:ec2:Subnet
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription::onNewThumbnail
      type: aws:s3:BucketEventSubscription
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription::onNewVideo
      type: aws:s3:BucketEventSubscription
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:FargateTaskDefinition$aws:iam/rolePolicyAttachment:RolePolicyAttachment::ffmpegThumbTask-task-b5aeb6b6
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:FargateTaskDefinition$aws:iam/rolePolicyAttachment:RolePolicyAttachment::ffmpegThumbTask-task-0cbb1731
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:FargateTaskDefinition$aws:iam/rolePolicyAttachment:RolePolicyAttachment::ffmpegThumbTask-execution-9a42f520
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:FargateTaskDefinition$aws:iam/rolePolicyAttachment:RolePolicyAttachment::ffmpegThumbTask-execution-58ed699a
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:Cluster$aws:ecs/cluster:Cluster::default-cluster
      type: aws:ecs/cluster:Cluster
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::pulumi:providers:aws::default_5_16_2
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:ecr:Repository$aws:ecr/repository:Repository::repo
      type: aws:ecr/repository:Repository
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription$aws:iam/role:Role::onNewThumbnail
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:ecr:Repository$aws:ecr/lifecyclePolicy:LifecyclePolicy::repo
      type: aws:ecr/lifecyclePolicy:LifecyclePolicy
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::onNewThumbnail-1b4caae3
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::onNewThumbnail-b5aeb6b6
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::onNewThumbnail-6c156834
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::onNewThumbnail-74d12784
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::onNewThumbnail-4aaabb8e
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::onNewThumbnail-a1de8170
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::onNewThumbnail-7cd09230
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::onNewThumbnail-e1a3786d
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription$aws:iam/rolePolicyAttachment:RolePolicyAttachment::onNewThumbnail-019020e7
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::pulumi:providers:pulumi::default
      type: pulumi:providers:pulumi
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$aws:ec2/securityGroup:SecurityGroup::default-cluster
      type: aws:ec2/securityGroup:SecurityGroup
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:ecr:Image::ffmpegThumbTask
      type: awsx:ecr:Image
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$awsx:x:ec2:IngressSecurityGroupRule$aws:ec2/securityGroupRule:SecurityGroupRule::default-cluster-ssh
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$awsx:x:ec2:IngressSecurityGroupRule$aws:ec2/securityGroupRule:SecurityGroupRule::default-cluster-containers
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:Cluster$awsx:x:ec2:SecurityGroup$awsx:x:ec2:EgressSecurityGroupRule$aws:ec2/securityGroupRule:SecurityGroupRule::default-cluster-egress
      type: aws:ec2/securityGroupRule:SecurityGroupRule
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription$aws:lambda/function:Function::onNewThumbnail
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription$aws:lambda/permission:Permission::onNewThumbnail
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::awsx:x:ecs:FargateTaskDefinition$aws:ecs/taskDefinition:TaskDefinition::ffmpegThumbTask
      type: aws:ecs/taskDefinition:TaskDefinition
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:lambda/function:Function::onNewVideo
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3:BucketEventSubscription$aws:lambda/permission:Permission::onNewVideo
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::video-thumbnailer::aws:s3/bucket:Bucket$aws:s3/bucketNotification:BucketNotification::onNewVideo
      type: aws:s3/bucketNotification:BucketNotification

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-ts-thumbnailer/README.md)

# Video Thumbnailer Using AWS Fargate

A video thumbnail extractor using serverless functions and containers.

Loosely derived from the example at https://serverless.com/blog/serverless-application-for-long-running-process-fargate-lambda/.

![When a new video is uploaded, extract a thumbnail](thumbnailer-diagram.png)

## Prerequisites

To run this example, make sure [Docker](https://docs.docker.com/engine/installation/) is installed and running.

## Running the App

Note: some values in this example will be different from run to run.  These values are indicated
with `***`.

1.  Create a new stack:

    ```
    pulumi stack init thumbnailer-testing
    ```

1.  Configure Pulumi to use an AWS region where Fargate is supported, which is currently only available in `us-east-1`, `us-east-2`, `us-west-2`, and `eu-west-1`:

    ```
    pulumi config set aws:region us-west-2
    ```

1.  Restore NPM modules via `npm install` or `yarn install`.

1.  Preview and deploy the app via `pulumi up`. The preview will take some time, as it builds a Docker container. A total of 32 resources are created.

    ```
    $ pulumi up
    Previewing update of stack 'thumbnailer-testing'
    Previewing changes:

        Type                                Name                                   Plan          Info
    *   global                              global                                 no change     1 info message. info: Building container image 'pulum-
    +   pulumi:pulumi:Stack                       video-thumbnailer-thumbnailer-testing  create...     1 info message. info: Successfully tagged pulum-
    ...

    Do you want to perform this update? yes
    Updating stack 'thumbnailer-testing'
    Performing changes:

        Type                                Name                                   Status        Info
    *   global                              global                                 unchanged     1 info message. info: Building container image 'pulum-
    +   pulumi:pulumi:Stack                 video-thumbnailer-thumbnailer-testing  created      1 info message. info: 081c66fa4b0c: Pushed
    + ...
    ...

    info: 32 changes performed:
        + 32 resources created
    Update duration: ***

    Permalink: https://app.pulumi.com/***
    ```

1.  View the stack outputs:

    ```
    $ pulumi stack output
    Current stack outputs (1):
        OUTPUT                                           VALUE
        bucketName                                       ***
    ```

1.  Upload a video, embedding the timestamp in the filename:

    ```
    $ aws s3 cp ./sample/cat.mp4 s3://$(pulumi stack output bucketName)/cat_00-01.mp4
    upload: sample/cat.mp4 to s3://***/cat_00-01.mp4
    ```

1.  View the logs from both the Lambda function and the ECS task:

    ```
    $ pulumi logs -f
    Collecting logs for stack thumbnailer-testing since ***

    2018-05-25T12:57:26.326-07:00[                    onNewVideo] *** New video: file cat_00-01.mp4 was uploaded at 2018-05-25T19:57:25.507Z.
    2018-05-25T12:57:30.705-07:00[                    onNewVideo] Running thumbnailer task.
    2018-05-25T12:58:34.960-07:00[               ffmpegThumbTask] Starting ffmpeg task...
    2018-05-25T12:58:34.960-07:00[               ffmpegThumbTask] Copying video from S3 bucket-5ea6b28/cat_00-01.mp4 to cat_00-01.mp4...
    2018-05-25T12:58:37.267-07:00[               ffmpegThumbTask] Completed 256.0 KiB/666.5 KiB (2.5 MiB/s) with 1 fildownload: s3://bucket-5ea6b28/cat_00-01.mp4 to ./cat_00-01.mp4
    2018-05-25T12:58:40.306-07:00[               ffmpegThumbTask] Copying cat.jpg to S3 at bucket-5ea6b28/cat.jpg ...
    2018-05-25T12:58:43.034-07:00[               ffmpegThumbTask] Completed 86.6 KiB/86.6 KiB (619.7 KiB/s) with 1 filupload: ./cat.jpg to s3://bucket-5ea6b28/cat.jpg
    2018-05-25T12:58:43.758-07:00[                onNewThumbnail] *** New thumbnail: file cat.jpg was saved at 2018-05-25T19:58:43.028Z.
        ```

1.  Download the key frame:

    ```
    $ aws s3 cp s3://$(pulumi stack output bucketName)/cat.jpg .
    download: s3://***/cat.jpg to ./cat.jpg
    ```

## Clean up

To clean up the resources, you will first need to clear the contents of the bucket.

```bash
aws s3 rm s3://$(pulumi stack output bucketName) --recursive
```

Then, run `pulumi destroy` and answer the confirmation question at the prompt.

