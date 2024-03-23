---
title_tag: Modify the Program | Kubernetes
meta_desc: This page provides an overview on how to update Kubernetes project from a Pulumi program.
title: Modify program
h1: "Pulumi & Kubernetes: Modify program"
weight: 6
menu:
  clouds:
    parent: kubernetes-get-started
    identifier: kubernetes-modify-program

aliases:
- /docs/quickstart/kubernetes/modify-program/
- /docs/get-started/kubernetes/modify-program/
---

Now that we have an instance of our Pulumi program deployed, let's update it to do something a little more interesting.

Replace the entire contents of {{< langfile >}} with the following:

{{< example-program path="kubernetes-nginx-ip-output" >}}

Our program now creates a service to access the NGINX deployment and requires a new [config](/docs/concepts/config/) value to indicate whether the program is being deployed to minikube.

You can set the configuration value via the `pulumi config set isMinikube <true|false>` command. For example,

If you are using minikube, set `isMinikube` to `true`:

```bash
$ pulumi config set isMinikube true
```

Otherwise, set `isMinikube` to `false`:

```bash
$ pulumi config set isMinikube false
```

Next, we'll deploy the changes.

{{< get-started-stepper >}}
