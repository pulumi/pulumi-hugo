---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Modern Infrastructure: Pulumi Architecture Templates for AWS, Azure, Google Cloud and Kubernetes"
title: "Modern Infrastructure: Pulumi Architecture Templates for..."
meta_desc: |
    Introducing Pulumi Architecture Templates! Stand up the building blocks of your application's infrastructure with a single command in the CLI. No h...
url_slug: modern-infrastructure-pulumi-architecture-templates-aws-azure-google-cloud-kubernetes
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
  title: "Modern Infrastructure: Pulumi Architecture Templates for AWS, Azure, Google Cloud and Kubernetes"
  description: |
    Introducing Pulumi Architecture Templates! Stand up the building blocks of your application's infrastructure with a single command in the CLI. No hand-written code is required. Try them for yourself! ► Pulumi Templates Directory: https://www.pulumi.com/templates/ ► Container Service Templates: https://www.pulumi.com/templates/container-service/ ► Serverless Templates: https://www.pulumi.com/templates/serverless-application/ ► Static Website Templates: https://www.pulumi.com/templates/static-website/ ► Virtual Machine Templates: https://www.pulumi.com/templates/virtual-machine/ ► Kubernetes Cluster Templates: https://www.pulumi.com/templates/kubernetes/ ► Kubernetes Application Templates: https://www.pulumi.com/templates/kubernetes-application/  Pulumi templates are the fastest way to deploy infrastructure to AWS, Azure, and Google Cloud. After deploying, you can easily modify the infrastructure by updating the code in TypeScript, Python, Go, Java, .NET/C#, or YAML.  ✅ Get Started with Pulumi: https://pulumip.us/Get-Started ✅ Create a Pulumi account. It's free: https://pulumip.us/Sign-Up-OpenSource
  sortable_date: 2022-10-13T17:00:28Z
  youtube_url: https://www.youtube.com/embed/DaX8weCHO9A
transcript: |
    Mhm Hey everybody. Welcome to another modern infrastructure video. And today I'm gonna be introducing you to Pulumi architecture templates. Architecture templates are a new thing here and they are a quick, easy way to stand up the basic infrastructure. You need to deploy a wide variety of applications on just about any cloud in any language we support. It's uh it's pretty, pretty neat. Uh That way you get to actually focus on building your application rather than focusing on building out the core infrastructure that supports your application. So let's dive in and take a look at them. So if you go to Pulumi dot com slash templates, you'll see a bunch of these already set up for you uh including container services for AWS, Aws, serverless, uh static website templates for Aws, Azure and Google cloud plus a cnet's cluster on aws. Uh We are adding more of these over time, but let's dive into the AWS serverless application for an example real quick. So this deploys a serverless website to AWS that just displays the current time. It is going to deploy an S3 bucket for a static site and it's going to rely on LAMBDA and API gateway. Let's look at a quick example. So just make a new directory, my serverless app and CD into it. Here we go. And to create all the base for you just run Pulumi new serverless Aws Python. This does work in other languages. I just prefer Python. All of these defaults are OK. But each one of these templates will have defaults that you can change. It depends on the type of infrastructure that you're choosing to stand up because this is a serverless app. There isn't really a lot to mess with. At first, here we go. It's just installing all of our Python dependencies and packages for us and we're ready to go. So run Pulumi up and it's gonna give us a quick preview of everything that will happen if we do actually execute this, pulling me up, setting up your im roll your Lambda function S3 buckets the API gateway and it's going to output a string for us that we're calling URL. Yes. And it's gonna start to create while it's doing that though. We're going to go look at what Pulumi is actually doing for you here. The Scam L file just includes the basic information about your stack. But the actual magic is in the Python here. This is the default definition for your role, your Lambda function and the API gateway. And at the end, that's where we're exporting that URL we saw in the terminal over here is the starter service website. That's just showing date time, the handler for the date time. And let's go see how this is doing and it's all up. Let's see what this actually looks like and it's up neat. So from there, if you want to extend this, uh to deploy your actual application, whether you're building it from scratch or you're kind of moving something over to Pulumi from another service. You can just extend the template. You don't have to worry anymore about the very basic building blocks of deploying a modern application to a cloud provider. And this was only the serverless application, but there are already templates for containers for KTIS on various clouds. And we're adding more week after week for the most common scenarios and architectures that we see in uh cloud engineering. Uh keep an eye out on that page for more of them and keep an eye out on this channel for more videos doing deep dives into the different types of architecture templates as we release them.

---
