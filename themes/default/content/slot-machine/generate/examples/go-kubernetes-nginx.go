package main

import (
	corev1 "github.com/pulumi/pulumi-kubernetes/sdk/v2/go/kubernetes/core/v1"
	metav1 "github.com/pulumi/pulumi-kubernetes/sdk/v2/go/kubernetes/meta/v1"
	"github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/helm/v2"
	"github.com/pulumi/pulumi/sdk/v2/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {

		// Create a K8s namespace.
		ns, err := corev1.NewNamespace(ctx, "devNamespace", &corev1.NamespaceArgs{
			Metadata: &metav1.ObjectMetaArgs{
				Name: pulumi.String("dev"),
			},
		})
		if err != nil {
			return err
		}

		// Deploy the K8s nginx-ingress Helm chart into the created namespace.
		_, err = helm.NewChart(ctx, "nginx-ingress", helm.ChartArgs{
			Chart: pulumi.String("nginx-ingress"),
			Namespace: ns.Metadata.ApplyT(func(metadata interface{}) string {
				return *metadata.(*metav1.ObjectMeta).Name
			}).(pulumi.StringOutput),
			FetchArgs: helm.FetchArgs{
				Repo: pulumi.String("https://charts.helm.sh/stable/"),
			},
		})
		if err != nil {
			return err
		}

		return nil
	})
}
