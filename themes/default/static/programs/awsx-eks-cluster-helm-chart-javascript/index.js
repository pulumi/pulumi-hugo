const pulumi = require("@pulumi/pulumi");
const eks = require("@pulumi/eks");
const kubernetes = require("@pulumi/kubernetes");

const cluster = new eks.Cluster("cluster", {});
const eksProvider = new kubernetes.Provider("eks-provider", {kubeconfig: cluster.kubeconfigJson});
const wordpress = new kubernetes.helm.v3.Release("wordpress", {
    repositoryOpts: {
        repo: "https://charts.bitnami.com/bitnami",
    },
    chart: "wordpress",
    values: {
        wordpressBlogName: "My Cool Kubernetes Blog!",
    },
}, {
    provider: eksProvider,
});

// Export the cluster's kubeconfig.
exports.kubeconfig = cluster.kubeconfig;
