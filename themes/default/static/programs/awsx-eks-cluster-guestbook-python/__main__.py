import pulumi
import pulumi_kubernetes as k8s

# Note: By default, Pulumi targets clusters based on your local `kubeconfig`.
# Create resources from standard Kubernetes guestbook YAML example.
guestbook = k8s.yaml.ConfigFile('guestbook',
    file = 'app/guestbook.yaml'
)

result = None

frontend = guestbook.get_resource('v1/Service', 'frontend')
ingress = frontend.status.load_balancer.apply(lambda v: v["ingress"][0] if "ingress" in v else "output<string>")
result = ingress.apply(lambda v: v["ip"] if v and "ip" in v else (v["hostname"] if v and "hostname" in v else "output<string>"))

# Export the IP address of the Guestbook frontend.
pulumi.export('frontendIp',result)