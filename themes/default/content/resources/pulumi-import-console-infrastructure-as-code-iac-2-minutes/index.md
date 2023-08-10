---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Pulumi Import: From Console to Infrastructure as Code (IaC) in 2 Minutes!"
title: "Pulumi Import: From Console to Infrastructure as Code..."
meta_desc: |
    See how to import existing resources into IaC using the new 'pulumi import' command, while showing you the entire infrastructure's code lifecycle f...
url_slug: pulumi-import-console-infrastructure-as-code-iac-2-minutes
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
  title: "Pulumi Import: From Console to Infrastructure as Code (IaC) in 2 Minutes!"
  description: |
    See how to import existing resources into IaC using the new 'pulumi import' command, while showing you the entire infrastructure's code lifecycle from creation to update to destroy.  UPDATE: We heard your feedback and delivered many updates to make the 'pulumi import' experience more useful, convenient, and powerful. Check it out at https://pulumip.us/37mxfd9  ▪ Learn how to import existing cloud infrastructure into Pulumi no matter how it was provisioned at https://pulumip.us/3q98MyE ▪ Instruction manual page: https://pulumip.us/34K3bY0 ▪ Get started for free at https://pulumi.com/start
  sortable_date: 2022-03-15T23:02:28Z
  youtube_url: https://www.youtube.com/embed/6qHVbu8vb4w
transcript: |
    Today, we'll see how to use the Pulumi import command to import any live resources from any cloud into infrastructures code. First, we're going to create a virtual machine, an EC2 instance using the Amazon console. This can be useful if we're just exploring or learning how new services work without having to become experts in infrastructures code and how all the concepts relate. Now that our instance is up and running. Let's see how to get it into code. First, we're gonna create a Pulumi project. In this case, we're gonna use Python, but Pulumi supports other languages like typescript, javascript, go and C# next, we're actually gonna import that resource into Pulumi. First, we'll copy the instance ID and then we'll go back to our terminal and we'll run the Pulumi import command that takes a few arguments. One is the type of the resource. The second is the name and the third is the id that we copied from the Amazon console. We can see here that Pulumi reads back all the properties including the army, the availability zone and by clicking, yes, we'll actually import the resource. Now, we need to make sure our infrastructures code matches the resource state that was imported. Pulumi generates all that code for us in whatever language we've chosen. So we can just paste that straight into our program to verify we've done this correctly. We can run Pulumi up and it will show that there are no differences. We've gone from the console to infrastructures code using a few simple commands. Let's now edit our infrastructures code definition, adding a security group for our EC2 instance that allows internet traffic on port 80. And we'll see that we can now modify that same resource in place that was provisioned originally in the A console, but is now represented in our infrastructures code. We run Pulumi up and it will show us the delta between what we've just added to our program and what's already in existence in the A risk cloud. We can then apply the changes and Pulumi will make the minimal set of edits necessary to change our infrastructure state to match our desired goal state. Finally, let's destroy the instance using Pulumi. We'll notice that Pulumi protects us from accidentally destroying resources that have been imported to actually perform the destruction. We have to unprotected the resource by deleting the protection flag running Pulumi up. And then finally, we'll be able to actually run Pulumi destroy and this will terminate the EC2 instances. And with that, we went seamlessly from the A DS console into the full infrastructures code life cycle from creation to update to destroy.

---
