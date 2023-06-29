---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Resource Search and Data Export | Pulumi Cloud Features"
title: "Resource Search and Data Export | Pulumi Cloud Features"
meta_desc: |
    Pulumi Resource Search offers multi-cloud search and analytics across every environment in your organization, enabling you to both find the needle ...
url_slug: resource-search-data-export-pulumi-cloud-features
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
  title: "Resource Search and Data Export | Pulumi Cloud Features"
  description: |
    Pulumi Resource Search offers multi-cloud search and analytics across every environment in your organization, enabling you to both find the needle within your cloud haystack and visualize cloud consumption statistics and trends.  You can also export your resource data into other Business Intelligence tools for deeper analysis, query, and joining with other key business data. Give it a try.  If needed, use Pulumi Cloud Import (private preview) to apply Search and Insights to resources created outside of Pulumi, e.g., in Terraform, CloudFormation, ARM, or Kubernetes YAML. Sign up for open-source Cloud  Import 👉 http://pulumi.com/product/private-previews/#preview-import  
  sortable_date: 2023-04-13T14:28:15Z
  youtube_url: https://www.youtube.com/embed/e1u-P9bnEA4
transcript: |
    Let's walk through two new Plumy cloud features, resource search and data export. Starting with resource search you'll now find in the plume cloud console, a new tab for resources. This allows you to search across all of your projects stacks, cloud environments and cloud providers for any resource. Now, let's just see it in action. Let's say I come in and I know the keyword that I'm looking for is a VPC, but I don't know what the exact resource type is. Now, this will match on any um resource type project stack or package that is, that uses the keyword VPC. And from there, I can quickly refine and see what I'm looking for, which in this case is this resource type. And then I can see for these, this VPC resource where it lives in our organization across projects and stacks. So where we have these, I can also write my own syntax um just using the column name and what the keyword is that I'm searching for. So I can do things like I just want to see resources in production or I just want to see our snowflake resources, then if I'm not sure how I would write the query syntax. I can use A I assist to use natural language so I can do something like all the resources that are virtual machines in a wo searcher. And from there, a IIS will convert the natural language into our query syntax. And so in this case, it converts that for me and we can see the 10 resources that match this search. So you can imagine resource search will open a lot of new use cases for your organization. Like I know the name of a bucket, but I'm not exactly sure which account it lives in or which um which team is responsible for it or which project or stack it lives in. So you can kind of answer these key questions that allow you to find a needle in the haystack. But the second feature that we're launching today is data export, which takes it a step further. Now, once we previewed this feature to customers, we realized that there was a lot of value in just having this data. And so we've added functionality to be able to download it to a CS V or also pull it directly via an API. And once you have this data, you can bring it into your existing data warehouse and join it with the data that you the data sets, you already have to get further insights on top of it. So you can see here that using SQL done some aggregates based on resource type, but you can take it a step further and join it based on something like department um and be able to see your resource count across departments in your organization. Now, you can build a dashboard on top of your data warehouse which highlights any of the metrics that your company cares about, so you can track it over time. So here are some examples um count by resource types. You can see which resources you have the most of in your organization. You can see by package type to understand how dependent you are across all of your cloud providers. But you can also do interesting things like join with your private pricing sheet and see what your monthly cost might be per stack. You can understand how your resources break down based on stack, things like resource update, freshness, which looks at when the resource was last modified over time. You can map out the hierarchy of resources using their parent relationships and you can do things like see what percentage of your resources are protected. Now, all of this opens up new avenues for you getting insights from your Pulumi resource data and you can understand your entire cloud footprint, um whether it be cost or um operational metrics, whatever makes the most sense for your organization, you now have that data in your fingertips. So what we've talked about today is the two new features, resource search and data export. Now, we hope that you give them a try and share your feedback with us as we're really excited for the new use cases that this will unlock for Plumy customers.

---
