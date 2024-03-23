using System.Collections.Generic;
using Eks = Pulumi.Eks;
using Kubernetes = Pulumi.Kubernetes;
using K8sCore = Pulumi.Kubernetes.Core.V1;
using K8sYaml = Pulumi.Kubernetes.Yaml;
using Pulumi;

return await Deployment.RunAsync(() =>
{    // Note: By default, Pulumi targets clusters based on your local `kubeconfig`.
    // Create resources from standard Kubernetes guestbook YAML.
    var guestbook = new K8sYaml.ConfigFile("guestbook",
        new K8sYaml.ConfigFileArgs
        {
            File = "app/guestbook.yaml",
        });

    // Get the frontend Service from the guestbook.
    var service = guestbook.GetResource<K8sCore.Service>("frontend");

    // Obtain the IP address of the Guestbook frontend.
    var ip = service.Apply(svc =>
        svc.Status.Apply(status =>
     {
         var ingress = status.LoadBalancer.Ingress[0];
         return ingress.Ip ?? ingress.Hostname;
     }));

    return new Dictionary<string, object?>
    {
        // Export the IP address of the Guestbook frontend.
        ["FrontendIp"] = ip,

    };
});