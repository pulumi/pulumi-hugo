---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Concurrency Explained | Quick Bites of Cloud Engineering (QB6)"
title: "Concurrency Explained | Quick Bites of Cloud Engineering..."
meta_desc: |
    What is concurrency when talking about cloud computing and cloud engineering? Do you know what a distributed, concurrent system is? Get a quick ove...
url_slug: concurrency-explained-quick-bites-cloud-engineering-qb6
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
  title: "Concurrency Explained | Quick Bites of Cloud Engineering (QB6)"
  description: |
    What is concurrency when talking about cloud computing and cloud engineering? Do you know what a distributed, concurrent system is? Get a quick overview with Laura, one of Pulumi's developer advocates, in this episode of Quick Bites of Cloud Engineering. Concurrency explained in less than 5 minutes!  If you want to learn more about formal methods, one way to explore concurrency in distributed systems, I highly recommend starting with Leslie Lamport's information on TLA+ at http://lamport.azurewebsites.net/tla/tla.html  Want to propose something for me to talk about? Drop a request in the comments or head to this GitHub repo to add a topic request or vote for your favorite with emojis: https://pulumip.us/pulumitv-github  Watch the whole Quick Bites series at https://pulumip.us/quick-bites  Learn more about Pulumi at https://pulumip.us/home
  sortable_date: 2022-02-03T02:25:39Z
  youtube_url: https://www.youtube.com/embed/VeA_-eMBRtw
transcript: |
    Hi there. Welcome to your quick bite of cloud engineering. I'm Laura. And today we're here to chat about concurrency. So what exactly is concurrency? Well, concurrency is the idea that a system can handle multiple things happening in a set period of time with no set order in which those things start or finish. Among all of the common examples to explain concurrency is a simple banking account accessed by a handful of people. Each person can make one transaction at a time and the order of the transactions is as random as a human's interaction with the system, person, A could be making a deposit at the same time as person C is making a withdrawal and person B could decide to make a deposit while person C's withdrawal is processing the actions of each person are processed by the system as they come in. Sometimes in parallel with the end result being the sum of those transactions. Another common example is a single person serving multiple tables at a restaurant. Each table has a different length of time it takes for the diners to finish eating and the person serving the tables processes each transaction based on a random order in the end. Hopefully the diners, all order are served, eat, pay and leave. That's lovely and all. But what does this have to do with cloud computing? Well, if you're running your applications and workloads on the cloud, you're likely running your applications across many different pieces of hardware on many different virtual systems. And likely even across data centers, inputs from users are random and will trigger different parts of your applications or workloads at various points. Your application is serving hundreds of thousands of users at any one point in time who are making requests and processing transactions just like a restaurant or a banking account. In short, your application and infrastructure are parts of a concurrent distributed system tracking state which we explored in another video is one way to get a snapshot of all the things happening in a system at once. So the state of a system is extremely important for concurrent distributed systems state enables us to watch for deadlocks or moments when there is no way for a system to reach a desired state. Because two or more actions are blocking one another from needed resources, cloud computing. And as an extension of cloud computing, cloud engineering hinges on being able to handle distributed computing and concurrency. Gracefully, applications need to get the same results every time regardless of the state changes between the initial state and the end state. Just imagine a data store that fell over every time a process attempted to connect to it while another connection was active cloud native systems running on containers or applications running as serverless functions need to execute cleanly even if they're running at the same time in different places and are dependent on one another in some fashion. So understanding concurrency and the related concept of state is critical to understanding cloud native systems. This has been your quick bite of cloud engineering for this week. If you like this video, please share it, sharing it and of course, liking it and subscribing to our channel helps out our channel and helps me make more videos like this for you. Also, if you want to learn about something specific, leave me a note down in the comments. I do read those or open an issue in our github repo that I'm linking in the description below. I'll be back in just two weeks for another quick bite. Take care. Bye. Hey cloud engineers, Laura here. I'm just here to remind you that if you have a topic you would love to have us cover here on Pulumi TV. All you have to do is go to github dot com slash Pulumi slash Pulumi TV. You can add an issue there and let us know what topic you'd like us to talk about. Thanks so much. Bye.

---
