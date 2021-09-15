---
title: "Webhooks"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-09-15T12:20:24-05:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: true

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Learn how webhooks can be used to automate and extend Pulumi.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Learn how webhooks can be used to automate and extend Pulumi.

# The order in which the topic appears in the module.
index: 3

# The estimated time, in minutes, for new users to complete the topic.
estimated_time: 10

# The meta_image appears in social-media previews and on the Learn Pulumi home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for reference.
meta_image: meta.png

# The optional meta_video also appears in social-media previews (taking precedence
# over the image) and on the module's index page. A placeholder video representing
# the recommended format, dimensions and aspect ratio has been provided for reference.
# meta_video:
#     url: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/video/2020-09-03-16-46-41.mp4'
#     thumb: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/thumbs/2020-09-03-16-46-41.jpg'
#     preview: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/previews/2020-09-03-16-46-41.jpg'
#     poster: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/posters/2020-09-03-16-46-41.jpg'

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - kat-cosgrove

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - learn
    - webhooks

# When provided, links are rendered at the bottom of the topic page.
links:
    - text: Some Website
      url: http://something.com

# Exclude from search-engine indexing for now.
block_external_search_index: true
---

Pulumi Webhooks are available in the [Team](https://www.pulumi.com/pricing/) and [Enterprise](https://www.pulumi.com/pricing/) plans, and they allow you to notify external services of events happening within your Pulumi organization or stack. For example, you can trigger a notification whenever a stack is updated. Whenever an event occurs, Pulumi will send an HTTP POST request to all registered webhooks. The webhook can then be used to emit some notification, start running integration tests, or even update additional stacks.

Webhooks can be used for pretty much anything you want, and are the foundation of most ChatOps workflows.

## Management

Webhooks can be attached to either a stack or an organization. Stack webhooks will be notified whenever a stack is updated or changed. Organization webhooks will be notified for events happening within each of the organization’s stacks.

From your Stack or Organization page, click Settings, and then Webhooks.

SCREENSHOT HERE

## Create a Webhook

To create a webhook:

1. Navigate to the organization’s Settings.
2. Navigate to Integrations.
3. Select Create webhook.
4. Provide a Display Name, Payload URL, and optionally a Secret.

If a secret is provided, webhook deliveries will contain a signature in the HTTP request header that can be used to authenticate messages as coming from the Pulumi Console.

SCREENSHOT HERE
