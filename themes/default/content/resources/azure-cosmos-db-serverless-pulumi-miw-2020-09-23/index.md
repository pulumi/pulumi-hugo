---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Azure Cosmos DB Serverless with Pulumi | MIW 2020 09 23"
title: "Azure Cosmos DB Serverless with Pulumi | MIW 2020 09 23"
meta_desc: |
    In today's episode, we explore the next generation Microsoft Azure provider for Pulumi. We take it for a spin on Azure's Cosmos DB serverless previ...
url_slug: azure-cosmos-db-serverless-pulumi-miw-2020-09-23
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
  title: "Azure Cosmos DB Serverless with Pulumi | MIW 2020 09 23"
  description: |
    In today's episode, we explore the next generation Microsoft Azure provider for Pulumi. We take it for a spin on Azure's Cosmos DB serverless preview and show how easy it is to create a database and wire up the connection string information to a client.  Code for this episode available here:  https://github.com/pulumi/pulumitv/tree/master/modern-infrastructure-wednesday/2020-09-23  Today's example is in TypeScript, but Pulumi makes it easy to stand up infrastructure in your favorite languages including JavaScript, Python, C#, and Go - saving time over legacy tools like CloudFormation and Hashicorp Terraform.  https://www.pulumi.com/docs/get-started/?utm_campaign=PulumiTV&utm_source=youtube.com&utm_medium=video
  sortable_date: 2020-09-23T15:00:10Z
  youtube_url: https://www.youtube.com/embed/U13FC3_eOh4
transcript: |
    Hello and welcome to another episode of Modern Infrastructure Wednesday. I'm your host, Lee Zen. And today we're going to be covering the Azure Cosmos DB serve preview along with Pulumi New Azure next GEN provider. So what we're gonna do today, we're gonna be covering creation of a Cosmos DB account provisioning database container and then also setting up a client to interact with that container, so very basic stuff, but really just excited to show off the new uh next GEN provider that we've built, that really covers the full surface area of all those Azure resources that you want to use and really, you know, the ability to use any feature on day one once it's announced because we're compiling our provider uh based on the actual Azure uh rest API specs. So let's get started. I have a typescript program uh here. And so uh you can see uh we're importing from our new Azure next GEN provider here and then I'm also importing from the Azure Cosmos client. Uh I already have everything prebuilt because I don't want to spend any time on the provisioning steps. Uh And then, so you can see like this looks and behaves very similar to the previous Azure provider. You create a resource group, you created a document DB database account. Uh We give it, you know the parameters we want. Uh In particular of note here is that you can actually, again, because we're reflecting the full surface area of that resource model. Uh in the Azure rest API uh we can give this a uh capabilities uh property with the name enable serve. And this will enable the uh serverless preview for Cosmos DB. Everything else after that is fairly standard, we create a SQL database uh in that, in that Cosmos DB account. And then we create a container to interact with it uh as always. And then finally, uh you know, you could do a number of things with kind of these outputs now. So we, we've, you know, at the end of this, we'll have created that account uh the database and then the container and then you can then get back at the connection string. So you can see here you again, using the new uh provider, we can actually uh make a call to list database account connection strings, which is again part of that rest API surface area that we've modeled. Uh And so uh we can actually get back those connection strings. You could totally imagine taking that and passing that on to something else. Uh So, for example, uh passing those connection strings on to, for example, a function or something like that or, or storing them as a secret. So you can use it later on in your web app. Uh In, in our particular case here, I'm just doing something super simple. I'm using the Cosmos client uh that I've imported from above and then I'm just going to insert a single item uh here with just like, you know, some key and some value. And so if we, if we were to run this, if we run this program, um we've already gone ahead and, you know, all these, all these resources were already created. So there's really not too much to show there. Uh But what the, as you can see, there's no uh no changes. But if I, if I say yes, uh this particular apply uh will actually run and uh we should see uh an additional item uh in our data store. So if we kind of go here and uh this is the items, this is the, this is the uh serverless uh DB that I created. And if I refresh my items here, you can see that I have a third item now. Uh And that has that uh time stamp uh inserted in. So, yeah, they really just wanted to go through the basics of using the new native of the new uh uh next gen provider with the, with Pulumi and kind of how easy it is to use it. Uh And how easy it is to actually you know, wire things in and get your applications up and running on on the new preview for Azure Cosmos DB. I hope you enjoy today's episode of Modern Infrastructure Wednesday. Please make sure to subscribe to Pulumi TV for future updates and leave your comments below and like the video if you enjoyed today's episode and I hope to see you next week on Pulumi TV. Thanks very much.

---
