using System.Collections.Generic;
using Pulumi;
using Gke = Pulumi.Gke;

return await Deployment.RunAsync(() =>
{
    var cluster = new Gke.Cluster("cluster", new()
    {
        NodesPerZone = 3,
        Location = "us-west1",
        Version = "1.24.3",
    });

    return new Dictionary<string, object?>
    {
        ["clusterName"] = cluster.Name,
        ["kubeconfig"] = cluster.Kubeconfig,
    };
});

