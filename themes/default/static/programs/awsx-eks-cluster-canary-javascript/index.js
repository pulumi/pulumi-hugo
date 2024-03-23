const pulumi = require("@pulumi/pulumi");
const eks = require("@pulumi/eks");
const kubernetes = require("@pulumi/kubernetes");

// Create an EKS cluster with the default configuration.
const cluster = new eks.Cluster("cluster", {});
const eksProvider = new kubernetes.Provider("eks-provider", {
    kubeconfig: cluster.kubeconfigJson,
});

// Deploy a small canary service (NGINX), to test that the cluster is working.
const myDeployment = new kubernetes.apps.v1.Deployment("my-deployment", {
    metadata: {
        labels: {
            appClass: "my-deployment",
        },
    },
    spec: {
        replicas: 2,
        selector: {
            matchLabels: {
                appClass: "my-deployment",
            },
        },
        template: {
            metadata: {
                labels: {
                    appClass: "my-deployment",
                },
            },
            spec: {
                containers: [{
                    name: "my-deployment",
                    image: "nginx",
                    ports: [{
                        name: "http",
                        containerPort: 80,
                    }],
                }],
            },
        },
    },
}, {
    provider: eksProvider,
});

const myService = new kubernetes.core.v1.Service("my-service", {
    metadata: {
        labels: {
            appClass: "my-deployment",
        },
    },
    spec: {
        type: "LoadBalancer",
        ports: [{
            port: 80,
            targetPort: "http",
        }],
        selector: {
            appClass: "my-deployment",
        },
    },
}, {
    provider: eksProvider,
});

// Export the cluster's kubeconfig.
exports.kubeconfig = cluster.kubeconfig;

// Export the URL for the load balanced service.
exports.url = myService.status.apply(status => 
    status?.loadBalancer?.ingress[0]?.hostname
);