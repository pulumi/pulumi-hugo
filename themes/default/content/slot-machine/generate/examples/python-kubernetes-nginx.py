import pulumi
import pulumi_kubernetes as kubernetes

app_labels = {
    "app": "nginx",
}
deployment = kubernetes.apps.v1.Deployment("deployment", spec=kubernetes.apps.v1.DeploymentSpecArgs(
    selector=kubernetes.meta.v1.LabelSelectorArgs(
        match_labels=app_labels,
    ),
    replicas=1,
    template=kubernetes.core.v1.PodTemplateSpecArgs(
        metadata=kubernetes.meta.v1.ObjectMetaArgs(
            labels=app_labels,
        ),
        spec=kubernetes.core.v1.PodSpecArgs(
            containers=[kubernetes.core.v1.ContainerArgs(
                name="nginx",
                image="nginx",
            )],
        ),
    ),
))
pulumi.export("name", deployment.metadata.name)
