---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Declarative vs Imperative | Quick Bites of Cloud Engineering"
title: "Declarative vs Imperative | Quick Bites of Cloud..."
meta_desc: |
    What do "declarative" and "imperative" mean in cloud computing and cloud engineering? Get a quick overview of declarative and imperative infrastruc...
url_slug: declarative-vs-imperative-quick-bites-cloud-engineering
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
  title: "Declarative vs Imperative | Quick Bites of Cloud Engineering"
  description: |
    What do "declarative" and "imperative" mean in cloud computing and cloud engineering? Get a quick overview of declarative and imperative infrastructure as code with Laura, one of Pulumi's developer advocates, in this episode of Quick Bites of Cloud Engineering. Declarative vs imperative explained in less than 5 minutes!  Want to propose something for me to talk about? Drop a request in the comments or head to this GitHub repo to add a topic request or vote for your favorite with emojis: https://pulumip.us/pulumitv-github  Watch the whole Quick Bites series at https://pulumip.us/quick-bites  Learn more about Pulumi at https://pulumip.us/home
  sortable_date: 2022-06-17T21:45:21Z
  youtube_url: https://www.youtube.com/embed/4B7vLfVYG84
transcript: |
    Welcome to your quick bite of cloud engineering. I'm Laura. And today we're here to chat about declarative and imperative infrastructure. So what exactly does declarative and imperative mean declarative systems declare the desired end state rather than define the pathway to get there imperative systems. On the other hand, define the commands to reach an end goal with imperative, referring to the imperative command. So you have to decide how to get from your starting state to your end state. There's more nuance here though you need to think of these definitions in terms of what the end user experiences, by the way that end user is you, even though a back end might take imperative commands against a cloud api the fact that the user only declares a desired end state makes that system declarative. It can get confusing when you might be using an imperative language or a scripting language to declare state. Keep in mind that it doesn't matter how you get there. It's about what the experience is for the user. Are you declaring a desired end state or are you defining each state change of the program? One way to remember this is to ask whether the system is thinking in terms of inputs and outputs, which defines a declarative programming language. Or if it's thinking in terms of statements and incremental changes to memory, which defines an imperative programming language. If it's thinking in terms of inputs and outputs, the system is grouping together related commands to address a singular input or output. And you as the end user only experience those inputs and outputs personally, I prefer the term desired state system over declarative system because there's less confusion due to the classic definition of declarative in programming languages. OK. That's great. But how does that relate to cloud engineering? Well, there's two general schools of thought when it comes to managing infrastructure, some tools focus on running commands in a specific order. Due to being focused on tasks like configuration, the configuration of a system is typically built in a very specific order such as running an operating system update, then updating those packages that are dependent on that operating system. In those cases, it makes a lot more sense to run an imperative approach to managing infrastructure since you're trying to run everything exactly in the same way. Every time. On the other hand, a lot of modern infrastructure's code tools all are declarative like Pulumi with users defining end states for infrastructure generally, when provisioning and managing infrastructure, you don't really care about the path to get there. Only the end goal defining things decoratively works better with the concurrent distributed nature of cloud native architectures because it's only concerned with monitoring a desired state. That method handles real world latency, easier reduces collisions between commands, handles drift and doesn't require modification. Should you need to run the program again? Pretty cool. This has been your quick bite of cloud engineering. If you like this video, please share it, sharing it and liking and subscribing, of course, helps out our channel and helps me make more videos like this for you. Also, if you want to learn about something specific, leave me a note down in the comments. I do read them or open an issue in our github repo that I'm linking in the description. I'll be back soon for another quick bite. Take care. Bye. If you have a topic, you would love to have us cover here on Pulumi TV. All you have to do is go to github dot com slash Pulumi slash Pulumi TV. Thanks so much.

---
