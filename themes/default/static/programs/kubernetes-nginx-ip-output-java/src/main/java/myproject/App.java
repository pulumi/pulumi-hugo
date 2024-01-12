package myproject;

import java.util.Map;

import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.kubernetes.apps.v1.Deployment;
import com.pulumi.kubernetes.apps.v1.DeploymentArgs;
import com.pulumi.kubernetes.apps.v1.inputs.DeploymentSpecArgs;
import com.pulumi.kubernetes.core.v1.Service;
import com.pulumi.kubernetes.core.v1.ServiceArgs;
import com.pulumi.kubernetes.core.v1.enums.ServiceSpecType;
import com.pulumi.kubernetes.core.v1.inputs.ContainerArgs;
import com.pulumi.kubernetes.core.v1.inputs.ContainerPortArgs;
import com.pulumi.kubernetes.core.v1.inputs.PodSpecArgs;
import com.pulumi.kubernetes.core.v1.inputs.PodTemplateSpecArgs;
import com.pulumi.kubernetes.core.v1.inputs.ServicePortArgs;
import com.pulumi.kubernetes.core.v1.inputs.ServiceSpecArgs;
import com.pulumi.kubernetes.meta.v1.inputs.LabelSelectorArgs;
import com.pulumi.kubernetes.meta.v1.inputs.ObjectMetaArgs;

public class App {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            var config = ctx.config();
            var isMinikube = config.requireBoolean("isMinikube");
            var labels = Map.of("app", "nginx");

            var deployment = new Deployment("nginx", DeploymentArgs.builder()
                    .spec(DeploymentSpecArgs.builder()
                            .selector(LabelSelectorArgs.builder()
                                    .matchLabels(labels)
                                    .build())
                            .replicas(1)
                            .template(PodTemplateSpecArgs.builder()
                                    .metadata(ObjectMetaArgs.builder()
                                            .labels(labels)
                                            .build())
                                    .spec(PodSpecArgs.builder()
                                            .containers(ContainerArgs.builder()
                                                    .name("nginx")
                                                    .image("nginx")
                                                    .ports(ContainerPortArgs.builder()
                                                            .containerPort(80)
                                                            .build())
                                                    .build())
                                            .build())
                                    .build())
                            .build())
                    .build());

            var frontend = new Service("nginx", ServiceArgs.builder()
                    .metadata(ObjectMetaArgs.builder()
                            .labels(labels)
                            .build())
                    .spec(ServiceSpecArgs.builder()
                            .type(isMinikube ? ServiceSpecType.ClusterIP : ServiceSpecType.LoadBalancer)
                            .selector(labels)
                            .ports(ServicePortArgs.builder()
                                    .port(80)
                                    .targetPort(80)
                                    .protocol("TCP")
                                    .build())
                            .build())
                    .build());

            ctx.export("ip", isMinikube
                    ? frontend.spec().applyValue(spec -> spec.clusterIP())
                    : Output.tuple(frontend.status(), frontend.spec()).applyValue(t -> {
                        var status = t.t1;
                        var spec = t.t2;
                        var ingress = status.get().loadBalancer().get().ingress().get(0);
                        return ingress.ip().orElse(
                                ingress.hostname().orElse(
                                        spec.clusterIP().toString()));
                    }));
        });
    }
}