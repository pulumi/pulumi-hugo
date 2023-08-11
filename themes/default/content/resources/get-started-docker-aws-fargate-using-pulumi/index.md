---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Get Started with Docker on AWS Fargate using Pulumi"
title: "Get Started with Docker on AWS Fargate using Pulumi"
meta_desc: |
    Build and publish a Docker image to a private registry and spin up an AWS Fargate service, with just a few lines of TypeScript and a single `pulumi...
url_slug: get-started-docker-aws-fargate-using-pulumi
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
  title: "Get Started with Docker on AWS Fargate using Pulumi"
  description: |
    Build and publish a Docker image to a private registry and spin up an AWS Fargate service, with just a few lines of TypeScript and a single `pulumi up` command.  Install Pulumi: https://pulumi.io/quickstart/install.html Setup the AWS Provider: https://pulumi.io/quickstart/aws/setup.html  Based on the blog post by Joe Duffy: https://blog.pulumi.com/get-started-with-docker-on-aws-fargate-using-pulumi
  sortable_date: 2019-05-29T18:49:29Z
  youtube_url: https://www.youtube.com/embed/owJhN4M4S4M
transcript: |
    With Pulumi bringing a Docker container from development into production. And Aws fargate is just a few lines of typescript. In this video. We'll show you how if you haven't installed Pulumi or provided access to your Aws credentials yet. Now is a good time to do that. First, we'll need to create a new Pulumi project. This can be done using the Pulumi C I in the terminal. We'll create a new project using the AWS typescript template and follow the prompts. We'll use the default DEV stack and specify our desired aws region. We'll be using us East one. This example uses a Docker file located in a folder named app for this video. Let's copy you over an existing Python application. Now we're ready to open the index dot TS file and start building our Pulumi program. The AWS typescript template produces a plumy program in the index dot TS that will demonstrate creating an S3 bucket. We won't be using S3, so we'll delete that and replace it with our code. We'll start by provisioning an entire elastic container service or ECs cluster. This is AWS S native container orchestration technology. We can do that with a single line of code and we'll name it cluster. This will use a default virtual private cloud or VPC in your account. This is easily customizable by passing the appropriate arguments. But for this example, the default will work now on to defining the networking first, we'll create a load balancer. This will give us a fixed address while allowing us to create a scaled out application. We'll use the AWS package to create an elastic application load balancer or a LB in Aws. It's a fully featured layer seven load balancer. We'll give it the name NET LB, set it to external and use the cluster. We just created to set the security groups. Now we want to expose port 80 to the internet and listen for incoming traffic. This can be done by adding a listener to the load balancer. We just created, we'll name it web, listen to port 80 and set it to external. Now it's time to build and publish the container defined in the app folder. Thanks to the AWS X package, we can accomplish this with just a single line of code. The single line will allocate a private elastic container registry or ECR repository for your Docker image. This is AWS S hosted Docker registry solution privately encapsulated inside your aws account. It will also build the Docker file in the APP directory and publish it to the registry each time you run the blue me up. This means you get a single command line to both provision and update your infrastructure. In addition to publishing and rolling out your images next up. Let's deploy our published image as a containerized service behind our load balance network on port 80 using our ECs cluster. We'll do this by creating an Aws Fargate service. Fargate is a managed container orchestrator that lets us skip the messy details of installing and managing swarm on our own. We'll name it app service and pass references to the cluster image and listener we created above. Pulumi tracks all the dependencies so it knows how to perform deployment activities in the right order. Now we're ready to deploy the application. But first let's add one last line of code that exposes the load balancer address. So it's easy to access. This will create a Pulumi stack output named RL which will be displayed in the Pulumi up stack output and in your project in app dot Pulumi dot com. Now let's switch to the terminal window and deploy the application by running to blue me up. First, we are presented with a preview of all the resources that will be created. Selecting yes, will deploy everything to your aws account. We now have a fully functioning application. Let's give it a try. First, we can simply curl it using the Plumy cli to access our URL stack output, we can also open it in a browser. Now, if we go back to the terminal and open the Perma link, we can see a history of our deployments. Similarly to how GIT works with github. You can also see all of your resources and outputs. We now have a fully functioning AWS micro service, including the infrastructure and application resources. All it took was a Docker file and a few lines of typescript, no YAML, complex sequence of CL commands or manual cluster installation was required.

---
