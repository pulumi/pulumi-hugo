using System.Collections.Generic;
using Pulumi;
using Aks = Pulumi.Aks;

return await Deployment.RunAsync(() =>
{
    var cluster = new Aks.Cluster("cluster", new()
    {
        NodesPerZone = 3,
        Location = "WestUS",
        Version = "1.24.3",
    });

    return new Dictionary<string, object?>
    {
        ["clusterName"] = cluster.Name,
        ["kubeconfig"] = cluster.Kubeconfig,
    };
});

