import pulumi
import pulumi_gke as gke

cluster = gke.Cluster("cluster",
    nodes_per_zone=3,
    location="us-west1",
    version="1.24.3")
pulumi.export("clusterName", cluster.name)
pulumi.export("kubeconfig", cluster.kubeconfig)
