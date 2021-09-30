---
title: "CI/CD"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-09-15T12:20:24-05:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: true

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Integrating Pulumi into your CI/CD solution, using GitHub Actions.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Integrating Pulumi into your CI/CD solution, using GitHub Actions.

# The order in which the topic appears in the module.
index: 1

# The estimated time, in minutes, for new users to complete the topic.
estimated_time: 10

# The meta_image appears in social-media previews and on the Learn Pulumi home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for reference.
meta_image: meta.png

# The optional meta_video also appears in social-media previews (taking precedence
# over the image) and on the module's index page. A placeholder video representing
# the recommended format, dimensions and aspect ratio has been provided for reference.
# meta_video:
#     url: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/video/2020-09-03-16-46-41.mp4'
#     thumb: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/thumbs/2020-09-03-16-46-41.jpg'
#     preview: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/previews/2020-09-03-16-46-41.jpg'
#     poster: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/posters/2020-09-03-16-46-41.jpg'

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - kat-cosgrove

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - learn
    - cicd

# When provided, links are rendered at the bottom of the topic page.
links:
    - text: Some Website
      url: http://something.com

# Exclude from search-engine indexing for now.
block_external_search_index: true
---

Pulumi’s approach to infrastructure as code is great for continuous delivery, because it uses source code to model cloud resources. This means updates to your cloud infrastructure can be reviewed, validated, and tested using the same process that you have today. For example, doing code reviews via Pull Requests, running code through linters or static analysis tools, and running unit and integration tests as appropriate. It all “just works” for your cloud infrastructure the same way it would for your application code.

For this guide, we'll be using [GitHub Actions](https://developer.github.com/actions).

## Committing the Workflow Files

The first thing we need to do is commit our workflow files to the GitHub repository containing our Pulumi project.

### The pull_request Workflow File

Add a new file to your Boba Shop project repository at .github/workflows/pull_request.yml containing the following workflow definition, which instructs GitHub Actions to run pulumi preview in response to all pull_request events:

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


### The push Workflow File

Now add another new file to your Boba Shop project repository at `.github/workflows/push.yml`containing the following workflow definition, which instructs GitHub Actions to run `pulumi up` whenever a commit is made to the `main` branch.

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

## Configuring your Secrets

We have several secrets in our workflow files. To add values for them, go to your GitHub repository's Settings tab and select Secrets.

![A screenshot showing the Secrets page on a GitHub repository](gh-actions-secrets.png)

First, [create a new Pulumi Access Token](https://app.pulumi.com/account/tokens). Submit that token as a new secret named named `PULUMI_ACCESS_TOKEN`. This is what enables your GitHub Action to communicate with the Pulumi service on your behalf.

You will also need to add secrets for `AWS_ACCESS_KEY_ID`, `AWS_REGION` and `AWS_SECRET_ACCESS_KEY`.

## Pulumi in Action on GitHub Actions

To try things out, simply create a Pull Request or commit, and you will see these new actions showing up in the usual GitHub Checks dialog, with a green checkmark if everything went as planned:

![A screenshot of the Checks modal on GitHub after a commit, showing checks have passed.](gh-actions-checks.png)

Click the Logs pane to see the full output of the Pulumi CLI, along with the URL of your deployment on the Pulumi Console with more details:

![A screenshot of the GitHub Actions logs pane, showing a Pulumi deploy completed successfully.](gh-actions-logs.png)

## Congratulations!

You've successfully integrated Pulumi into the CI/CD workflow for your Boba Shop app, using GitHub Actions!