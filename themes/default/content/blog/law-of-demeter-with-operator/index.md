---
title: Improving the GitOps Pipeline with the Pulumi Operator
date: 2021-12-24T17:08:06Z
draft: true
meta_desc:
meta_image: meta.png
authors: ["david-flanagan"]
tags: ["continuous-delivery", "gitops", "kubernetes"]
---

This time last year, I presented [Applying the Law of Demeter to GitOps](https://www.youtube.com/watch?v=gLZpt8a9YuA) at [GitOps Days 2020](https://www.gitopsdays.com/). During this session, I wanted the audience to understand and be able to identify when their applications and continuous delivery pipelines have too much knowledge of the platform in which they're going to run. As an industry, we're seeing a great deal of momentum towards Platform Engineering and with this comes a Broca divide, a strict division of responsibilities: to build a platform and to consume a platform.

The major actionable takeaway from my session was simple: Application teams MUST provide a deployment that has no variants to account for the environment in which it is deployed as this knowledge lives outside the realm of platform consumption. Instead, the platform will provide everything the application needs to function. We've seen a lot of this before, notably via the [12-factor manifesto](https://12factor.net/).

Over the course of the last year I've collected my thinking more and more around this pattern, and I condensed it down into a single [tweet](https://twitter.com/rawkode/status/1456169286750375936):

> #GitOps isn’t a decision of push vs pull for continuous delivery. It’s more deciding whether your application tells the environment how to deploy itself, or whether the environment tells your application how to run. 
> 
> You want the latter. You want GitOps.

So what does this all mean in a more practical sense?

## Ingress Example

Time and time again I see the same violation of the Law of Demeter with Kubernetes and GitOps: Ingress.

Application delivery teams require Ingress resources within Kubernetes to expose their applications to their customers. Often, Helm or Kustomize is used to provide bases that can be extended for each environment. We can see an example of the boundary violation in the [Kustomize examples](https://github.com/kubernetes-sigs/kustomize/tree/master/examples/multibases). I'm not calling out Kustomize here; Pulumi also has [examples of this pattern](https://github.com/pulumi/examples/blob/master/kubernetes-ts-configmap-rollout/index.ts).

Unfortunately, this pattern has become quite common. Leaking environment information down the stack is what we're trying to avoid, but doing so can be rather tricky.

To understand this challenge in concrete terms, let's look at an example of a simple Ingress resource:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: minimal-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: staging.example.org
    http:
      paths:
      - path: /testpath
        pathType: Prefix
        backend:
          service:
            name: test
            port:
              number: 80
```

The violation here is `host: staging.example.org` inside of the application team resources. We now have a constraint binding the platform and the application together.

Sadly, this is difficult to solve; but not impossible.

### Admission Controllers

Previously my solution to this problem was to use a dynamic admission controller, provided by the platform. The admission controller would monitor for all Ingress resources and modify them, during admission, to enrich the resource with the base domain for the environment the application is deployed to.

You can get quite far with this approach using [Kyverno's mutating policies](https://kyverno.io/docs/writing-policies/mutate/).

However, there's a better way.

### Pulumi Operator

The Pulumi Operator hit major milestone in October this year, [releasing version 1.0]({{< relref "/blog/pulumi-kubernetes-operator-1-0" >}}).

The Pulumi Operator allows us to leverage the power of Pulumi at the application team level for GitOps. This bond between Pulumi for building platforms and Pulumi for consuming platforms means we can have a strictly typed exchange of "knowns" between our platform and our application that happens at execution time.

Let's imagine, in TypeScript, that we have the following versioned interface:

```typescript
export interface Environment {
    name: string;
    baseDomain: string;
    serviceNamespace: string;
    ingressEnabled: boolean;
    networkPoliciesEnforced: boolean;
}
```

With this contract, the Platform Engineering team can ensure that every cluster, or namespace, has a ConfigMap called `environment` can be consumed by the Pulumi Operator. In this, the Pulumi program, the GitOps delivery pipeline from the application team, can begin to grok the environment to which it is being deployed.

With this knowledge, it can begin to augment the manifests as they're applied to the cluster.

Let's go back to our Ingress example and see how this could be done.

First, let's assume our Platform team have deployed a ConfigMap like such:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: environment
data:
  v1: |
    {
      "name": "production",
      "baseDomain": "pulumi.com",
      "serviceNamespace": "utils",
      "ingressEnabled": true,
      "networkPoliciesEnforced": true
    }
```

The specification for what an environment looks like will differ from organization to organization, but this hopefully provides enough context for some of the things you may wish to encapsulate this way.

Next, our application team defines their delivery via Pulumi, too. The first thing they do as part of the delivery is load the environment config. This data can then be used to augment any resources that need to be environment aware.

```typescript
import * as k8s from "@pulumi/kubernetes";

const cm = k8s.core.v1.ConfigMap.get("environment", "environment", {});

export interface Environment {
  name: string;
  baseDomain: string;
  serviceNamespace: string;
  ingressEnabled: boolean;
  networkPoliciesEnforced: boolean;
}

const env = cm.data.apply((data): Environment => JSON.parse(data["v1"]));

const ingress = new k8s.networking.v1.Ingress(name,
    {
        metadata: {
            labels: labels,
        },
        spec: {
            rules: [
                {
                    host: pulumi.interpolate`mysvc.${env.baseDomain}`,
                    http: {
                        paths: [
                            {
                                path: "/",
                                backend: {
                                    serviceName: serviceName,
                                    servicePort: "http",
                                }
                            },
                        ],
                    },
                }
            ]
        }
    }
);
```

That's it! We've got isolated delivery pipelines for both the platform team and the application team, leveraging GitOps and continuous reconciliation, without leaking any information across the stacks.

Pulumi is already seeing considerable adoption and success with platform teams, and I'm excited to see further adoption of the Pulumi Operator and application teams harnessing the power of GitOps with Pulumi.
