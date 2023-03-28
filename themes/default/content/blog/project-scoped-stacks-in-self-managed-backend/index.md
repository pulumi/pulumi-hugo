---
title: "Project-Scoped Stacks in Self-Managed State Backends"
date: 2023-03-29
meta_desc: The latest Pulumi update includes support for stack names scoped by project name in self-managed state backends.
meta_image: meta.png
authors:
    - justin-vanpatten
tags:
    - features
    - pulumi-releases
---

The latest Pulumi update includes support for project-scoped stacks in self-managed state backends, making self-managed state backends consistent with how stacks are scoped in the Pulumi Service. Stacks created in new or empty self-managed backends will now be scoped by project by default, and existing backends can be upgraded to be scoped by project. This allows using the same simple stack names such as "dev", "staging", "production", etc. across multiple projects within the same self-managed backend.

<!--more-->

## What are State Backends?

Each Pulumi [stack](/docs/intro/concepts/stack/) has its own metadata about your infrastructure so it can manage your cloud resources. This metadata is called [_state_](/docs/intro/concepts/state/) and it is stored in a _backend_ of your choosing: **Service** or **Self-Managed**.

The **Service** backend is hosted at <a href="https://app.pulumi.com" target="_blank">`app.pulumi.com`</a> (or self-hosted) and provides the best combination of usability, safety, and security for most users.

**Self-Managed** backends let you manage state yourself, stored as simple JSON files in AWS S3, Azure Blob Store, Google Cloud Storage, an alternatie AWS S3 API compatible server such as Minio or Ceph, or on your local filesystem. Using a self-managed backend trades off some amount of reliability for additional control over where metadata is stored.

See [Deciding On a State Backend](/docs/intro/concepts/state/#deciding-on-a-state-backend) for more on how to choose a state backend.

## Introducing Project-Scoped Stacks in Self-Managed Backends

Up until the latest Pulumi release, one difference between the Service backend and self-managed backends is that in the Service, stacks are scoped by organization and project, whereas in self-managed backends there was previously no scoping. In practice, this meant you couldn't have stacks with the same name (like "dev" or "production") across multiple projects in the same self-managed backend. You'd have to use fully unique stack names within the self-managed backend, such as by manually including the project name in the stack name (e.g. "my-project-production" and "another-project-production").

With the latest Pulumi release, stacks created in new or empty self-managed backends are scoped by project by default, so you no longer have to include the project name in the stack name to make it unique within a backend. You can simply create a new project and use simple names for the project's stacks, such as "dev", "staging", "production", etc., and other projects within the backend can use the same simple stack names.

## Upgrading Existing Self-Managed Backends

Existing self-managed backends remain non-scoped until upgraded. You can upgrade an existing self-managed backend using the new `pulumi state upgrade` command. This command will upgrade all stacks in the backend to be scoped by project.

```
$ pulumi state upgrade
This will upgrade the current backend to the latest supported version.
Older versions of Pulumi will not be able to read the new format.
Are you sure you want to proceed?
Please confirm that this is what you'd like to do by typing `yes`:
```

If you've included the project name in your stack names as a way of making the stack name fully unique within a self-managed backend, you can additionally use the `pulumi stack rename` command to clean up your stack names.

## Old Pulumi Versions

Old versions of Pulumi will not be able to see stacks scoped by project. New versions of Pulumi (v3.61.0 or later) will output a warning if an older CLI has created any non-scoped stacks in a self-managed backend that has project-scoped stacks, suggesting to use the `pulumi state upgrade` command to upgrade the stacks.

## Referencing Project-Scoped Stacks

Project-scoped stacks in self-managed backends are scoped under a virtual organization, a constant value ("organization"). This allows for a consistent stack identity format across both Service and self-managed backends, e.g. with self-managed backends you can refer to a fully-qualified stack with `organization/my-project/my-stack`, or using the shorthands `organization/my-stack` or `my-stack` (depending on context) just like with the Service backend.

## Availablity

Support for project-scoped stacks in self-managed backends is now available in Pulumi v3.61.0. Give it a try and share your thoughts with us on [Slack](https://slack.pulumi.com/)!
