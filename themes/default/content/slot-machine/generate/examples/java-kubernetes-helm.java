package demo;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.kubernetes.helm.sh_v3.Release;
import com.pulumi.kubernetes.helm.sh_v3.ReleaseArgs;
import com.pulumi.kubernetes.helm.sh_v3.inputs.RepositoryOptsArgs;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        var wordpress = new Release("wordpress", ReleaseArgs.builder()
            .version("15.0.5")
            .chart("wordpress")
            .repositoryOpts(RepositoryOptsArgs.builder()
                .repo("https://charts.bitnami.com/bitnami")
                .build())
            .build());

    }
}
