package main

import (
	appsv1 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/apps/v1"
	corev1 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/core/v1"
	metav1 "github.com/pulumi/pulumi-kubernetes/sdk/v3/go/kubernetes/meta/v1"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		appLabels := map[string]interface{}{
			"app": "nginx",
		}
		deployment, err := appsv1.NewDeployment(ctx, "deployment", &appsv1.DeploymentArgs{
			Spec: &appsv1.DeploymentSpecArgs{
				Selector: &metav1.LabelSelectorArgs{
					MatchLabels: pulumi.StringMap(appLabels),
				},
				Replicas: pulumi.Int(1),
				Template: &corev1.PodTemplateSpecArgs{
					Metadata: &metav1.ObjectMetaArgs{
						Labels: pulumi.StringMap(appLabels),
					},
					Spec: &corev1.PodSpecArgs{
						Containers: corev1.ContainerArray{
							&corev1.ContainerArgs{
								Name:  pulumi.String("nginx"),
								Image: pulumi.String("nginx"),
							},
						},
					},
				},
			},
		})
		if err != nil {
			return err
		}
		ctx.Export("name", deployment.Metadata.ApplyT(func(metadata metav1.ObjectMeta) (string, error) {
			return metadata.Name, nil
		}).(pulumi.StringOutput))
		return nil
	})
}
