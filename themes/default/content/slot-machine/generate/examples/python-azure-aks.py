import pulumi
import pulumi_aks as aks

cluster = aks.Cluster("cluster",
    nodes_per_zone=3,
    location="WestUS",
    version="1.24.3")
pulumi.export("clusterName", cluster.name)
pulumi.export("kubeconfig", cluster.kubeconfig)
