---
title: "Pulumi Is Imperative, Declarative and Imperative"

# The date represents the post's publish date, and by default corresponds with
# the date this file was generated. Posts with future dates are visible in development,
# but excluded from production builds. Use the time and timezone-offset portions of
# of this value to schedule posts for publishing later.
date: 2022-09-30T12:28:19+02:00

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or social-media
# previews. This field is required or the build will fail the linter test.
# Max length is 160 characters.
meta_desc: Pulumi is often debated to be imperative or declarative.
  What if I tell you that Pulumi is imperative, declarative and imperative?

# The meta_image appears in social-media previews and on the blog home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for you.
meta_image: meta.png

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - ringo-de-smet

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - cloud-engineering
    - infrastructure-as-code

# See the blogging docs at https://github.com/pulumi/pulumi-hugo/blob/master/BLOGGING.md.
# for additional details, and please remove these comments before submitting for review.
---

<!--
Summary:
- show single binary setup of Terraform: HCL processing & Engine
- show double binary setup of Pulumi: Language Host & Engine
- indicate that the chosen language (imperative or not) doesn't have any implications of the engine remaining declarative
- we chose a gRPC protocol, rather than an in-process call to request creation of resources to the engine
- the provisioning magic happens in the engine & the providers
- now comes the nifty part
- with this separation, Pulumi brings cloud engineering closer to developers
- we allow for components (Pulumi Packages) to be written in any language given a component is a resource by itself.
- we allow for policies to be written with the same ease as abstractions.
- we mix it all in a single setup

Sketch the setup of the article as the description of the PR for reviewers
-->

On a weekly basis, articles and tweets pass by discussing whether or not some specific tool is imperative or declarative.
It's no surprise that Pulumi is often the tool being debated. What if I tell you that Pulumi is imperative, declarative and imperative?

<!--more-->

When we look at our [Frequently Asked Questions](/docs/support/faq/#is-pulumi-imperative-or-declarative), we read the following on the declarative versus imperative topic:

> Pulumi is a declarative tool that uses imperative languages to define your end state. The language is used for authoring your program.
> It’s not used for talking to the cloud provider API.

The title of the article mentions `imperative` and `declarative` both. Pulumi leverages the best of both worlds
into our product.

{{< tweet id="1553431913691430912" user="adamhjk" >}}

Pulumi tries to offer a solution where our customers are only limited by their imagination rather than the tool at hand.
Let me use the Pulumi architecture to highlight why I mention *imperative* twice.

## Pulumi Architecture

If you don't know the Pulumi architecture, here is the diagram from our [How Pulumi Works](/docs/intro/concepts/how-pulumi-works/) page:

![Pulumi Architecture](/images/docs/reference/engine-block-diagram.png)

### Language Host

TL;DR Imperative, no doubt!

### CLI and Engine

TL;DR Imperative, non-negotiable!

### Providers

TL;DR Imperative, no doubt!

<!--
And then everything _after_ that comment will appear on the post page itself.

Either way, avoid using images or code samples [in the first 70 words](https://gohugo.io/content-management/summaries/#automatic-summary-splitting) of your post, as these may not render properly in summary contexts (e.g., on the blog home page or in social-media previews).

## Writing the Post

For help assembling the content of your post, see [BLOGGING.md](https://github.com/pulumi/pulumi-hugo/blob/master/BLOGGING.md). For general formatting guidelines, see the [Style Guide](https://https://github.com/pulumi/pulumi-hugo/blob/master/STYLE-GUIDE.md).

## Code Samples

```typescript
let bucket = new aws.s3.Bucket("stuff");
...
```

## Images

![Placeholder Image](meta.png)

## Videos

{{< youtube "kDB-YRKFfYE?rel=0" >}}

Note the `?rel=0` param, which tells YouTube to suggest only videos from same channel.

## Tweets

{{< tweet id="1202020186234048512" user="pulumipus" >}}

-->
