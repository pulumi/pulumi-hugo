---
title: "The Easier Way to Create Pulumi Providers in Go"
authors: ["kyle-dixler"]
tags: ["go", "packages"]
meta_desc: "We are thrilled to announce a major update to the Pulumi Provider Boilerplate that simplifies the provider development process."
date: "2023-01-03"
---

We are extremely excited to announce a new version of the Pulumi Go Provider Boilerplate [(view on GitHub)](https://github.com/pulumi/pulumi-provider-boilerplate)!

This is a major update that brings a wealth of usability improvements to the Pulumi Provider Boilerplate by incorporating our brand new Pulumi Go Provider SDK.

**Note:** This update will not have any impact on existing providers that are utilizing the previous version of the repository.

For those who may not be familiar with provider authoring, it involves two distinct parts:
1. Provider implementation
2. SDK generation

Provider implementation requires creating a gRPC server that supports CRUD (create, read, update, delete) operations on resources.
SDK generation, on the other hand, involves creating libraries for a Pulumi program to build and utilize these resources.

In the past, using the old provider boilerplate could be somewhat confusing because you had to consider both the implementation of your provider's resources
as well as the handling of gRPC requests that were being sent to the provider by Pulumi.
On top of that, you also had to figure out how to generate the necessary SDKs so that you could consume these resources in a Pulumi program.

We have made the process much simpler with our new code-first approach.
Now, you can implement your provider in Go by defining the provider's metadata, resources, and functions, and then compiling the provider binary.
The Pulumi CLI will then use this binary to generate all necessary SDKs with the simple command `pulumi package gen-sdk <path/to/provider-binary>`.

For a more in-depth example of how this works, the command provider [(view on GitHub)](https://github.com/pulumi/pulumi-command/) has been
rewritten to take full advantage of the new Pulumi Go SDK and provides a useful example of how to utilize various features.

We encourage everyone to try the new authoring experience, including those who may have previously found it challenging in comparison to the ease of program authorship. Thank you for your support.
