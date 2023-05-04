---
title: API Reference
linktitle: API
meta_desc: Pulumi offers APIs for working with a wide variety of cloud platforms. Browse resource-level documentation and examples here.
menu:
  clouds:
    name: All clouds
    weight: 5
---

Pulumi offers APIs for working with a wide variety of cloud platforms, as well as
higher-level APIs that make it easier to deliver cloud applications and infrastructure.

## Resource Documentation

[Resource](/docs/intro/concepts/programming-model#resource-providers)-level
documentation and examples for cloud providers and other services. Whether you're looking
for details about how to work with a particular resource or just browsing around to
explore what's possible, you've come to the right place.

### Core Providers

{{< resource-providers "aws,azure-native,gcp,kubernetes" >}}

### Cloud Providers

{{< resource-providers "alicloud,eks,artifactory,astra,aviatrix,aws-apigateway,aws-iam,aws-s3-replicated-bucket,aws-static-website,awsx,azapi,azure-quickstart-acr-geo-replication,azure-justrun,cloudamqp,civo,confluentcloud,digitalocean,doppler,ec,equinix-metal,eventstorecloud,exoscale,fastly,flux,gandi,gcp-global-cloudrun,google-cloud-static-website,grafana,harness,heroku,hcloud,koyeb,launchdarkly,linode,metabase,nuage,openstack,oci,ovh,packet,proxmoxve,rootly,scaleway,tls-self-signed-cert,sentry,statuscake,str,sdm,symbiosis,synced-folder,tailscale,upstash,vsphere,yandex,zia,zpa" >}}

### Infrastructure

{{< resource-providers "aiven,auth0,azuread,azuredevops,buildkite,confluent,consul,databricks,docker,dynatrace,fusionauth,hcp,kafka,keycloak,kong,kubernetes-cert-manager,kubernetes-coredns,mailgun,aws-miniflux,minio,kubernetes-ingress-nginx,nomad,okta,onelogin,opsgenie,pagerduty,pulumiservice,rabbitmq,rancher2,rke,spotinst,splunk,vault,venafi,opsgenie,rke,twingate,snowflake,venafi" >}}

### Database

{{< resource-providers "aws-quickstart-aurora-postgres,aws-quickstart-redshift,mysql,postgresql,mongodbatlas" >}}

### Monitoring

{{< resource-providers "checkly,datadog,newrelic,signalfx,sumologic,wavefront" >}}

### Network

{{< resource-providers "akamai,aws-quickstart-vpc,cloudflare,dnsimple,f5bigip,ns1,unifi" >}}

### Version Control

{{< resource-providers "github,gitlab" >}}

### Utilities

{{< resource-providers "aquasec,cloudinit,command,harbor,libvirt,purrl,random,slack,time,tls,vultr" false >}}

### Classic Providers

{{< resource-providers "azure" >}}

### Preview Providers

{{< resource-providers "aws-native,google-native" >}}
