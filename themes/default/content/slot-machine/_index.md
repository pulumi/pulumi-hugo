---
title: Slot Machine
meta_desc: Spin the Pulumi slot machine to get a real world code example using a random language, cloud, and application.
type: page
layout: slot-machine

examples:
  - key: typescript-kubernetes-nginx
    language: typescript
    code: |
      import * as pulumi from "@pulumi/pulumi";
      import * as kubernetes from "@pulumi/kubernetes";

      // Create a K8s namespace.
      const devNamespace = new kubernetes.core.v1.Namespace("devNamespace", {
          metadata: {
              name: "dev",
          },
      });

      // Deploy the K8s nginx-ingress Helm chart into the created namespace.
      const nginxIngress = new kubernetes.helm.v3.Chart("nginx-ingress", {
          chart: "nginx-ingress",
          namespace: devNamespace.metadata.name,
          fetchOpts:{
              repo: "https://charts.helm.sh/stable/",
          },
      });
  - key: python-kubernetes-nginx
    language: python
    code: |
      import pulumi_kubernetes as kubernetes
      # Create a K8s namespace.
      dev_namespace = kubernetes.core.v1.Namespace(
          "devNamespace",
          metadata={
              "name": "dev",
          })
      # Deploy the K8s nginx-ingress Helm chart into the created namespace.
      nginx_ingress = kubernetes.helm.v3.Chart(
          "nginx-ingress",
          kubernetes.helm.v3.ChartOpts(
              chart="nginx-ingress",
              namespace=dev_namespace.metadata["name"],
              fetch_opts=kubernetes.helm.v3.FetchOpts(
                  repo="https://charts.helm.sh/stable/",
              ),
          ),
      )
  - key: go-kubernetes-nginx
    language: go
    code: |
      package main

      import (
          corev1 "github.com/pulumi/pulumi-kubernetes/sdk/v2/go/kubernetes/core/v1"
          "github.com/pulumi/pulumi-kubernetes/sdk/v2/go/kubernetes/helm/v3"
          metav1 "github.com/pulumi/pulumi-kubernetes/sdk/v2/go/kubernetes/meta/v1"
          "github.com/pulumi/pulumi/sdk/v2/go/pulumi"
      )

      func main() {
          pulumi.Run(func(ctx *pulumi.Context) error {

              // Create a K8s namespace.
              ns, err := corev1.NewNamespace(ctx, "devNamespace", &corev1.NamespaceArgs{
                  Metadata: &metav1.ObjectMetaArgs{
                      Name: pulumi.String("dev"),
                  },
              })
              if err != nil {
                  return err
              }

              // Deploy the K8s nginx-ingress Helm chart into the created namespace.
              _, err = helm.NewChart(ctx, "nginx-ingress", helm.ChartArgs{
                  Chart: pulumi.String("nginx-ingress"),
                  Namespace: ns.Metadata.ApplyT(func(metadata interface{}) string {
                      return *metadata.(*metav1.ObjectMeta).Name
                  }).(pulumi.StringOutput),
                  FetchArgs: helm.FetchArgs{
                      Repo: pulumi.String("https://charts.helm.sh/stable/"),
                  },
              })
              if err != nil {
                  return err
              }

              return nil
          })
      }
---
