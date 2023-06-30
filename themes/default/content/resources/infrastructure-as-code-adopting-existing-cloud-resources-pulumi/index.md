---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Infrastructure as Code | Adopting Existing Cloud Resources Into Pulumi"
title: "Infrastructure as Code | Adopting Existing Cloud..."
meta_desc: |
    If you have existing resources deployed by hand, using CloudFormation, or using Terraform, you can adopt them into Pulumi to start managing your cl...
url_slug: infrastructure-as-code-adopting-existing-cloud-resources-pulumi
featured: false
pre_recorded: true
pulumi_tv: false
unlisted: false
gated: false
type: webinars
external: false
no_getting_started: true
block_external_search_index: false
main:
  title: "Infrastructure as Code | Adopting Existing Cloud Resources Into Pulumi"
  description: |
    If you have existing resources deployed by hand, using CloudFormation, or using Terraform, you can adopt them into Pulumi to start managing your cloud infrastructure using Pulumi instead.  This video covers: • Deploying some "existing" Azure infrastructure (resource group, networking and VM) using Terraform • Creating a Pulumi program that describes the same infrastructure using tf2pulumi • Showing that by default this will create new infrastructure • Using the new import: id feature to import a resource • Highlighting how Pulumi helps ensure you correctly described the desired state of your infrastructure (so that you don't accidentally replace adopted resources) • Getting the ids from the .tfstate file • Importing the full infrastructure into Pulumi • Showing that this allows managing the resources in https://app.pulumi.com (like linking to resources in Azure Portal) • Adding a tag to the VM with Pulumi and showing that we can now make changes to the existing resource using Pulumi • Discussing how to manage import IDs via config in cases where there are multiple instances (dev, stage) of a deployment • Discussing when import can/should be removed from code once imports are complete
  sortable_date: 2019-07-25T19:47:18Z
  youtube_url: https://www.youtube.com/embed/kX_3Wdft0Ms
transcript: |
    
---
