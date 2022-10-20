import * as pulumi from "@pulumi/pulumi";
import * as kubernetes from "@pulumi/kubernetes";

const appLabels = {
    app: "nginx",
};
const deployment = new kubernetes.apps.v1.Deployment("deployment", {spec: {
    selector: {
        matchLabels: appLabels,
    },
    replicas: 1,
    template: {
        metadata: {
            labels: appLabels,
        },
        spec: {
            containers: [{
                name: "nginx",
                image: "nginx",
            }],
        },
    },
}});
export const name = deployment.metadata.apply(metadata => metadata?.name);
