package main

import (
	k8syaml "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/yaml"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		// Note: By default, Pulumi targets clusters based on your local `kubeconfig`.
		
		//  Place objects into this desired namespace
		namespaceName := "guestbook-ns"

		// Create resources from standard Kubernetes guestbook YAML example.
		_, err := k8syaml.NewConfigFile(ctx, "guestbook", &k8syaml.ConfigFileArgs{
			File: "app/guestbook.yaml",
			Transformations: []k8syaml.Transformation{

				// Make every service private to the cluster.
				func(state map[string]interface{}, opts ...pulumi.ResourceOption) {
					if state["kind"] == "Service" && state["apiVersion"] == "v1" {
						spec := state["spec"].(map[string]interface{})
						spec["type"] = "ClusterIP"
					}
				},
				// Put every resource in the created namespace.
				func(state map[string]interface{}, opts ...pulumi.ResourceOption) {
					if state["metadata"] != nil {
						meta := state["metadata"].(map[string]interface{})
						meta["namespace"] = namespaceName
					} else {
						state["metadata"] = map[string]interface{}{
							"namespace": namespaceName,
						}
					}
				},
			},
		})
		return err
	})
}
