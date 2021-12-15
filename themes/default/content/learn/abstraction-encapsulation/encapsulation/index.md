---
title: "Understanding Encapsulation"
layout: topic
date: 2021-11-17
draft: false
description: |
    Explore encapsulation of cloud resources with Pulumi.
meta_desc: |
    Explore encapsulation of cloud resources with Pulumi.
index: 1
estimated_time: 10
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - learn
block_external_search_index: false
---

So we've explored a bit about abstraction. What about encapsulation?

Encapsulation is the logical conclusion of an abstracted system: Breaking logic
down into reusable components. In doing so, we ensure better maintainability,
readability, and reusability. To illustrate that, let's explore a practical
example.

## Breaking apart Pulumi code

Let's take a fairly uncomplicated piece of Pulumi code: the definition of an s3
bucket:

```python
import pulumi
import pulumi_aws_native as aws

bucket = aws.s3.bucket("my-bucket")

pulumi.export("bucket", bucket.bucket_name)
```

Here, we're creating one resource and exporting the output from that resource.
Generally, however, there's a lot more to building up infrastructure with a
storage object. We need access policies, for one. Depending on how you're using
that storage, you might need networking and other resources, as well. All of
these use cases for a storage object requires some kind of policy, though, so
when thinking about encapsulating our storage object needs, we probably want to
put those two together. Let's adjust our code accordingly:

```python
import json
import pulumi
import pulumi_aws as aws_classic
import pulumi_aws_native as aws

bucket = aws.s3.bucket("my-bucket")
bucket_policy = aws_classic.s3.BucketPolicy(
    "my-bucket-policy",
    bucket=bucket.id,
    policy=bucket.arn.apply(
        lambda arn: json.dumps({
            "Version": "2012-10-17",
            "Statement": [{
                "Effect": "Allow",
                "Principal": "*",
                "Action": [
                    "s3:GetObject"
                ],
                "Resource": [
                    f"{arn}/*"
                ]
            }]
        })
    ),
    opts=pulumi.ResourceOptions(parent=bucket)
)

pulumi.export("bucket", bucket.bucket_name)
```

Now, that's nice, but what if we need to make three different storage objects
for three different use cases? We could start out by creating a resource
grouping for the kind of resource we wanted to use:

```python
import ...


class OurBucketClass(self, name_me):
    bucket = aws.s3.bucket(f"{name_me}")
    bucket_policy = aws_classic.s3.BucketPolicy(
        f"{name_me}-policy",
        bucket=bucket.id,
        policy=bucket.arn.apply(
            lambda arn: json.dumps({
                "Version": "2012-10-17",
                "Statement": [{
                    "Effect": "Allow",
                    "Principal": "*",
                    "Action": [
                        "s3:GetObject"
                    ],
                    "Resource": [
                        f"{arn}/*"
                    ]
                }]
            })
        ),
        opts=pulumi.ResourceOptions(parent=bucket)
    )
```

But that JSON list of the policy is an object, too, that we can tuck away,
making our storage object class more usable outside of this specific context.
Let's imagine we have a referenceable list of common access policies, perhaps
a simple key:value store. In the store, keys are strings that are names of
policies, and the values are JSON documents.

```python
import ...


class OurBucketClass(self, name_me, policy_name):

    policy_list = {
        'default': {...},
        'locked' : {...},
        'permissive': {...}
    }

    def define_policy(policy_name, bucket_id):
        try:
            for policy_name in policy_list:
                json_data = policy_list[f"{policy_name}"]
            return bucket_id.arn.apply(lambda arn: json.dumps(json_data))
        except Exception as err:
            raise err

    bucket = aws.s3.bucket(f"{name_me}")
    bucket_policy = aws_classic.s3.BucketPolicy(
        f"{name_me}-policy",
        bucket=bucket.id,
        policy=define_policy(policy_name, bucket.id)
        opts=pulumi.ResourceOptions(parent=bucket)
    )

```

In Pulumi, everything, including your resources, can be modeled, abstracted, and
encapsulated just like anything in your programming language of choice. Why does
that matter, or why should you care? The answer to that question is up next!
