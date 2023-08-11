---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Using GitHub Actions with Pulumi: PR Workflow for DevOps"
title: "Using GitHub Actions with Pulumi: PR Workflow for DevOps"
meta_desc: |
    See how to do GitOps workflows by merging PRs using Pulumi GitHub Actions to deploy a Dockerized Ruby on Rails app to Kubernetes!
url_slug: using-github-actions-pulumi-pr-workflow-devops
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
  title: "Using GitHub Actions with Pulumi: PR Workflow for DevOps"
  description: |
    See how to do GitOps workflows by merging PRs using Pulumi GitHub Actions to deploy a Dockerized Ruby on Rails app to Kubernetes! UPDATE: The action has changed significantly since 2018, watch the newer version at https://www.youtube.com/watch?v=9du5S9_1kM0. The code is in the description.  Learn more about Pulumi GitHub Actions: * Our announcement blog post: https://blog.pulumi.com/continuous-delivery-to-any-cloud-using-github-actions-and-pulumi * Documentation on using them: http://pulumi.io/github
  sortable_date: 2018-10-16T20:16:44Z
  youtube_url: https://www.youtube.com/embed/MKbDVDBuKUA
transcript: |
    Let's take a look at how to use github actions with Pulumi to do continuous deployment of cloud applications and infrastructure to your favorite cloud. In this case, we'll deploy a containerized rails app to a Cobern cluster that uses a hosted posts SQL database in the app directory, we have a standard group rails app and in the infrastructure directory, a Pulumi program defining the infrastructure requirements. Somebody's created a pull request to propose a deployment. In this case, it's just an edit to the rails apps, html. If you go back to the pr view, we'll see that the github actions have already run for this pull request that includes first and foremost, updating our staging environment with the changes. And we can see over here on Pulumi console, we can link to the app and see the app in action and we see the changes have already been deployed. But what we'll also see is that Pulumi previewed the changes to tell us what would happen if we did merge into production. Now, we haven't actually done this yet. So when we go look at the application, we'll see that it's still the old boring to do list application. But let's go back and see. It looks good to us. It's gonna make one update. So let's merge the pull request and see what happens. This is actually going to kick off the deployment to production. Now, we're just using a standard GIT based workload to do deployments. Let's click here. We'll see the action is running and if we go to the stack over in the Pulumi console, we'll see that indeed. The deployment has begun. Now, we can go look at the Docker build logs for our rails application. We can even see some of the tti changes that are happening as they're happening. Um But once the deployment is done, we can now go back and click on the action and see over on github. Uh the action is indeed done and we can see the logs there as well. But more importantly, the application is deployed, we can refresh and see that we've got our con on board now in production. So with that, you've seen github actions and Pulumi working together to do continuous deployment using git based workflows of any cloud application and infrastructure regardless of which cloud you're using or which infrastructure you're making changes to.

---
