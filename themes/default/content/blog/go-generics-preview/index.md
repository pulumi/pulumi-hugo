---
title: "Using Go Generics with Pulumi"
date: 2023-09-19
draft: false
meta_desc: "TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO"
meta_image: meta.png
authors:
    - zaid-ajaj
tags:
    - go
    - aws
---

Generics in the Go programming language were introduced in version 1.18, this feature would allow developers to write type-safe, concise and reusable code in their programs. Today we are excited to announce that we will be introducing support for Go generics in the core Pulumi SDK, starting from v3.80. Moreover, we are rolling out a preview for Go generics in a few of our main cloud provider SDKs for AWS, Azure-Native, Google Cloud and Kubernetes.

<!--more-->

Generated Go SDKs with generics will provide simpler APIs to work with, method accessors for nested properties and their values as well as type-safe utilities for manipulating and transforming output types of Pulumi as we will see in the following sections.

## The pulumix subpackage

Starting from v3.80 of the Pulumi Go SDK, we have added a new subpackage called `pulumix` which includes the new generic types `pulumix.Input[T]` and `pulumix.Output[T]` as well as type-safe generics-based APIs and combinators to work with them such as `pulumix.Apply`, `pulumix.Flatten`, etc. These types would allow us to better model the generated Go SDKs for the various providers. For example: instead of `pulumi.IntInput` or `pulumi.StringOutput` we would have `pulumix.Input[int]` and `pulumix.Output[string]`, etc. The full API is documented in the [RFC](https://github.com/pulumi/pulumi/discussions/13057) we published prior to the implementation. Here is an example of using these APIs

```go
package main

import (
	"fmt"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumix"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		bucketDomainName := pulumix.Val("example.com")
		bucketEndpoint := pulumix.Apply(bucketDomainName, func(domainName string) string {
			return fmt.Sprintf("https://%s", domainName)
		})

		ctx.Export("endpoint", bucketEndpoint)
	      return nil
	})
}
```

Notice here how we are importing `pulumix` alongside `pulumi`. Being a subpackage means you will be able to use these generics-based types and functions alongside the current APIs as necessary without having to switch your code fully from using the old types to the new generic ones. Instead, you migrate your code gradually to using these new APIs.

In the example above, we are creating a value called `bucketDomainName` which is of type `pulumix.Output[string]` using the `pulumix.Val` function. This function takes a value of type `T` and lifts it into `pulumix.Output[T]`. Similarly, there is a function called `pulumix.Ptr` which takes a value of type T and gives you `pulumix.Output[*T]` back. These functions replace the old `pulumi.String`, `pulumi.StringPtr`, `pulumi.Int`, `pulumi.Bool` etc. functions.

Once we have a value of type `pulumix.Output[T]` we can use `pulumix.Apply` to transform it. This is a type-safe version of `pulumi.ApplyT` where you give it the output, as well as a function to transform that out. In the example above, we gave it a function of type `func(string) string`. Notice here the type of the input of the function provided must match the type `T` of the value of type `pulumix.Output[T]`. If we provided a function of type `func(int) string`, it would not compile because the types are incompatible.

Sidenote: for an ideal experience using the new APIs we recommend using Go v1.21 or later since it has better type-inference support for generics.

## Generics-Based Cloud Provider SDKs

On its own, the pulumix package is not that useful in combination with the current Go SDKs. Of course, there are APIs to convert between generics-based APIs to old ones and vice-versa using functions such as `pulumix.Cast` and `pulumix.ConvertTyped`. However, to leverage `pulumix` to its full potential, it is ideally used in combination with the new generics-based Go SDKs. For our main cloud providers, we have rolled out preview, non-breaking versions which include generics-based APIs for all the resources, functions and types.

To make the transition non-breaking and gradual for your Pulumi programs, we are publishing generics-based variants of the Go SDKs as subpackages under a directory called `x` so that you can migrate your code resource by resource.

## Migrating an AWS Program to leverage Go generics

The following example is an AWS Pulumi program which we will migrate into the generics-based API. Here is what pulumi new aws-go gives you today:

```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v6/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		// Create an AWS resource (S3 Bucket)
		bucket, err := s3.NewBucket(ctx, "my-bucket", &s3.BucketArgs{
			Website: &s3.BucketWebsiteArgs{
				IndexDocument: pulumi.String("index.html"),
			},
    	})
		if err != nil {
			return err
		}

		// Export the name of the bucket
		ctx.Export("bucketName", bucket.ID())
		return nil
	})
}
```

To start using the generics-based version of the S3 module from AWS, you need to change the import from `"https://github.com/pulumi/pulumi-aws/sdk/v6/go/aws/s3"` to `"https://github.com/pulumi/pulumi-aws/sdk/v6/go/aws/x/s3"` (Notice the `x` after `aws/`), then change input values to use `pulumi.Ptr` instead of `pulumi.String`.

```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v6/go/aws/x/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumix"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		// Create an AWS resource (S3 Bucket)
		bucket, err := s3.NewBucket(ctx, "my-bucket", &s3.BucketArgs{
			Website: &s3.BucketWebsiteArgs{
				IndexDocument: pulumix.Ptr("index.html"),
			},
		})
		if err != nil {
			return err
		}

		// Export the name of the bucket
		ctx.Export("bucketName", bucket.ID())
		return nil
	})
}
```

The changes look minimal, except the fact that the inputs of `s3.BucketArgs` and the outputs of `Bucket` are now fully generics-based. Here is the `Bucket` type you get from `NewBucket`:

```go
type Bucket struct {
	pulumi.CustomResourceState
	AccelerationStatus pulumix.Output[string] `pulumi:"accelerationStatus"`
	Acl pulumix.Output[*string] `pulumi:"acl"`
	Arn pulumix.Output[string] `pulumi:"arn"`
	Bucket pulumix.Output[string] `pulumi:"bucket"`
	// ....
}
```

And here are its input arguments:

```go
type BucketArgs struct {
	AccelerationStatus pulumix.Input[*string]
	Acl pulumix.Input[*string]

	Arn pulumix.Input[*string]
	Bucket pulumix.Input[*string]
	// ...
}
```

## Authoring Generics-based Go SDKs

For Pulumi package authors, it is possible to start generating Go SDKs for your providers that include the generics-based variant under the x subdirectory. By default, this is not enabled so you will have to explicitly opt into it using a specific option in the go language section of your Pulumi schema. The new option is called `"generics"` and it has three possible values:

- `"none"` is the default value when the option is not set. This doesn’t generate the generics-based variant
- `"side-by-side"` is the option we are using for our select providers which generates the variant under the x subdirectory.
- `"generics-only"` if you want your provider to only emit generics-based APIs. Since this is a preview feature, things might still be rough around the edges, so use this option with caution as fixes in the SDK-generation code might result in breaking changes in your APIs.

Here is how this looks like in JSON:

```json
{
   "language": {
       "go": {
           "generics": "side-by-side"
        }
   }
}
```

## Feedback highly appreciated

We are very excited for you to try out these new APIs. Generics-based Go SDKs have been one of the most requested features by our large customers who use Pulumi daily and want to leverage the latest features of the language. We would love to hear your feedback about this new feature as we continue to improve the developer experience for everyone using Pulumi.
