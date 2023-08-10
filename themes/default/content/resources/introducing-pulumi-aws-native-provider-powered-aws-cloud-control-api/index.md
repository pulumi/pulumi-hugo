---
preview_image:
hero:
  image: /icons/containers.svg
  title: "Introducing the Pulumi AWS Native Provider Powered by AWS Cloud Control API"
title: "Introducing the Pulumi AWS Native Provider Powered by..."
meta_desc: |
    Pulumi’s AWS Native provider offers a robust, reliable and well-defined resource model for AWS that allows infrastructure teams and developers to b...
url_slug: introducing-pulumi-aws-native-provider-powered-aws-cloud-control-api
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
  title: "Introducing the Pulumi AWS Native Provider Powered by AWS Cloud Control API"
  description: |
    Pulumi’s AWS Native provider offers a robust, reliable and well-defined resource model for AWS that allows infrastructure teams and developers to build, deploy, and manage AWS infrastructure with languages like TypeScript, Python, Go and C#.    The AWS Native provider builds on the work done by service teams at AWS to define the resource model for their services.  This ensures a rock solid provisioning lifecycle for resources deployed with the AWS Native provider and same-day support for all new features in the AWS Cloud Control API  Pulumi Blog: https://www.pulumi.com/blog/announcing-aws-native/ AWS Blog: https://aws.amazon.com/blogs/aws/announcing-aws-cloud-control-api AWS Native Provider on GitHub: https://github.com/pulumi/pulumi-aws-native
  sortable_date: 2021-09-30T19:17:13Z
  youtube_url: https://www.youtube.com/embed/oKxaZCyu2OQ
transcript: |
    Hi there, Laura from Pulumi here. And today we're gonna go check out the new native provider for AWS that you can use with Pulumi native providers work directly with the cloud providers resource model. In this case, we're working with AWS cloud control API which directly accesses AWS S resource model. That means you get direct access to the resource model as well built only by AWS. So you can rely on everything that they have and you're not really relying on any kind of a bridge. But what does that really mean for you as the user? Well, you get same day updates. So if you see something really cool at reinvent, as long as it's out on Aws, it's out for Pulumi. In addition, you get a solid and reliable provisioning experience just like you're using the console. Finally, of course, you can use any programming language that works with Pulumi, just like you've come to know and love enough about the high level stuff though. Let's go code. All right. And now we have the code first things first. Let's take a quick look at what the classic provider was for anybody who's not familiar with the Aws classic provider. So this is a simple Lambda function that is going to have our state machine running and it's pretty basic. We just have this little file archive that's running this hello dot pi, nothing too exciting when it comes to a Lambda, but it should give you a rough idea. The I AM that's being imported here is just the I Am. So you see this one here on line six I am dot Lambda underscore roll dot A RN that is calling to a actual separate uh file that we've written up that abstracts away all of the I AM role creation and role binding, all the role policy information that isn't in the provider just yet because this is a beta release. So that's coming, but we didn't really wanna get everything a little too confused with that. So this is just what the classic provider looks like. Let's see what the native provider looks like. Basically the same, the native provider is really just a couple of little things that we've abstracted out one or two like this definition string instead of definition for the same exact code. If you wanted to actually have definition, you just change the code up a little bit. But I wanted to show just how similar all of this is. It's not that much different, but you're going to get all of those benefits of using the native provider by being able to do this. So let's go ahead and we are gonna deploy this. So just a simple, quick to plu me up and through the magic of movie, we're going to zoom ahead until we're all ready to go and there we have it. So this is all deployed. Let's just double check. I have a little command here just running aws the step functions feature from the CLI just to see we use a quick stack output to the state machine. Saying here give me the information and there it is, it ran so perfect. It's up and running now. We'll just do a quick little Pulumi destroy here just to take down that stack real quick. But while that's running, just something to know is we also have the new CF two Pulumi tool. The CF two Pulumi tool is taking any cloud formation setup and converting it to Pulumi. The tool is coming out as part of this preview. So please do go check it out. It allows us to any migrate any config really. And if it's deprecated right now, if it's not exactly ready just yet with the cloud control API There is a little note saying that we're not ready just yet for you. Thanks for joining me today to check out the new AWS native cloud provider with Pulumi. I hope that gave you a sense of what's possible and what's next with cloud engineering with Pulumi. Give it a try and let us know what you think see you soon. Bye.

---
