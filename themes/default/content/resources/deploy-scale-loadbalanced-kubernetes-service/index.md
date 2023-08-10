---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Deploy and Scale a Load-Balanced Kubernetes Service"
title: "Deploy and Scale a Load-Balanced Kubernetes Service"
meta_desc: |
    Deploy and scale a load-balanced Kubernetes service using Pulumi, including building, publishing, and running a private container image.
url_slug: deploy-scale-loadbalanced-kubernetes-service
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
  title: "Deploy and Scale a Load-Balanced Kubernetes Service"
  description: |
    Deploy and scale a load-balanced Kubernetes service using Pulumi, including building, publishing, and running a private container image.  To download and try Pulumi: https://www.pulumi.com/docs/get-started/  To read more about the KubernetesX library shown here: https://www.pulumi.com/blog/introducing-kx/
  sortable_date: 2019-11-23T21:56:13Z
  youtube_url: https://www.youtube.com/embed/X96EMLi8uJY
transcript: |
    Today, we'll deploy a load balance Cober NTI service using Pulumi an open source infrastructures code tool. We'll start with a basic engine X web server, scale it out and then build and publish a custom docker image. We'll be using the new Pulumi watch command to do deployments interactively as we're typing, typically, you'd write your program, then run the Pulumi up command to see the preview and do a deployment or even run from your continuous delivery system watch mode. On the other hand, is great for rapid development straight from your editor of choice. So let's start typing away and build our Cuber Netti application. We'll begin by importing the Cubers X package. Pulumi supports all of the Cuber's object model. But the cnet's X package provides high level abstractions that eliminate a lot of the boiler plate. For example, here we're using a pod builder to declare that our pods are going to run the engine X web server and listen on port 80. We can already see in the lower left hand window that the Pulumi watch mode is starting to deploy things. Next, we'll declare our Cubs deployment object that will actually stand up the pods in our cluster as we'll see in the lower right hand window, which is currently watching the Cobe control get pods command. Also notice Pulumi is giving us detailed status updates. Now it's up and running. We need to declare a service which will allocate a load balancer and expose an endpoint that we can use to access our new website. We'll also export the auto generated ingress load balancers hosting to make it easy to access from our program. And in fact, the watch window in the lower right is already curling it. Uh So as soon as it becomes available, you'll see the engine X. Welcome page. Show up and there we go. Engine X is up and running next. Let's update the replicas on our deployment to three. We hit save which has already triggered the update. You see the pods are pending and now they're in running status. So now we've got three pods. So we just saw how to deploy and scale a Docker image that already exists next up. Let's see how to build, publish and run a custom Docker image first. We'll create an app directory which is where we'll place our Dockerized application. We're actually just going to create a simple website with custom html still using engine X, but any Dockerized application would work. We'll just say hello Kubernetes and now we'll go back and create a Docker file in our application folder. This Docker file is just going to derive from the basic engine X uh container image that we already deployed. And we're just going to copy the site contents to the engine X html directory. Now, we've got our application all ready to go, but we actually have to deploy the container and use it from our cnet's configuration. We haven't yet had to know which cloud we're even running in. It turns out we're running in AWS using ECA. So we're gonna deploy to a private registry using ECR will point the image builder to the application directory we just created in our project and we will change the engine X image reference to reference a newly built image URL internally. This is doing all the hard work of provisioning a private registry in ECR. It would work the same if it was in Azure GCP or even using the Docker hub. Notice here it's building and pushing the Docker image and now we can see the deployment has begun and is rolling out. We're getting status updates from Pulumi as it does. So, and we'll soon see that our new custom built website is up and running. We're almost done. But to really show off the power of watch mode, now, we can go and make incremental changes to our infrastructure or our application. And Pulumi will just do the right thing with the incremental update. In this case, let's just change our title to tell us that this was actually deployed with Pulumi And again, we're seeing that the docker build is getting triggered because we hit save. It's pushing to our private registry and now it's rolling out the update to cnet's. Again, we're getting the rich deployment status updates from Pulumi. And now we'll see that our update is live across all three pods in this video. We've seen just a few of the things that Pulumi can do. It's easy to deploy to Kubernetes, scale up applications build and publish to private container registries and it's a whole lot easier when you don't even have to leave your editor. Pulumi is open source. Give it a try by going to Pulumi dot com today.

---
