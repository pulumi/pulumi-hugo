using System.Collections.Generic;
using Pulumi;
using Kubernetes = Pulumi.Kubernetes;

return await Deployment.RunAsync(() => 
{
    var appLabels = 
    {
        { "app", "nginx" },
    };

    var deployment = new Kubernetes.Apps.V1.Deployment("deployment", new()
    {
        Spec = new Kubernetes.Types.Inputs.Apps.V1.DeploymentSpecArgs
        {
            Selector = new Kubernetes.Types.Inputs.Meta.V1.LabelSelectorArgs
            {
                MatchLabels = appLabels,
            },
            Replicas = 1,
            Template = new Kubernetes.Types.Inputs.Core.V1.PodTemplateSpecArgs
            {
                Metadata = new Kubernetes.Types.Inputs.Meta.V1.ObjectMetaArgs
                {
                    Labels = appLabels,
                },
                Spec = new Kubernetes.Types.Inputs.Core.V1.PodSpecArgs
                {
                    Containers = new[]
                    {
                        new Kubernetes.Types.Inputs.Core.V1.ContainerArgs
                        {
                            Name = "nginx",
                            Image = "nginx",
                        },
                    },
                },
            },
        },
    });

    return new Dictionary<string, object?>
    {
        ["name"] = deployment.Metadata.Apply(metadata => metadata?.Name),
    };
});

