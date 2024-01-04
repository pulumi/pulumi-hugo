using System.Collections.Generic;
using Pulumi;
using Eks = Pulumi.Eks;
using Kubernetes = Pulumi.Kubernetes;

return await Deployment.RunAsync(() =>
{
    var cluster = new Eks.Cluster("cluster");

    var wordpress = new Kubernetes.Helm.V3.Release("wordpress", new()
    {
       Chart = "https://charts.bitnami.com/bitnami/wordpress-15.2.17.tgz",
    });

    return new Dictionary<string, object?>
    {
        ["kubeconfig"] = cluster.Kubeconfig,
    };
});