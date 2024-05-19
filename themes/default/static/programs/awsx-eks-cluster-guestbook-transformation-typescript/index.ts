import * as k8s from "@pulumi/kubernetes";

// Note: By default, Pulumi targets clusters based on your local `kubeconfig`.

//  Place objects into this desired namespace
const namespaceName = "guestbook-ns";
// Create resources from standard Kubernetes guestbook YAML example.
const guestbook = new k8s.yaml.ConfigFile("guestbook",
    {
        file: "app/guestbook.yaml",
        transformations: [
            (obj: any) => {
                // Make every service private to the cluster.
                if (obj.kind == "Service" && obj.apiVersion == "v1") {
                    if (obj.spec && obj.spec.type && obj.spec.type == "LoadBalancer") {
                        obj.spec.type = "ClusterIP";
                    }
                }
            },
            // Put every resource in the created namespace.
            (obj: any) => {
                if (obj.metadata !== undefined) {
                    obj.metadata.namespace = namespaceName
                } else {
                    obj.metadata = { namespace: namespaceName }
                }
            }
        ],
    },
);

