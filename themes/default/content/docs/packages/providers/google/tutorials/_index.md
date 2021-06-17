---
title: Google Cloud Tutorials
meta_desc: A collection of tutorials that highlight complete end-to-end scenarios when
           using the Google Cloud platform.
linktitle: "Tutorials"
menu:
  packages:
    parent: google-native
    identifier: tutorials-gcp
    weight: 3

aliases: ["/docs/reference/tutorials/gcp/"]
---

The following tutorials highlight the Google Cloud platform using complete end-to-end learning scenarios.

In addition to the step-by-step tutorials in this section, there are also many code examples for Google Cloud that showcase how to use Pulumi with specific Google Cloud services in a wide range of use cases. For a complete list, see [Examples]({{< relref "/docs/cloud-providers/google/examples" >}}).

> If this is your first time getting started with Pulumi for Google Cloud, try the
> easy <a href="{{< relref "/docs/get-started/gcp" >}}">Get Started guide</a> first.


<div class="md:flex flex-row mt-6 mb-6">
    <div class="w-1/2 border-solid border-t-2 border-gray-200">
        <h3 class="no-anchor pt-4">
            <i class="fas fa-server pr-2"></i>
            <a href="{{< relref "gce-webserver" >}}" style="color: #4387c7">
                GCE Virtual Machine
            </a>
        </h3>
        <p>
            Provision a Debian web server VM with a public IP address and SSH access.
        </p>
    </div>
    <div class="w-1/2 border-solid ml-4 border-t-2 border-gray-200">
        <h3 class="no-anchor pt-4">
            <i class="fas fa-boxes pr-2"></i>
            <a href="{{< relref "../kubernetes/tutorials/gke" >}}" style="color: #4387c7">
                GKE Cluster
            </a>
        </h3>
        <p>
            Provision a GKE cluster and deploy a canary app to it.
        </p>
    </div>
</div>

<div class="md:flex flex-row mt-6 mb-6">
    <div class="w-1/2 border-solid border-t-2 border-gray-200">
        <h3 class="no-anchor pt-4">
            <i class="fas fa-bolt pr-2"></i>
            <a href="{{< relref "gcp-ts-functions" >}}" style="color: #4387c7">
                Google Functions
            </a>
        </h3>
        <p>
            Deploy an HTTP Google Cloud Function endpoint available over the Internet.
        </p>
    </div>
    <div class="w-1/2 border-solid ml-4 border-t-2 border-gray-200">
        <h3 class="no-anchor pt-4">
            <i class="fas fa-database pr-2"></i>
            <a href="{{< relref "gcp-ts-k8s-ruby-on-rails-postgresql" >}}" style="color: #4387c7">
                Containerized App
            </a>
        </h3>
        <p>
            Create a complete containerized Ruby on Rails app using GKE and
            a Google Cloud SQL PostgreSQL database.
        </p>
    </div>
</div>

If you'd like to see a new Google Cloud tutorial, please [request one](
https://github.com/pulumi/pulumi-hugo/issues/new?title=New%20Google%20Cloud%20Tutorial%20Request).
Pull requests are also welcome!
