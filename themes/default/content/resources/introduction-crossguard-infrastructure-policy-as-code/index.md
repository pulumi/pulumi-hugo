---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Introduction to CrossGuard: Infrastructure Policy as Code"
title: "Introduction to CrossGuard: Infrastructure Policy as Code"
meta_desc: |
    Pulumi CrossGuard lets you enforce infrastructure policies at deployment-time, preventing security, compliance, cost, or best practices mistakes fr...
url_slug: introduction-crossguard-infrastructure-policy-as-code
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
  title: "Introduction to CrossGuard: Infrastructure Policy as Code"
  description: |
    Pulumi CrossGuard lets you enforce infrastructure policies at deployment-time, preventing security, compliance, cost, or best practices mistakes from making their way into production.  Learn more about CrossGuard here: https://www.pulumi.com/crossguard  Pulumi is open source and free to download today: https://www.pulumi.com/docs/get-started/
  sortable_date: 2019-12-23T23:32:20Z
  youtube_url: https://www.youtube.com/embed/-xJT_lON254
transcript: |
    Cross guard is Pulumi policies code feature that lets organizations define policies that will gate or block deployments based on violations. Here's a quick demo, I have a pluming application that defines a V BC set of settlement sentence that says and ale bucket and a set of policies that evaluate these resources based on security and cost best practices. These policies are written using the same object model as my Pulumi application and they can run against specific resource types or they can run against the entire stack to check for aggregate values across multiple resources in my stack. In this example, I'm checking that my subnets are slash 24 or smaller. My instances have a set of required tags and that my cost estimate for my instances is less than my monthly budget. My S3 policies are also checking that my bucket is not publicly accessible versioning is turned on and that service side encryption is enabled as well. When I run a Pulumi preview without these policies in place, I get a preview that shows me that Pulumi is going to create 11 resources. When I run this preview with policy in place, I'm gonna see that same preview. But I'm also going to see a number of policy violations based on my pluming application as it currently exists in the output. Here. I can see each policy violation that I've hit including my subnet sizing required tags. In many instances. I've also exceeded my my monthly budget. This is when running policy locally which allows me to test and iterate on these policies before using them across my organization to enforce them across my organization. I published them to the Pulumi console that then I enable them as a policy pack across my organization. Now, I wanna rerun my preview without that policy pack flag in place. The consoles are gonna make sure that this particular set of policies are evaluated alongside my resources. In my preview. We'll see the same violations that we saw before and now I can go in and adjust my sub size. I can add my name tag that's missing. I can fix the size of my instances so that I do not exceed my monthly budget and also make sure that my ST bucket is not publicly accessible. Now, when I remo my preview, I should get a preview that shows all 11 resources to be created without any violations, which would allow me to continue on with the plume update to allow me to deploy these infrastructure changes without any violations. Again, the Pulumi console is providing the enforcement across my organization for that policy execution and those policy packs can be set organization wide or per stack depending upon the stacks that you're deploying.
---
