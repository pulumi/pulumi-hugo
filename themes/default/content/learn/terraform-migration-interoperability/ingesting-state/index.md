---
title: "Ingesting State"
layout: topic
date: 2022-06-03T11:34:02-05:00
draft: false
description: Here is a brief description of what this topic will cover.
meta_desc: Here is a brief description of what this topic will cover.
index: 4
estimated_time: 10
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - terraform
---

Now, it's completely possible that you need to continue to run Terraform alongside Pulumi in a modern enterprise. Perhaps multiple teams are maintaining infrastructure, and one team is using Terraform while your team wants to use Pulumi. A more common use case, though, is that older systems need to run Terraform whereas newer systems are running Pulumi, and there's some crossover where you need data from that older infrastructure. We'll take this latter use case as our scenario for this pathway.

In the back of your Pulumipus Boba Tea Shop infrastructure, you find a small bit of older infrastructure that was deployed with Terraform. For one reason or another, you just don't want to re-deploy them with Pulumi just yet. You need to access those resources, though, with other new infrastructure. Let's explore how to use Pulumi alongside Terraform, in a process we call interoperability.

## Working with Terraform state files

Pulumi can ingest state files from Terraform itself with a package called `pulumi-terraform`. In short, the package contains a resource called a `RemoteStateReference` resource that we can use just like any other resource in a Pulumi program. The resource has a property that references whether a state file is stored locally to where the Pulumi program is run or remotely in another location such as in a cloud-based storage location, a Terraform Cloud/Enterprise workspace, or even an HTTP endpoint. In our case, though, since the Terraform state file is local, we're going to use the local option.

First, we're going to create yet another little project. In the root directory where your Terraform state file is, create yet another directory, change into it, and initialize a new Pulumi project, replacing `<lang>` with your language of choice:

```bash
$ pulumi new <lang> -y
```

Next, we need to add the package to our dependencies:

{{% chooser language "python, typescript" %}}

{{% choosable language python %}}

```bash
$ source venv/bin/activate
$ pip install pulumi_terraform
```

Alternatively, you can add the package to your `requirements.txt` file and just run `pip install -r requirements.txt` after activating the virtual environment.

{{% /choosable %}}

{{% choosable language typescript %}}

```bash
$ npm install @pulumi/terraform
```

{{% /choosable %}}

{{% /chooser %}}

Now, we want to modify our Pulumi program to use the new package and resource.

{{% chooser language "python, typescript" %}}

{{% choosable language python %}}

```python
import pulumi
import pulumi_docker as docker
import pulumi_terraform as terraform

# Reference the Terraform state file:
container_data = terraform.state.RemoteStateReference('container',
    backend_type='local',
    args=terraform.state.LocalBackendArgs(path='../terraform.tfstate'))
```

{{% /choosable %}}

{{% choosable language typescript %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as terraform from "@pulumi/terraform";

// Reference the Terraform state file:
const containerData = new terraform.state.RemoteStateReference("container", {
    backendType: "local",
    path: "/path/to/terraform.tfstate",
});
```

{{% /choosable %}}

{{% /chooser %}}

All this program does right now is read the references in. Let's use it to get the local address of the container to share to another system. Add the following code at the end of the file:

{{% chooser language "python, typescript" %}}

{{% choosable language python %}}

```python
#...
local_address = container_data.get_output('')
```

{{% /choosable %}}

{{% choosable language typescript %}}

```typescript
// ...
const localAddress = containerData.getOutput('')
```

{{% /choosable %}}

{{% /chooser %}}

Now that we have the outputs in there, we can use them when spinning up something else or pull data from our database to be manipulated by the program itself. In our case, let's use that output to add a new boba tea to the database, just like we did in Fundamentals:

{{% chooser language "python, typescript" %}}

{{% choosable language python %}}

```python
```

{{% /choosable %}}

{{% choosable language typescript %}}

```typescript
```

{{% /choosable %}}

{{% /chooser %}}

```bash
curl --location --request POST 'http://localhost:3000/api/products' \
--header 'Content-Type: application/json' \
--data-raw '{
    "ratings": {
        "reviews": [],
        "total": 63,
        "avg": 5
    },
    "created": 1600979464567,
    "currency": {
        "id": "USD",
        "format": "$"
    },
    "sizes": [
        "M",
        "L"
    ],
    "category": "boba",
    "teaType": 2,
    "status": 1,
    "_id": "5f6d025008a1b6f0e5636bc7",
    "images": [
        {
            "src": "classic_boba.png"
        }
    ],
    "name": "My New Milk Tea",
    "price": 5,
    "description": "none",
    "productCode": "852542-107"
}'
```


<br/>
<hr/>

Congratulations! You've now finished this pathway on coexisting with or migrating from Terraform! In this pathway, you've learned about hand-translating HCL, using translation tools, importing resources into Pulumi, and ingesting Terraform state live to run Terraform and Pulumi side by side.

Go build new things, and watch this space for more learning experiences with Pulumi!
