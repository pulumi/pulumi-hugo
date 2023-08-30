---
title_tag: Stack Outputs and References | Learn Pulumi
title: "Stack Outputs and References"
layout: topic
date: 2021-09-20T08:33:14-05:00
draft: false
description: Learn more about exporting and referencing stack outputs in Pulumi.
meta_desc: Learn more about exporting and referencing stack outputs in Pulumi.
index: 2
estimated_time: 10
meta_image: meta.png
authors:
    - torian-crane
tags:
    - aws
    - fundamentals
    - resources
    - stack-outputs
    - stack-references
---

One of Pulumi's powerful features is the ability to work with inputs and outputs. This enables developers to model dependencies between resources and even stacks.

In this tutorial, we'll demonstrate how to export values from a stack by creating an simple AWS Lambda Function that will write a file to an S3 bucket. You will then create an EventBridge Scheduler resource in a new stack that will reference the Lambda function from the first stack to run it on a scheduled basis. 

## Pre-Requisites

{{< tutorials/prereqs-aws >}}

## Understanding Outputs

Every Pulumi resource has outputs, which are properties of that resource whose values are generated during deployment. We can export these values as stack outputs, and they can be used for important values like resource IDs, computed IP addresses, and DNS names.

These outputs are shown during an update, can be easily retrieved with the Pulumi CLI, and are displayed in the Pulumi Cloud. In this tutorial, we will be retrieving outputs via the CLI.

### Create a New Project

{{< tutorials/create-new-proj >}}

{{< chooser language "typescript,python,yaml" / >}}

{{% choosable language typescript %}}

```typescript
{{< loadcode "code/typescript/baseline.txt" >}}
```

{{% /choosable %}}

{{% choosable language python %}}

```python
{{< loadcode "code/python/baseline.py" >}}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
{{< loadcode "code/yaml/baseline.yaml" >}}
```

{{% /choosable %}}

### Create an S3 Bucket Resource

Next, we will define a simple S3 bucket as shown below.

{{< chooser language "typescript,python,yaml" / >}}

{{% choosable language typescript %}}

```typescript
{{< loadcode "code/typescript/create-s3-bucket.txt" >}}
```

{{% /choosable %}}

{{% choosable language python %}}

```python
{{< loadcode "code/python/create-s3-bucket.py" >}}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
{{< loadcode "code/yaml/create-s3-bucket.yaml" >}}
```

{{% /choosable %}}

The `pulumi.export()` function

We will take the output of our S3 resource and use it as an input to another resource in the next step.

## Understanding Inputs

Inputs typically represent the parameters for the underlying API call of any resource managed by Pulumi.

The simplest way to create a resource with its required inputs is to use a plain value. This is usually a standard string, boolean, integer or other typed value or data structure in your language of choice.

However, as you build programs in Pulumi, you will often need a resource's input to reference values from another resource.

### Create a Lambda Function

We will now create a Lambda function that will be used to write a file to our S3 bucket. The function resource will need to know which bucket to write to, and we can get this value from the output we previously created.

{{< chooser language "typescript,python,yaml" / >}}

{{% choosable language typescript %}}

```typescript
{{< loadcode "code/typescript/create-lambda-function.txt" >}}
```

{{% /choosable %}}

{{% choosable language python %}}

```python
{{< loadcode "code/python/create-lambda-function.py" >}}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
{{< loadcode "code/yaml/create-lambda-function.yaml" >}}
```

{{% /choosable %}}

## Using Stack References

Stack references allow you to access the outputs of one stack from another stack. Inter-Stack Dependencies allow one stack to reference the outputs of another stack.

To reference values from another stack, create an instance of the StackReference type using the fully qualified name of the stack as an input, and then read exported stack outputs by their name:

### Read the Contents of the S3 Bucket

Use docs to make custom IAM role for Lambda function and give it only read permissions (test their ability to use apply)

Make an eventbridge to trigger the Lambda on a schedule? (test ability to use apply)
Lambda can read the files and if bucket not empty, delete?

## Clean Up

{{< cleanup >}}

## Next Steps

In this tutorial, you ...

To learn more about creating resources in Pulumi, take a look at the following resources:

- Learn more about [inputs and outputs](https://www.pulumi.com/docs/concepts/inputs-outputs/) in the Pulumi documentation.
- Learn more about [stacks and stack references](https://www.pulumi.com/docs/concepts/stack/#stackreferences) in the Pulumi documentation.
- Learn more about [resource options](https://www.pulumi.com/docs/concepts/options/), and [providers](https://www.pulumi.com/docs/concepts/resources/providers/) in the Pulumi documentation.
