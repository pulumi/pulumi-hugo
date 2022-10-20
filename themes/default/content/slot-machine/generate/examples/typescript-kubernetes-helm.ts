import * as pulumi from "@pulumi/pulumi";
import * as kubernetes from "@pulumi/kubernetes";

const wordpress = new kubernetes.helm.v3.Release("wordpress", {
    version: "15.0.5",
    chart: "wordpress",
    repositoryOpts: {
        repo: "https://charts.bitnami.com/bitnami",
    },
});
