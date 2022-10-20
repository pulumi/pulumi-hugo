package demo;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.kubernetes.apps_v1.Deployment;
import com.pulumi.kubernetes.apps_v1.DeploymentArgs;
import com.pulumi.kubernetes.apps_v1.inputs.DeploymentSpecArgs;
import com.pulumi.kubernetes.meta_v1.inputs.LabelSelectorArgs;
import com.pulumi.kubernetes.core_v1.inputs.PodTemplateSpecArgs;
import com.pulumi.kubernetes.meta_v1.inputs.ObjectMetaArgs;
import com.pulumi.kubernetes.core_v1.inputs.PodSpecArgs;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        final var appLabels = %!v(PANIC=Format method: runtime error: invalid memory address or nil pointer dereference);

        var deployment = new Deployment("deployment", DeploymentArgs.builder()
            .spec(DeploymentSpecArgs.builder()
                .selector(LabelSelectorArgs.builder()
                    .matchLabels(appLabels)
                    .build())
                .replicas(1)
                .template(PodTemplateSpecArgs.builder()
                    .metadata(ObjectMetaArgs.builder()
                        .labels(appLabels)
                        .build())
                    .spec(PodSpecArgs.builder()
                        .containers(ContainerArgs.builder()
                            .name("nginx")
                            .image("nginx")
                            .build())
                        .build())
                    .build())
                .build())
            .build());

        ctx.export("name", deployment.metadata().applyValue(metadata -> metadata.name()));
    }
}
