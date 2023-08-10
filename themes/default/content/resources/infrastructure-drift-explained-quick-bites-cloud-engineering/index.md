---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Infrastructure Drift Explained | Quick Bites of Cloud Engineering"
title: "Infrastructure Drift Explained | Quick Bites of Cloud..."
meta_desc: |
    What does drift, or configuration drift, mean when talking about cloud computing and cloud engineering? Get a quick overview with Laura, one of Pul...
url_slug: infrastructure-drift-explained-quick-bites-cloud-engineering
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
  title: "Infrastructure Drift Explained | Quick Bites of Cloud Engineering"
  description: |
    What does drift, or configuration drift, mean when talking about cloud computing and cloud engineering? Get a quick overview with Laura, one of Pulumi's developer advocates, in this episode of Quick Bites of Cloud Engineering. Drift explained in less than 5 minutes!  Watch the whole Quick Bites series at https://pulumip.us/quick-bites Learn more about Pulumi at https://pulumip.us/home Get Started with Pulumi for free at https://pulumip.us/Get-Started  Want to propose something for me to talk about? Drop a request in the comments or head to this GitHub repo to add a topic request or vote for your favorite with emojis: https://pulumip.us/pulumitv-github
  sortable_date: 2022-03-16T23:00:18Z
  youtube_url: https://www.youtube.com/embed/mclJwzMz_ek
transcript: |
    Welcome to your quick bite of cloud engineering. I'm Laura. And today we're here to chat about drift. So what exactly is drift drift or configuration drift is the idea that infrastructure can shift away from an ideal state over time due to issues like manual configuration changes or just general inconsistencies in individual machines. In short, infrastructure becomes increasingly inconsistent. This isn't a new phenomenon with the advent of infrastructure as code, either we have known about it for a while simply because there has always been latency and other issues in physical hardware. And there's always been the temptation to make changes manually versus following a playbook. The idea of drift is present in physics with concepts like frequency drift. If you've ever messed around with radio transmission or done other similar electrical engineering experiments, you may have encountered frequency drift where frequency gets a bit higher or a bit lower. Let's explore a more concrete example. Something you can explore yourself here are two identical videos. As we keep watching these videos, we'll notice that they're slowly no longer in sync. I've deliberately turned off the timing that ensured they would track together and a single manual changed has caused them to drift from one another. This little experiment demonstrates one of the biggest problems with manual configuration changes in infrastructure. The likelihood that two systems will slowly become unique with configurations that aren't quite right. So what does that have to do with cloud engineering? Well, the fact that someone likely will hop onto a system for debugging purposes or other emergency procedures means that you're going to have changes to a system that aren't tracked in a state file somewhere. Any time that you have cloud based systems that has some kind of replica, you'll find drift there too. And there's real risk in having a system that's drifted out of configuration, whether that's an open port that wasn't opened in a hurry and wasn't secured properly or a temporary database replica that's taking up some space. You need to have a strategy to handle drift over time in cloud based and cloud native systems. No matter how carefully you handle configuration or how much you prevent people from manually modifying systems, you will still encounter drift simply due to the sheer size of deployments and the latency inherent in distributed cloud computing from physical hardware needing to interact. There are automated tools that analyze all of your systems for drift on a regular basis, updating elements of the system when they notice a deviation. This type of patch is pretty common when you've got long running systems like servers or load balancers, you can even write these kinds of tools yourself. On the other hand, you could just replace everything regularly with code based deployments, which is what you typically find folks doing on more ephemeral hardware. A lot of folks follow both paths and along with both system based fixes. It's always a good idea to immediately clean up after yourself such as closing a port or updating state. If you've had to do an out of band change before you forget about it. This has been your quick bite of cloud engineering for this week. If you like this video, please share it, sharing it and liking and subscribing, of course, helps out our channel and helps me make more videos like this. Also, if you want to learn about something specific, leave me a note down in the comments. I do read those or open an issue in our github repo that I'm linking in the description. I'll be back in just two weeks for another quick bite. Thanks so much. Take care. Bye. If you have a topic, you would love to have us cover here on Pulumi TV. All you have to do is go to github dot com slash Pulumi slash Pulumi TV. Thanks so much.

---
