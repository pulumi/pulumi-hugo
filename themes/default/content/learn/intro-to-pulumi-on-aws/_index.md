---
title: "Introduction to Pulumi on AWS"
layout: module

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-07-28T10:32:55-07:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the module for review.
draft: true

# The description summarizes the course. It appears on the Learn home and module index pages.
description: |
    This tutorial demonstrates how to use Pulumi to build, configure, and deploy a modern
    application using Docker. The application is a MERN (MongoDB, Express, React, Node)
    application and we will create a frontend, a backend, and mongodb container to deploy
    the Pulumipus Boba Tea Shop.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Here is a brief description of what this module's all about.

# The order in which the module appears on the home page.
index: 0

# The meta_image appears in social-media previews and on the Learn Pulumi home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for reference.
meta_image: meta.png

# The optional meta_video also appears in social-media previews (taking precedence
# over the image) and on the module's index page. A placeholder video representing
# the recommended format, dimensions and aspect ratio has been provided for reference.
meta_video:
    url: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/video/2020-09-03-16-46-41.mp4'
    thumb: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/thumbs/2020-09-03-16-46-41.jpg'
    preview: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/previews/2020-09-03-16-46-41.jpg'
    poster: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/posters/2020-09-03-16-46-41.jpg'

youll_learn:
    - Creating Pulumi projects
    - Building Docker images with Pulumi
    - Deploying containers with AWS Fargate
    - Working with stack outputs and references

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - change-me

# At least one provider is required.
providers:
    - aws

# Exclude from search-engine indexing for now.
block_external_search_index: true
---

The tutorial is divided into four sections that guide you through the process of creating infrastructure with Pulumi, configuring it, and using Pulumi to push your infrastructure to production. Docker is used in this tutorial to teach the basics of Pulumi without a cloud account.
