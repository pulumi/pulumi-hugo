package myproject;

import com.pulumi.Context;

import com.pulumi.Pulumi;
import com.pulumi.eks.Cluster;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        // Create an EKS cluster with the default configuration.
        var cluster = new Cluster("cluster");

        // Export the cluster's kubeconfig.
        ctx.export("kubeconfig", cluster.kubeconfig());
    }
}