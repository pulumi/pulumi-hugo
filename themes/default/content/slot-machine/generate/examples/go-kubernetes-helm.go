package main

import (
	helmv3 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/helm/v3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := helmv3.NewRelease(ctx, "wordpress", &helmv3.ReleaseArgs{
			Version: pulumi.String("15.0.5"),
			Chart:   pulumi.String("wordpress"),
			RepositoryOpts: &helmv3.RepositoryOptsArgs{
				Repo: pulumi.String("https://charts.bitnami.com/bitnami"),
			},
		})
		if err != nil {
			return err
		}
		return nil
	})
}
