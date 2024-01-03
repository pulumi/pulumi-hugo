package myproject;

import javax.naming.Context;

import com.pulumi.Pulumi;
import com.pulumi.eks.Cluster;
import com.pulumi.eks.ClusterArgs;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        // Create an EKS cluster with a modified configuration.
        var cluster = new Cluster("cluster", ClusterArgs.builder()
                .desiredCapacity(5)
                .minSize(3)
                .maxSize(5)
                .enabledClusterLogTypes(
                        "api",
                        "audit",
                        "authenticator")
                .build());

        // Export the cluster's kubeconfig.
        ctx.export("kubeconfig", cluster.kubeconfig());
    }
}