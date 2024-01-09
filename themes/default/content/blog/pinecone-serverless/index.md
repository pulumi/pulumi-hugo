---
title: "Pinecone Provider Now Available for Pulumi"
date: 2023-10-09T00:00:00-00:00
draft: true
meta_desc: "Seamlessly integrate and manage your Pinecone indexes with the official Pulumi Pinecone provider."
meta_image: meta.png
authors:
- engin-diri
tags:
- pinecone
- provider
- serverless

---

## What is Pinecone?

[Pinecone](https://www.pinecone.io/) is a fully managed vector database with an easy-to-use API that allows you to build
and deploy high-performance AI applications. Any applications that involves large language models, generative AI, and
semantic search requires a vector database to store and retrieve vector embeddings. Vector embeddings allow AI
applications to gain a deeper understanding of the data and maintain a long-term memory to draw upon.

The backbone of Pinecone is a vector index that allows you to store and retrieve vector embeddings. What makes Pinecone
indexes so powerful is that they are low-latency for billions of vectors.

Since xxx, Pinecone offers now next to their pod-based index also serverless indexes. Taking out the need to plan for
pod types and sizes, and allowing you to scale up and down as needed.

## Pulumi Pinecone Provider

With the new launch of Pinecone Provider for Pulumi, you can now seamlessly integrate and manage your Pinecone indexes
using any language of Pulumi Infrastructure as Code. Offering you an easy way to create, update, and delete your indexes
inside Pinecone while having additionally the ability to hook onto Pulumis vast ecosystem of different providers to
create a unique and powerful developer experience.

## Getting Started

Using the Pinecone Provider for Pulumi is easy. You can find the documentation for Pinecone Provider in
the [Pulumi Registry](https://www.pulumi.com/registry/packages/pinecone/).

Additionally, we have created several starter templates for you to get started with Pinecone and Pulumi. The starter
templates cover all the supported languages of Pulumi.

### Deploying a Pinecone Index

```shell
pulumi new pinecone-serverless<language>
```

Will create a new Pulumi project with a Pinecone serverless index. Let's take a look at the Python example:

```python
import pulumi
import pulumi_pinecone as pinecone

my_pinecone_index = pinecone.PineconeIndex("my-first-pinnecone-index",
                                           name="example-index",
                                           dimension=512,
                                           metric=pinecone.IndexMetric.COSINE,
                                           spec=pinecone.PineconeSpecArgs(
                                               serverless=pinecone.PineconeServerlessSpecArgs(
                                                   cloud=pinecone.ServerlessSpecCloud.AWS,
                                                   region="us-west-2",
                                               ),
                                           ))
pulumi.export("output", {
    "value": my_pinecone_index.host,
})
```

In this example, we define a new Pinecone index with the name `example-index` and a dimension of `512`. As distance
metric we use `cosine` and we define the index to be serverless and should be deployed in `us-west-2` region of AWS.

To deploy this example, you need to set your Pinecone API key as an environment variable:

```shell
export PINECONE_API_KEY="xxxxx-xxxx-xxxx-xxxx-xxxxx"
```

Then you can run the following commands to deploy the example:

```shell
pulumi up
```

This will give you a preview of the changes that will be applied to your Pinecone account. If you are happy with the
changes, you can confirm them by typing `yes`. This will create the Pinecone index and output the host name of the index
to use in your application.

```shell
...
```

### Deleting a Pinecone Index

As simple as it is to create a Pinecone index, it is also to delete it. You can delete a Pinecone index by running the
following command:

```shell
pulumi destroy
```

This will delete the Pinecone index for you. Be aware that this will also delete all the data stored in the index.

### Programmatically Creating a Pulumi Pinecone Provider

There are situations where you want to create a Pinecone index programmatically as part of multiple providers in one
Pulumi program. Imagine you want to create some additional infrastructure in AWS or a GitHub repository for your
application. You can do this by creating a Pinecone index programmatically as part of your Pulumi program.

```python
import pulumi
import pulumi_pinecone as pinecone

# cut other providers for brevity

pineconeProvider = pinecone.Provider("pinecone", api_key="xxxxx-xxxx-xxxx-xxxx-xxxxx")

# use the provider to create a Pinecone index by passing it as an argument
my_pinecone_index = pinecone.PineconeIndex("my-first-pinnecone-index",
                                           name="example-index",
                                           dimension=512,
                                           metric=pinecone.IndexMetric.COSINE,
                                           spec=pinecone.PineconeSpecArgs(
                                               serverless=pinecone.PineconeServerlessSpecArgs(
                                                   cloud=pinecone.ServerlessSpecCloud.AWS,
                                                   region="us-west-2",
                                               ),
                                           ),
                                           provider=pineconeProvider)
```

## Conclusion

As shown in this blog post, the Pinecone Provider for Pulumi allows you to seamlessly integrate and manage your Pinecone
indexes using any language of Pulumi Infrastructure as Code. This allows platform engineers or developers to maintain
easy to manage and reproducible infrastructure as code for their Pinecone indexes.

As always, we welcome your feedback and contributions in the Pulumi Community Slack, GitHub repository, and Pulumi Community Discussions.

New to Pulumi? Signing up is easy and free. Get started today!

Happy AI building!

