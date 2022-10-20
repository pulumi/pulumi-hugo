using System.Collections.Generic;
using Pulumi;
using Kubernetes = Pulumi.Kubernetes;

return await Deployment.RunAsync(() => 
{
    var wordpress = new Kubernetes.Helm.V3.Release("wordpress", new()
    {
        Version = "15.0.5",
        Chart = "wordpress",
        RepositoryOpts = new Kubernetes.Types.Inputs.Helm.V3.RepositoryOptsArgs
        {
            Repo = "https://charts.bitnami.com/bitnami",
        },
    });

});

