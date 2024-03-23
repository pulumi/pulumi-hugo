import * as kubernetes from "@pulumi/kubernetes";

const wordpress = new kubernetes.helm.v3.Release("wordpress", {
    chart: "https://charts.bitnami.com/bitnami/wordpress-15.2.17.tgz"
});