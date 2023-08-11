---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Introducing AWS App Runner"
title: "Introducing AWS App Runner"
meta_desc: |
    Learn how to get started using AWS App Runner with Pulumi.
url_slug: introducing-aws-app-runner
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
  title: "Introducing AWS App Runner"
  description: |
    Learn how to get started using AWS App Runner with Pulumi.  AWS App Runner is a fully managed service that makes it easy for developers to quickly deploy containerized web applications and APIs, at scale.  With Pulumi you can use your favorite programming language to define, deploy and manage resources on any cloud.    Get Started - https://pulumi.com/start
  sortable_date: 2021-05-19T01:07:28Z
  youtube_url: https://www.youtube.com/embed/XdMynboheiA
transcript: |
    Hello and welcome to another episode of Modern Infrastructure Wednesday. I'm your host, Lee Zen. And today we're going to be covering how easy it is to use. Pulumi to deploy an application using AWS app. Runner, app. Runner is a new service from Amazon that lets you deploy a container image or a source code repository as an application uh without having to do too much uh around configuring anything. Uh You don't have to configure load balancers. You don't have to configure any of that stuff you would typically have to configure. And so here you can see, I'm running uh the main dot go file. Uh and it's going to create all the necessary resources along with finally, the app runner service. And we're going to go into all the source code to explain how all this works. But right now, you can see what's happening is we're actually doing the Docker build. Uh that's going to publish uh we're doing the Docker build and then that after the Docker build completes uh it's pushing the image into our ECR repository. And then finally, you can see here uh the update succeeds and then we actually get the service URL. And so now let's go take a look at, at our service and while the service is, uh, uh updating, you can see it takes a little bit of time, uh, not too much, but just a little bit of time to get going here. Uh We're gonna go to see how our code actually works. All right. So what's actually happening here? Let's look at our deployment dot go file, uh which main dot go actually calls. So we actually built an automation API based program. Uh And you can see, you know, in the outputs, we create this image, we create, you know, these various things. And so let's look at the code. Uh So the first thing we do is we create an ECR repository and uh here we use auto naming. So it just creates the name. Uh And then next, we create a role uh so that app runner can actually go ahead and pull the image from our repository. And so we create the role, we give it the correct policy. And then after that, we uh basically publish our image. You can see here we have the, the image resource and there we actually just feed it at the repository uh uh credentials. So the take a quick look at the doer file of the thing we're building, it's just a copying that index dot HTM L file over. It's a very simple file. So that's really all there is to the infrastructure, it's super simple. Uh So if we look at the automation api side of things, uh All we're doing is doing the usual automation API stuff. We're setting up a stack, we're deploying our program. Uh And after uh actually point out the part where we're deploying the program uh right up here. Uh And uh as soon as we uh are complete, uh as soon as we finish deploying the program, uh we're going to use the outputs of that program. Uh So, namely the uh image URL and the access rule, and we'll feed that to uh app runner and that'll, will basically invoke the create service API call here. And that's actually what's gonna uh do the work. So let's go back to the console and you can see here we have the app running and uh exactly what we expect to see. So hopefully you enjoyed uh this demo and uh really? Yeah, like I said, just so easy to get everything running with the app runner. Uh just a few sub lines of code and Pulumi, thanks for watching and have a great day.

---
