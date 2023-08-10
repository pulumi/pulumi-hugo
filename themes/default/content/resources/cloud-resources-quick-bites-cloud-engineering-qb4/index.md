---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Cloud Resources | Quick Bites of Cloud Engineering (QB4)"
title: "Cloud Resources | Quick Bites of Cloud Engineering (QB4)"
meta_desc: |
    What are cloud resources? When someone asks for a resource on a cloud provider, do you know what that means? Get a quick overview with Laura, one o...
url_slug: cloud-resources-quick-bites-cloud-engineering-qb4
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
  title: "Cloud Resources | Quick Bites of Cloud Engineering (QB4)"
  description: |
    What are cloud resources? When someone asks for a resource on a cloud provider, do you know what that means? Get a quick overview with Laura, one of Pulumi's developer advocates, in this episode of Quick Bites of Cloud Engineering.  Want to propose something for me to talk about? Drop a request in the comments or head to this GitHub repo to add a topic request or vote for your favorite with emojis: https://pulumip.us/pulumitv-github  Watch the whole Quick Bites series at https://pulumip.us/quick-bites  Learn more about Pulumi at https://pulumip.us/home
  sortable_date: 2022-01-06T00:46:25Z
  youtube_url: https://www.youtube.com/embed/cdlYwpmb4wM
transcript: |
    Welcome to your Quick Fight of Cloud engineering. I'm Laura. And today we're here to chat about resources. So what exactly are resources in cloud computing resources are the fundamental building block of any infrastructure or system? A resource can be anything from a server to a network to a serverless function, to a security policy or anything in between. If you're familiar with object oriented programming, a resource is basically an object, a resource like an object has properties like a name or an ID. You can interact with a resource through a function call or an action just like an object. When you select a button to perform an action on a web portal for your cloud provider, the button makes the function call for you behind the scenes. So to come back specifically to cloud engineering, we need to add to each resource. The idea that it has a state to track and the various platforms have different ways to interact with each resource. Resources can be used to build systems just like you might expect from a building block on their own in a cloud based environment. A resource doesn't do much. Generally, you can't deploy a functional application with a single resource. Now before you point at something like a serverless function and claim that resource can hold a single application, think about the security policies, the networking needs and other pieces that any cloud provider requires to set up that function, to interact with some data. All of those additional needs are also considered resources on some cloud engineering platforms. You can group resources together to make a resource group which often acts just like a resource. Sometimes they're called custom resources. You might even find some platforms set the base level that defines a resource at the point of a resource group. Instead of a resource, it's turtles all the way down to put an application out on a cloud based platform. You need to string resources together to make up the infrastructure underneath your application. For a basic example, you can consider a static website that has a storage bucket resource holding the files, which also are resources as each file has properties to reference and a state to consider and a way to interact with it. And then there's a security policy resource for that bucket that allows someone to access the file from an external address. Any cloud native architectural diagram really can be expressed in resources and interaction between those resources that are then defined in your code. This has been your quick bite of cloud engineering for this week. If you like this video and want to see more. Please do like and subscribe to our channel and check out the quick bites playlist. Also, if you want to learn about something specific, leave me a note down in the comments. I do read those or open an issue in our github repo that I'm gonna link in the description right now. I'll be back in just two weeks for another quick bite. Take care. Bye. Hey Cloud engineers. Laura here. I'm just here to remind you that if you have a topic you would love to have us cover here on Pulumi TV. All you have to do is go to github dot com slash Pulumi slash Pulumi TV. You can add an issue there and let us know what topic you'd like us to talk about. Thanks so much. Bye.

---
