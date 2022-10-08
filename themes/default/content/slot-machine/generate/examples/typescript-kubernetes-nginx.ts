import * as pulumi from "@pulumi/pulumi";
import * as kubernetes from "@pulumi/kubernetes";

// Create a K8s namespace.
const devNamespace = new kubernetes.core.v1.Namespace("devNamespace", {
    metadata: {
        name: "dev",
    },
});

// Deploy the K8s nginx-ingress Helm chart into the created namespace.
const nginxIngress = new kubernetes.helm.v3.Chart("nginx-ingress", {
    chart: "nginx-ingress",
    namespace: devNamespace.metadata.name,
    fetchOpts:{
        repo: "https://charts.helm.sh/stable/",
    },
});
