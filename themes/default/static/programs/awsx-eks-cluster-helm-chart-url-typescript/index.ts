import * as eks from "@pulumi/eks";
import * as kubernetes from "@pulumi/kubernetes";

const cluster = new eks.Cluster("cluster", {});
const wordpress = new kubernetes.helm.v3.Release("wordpress", {
    chart: "https://charts.bitnami.com/bitnami/wordpress-15.2.17.tgz"
});
export const kubeconfig = cluster.kubeconfig;