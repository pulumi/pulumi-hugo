---
title: Packages
meta_desc: This page provides an overview of the different Cloud Providers supported by the Pulumi
           Cloud Development Platform.
menu:
  packages:
    name: Overview
    weight: 1
---

Pulumi Packages are the core technology that enables cloud infrastructure resource provisioning to be defined once, and made available to users in all Pulumi languages. With Pulumi Packages, [Resources and Components]({{<relref "/docs/intro/concepts/resources">}}) can be written once, in your preferred language, and made available in all the other languages supported by Pulumi.

## Types of Pulumi Packages

There are three different types of Pulumi Packages:

1. **Native Pulumi Provider Packages:** Use the full features of the Pulumi resource model to create a provider for a new cloud platform. Examples: the [`kubernetes`]({{<relref "/docs/reference/pkg/kubernetes">}}), [`azure-native`]({{<relref "/docs/reference/pkg/azure-native">}}), and [`google-native`]({{<relref "/docs/reference/pkg/google-native">}}) packages.
2. **Bridged Provider Packages:** Take an existing resource provider from another supported ecosystem (like a Terraform provider), and bridge it to be exposed as a Pulumi Package. Examples: the [`aws`]({{<relref "/docs/reference/pkg/aws">}}), [`tls`]({{<relref "/docs/reference/pkg/tls">}}), and [`cloudflare`]({{<relref "/docs/reference/pkg/cloudflare">}}) packages.
3. **Component Package:** Write a Pulumi Component in your language of choice and expose it to users in all Pulumi languages. Example: the [`eks`]({{<relref "/docs/reference/pkg/eks">}}) package.

Native and bridged provider packages are broken into the following two groups based on usage and support:

### Core Providers

* [AWS]({{< relref "./providers/aws" >}})
* [Azure-Native]({{< relref "./providers/azure-native" >}})
* [Google-Native]({{< relref "./providers/google" >}})
* [Kubernetes]({{< relref "./providers/kubernetes" >}})

### Other Providers

* [AzureAD]({{< relref "./providers/azuread" >}})
* [Alibaba Cloud]({{< relref "./providers/alicloud" >}})
* [Civo]({{< relref "./providers/civo" >}})
* [CloudAMQP]({{< relref "./providers/cloudamqp" >}})
* [Fastly]({{< relref "./providers/fastly" >}})
* [DigitalOcean]({{< relref "./providers/digitalocean" >}})
* [Hetzner Cloud]({{< relref "./providers/hcloud" >}})
* [Linode]({{< relref "./providers/linode" >}})
* [OpenStack]({{< relref "./providers/openstack" >}})
* [Equinix Metal]({{< relref "./providers/equinix-metal" >}})
* [vSphere]({{< relref "./providers/vsphere" >}})
* [Aiven]({{< relref "./providers/aiven" >}})
* [Auth0]({{< relref "./providers/auth0" >}})
* [AzureDevOps]({{< relref "./providers/azuredevops" >}})
* [Consul]({{< relref "./providers/consul" >}})
* [Docker]({{< relref "./providers/docker" >}})
* [Kafka]({{< relref "./providers/kafka" >}})
* [Mailgun]({{< relref "./providers/mailgun" >}})
* [MongoDB Atlas]({{< relref "./providers/mongodbatlas" >}})
* [Okta]({{< relref "./providers/okta" >}})
* [Opsgenie]({{< relref "./providers/opsgenie" >}})
* [PagerDuty]({{< relref "./providers/pagerduty" >}})
* [RabbitMQ]({{< relref "./providers/rabbitmq" >}})
* [Rancher2]({{< relref "./providers/rancher2" >}})
* [RKE]({{< relref "./providers/rke" >}})
* [Spotinst]({{< relref "./providers/spotinst" >}})
* [Splunk]({{< relref "./providers/splunk" >}})
* [Vault]({{< relref "./providers/vault" >}})
* [Venafi]({{< relref "./providers/venafi" >}})
* [MySQL]({{< relref "./providers/mysql" >}})
* [PostgreSQL]({{< relref "./providers/postgresql" >}})
* [Datadog]({{< relref "./providers/datadog" >}})
* [New Relic]({{< relref "./providers/newrelic" >}})
* [SignalFx]({{< relref "./providers/signalfx" >}})
* [SumoLogic]({{< relref "./providers/sumologic" >}})
* [Wavefront]({{< relref "./providers/wavefront" >}})
* [Akamai]({{< relref "./providers/akamai" >}})
* [Cloudflare]({{< relref "./providers/cloudflare" >}})
* [DNSimple]({{< relref "./providers/dnsimple" >}})
* [F5 BIG-IP]({{< relref "./providers/f5bigip" >}})
* [NS1]({{< relref "./providers/ns1" >}})
* [GitHub]({{< relref "./providers/github" >}})
* [GitLab]({{< relref "./providers/gitlab" >}})
* [Random]({{< relref "./providers/random" >}})
* [TLS]({{< relref "./providers/tls" >}})
* [cloud-init]({{< relref "./providers/cloudinit" >}})
* [libvirt]({{< relref "./providers/libvirt" >}})
* [Azure Classic]({{< relref "./providers/azure" >}})
* [Google Cloud Classic]({{< relref "./providers/gcp" >}})

If your provider isn't listed, check out the [Pulumi GitHub](https://github.com/pulumi) and
[Pulumi Examples](https://github.com/pulumi/examples) repositories. If you can't find what you're looking for,
[contact us]({{< relref "/docs/troubleshooting#contact-us" >}}) and let us know.

