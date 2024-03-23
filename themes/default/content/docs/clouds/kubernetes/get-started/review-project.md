---
title_tag: Review the New Project | Kubernetes
meta_desc: This page provides an overview on how to review a new Kubernetes project.
title: Review project
h1: "Pulumi & Kubernetes: Review project"
weight: 4
menu:
  clouds:
    parent: kubernetes-get-started
    identifier: kubernetes-review-project-get-started

aliases:
- /docs/quickstart/kubernetes/review-project/
- /docs/get-started/kubernetes/review-project/
---

Let's review some of the generated project files:

{{% choosable language "javascript,typescript,python,go,csharp,java" %}}

- `Pulumi.yaml` defines the [project](/docs/concepts/projects/).

{{% /choosable %}}

{{% choosable language yaml %}}

- `Pulumi.yaml` defines both the [project](/docs/concepts/projects/) and the program that manages your stack resources.

{{% /choosable %}}

- `Pulumi.dev.yaml` contains [configuration](/docs/concepts/config/) values for the [stack](/docs/concepts/stack/) we initialized.

{{% choosable language java %}}

- `src/main/java/myproject` defines the project's Java package root.

{{% /choosable %}}

{{% choosable language python %}}

- `__main__.py` is the Pulumi program that defines your stack resources.

{{% /choosable %}}

{{% choosable language "javascript,typescript,go,csharp,java" %}}

<!-- The wrapping spans are infortunately necessary here; without them, the renderer gets confused and generates invalid markup. -->
- <span>{{< langfile >}}</span> is the Pulumi program that defines your stack resources.

{{% /choosable %}}

Let's examine {{< langfile >}}.

{{< example-program path="kubernetes-nginx" >}}

This Pulumi program creates an NGINX deployment and exports the `name` of the deployment.

Next, we'll deploy the stack.

{{< get-started-stepper >}}
