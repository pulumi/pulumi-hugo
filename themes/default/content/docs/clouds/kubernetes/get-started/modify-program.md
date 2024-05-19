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

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" / >}}

{{% choosable language javascript %}}

```javascript
const pulumi = require("@pulumi/pulumi");
const k8s = require("@pulumi/kubernetes");

let name = "nginx";

// Create a Kubernetes Deployment for the nginx
let appDeployment = new k8s.apps.v1.Deployment(name, {
    metadata: {
        labels: {
            app: name
        }
    },
    spec: {
        selector: {
            matchLabels: {
                app: name
            }
        },
        replicas: 1,
        template: {
            metadata: {
                labels: {
                    app: name
                }
            },
            spec: {
                containers: [{
                    name: name,
                    image: "nginx"
                }]
            }
        }
    }
});

// Expose the nginx deployment with a Kubernetes Service
let appService = new k8s.core.v1.Service(name, {
    metadata: {
        labels: appDeployment.metadata.labels
    },
    spec: {
        ports: [{ 
            name: "http",
            port: 80, 
            targetPort: 8080, 
            protocol: "TCP"
        }],
        selector: appDeployment.spec.template.metadata.labels,
        type: "LoadBalancer"
    }
});

// Export the Service's IP address. Keep in mind that the IP address may not be immediately 
// available, depending on the service provider.
exports.serviceIP = appService.status.loadBalancer.ingress[0]['ip'];
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";

const appName = "nginx";

const appLabels = { app: appName };

// Create a Kubernetes deployment of the nginx server
const deployment = new k8s.apps.v1.Deployment(`${appName}-dep`, {
  metadata: {labels: appLabels},
  spec: {
    replicas: 2,
    selector: {matchLabels: appLabels},
    template: {
      metadata: {labels: appLabels},
      spec: {
        containers: [
          {
            name: appName, 
            image: "nginx:latest",
            resources: {
              requests: { memory: "2Gi" },
              limits: { memory: "2Gi" }
            }
          }
        ],
      },
    },
  },
});

// Create a Kubernetes service to expose the nginx server deployment
const service = new k8s.core.v1.Service(`${appName}-svc`, {
  metadata: {labels: deployment.metadata.labels},
  spec: {
    type: "LoadBalancer",
    ports: [{port: 8080, targetPort: 80}], // nginx listens on port 80 by default
    selector: appLabels,
  },
});

// Export the LoadBalancer IP for the service.
export const lbIp = service.status.loadBalancer.ingress[0].ip;
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

config = pulumi.Config()

app_name = "nginx"
app_labels = { "app": app_name }

deployment = Deployment(
    app_name,
    spec={
        "selector": { "match_labels": app_labels },
        "replicas": 1,
        "template": {
            "metadata": { "labels": app_labels },
            "spec": { "containers": [{ "name": app_name, "image": "nginx"
}] }
        }
    })

# Allocate an IP to the Deployment.
frontend = Service(
    app_name,
    metadata={
        "labels": deployment.spec["template"]["metadata"]["labels"],
    },
    spec={
        "type": "LoadBalancer",
        "ports": [{ "port": 8080, "target_port": 80, "protocol": "TCP" }],
        "selector": app_labels,
    })

# When "done", this will print the public IP.
result = None
ingress = frontend.status.load_balancer.apply(lambda v: v["ingress"][0] if "ingress" in v else "output<string>")
result = ingress.apply(lambda v: v["ip"] if v and "ip" in v else (v["hostname"] if v and "hostname" in v else "output<string>"))

pulumi.export("ip", result)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
package main

import (
	appsv1 "github.com/pulumi/pulumi-kubernetes/sdk/v4/go/kubernetes/apps/v1"
	corev1 "github.com/pulumi/pulumi-kubernetes/sdk/v4/go/kubernetes/core/v1"
	metav1 "github.com/pulumi/pulumi-kubernetes/sdk/v4/go/kubernetes/meta/v1"
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

		template := deployment.Spec.ApplyT(func(v appsv1.DeploymentSpec) *corev1.PodTemplateSpec {
			return &v.Template
		}).(corev1.PodTemplateSpecPtrOutput)

		meta := template.ApplyT(func(v *corev1.PodTemplateSpec) *metav1.ObjectMeta { return v.Metadata }).(metav1.ObjectMetaPtrOutput)

		frontend, _ := corev1.NewService(ctx, appName, &corev1.ServiceArgs{
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
			ip = frontend.Spec.ApplyT(func(val corev1.ServiceSpec) string {
				if val.ClusterIP != nil {
					return *val.ClusterIP
				}
				return ""
			}).(pulumi.StringOutput)
		} else {
      ip = frontend.Status.ApplyT(func(val *corev1.ServiceStatus) string {
          if val.LoadBalancer.Ingress != nil && len(val.LoadBalancer.Ingress) > 0 {
              ingress := val.LoadBalancer.Ingress[0]
              if ingress.Ip != nil {
                  return *ingress.Ip
              }
              if ingress.Hostname != nil {
                  return *ingress.Hostname
              }
          }
          return ""
      }).(pulumi.StringOutput)
		}

		ctx.Export("ip", ip)
		return nil
	})
}
```

Add missing `go` module requirements:

```bash
$ go mod tidy
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
using Pulumi;
using Pulumi.Kubernetes.Core.V1;
using Pulumi.Kubernetes.Types.Inputs.Core.V1;
using Pulumi.Kubernetes.Types.Inputs.Apps.V1;
using Pulumi.Kubernetes.Types.Inputs.Meta.V1;
using System.Collections.Generic;

return await Deployment.RunAsync(() =>
{
    var config = new Pulumi.Config();
    var isMinikube = config.GetBoolean("isMinikube") ?? false;

    var appName = "nginx";
    var appLabels = new InputMap<string>
    {
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

    var ip = isMinikube
        ? frontend.Spec.Apply(spec => spec.ClusterIP)
        : frontend.Status.Apply(status =>
        {
            var ingress = status.LoadBalancer.Ingress[0];
            return ingress.Ip ?? ingress.Hostname;
        });

    return new Dictionary<string, object?>
    {
        ["ip"] = ip
    };
});
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
        type: LoadBalancer
        selector: ${appLabels}
        ports:
          - port: 8080
            targetPort: 80
            protocol: TCP

outputs:
  ip: ${service.spec.loadBalancerIP}
```

{{% /choosable %}}

This program now creates a service to access the NGINX deployment.

Ensure that you are able to access your Kubernetes cluster by using `kubectl get nodes`.

{{% notes type="warning" %}}
If you are deploying the stack on a minikube ensure that you run `minikube tunnel` in a separate terminal. For more information, see [LoadBalancer access](https://minikube.sigs.k8s.io/docs/handbook/accessing/#loadbalancer-access).
{{% /notes %}}

Next, deploy the changes.

{{< get-started-stepper >}}
