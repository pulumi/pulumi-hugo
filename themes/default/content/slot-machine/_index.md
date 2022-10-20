---
title: Slot Machine
meta_desc: Spin the Pulumi slot machine to get a real world code example using a random language, cloud, and application.
type: page
layout: slot-machine

examples:
  - key: csharp-aws-eks
    language: csharp
    code: |
      using System.Collections.Generic;
      using Pulumi;
      using Aws = Pulumi.Aws;
      using Eks = Pulumi.Eks;
      
      return await Deployment.RunAsync(() => 
      {
          var vpcId = Aws.Ec2.GetVpc.Invoke(new()
          {
              Default = true,
          }).Apply(invoke => invoke.Id);
      
          var subnetIds = Aws.Ec2.GetSubnetIds.Invoke(new()
          {
              VpcId = vpcId,
          }).Apply(invoke => invoke.Ids);
      
          var cluster = new Eks.Cluster("cluster", new()
          {
              VpcId = vpcId,
              SubnetIds = subnetIds,
              InstanceType = "t2.medium",
              DesiredCapacity = 2,
              MinSize = 1,
              MaxSize = 2,
          });
      
          return new Dictionary<string, object?>
          {
              ["kubeconfig"] = cluster.Kubeconfig,
          };
      });
      
      
  - key: csharp-azure-aks
    language: csharp
    code: |
      using System.Collections.Generic;
      using Pulumi;
      using Aks = Pulumi.Aks;
      
      return await Deployment.RunAsync(() =>
      {
          var cluster = new Aks.Cluster("cluster", new()
          {
              NodesPerZone = 3,
              Location = "WestUS",
              Version = "1.24.3",
          });
      
          return new Dictionary<string, object?>
          {
              ["clusterName"] = cluster.Name,
              ["kubeconfig"] = cluster.Kubeconfig,
          };
      });
      
      
  - key: csharp-gcp-gke
    language: csharp
    code: |
      using System.Collections.Generic;
      using Pulumi;
      using Gke = Pulumi.Gke;
      
      return await Deployment.RunAsync(() =>
      {
          var cluster = new Gke.Cluster("cluster", new()
          {
              NodesPerZone = 3,
              Location = "us-west1",
              Version = "1.24.3",
          });
      
          return new Dictionary<string, object?>
          {
              ["clusterName"] = cluster.Name,
              ["kubeconfig"] = cluster.Kubeconfig,
          };
      });
      
      
  - key: csharp-kubernetes-helm
    language: csharp
    code: |
      using System.Collections.Generic;
      using Pulumi;
      using Kubernetes = Pulumi.Kubernetes;
      
      return await Deployment.RunAsync(() => 
      {
          var wordpress = new Kubernetes.Helm.V3.Release("wordpress", new()
          {
              Version = "15.0.5",
              Chart = "wordpress",
              RepositoryOpts = new Kubernetes.Types.Inputs.Helm.V3.RepositoryOptsArgs
              {
                  Repo = "https://charts.bitnami.com/bitnami",
              },
          });
      
      });
      
      
  - key: csharp-kubernetes-nginx
    language: csharp
    code: |
      using System.Collections.Generic;
      using Pulumi;
      using Kubernetes = Pulumi.Kubernetes;
      
      return await Deployment.RunAsync(() => 
      {
          var appLabels = 
          {
              { "app", "nginx" },
          };
      
          var deployment = new Kubernetes.Apps.V1.Deployment("deployment", new()
          {
              Spec = new Kubernetes.Types.Inputs.Apps.V1.DeploymentSpecArgs
              {
                  Selector = new Kubernetes.Types.Inputs.Meta.V1.LabelSelectorArgs
                  {
                      MatchLabels = appLabels,
                  },
                  Replicas = 1,
                  Template = new Kubernetes.Types.Inputs.Core.V1.PodTemplateSpecArgs
                  {
                      Metadata = new Kubernetes.Types.Inputs.Meta.V1.ObjectMetaArgs
                      {
                          Labels = appLabels,
                      },
                      Spec = new Kubernetes.Types.Inputs.Core.V1.PodSpecArgs
                      {
                          Containers = new[]
                          {
                              new Kubernetes.Types.Inputs.Core.V1.ContainerArgs
                              {
                                  Name = "nginx",
                                  Image = "nginx",
                              },
                          },
                      },
                  },
              },
          });
      
          return new Dictionary<string, object?>
          {
              ["name"] = deployment.Metadata.Apply(metadata => metadata?.Name),
          };
      });
      
      
  - key: go-aws-eks
    language: go
    code: |
      package main
      
      import (
      	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
      	"github.com/pulumi/pulumi-eks/sdk/go/eks"
      	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
      )
      
      func main() {
      	pulumi.Run(func(ctx *pulumi.Context) error {
      		vpcId := ec2.LookupVpc(ctx, &ec2.LookupVpcArgs{
      			Default: pulumi.BoolRef(true),
      		}, nil).Id
      		subnetIds := ec2.GetSubnetIds(ctx, &ec2.GetSubnetIdsArgs{
      			VpcId: vpcId,
      		}, nil).Ids
      		cluster, err := eks.NewCluster(ctx, "cluster", &eks.ClusterArgs{
      			VpcId:           pulumi.String(vpcId),
      			SubnetIds:       interface{}(subnetIds),
      			InstanceType:    pulumi.String("t2.medium"),
      			DesiredCapacity: pulumi.Int(2),
      			MinSize:         pulumi.Int(1),
      			MaxSize:         pulumi.Int(2),
      		})
      		if err != nil {
      			return err
      		}
      		ctx.Export("kubeconfig", cluster.Kubeconfig)
      		return nil
      	})
      }
      
  - key: go-azure-aks
    language: go
    code: |
      package main
      
      import (
      	"github.com/pulumi/pulumi-aks/sdk/go/aks"
      	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
      )
      
      func main() {
      	pulumi.Run(func(ctx *pulumi.Context) error {
      		cluster, err := aks.NewCluster(ctx, "cluster", &aks.ClusterArgs{
      			NodesPerZone: pulumi.Int(3),
      			Location:     pulumi.String("WestUS"),
      			Version:      pulumi.String("1.24.3"),
      		})
      		if err != nil {
      			return err
      		}
      		ctx.Export("clusterName", cluster.Name)
      		ctx.Export("kubeconfig", cluster.Kubeconfig)
      		return nil
      	})
      }
      
  - key: go-gcp-gke
    language: go
    code: |
      package main
      
      import (
      	"github.com/pulumi/pulumi-gke/sdk/go/gke"
      	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
      )
      
      func main() {
      	pulumi.Run(func(ctx *pulumi.Context) error {
      		cluster, err := gke.NewCluster(ctx, "cluster", &gke.ClusterArgs{
      			NodesPerZone: pulumi.Int(3),
      			Location:     pulumi.String("us-west1"),
      			Version:      pulumi.String("1.24.3"),
      		})
      		if err != nil {
      			return err
      		}
      		ctx.Export("clusterName", cluster.Name)
      		ctx.Export("kubeconfig", cluster.Kubeconfig)
      		return nil
      	})
      }
      
  - key: go-kubernetes-helm
    language: go
    code: |
      package main
      
      import (
      	helmv3 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/helm/v3"
      	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
      )
      
      func main() {
      	pulumi.Run(func(ctx *pulumi.Context) error {
      		_, err := helmv3.NewRelease(ctx, "wordpress", &helmv3.ReleaseArgs{
      			Version: pulumi.String("15.0.5"),
      			Chart:   pulumi.String("wordpress"),
      			RepositoryOpts: &helmv3.RepositoryOptsArgs{
      				Repo: pulumi.String("https://charts.bitnami.com/bitnami"),
      			},
      		})
      		if err != nil {
      			return err
      		}
      		return nil
      	})
      }
      
  - key: go-kubernetes-nginx
    language: go
    code: |
      package main
      
      import (
      	appsv1 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/apps/v1"
      	corev1 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/core/v1"
      	metav1 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/meta/v1"
      	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
      )
      
      func main() {
      	pulumi.Run(func(ctx *pulumi.Context) error {
      		appLabels := map[string]interface{}{
      			"app": "nginx",
      		}
      		deployment, err := appsv1.NewDeployment(ctx, "deployment", &appsv1.DeploymentArgs{
      			Spec: &appsv1.DeploymentSpecArgs{
      				Selector: &metav1.LabelSelectorArgs{
      					MatchLabels: pulumi.StringMap(appLabels),
      				},
      				Replicas: pulumi.Int(1),
      				Template: &corev1.PodTemplateSpecArgs{
      					Metadata: &metav1.ObjectMetaArgs{
      						Labels: pulumi.StringMap(appLabels),
      					},
      					Spec: &corev1.PodSpecArgs{
      						Containers: corev1.ContainerArray{
      							&corev1.ContainerArgs{
      								Name:  pulumi.String("nginx"),
      								Image: pulumi.String("nginx"),
      							},
      						},
      					},
      				},
      			},
      		})
      		if err != nil {
      			return err
      		}
      		ctx.Export("name", deployment.Metadata.ApplyT(func(metadata metav1.ObjectMeta) (string, error) {
      			return metadata.Name, nil
      		}).(pulumi.StringOutput))
      		return nil
      	})
      }
      
  - key: java-aws-eks
    language: java
    code: |
      package demo;
      
      import com.pulumi.Context;
      import com.pulumi.Pulumi;
      import com.pulumi.core.Output;
      import com.pulumi.eks.Cluster;
      import com.pulumi.eks.ClusterArgs;
      
      public class App {
          public static void main(String[] args) {
              Pulumi.run(App::stack);
          }
      
          public static void stack(Context ctx) {
              final var vpcId = Ec2Functions.getVpc(GetVpcArgs.builder()
                  .default_(true)
                  .build()).id();
      
              final var subnetIds = Ec2Functions.getSubnetIds(GetSubnetIdsArgs.builder()
                  .vpcId(vpcId)
                  .build()).ids();
      
              var cluster = new Cluster("cluster", ClusterArgs.builder()
                  .vpcId(vpcId)
                  .subnetIds(subnetIds)
                  .instanceType("t2.medium")
                  .desiredCapacity(2)
                  .minSize(1)
                  .maxSize(2)
                  .build());
      
              ctx.export("kubeconfig", cluster.kubeconfig());
          }
      }
      
  - key: java-azure-aks
    language: java
    code: |
      package demo;
      
      import com.pulumi.Context;
      import com.pulumi.Pulumi;
      import com.pulumi.core.Output;
      import com.pulumi.aks.Cluster;
      import com.pulumi.aks.ClusterArgs;
      
      public class App {
          public static void main(String[] args) {
              Pulumi.run(App::stack);
          }
      
          public static void stack(Context ctx) {
              var cluster = new Cluster("cluster", ClusterArgs.builder()
                  .nodesPerZone(3)
                  .location("WestUS")
                  .version("1.24.3");
      
              ctx.export("clusterName", cluster.name());
              ctx.export("kubeconfig", cluster.kubeconfig());
          }
      }
      
  - key: java-gcp-gke
    language: java
    code: |
      package demo;
      
      import com.pulumi.Context;
      import com.pulumi.Pulumi;
      import com.pulumi.core.Output;
      import com.pulumi.gke.Cluster;
      import com.pulumi.gke.ClusterArgs;
      
      public class App {
          public static void main(String[] args) {
              Pulumi.run(App::stack);
          }
      
          public static void stack(Context ctx) {
              var cluster = new Cluster("cluster", ClusterArgs.builder()
                  .nodesPerZone(3)
                  .location("us-west1")
                  .version("1.24.3");
      
              ctx.export("clusterName", cluster.name());
              ctx.export("kubeconfig", cluster.kubeconfig());
          }
      }
      
  - key: java-kubernetes-helm
    language: java
    code: |
      package demo;
      
      import com.pulumi.Context;
      import com.pulumi.Pulumi;
      import com.pulumi.core.Output;
      import com.pulumi.kubernetes.helm.sh_v3.Release;
      import com.pulumi.kubernetes.helm.sh_v3.ReleaseArgs;
      import com.pulumi.kubernetes.helm.sh_v3.inputs.RepositoryOptsArgs;
      
      public class App {
          public static void main(String[] args) {
              Pulumi.run(App::stack);
          }
      
          public static void stack(Context ctx) {
              var wordpress = new Release("wordpress", ReleaseArgs.builder()
                  .version("15.0.5")
                  .chart("wordpress")
                  .repositoryOpts(RepositoryOptsArgs.builder()
                      .repo("https://charts.bitnami.com/bitnami")
                      .build())
                  .build());
      
          }
      }
      
  - key: java-kubernetes-nginx
    language: java
    code: |
      package demo;
      
      import com.pulumi.Context;
      import com.pulumi.Pulumi;
      import com.pulumi.core.Output;
      import com.pulumi.kubernetes.apps_v1.Deployment;
      import com.pulumi.kubernetes.apps_v1.DeploymentArgs;
      import com.pulumi.kubernetes.apps_v1.inputs.DeploymentSpecArgs;
      import com.pulumi.kubernetes.meta_v1.inputs.LabelSelectorArgs;
      import com.pulumi.kubernetes.core_v1.inputs.PodTemplateSpecArgs;
      import com.pulumi.kubernetes.meta_v1.inputs.ObjectMetaArgs;
      import com.pulumi.kubernetes.core_v1.inputs.PodSpecArgs;
      
      public class App {
          public static void main(String[] args) {
              Pulumi.run(App::stack);
          }
      
          public static void stack(Context ctx) {
              final var appLabels = %!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference);
      
              var deployment = new Deployment("deployment", DeploymentArgs.builder()
                  .spec(DeploymentSpecArgs.builder()
                      .selector(LabelSelectorArgs.builder()
                          .matchLabels(appLabels)
                          .build())
                      .replicas(1)
                      .template(PodTemplateSpecArgs.builder()
                          .metadata(ObjectMetaArgs.builder()
                              .labels(appLabels)
                              .build())
                          .spec(PodSpecArgs.builder()
                              .containers(ContainerArgs.builder()
                                  .name("nginx")
                                  .image("nginx")
                                  .build())
                              .build())
                          .build())
                      .build())
                  .build());
      
              ctx.export("name", deployment.metadata().applyValue(metadata -> metadata.name()));
          }
      }
      
  - key: python-aws-eks
    language: python
    code: |
      import pulumi
      import pulumi_aws as aws
      import pulumi_eks as eks
      
      vpc_id = aws.ec2.get_vpc(default=True).id
      subnet_ids = aws.ec2.get_subnet_ids(vpc_id=vpc_id).ids
      cluster = eks.Cluster("cluster",
          vpc_id=vpc_id,
          subnet_ids=subnet_ids,
          instance_type="t2.medium",
          desired_capacity=2,
          min_size=1,
          max_size=2)
      pulumi.export("kubeconfig", cluster.kubeconfig)
      
  - key: python-azure-aks
    language: python
    code: |
      import pulumi
      import pulumi_aks as aks
      
      cluster = aks.Cluster("cluster",
          nodes_per_zone=3,
          location="WestUS",
          version="1.24.3")
      pulumi.export("clusterName", cluster.name)
      pulumi.export("kubeconfig", cluster.kubeconfig)
      
  - key: python-gcp-gke
    language: python
    code: |
      import pulumi
      import pulumi_gke as gke
      
      cluster = gke.Cluster("cluster",
          nodes_per_zone=3,
          location="us-west1",
          version="1.24.3")
      pulumi.export("clusterName", cluster.name)
      pulumi.export("kubeconfig", cluster.kubeconfig)
      
  - key: python-kubernetes-helm
    language: python
    code: |
      import pulumi
      import pulumi_kubernetes as kubernetes
      
      wordpress = kubernetes.helm.v3.Release("wordpress",
          version="15.0.5",
          chart="wordpress",
          repository_opts=kubernetes.helm.v3.RepositoryOptsArgs(
              repo="https://charts.bitnami.com/bitnami",
          ))
      
  - key: python-kubernetes-nginx
    language: python
    code: |
      import pulumi
      import pulumi_kubernetes as kubernetes
      
      app_labels = {
          "app": "nginx",
      }
      deployment = kubernetes.apps.v1.Deployment("deployment", spec=kubernetes.apps.v1.DeploymentSpecArgs(
          selector=kubernetes.meta.v1.LabelSelectorArgs(
              match_labels=app_labels,
          ),
          replicas=1,
          template=kubernetes.core.v1.PodTemplateSpecArgs(
              metadata=kubernetes.meta.v1.ObjectMetaArgs(
                  labels=app_labels,
              ),
              spec=kubernetes.core.v1.PodSpecArgs(
                  containers=[kubernetes.core.v1.ContainerArgs(
                      name="nginx",
                      image="nginx",
                  )],
              ),
          ),
      ))
      pulumi.export("name", deployment.metadata.name)
      
  - key: typescript-aws-eks
    language: typescript
    code: |
      import * as pulumi from "@pulumi/pulumi";
      import * as aws from "@pulumi/aws";
      import * as eks from "@pulumi/eks";
      
      const vpcId = aws.ec2.getVpc({
          "default": true,
      }).then(invoke => invoke.id);
      const subnetIds = aws.ec2.getSubnetIds({
          vpcId: vpcId,
      }).then(invoke => invoke.ids);
      const cluster = new eks.Cluster("cluster", {
          vpcId: vpcId,
          subnetIds: subnetIds,
          instanceType: "t2.medium",
          desiredCapacity: 2,
          minSize: 1,
          maxSize: 2,
      });
      export const kubeconfig = cluster.kubeconfig;
      
  - key: typescript-azure-aks
    language: typescript
    code: |
      import * as aks from "@pulumi/aks";
      
      const cluster = new aks.Cluster("cluster", {
          nodesPerZone: 3,
          location: "WestUS",
          version: "1.24.3",
      });
      export const clusterName = cluster.name;
      export const kubeconfig = cluster.kubeconfig;
      
  - key: typescript-gcp-gke
    language: typescript
    code: |
      import * as gke from "@pulumi/gke";
      
      const cluster = new gke.Cluster("cluster", {
          nodesPerZone: 3,
          location: "us-west1",
          version: "1.24.3",
      });
      export const clusterName = cluster.name;
      export const kubeconfig = cluster.kubeconfig;
      
  - key: typescript-kubernetes-helm
    language: typescript
    code: |
      import * as pulumi from "@pulumi/pulumi";
      import * as kubernetes from "@pulumi/kubernetes";
      
      const wordpress = new kubernetes.helm.v3.Release("wordpress", {
          version: "15.0.5",
          chart: "wordpress",
          repositoryOpts: {
              repo: "https://charts.bitnami.com/bitnami",
          },
      });
      
  - key: typescript-kubernetes-nginx
    language: typescript
    code: |
      import * as pulumi from "@pulumi/pulumi";
      import * as kubernetes from "@pulumi/kubernetes";
      
      const appLabels = {
          app: "nginx",
      };
      const deployment = new kubernetes.apps.v1.Deployment("deployment", {spec: {
          selector: {
              matchLabels: appLabels,
          },
          replicas: 1,
          template: {
              metadata: {
                  labels: appLabels,
              },
              spec: {
                  containers: [{
                      name: "nginx",
                      image: "nginx",
                  }],
              },
          },
      }});
      export const name = deployment.metadata.apply(metadata => metadata?.name);
      
  - key: yaml-aws-eks
    language: yaml
    code: |
      name: aws-eks
      runtime: yaml
      description: An EKS cluster
      variables:
        vpcId:
          fn::invoke:
            function: aws:ec2:getVpc
            arguments:
              default: true
            return: id
        subnetIds:
          fn::invoke:
            function: aws:ec2:getSubnetIds
            arguments:
              vpcId: ${vpcId}
            return: ids
      resources:
        cluster:
          type: eks:Cluster
          properties:
            vpcId: ${vpcId}
            subnetIds: ${subnetIds}
            instanceType: "t2.medium"
            desiredCapacity: 2
            minSize: 1
            maxSize: 2
      outputs:
        kubeconfig: ${cluster.kubeconfig}
      
  - key: yaml-azure-aks
    language: yaml
    code: |
      name: azure-aks
      description: An AKS cluster
      runtime: yaml
      resources:
        managedCluster:
          type: aks:Cluster
          properties:
            nodesPerZone: 3
            location: WestUS
            version: 1.24.3
      
      outputs:
        clusterName: ${managedCluster.name}
        kubeconfig: ${managedCluster.kubeconfig}
      
  - key: yaml-gcp-gke
    language: yaml
    code: |
      name: gcp-gke
      description: A GKE cluster
      runtime: yaml
      resources:
        gke-cluster:
          type: gke:Cluster
          properties:
            nodesPerZone: 3
            location: us-west1
            version: 1.24.3
      
      outputs:
        clusterName: ${gke-cluster.name}
        kubeconfig: ${gke-cluster.kubeconfig}
      
  - key: yaml-kubernetes-helm
    language: yaml
    code: |
      name: convert
      runtime: yaml
      description: A Wordpress Helm Chart on Kubernetes
      
      resources:
        wordpress:
          type: kubernetes:helm.sh/v3:Release
          properties:
            version: 15.0.5
            chart: wordpress
            repositoryOpts:
              repo: https://charts.bitnami.com/bitnami
      
  - key: yaml-kubernetes-nginx
    language: yaml
    code: |
      name: convert
      runtime: yaml
      description: An nginx Deployment on Kubernetes
      
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
      
      outputs:
        name: ${deployment.metadata.name}
      
---
