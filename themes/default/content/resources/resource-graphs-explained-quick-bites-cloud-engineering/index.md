---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Resource Graphs Explained | Quick Bites of Cloud Engineering"
title: "Resource Graphs Explained | Quick Bites of Cloud..."
meta_desc: |
    What is a resource graph in cloud computing and cloud engineering? Get a quick overview of graph theory, resource graphs, and more with Laura, one ...
url_slug: resource-graphs-explained-quick-bites-cloud-engineering
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
  title: "Resource Graphs Explained | Quick Bites of Cloud Engineering"
  description: |
    What is a resource graph in cloud computing and cloud engineering? Get a quick overview of graph theory, resource graphs, and more with Laura, one of Pulumi's developer advocates, in this episode of Quick Bites of Cloud Engineering. Graphs explained in less than 5 minutes!  Want to propose something for me to talk about? Drop a request in the comments or head to this GitHub repo to add a topic request or vote for your favorite with emojis: https://pulumip.us/pulumitv-github  Watch the whole Quick Bites series at https://pulumip.us/quick-bites  Learn more about Pulumi at https://pulumip.us/home
  sortable_date: 2022-03-30T22:19:48Z
  youtube_url: https://www.youtube.com/embed/KOmpQt3miUI
transcript: |
    Welcome to your quick bite of cloud engineering. I'm Laura. And today we're here to chat about resource graphs. So what exactly are resource graphs? A resource graph is a type of directed graph or D graph that demonstrates how resources are connected and how they might depend on each other. These graphs indicate how resources you deploy are related. All of the terminology that we use when talking about resource graphs comes from graph theory in mathematics. So it can get a bit confusing when folks are using the terms without necessarily explaining them first. So let's sort those out first. A graph in this case isn't a drawing but rather an abstract structure. In fact, it's a data structure in computer science. That's exactly where graph QL comes from. If you've ever heard that term, we often draw graphs out like with Pulumi or terraform resource graph as the spatial representation is easier for us to understand. But it can also be represented as a table like with Azure's resource graph manager. Regardless of how your resource graph is presented, it's always a representation of the abstract structure itself. There are nodes which represent various elements like resources they're often drawn in circles like this. They're also known as vertices or points depending on who you talk with. In text only settings like terminals, we often have nodes represented by dots plus signs or other singular symbols with texts that names the node. Next up there are edges which represent connections between resources. Edges on directed graphs have a direction for the relationship between the two nodes. What does that mean? The direction indicates which node depends on another in a drawing. They're drawn as lines with arrows between the nodes like this. In text only settings edges are often represented by a series of dashes and carrots with indentation helping to indicate dependencies. So that's great. But what does this have to do with cloud engineering? Well, most infrastructures code tools create some kind of resource graph and can serve it as output for you to examine these graphs are great tools for fixing your code. When you realize a resource needs to depend on something else or when your deployment is taking too long because you created dependencies, unnecessarily graphs from different deployments can be compared to discover how something may have changed too. When you're exploring changes, you didn't make manually. They can help us understand when a system is impossible to deploy such as for a system with circular dependencies and how our tools have made sense of those issues when attempting to stand up all of that infrastructure. In short, there are a lot of possible uses for resource graphs and cloud engineering. And it's worth knowing how they work. In fact, in the next modern infrastructure video, my colleague David will be walking you through some code on resource graphs. So you don't want to miss it. This has been your quick bite of cloud engineering for this week. If you like this video, please share it, sharing it and liking and subscribing, of course, helps out our channel and helps me make more videos like this for you. Also, if you want to learn about something specific, leave me a note down in the comments. I do read those or open an issue in our github repo that I'm linking in the description. I'll be back in just two weeks for another quick bite. Take care. Bye. If you have a topic, you would love to have us cover here on Pulumi TV. All you have to do is go to github dot com slash Pulumi slash Pulumi TV. Thanks so much.

---
