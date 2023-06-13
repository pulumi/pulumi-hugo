---
title_tag: "Review Stacks"
meta_desc: Pull request environments that deploy application and infrastructure code changes.
title: "Review Stacks"
h1: "Review Stacks"
meta_image: /images/docs/meta-images/docs-meta.png
menu:
  pulumicloud:
    parent: deployments
    weight: 2
---

Review Stacks are dedicated cloud environments that get created automatically every time a pull request is opened, all powered by Pulumi Deployments. Open a pull request, and Pulumi Deployments will stand up a stack with your changes and the Pulumi GitHub App will add a PR comment with the outputs from your deployment. Merge the PR and Pulumi Deployments will destroy the stack and free up the associated resources. It has never been simpler to pick up an unfamiliar codebase, make changes to both application and infrastructure code, and share a live environment for review with your teammates.

![Review Stack Pull Request Comment](../comment.png)

Review Stacks enable you to iterate on both application code changes and infrastructure code changes at the same time. Just open a pull request and you can start testing changes against everything from simple static websites to API servers, microservices, data pipelines, Kubernetes clusters, and any other piece of infrastructure across Pulumi’s 100+ cloud providers. Review Stacks manage the full lifecycle of your cloud development environment including creating it when the PR is opened, updating it every time a new commit is pushed, and destroying and cleaning up all cloud resources when the pull request is merged or closed.

## Configuring Review Stacks

Configuring Review Stacks is a simple three-step process:

1. Create a new stack, by convention named `pr`, and corresponding `Pulumi.pr.yaml` configuration file - this config will be copied into every review stack that gets created, and can even be modified within a PR.
2. Configure [Deployment Settings](/docs/pulumi-cloud/deployments/reference/#deployment-settings) for the stack - this specifies how to acquire source code, cloud credentials and more when deploying via Pulumi Deployments.
3. Set the `pullRequestTemplate` Deployment Setting to true - this indicates that all pull requests against this stack’s branch should reference this stack as a Review Stack template.

You can use an existing stack as a Review Stack template, as long as it has Deployment Settings configured. This will result in Review Stacks being deployed into the same cloud account. If you want to separate the cloud resources in your production stack from the resources created via Review Stacks then you can create a separate stack and template that references a different cloud account (AWS, Azure, GCP, etc).

Review Stacks and Deployment Settings can be configured via the Pulumi Cloud console, the Pulumi Cloud REST API, or within a Pulumi Program using the Pulumi Cloud Resource Provider.

### Pulumi Cloud UI

It is just one click to turn on Review Stacks via the Pulumi Cloud console.

![Deployment Settings for Review Stacks](../pr-settings.gif)

### REST API

You can programmatically configure Review Stacks and Deployment Settings at scale across thousands of projects using the [Deployments REST API](/docs/pulumi-cloud/deployments/api/#patch-settings).

```
curl -i -XPOST -H "Content-Type: application/json" -H "Authorization: token $PULUMI_ACCESS_TOKEN" \
--location "https://api.pulumi.com/api/preview/org/project/stack/deployment/settings" \
-d '{
  "gitHub":{
    "pullRequestTemplate": true
    }
}'
```

### Pulumi Cloud Resource Provider

You can use Pulumi to manage and code review Deployment Settings and Review Stacks with the [Pulumi Cloud Provider](/registry/packages/pulumiservice).

```typescript
import * as pulumiservice from "@pulumi/pulumiservice";

const deploymentSettings = new pulumiservice.DeploymentSettings("deploymentSettings", {
	organization: pulumi.getOrganization(),
	project: "your project",
	stack: "your stack",
	github: {
		deployCommits: true,
		previewPullRequests: true,
		pullRequestTemplate: true,
		repository: "pulumi/deployment-automation",
	},
	sourceContext: {
		git: {
			branch: "refs/heads/main",
			repoDir: "pulumi-pet-shop",
		},
	},
});
```
