---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Pulumi Deployments | Watch the Demo with Python"
title: "Pulumi Deployments | Watch the Demo with Python"
meta_desc: |
    We launched a preview of Pulumi Deployments at Cloud Engineering Days 2022. Learn more about how you can use Pulumi Deployments to simplify creatin...
url_slug: pulumi-deployments-watch-demo-python
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
  title: "Pulumi Deployments | Watch the Demo with Python"
  description: |
    We launched a preview of Pulumi Deployments at Cloud Engineering Days 2022. Learn more about how you can use Pulumi Deployments to simplify creating and managing infrastructure straight from the Pulumi Infrastructure as Code platform.  
  sortable_date: 2022-11-02T16:02:59Z
  youtube_url: https://www.youtube.com/embed/Uy0ABQCy-iA
transcript: |
    Hi there, I'm Laura developer advocate. And today, let's talk about Pulumi deployments available in preview today, November 2nd 2022 using Pulumi deployments. You can run any Pulumi program and therefore deploy any infrastructure on the Pulumi service instead of on your own local system. It's got three different triggers for you to choose from a trigger that runs whenever you commit to a github repository with other version control systems coming soon. A U I based trigger that lets you build infrastructure from your Pulumi dashboard or an API that you can access from anywhere, which is what we'll see today. If you're familiar with Pulumi automation API, you may be wondering about how the deployments API is different. The automation API is a programmatic non interactive way to run Pulumi programs. People use it for C I CD systems, web portals and more unlike the automation API, you aren't running Pulumi on your own local system with the deployments API. Instead the deployments API reaches out to the Pulumi service itself which interprets Pulumi programs and commands on remote Pulumi owned servers. So you no longer will have to install Pulumi on your local machine or your C I CD system to run an infrastructure deployment from your code base enough. Talking about it though. Let's go check out the new experience. All right. And here we are, we are taking a look at a Python program using our new deployments API. So I'm actually just gonna hit the API itself in this preview. You'll find that we have our back end URL. This is our API dot Pulumi dot com. And if you weren't aware, we do have documentation on this service API if you want to go explore it, but we're gonna be hitting a very, very specific endpoint. In this case, we're gonna generate the call itself using requests. We have some headers that we have and the request itself, which I'll show you in a moment. But this just creates the deployment, it hits that call and generates it and we're gonna be running our application right here. This call me. So please call the API and create, create a deployment with a little bit of data passed in. We're gonna be just grabbing from our examples. Repo, here's a branch, a repo directory inside of that branch. And we find the context on the operation right here. We're just doing an update. So if I actually just run this, we'll see that we are getting an update against the preview and we get an exit code of zero. Let's go see what that looks like on the UY. And there it goes, it's starting to actually run on the upstream system and our deployment has succeeded running on Pulumi servers instead of your own. We can see that we now have this update, we can click into it and explore. It looks just like our deployments everywhere else. This kind of thing can be really helpful eventually, maybe we'll see some drift detection. You can get some logs from the system that's running maybe some reactive updates or even perhaps some time bomb stacks or reviewing applications, things like that. Wouldn't it be really cool to have all of this all at one once in Pulumi. And let's hop over to one more piece here on the dashboard and this is the new deployment button that will be part of this preview. So here we have a new project and we have this deploy actions button right up here that allows you to run any of these same commands right here in the Pulumi dashboard. So let's say you're on call and you're away from your laptop. Maybe it's date night, maybe you're out shopping, maybe you're just out doing something else and you don't want to get back to that laptop. You would be able to come here and run any of these deployment commands directly from the dashboard, which should be pretty helpful for those of you on call or in any other situation where you want to run it directly on the dashboard. Pretty cool. If you're interested join the waitlist found here or down in the video description. I'll talk to you soon. Take care. Bye.

---
