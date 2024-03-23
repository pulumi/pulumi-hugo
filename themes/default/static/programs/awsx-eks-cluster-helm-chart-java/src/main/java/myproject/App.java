package myproject;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.eks.Cluster;
import com.pulumi.kubernetes.Provider;
import com.pulumi.kubernetes.ProviderArgs;
import com.pulumi.kubernetes.helm.v3.Release;
import com.pulumi.kubernetes.helm.v3.ReleaseArgs;
import com.pulumi.kubernetes.helm.v3.inputs.RepositoryOptsArgs;
import com.pulumi.resources.CustomResourceOptions;
import java.util.Map;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        var cluster = new Cluster("cluster");

        var eksProvider = new Provider("eksProvider", ProviderArgs.builder()
            .kubeconfig(cluster.kubeconfigJson())
            .build());

        var wordpress = new Release("wordpress", ReleaseArgs.builder()
            .repositoryOpts(RepositoryOptsArgs.builder()
                .repo("https://charts.bitnami.com/bitnami")
                .build())
            .chart("wordpress")
            .values(Map.of("wordpressBlogName", "My Cool Kubernetes Blog!"))
            .build(), CustomResourceOptions.builder()
                .provider(eksProvider)
                .build());

        ctx.export("kubeconfig", cluster.kubeconfig());
    }
}