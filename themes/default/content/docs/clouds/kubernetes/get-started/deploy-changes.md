---
title_tag: Deploy the Changes | Kubernetes
meta_desc: This page provides an overview of how deploy changes to a Kubernetes project.
title: Deploy changes
h1: "Pulumi & Kubernetes: Deploy changes"
weight: 7
menu:
  clouds:
    parent: kubernetes-get-started
    identifier: kubernetes-deploy-changes

aliases:
- /docs/quickstart/kubernetes/deploy-changes/
- /docs/get-started/kubernetes/deploy-changes/
---

Deploy the stack changes.

```bash
$ pulumi up
```

Pulumi computes the minimally disruptive change to achieve the desired state described by the program.

```
Previewing update (dev):
     Type                           Name            Plan
     pulumi:pulumi:Stack            quickstart-dev
 +   └─ kubernetes:core/v1:Service  nginx           create

Outputs:
  + ip  : "10.96.0.0"
  - name: "nginx-bec13562"

Resources:
    + 1 to create
    2 unchanged

Do you want to perform this update?  [Use arrows to move, type to filter]
> yes
  no
  details
```

Select `yes` using the arrows and hit enter to update the resources in Kubernetes.

Pulumi will create the service since it is now defined in the program.

```
Do you want to perform this update? yes
Updating (dev):
     Type                           Name            Status
     pulumi:pulumi:Stack            quickstart-dev
 +   └─ kubernetes:core/v1:Service  nginx           created (10s)

Outputs:
  + ip  : "10.110.183.208"
  - name: "nginx-bec13562"

Resources:
    + 1 created
    2 unchanged

Duration: 12s
```

View the `ip` of the nginx service using `kubectl get services`

Send a request to nginx to verify it is running by replacing `<IP_ADDRESS>` with the IP address that you find for the service under `EXTERNAL_IP`.

```bash
curl <IP_ADDRESS>:8080
```

The output is similar to:

```text
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

Next, destroy the stack.

{{< get-started-stepper >}}
