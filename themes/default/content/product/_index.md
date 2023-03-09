---
title: Products
meta_desc: Learn how Pulumi's products enable your team to get code to any cloud productively, securely, and reliably, using your favorite languages.
type: page
layout: product

heading: Pulumi Overview
subheading: |
    Pulumi is a free, open source infrastructure as code tool, and works best with the Pulumi Service to
    make managing infrastructure secure, reliable, and hassle-free.<br><br>
    Pulumi helps developers and infrastructure teams collaborate
    and tame cloud complexity -- something we call Cloud Engineering.

overview:
    title: Infrastructure as Code for Engineers
    description: |
        Ship infrastructure faster with software engineering and an API-driven approach. Use Pulumi’s open source SDK with your favorite languages and software ecosystems to deploy infrastructure on any cloud, and securely scale infrastructure as code adoption across your team with enterprise-grade SaaS.

key_features:
    title: Key features
    items:
        - title: "Author in any language, deploy to any cloud"
          sub_title: "Pulumi Infrastructure as Code Engine"
          description: 
            Define infrastructure as code (IaC) in TypeScript/JavaScript, Python, Go, C#, Java, and YAML using your IDE and test frameworks for a fast inner dev loop. Deploy to [100+ providers](/registry/) like AWS, Azure, Google Cloud, and Kubernetes.
          image: "/images/product/pulumi-iac-code.png"
          button:
            text: "Learn more about Pulumi SDK"
            link: "/docs/reference/pulumi-sdk/"
          features:
              - title: IaC for every engineer
                description: |
                   Author and share infrastructure code in standard languages that anyone can easily use.
              - title: Author IaC faster
                description: |
                    Use your IDE with interactive documentation, type checking, and statement completion.
              - title: Write Policy as Code
                description: |
                    Write Policy as Code in programming languages to enforce best practices with [Crossguard](/crossguard/).

        - title: "Create infrastructure automation workflows"
          sub_title: "Pulumi Automation API"
          description: |
            Create workflows that coordinate provisioning, previewing, refreshing, and destroying cloud resources by using the Pulumi engine as a library in your application code.
          image: "/images/product/automation-api.png"
          button:
            text: "Learn more about Automation API"
            link: "/automation/"
          features:
              - title: 10x productivity
                description: |
                   Engineers can manage 10x more cloud resources compared to traditional CLI tools.
              - title: Build custom CLIs
                description: |
                    Create CLIs that make it easy for your developers to provision prebuilt architectures.
              - title: Power up your SaaS
                description: |
                    Enable your cloud service to dynamically provision and manage cloud resources at scale.

        - title: "Build infrastructure faster with reusable components"
          sub_title: "Pulumi Packages"
          description: |
            Build and reuse higher-level abstractions for cloud architectures with multi-language Pulumi Packages. Distribute the packages through repositories or package managers so your team members can reuse them.
          ide:
            - title: index.ts
              language: typescript
              code: |
                import * as eks from "@pulumi/eks";

                // Create an EKS cluster with the default configuration.
                const cluster = new eks.Cluster("eks-cluster");

                // Export the cluster's kubeconfig.
                export const kubeconfig = cluster.kubeconfig;
            - title: __main__.py
              language: python
              code: |
                import pulumi
                import pulumi_eks as eks

                # Create an EKS cluster with the default configuration.
                cluster = eks.Cluster("eks-cluster")

                # Export the cluster's kubeconfig.
                pulumi.export("kubeconfig", cluster.kubeconfig)
            - title: main.go
              language: go
              code: |
                    package main

                    import (
                      "github.com/pulumi/pulumi-eks/sdk/go/eks"
                      "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
                    )

                    func main() {
                      pulumi.Run(func(ctx *pulumi.Context) error {
                        // Create an EKS cluster with default settings.
                        cluster, err := eks.NewCluster(ctx, "eks-cluster", nil)
                        if err != nil {
                          return err
                        }

                        // Export the cluster's kubeconfig.
                        ctx.Export("kubeconfig", cluster.Kubeconfig)
                        return nil
                      })
                    }
            - title: MyStack.cs
              language: csharp
              code: |
                using System.Collections.Generic;
                using Pulumi;
                using Pulumi.Eks;

                await Deployment.RunAsync(() =>
                {
                  // Create an EKS cluster with default settings.
                  var cluster = new Cluster("eks-cluster");

                  // Export the cluster's kubeconfig.
                  return new Dictionary<string, object?>
                  {
                    ["kubeconfig"] = cluster.Kubeconfig
                  };
                });
            - title: Main.Java
              language: java
              code: |
                import com.pulumi.Context;
                import com.pulumi.Pulumi;
                import com.pulumi.eks.Cluster;

                public class App {
                    public static void main(String[] args) {
                        Pulumi.run(App::stack);
                    }

                    private static void stack(Context ctx) {
                    final var cluster = new Cluster("eks-cluster");
                    ctx.export("kubeconfig", cluster.kubeconfig());
                  }
                }
            - title: Pulumi.yaml
              language: yaml
              code: |
                resources:
                  eks-cluster:
                    type: eks:Cluster
                outputs:
                  kubeconfig: ${cluster.kubeconfig}
          button:
            text: "Learn more about Pulumi Packages"
            link: "/product/packages/"
          features:
              - title: Native cloud providers
                description: |
                    Full API coverage for AWS, Azure, Google Cloud, and Kubernetes with same-day updates.
              - title: Crosswalk for AWS
                description: |
                    Adopt well-architected best practices for your infrastructure easily with the [Crosswalk library](/docs/guides/crosswalk/aws/).
              - title: Cloud Native support
                description: |
                    Use a single workflow to manage cloud native infrastructure and [Kubernetes](/kubernetes/).
        
        - title: "Deliver infrastructure through software delivery pipelines"
          sub_title: "CI/CD Integrations"
          description: |
            Version, review, test, and deploy infrastructure code through the same tools and processes used for your application code.
          image: "/images/product/pulumi-cicd.png"
          button:
            text: "Learn more about CI/CD Integrations"
            link: "/docs/guides/continuous-delivery/"
          features:
              - title: Version and review
                description: |
                    Manage infrastructure code in Git and approve changes through pull requests.
              - title: Shift left
                description: |
                    Get rapid feedback on your code with fast [unit tests](/docs/guides/testing/), and run [integration tests](/docs/guides/testing/) against ephemeral infrastructure.
              - title: Continuous delivery
                description: |
                    [Integrate your CI/CD provider](/docs/guides/continuous-delivery/) with Pulumi or use GitOps to manage Kubernetes clusters.
        
        - title: "Scale and secure infrastructure as code for teams"
          sub_title: "Pulumi Service"
          description: |
             Store infrastructure state & secrets, empower teams to ship infrastructure collaboratively, and manage security and governance using the Pulumi Service. The fastest and easiest way to use Pulumi at scale. 
          image: "/images/product/pulumi-service.png"
          button:
            text: "Learn more about the Pulumi Service"
            link: "/product/pulumi-service/"
          features:
              - title: State & secrets management
                description: |
                    Securely store state with built-in secrets manager, or bring your own KMS.
              - title: Role-based access control
                description: |
                    Create teams (or use GitHub teams), set stack permissions, and manage access tokens.
              - title: Federated identity
                description: |
                    Manage identities and access with SCIM, SAML SSO, GitHub, GitLab, or Atlassian.
              - title: Policy enforcement
                description: |
                    Create policy packs and enforce them server-side across your team’s deployments.
              - title: Remote deployments
                description: |
                    Automate execution of IaC programs in a secure, [hosted environment](/product/pulumi-deployments/) and from GitHub.
              - title: Audit logs
                description: |
                    Track and store user actions and change history with option to export logs.

get_started:
    title: Getting started

    get_started:
        title: Get started now
        description: |
            Deploy your first app in just five minutes. Follow our tutorials for AWS, Azure, GCP, Kubernetes, and more.
        cta_text: Get Started

    migrate:
        title: Migrating from other tools
        description: |
            Transition from existing infrastructure tools or continue using both. Pulumi has converter tools for Terraform, AWS CloudFormation, Azure Resource Manager, and Kubernetes. 
        cta_text: Explore Converter Tools
---
