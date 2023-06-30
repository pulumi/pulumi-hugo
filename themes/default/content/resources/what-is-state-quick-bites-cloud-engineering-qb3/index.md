---
preview_image:
hero:
  image: /icons/containers.svg
  title: "What is State | Quick Bites of Cloud Engineering (QB3)"
title: "What is State | Quick Bites of Cloud Engineering (QB3)"
meta_desc: |
    What is state? Get a quick overview with Laura, one of Pulumi's developer advocates, in this episode of Quick Bites of Cloud Engineering.
url_slug: what-is-state-quick-bites-cloud-engineering-qb3
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
  title: "What is State | Quick Bites of Cloud Engineering (QB3)"
  description: |
    What is state? Get a quick overview with Laura, one of Pulumi's developer advocates, in this episode of Quick Bites of Cloud Engineering.  Want to know more?  Read my article on Understanding State at https://pulumip.us/State Learn about how Pulumi handles your infrastructure state files and supported backend options for these state files at https://pulumip.us/StateBackends  Want to propose something for me to talk about? Drop a request in the comments or head to this GitHub repo to add a topic request or vote for your favorite with emojis: https://pulumip.us/pulumitv-github  Watch the whole Quick Bites series at https://pulumip.us/quick-bites Learn more about Pulumi at https://pulumip.us/home
  sortable_date: 2021-12-08T16:00:33Z
  youtube_url: https://www.youtube.com/embed/u2C71uF0rdM
transcript: |
    Welcome to your quick bite of cloud engineering. I'm Laura. And today we're here to talk about state. So what exactly is state in the context of system science state is a snapshot of the current properties of the system. Those properties include the current value of variables, which methods have been called. And where we are in our program state is something that you can find in the general sciences as well. Well, it might be a bit easier to understand state if we start with something you can experience yourself. So let's imagine we're holding a ball like this. The ball is about 4.5 ft or 1.5 m off the ground because I'm short that distance from the ground is the current value of a variable or the property. And it's part of the state of the ball. We can describe the ball's physical properties like its color and its shape as more elements of the ball's state. At the moment, the ball's relative velocity to the earth's system is zero. It's not moving. When I drop the ball, the ball's distance to the ground and relative velocity changes. And where we to take a picture every millisecond, we can define the values of these variables at each moment in time. Each picture with its discrete values defines the state of the ball state can change. And we often graph the velocity of the ball relative to time to visualize the state of the ball system. So how does this apply to cloud engineering? Well, when we run a program to stand up infrastructure, we need to maintain awareness of the system state at all points of the program and beyond. Why is that? Well, we may have multiple commands getting run against the infrastructure at any one time with multiple people modifying different parts of the system which is known as concurrency. How does the system know what should get done first or what if your internet connection goes out in the middle of provisioning new stacks? Like happens to me all the time. How does the system know where to pick back up the chain of commands to stand things up correctly? These problems created by concurrent distributed systems are solved by tracking state. In a lot of cases, your cloud providers are tracking states on a grand scale for all of the systems that they manage. And you'll often be checking your local record of the state of the system against the record that they have of the state of the system. So believe it or not, git and other version control systems all use this concept of state to track changes in your code base because they're also concurrent distributed systems. It's a pretty handy concept to understand. We'll be diving into state files, state machines and more in an upcoming modern infrastructure Wednesday as well. This has been your quick bite of cloud engineering for this week. If you like this video and want to see more, please do like and subscribe to our channel and check out the quick bits playlist also if you want to learn about something specific, leave me a note down in the comments or open an issue in our github repo that I'm linking down in the description. I'll be back in just a few weeks for another quick bite. Take care. Bye.

---
