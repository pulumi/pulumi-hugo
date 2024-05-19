const pulumi = require("@pulumi/pulumi");
const k8s = require("@pulumi/kubernetes");

// Note: By default, Pulumi targets clusters based on your local `kubeconfig`.
// Create resources from standard Kubernetes guestbook YAML example.
const guestbook = new k8s.yaml.ConfigFile("guestbook",
    { file: "app/guestbook.yaml" },
);

// Get the frontend Service from the guestbook.
const service = k8s.core.v1.Service.get("frontend");

// Export the IP address of the Guestbook frontend.
exports.frontendIp = service.status.apply(status =>
    status.loadBalancer.ingress && status.loadBalancer.ingress.length > 0
        ? status.loadBalancer.ingress[0].ip
        : null
);
