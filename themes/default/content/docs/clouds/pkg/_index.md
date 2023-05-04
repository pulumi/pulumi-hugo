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

## Package Documentation

SDK reference documentation, organized by language.

{{% chooser language "javascript,typescript,python,go,csharp" / %}}

### Standard Packages

{{% choosable language "javascript,typescript" %}}
<dl class="tabular">
    <dt>Pulumi SDK</dt>
    <dd><a href="/docs/reference/pkg/nodejs/pulumi/pulumi">@pulumi/pulumi</a></dd>
    <dt>Pulumi Policy</dt>
    <dd><a href="/docs/reference/pkg/nodejs/pulumi/policy">@pulumi/policy</a></dd>
    <dt>Pulumi Terraform</dt>
    <dd><a href="/docs/reference/pkg/nodejs/pulumi/terraform">@pulumi/terraform</a></dd>
</dl>
{{% /choosable %}}

{{% choosable language python %}}
<dl class="tabular">
    <dt>Pulumi SDK</dt>
    <dd><a href="/docs/reference/pkg/python/pulumi">pulumi</a></dd>
    <dt>Pulumi Policy</dt>
    <dd><a href="/docs/reference/pkg/python/pulumi_policy">pulumi_policy</a></dd>
    <dt>Pulumi Terraform</dt>
    <dd><a href="/docs/reference/pkg/python/pulumi_terraform">pulumi_terraform</a></dd>
</dl>
{{% /choosable %}}

{{% choosable language go %}}
<dl class="tabular">
    <dt>Pulumi SDK</dt>
    <dd><a href="https://pkg.go.dev/github.com/pulumi/pulumi/sdk/v3/go/pulumi">pulumi</a></dd>
</dl>
{{% /choosable %}}

{{% choosable language csharp %}}
<dl class="tabular">
    <dt>Pulumi SDK</dt>
    <dd><a href="/docs/reference/pkg/dotnet/Pulumi/Pulumi.html">Pulumi</a></dd>
    <dt>Pulumi FSharp SDK</dt>
    <dd><a href="/docs/reference/pkg/dotnet/Pulumi.FSharp/Pulumi.FSharp.html">Pulumi.FSharp</a></dd>
    <dt>Pulumi Automation API</dt>
    <dd><a href="/docs/reference/pkg/dotnet/Pulumi.Automation/Pulumi.Automation.html">Pulumi.Automation</a></dd>
</dl>
{{% /choosable %}}

### Extension Packages

{{% choosable language "javascript,typescript" %}}
<dl class="tabular">
    <dt>AWS Extensions</dt>
    <dd>
        <a href="/docs/reference/pkg/nodejs/pulumi/awsx">@pulumi/awsx</a>
        <p>Simpler interfaces encapsulating common AWS patterns.</p>
    </dd>
    <dt>AWS EKS Cluster</dt>
    <dd>
        <a href="/registry/packages/eks/api-docs">@pulumi/eks</a>
        <p>Simpler interfaces for working with AWS EKS.</p>
    </dd>
    <dt>Kubernetes Extensions</dt>
    <dd>
        <a href="/docs/reference/pkg/nodejs/pulumi/kubernetesx">@pulumi/kubernetesx</a>
        <span class="ml-2 badge badge-preview">Preview</span>
        <p>Simpler interfaces for working with Kubernetes.</p>
    </dd>
</dl>
{{% /choosable %}}

{{% choosable language python %}}
<dl class="tabular">
    <dt>AWS EKS Cluster</dt>
    <dd>
        <a href="/registry/packages/eks/api-docs">pulumi_eks</a>
        <p>Simpler interfaces for working with AWS EKS.</p>
    </dd>
</dl>
{{% /choosable %}}

{{% choosable language go %}}
<dl class="tabular">
    <dt>AWS EKS Cluster</dt>
    <dd>
        <a href="/registry/packages/eks/api-docs">eks</a>
        <p>Simpler interfaces for working with AWS EKS.</p>
    </dd>
</dl>
{{% /choosable %}}

{{% choosable language csharp %}}
<dl class="tabular">
    <dt>AWS EKS Cluster</dt>
    <dd>
        <a href="/registry/packages/eks/api-docs">Pulumi.Eks</a>
        <p>Simpler interfaces for working with AWS EKS.</p>
    </dd>
</dl>
{{% /choosable %}}

{{% choosable language "javascript,typescript" %}}

### Cloud-Agnostic Packages

<dl class="tabular">
    <dt>Pulumi Cloud Framework</dt>
    <dd>
        <a href="/docs/reference/pkg/nodejs/pulumi/cloud">@pulumi/cloud</a>
        <span class="ml-2 badge badge-preview">PREVIEW</span>
        <p>A highly productive, cloud-agnostic package for container and serverless programming.</p>
    </dd>
</dl>

{{% /choosable %}}
