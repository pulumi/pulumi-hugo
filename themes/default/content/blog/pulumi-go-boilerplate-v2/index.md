---
title: "The Easier Way to Create Pulumi Providers in Go"
authors: ["kyle-dixler"]
tags: ["go", "packages"]
meta_desc: "We are thrilled to announce a major update to the Pulumi Provider Boilerplate that simplifies the provider development process."
date: "2023-01-03"
---

## Background

The Pulumi Provider Boilerplate [(view on GitHub)](https://github.com/pulumi/pulumi-provider-boilerplate) is a template repository
that contains a minimal example of a working provider and has served as a starting point for writing your own provider.

For those who may not be familiar with provider authoring, it involves two distinct parts:

1. Provider implementation
2. SDK generation

Providers are implemented as gRPC servers that handle requests to perform CRUD (create, read, update, delete) operations on resources on behalf of the Pulumi engine.
SDK generation, on the other hand, involves generating source code libraries for a Pulumi program to utilize the provided resources.

In the past, implementing a provider using the old provider boilerplate could be difficult because you had to implement:

- your provider's resources
- the gRPC server
- SDK code generation to consume these resources in a Pulumi program

## New Provider Boilerplate

We are excited to announce that we've updated the Pulumi Provider Boilerplate to make this easier!

**Note:** This update will not have any impact on existing providers that are utilizing an older version of the repository.

This major update brings a wealth of usability improvements to the Pulumi Provider Boilerplate by incorporating our brand
new Pulumi Go Provider SDK [(view on GitHub)](https://github.com/pulumi/pulumi-go-provider).
Now, you can implement your provider in Go by defining the provider's metadata, resources, and functions, and then building the provider binary.
The library takes care of the gRPC server for you and the Pulumi CLI takes care of the SDK code generation with the following command
`pulumi package gen-sdk <path/to/provider-binary>`.

You can leave the heavy lifting to us and focus on the implementation details that matter to your organization.

We encourage everyone to try the new authoring experience, including devs who may have previously found it challenging in comparison to the ease of program authorship.

## Additional Example

If the boilerplate and the docs aren't enough and you want a more involved example, the command provider [(view on GitHub)](https://github.com/pulumi/pulumi-command/) has been
rewritten to use it entirely and is heavily commented. You can actually compare the project before and after using the Pulumi Go Provider library to see how it has streamlined
provider implementation.
