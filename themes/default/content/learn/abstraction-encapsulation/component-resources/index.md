---
title: "Building a Component Resource"
layout: topic
date: 2021-11-17
draft: false
description: |
    Try creating a component resource, or a logical grouping of code that Pulumi
    recognizes as a resource. 
meta_desc: |
    Try creating a component resource, or a logical grouping of code that Pulumi
    recognizes as a resource. 
index: 3
estimated_time: 10
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - learn
links:
    - text: Component Resources
      url: https://www.pulumi.com/docs/intro/concepts/resources/#components
block_external_search_index: true
---

Now that we have a better understanding of why abstraction and encapsulation are valuable concepts for Pulumi programs, let's explore what happens when we start working in larger teams at scale.

A resource in Pulumi terms is basically a building block. That building block could be a base component like an `s3.Bucket` object that's managed by external providers like your favorite cloud provider. Alternatively, a resource could be a group of other resources that implements abstraction and encapsulation for reasons like defining a common pattern. This latter type of resource is called a [_Component Resource_]({{< relref "/docs/intro/concepts/resources#components" >}}) in Pulumi's terminology.

## Deciding to create a component resource

Why would you make a component resource instead of just a "simple" logical grouping that you can call and use? A component resource shows up in the Pulumi ecosystem just like any other resource. That means it has a trackable state, appears in diffs, and has a name field you can reference that refers to the entire grouping.

We've actually already started creating a component resource in the last part when we made a new class that built up an `s3.Bucket` and an `s3.BucketPolicy` with a `define_policy` function. Let's now turn that logical grouping into an actual component resource.

## Converting to a component resource

When we're converting to a component resource, we're subclassing (or composing from an anonymous field, if you're into Go) the `ComponentResource` so that our new component resource can get all of the lovely benefits of a resource (state tracking, diffs, name fields, etc.) that other resources have.

In Python, we subclass by using `super()` in the initialization of the class. This call ensures that Pulumi registers the component resource as a resource properly.

```python
import ...


class OurBucketComponent(pulumi.ComponentResource):
    def __init__(self, name, policy_name='default', opts=None):
        super().__init__('pkg:index:OurBucketComponent', name, None, opts)
        child_opts = pulumi.ResourceOptions(parent=self)
        policy_list = {
            'default': '{...}',
            'locked' : '{...}',
            'permissive': '{...}'
        }
        bucket = aws.s3.bucket(name)
        def define_policy(policy_name):
            try:
                if policy_name in policy_list.keys():
                    json_data = policy_list[f"{policy_name}"]
                return json.dumps(json_data)
            except Exception as err:
                raise err
        bucket_policy = aws_classic.s3.BucketPolicy(
            name,
            bucket=bucket.id,
            policy=bucket.arn.apply(lambda arn: define_policy(policy_name)),
            opts=pulumi.ResourceOptions(parent=bucket)
        )
        self.register_outputs({
            "bucket_name": bucket.bucket_name
        })
```

Within `super()`'s init, we pass in a name for the resource, which we recommend being of the form `<package>:<module>:<type>` to avoid type conflicts since it's being registered alongside other resources like the Bucket resource we're calling (`aws:s3:Bucket`).

That last call, `self.register_outputs({})`, passes Pulumi the expected outputs so Pulumi can read the results of the creation or update of a component resource just like any other resource, so don't forget it! You can register default outputs using this call, as well. It's not hard to imagine we will always want the bucket name for our use case, so we pass that in as an always-given output for our component resource.

---

Congratulations! You've now finished this pathway on abstraction and encapsulation in Pulumi programs! In this pathway, you've learned about thinking of code in abstract forms, wrapping up logical groupings of code to make reuse easier, and building with component resources to make those logical groupings something that Pulumi recognizes.

Go build new things, and watch this space for more learning experiences with Pulumi!
