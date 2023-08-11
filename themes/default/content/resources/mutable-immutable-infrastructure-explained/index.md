---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Mutable and Immutable Infrastructure Explained"
title: "Mutable and Immutable Infrastructure Explained"
meta_desc: |
    What does mutable and immutable infrastructure mean when talking about cloud computing and cloud engineering? Get a quick overview with Laura, one ...
url_slug: mutable-immutable-infrastructure-explained
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
  title: "Mutable and Immutable Infrastructure Explained"
  description: |
    What does mutable and immutable infrastructure mean when talking about cloud computing and cloud engineering? Get a quick overview with Laura, one of Pulumi's developer advocates, in this episode of Quick Bites of Cloud Engineering. Immutable and mutable infrastructure explained in less than 5 minutes!  Want to propose something for me to talk about? Drop a request in the comments or head to this GitHub repo to add a topic request or vote for your favorite with emojis: https://pulumip.us/pulumitv-github  Watch the whole Quick Bites series at https://pulumip.us/quick-bites  Learn more about Pulumi at https://pulumip.us/home
  sortable_date: 2022-02-17T00:27:19Z
  youtube_url: https://www.youtube.com/embed/31nrGImgirE
transcript: |
    Hi there. Welcome to your quick bite of cloud engineering. I'm Laura. And today we're here to chat about mutable and immutable infrastructure. So what exactly does mutable mean? Well, mutable means changeable or something that can and will change. So, mutable infrastructure is infra that you can and will likely want to change immutable infrastructure. On the other hand, is unchanging meaning that you'll replace it rather than update or upgrade it in place your computer that you use for general tasks is immutable because you'll update the operating system and applications rather than replace the machine every time you need to update it. Your containers. On the other hand, are likely immutable as we generally don't modify existing containers unless you're taking one container and ss hing into it to debug. It's much simpler and more repeatable to update the image and then replace the container itself. Mutable infrastructures often have been used in traditional data center environments where your team might own various complete components like full servers or other physical hardware that may take long time frames to replace as a concept. It's been around longer than immutable infrastructure because no one wanted to go through an entire provisioning process for every change when that process could stretch over multiple days or even weeks depending on data center availability. As a result, people built tools to manage configuration of multiple servers, tools that would log in and run upgrades in place. We had scheduled downtime windows where you knew servers in an area of the data center would be offline while scripts to update those systems ran, many of these kinds of activities are still in place today for folks managing the physical hardware like data center providers. However, when we started having things like virtualization which led to virtual machines and all provisioning times for end users dropped because we were no longer dealing with physical hardware. In addition, the move to virtual systems that already had interfaces underneath to manage them led to people building API S and other interfaces that enabled automation. And since we weren't constantly requesting or destroying physical hardware, it became much easier to make virtual systems ephemeral. Why does that matter to cloud engineering? Most if not all of the best practices for cloud native architectures rely on immutable infrastructure in the more complex world of distributed concurrent computing, the reliability of immutable infrastructure is critical. You avoid configuration drift among servers which we'll talk about soon. Here on quick bytes, you duplicate systems which leads to redundancy that drives an assurance of uptime, you reduce downtime on upgrades because of that redundancy, you can move from one provider to another because everything is replaceable, nothing is unique and everything has a defined known good configuration and states. In the end, everything we do with cloud engineering from automation to deployments to upgrades is built on the backbone of the concept of immutable infrastructure. This has been your quick bite of cloud engineering for this week. If you like this video, please share it, sharing it and liking and subscribing. Of course, helps out our channel and helps me make more videos like this for you. Also, if you want to learn about something specific, leave me a note down in the comments. I do read those or open an issue in our github repo that I'm linking in the description. I'll be back in just two more weeks for another quick bite. Take care. Bye. If you have a topic, you would love to have us cover here on Pulumi TV. All you have to do is go to github dot com slash Pulumi slash Pulumi TV. Thanks so much.

---
