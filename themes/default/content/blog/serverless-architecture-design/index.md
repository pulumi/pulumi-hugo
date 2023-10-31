---
title: "Serverless Architecture Design with Pulumi"
date: 2023-10-30T20:40:47Z
draft: false
meta_desc: "Learn about the concept of serverless architecture and how to use Pulumi and Go to create your Azure serverless application"
meta_image: meta.png
authors:
    - adora-nwodo
tags:
    - serverless

---

Serverless architectures have gained more popularity in the recent years because they make it easier for software developers to focus on application development without the additional operation overhead. With Pulumi, you can deploy and manage your serverless infrastructure and this article shows you how to do this with Azure.

Before we go into the specifics of serverless architecture design with Pulumi on azure, let's go
through the basics of serverless - this is important for the rest of the article.

## What is Serverless Architecture

Serverless architecture is a cloud computing model that simplifies the management of infrastructure. This allows software developers to focus on writing code without worrying
about server provisioning, scaling or maintenance. The idea behind it is functions as a service (FaaS), in which the environment dynamically scales in response to demand and code is executed in response to events.

Key characteristics of serverless architecture include:

- Event-Driven: Serverless functions are triggered by events in the system. These events could be HTTP requests, messages in a queue, or changes to a data store.

- Auto-Scaling: With serverless, resources automatically scale up or down to match the workload so you don't use infrastructure beyond what you actually need.

- Pay-as-You-Go: You are charged only for the actual compute resources you use during code execution.

## Requirements

To follow along with this article, here are some things you might need:

- [Pulumi CLI](https://www.pulumi.com/docs/install/)

- [Pulumi account and access token](https://app.pulumi.com/signup)

- [Go](https://go.dev/doc/install)

- [Git CLI](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

- [Az CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

Now that you have everything needed to get started, let's see our serverless application written in Go and deployed using Pulumi.

### 1. Clone the repo and setup your project

The first thing we need to do is clone the repository from GitHub and setup the project. The serverless code can be found in [this repo](https://github.com/AdoraNwodo/serverless-pulumi-go).

```bash
# Clone the repository and cd to the infra directory
git clone https://github.com/AdoraNwodo/serverless-pulumi-go.git

# Install go dependencies (for pulumi infra)
go mod download

# Install go dependencies (for serverless function)
cd app && go mod download
```

### 2. Login to Pulumi Cloud and initialize stack

Next, let's setup our state in Pulumi Cloud.

```bash
# You can store Pulumi state in multiple ways, here we use Pulumi Cloud
# Other state backends include Azure storage, Amazon S3, local file, and more
pulumi login

# Initialize your stack
# Here we name the stack "dev"
pulumi stack init --stack dev
```

### 3. Deploy to Azure

Now, you're set up to deploy your Serverless app to Azure.

```bash
# Finally, run `pulumi up` to deploy!
pulumi up
```

### 4. Interact with your function

Once your web app is running, you can visit the static website that calls the functions at `https://{vcl_project_name}.vercel.app`, click the different buttons that call the different functions and see the response in real-time!

> Figure 2. A prompt and response screenshot from our Katwalk Frontend
![chatbot-webapp](./chatbot-webapp.png)

### 5. Tear down resources

Now that you've tested out this code and you can see the functions in action, remember to deprovision your deployment by running:

```bash
pulumi destroy
```

## Serverless Function Design

The design of the serverless function is important for the success of your application. When mapping out the architectural design for your Azure function, you should consider some of the following:

- **Function Logic**: A serverless function should have a well-defined purpose and focus on a specific task. If a function has multiple responsibilities, consider breaking it into smaller, more focused functions. In the serverless app we deployed using Pulumi, we had two functions `date` and `weather` and it is clear what their responsibilities are.

- **Statelessness**: Serverless functions should be stateless. Any data that needs to persist should be stored externally, such as in a database or object store.

- **Function triggers**: When dealign with serverless functions you should choose the Right trigger that best suits your use case. Common triggers include HTTP requests, message queues, database changes, and timers. In our application, we used an HTTP trigger for our two functions.

If you've joined us on this incredible journey to lean about serverless applications with Pulumi and Azure, we'd love to hear your story. How did it work out for you?

Our journey doesn't end here; there's a lot more you can do with serverless apps when you throw Pulumi into the mix. We invite you to share your thoughts, ideas, and suggestions, and we can't wait to see what you build!

Join us in the [Pulumi Community Slack](https://slack.pulumi.com) to decide what challenge we tackle next!
