package main

import (
	"github.com/pulumi/pulumi-aks/sdk/go/aks"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		cluster, err := aks.NewCluster(ctx, "cluster", &aks.ClusterArgs{
			NodesPerZone: pulumi.Int(3),
			Location:     pulumi.String("WestUS"),
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
