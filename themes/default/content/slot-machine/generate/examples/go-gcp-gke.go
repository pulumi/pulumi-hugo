package main

import (
	"github.com/pulumi/pulumi-gke/sdk/go/gke"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		cluster, err := gke.NewCluster(ctx, "cluster", &gke.ClusterArgs{
			NodesPerZone: pulumi.Int(3),
			Location:     pulumi.String("us-west1"),
			Version:      pulumi.String("1.24.3"),
		})
		if err != nil {
			return err
		}
		ctx.Export("clusterName", cluster.Name)
		ctx.Export("kubeconfig", cluster.Kubeconfig)
		return nil
	})
}
