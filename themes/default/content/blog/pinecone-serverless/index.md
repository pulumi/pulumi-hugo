---
title: "Pinecone Provider Now Available for Pulumi"
date: 2024-01-09T00:00:00-00:00
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

## What is Pinecone (Serverless)?

[Pinecone](https://pinecone.io/) is a fully managed vector database with an easy-to-use API that allows you to build and deploy high-performance AI applications. Applications involving large language models, generative AI, and semantic search require a vector database to store and retrieve vector embeddings. Vector embeddings enable AI applications to gain a deeper understanding of the data and maintain a long-term memory to draw upon.

The backbone of Pinecone is a vector index that allows you to store and retrieve vector embeddings. What makes Pinecone indexes so powerful is their low latency for billions of vectors.

Since xxx, Pinecone now offers, alongside their pod-based index, serverless indexes as well. This eliminates the need to plan for pod types, shards, or sizes, allowing you to scale up and down as needed. A nice bonus: it's radically cheaper due to the "pay for what you use" pricing model.

## Pulumi Pinecone Provider

With the launch of the Pinecone Provider for Pulumi, you can now seamlessly integrate and manage your Pinecone Serverless indexes using any of the Pulumi supported languages. This offers an easy way to create, update, and delete your indexes inside Pinecone using Infrastructure as Code, while also having the ability to hook onto Pulumi's vast ecosystem of different providers to create a unique and powerful developer experience.

## Getting Started

Using the Pinecone Provider for Pulumi is as easy as it can be. You can install the Pinecone Provider following the documentation for the Pinecone Provider in the [Pulumi Registry](https://www.pulumi.com/registry/packages/pinecone/) or by using dedicated starter templates.

The starter templates are specially designed for you to bootstrap a Pulumi program with a Pinecone index. Once you have your bootstrap program, you can use this as a starting point to create your own Pinecone Serverless indexes.

### Deploying a Pinecone Serverless Index using a Pulumi Starter Template

```shell
pulumi new pinecone-serverless-<language>
```

Will create a new Pulumi project with a Pinecone serverless index. Let's take a look at the Python example:

```shell
pulumi new pinecone-serverless-python
```

This will create a new Pulumi project and all the necessary files to deploy a Pinecone index. The `__main__.py file contains the following code:

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

In this example, we define a new Pinecone Serverless index with the name example-index and a dimension of 512. We use cosine as the distance metric and define the index to be serverless and to be deployed in the us-west-2 region of AWS.

To deploy this example, you need to set your Pinecone API key as an environment variable:

```shell
export PINECONE_API_KEY="xxxxx-xxxx-xxxx-xxxx-xxxxx"
```

Then you can run the following Pulumi command to deploy the example:

```shell
pulumi up
```

You will get a preview of the changes that will be applied to your Pinecone account. If you are happy with the changes, you can confirm them by typing `yes`. This will create the Pinecone index and output the host name of the index to use in your application.

```shell
...
```

### Deleting a Pinecone Index

Deleting a Pinecone index is as simple as creating one. You can delete a Pinecone index by running the following command:

```shell
pulumi destroy
```

This will delete the Pinecone index for you. Be aware that this will also delete all the data stored in the index.

### Programmatically Creating a Pulumi Pinecone Provider

There are situations where you might want to create a Pinecone index programmatically as part of multiple providers in one Pulumi program. Imagine creating additional infrastructure in AWS or a GitHub repository for your application. You can do this by creating a Pinecone index programmatically as part of your Pulumi program.

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

As shown in this blog post, the Pinecone Provider for Pulumi allows you to seamlessly integrate and manage your Pinecone indexes using any Pulumi-supported language. This enables platform engineers and developers to maintain easily manageable and reproducible infrastructure as code for their Pinecone indexes.

As always, we welcome your feedback and contributions in the Pulumi Community Slack, GitHub repository, and Pulumi Community Discussions.

New to Pulumi? Signing up is easy and free. Get started today!

Happy AI building!
