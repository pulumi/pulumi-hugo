---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Easily build container-based AWS Lambda functions using Pulumi"
title: "Easily build container-based AWS Lambda functions using..."
meta_desc: |
    With the announcement of Container Image Support in AWS Lambda, the workflow for publishing serverless components is now easier than ever.  Watch a...
url_slug: easily-build-containerbased-aws-lambda-functions-using-pulumi
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
  title: "Easily build container-based AWS Lambda functions using Pulumi"
  description: |
    With the announcement of Container Image Support in AWS Lambda, the workflow for publishing serverless components is now easier than ever.  Watch as Pulumi VP of Engineering, Lee Zen, helps you to get started using this powerful new feature.  Read our blog for more information: https://www.pulumi.com/blog/aws-lambda-container-support/?utm_campaign=lambda-container&utm_source=youtube.com&utm_medium=video-description
  sortable_date: 2020-12-01T19:06:47Z
  youtube_url: https://www.youtube.com/embed/gB9T1aW3gSk
transcript: |
    Pulumi makes it easy to take advantage of Aws. Lambda's ability to package serverless functions as container images. In this video, we'll build a video thumb nailer. Let's start with the bucket, we can push videos to before running FFM peg and Lambda was onerous. Now, we can simply be package it as part of our container, build it and push the image to. Ecr Pulumi makes this easy with a single line of code. Next, we need to give Lambda the right permissions for this function. We're able to take advantage of the ID E use automatic pollution as well as typescript OMs. Let's finish off. For example, by creating the Lambda function referencing the image we just pushed. It's easy to wire up the functions to the S3 bucket notifications in a single line of code. We export the bucket name for use as out of our program. Finally, let's augment our example by creating a callback to log information on when we create new thumbnails. That's it. In just a couple of lines of code, we build the thumbnailing service. Let's deploy it here. You can see it's building the container image, pushing it as well as creating the various other resources we've defined while that's deploying. Let's take a quick look at our Docker file to see how we're building our image. You can see it's fairly straightforward. Let's also take a quick look at the function handler. We're simply shelling out to FFM peg and copying the thumbnail to S3. Let's grab a simple clip to try out our deployment finished in just a couple of minutes. Let's watch the logs for our stack and try uploading our clip. We can see the logs for the function processing the clip. We can also see the logs for other function that logs thumbnail creation. Let's copy that thumbnail and take a look. Success. We hope you can see just how simple and easy. Pulumi makes it to use container images with aws LAMBDA. Our example was in typescript but Pulumi also supports Python dot net and go give it a try today.
---
