---
title_tag: Pulumi Quickstart
meta_desc: Get started with Pulumi with any cloud and any language in 5 minutes.
title: Quickstart
h1: Pulumi quickstart
pulumi_quickstart: true
menu:
  quickstart:
    name: Overview
    weight: 2
aliases:
- /start/
- /getting-started/
- /get-started/
- /docs/tour/
- /docs/get-started/
steps:
- step: Install the Pulumi CLI
  command:
    osx: brew install pulumi/tap/pulumi
    windows: choco install pulumi
    linux: curl -fsSL https://get.pulumi.com | sh
  accordion:
    title: More installation methods
    content: too add later
- step:
    aws:
      title: Set up AWS credentials
      content: <p>Pulumi requires cloud credentials to manage and provision resources. Use an IAM user account that has programmatic access with rights to deploy and manage resources.</p><p>If you have previously installed and configured the AWS CLI, Pulumi will respect and use your configuration settings.</p><p>If you do not have the AWS CLI installed or plan on using Pulumi from within a CI/CD pipeline, <a href="https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys" target="_blank">retrieve your access key ID and secret access key</a> and then set the <code>AWS_ACCESS_KEY_ID</code> and <code>AWS_SECRET_ACCESS_KEY</code> environment variables on your workstation.</p>
    azure:
      title: Set up Azure credentials
      content: <p>Pulumi requires cloud credentials to manage and provision resources. Pulumi can authenticate to Azure using a user account or service principal that has programmatic access with rights to deploy and manage your Azure resources.</p><p>Pulumi relies on the Azure SDK to authenticate requests from your computer to Azure. Your credentials are never sent to pulumi.com.</p><p>When developing locally, we recommend that you install the Azure CLI and then authorize access with a user account.</p><p>The <a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" target="_blanl">Azure CLI</a>, and Pulumi, will use the default subscription for the account. Change the active subscription with the az account set command.</p>
    google_cloud:
      title: Set up Google Cloud credentials
      content: <p>Pulumi requires cloud credentials to manage and provision resources. You must use an IAM user or service account that has programmatic access with rights to deploy and manage your Google Cloud resources.</p><p>When developing locally, we recommend that you install the <a href="https://cloud.google.com/sdk/install" target="_blank">Google Cloud SDK</a> and then <a href="https://cloud.google.com/sdk/docs/authorizing#authorizing_with_a_user_account" target="_blank">authorize access with a user account</a>. Next, Pulumi requires default application credentials to interact with your Google Cloud resources, so run auth application-default login command to obtain those credentials.</p><p>To configure Pulumi to interact with your Google Cloud project, set it with the pulumi config command using the project’s ID. You may also set your Google Cloud Project via environment variable.</p>
    kubernetes:
      title: Set up Kubernetes credentials
      content: Lorem ipsum
- step: Create a directory and move into it
  command: mkdir first-project && cd first-project
- step: Use your first template
  accordion:
    title: Learn about projects, stacks, and templates
    intro: <p>Pulumi <a href="/docs/concepts/projects/" target="_blank">projects</a> and <a href="/docs/concepts/stack/" target="_blank">stacks</a> organize Pulumi code. Projects are similar to GitHub repos and stacks are an instance of code with separate configuration. Projects can have multiple stacks for different development environments or for different cloud configurations.</p><p>The following files are generated when a new project is created:</p>
    closing: <p><code>pulumi new</code> uses a template to quickly deploy and modify common architectures.</p>
    typescript:
      content: <ul><li><code>Pulumi.yaml</code> defines the project.</li><li><code>Pulumi.dev.yaml</code> contains <a href="/docs/concepts/config/" target="_blank">configuration</a> values for the stack you just initialized.</li><li><code>index.ts</code> is the Pulumi program that defines your stack resources.</li></ul>
    python:
      content: <ul><li><code>Pulumi.yaml</code> defines the project.</li><li><code>Pulumi.dev.yaml</code> contains <a href="/docs/concepts/config/" target="_blank">configuration</a> values for the stack you just initialized.</li><li><code>main.py</code> is the Pulumi program that defines your stack resources.</li></ul>
    go:
      content: <ul><li><code>Pulumi.yaml</code> defines the project.</li><li><code>Pulumi.dev.yaml</code> contains <a href="/docs/concepts/config/" target="_blank">configuration</a> values for the stack you just initialized.</li><li><code>main.go</code> is the Pulumi program that defines your stack resources.</li></ul>
    dot-net:
      content: <ul><li><code>Pulumi.yaml</code> defines the project.</li><li><code>Pulumi.dev.yaml</code> contains <a href="/docs/concepts/config/" target="_blank">configuration</a> values for the stack you just initialized.</li><li><code>program.cs</code> is the Pulumi program that defines your stack resources.</li></ul>
    java:
      content: <ul><li><code>Pulumi.yaml</code> defines the project.</li><li><code>Pulumi.dev.yaml</code> contains <a href="/docs/concepts/config/" target="_blank">configuration</a> values for the stack you just initialized.</li><li><code>src/main/java/myproject</code> defines the project’s Java package root.</li><li><code>app.java</code> is the Pulumi program that defines your stack resources.</li></ul>
    yaml:
      content: <ul><li><code>Pulumi.yaml</code> defines the project.</li><li><code>Pulumi.dev.yaml</code> contains <a href="/docs/concepts/config/" target="_blank">configuration</a> values for the stack you just initialized.</li></ul>
- step: Deploy your infrastructure!
  command: pulumi up
  accordion:
    title: Learn what happens during a deployment
    content: Pulumi evaluates the program and determines what resources need updates. By default pulumi runs a preview that outline the changes that will be made when you run the deployment. Pulumi computes the minimally disruptive change to achieve the desired state described by the program.
---
