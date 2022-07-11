---
title: Kubernetes Getting Started
h1: Get Started with Kubernetes
meta_desc: This page provides an overview and guide on how to get started with Kubernetes.
linktitle: Kubernetes
weight: 1
menu:
  getstarted:
    identifier: kubernetes
    weight: 2

aliases: [
  "/docs/quickstart/kubernetes/",
  "/docs/quickstart/kubernetes/begin/",
  "/docs/quickstart/kubernetes/install-pulumi/",
  "/docs/quickstart/kubernetes/install-language-runtime/",
  "/docs/quickstart/kubernetes/configure/",
  "/docs/get-started/kubernetes/install-pulumi/",
  "/docs/get-started/kubernetes/install-language-runtime/",
  "/docs/get-started/kubernetes/configure/",
  "/docs/quickstart/kubernetes/create-project/",
  "/docs/quickstart/kubernetes/review-project/",
  "/docs/quickstart/kubernetes/deploy-stack/",
  "/docs/quickstart/kubernetes/modify-program/",
  "/docs/quickstart/kubernetes/deploy-changes/",
  "/docs/quickstart/kubernetes/destroy-stack/",
  "/docs/quickstart/kubernetes/next-steps/",
  "/docs/get-started/kubernetes/begin",
  "/docs/get-started/kubernetes/create-project",
  "/docs/get-started/kubernetes/deploy-changes",
  "/docs/get-started/kubernetes/deploy-stack",
  "/docs/get-started/kubernetes/destroy-stack",
  "/docs/get-started/kubernetes/modify-program",
  "/docs/get-started/kubernetes/next-steps",
  "/docs/get-started/kubernetes/review-project"
]
---

Pulumi's Cloud Native SDK makes it easy to target any Kubernetes environment to
provision a cluster, configure and deploy applications, and update them as
required.

Pulumi supports programming against Kubernetes---Minikube, on-premises and
cloud-hosted custom Kubernetes clusters, and the managed services from Google
(GKE), Azure (AKS), and Amazon (EKS). The Pulumi Kubernetes provider
packages and CLI help you accomplish all these within minutes.

For a quick example of how Pulumi deploys infrastructure on Kubernetes, this tutorial takes you through the following steps to easily deploy an [NGINX](https://www.nginx.com/) web server:

1. Setting up and configuring Pulumi to access your Kubernetes cluster.
1. Creating a new Pulumi project.
1. Deploying NGINX on Kubernetes.
1. Creating a service to access the NGINX deployment.
1. Cleaning up your deployment by destroying the resources you've provisioned.

## Before You Begin

Before we get started using Pulumi, let's run through a few quick steps to ensure our environment is setup correctly.

### Install Pulumi

{{< install-pulumi >}}
{{% notes "info" %}}
All Windows examples in this tutorial assume you are running in PowerShell.
{{% /notes %}}
{{< /install-pulumi >}}

Next, we'll install the required language runtime.

### Install Language Runtime

#### Choose Your Language

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language "javascript,typescript" %}}
{{< install-node >}}
{{% /choosable %}}

{{% choosable language python %}}
{{< install-python >}}
{{% /choosable %}}

{{% choosable language go %}}
{{< install-go >}}
{{% /choosable %}}

{{% choosable language "csharp,fsharp,visualbasic" %}}
{{< install-dotnet >}}
{{% /choosable %}}

{{% choosable language java %}}
{{< install-java >}}
{{% /choosable %}}

{{% choosable language yaml %}}
{{< install-yaml >}}
{{% /choosable %}}

Next, we'll configure Kubernetes.

### Configure Kubernetes

<a href="{{< relref "/registry/packages/kubernetes/installation-configuration" >}}" target="_blank">Configure Kubernetes</a> so the Pulumi CLI can connect to a Kubernetes cluster. If you have previously configured the <a href="https://kubernetes.io/docs/reference/kubectl/overview/" target="_blank">kubectl CLI</a>, `kubectl`, Pulumi will respect and use your configuration settings.

Next, we'll create a new Pulumi project.

## Create a New Project

Now that you have set up your environment let's create your first Pulumi program.

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language javascript %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new kubernetes-javascript
```

{{% /choosable %}}
{{% choosable language typescript %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new kubernetes-typescript
```

{{% /choosable %}}
{{% choosable language python %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new kubernetes-python
```

{{% /choosable %}}
{{% choosable language go %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new kubernetes-go
```

{{% /choosable %}}
{{% choosable language csharp %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new kubernetes-csharp
```

{{% /choosable %}}

{{% choosable language java %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new kubernetes-java
```

{{% /choosable %}}

{{% choosable language yaml %}}

```bash
$ mkdir quickstart && cd quickstart
$ pulumi new kubernetes-yaml
```

{{% /choosable %}}

{{< cli-note >}}

After logging in, the CLI will proceed with walking you through creating a new project.

```
This command will walk you through creating a new Pulumi project.

Enter a value or leave blank to accept the (default), and press <ENTER>.
Press ^C at any time to quit.

project name: (quickstart)
project description: (A minimal Kubernetes Pulumi program)
Created project 'quickstart'

stack name: (dev)
Created stack 'dev'
```

First, you will be asked for a project name and description. Hit `ENTER` to accept the default values or specify new values.

Next, you will be asked for the name of a stack. You can hit `ENTER` to accept the default value of `dev`.

> What are [projects]({{< relref "/docs/intro/concepts/project" >}}) and [stacks]({{< relref "/docs/intro/concepts/stack" >}})? Pulumi projects and stacks let you organize Pulumi code. Consider a Pulumi _project_ to be analogous to a GitHub repo---a single place for code---and a _stack_ to be an instance of that code with a separate configuration. For instance, _Project Foo_ may have multiple stacks for different development environments (Dev, Test, or Prod), or perhaps for different cloud configurations (geographic region for example). See [Organizing Projects and Stacks]({{< relref "/docs/guides/organizing-projects-stacks" >}}) for some best practices on organizing your Pulumi projects and stacks.

{{% choosable language "javascript,typescript" %}}
After some dependency installations from `npm`, the project and stack will be ready.
{{% /choosable %}}

{{% choosable language python %}}
After the command completes, the project and stack will be ready.
{{% /choosable %}}

{{% choosable language go %}}
After the command completes, the project and stack will be ready.
{{% /choosable %}}

{{% choosable language csharp %}}
After the command completes, the project and stack will be ready.
{{% /choosable %}}

{{% choosable language java %}}
After the command completes, the project and stack will be ready.
{{% /choosable %}}

{{% choosable language yaml %}}
After the command completes, the project and stack will be ready.
{{% /choosable %}}

Next, we'll review the generated project files.

## Review the New Project

Let's review some of the generated project files:

{{% choosable language "javascript,typescript,python,go,csharp,java" %}}

- `Pulumi.yaml` defines the [project]({{< relref "/docs/intro/concepts/project" >}}).

{{% /choosable %}}

{{% choosable language yaml %}}

- `Pulumi.yaml` defines both the [project]({{< relref "/docs/intro/concepts/project" >}}) and the program that manages your stack resources.

{{% /choosable %}}

- `Pulumi.dev.yaml` contains [configuration]({{< relref "/docs/intro/concepts/config" >}}) values for the [stack]({{< relref "/docs/intro/concepts/stack" >}}) we initialized.

{{% choosable language csharp %}}

- `Program.cs` with a simple entry point, yo.

{{% /choosable %}}

{{% choosable language java %}}

- `src/main/java/myproject` defines the project's Java package root.

{{% /choosable %}}

{{% choosable language "javascript,typescript,python,go,csharp,java" %}}

<!-- The wrapping spans are infortunately necessary here; without them, the renderer gets confused and generates invalid markup. -->
- <span>{{< langfile >}}</span> is the Pulumi program that defines your stack resources.

{{% /choosable %}}

Let's examine {{< langfile >}}.

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language javascript %}}

```javascript
"use strict";
const k8s = require("@pulumi/kubernetes");

const appLabels = { app: "nginx" };
const deployment = new k8s.apps.v1.Deployment("nginx", {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: { containers: [{ name: "nginx", image: "nginx" }] }
        }
    }
});
exports.name = deployment.metadata.name;
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
import * as k8s from "@pulumi/kubernetes";

const appLabels = { app: "nginx" };
const deployment = new k8s.apps.v1.Deployment("nginx", {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: { containers: [{ name: "nginx", image: "nginx" }] }
        }
    }
});
export const name = deployment.metadata.name;
```

{{% /choosable %}}
{{% choosable language python %}}

```python
"""A Kubernetes Python Pulumi program"""

import pulumi
from pulumi_kubernetes.apps.v1 import Deployment, DeploymentSpecArgs
from pulumi_kubernetes.meta.v1 import LabelSelectorArgs, ObjectMetaArgs
from pulumi_kubernetes.core.v1 import ContainerArgs, PodSpecArgs, PodTemplateSpecArgs

app_labels = { "app": "nginx" }

deployment = Deployment(
    "nginx",
    spec=DeploymentSpecArgs(
        selector=LabelSelectorArgs(match_labels=app_labels),
        replicas=1,
        template=PodTemplateSpecArgs(
            metadata=ObjectMetaArgs(labels=app_labels),
            spec=PodSpecArgs(containers=[ContainerArgs(name="nginx", image="nginx")])
        ),
    ))

pulumi.export("name", deployment.metadata["name"])
```

{{% /choosable %}}
{{% choosable language go %}}

```go
package main

import (
    appsv1 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/apps/v1"
    corev1 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/core/v1"
    metav1 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/meta/v1"
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
    pulumi.Run(func(ctx *pulumi.Context) error {

        appLabels := pulumi.StringMap{
            "app": pulumi.String("nginx"),
        }
        deployment, err := appsv1.NewDeployment(ctx, "app-dep", &appsv1.DeploymentArgs{
            Spec: appsv1.DeploymentSpecArgs{
                Selector: &metav1.LabelSelectorArgs{
                    MatchLabels: appLabels,
                },
                Replicas: pulumi.Int(1),
                Template: &corev1.PodTemplateSpecArgs{
                    Metadata: &metav1.ObjectMetaArgs{
                        Labels: appLabels,
                    },
                    Spec: &corev1.PodSpecArgs{
                        Containers: corev1.ContainerArray{
                            corev1.ContainerArgs{
                                Name:  pulumi.String("nginx"),
                                Image: pulumi.String("nginx"),
                            }},
                    },
                },
            },
        })
        if err != nil {
            return err
        }

        ctx.Export("name", deployment.Metadata.Elem().Name())

        return nil
    })
}
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
using Pulumi;
using Pulumi.Kubernetes.Apps.V1;
using Pulumi.Kubernetes.Types.Inputs.Core.V1;
using Pulumi.Kubernetes.Types.Inputs.Apps.V1;
using Pulumi.Kubernetes.Types.Inputs.Meta.V1;

class MyStack : Stack
{
    public MyStack()
    {
        var appLabels = new InputMap<string>
        {
            { "app", "nginx" }
        };

        var deployment = new Pulumi.Kubernetes.Apps.V1.Deployment("nginx", new DeploymentArgs
        {
            Spec = new DeploymentSpecArgs
            {
                Selector = new LabelSelectorArgs
                {
                    MatchLabels = appLabels
                },
                Replicas = 1,
                Template = new PodTemplateSpecArgs
                {
                    Metadata = new ObjectMetaArgs
                    {
                        Labels = appLabels
                    },
                    Spec = new PodSpecArgs
                    {
                        Containers =
                        {
                            new ContainerArgs
                            {
                                Name = "nginx",
                                Image = "nginx",
                                Ports =
                                {
                                    new ContainerPortArgs
                                    {
                                        ContainerPortValue = 80
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        this.Name = deployment.Metadata.Apply(m => m.Name);
    }

    [Output]
    public Output<string> Name { get; set; }
}
```

{{% /choosable %}}

{{% choosable language java %}}

```java
package myproject;

import com.pulumi.Pulumi;
import com.pulumi.kubernetes.apps_v1.Deployment;
import com.pulumi.kubernetes.apps_v1.DeploymentArgs;
import com.pulumi.kubernetes.apps_v1.inputs.DeploymentSpecArgs;
import com.pulumi.kubernetes.core_v1.inputs.ContainerArgs;
import com.pulumi.kubernetes.core_v1.inputs.ContainerPortArgs;
import com.pulumi.kubernetes.core_v1.inputs.PodSpecArgs;
import com.pulumi.kubernetes.core_v1.inputs.PodTemplateSpecArgs;
import com.pulumi.kubernetes.meta_v1.inputs.LabelSelectorArgs;
import com.pulumi.kubernetes.meta_v1.inputs.ObjectMetaArgs;

import java.util.Map;

public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            var labels = Map.of("app", "nginx");

            var deployment = new Deployment("nginx", DeploymentArgs.builder()
                    .spec(DeploymentSpecArgs.builder()
                            .selector(LabelSelectorArgs.builder()
                                    .matchLabels(labels)
                                    .build())
                            .replicas(1)
                            .template(PodTemplateSpecArgs.builder()
                                    .metadata(ObjectMetaArgs.builder()
                                            .labels(labels)
                                            .build())
                                    .spec(PodSpecArgs.builder()
                                            .containers(ContainerArgs.builder()
                                                    .name("nginx")
                                                    .image("nginx")
                                                    .ports(ContainerPortArgs.builder()
                                                            .containerPort(80)
                                                            .build())
                                                    .build())
                                            .build())
                                    .build())

                            .build())
                    .build());

            var name = deployment.metadata()
                .applyValue(m -> m.orElseThrow().name().orElse(""));

            ctx.export("name", name);
        });
    }
}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
name: quickstart
runtime: yaml
description: A minimal Kubernetes Pulumi YAML program

variables:
  appLabels:
    app: nginx

resources:
  deployment:
    name: nginx
    type: kubernetes:apps/v1:Deployment
    properties:
      spec:
        selector:
          matchLabels: ${appLabels}
        replicas: 1
        template:
          metadata:
            labels: ${appLabels}
          spec:
            containers:
              - name: nginx
                image: nginx

outputs:
  name: ${deployment.metadata.name}
```

{{% /choosable %}}

This Pulumi program creates an NGINX deployment and exports the name of the deployment.

Next, we'll deploy the stack.

## Deploy the Stack

Let's go ahead and deploy the stack:

```bash
$ pulumi up
```

This command instructs Pulumi to determine the resources needed to create the stack. First, a preview is shown of the changes that will be made:

```
Previewing update (dev):

     Type                           Name            Plan
 +   pulumi:pulumi:Stack            quickstart-dev  create
 +   └─ kubernetes:apps:Deployment  nginx           create

Resources:
    + 2 to create

Do you want to perform this update?
  yes
> no
  details
```

Choosing `yes` will create resources in Kubernetes.

```
Do you want to perform this update? yes
Updating (dev):

     Type                           Name            Status
 +   pulumi:pulumi:Stack            quickstart-dev  created
 +   └─ kubernetes:apps:Deployment  nginx           created

Outputs:
    name: "nginx-xw231xdt"

Resources:
    + 2 created

Duration: 11s
```

The name of the deployment that we exported is shown as a [stack output]({{< relref "/docs/intro/concepts/stack#outputs" >}}).

{{< console-note >}}

Next, we'll make some modifications to the program.

## Modify the Program

Now that we have an instance of our Pulumi program deployed, let's update it to do something a little more interesting.

Replace the entire contents of {{< langfile >}} with the following:

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language javascript %}}

```javascript
"use strict";
const pulumi = require("@pulumi/pulumi");
const k8s = require("@pulumi/kubernetes");

// Minikube does not implement services of type `LoadBalancer`; require the user to specify if we're
// running on minikube, and if so, create only services of type ClusterIP.
const config = new pulumi.Config();
const isMinikube = config.requireBoolean("isMinikube");

const appName = "nginx";
const appLabels = { app: appName };
const deployment = new k8s.apps.v1.Deployment(appName, {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: { containers: [{ name: appName, image: "nginx" }] }
        }
    }
});

// Allocate an IP to the Deployment.
const frontend = new k8s.core.v1.Service(appName, {
    metadata: { labels: deployment.spec.template.metadata.labels },
    spec: {
        type: isMinikube ? "ClusterIP" : "LoadBalancer",
        ports: [{ port: 80, targetPort: 80, protocol: "TCP" }],
        selector: appLabels
    }
});

// When "done", this will print the public IP.
exports.ip = isMinikube
    ? frontend.spec.clusterIP
    : frontend.status.loadBalancer.apply(
          (lb) => lb.ingress[0].ip || lb.ingress[0].hostname
      );
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";

// Minikube does not implement services of type `LoadBalancer`; require the user to specify if we're
// running on minikube, and if so, create only services of type ClusterIP.
const config = new pulumi.Config();
const isMinikube = config.requireBoolean("isMinikube");

const appName = "nginx";
const appLabels = { app: appName };
const deployment = new k8s.apps.v1.Deployment(appName, {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: { containers: [{ name: appName, image: "nginx" }] }
        }
    }
});

// Allocate an IP to the Deployment.
const frontend = new k8s.core.v1.Service(appName, {
    metadata: { labels: deployment.spec.template.metadata.labels },
    spec: {
        type: isMinikube ? "ClusterIP" : "LoadBalancer",
        ports: [{ port: 80, targetPort: 80, protocol: "TCP" }],
        selector: appLabels
    }
});

// When "done", this will print the public IP.
export const ip = isMinikube
    ? frontend.spec.clusterIP
    : frontend.status.loadBalancer.apply(
          (lb) => lb.ingress[0].ip || lb.ingress[0].hostname
      );
```

{{% /choosable %}}
{{% choosable language python %}}

```python
"""
Creating a Kubernetes Deployment
"""
import pulumi
from pulumi_kubernetes.apps.v1 import Deployment
from pulumi_kubernetes.core.v1 import Service

# Minikube does not implement services of type `LoadBalancer`; require the user to specify if we're
# running on minikube, and if so, create only services of type ClusterIP.
config = pulumi.Config()
is_minikube = config.require_bool("isMinikube")

app_name = "nginx"
app_labels = { "app": app_name }

deployment = Deployment(
    app_name,
    spec={
        "selector": { "match_labels": app_labels },
        "replicas": 1,
        "template": {
            "metadata": { "labels": app_labels },
            "spec": { "containers": [{ "name": app_name, "image": "nginx" }] }
        }
    })

# Allocate an IP to the Deployment.
frontend = Service(
    app_name,
    metadata={
        "labels": deployment.spec["template"]["metadata"]["labels"],
    },
    spec={
        "type": "ClusterIP" if is_minikube else "LoadBalancer",
        "ports": [{ "port": 80, "target_port": 80, "protocol": "TCP" }],
        "selector": app_labels,
    })

# When "done", this will print the public IP.
result = None
if is_minikube:
    result = frontend.spec.apply(lambda v: v["cluster_ip"] if "cluster_ip" in v else None)
else:
    ingress = frontend.status.apply(lambda v: v["load_balancer"]["ingress"][0] if "load_balancer" in v else None)
    if ingress is not None:
        result = ingress.apply(lambda v: v["ip"] if "ip" in v else v["hostname"])

pulumi.export("ip", result)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
package main

import (
    appsv1 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/apps/v1"
    corev1 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/core/v1"
    metav1 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/meta/v1"
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi/config"
)

func main() {
    pulumi.Run(func(ctx *pulumi.Context) error {
        isMinikube := config.GetBool(ctx, "isMinikube")
        appName := "nginx"
        appLabels := pulumi.StringMap{
            "app": pulumi.String(appName),
        }
        deployment, err := appsv1.NewDeployment(ctx, appName, &appsv1.DeploymentArgs{
            Spec: appsv1.DeploymentSpecArgs{
                Selector: &metav1.LabelSelectorArgs{
                    MatchLabels: appLabels,
                },
                Replicas: pulumi.Int(1),
                Template: &corev1.PodTemplateSpecArgs{
                    Metadata: &metav1.ObjectMetaArgs{
                        Labels: appLabels,
                    },
                    Spec: &corev1.PodSpecArgs{
                        Containers: corev1.ContainerArray{
                            corev1.ContainerArgs{
                                Name:  pulumi.String("nginx"),
                                Image: pulumi.String("nginx"),
                            }},
                    },
                },
            },
        })
        if err != nil {
            return err
        }

        feType := "LoadBalancer"
        if isMinikube {
            feType = "ClusterIP"
        }

        template := deployment.Spec.ApplyT(func(v *appsv1.DeploymentSpec) *corev1.PodTemplateSpec {
            return &v.Template
        }).(corev1.PodTemplateSpecPtrOutput)

        meta := template.ApplyT(func(v *corev1.PodTemplateSpec) *metav1.ObjectMeta { return v.Metadata }).(metav1.ObjectMetaPtrOutput)

        frontend, err := corev1.NewService(ctx, appName, &corev1.ServiceArgs{
            Metadata: meta,
            Spec: &corev1.ServiceSpecArgs{
                Type: pulumi.String(feType),
                Ports: &corev1.ServicePortArray{
                    &corev1.ServicePortArgs{
                        Port:       pulumi.Int(80),
                        TargetPort: pulumi.Int(80),
                        Protocol:   pulumi.String("TCP"),
                    },
                },
                Selector: appLabels,
            },
        })

        var ip pulumi.StringOutput

        if isMinikube {
            ip = frontend.Spec.ApplyT(func(val *corev1.ServiceSpec) string {
                if val.ClusterIP != nil {
                    return *val.ClusterIP
                }
                return ""
            }).(pulumi.StringOutput)
        } else {
            ip = frontend.Status.ApplyT(func(val *corev1.ServiceStatus) string {
                if val.LoadBalancer.Ingress[0].Ip != nil {
                    return *val.LoadBalancer.Ingress[0].Ip
                }
                return *val.LoadBalancer.Ingress[0].Hostname
            }).(pulumi.StringOutput)
        }

        ctx.Export("ip", ip)
        return nil
    })
}
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
using Pulumi;
using Pulumi.Kubernetes.Core.V1;
using Pulumi.Kubernetes.Apps.V1;
using Pulumi.Kubernetes.Types.Inputs.Core.V1;
using Pulumi.Kubernetes.Types.Inputs.Apps.V1;
using Pulumi.Kubernetes.Types.Inputs.Meta.V1;

class MyStack : Stack
{
    public MyStack()
    {
        var config = new Pulumi.Config();
        var isMinikube = config.GetBoolean("isMinikube") ?? false;

        var appName = "nginx";

        var appLabels = new InputMap<string>{
            { "app", appName },
        };

        var deployment = new Pulumi.Kubernetes.Apps.V1.Deployment(appName, new DeploymentArgs
        {
            Spec = new DeploymentSpecArgs
            {
                Selector = new LabelSelectorArgs
                {
                    MatchLabels = appLabels,
                },
                Replicas = 1,
                Template = new PodTemplateSpecArgs
                {
                    Metadata = new ObjectMetaArgs
                    {
                        Labels = appLabels,
                    },
                    Spec = new PodSpecArgs
                    {
                        Containers =
                        {
                            new ContainerArgs
                            {
                                Name = appName,
                                Image = "nginx",
                                Ports =
                                {
                                    new ContainerPortArgs
                                    {
                                        ContainerPortValue = 80
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        var frontend = new Service(appName, new ServiceArgs
        {
            Metadata = new ObjectMetaArgs
            {
                Labels = deployment.Spec.Apply(spec =>
                    spec.Template.Metadata.Labels
                ),
            },
            Spec = new ServiceSpecArgs
            {
                Type = isMinikube
                    ? "ClusterIP"
                    : "LoadBalancer",
                Selector = appLabels,
                Ports = new ServicePortArgs
                {
                    Port = 80,
                    TargetPort = 80,
                    Protocol = "TCP",
                },
            }
        });

        this.IP = isMinikube
            ? frontend.Spec.Apply(spec => spec.ClusterIP)
            : frontend.Status.Apply(status =>
            {
                var ingress = status.LoadBalancer.Ingress[0];
                return ingress.Ip ?? ingress.Hostname;
            });
    }

    [Output("ip")]
    public Output<string> IP { get; set; }
}
```

{{% /choosable %}}
{{% choosable language java %}}

```java
package myproject;

import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.kubernetes.apps_v1.Deployment;
import com.pulumi.kubernetes.apps_v1.DeploymentArgs;
import com.pulumi.kubernetes.apps_v1.inputs.DeploymentSpecArgs;
import com.pulumi.kubernetes.core_v1.*;
import com.pulumi.kubernetes.core_v1.ServiceArgs;
import com.pulumi.kubernetes.core_v1.enums.ServiceSpecType;
import com.pulumi.kubernetes.core_v1.inputs.*;
import com.pulumi.kubernetes.meta_v1.inputs.LabelSelectorArgs;
import com.pulumi.kubernetes.meta_v1.inputs.ObjectMetaArgs;
import java.util.Map;

public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            var config = ctx.config();
            var isMinikube = config.requireBoolean("isMinikube");
            var labels = Map.of("app", "nginx");

            var deployment = new Deployment("nginx", DeploymentArgs.builder()
                .spec(DeploymentSpecArgs.builder()
                    .selector(LabelSelectorArgs.builder()
                        .matchLabels(labels)
                        .build())
                    .replicas(1)
                    .template(PodTemplateSpecArgs.builder()
                        .metadata(ObjectMetaArgs.builder()
                            .labels(labels)
                            .build())
                        .spec(PodSpecArgs.builder()
                            .containers(ContainerArgs.builder()
                                .name("nginx")
                                .image("nginx")
                                .ports(ContainerPortArgs.builder()
                                    .containerPort(80)
                                    .build())
                                .build())
                            .build())
                        .build())
                    .build())
                .build());

            var name = deployment.metadata()
                .applyValue(m -> m.orElseThrow().name().orElse(""));

            var frontend = new Service("nginx", ServiceArgs.builder()
                .metadata(ObjectMetaArgs.builder()
                    .labels(deployment.spec().applyValue(spec -> spec.get().template().metadata().get().labels()))
                    .build())
                .spec(ServiceSpecArgs.builder()
                    .type(isMinikube ? ServiceSpecType.ClusterIP : ServiceSpecType.LoadBalancer)
                    .selector(labels)
                    .ports(ServicePortArgs.builder()
                        .port(80)
                        .targetPort(80)
                        .protocol("TCP")
                        .build())
                    .build())
                .build());

            ctx.export("ip", isMinikube
                ? frontend.spec().applyValue(spec -> spec.get().clusterIP())
                : Output.tuple(frontend.status(), frontend.spec()).applyValue(t -> {
                    var status = t.t1;
                    var spec = t.t2;
                    var ingress = status.get().loadBalancer().get().ingress().get(0);
                    return ingress.ip().orElse(ingress.hostname().orElse(spec.get().clusterIP().get()));
                })
            );
        });
    }
}
```

{{% /choosable %}}

{{% choosable language yaml %}}

```yaml
name: quickstart
runtime: yaml
description: A minimal Kubernetes Pulumi YAML program

variables:
  appLabels:
    app: nginx

resources:
  deployment:
    type: kubernetes:apps/v1:Deployment
    properties:
      spec:
        selector:
          matchLabels: ${appLabels}
        replicas: 1
        template:
          metadata:
            labels: ${appLabels}
          spec:
            containers:
              - name: nginx
                image: nginx
  service:
    type: kubernetes:core/v1:Service
    properties:
      metadata:
        labels: ${appLabels}
      spec:
        type: ClusterIP
        selector: ${appLabels}
        ports:
          - port: 80
            targetPort: 80
            protocol: TCP

outputs:
  ip: ${service.spec.clusterIP}
```

{{% /choosable %}}

Our program now creates a service to access the NGINX deployment, and requires a new [config]({{< relref "/docs/intro/concepts/config" >}}) value to indicate whether the program is being deployed to Minikube or not.

The configuration value can be set for the stack using `pulumi config set isMinikube <true|false>` command.

If you are currently using Minikube, set `isMinikube` to `true`, otherwise, set `isMinikube` to `false` as shown in the following command.

```bash
$ pulumi config set isMinikube false
```

Next, we'll deploy the changes.

## Deploy the Changes

Now let's deploy our changes.

```bash
$ pulumi up
```

Pulumi computes the minimally disruptive change to achieve the desired state described by the program.

```
Previewing update (dev):

     Type                        Name            Plan
     pulumi:pulumi:Stack         quickstart-dev
 +   └─ kubernetes:core:Service  nginx           create

 Outputs:
  + ip  : output<string>
  - name: "nginx-xw231xdt"

Resources:
    + 1 to create
    2 unchanged

Do you want to perform this update?
  yes
> no
  details
```

Pulumi will create the service since it is now defined in the program.

```
Do you want to perform this update? yes
Updating (dev):

     Type                        Name            Status
     pulumi:pulumi:Stack         quickstart-dev
 +   └─ kubernetes:core:Service  nginx           created

Outputs:
  + ip  : "10.100.249.54"
  - name: "nginx-xw231xdt"

Resources:
    + 1 created
    2 unchanged

Duration: 12s
```

You can see we now have an `ip` [stack output]({{< relref "/docs/intro/concepts/stack#outputs" >}}) that we can `curl` to get the output from the service.

> **Using Minikube:** Note that Minikube does not support type `LoadBalancer`. If you are deploying to Minikube, see the following example to run the `kubectl port-forward service/YOUR_SERVICE_NAME 8080:80` command to forward the cluster port to the local machine. Then, the service can be accessed via `curl http://localhost:8080`, which will get the same result as `curl $(pulumi stack output ip)` as in the environment without using Minikube.
>
>
>  ```bash
>  $ kubectl get service
>  NAME             TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
>  kubernetes       ClusterIP   10.96.0.1       <none>        443/TCP   26h
>  nginx-3hq3kux6   ClusterIP   10.96.185.206   <none>        80/TCP    15m
>  ```
>
> ```bash
> $ kubectl port-forward service/nginx-3hq3kux6 8080:80
> Forwarding from 127.0.0.1:8080 -> 80
> Forwarding from [::1]:8080 -> 80
> ```

```bash
$ curl $(pulumi stack output ip)
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

Next, we'll destroy the stack.

## Destroy the Stack

Now that we've seen how to deploy changes to our program, let's clean up and tear down the resources that are part of our stack.

To destroy resources, run the following:

```bash
$ pulumi destroy
```

You'll be prompted to make sure you really want to delete these resources.

```
Previewing destroy (dev):

     Type                           Name            Plan
 -   pulumi:pulumi:Stack            quickstart-dev  delete
 -   ├─ kubernetes:core:Service     nginx           delete
 -   └─ kubernetes:apps:Deployment  nginx           delete

Outputs:
  - ip: "10.105.234.140"

Resources:
    - 3 to delete

Do you want to perform this destroy? yes
Destroying (dev):

     Type                           Name            Status
 -   pulumi:pulumi:Stack            quickstart-dev  deleted
 -   ├─ kubernetes:core:Service     nginx           deleted
 -   └─ kubernetes:apps:Deployment  nginx           deleted

Outputs:
  - ip: "10.105.234.140"

Resources:
    - 3 deleted

Duration: 1s
```

To delete the stack itself, run [`pulumi stack rm`]({{< relref
"/docs/reference/cli/pulumi_stack_rm" >}}). Note that this removes the stack
entirely from the Pulumi Service, along with all of its update history.

## Next Steps

Congrats! You've deployed your first project to Kubernetes with Pulumi. Here are some next steps, depending on your learning style.

### Learn Pulumi

Dive into Learn Pulumi for a comprehensive walkthrough of key Pulumi concepts in the context of a real-life application.

{{< get-started-next-step path="/learn/pulumi-fundamentals" label="Learn Pulumi Fundamentals" ref="gs-k8s-learn" >}}

### How-to Guides

Explore our how-to guides if you're looking for examples of specific architectures or application stacks. These guides are available in all Pulumi languages and cover creating managed Kubernetes clusters across all major cloud providers ([AWS]({{< relref "/registry/packages/kubernetes/how-to-guides/eks" >}}), [Azure]({{< relref "/registry/packages/kubernetes/how-to-guides/aks" >}}), [Google Cloud]({{< relref "/registry/packages/kubernetes/how-to-guides/gke" >}})) as well as deploying app workloads on running Kubernetes clusters ([WordPress Helm Chart]({{< relref "/registry/packages/kubernetes/how-to-guides/wordpress-chart" >}}), [Stateless App Deployment]({{< relref "/registry/packages/kubernetes/how-to-guides/stateless-app" >}})).

{{< get-started-next-step path="/registry/packages/kubernetes/how-to-guides" label="Explore How-to Guides" ref="gs-k8s-guides" >}}

### How Pulumi Works

Learn how Pulumi works from its architecture to key concepts, including [stacks]({{< relref "/docs/intro/concepts/stack" >}}), [state]({{< relref "/docs/intro/concepts/state" >}}), [configuration]({{< relref "/docs/intro/concepts/config" >}}), and [secrets]({{< relref "/docs/intro/concepts/secrets" >}}).

{{< get-started-next-step path="/docs/intro/concepts" label="Read Documentation" ref="gs-k8s-docs" >}}

### Blog Posts

Read through the latest blog posts about using Pulumi with Kubernetes.

{{< get-started-next-step path="/blog/tag/kubernetes" label="Read the Pulumi Blog" ref="gs-k8s-blog" >}}
