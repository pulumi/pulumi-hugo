package main

import (
	corev1 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/core/v1"
	k8syaml "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/yaml"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		// Note: By default, Pulumi targets clusters based on your local `kubeconfig`.
		// Create resources from standard Kubernetes guestbook YAML example.
		guestbook, err := k8syaml.NewConfigFile(ctx, "guestbook", &k8syaml.ConfigFileArgs{
			File: "app/guestbook.yaml",
		})
		if err != nil {
			return err
		}

		// Export the IP address of the Guestbook frontend.
		if service := guestbook.GetResource("v1/Service", "frontend", "").(*corev1.Service); service != nil {
			ip := service.Status.ApplyT(func(val *corev1.ServiceStatus) string {
				if val.LoadBalancer.Ingress != nil && len(val.LoadBalancer.Ingress) > 0 {
					ingress := val.LoadBalancer.Ingress[0]
					if ingress.Ip != nil {
						return *ingress.Ip
					}
					if ingress.Hostname != nil {
						return *ingress.Hostname
					}
				}
				return ""
			}).(pulumi.StringOutput)

			ctx.Export("FrontendIp", ip)

		} 
		return nil
	})
}
