const eks = require("@pulumi/eks");

// Create an EKS cluster with the default configuration.
const cluster = new eks.Cluster("cluster", {});

// Export the cluster's kubeconfig.
exports.kubeconfig = cluster.kubeconfig;