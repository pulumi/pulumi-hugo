---
title: "Improving the `pulumi import` experience"
date: 2022-03-10
meta_desc: Recent improvements to `pulumi import` make it an even smoother way to import existing cloud infrastructure into Pulumi.
meta_image: meta.png
authors:
    - fraser-waters
tags:
    - features
    - migration
    - import
---

Importing resources to Pulumi is a fundamental feature which enables bringing over existing cloud infrastructure into your Pulumi programs. We introduced the [`pulumi import`]({{< relref "blog/pulumi-import-generate-iac-for-existing-cloud-resources/" >}}) command last year, which makes it easy to import an existing resource into your Pulumi state, as well as generating the source code that you can use to manage that resource in Pulumi going forward.  As users have applied `pulumi import` to a vast array of different cloud resources and provided feedback on the feature, we've identified a few opportunities to further streamline the experience using `pulumi import`.

Today we're happy to announce changes to the import system to fix most of these issues. We want to give users a heads up on the improvements they should expect to see and also take a chance to explain some of the limitations that might still be encountered.

<!--more-->

Pulumi supports two styles of [importing resources]({{< relref "docs/guides/adopting/import/" >}}), using the `pulumi import` command or using the `import` resource option. The changes we're making mostly affect the `pulumi import` command. The resource option behavior should not be affected by these changes.

## Comparison of examples

The following examples are by no means a complete representation of the changes to import but show a few cases comparing the old and new system.

### AWS S3 Bucket

Imports of S3 bucket objects would succeeded in the old system but the generated code is now slightly different.

Previously we would have generated code to set properties like `acl` and `forceDestroy` to their default values.

```
const my_bucket = new aws.s3.Bucket("my-bucket", {
    acl: "private",
    bucket: "my-bucket-3f85c54",
    forceDestroy: false,
}, {
    protect: true,
});
```

Now we no longer set those default values, but we do now set some generated values that are returned from the AWS provider.

```
const my_bucket = new aws.s3.Bucket("my-bucket", {
    arn: "arn:aws:s3:::my-bucket-3f85c54",
    bucket: "my-bucket-3f85c54",
    hostedZoneId: "Z3BJ6K6RIION7M",
    requestPayer: "BucketOwner",
}, {
    protect: true,
});
```

The above accurately reflects what the providers `Read` function has told us of the inputs set for this bucket, although due to the way the AWS provider happens to work we could elide all these properties. This is because the provider will use outputs saved in the state file and the new inputs to calculate the update diff, and a property that exists in the old output and is missing from the new inputs is simply left at the old output value. As none of the properties for `Bucket` are marked required the following also works and is equivalent:

```
const my_bucket = new aws.s3.Bucket("my-bucket", { }, { protect: true });
```

### AWS EC2 Instances

Previously trying to import an EC2 instance would fail with the following errors:

```
aws:ec2:Instance (test):
  error: aws:ec2/instance:Instance resource 'test' has a problem: Missing required argument: "instance_type": one of `instance_type,launch_template` must be specified. Examine values at 'Instance.InstanceType'.
  error: aws:ec2/instance:Instance resource 'test' has a problem: Missing required argument: "launch_template": one of `ami,instance_type,launch_template` must be specified. Examine values at 'Instance.LaunchTemplate'.
  error: aws:ec2/instance:Instance resource 'test' has a problem: Missing required argument: "ami": one of `ami,launch_template` must be specified. Examine values at 'Instance.Ami'.
```

This was because none of `instance_type`, `launch_template`, or `ami` are marked as required and so the engine didn't use them to validate the input properties we're valid, but either `ami` and `instance_type` or `launch_template` are actually required (It's just not expressed in the schema) and so the property validation would fail.

With the new changes an EC2 instance can be imported without warnings:

```
const test = new aws.ec2.Instance("test", {
    ami: "ami-082b5a644766e0e6f",
    associatePublicIpAddress: true,
    availabilityZone: "us-west-2b",
    capacityReservationSpecification: {
        capacityReservationPreference: "open",
    },
    cpuCoreCount: 1,
    cpuThreadsPerCore: 1,
    creditSpecification: {
        cpuCredits: "standard",
    },
    iamInstanceProfile: "",
    instanceInitiatedShutdownBehavior: "stop",
    instanceType: "t2.micro",
    metadataOptions: {
        httpEndpoint: "enabled",
        httpPutResponseHopLimit: 1,
        httpTokens: "optional",
    },
    privateIp: "172.31.20.37",
    rootBlockDevice: {
        iops: 100,
        volumeSize: 8,
        volumeType: "gp2",
    },
    securityGroups: ["secgrp-b0c0140"],
    subnetId: "subnet-c7d926bf",
    tenancy: "default",
    vpcSecurityGroupIds: ["sg-053fffb857c2a2eec"],
}, {
    protect: true,
});
```

Again this reflects what `Read` has told us of the inputs set for this instance, and again due to the way the AWS provider works many of these inputs could be elided and the provider would pick up the values from the saved output set. The following is again equivalent to the above given the saved state:

```
const test = new aws.ec2.Instance("test", {
    ami: "ami-082b5a644766e0e6f",
    instanceType: "t2.micro"
}, {
    protect: true,
});
```

### Kubernetes Deployment

An example of a resource that isn't affected by the changes to the import system is a Kubernetes `apps.v1.Deployment`. Both the current and new import system result in the following:

```
const test = new kubernetes.apps.v1.Deployment("test", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
        annotations: {
            "deployment.kubernetes.io/revision": "1",
            "pulumi.com/autonamed": "true",
        },
        labels: {
            "app.kubernetes.io/managed-by": "pulumi",
        },
        name: "redis-leader-bl6bm6zu",
        namespace: "default",
    },
    spec: {
        progressDeadlineSeconds: 600,
        replicas: 1,
        revisionHistoryLimit: 10,
        selector: {
            matchLabels: {
                app: "redis-leader",
            },
        },
        strategy: {
            rollingUpdate: {
                maxSurge: `25%`,
                maxUnavailable: `25%`,
            },
            type: "RollingUpdate",
        },
        template: {
            metadata: {
                labels: {
                    app: "redis-leader",
                },
            },
            spec: {
                containers: [{
                    image: "redis",
                    imagePullPolicy: "Always",
                    name: "redis-leader",
                    ports: [{
                        containerPort: 6379,
                        protocol: "TCP",
                    }],
                    resources: {
                        requests: {
                            cpu: "100m",
                            memory: "100Mi",
                        },
                    },
                    terminationMessagePath: "/dev/termination-log",
                    terminationMessagePolicy: "File",
                }],
                dnsPolicy: "ClusterFirst",
                restartPolicy: "Always",
                schedulerName: "default-scheduler",
                securityContext: {},
                terminationGracePeriodSeconds: 30,
            },
        },
    },
}, {
    protect: true,
});
```

### AWS Lambda

Previously trying to import an AWS lambda function would fail with the following errors:

```
error: Preview failed: diffing urn:pulumi:dev::slss-tps::aws:lambda/function:Function::my-function: handler and runtime must be set when PackageType is Zip
```

This was because `handler`, and `runtime` were not marked as required and so they were stripped out from the input set used to validate, but the default for `PackageType` is `Zip` thus triggering the error.

With the new changes a lambda can be imported without warnings:

```
const my_function = new aws.lambda.Function("my-function", {
    architectures: ["x86_64"],
    handler: "__index.handler",
    memorySize: 128,
    name: "zipTpsReports-b706c31",
    reservedConcurrentExecutions: -1,
    role: "arn:aws:iam::616138583583:role/zipTpsReports-85098e8",
    runtime: "nodejs12.x",
    sourceCodeHash: "ujyqnjzeSLW/mtBT8t1HhW2CyqGH/sHbS3bhxV4a7Hs=",
    timeout: 180,
    tracingConfig: {
        mode: "PassThrough",
    },
}, {
    protect: true,
});
```

## Technical details

We've never really explained how the import system works before, which has lead to a lot of confusion from users when they encountered errors with it. Given the changes we're making here we felt it a good time to give a more detailed write up of how the engine works to try and help users understand why their import results are the way they are.

This section is technically detailed and requires some understanding of the Pulumi architecture, but is not necessary to understand to be able to use the import system.

### The importance of `Provider.Read`

Our import system depends on the ability for a [resource provider]({{< relref "docs/intro/concepts/resources/providers/" >}}) to be able to read the existing state of a resource and report back to Pulumi the current value of it's inputs and outputs.

This isn't always possible to return accurately. For example if a resource's inputs don't match up 1-to-1 with it's output state and the underlying provider can only read the current output state there's no way for it to always construct the correct input state. There could also be bugs in the provider's `Read` method that result in inaccurate reads. We've designed the import system to be tolerant to these cases, but it does mean we don't expect perfect import results for every resource.

### The current import system

To import resources with the currently the engine issues the following steps:

1. Use the providers `Read` function to get the inputs and outputs for the resource.
2. Remove all properties from the inputs except for those flagged as required.
3. Pass that reduced input property set to the providers `Check` method.
4. If there are any check failures return an error and fail the import.
5. Take the result of `Check` which will have filled in default properties and diff it with the original input set returned from `Read`.
6. If there are any diffs copy in the values from the original `Read` to the resulting input set.
7. Save the updated input set and the original output set into the stacks state.
8. Pass the resulting input set to the code generator to generate a `new Resource` call to match the imported state.

There are a number of problems with the above. The biggest is trying to strip the input set down to only properties that are marked as required. The required flag is a fairly blunt tool that can't capture that some fields are only required sometimes based on the value of other fields. As such this stripping to just required properties causes many of the following calls to `Check` to raise check failures.

The next major issue is that we hard fail if check returns failures. There is always the risk of this happening due to limitations of `Read`, and it doesn't help the user just throwing an error.

Finally in the cases where the above two issues weren't hit this data flow had the odd result of setting optional fields to their default values. This isn't needed and these fields would be better left as blank.

The new import system aims to improve the described issues.

### The new import system

The engine will now issue the following steps to import resources:

1. Use the providers `Read` function to get the inputs and outputs for the resource.
2. Pass the input set to the providers `Check` method.
3. Warn if there are any check failures.
4. Save the input and output set from `Read` into the stacks state.
5. Pass the input set to the code generator to generate a `new Resource` call to match the imported state.

Note that we no longer end up with filled in default values in our final result, and we carry on in the face of check failures and so can still generate some code. If providers can give complete and accurate results from `Read` the above flow will result in correctly generated code. However it doesn't result in quite the correct stack state, this is due to how the data flow of our import system currently works. Currently we generate code based on the value of `inputs` in the state file, however normally the value stored at `inputs` in the state file is the result from `Check`, not what is directly in the users program. As such when you run the first `pulumi up` after an import your state file will change slightly as the engine calls `Check` and saves the inputs with defaults filled in. This should normally be transparent to the user, but there may be some cases where providers think this is a trivial diff.

There are two complications with fixing the above. The first is that during import if `Read` doesn't return valid results then `Check` can fail and so we won't have a property set returned from it that we can save to the state file. This case will always have to fall back to just storing the properties returned by `Read` and triggering a check failure during `up` that will need to be manually resolved. The second complication is that the code generation for import works off the state file rather than a separate data flow specifically for imported resources. We plan on improving this but in the spirit of agility we felt that a slightly better import feature today would be more useful to our users than a perfect import feature later.

We'll go through some examples comparing the old and new system in a bit.

### Terraform `Read`

Many of Pulumi's resource providers make use of Terraform providers. We call these bridged providers and all of them use our "terraform-bridge" library to translate between the Terraform API and Pulumi API.

Terraform currently has a slightly odd behavior that missing values for some properties are zero initialized by its `Refresh` method (what we use to implement Pulumi's `Read` method in the terraform bridge). This has the result that when Pulumi asks to read a given Terraform resource some top level properties (such as S3 buckets `acl` property) come back as missing, while other top level properties and all nested properties (such as S3 buckets `versioning.mfaDelete`) come back with some zero value.

For example reading an AWS S3 bucket object with the current Terraform bridge results in the following property set:

```
{
    "__defaults": [],
    "accelerationStatus": "",
    "arn": "arn:aws:s3:::my-bucket-3f85c54",
    "bucket": "my-bucket-3f85c54",
    "corsRules": [],
    "grants": [],
    "hostedZoneId": "Z3BJ6K6RIION7M",
    "lifecycleRules": [],
    "loggings": [],
    "objectLockConfiguration": null,
    "replicationConfiguration": null,
    "requestPayer": "BucketOwner",
    "serverSideEncryptionConfiguration": null,
    "tags": {
        "__defaults": []
    },
    "versioning": {
        "__defaults": [],
        "enabled": false,
        "mfaDelete": false
    },
    "website": null
}
```

We've made [a change](https://github.com/pulumi/pulumi-terraform-bridge/pull/453) to the Terraform bridge to try and elide these zero properties that _should_ just be missing. Reading the same S3 bucket with these changes gives the following much smaller property set:

```
{
    "__defaults": [],
    "arn": "arn:aws:s3:::my-bucket-3f85c54",
    "bucket": "my-bucket-3f85c54",
    "hostedZoneId": "Z3BJ6K6RIION7M",
    "requestPayer": "BucketOwner",
    "website": null
}
```

We'll continue to work on the Terraform bridge to give better results here. For example the `website` property on the bucket should probably be missing rather than null.

## Feedback

We're aware this could have a large impact to some of our users so we wanted to make sure we explained these changes well. If you have questions or worries about this change let us know at our community [Slack](https://slack.pulumi.com/) or [GitHub Discussions](https://github.com/pulumi/pulumi/discussions).
