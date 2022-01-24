---
title: "Understanding Encapsulation"
layout: topic
date: 2021-11-17
draft: false
description: |
    Explore encapsulation of cloud resources with Pulumi.
meta_desc: |
    Explore encapsulation of cloud resources with Pulumi.
index: 0
estimated_time: 10
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - learn
block_external_search_index: false
---

Encapsulation is one part of what makes a programming language so powerful. Without encapsulation, programs would still be sets of commands. Encapsulation is generally considered as part of an object-oriented paradigm, but it's present in other software development paradigms like functional programming (e.g., lexical closures). But what does this have to do with infrastructure? Well, by using encapsulation we break logic down into reusable components. In doing so, we ensure better maintainability, readability, and reusability&mdash;all critical to good infrastructure as code both in theory and in practice.

Breaking apart Pulumi code is essential to keeping a clean, well-organized, and easily maintained code base that enables teams to collaborate to enhance current systems. Over the course of these pathways, we've been pretending we're part of a fictional organization called Pulumipus (after Pulumi's beloved mascot), so let's imagine that we've now scaled beyond the basic boba shop from the Fundamentals series to an entire brand with many, many smaller organizations. As the owners of the infrastructure for the Pulumipus brand, we've got a lot of resources to maintain, and it's much better to reuse code that we write once rather than repeating ourselves continuously in our program and throughout all of the programs we maintain. To illustrate that, let's explore a practical example.

## Breaking apart Pulumi code

Let's take a fairly uncomplicated piece of Pulumi code: the definition of an s3 bucket:

```python
import pulumi
import pulumi_aws_native as aws_native

bucket = aws_native.s3.bucket("my-bucket")

pulumi.export("bucket", bucket.bucket_name)
```

Here, we're creating one resource and exporting the output from that resource. In practice however, production systems typically have more requirements than a storage object. We need access policies, for one. Depending on how you're using that storage, you might need networking and other resources, as well. All of these use cases for a storage object requires some kind of policy, though, so when thinking about encapsulating our storage object needs, we probably want to put those two together. Let's adjust our code accordingly:

```python
import json
import pulumi
import pulumi_aws as aws_classic
import pulumi_aws_native as aws_native

bucket = aws_native.s3.bucket("my-bucket")
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

Now, that's nice, but what if we need to make three different storage objects for three different use cases? We could start out by creating a resource grouping for the kind of resource we wanted to use:

```python
import ...


class OurBucketClass(self, name_me):
    bucket = aws_native.s3.bucket(f"{name_me}")
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

But that JSON blob of the policy is also an object which we can encapsulate, making our storage object class more usable outside of this specific context. Let's imagine we have a referenceable list of common access policies, perhaps a simple key:value store. In the store, keys are strings that are names of policies, and the values are JSON documents.

```python
import ...


class OurBucketClass(self, name_me, policy_name):

    policy_list = {
        'default': '{...}',
        'locked' : '{...}',
        'permissive': '{...}'
    }

    def define_policy(policy_name, bucket_id):
        try:
            json_data = policy_list[f"{policy_name}"]
            return bucket_id.arn.apply(lambda arn: json.dumps(json_data))
        except KeyError as err:
            add_note = "Policy name needs to be 'default', 'locked', or 'permissive'."
            print(f"Error: {add_note}. You used {policy_name}.")
            raise

    bucket = aws_native.s3.bucket(f"{name_me}")
    bucket_policy = aws_classic.s3.BucketPolicy(
        f"{name_me}-policy",
        bucket=bucket.id,
        policy=define_policy(policy_name, bucket.id)
        opts=pulumi.ResourceOptions(parent=bucket)
    )

```

In Pulumi, everything, including your resources, can be modeled, abstracted, and encapsulated just like anything in your programming language of choice. Why does that matter, or why should you care? The answer to that question is up next!
