package demo;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.gke.Cluster;
import com.pulumi.gke.ClusterArgs;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        var cluster = new Cluster("cluster", ClusterArgs.builder()
            .nodesPerZone(3)
            .location("us-west1")
            .version("1.24.3");

        ctx.export("clusterName", cluster.name());
        ctx.export("kubeconfig", cluster.kubeconfig());
    }
}
