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

To start, let's create a new folder in our project named `s3_writer`. Inside of this folder, we'll create a file named `lambda_function.py` and populate it with code that will write a simple `.txt` file to our bucket.

```python
{{< loadcode "code/lambda-code.py" >}}
```

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

### Export Resource Values

Now that we have our project resources defined, we can use the `pulumi.export("<output-name>", <output-value>)` function to export values from our program. It takes two arguments:

| Argument | Description |
|--------------|-------------|
| output-name | This is the name we will use to identify our output value |
| output-value | This is the actual value of our output |

To demonstrate how this works, let's export the names of our Lambda function and S3 bucket. The [Pulumi documentation](https://www.pulumi.com/registry/packages/aws/api-docs/lambda/function/#outputs) provides more information about what properties are available to export for each resource.

We can reference both our Lambda function name and bucket name via their `id` property, and we'll update our code to reflect that as shown below:

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

```bash
Previewing update (dev):

     Type                      Name                     Plan
 +   pulumi:pulumi:Stack     inputs-outputs-dev         create     
 +   ├─ aws:iam:Role         s3-writer-role             create     
 +   ├─ aws:s3:Bucket        my-bucket                  create     
 +   └─ aws:lambda:Function  s3-writer-lambda-function  create    

Outputs:
    lambdaName: output<string>
    bucketName: output<string>

Resources:
    + 4 to create

Do you want to perform this update? yes
Updating (dev):

     Type                      Name                     Status
 +   pulumi:pulumi:Stack     inputs-outputs-dev         created (18s)     
 +   ├─ aws:iam:Role         s3-writer-role             created (1s)      
 +   ├─ aws:s3:Bucket        my-bucket                  created (1s)      
 +   └─ aws:lambda:Function  s3-writer-lambda-function  created (13s)   

Outputs:
    lambdaName: "s3-writer-lambda-function-981d4fa"
    bucketName: "my-bucket-4fb1589"

Resources:
    + 4 created

Duration: 20s
```
We can see that the outputs we've created have been provided as a part of the update process. We'll access these outputs via the CLI in the next steps of the tutorial.

### Access Outputs via the CLI

Now that our resources are deployed, let's kick off our Lambda to S3 file writing process.

The first thing we will do is validate that our S3 bucket is empty. We can use the following [AWS CLI command](https://docs.aws.amazon.com/cli/latest/reference/s3api/list-objects-v2.html) to list all of the objects in our bucket:

```bash
aws s3api list-objects-v2 --bucket <bucket_name>
```

We will want to replace `<bucket_name>` with the actual name of our S3 bucket. While we can manually provide the name of our bucket, we can also programmatically reference our bucket name via the stack outputs.

We'll do this by using [`pulumi stack output`](https://www.pulumi.com/docs/concepts/stack/#outputs) command and provide the name of our output as shown below:

```bash
aws s3api list-objects-v2 --bucket $(pulumi stack output bucketName)
```

Right now, our bucket is empty, so the response of this command should look like the following:

```bash
{
    "RequestCharged": null
}
```

Now, let's trigger our Lambda functionso that it will write a new file to the bucket. We will use the [`aws lambda invoke` command](https://docs.aws.amazon.com/cli/latest/reference/lambda/invoke.html) and pass our Lambda function name to the `--function-name` option as shown below:

```bash
aws lambda invoke \
    --function-name $(pulumi stack output lambdaName) \
    --invocation-type Event \
    --cli-binary-format raw-in-base64-out \
    --payload '{ "test": "test" }' \
    response.json && cat response.json
    
{
    "StatusCode": 202
}
```

We can verify the outcome of this function execution by running the same `list-objects-v2` from before to check our S3 bucket. This time, we should see output similar to the following:

```bash
{
    "Contents": [
        {
            "Key": "2023-08-3107:53:28.137776_test_file.txt",
            "LastModified": "2023-08-31T07:53:29+00:00",
            "ETag": "\"f794802bfd4a70851294ba192d382c11\"",
            "Size": 13,
            "StorageClass": "STANDARD"
        }
    ],
    "RequestCharged": null
}
```

We can now see the `.txt` file that was written to this bucket in the `Key` field of the response object.

We have seen how we can reference our output values from the CLI. Now let's take a look at how we can do the same from within another stack.

## Using Stack References

Stack references allow you to access the outputs of one stack from another stack. This enables developers to create resources even when there are inter-stack dependencies.

To reference values from another stack, we will need to create an instance of the StackReference type using the fully qualified name of the stack as an input, and then read exported stack outputs by their name:

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
