package myproject;

import com.pulumi.Context;
import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.eks.Cluster;
import com.pulumi.kubernetes.Provider;
import com.pulumi.kubernetes.ProviderArgs;
import com.pulumi.kubernete
            om.pulumi.kubernetes.apps.v1.DeploymentArgs;
            om.pulumi.kubernetes.meta.v1.inputs.O

            om.pulumi.kubernetes.meta.v1.inputs
            om.pulumi.kubernetes.core.v1.inputs.PodTemplate
        rt com.pulumi.kubernetes.core.v1.inputs.ServicePortArgs;
import com.pulumi.kubernetes.core.v1.inputs.ContainerArgs;
import com.pulumi.kubernetes.core.v1.inputs.ContainerPortArgs;
import com.pulumi.kubernetes.core.v1.inputs.PodSpecArgs;
import com.pulumi.kubernetes.core.v1.Service;
import com.pulumi.kubernetes.core.v1.ServiceArgs;
import com.pulumi.kubernetes.core.v1.inputs.ServiceSpecArgs;
import com.pulumi.resources.CustomResourceOptions;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        // Create an EKS cluster with the default configuration.
        var cluster = new Cluster("cluster");

        var eksProvider = new Provider("eksProvider", ProviderArgs.builder()
            .kubeconfig(cluster.kubeconfigJson())
            .build());

        // Deploy a small canary service (NGINX), to test that the cluster is working.
        var myDeployment = new Deployment("myDeployment", DeploymentArgs.builder()
            .metadata(ObjectMetaArgs.builder()
                .labels(Map.of("appClass", "my-deployment"))
                .build())
            .spec(DeploymentSpecArgs.builder()
                .replicas(2)
                .selector(LabelSelectorArgs.builder()
                    .matchLabels(Map.of("appClass", "my-deployment"))
                    .build())
                .template(PodTemplateSpecArgs.builder()
                    .metadata(ObjectMetaArgs.builder()
                        .labels(Map.of("appClass", "my-deployment"))
                        .build())
                    .spec(PodSpecArgs.builder()
                        .containers(ContainerArgs.builder()
                            .name("my-deployment")
                            .image("nginx")
                            .ports(ContainerPortArgs.builder()
                                .name("http")
                                .containerPort(80)
                                .build())
                            .build())
                        .build())
                    .build())
                .build())
            .build(), CustomResourceOptions.builder()
                .provider(eksProvider)
                .build());

        var myService = new Service("myService", ServiceArgs.builder()
            .metadata(ObjectMetaArgs.builder()
                .labels(Map.of("appClass", "my-deployment"))
                .build())
            .spec(ServiceSpecArgs.builder()
                .type("LoadBalancer")
                .ports(ServicePortArgs.builder()
                    .port(80)
                    .targetPort("http")
                    .build())
                .selector(Map.of("appClass", "my-deployment"))
                .build())
            .build(), CustomResourceOptions.builder()
                .provider(eksProvider)
                .build());

        // Export the cluster's kubeconfig.
        ctx.export("kubeconfig", cluster.kubeconfig());
        // Export the URL for the load balanced service.
        ctx.export("url", myService.status()
            .applyValue(status -> status.orElseThrow().loadBalancer().orElseThrow())
            .applyValue(status -> status.ingress().get(0).hostname().orElseThrow()));
    }
}