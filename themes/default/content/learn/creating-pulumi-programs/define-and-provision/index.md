---
title_tag: Defining and Provisioning Resources | Learn Pulumi
title: "Defining and Provisioning Resources"
layout: topic
date: "2023-08-05"
draft: false
description: Learn how to define infrastructure with Pulumi resources.
meta_desc: Learn what a resource is, how resources work within Pulumi, and how to create, update, and delete resources in this tutorial.
index: 1
estimated_time: 10
authors:
    - torian-crane
tags:
    - resources
    - aws
    - python
    - nginx
---

{{< youtube oq94DSPMmlY >}}

In Pulumi, [resources](/docs/concepts/resources) represent the fundamental units that make up your infrastructure, such as virtual machines, networks, storage, and databases. A resource is used to define and manage an infrastructure object in your Pulumi configuration.

In this tutorial, we'll demonstrate how to create a simple Nginx web server. You will then refer to documentation in the Pulumi Registry to create a security group resource to make the application publically accessible.

## Pre-Requisites

{{< tutorials/prereqs-aws >}}

## Create a Virtual Machine

The first step is to create a virtual machine resource that will be used to host the web server. The specific details of how to create your virtual machine differ by cloud provider. For the purposes of this tutorial, we will be creating our resources in AWS in the `us-east-1` region.

### Amazon Elastic Compute Cloud (EC2)

Amazon Elastic Compute Cloud (EC2) provides managed virtual server hosting that makes it straightforward to run applications in your AWS account. In AWS, a virtual server is referred to as an "instance". These instances can host a variety of operating systems, tools, and applications, each configured according to your specific requirements.

#### Create a New Project

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

### Define an EC2 Instance

The Pulumi Registry provides the documentation for all of the Pulumi providers and their associated resources. Open the [`aws.ec2.Instance` documentation page](/registry/packages/aws/api-docs/ec2/instance) to view a description of this resource, example usage, the resource definition, and supported properties.

We will now define our EC2 instance resource below.

{{< chooser language "typescript,python,yaml" / >}}

{{% choosable language typescript %}}

```typescript
{{< loadcode "code/typescript/create-ec2.txt" >}}
```

{{% /choosable %}}

{{% choosable language python %}}

```python
{{< loadcode "code/python/create-ec2.py" >}}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
{{< loadcode "code/yaml/create-ec2.yaml" >}}
```

{{% /choosable %}}

All resources have a required [`name`](https://www.pulumi.com/docs/concepts/resources/names/) argument. Each resource has both a [logical name](https://www.pulumi.com/docs/concepts/resources/names/#logicalname) and a [physical name](https://www.pulumi.com/docs/concepts/resources/names/#autonaming).

The logical name is how the resource is known inside Pulumi. This is the value provided to the required `name` argument.

The physical name is the name used for the resource in the cloud provider that a Pulumi program is deploying to. It is a combination of the logical name plus a random suffix which helps to prevent resource naming collisions.

In the above example, the logical name for our `aws.ec2.Instance` resource is **"webserver-www"**, and the physical name might typically look something like **"webserver-www-d7c2fa0"**

In addition to names, resources have properties and options.

**Properties** are used to specify what type of resource to create. Properties are often resource-specific, and they can be required or optional depending on the specifications of the provider.

The properties inside our `aws.ec2.Instance` resource are:

| Property | Description |
|--------------|-------------|
| **instance_type** | tells the AWS provider to create an EC2 instance of type/size `t2.micro` |
| **ami** | tells the provider to create the instance using the `ami-09538990a0c4fe9be` machine image |
| **user_data** | tells the provider to initialize the instance with the script we have defined |

**Options** let you control certain aspects of a resource (such as showing explicit dependencies or importing existing infrastructure). We do not have any options defined for this resource, but you can learn more about options in the [Pulumi documentation](/docs/concepts/options).

### Deploy your EC2 Instance

Now let's run the `pulumi up` command to preview and deploy the resource we just defined in our project.

```bash
Previewing update (webserver-dev):

     Type                      Name                     Plan
 +   pulumi:pulumi:Stack       myproject-webserver-dev  create
 +   └─ aws:ec2:Instance       webserver-www            create

Resources:
    + 2 to create

Do you want to perform this update? yes
Updating (webserver-dev):

     Type                      Name                     Status
 +   pulumi:pulumi:Stack       myproject-webserver-dev  created
 +   └─ aws:ec2:Instance       webserver-www            created

Outputs:
    publicIp      : "34.217.110.29"

Resources:
    + 2 created

Duration: 17s
```

The public IP address of your instance has been provided for you as an output, and you can use this to access your web server. However, if you try to visit this address, your request will eventually time out. This is because we have not yet configured web traffic access for our instance. We will do this by creating our security group resource.

## Create a Security Group

In this section, you will use Pulumi documentation to configure the security group on your own. The security group must allow web traffic on port 80 in order for you to access your web server.

An updated version of the project code has been provided below as a starting point.

{{< chooser language "typescript,python,yaml" / >}}

{{% choosable language typescript %}}

```typescript
{{< loadcode "code/typescript/updated-baseline.txt" >}}
```

{{% /choosable %}}

{{% choosable language python %}}

```python
{{< loadcode "code/python/updated-baseline.py" >}}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
{{< loadcode "code/yaml/updated-baseline.yaml" >}}
```

{{% /choosable %}}

You may have noticed that the placeholder code for the security group resource has been moved above the code for the EC2 instance resource. This was done intentionally to accommodate for [creation and deletion](/docs/concepts/how-pulumi-works/#creation-and-deletion-order) order in Pulumi.

If we place the security group resource definition after the EC2 instance and try to deploy our program, it will fail. This is because the security group resource must exist first before we can tell our EC2 instance to use it.

{{% notes type="info" %}}

You can also create explicit depencies that will ensure that resource creation, update, and deletion operations are executed in the correct order, regardless of the order that resources are defined in your code.

You can find more information about [creating depenencies](/docs/concepts/options/dependson/) in the Pulumi documentation.

{{% /notes %}}

Use the following steps as a guide for adding the Security Group resource:

- Navigate to the [AWS Registry documentation page](https://www.pulumi.com/registry/packages/aws/)
- Search for the EC2 Security Group resource
- Define the EC2 Security Group resource in your project code
- Configure the security group to allow traffic on port 80
- Update the EC2 instance resource to use the security group
- Preview and deploy your updated project code

Once you have completed these steps, navigate to your instance IP address again. You should now be greeted with a "Welcome to nginx!" home page message that indicates your web server is running and publically accessible.
> Note: If your web server is still timing out, make sure you are accessing your web server's IP address via HTTP and not HTTPS.

{{< details "Click here to view the complete project code" >}}

{{< chooser language "typescript,python,yaml" / >}}

{{% choosable language typescript %}}

```typescript
{{< loadcode "code/typescript/create-sg.txt" >}}
```

{{% /choosable %}}

{{% choosable language python %}}

```python
{{< loadcode "code/python/create-sg.py" >}}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
{{< loadcode "code/yaml/create-sg.yaml" >}}
```

{{% /choosable %}}

{{< /details >}}

## Clean Up

{{< cleanup >}}

## Next Steps

In this tutorial, you made an EC2 instance configured as an Nginx webserver and made it publically available by referencing the Pulumi Registry to define the security group. You also reviewed resource properties and example usage.

To learn more about creating resources in Pulumi, take a look at the following resources:

- Learn more about inputs and outputs in the [Using Inputs and Outputs](/learn/creating-pulumi-programs/inputs-and-outputs/) tutorial.
- Learn more about [resource names](https://www.pulumi.com/docs/concepts/resources/names/), [options](https://www.pulumi.com/docs/concepts/options/), and [providers](https://www.pulumi.com/docs/concepts/resources/providers/) in the Pulumi documentation.
