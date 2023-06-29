---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Pulumi Docker Provider 4.0: Build Images Up To 50x Faster | Modern Infrastructure"
title: "Pulumi Docker Provider 4.0: Build Images Up To 50x..."
meta_desc: |
    The Pulumi Docker Provider has been a top Pulumi provider since it launched in 2018. It can be used to provision any of the resources available in ...
url_slug: pulumi-docker-provider-40-build-images-up-50x-faster-modern-infrastructure
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
  title: "Pulumi Docker Provider 4.0: Build Images Up To 50x Faster | Modern Infrastructure"
  description: |
    The Pulumi Docker Provider has been a top Pulumi provider since it launched in 2018. It can be used to provision any of the resources available in Docker, including containers, images, networks, volumes, and more. Pulumi Docker Provider 4.0 was released with a set of improvements to the 'docker.Image' resource driven by the feedback we have received from our community. Discover the improvements and see them in action in the demo. Source Code: https://github.com/aaronkao/docker-mern  Note:  Since creating the video, we have shipped v4.0.1, which has updated the Dockerfile context directory parameters. The code shown in the video is incorrect now, but the code in the git repo (link below and in the video) has been updated to support v4.0.1  
  sortable_date: 2023-03-22T13:00:26Z
  youtube_url: https://www.youtube.com/embed/kr0RZzv-pUI
transcript: |
    Welcome to another episode of modern infrastructure Wednesday. My name is Aaron Kao. We just released the version four of the Pulumi Docker provider. Earlier this month, the Docker provider allows you to provision any of the resources available in Docker including containers, images, networks, volumes and more. One of the most heavily used features of this provider is the Docker dot image resource which enables Pulumi users to build and push a local Docker context to a registry as part of the plume deployment, we've received lots of feedback from our community and as part of the four, we've made um these following improvements. Number one, significantly improved performance including reduced need for rebuilds, two bill kit support including cross platform builds three richer doctor build logs inside Pulumi IEC program output and then four Pulumi and Pulumi Java support for this episode. I've adopted the grocery list. My application that my colleague Christian built for a blog post last year and uh to a local Docker app. So here we have a Mongo database. Uh A no Js express back end and then front ends react. Um What we did here is these two to front and back end we containerized and then the database we containerized. Uh And we're all running it locally in Docker. So I cloned this repo. Um So let's quick, quickly take a look at this code. OK. So, I it's just a simple Docker me application Mo Mango Expel React. Uh No jas uh So we're using the uh Ploy Docker uh provider. That's we're using version four. So we'll get some configurations and then we'll create a Docker network and then we will uh create an image from a Docker file. Um Specifically, we have a folder called app down here. Um uh That has a back end and front end um application. Uh We're gonna, there's a doctor file here and we're gonna um tell um the doctor to build that specific doctor file and then we'll use bill kit as uh part of the build process. Then we'll create a container from that image. Um We use a um from here configuration container port and then we pass it in the database URL using the uh local Docker network. Then we're also gonna use a um Docker image. Uh This is just the Mongo DB community image. We're just gonna build that and we're, we're, we're gonna pull that and then we'll create a Mongo DB container and then finally, we'll just export the, the URL of the application. So with that, let's run a, let's run plumy stack and knit here to initialize the stack. Great. Then we'll issue it, pulling me up. OK. So uh 66 resources to create network, image, remote image and two containers. So let's hit. Yes to create it and it will start running and you'll see here that the filter doctor logs during build and push will be deployed at info box on the ply me up. Um OK. So that is done and then let us go to the URL and here's Plu grocery list app. All right, let's add some grocery list items for pulling the piss. So, alright, crawdads, some shrimp, some and grits, some sweet tea. Um Actually he got shrimp earlier, so we'll take that out and he bought grits as well. So we'll cancel that out. But yeah, this is just a Simple Me app. Um and it's storing everything in a local mango DB uh container. Ok. There we have it. Uh We just used V four of the Plume Docker provider to deploy simple um me application. Uh You can learn more about this updated and improved Docker provider from Monica and Guinevere's blog post linked below. If you want to try out my me stack uh local Docker example, you can find the github repo link below as well. Lastly, don't forget to hit like and subscribe if you like this video. That's it for today's modern infrastructure Wednesday. See y'all next time.

---
