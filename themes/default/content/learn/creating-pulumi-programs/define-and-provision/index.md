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
meta_image: meta.png
authors:
    - torian-crane
tags:
    - resources
---

{{< youtube 6f8KF6UGN7g >}}

In Pulumi, [resources](/docs/concepts/resources) represent the fundamental units that make up your infrastructure, such as a virtual machines, networks, storage, and databases. A resource is used to define and manage an infrastructure object in your Pulumi configuration.

In this tutorial, we'll demonstrate how to create a simple Nginx web server. You will then refer to documentation in the Pulumi Registry to create a security group resource to make the application publically accessible.

Let's get started!

## Create a Virtual Machine

The first step is to create a virtual machine resource that will be used to host the web server. The specific details of how to create your virtual machine differ by cloud provider. Select your cloud provider below to see the corresponding details:

{{% chooser cloud "aws,azure,gcp" / %}}

{{% choosable cloud aws %}}

<p></p>

### Amazon Elastic Compute Cloud (EC2)

Amazon Elastic Compute Cloud (EC2) provides managed virtual server hosting that makes it straightforward to run applications in your AWS account. In AWS, a virtual server is referred to as an "instance". These instances can host a variety of operating systems, tools, and applications, each configured according to your specific requirements.

#### Create a New Project

To start, [create a new project](/docs/clouds/aws/get-started/create-project/) and [ensure it is configured to use your AWS account](/registry/packages/aws/installation-configuration/).

Then use the follow code snippet to scaffold your project with the required imports and overall program structure that we will fill in as we go along:

{{< chooser language "javascript,typescript,python,go,csharp,yaml" / >}}

{{< choosable language javascript >}}

```javascript
const aws = require("@pulumi/aws");
const pulumi = require("@pulumi/pulumi");

// [Step 1: Create an EC2 instance.]

// [Step 2: Create a security group.]
```

{{< /choosable >}}

{{< choosable language typescript >}}

```typescript
import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

// [Step 1: Create an EC2 instance.]

// [Step 2: Create a security group.]
```

{{< /choosable >}}

{{< choosable language python >}}

```python
import pulumi
import pulumi_aws as aws

# [Step 1: Create an EC2 instance.]

# [Step 2: Create a security group.]
```

{{< /choosable >}}

{{< choosable language go >}}

```go
package main

import (
    "encoding/base64"
    "errors"
    "strings"

    "github.com/pulumi/pulumi-aws/sdk/v2/go/aws/ec2"
    "github.com/pulumi/pulumi/sdk/v2/go/pulumi"
)

func main() {
    pulumi.Run(func(ctx *pulumi.Context) error {
        // [Step 1: Create an EC2 instance.]

        // [Step 2: Create a security group.]

        return nil
    })
}
```

{{< /choosable >}}

{{< choosable language csharp >}}

```csharp
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pulumi;
using Pulumi.Aws.Ec2;

class Program
{
    static Task<int> Main() => Deployment.RunAsync(async () => {
        // [Step 1: Create an EC2 instance.]

        // [Step 2: Create a security group.]
    }
}
```

{{< /choosable >}}

{{< choosable language yaml >}}

```yaml
TBD
```

{{< /choosable >}}

#### Define an EC2 Instance

The Pulumi Registry provides the documentation for all of the Pulumi providers and their associated resources. Open the [`aws.ec2.Instance` documentation page](/registry/packages/aws/api-docs/ec2/instance) to view a description of this resource, example usage, the resource definition, and supported properties. We will now define our EC2 instance resource below.

{{< chooser language "javascript,typescript,python,go,csharp,yaml" / >}}

{{< choosable language python >}}

```python
import pulumi
import pulumi_aws as aws

user_data = """
#!/bin/bash
sudo yum update -y
sudo yum upgrade -y
sudo amazon-linux-extras install nginx1 -y
sudo systemctl enable nginx
sudo systemctl start nginx
"""

# [Step 1: Create an EC2 instance.]
server = aws.ec2.Instance(
    'webserver-www',
    instance_type="t2.micro",
    ami="ami-09538990a0c4fe9be", # Amazon Linux 2 AMI for us-east-1 region
    user_data=user_data
)

pulumi.export('publicIp', server.public_ip)
```

{{< /choosable >}}

Note that all resources have a required `name` argument which much be unique across resources of the same kind in a stack. In the above example, the unique name for our `aws.ec2.Instance` resource is `webserver-www`.

Aside from names, resources have properties and options.

**Properties** are used to specify what type of resource to create. Properties are often resource-specific, and they can be required or optional depending on the specifications of the provider.

The properties inside our `aws.ec2.Instance` resource are:

| Property | Description |
|--------------|-------------|
| **instance_type** | tells the AWS provider to create an EC2 instance of type/size `t2.micro` |
| **ami** | tells the provider to create the instance using the `ami-0e00e602389e469a3` machine image |
| **user_data** | tells the provider to initialize the instance with the script we have defined |

**Options** let you control certain aspects of a resource (such as showing explicit dependencies or importing existing infrastructure). We do not have any options defined for this resource, but you can learn more about options in the [Pulumi documentation](/docs/concepts/options).

#### Deploy your EC2 Instance

Now let's run the `pulumi up` command to preview the resource we just defined in our project.

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

The public IP address of your instance has been provided as an output, and you can use this to access your web server. However, if you try to visit this address, your request will eventually time out. This is because we have not yet configured web traffic access for our instance. We will do this by creating our security group resource.

#### Create a Security Group

In this section, you will try configure the security group on your own. An updated version of our project code has been provided below.

- Use Pulumi's [AWS Registry documentation page](https://www.pulumi.com/registry/packages/aws/)

{{< chooser language "javascript,typescript,python,go,csharp,yaml" / >}}

{{< choosable language python >}}

```python
import pulumi
import pulumi_aws as aws

user_data = """
#!/bin/bash
sudo yum update -y
sudo yum upgrade -y
sudo amazon-linux-extras install nginx1 -y
sudo systemctl enable nginx
sudo systemctl start nginx
"""

# [Step 1: Create an EC2 instance.]
server = aws.ec2.Instance(
    'webserver-www',
    instance_type="t2.micro",
    ami="ami-09538990a0c4fe9be",
    user_data=user_data,
    vpc_security_group_ids=[security_group.id], # Security group property and reference
)

# [Step 2: Create a security group.]
security_group = # TO-DO

pulumi.export('publicIp', server.public_ip)
```

{{< /choosable >}}

> To view another cloud provider's details, [select a new cloud in the switcher above](#create-a-virtual-machine).

{{% /choosable %}}

{{% choosable cloud azure %}}

PLACEHOLDER

> To view another cloud provider's details, [select a new cloud in the switcher above](#create-a-virtual-machine).

{{% /choosable %}}

{{% choosable cloud gcp %}}

PLACEHOLDER

> To view another cloud provider's details, [select a new cloud in the switcher above](#create-a-virtual-machine).

{{% /choosable %}}

## Next Steps

Next up, we're going to explore how to get information out of a stack and consume it in another place in our Pulumi program.
