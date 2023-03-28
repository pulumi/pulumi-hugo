---
title: "IaC Recommended Practices: Using Stack References"
date: 2023-03-31
meta_desc: This post discusses the use of stack references to share information among multiple Pulumi projects, and the recommended practices around their use.
meta_image: meta.png
authors:
    - aaron-kao
    - christian-nunciato
    - scott-lowe
tags:
    - best-practices
    - cloud-engineering
    - zephyr
---

This is the fourth post in a series of blog posts focused on Zephyr Archaeotech Emporium---our fictional company---and their use of Pulumi to manage their online retail store. In the first three posts, you saw how Zephyr's initial use of Pulumi changed as the company grew, and how the use of short-lived per-developer stacks helped Zephyr's application development team meet the demands of a rapidly growing company. This post is a complement to the previous post on structuring Pulumi projects, discussing how Zephyr uses Stack References to link their projects together and sharing some recommended practices around the use of Stack References.<!--more-->

As you may have read in previous Zephyr posts, the ultimate goal of the Zephyr series is to share recommended practices on the use of Pulumi to manage your infrastructure and application resources (using our fictional company and a fairly complex containerized application as the use case). However, the series exposes those recommended practices over time---not all right away, and not without also discussing the context for the recommendations. This is deliberate, demonstrating how "point-in-time" recommendations change based on the needs of the company and its requirements.

Here are links to all the blog posts in the series (entries below that are not linked are planned but haven't yet been published---this will get updated as new posts are published):

* [IaC Recommended Practices: Code Organization and Stacks](/blog/iac-recommended-practices-code-organization-and-stacks/)
* [IaC Recommended Practices: Developer Stacks and Git Branches](/blog/iac-recommended-practices-developer-stacks-git-branches/)
* [IaC Recommended Practices: Structuring Pulumi Projects](/blog/iac-recommended-practices-structuring-pulumi-projects/)
* **IaC Recommended Practices: Using Stack References** (you are here)
* IaC Recommended Practices: Local Testing with Pulumi
* IaC Recommended Practices: Evolving the Application
* IaC Recommended Practices: Adding Pulumi Deployments
* IaC Recommended Practices: Refactoring for Reuse

## Reviewing Zephyr's current status

As this post is somewhat of a continuation of the previous post, Zephyr's use of Pulumi remains the same as it did at the end of the third post. That is, Zephyr now has _three_ Pulumi projects (zephyr-infra, zephyr-k8s, and zephyr-app). Each of these projects handles a different aspect or portion of the overall set of requirements for Zephyr's online store:

* The "zephyr-infra" project handles base infrastructure (VPC and related constructs).
* The "zephyr-k8s" project handles the Kubernetes platform layer, building atop the infrastructure components provided by the "zephyr-infra" project.
* The "zephyr-app" project handles _only_ the deployment of the online store services onto Kubernetes, layering on top of the platform provided by the "zephyr-k8s" project.

{{% notes %}}
You can continue to use the `multi-project` tag in the GitHub repositories to see the state of Zephyr's code and projects for this blog post.
{{% /notes %}}

It's clear that there are dependencies across projects: The `zephyr-k8s` project needs to know the VPC ID and the subnet IDs from the `zephyr-infra` project. Similarly, the `zephyr-app` project needs to have access to the Kubernetes cluster details from the `zephyr-k8s` project. As the Zephyr team went about building the code that is now in use in their multi-project architecture, they needed to determine how best to handle these cross-project dependencies. The Zephyr team knew that hard-coding output values from one project as configuration values in another stack was not the ideal way (and in fact Pulumi **strongly** recommends against hard-coding output values), but what was the best solution to use? The answer to that question is _[stack references](https://www.pulumi.com/learn/building-with-pulumi/stack-references/)_.

## Linking stacks

For those that are unfamiliar, stack references are a feature in Pulumi that allows you to access output values from one stack in another stack. In other words, stack references provide a way to programmatically "link" stacks in different projects for the purpose of sharing information. You can find more details on stack references [here in the Pulumi docs](/docs/intro/concepts/stack/#stackreferences).

Using stack references, the Zephyr team could make the necessary connections they needed:

* The code handling the Kubernetes cluster could reference the VPC ID and subnet IDs from the base infrastructure layer.
* Similarly, the code that was responsible for deploying the online store services could reference the necessary Kubernetes connection details for the Kubernetes cluster.

It's worthwhile to note that any information that needs to be accessible from another stack via a stack reference must be exported as a stack output in the source stack. If you don't mark it as a stack output, then it can't be used in a stack reference. Fortunately, adding stack outputs after the fact is easy and generally has no impact whatsoever on existing infrastructure.

Additionally, any value retrieved via a stack reference is treated as an `Output`, and therefore may require some additional work to transform values (such as the use of `Output.apply`). The recent addition of `OutputDetails` support in Pulumi---you can read more about that [here](/blog/stack-reference-output-details/)---helps enormously in this situation. Some SDKs also have language-specific mechanisms that can help; for example, using Go's `.AsStringArrayOutput()` method on a `StackReference.GetOutput` statement makes referencing subnet IDs from other project much easier.

While stack references are generally straightforward, there are some recommended practices to observe around the use of stack outputs and stack references:

1. With regard to stack outputs, **only export what is needed.** If there's a need for it to be accessed from outside the stack, export it; otherwise, don't. It's easy to add more stack outputs after the fact, and as has been mentioned already this is done with a quick `pulumi up` that has no affect on existing infrastructure (you're only modifying the stack object itself).
2. **Be judicious in the use of stack references.** Each stack reference is a call to the backend to read a value, which adds some level of latency. Using lots of stack references (think more than 20 or so) can introduce notable latency in Pulumi operations.
3. **If you need lots of stack references, use a structured data object.** It's possible to construct a JSON object (or dict or struct, depending on your language) to hold all the stack outputs, and then export that object. Then a stack reference can read that object, resulting in only a single call to the backend. Be aware, however, that you'll need to write the necessary code to understand/import/unmarshall that JSON object in the referring stack, so there is a small amount of additional work required in this situation.
4. In line with parameterizing as much of your code as possible, **also be sure to parameterize your stack references.** A stack reference is built using an organization name, a project name, and a stack name. Don't hardcode these values; instead, use configuration values to allow the users to specify from which source stack(s) the values will be referenced.

## Examining Zephyr's use of stack references

With these recommended practices in mind, you can examine the Zephyr team's implementation to see how they put these recommendations into action.

* In the code for the base infrastructure stack, you can see that Zephyr [only exported the minimum values](https://github.com/pulumi/zephyr-infra/blob/multi-project/index.ts#L14-L17) needed by the Kubernetes platform stack.
* In the Kubernetes platform stack, the Zephyr team [parameterized the values](https://github.com/pulumi/zephyr-k8s/blob/multi-project/index.ts#L10-L12) needed for the stack reference. This particular approach, by the way, is key to ensuring [the per-developer stacks](/blog/iac-recommended-practices-developer-stacks-git-branches/) to which the Zephyr team has grown accustomed are easily accommodated (each developer need only specify the correct organization, project, and stack name).
* As with the base infrastructure stack, [only the key value needed by other stacks](https://github.com/pulumi/zephyr-k8s/blob/multi-project/index.ts#L36-L37) is exported.
* Finally, in the application stack, the [stack reference values are again parameterized](https://github.com/pulumi/zephyr-app/blob/multi-project/infra/index.ts#L7-L9), and only the Kubeconfig---necessary for the application stack to deploy onto the provisioned Kubernetes cluster---is [referenced via a stack reference](https://github.com/pulumi/zephyr-app/blob/multi-project/infra/index.ts#L11-L13).

{{% notes %}}
All of the GitHub links in the previous paragraphs reference the `multi-project` tag in each repository, which contains the code as of this blog post (and the previous blog post).
{{% /notes %}}

## Summarizing recommended practices

This post covered the following recommended practices for working with Pulumi:

* **Export only what's needed** from your stacks. It's easy to add stack outputs later, with no impact to existing infrastructure.
* **Be judicious in the use of stack references.** Each stack reference introduces a small bit of latency in Pulumi operations, so minimize stack references where possible.
* **Use a structured data object for large numbers of values that need to be referenced.** This enables Pulumi to retrieve all the data with a single call, but be aware you'll need to write additional code to understand the data structure in the referring stack.
* **Parameterize your stack references.** Don't hardcode organization, project, or stack name values. Instead, pass these in as configuration values (with default values applied, if applicable).

The next post continues in the "Zephyr universe," but breaks from discussing IaC recommended practices to look at an oft-overlooked use case for Pulumi: automating local testing.
