package main

import (
	"github.com/pulumi/pulumi-eks/sdk/go/eks"
	helmv3 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/helm/v3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		cluster, err := eks.NewCluster(ctx, "cluster", nil)
		if err != nil {
			return err
		}

		_, err = helmv3.NewRelease(ctx, "wordpress", &helmv3.ReleaseArgs{
			Chart: pulumi.String("https://charts.bitnami.com/bitnami/wordpress-15.2.17.tgz"),
		})
		if err != nil {
			return err
		}

		ctx.Export("kubeconfig", cluster.Kubeconfig)
		return nil
	})
}
