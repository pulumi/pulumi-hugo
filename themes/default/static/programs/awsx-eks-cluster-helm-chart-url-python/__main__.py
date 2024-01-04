import pulumi
import pulumi_eks as eks
import pulumi_kubernetes as kubernetes

cluster = eks.Cluster("cluster")
ordpress = kubernetes.helm.v3.Release("helm", chart="https://charts.bitnami.com/bitnami/wordpress-15.2.17.tgz")
pulumi.export("kubeconfig", cluster.kubeconfig)