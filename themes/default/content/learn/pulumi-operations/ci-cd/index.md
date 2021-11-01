---
title: "Using CI/CD"
layout: topic
date: 2021-09-15T12:20:24-05:00
draft: false
description: Integrating Pulumi into your CI/CD solution, using GitHub Actions.
meta_desc: Integrating Pulumi into your CI/CD solution, using GitHub Actions.
index: 1
estimated_time: 10
meta_image: meta.png
authors:
    - kat-cosgrove
    - laura-santamaria
tags:
    - learn
    - cicd
links:
    - text: Some Website
      url: http://something.com
block_external_search_index: true
---

Pulumi's approach to infrastructure as code is great for continuous delivery
because it uses source code to model cloud resources. This approach means
updates to your cloud infrastructure can be reviewed, validated, and tested
using the same process that you have today. For example, you can run code
reviews in your version control system as usual (e.g., GitHub pull requests or
GitLab merge requests), run code through linters or static analysis tools, and
run unit and integration tests as appropriate. It all "just works" for your
cloud infrastructure the same way it would for your application code.

If you were on a team working on the infrastructure for the Boba Tea Shop app,
you probably want to deploy the app and its various stacks multiple times a day
to do anything from getting ephemeral dev environments to having infrastructure
for smoke testing to actually shipping code to production.

We already explored
[testing]({{< relref "learn/pulumi-in-practice/testing" >}}) in the [Pulumi in
Practice pathway]({{< relref "learn/pulumi-in-practice" >}}). Here, let's
explore actually integrating Pulumi into your CI/CD solution with [GitHub
Actions](https://developer.github.com/actions) to ship some code to Amazon Web
Services (AWS).

{{% notes "info" %}}

For a clean, quick experience, we're going to use the code found
in [this example that has a tiny static website to go up on
S3](https://github.com/pulumi/examples/tree/master/aws-py-s3-folder). Before you
get started, you need to clone down that code, push it up to a GitHub repo of
your own, and get some AWS credentials so you can stand up the infrastructure.

{{% /notes %}}

Ok, all set? Let's go!

<!-- TODO: This module can't actually get deployed with the app from the
Fundamentals pathway. It needs the updates to AWS that are currently in the
Cloud Fundamentals pathways. For launch, we're going to use a basic example
instead since we've already got that code, but it needs to be changed when we do
get Cloud Fundamentals up. -->

## Commit the workflow files

The first thing we need to do is commit our workflow files to the GitHub
repository containing our Pulumi project. For this activity, we're going to
create a workflow that builds and pushes images up to Docker Hub whenever we
commit code to the `main` branch.

GitHub workflow files for GitHub Actions live in a directory within your repo at
`.github/workflows`.

### The pull_request workflow file

Add a new file to your Boba Shop project repository at
`.github/workflows/pull_request.yml` containing the following workflow
definition, which instructs GitHub Actions to run `pulumi preview` in response
to all `pull_request` events:

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

```yaml
name: Pulumi
on:
  - pull_request
jobs:
  preview:
    name: Preview
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 14.x
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-region: ${{ secrets.AWS_REGION }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - run: npm install
      - uses: pulumi/actions@v3
        with:
          command: preview
          stack-name: dev
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
```

{{% /choosable %}}

{{% choosable language python %}}

```yaml
name: Pulumi
on:
  - pull_request
jobs:
  preview:
    name: Preview
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: 3.6
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-region: ${{ secrets.AWS_REGION }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - run: pip install -r requirements.txt
      - uses: pulumi/actions@v3
        with:
          command: preview
          stack-name: dev
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
```

{{% /choosable %}}

{{% choosable language go %}}

```yaml
name: Pulumi
on:
  - pull_request
jobs:
  preview:
    name: Preview
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-go@v1
        with:
          go-version: 1.14.x
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-region: ${{ secrets.AWS_REGION }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - run: go mod download
      - uses: pulumi/actions@v3
        with:
          command: preview
          stack-name: dev
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
```

{{% /choosable %}}

{{% choosable language csharp %}}

```yaml
name: Pulumi
on:
  - pull_request
jobs:
  preview:
    name: Preview
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-dotnet@v1
        with:
          dotnet-version: 3.1.x
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-region: ${{ secrets.AWS_REGION }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - uses: pulumi/actions@v3
        with:
          command: preview
          stack-name: dev
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
```

{{% /choosable %}}

This workflow has a number of variables used, all defined by a dollar sign
followed by double curly braces (`${{ variable }}`). The secrets are declared
elsewhere, which we'll explore in a minute.

### The push workflow file

Now add another new file to your Boba Shop project repository at
`.github/workflows/push.yml`containing the following workflow definition, which
instructs GitHub Actions to run `pulumi up` whenever a commit is made to the
`main` branch:

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

```yaml
name: Pulumi
on:
  push:
    branches:
      - main
jobs:
  preview:
    name: Update
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 14.x
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-region: ${{ secrets.AWS_REGION }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - run: npm install
      - uses: pulumi/actions@v3
        with:
          command: up
          stack-name: dev
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
```

{{% /choosable %}}

{{% choosable language python %}}

```yaml
name: Pulumi
on:
  push:
    branches:
      - main
jobs:
  preview:
    name: Update
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: 3.6
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-region: ${{ secrets.AWS_REGION }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - run: pip install -r requirements.txt
      - uses: pulumi/actions@v3
        with:
          command: up
          stack-name: dev
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
```

{{% /choosable %}}

{{% choosable language go %}}

```yaml
name: Pulumi
on:
  push:
    branches:
      - main
jobs:
  preview:
    name: Update
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-go@v1
        with:
          go-version: 1.14.x
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-region: ${{ secrets.AWS_REGION }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - run: go mod download
      - uses: pulumi/actions@v3
        with:
          command: up
          stack-name: dev
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
```

{{% /choosable %}}

{{% choosable language csharp %}}

```yaml
name: Pulumi
on:
  push:
    branches:
      - main
jobs:
  preview:
    name: Update
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-dotnet@v1
        with:
          dotnet-version: 3.1.x
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-region: ${{ secrets.AWS_REGION }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - uses: pulumi/actions@v3
        with:
          command: up
          stack-name: dev
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
```

{{% /choosable %}}

## Configure secrets

We noticed we have several secrets in our workflow files. To add values for
them, go to your GitHub repository's **Settings** tab, and select **Secrets**.

![A screenshot showing the Secrets page on a GitHub repository](gh-actions-secrets.png)

First, [create a new Pulumi Access
Token](https://app.pulumi.com/account/tokens). Submit that token as a new secret
named named `PULUMI_ACCESS_TOKEN`. This token enables your GitHub Action to
communicate with the Pulumi service on your behalf.

You will also need to add secrets for `AWS_ACCESS_KEY_ID`, `AWS_REGION`, and
`AWS_SECRET_ACCESS_KEY`.

## Try it out

To try things out, simply create a Pull Request or commit on your example repo,
and you'll find these new actions showing up in the usual **GitHub Checks**
dialog, with a green checkmark if everything went as planned:

![A screenshot of the Checks modal on GitHub after a commit, showing checks have passed.](gh-actions-checks.png)

Go to the **Logs** pane to see the full output of the Pulumi CLI, along with the
URL of your deployment on the Pulumi Console with more details:

![A screenshot of the GitHub Actions logs pane, showing a Pulumi deploy completed successfully.](gh-actions-logs.png)

## Tear it down

Before you go any further, you should tear down the infrastructure so you don't
get charged. Destroy the infrastructure and disable the action before
continuing.

Now you've successfully integrated Pulumi into a CI/CD workflow using GitHub
Actions! From here, let's go explore how to manage access to your Pulumi-managed
infrastructure. Onward!