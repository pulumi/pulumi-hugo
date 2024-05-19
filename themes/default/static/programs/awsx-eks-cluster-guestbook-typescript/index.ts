import * as k8s from "@pulumi/kubernetes";

// Note: By default, Pulumi targets clusters based on your local `kubeconfig`.
// Create resources from standard Kubernetes guestbook YAML example.
const guestbook = new k8s.yaml.ConfigFile("guestbook",
    { file: "app/guestbook.yaml" }
);

// Get the frontend Service from the guestbook.
const service = guestbook.getResource("v1/Service", "frontend");

// Export the IP address of the Guestbook frontend.
export const frontendIp = service
.apply(s =>
  s.status.loadBalancer.ingress && s.status.loadBalancer.ingress[0].ip);