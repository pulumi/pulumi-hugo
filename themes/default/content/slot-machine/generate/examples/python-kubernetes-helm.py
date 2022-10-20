import pulumi
import pulumi_kubernetes as kubernetes

wordpress = kubernetes.helm.v3.Release("wordpress",
    version="15.0.5",
    chart="wordpress",
    repository_opts=kubernetes.helm.v3.RepositoryOptsArgs(
        repo="https://charts.bitnami.com/bitnami",
    ))
