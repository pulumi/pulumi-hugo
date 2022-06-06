---
title: "Importing Resources"
layout: topic
date: 2022-06-03T11:33:44-05:00
draft: false
description: Here is a brief description of what this topic will cover.
meta_desc: Here is a brief description of what this topic will cover.
index: 3
estimated_time: 10
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - terraform
---

In your quest to convert all of the older infrastructure from the Pulumipus Boba Tea Shop to Terraform, you realized that you have some resources that are deployed using the old system and you just want to import the resources themselves along with their current state into Pulumi, rather than converting your code. Let's explore how to import resources.

Importing resources already created into the Pulumi state management system isn't just for Terraform-based deployments, but it's a common question. If for some reason you can't migrate to code directly from a Terraform state file, this process is for you. There are three paths to take when importing resources from a Terraform build. Pulumi allows you to import resources from any currently existing spot with either (1) the `import` CLI command or (2) an `import` option in the code. Alternately, we can import resources directly from a Terraform state file. Let's explore all of them.

## Setting up

We need some infrastructure deployed by Terraform to import. Remember the infrastructure we [stood up in the Getting Started section]()? We'll use that infrastructure. If you don't have it running, get Docker running on your machine, and then go into the directory where you saved that initial `main.tf` file and run a `terraform plan` and `terraform apply`.

## Using the `import` command



## Using the `import` option



## Importing from Terraform state

Right now, we can only import resources from Terraform state into TypeScript-based Pulumi programs. Not to worry, though, if you don't know TypeScript! We can use other tools to convert TypeScript into other languages later. Let's first get those resources in here.

First, create yet another directory off of the root directory where your Terraform state file is, and initialize a new Typescript Pulumi project:

```bash
$ pulumi new typescript
```

The `index.ts` file is as follows:

```typescript
import * as pulumi from "@pulumi/pulumi";
```

Next, [copy this file into your directory](https://github.com/pulumi/tf2pulumi/blob/master/misc/import/import.ts), naming it `import.ts`.

Modify the `index.ts` file to import that file's calls into the program. Here's the end result of that modification:

```typescript
import * as pulumi from "@pulumi/pulumi";
import "./import.ts";
```

The `import.ts` file uses a configuration value to identify where to locate the Terraform state file, and then pulls in each resource. So, we need to set our config value as follows, with the final path pointing toward your current state file that's running on your machine:

```bash
$ pulumi config set importFromStatefile ../terraform.tfstate
```

<!--TODO: There's errors here. This part isn't finished. See Slack for more info. >

<!-- more stuff -->

<br/>
<br/>

What if you can't get to the point of a full migration? What if you need to keep running Terraform alongside Pulumi? In the next section, we'll explore how Pulumi can consume Terraform state directly. Onward!
