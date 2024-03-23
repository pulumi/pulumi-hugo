using System.Collections.Generic;
using System.Collections.Immutable;
using K8sYaml = Pulumi.Kubernetes.Yaml;
using Pulumi;

return await Deployment.RunAsync(() =>
{    // Note: By default, Pulumi targets clusters based on your local `kubeconfig`.

    //  Place objects into this desired namespace
    var namespaceName = "guestbook-ns";
    // Create resources from standard Kubernetes guestbook YAML.
    var guestbook = new K8sYaml.ConfigFile("guestbook",
        new K8sYaml.ConfigFileArgs
        {
            File = "app/guestbook.yaml",
            Transformations = {
            // Make every service private to the cluster.
            (state, opts) => {
                if (state["kind"] != null && state["kind"].Equals("Service") &&
                        state["apiVersion"] != null && state["apiVersion"].Equals("v1")) {
                    var spec = (ImmutableDictionary<string, object>)state["spec"];
                    return state.SetItem("spec", spec.SetItem("type", "ClustertIP"));
                }
                return state;
            },
            // Put every resource in the created namespace.
            (state, opts) => {
                if (state["metadata"] != null) {
                    var meta = (ImmutableDictionary<string, object>)state["metadata"];
                    return state.SetItem("metadata", meta.SetItem("namespace", namespaceName));
                }
                return state.SetItem("metadata", new Dictionary<string, object> {
                    { "namespace", namespaceName }
                }.ToImmutableDictionary());
            }
        }
        });
});