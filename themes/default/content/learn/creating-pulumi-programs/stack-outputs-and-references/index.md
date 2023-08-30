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

In this tutorial, we'll demonstrate how to export values from a stack by creating a simple AWS Lambda Function that will write a file to an S3 bucket. You will then create an EventBridge Scheduler resource in a new stack that will run the Lambda function from the first stack on a scheduled basis. 

## Pre-Requisites

{{< tutorials/prereqs-aws >}}

## Understanding Stack Outputs

Every Pulumi resource has outputs, which are properties of that resource whose values are generated during deployment. We can export these values as stack outputs, and they can be used for important values like resource IDs, computed IP addresses, and DNS names.

These outputs are shown during an update, can be easily retrieved with the Pulumi CLI, and are displayed in the Pulumi Cloud. For the purposes of this tutorial, we will primarily be working from the CLI.

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

The first resource we will define in our project is a simple S3 bucket as shown below.

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

### Create a Lambda Function

The next resource we will create is a Lambda function with function code that will write a file to our S3 bucket. We will also include an IAM role for the Lambda to use when executing its function.

To start, let's create a new folder in our project named `s3_writer`. Inside of this folder, we'll create a file named `lambda_function.py` and populate it with the following code:

{{< chooser language "typescript,python,yaml" / >}}

{{% choosable language typescript %}}

```typescript
{{< loadcode "code/lambda-code.py" >}}
```

{{% /choosable %}}

{{% choosable language python %}}

```python
{{< loadcode "code/lambda-code.py" >}}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
{{< loadcode "code/lambda-code.py" >}}
```

{{% /choosable %}}

This code will write a simple `.txt` file to our bucket.

Now, we can add the [Lambda function resource definition](https://www.pulumi.com/registry/packages/aws/api-docs/lambda/function/) and its corresponding [IAM role](https://www.pulumi.com/registry/packages/aws/api-docs/iam/role/) to our project file.

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


### Export the Lambda ARN

Now that we have our project resources defined, we can use the `pulumi.export("<output-name>", <output-value>)` function to export values from our program. It takes two arguments:

| Argument | Description |
|--------------|-------------|
| output-name | This is the name we will use to identify our output value |
| output-value | This is the actual value of our output |

To demonstrate how this works, let's export the name of our Lambda function. The [Pulumi documentation](https://www.pulumi.com/registry/packages/aws/api-docs/lambda/function/#outputs) provides more information about what properties are available to export for each resource.

Referencing this, we can update our code to the following:

{{< chooser language "typescript,python,yaml" / >}}

{{% choosable language typescript %}}

```typescript
{{< loadcode "code/typescript/add-export.txt" >}}
```

{{% /choosable %}}

{{% choosable language python %}}

```python
{{< loadcode "code/python/add-export.py" >}}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
{{< loadcode "code/yaml/add-export.yaml" >}}
```
{{% /choosable %}}

### Deploy your Project Resources

Now let’s run the `pulumi up` command to preview and deploy the resources we've just defined in our project.

## Using Stack References

Stack references allow you to access the outputs of one stack from another stack. Inter-Stack Dependencies allow one stack to reference the outputs of another stack.

To reference values from another stack, create an instance of the StackReference type using the fully qualified name of the stack as an input, and then read exported stack outputs by their name:

### Log the Name of the Lambda Function

(TBD: This is to show how to reference an output across stacks)

### Run the Lambda Function on a Schedule

Try it Yourself: Make an eventbridge to trigger the Lambda on a schedule? test stack reference


## Clean Up

{{< cleanup >}}

## Next Steps

In this tutorial, you ...

To learn more about creating resources in Pulumi, take a look at the following resources:

- Learn more about [stacks ouputs and references](https://www.pulumi.com/docs/concepts/stack/#stackreferences) in the Pulumi documentation.
- Learn more about [Pulumi inputs and outputs](https://www.pulumi.com/docs/concepts/inputs-outputs/) in the Pulumi documentation.
