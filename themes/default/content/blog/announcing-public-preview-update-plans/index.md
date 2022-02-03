---
title: "Announcing the public preview of Update Plans"
date: 2022-02-10T08:00:00-07:00 # TODO update this
meta_desc: Update Plans enable you to see and confirm the updates that will be made to your infrastructure and then apply those updates at a later time.
meta_image: meta.png # TODO update this
authors:
    - fraser-waters
tags:
    - features
---

## Announcing the public preview of Update Plans

Pulumi’s previews are an important part of any workflow where you want to see the changes that will be made to your infrastructure before actually making the changes (with `pulumi up`). However, today there is no guarantee that the `pulumi up` operation will do only what was previewed; if the program, or your infrastructure, changes between the preview and the update, the update might make additional changes to bring your infrastructure back in line with what’s defined in your program. We’ve [heard from many of you](https://github.com/pulumi/pulumi/issues/2318) that you need a strong guarantee about exactly which changes an update will make to your infrastructure, especially in critical and production environments.

Today, I’m excited to announce the public preview of Update Plans, a new Pulumi feature that provides exactly this guarantee. Update Plans enable review and approval workflows for your infrastructure. Plans also help catch any unexpected changes that might happen between when you preview a change and when you apply that change. Update Plans work by saving the results of a `pulumi preview` to a _plan file_, which enables you to restrict subsequent `pulumi up` operations to only the actions saved in the plan file. This helps you ensure that what you saw in the `pulumi preview` is what will actually happen when you run `pulumi up`.

Here’s an example of Update Plans in action.

{{< asciicast id="466347" >}}

All that was required to make use of plans was adding `--save-plan <file>` to the preview command and `--plan <file>` to the up command. This was a pretty trivial example where our program did what our plan expected so everything just ran as normal. If we start again with the same plan but change the program slightly we can see that update plans returns an error and blocks the change.

{{< asciicast id="466462" >}}

When updates fail to validate against the plan pulumi will print what constraint failed. In the example above the resource `urn:pulumi:dev::aws-ts-webserver::aws:ec2/instance:Instance::web-server-www` changed the value of the property `userData`.

## New scenario enabled by Update Plans: pull request validation workflows

Software development teams commonly use version control-based workflows to review and monitor the code that is added to a codebase. For example, many teams protect their primary branch (e.g. `main`, `master`, `trunk`) from direct code pushes and instead require a pull or merge request where the changes can be reviewed and continuous integration (CI) and tests can be run.

With Update Plans, this same workflow is now possible with infrastructure managed by Pulumi. Assuming you already have CI set up for your pull/merge requests, you can run `pulumi preview --save-plan PLAN-FILENAME` and output the resulting plan file as a CI artifact. Then, update the CI workflow that runs when changes are merged to run `pulumi up --plan PLAN-FILENAME`.

## Try Update Plans

{{% notes type="info" %}}

Update Plans are in public preview. We recommend using it only in non-critical, non-production scenarios during the preview period.

{{% /notes %}}

We’re eager for you to try the public preview of Update Plans and let us know what you think. To try it out, make sure you’ve updated to Pulumi 3.24.0 then set the following environment variable in your shell:

```sh

PULUMI_EXPERIMENTAL=true

```

Then, save a plan file:

```sh

pulumi preview --save-plan plan.json

```

Finally, pass the plan file to the `pulumi up` command:

```sh

pulumi up --plan-file plan.json

```

We’d love to hear your thoughts on the Update Plans feature! Feel free to start discussions or ask questions using [GitHub Discussions in the `pulumi/pulumi` repository]([https://github.com/pulumi/pulumi/discussions/categories/preview-features](https://github.com/pulumi/pulumi/discussions/categories/preview-features)).
