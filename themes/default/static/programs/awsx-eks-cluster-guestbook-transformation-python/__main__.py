import pulumi
import pulumi_kubernetes as k8s

# Note: By default, Pulumi targets clusters based on your local `kubeconfig`.

#  Place objects into this desired namespace
namespaceName = "guestbook-ns"

def xform_service_private(obj):
    """Make every service private to the cluster."""
    if (isinstance(obj, k8s.core.v1.Service) and
            obj.kind == 'Service' and obj.api_version == 'v1' and
            obj.spec and obj.spec.type and obj.spec.type == 'LoadBalancer'):
        obj.spec.type = 'ClusterIP'

def xform_resource_ns(obj):
    """Put every resource in the created namespace."""
    if (hasattr(obj, 'metadata')):
        if (obj.metadata is not None):
            obj.metadata.namespace = namespaceName
        else:
            obj.metadata = k8s.meta.v1.ObjectMetaArgs(namespace = namespaceName)


# Create resources from standard Kubernetes guestbook YAML example.
guestbook = k8s.yaml.ConfigFile('guestbook',
    file = 'app/guestbook.yaml',
     opts = pulumi.ResourceOptions(
        transformations = [
            xform_service_private,
            xform_resource_ns,
        ]
    )
)