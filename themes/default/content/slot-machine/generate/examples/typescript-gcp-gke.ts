import * as gke from "@pulumi/gke";

const cluster = new gke.Cluster("cluster", {
    nodesPerZone: 3,
    location: "us-west1",
    version: "1.24.3",
});
export const clusterName = cluster.name;
export const kubeconfig = cluster.kubeconfig;
