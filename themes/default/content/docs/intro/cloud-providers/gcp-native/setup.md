---
title: GCP-Native Setup
meta_desc: This page provides an overview on how to setup the Google Cloud
           Native (GCP-Native) Provider with Pulumi.
aliases: ["/docs/reference/clouds/gcp-native/setup/"]
---

[GCP-Native Provider]: {{< relref "./" >}}

The [GCP-Native Provider] needs to be configured with Google credentials
before it can be used to create resources.

{{% configure-gcp %}}

{{% notes "info" %}}
If you are using Pulumi in an non-interactive setting (such as a CI/CD system) you will need to [configure and use a service account]({{< relref "service-account" >}}) instead.
{{% /notes %}}

