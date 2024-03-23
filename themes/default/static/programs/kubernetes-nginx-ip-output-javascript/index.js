"use strict";
const pulumi = require("@pulumi/pulumi");
const k8s = require("@pulumi/kubernetes");

const config = new pulumi.Config();
const isMinikube = config.requireBoolean("isMinikube");

const appName = "nginx";
const appLabels = { app: appName };
const deployment = new k8s.apps.v1.Deployment(appName, {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: { containers: [{ name: appName, image: "nginx" }] },
        },
    },
});

// Allocate an IP to the Deployment.
const frontend = new k8s.core.v1.Service(appName, {
    metadata: { labels: deployment.spec.template.metadata.labels },
    spec: {
        type: isMinikube ? "ClusterIP" : "LoadBalancer",
        ports: [{ port: 80, targetPort: 80, protocol: "TCP" }],
        selector: appLabels,
    },
});

// When "done", this will print the public IP.
exports.ip = isMinikube ? frontend.spec.clusterIP : frontend.status.loadBalancer.apply(lb => lb.ingress[0].ip || lb.ingress[0].hostname);
