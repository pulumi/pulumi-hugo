import * as aks from "@pulumi/aks";

const cluster = new aks.Cluster("cluster", {
    nodesPerZone: 3,
    location: "WestUS",
    version: "1.24.3",
});
export const clusterName = cluster.name;
export const kubeconfig = cluster.kubeconfig;
