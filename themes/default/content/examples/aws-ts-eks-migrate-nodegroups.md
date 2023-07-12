---
title: "Zero Downtime Migration of EKS Node Groups"
meta_desc: ""
metadata:
  id: aws-ts-eks-migrate-nodegroups
  title: "Zero Downtime Migration of EKS Node Groups"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/aws-ts-eks-migrate-nodegroups
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example demonstrates how to migrate AWS EKS nodegroups, while using TypeScript as the programming language. This example uses the Amazon Web Services (AWS) cloud provider. Specifically, it shows how to use Pulumi to create multiple nodegroups, configure them with auto-scaling and spot pricing strategies, migrate to different Kubernetes versions, uninstall outdated versions, and safely discard the old nodegroup. This example serves the general cloud-computing use case of managing cloud resources in an automated, scalable manner."
---

# Zero Downtime Migration of EKS Node Groups

Creates an EKS cluster with node groups and a workload, and showcases adding a
node group to use for workload migration with zero downtime.

For step-by-step instructions, check out the [tutorial][tutorial-migrate-nodegroups].

[tutorial-migrate-nodegroups]: https://www.pulumi.com/docs/tutorials/kubernetes/eks-migrate-nodegroups/


