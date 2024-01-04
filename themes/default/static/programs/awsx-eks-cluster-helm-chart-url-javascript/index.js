const eks = require("@pulumi/eks");
const kubernetes = require("@pulumi/kubernetes");

const cluster = new eks.Cluster("cluster", {});
const wordpress = new kubernetes.helm.v3.Release("wordpress", {
    chart: "https://charts.bitnami.com/bitnami/wordpress-15.2.17.tgz"
});

// Export the cluster's kubeconfig.
exports.kubeconfig = cluster.kubeconfig;
