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
