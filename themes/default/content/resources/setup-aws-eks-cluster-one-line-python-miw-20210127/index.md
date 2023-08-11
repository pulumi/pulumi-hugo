---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Setup an AWS EKS Cluster in One Line of Python | MIW 2021-01-27"
title: "Setup an AWS EKS Cluster in One Line of Python | MIW..."
meta_desc: |
    In this week's episode we build out an EKS cluster in one line of Python using the new pulumi-eks library. If you're wondering where we've been the...
url_slug: setup-aws-eks-cluster-one-line-python-miw-20210127
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
  title: "Setup an AWS EKS Cluster in One Line of Python | MIW 2021-01-27"
  description: |
    In this week's episode we build out an EKS cluster in one line of Python using the new pulumi-eks library. If you're wondering where we've been the last few weeks on Modern Infrastructure Wednesday, we were on Howdy Partner a couple weeks ago: https://www.twitch.tv/videos/880259958 and last week we were on Docker's channel https://www.youtube.com/watch?v=t_mLNzug2ho  Today's example is in Python, but Pulumi makes it easy to stand up infrastructure in your favorite languages including TypeScript, JavaScript, C#, and Go - saving time over legacy tools like CloudFormation and Hashicorp Terraform.  https://www.pulumi.com/docs/get-started/?utm_campaign=PulumiTV&utm_source=youtube.com&utm_medium=video
  sortable_date: 2021-01-28T18:25:16Z
  youtube_url: https://www.youtube.com/embed/gxLyAr0lUg0
transcript: |
    Hello and welcome to another episode of Modern Infrastructure Wednesday. I'm your host, Lee Zen. Today we'll be covering creating Eks Clusters in just a single line of Python. We're showing off our new multi language capabilities where uh we can actually use existing libraries in Pulumi uh with other languages. So this original EKS library was actually built in uh no Js you can see here, I'm importing in Python and I installed the dependencies and all that's needed now is just to write the single line Pulumi Ks cluster. I'm going to export the Q config run Pulumi up and you can see that it proposes to create all these different resources. Uh I say yes and away it goes creating all the different resources. Now, uh we're gonna actually use this uh uh cluster, we're creating to actually deploy some things into cities. So we'll first start off by creating a name space. And you can see here, one of the cool things is I'm using the provider resource off of that cluster. So I'm actually, I'm actually telling uh the uh resources to use that Cuber provider provided by uh the EK A cluster. So I have the name space. I'm going to create a deployment. Uh I'm just gonna fast forward through here. Uh Just, you know, setting up all the things that I need for the deployment. Uh And then we're gonna wait for the cluster to complete. So you can see uh the cluster is done. Uh It took about 14 minutes uh to create everything and now we're going to deploy our community resources. So I run, pulling me up again and uh it's gonna, you know, deploy the game space and then deployment and we're actually going to run into an issue here uh As you'll see because uh I didn't specify a selector. And so pretty clear from the error message, what I have to go do, I'm gonna go back and edit my metadata to add uh the appropriate labels and selectors. So here we go, adding the labels uh into the various places that uh you know, to clarify how you look, you can see it and we factor the code very easily uh to, you know, use a variable there. And then I'll, I'll just make sure that I have the selector specified. So now when I run pulling me up again, uh I can actually hit uh yes. And now this time my deployment will succeed. So that's all well and good. Uh How do I actually uh see what's going on on the, on the, on the cluster? I can just use Q cuddle uh you can see, I actually took that Q config uh exported it into this file and run Q cuddle. And then now I'm trying to get deployments, but obviously there's nothing in the default name space. So let's actually go and export the name space. We did that. Now we can actually use that variable. Uh And here we go, there's our deployment. So yeah, really, just in a few simple lines of code, it was super easy to get an EKS cluster up and running and then deploy our capability resources to it. I hope you enjoyed this episode of modern infrastructure Wednesday and we'll see you next week.

---
