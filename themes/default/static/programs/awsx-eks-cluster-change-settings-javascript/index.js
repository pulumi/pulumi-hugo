const eks = require("@pulumi/eks");

// Create an EKS cluster with a modified configuration.
const cluster = new eks.Cluster("cluster", {
    desiredCapacity: 5,
    minSize: 3,
    maxSize: 5,
    enabledClusterLogTypes: [
        "api",
        "audit",
        "authenticator",
    ],
});

// Export the cluster's kubeconfig.
exports.kubeconfig = cluster.kubeconfig;