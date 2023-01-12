---
# Name of the webinar.
title: "Getting Started with Infrastructure as Code on AWS"
meta_desc: "In this workshop, you will learn the fundamentals of Infrastructure as Code through a series of guided exercises using the Pulumi Cloud Engineering platform."

# A featured webinar will display first in the list.
featured: false

# If the video is pre-recorded or live.
pre_recorded: false

# If the video is part of the PulumiTV series. Setting this value to true will list the video in the "PulumiTV" section.
pulumi_tv: false

# The preview image will be shown on the list page.
preview_image: ""

# Webinars with unlisted as true will not be shown on the webinar list
unlisted: false

# Gated webinars will have a registration form and the user will need
# to fill out the form before viewing.
gated: true

# The layout of the landing page.
type: webinars

# External webinars will link to an external page instead of a webinar
# landing/registration page. If the webinar is external you will need
# set the 'block_external_search_index' flag to true so Google does not index
# the webinar page created.
external: false
block_external_search_index: false

# data for Google Events
event_data:
  name: Pulumi - Getting Started with Infrastructure as Code on AWS
  start_date: 2023-02-02T09:00:00.000-08:00
  end_date: 2023-02-02T10:00:00.000-08:00
  url: "https://www.pulumi.com/resources/getting-started-with-iac-aws/"
  description: In this workshop, you will learn the fundamentals of Infrastructure as Code through a series of guided exercises using Pulumi’s Cloud Engineering platform. You will be introduced to Pulumi, an infrastructure as code platform, where you can use familiar programming languages to provision modern cloud infrastructure. This workshop is designed to help users completely new to Pulumi to become familiar with the core concepts to be effective with the Pulumi Infrastructure as Code platform. We will guide you through the Pulumi platform with diagrams and a series of hands on exercises to help you understand the building blocks available in Pulumi.

# The url slug for the webinar landing page. If this is an external
# webinar, use the external URL as the value here.
url_slug: "getting-started-with-iac-aws"

# The content of the hero section.
hero:
    # The title text in the hero. This also serves as the pages H1.
    title: "Getting Started with Infrastructure as Code on AWS"
    # The image the appears on the right hand side of the hero.
    image: "/icons/containers.svg"

# Webinar pages support multiple session via the 'multiple' property.
# multiple:

# Content for the left hand side section of the page.
main:
    # Webinar title.
    title: "Getting Started with Infrastructure as Code on AWS"
    # URL for embedding a URL for ungated webinars.
    youtube_url: #"https://www.youtube.com/embed/Ap0aLb-RQSc"
    # Sortable date. The datetime Hugo will use to sort the webinars in date order.
    sortable_date: 2023-02-02T09:00:00.000-08:00
    # Duration of the webinar.
    duration: "60 minutes"
    # Datetime of the webinar.
    datetime: "2/2/2023 09:00am - 10:00am PT"
    # Description of the webinar.
    description: "In this workshop, you will learn the fundamentals of Infrastructure as Code through a series of guided exercises using Pulumi’s Cloud Engineering platform. You will be introduced to Pulumi, an infrastructure as code platform, where you can use familiar programming languages to provision modern cloud infrastructure. This workshop is designed to help users completely new to Pulumi to become familiar with the core concepts to be effective with the Pulumi Infrastructure as Code platform. We will guide you through the Pulumi platform with diagrams and a series of hands on exercises to help you understand the building blocks available in Pulumi."

    # The webinar presenters
    presenters:
        - name: "Josh Kodroff"
          role: "Sr. Solutions Architect, Pulumi"
        - name: "Marina Novikova"
          role: "Partner Solution Architect at Amazon Web Services (AWS)"

    # A bullet point list containing what the user will learn during the webinar.
    learn:
        - "The basics of the Pulumi Programming Model"
        - "How to provision, update, and destroy AWS resources"

# The right hand side form section.
form:
    # HubSpot form id.
    hubspot_form_id: "b5206c33-26dc-41dc-9c2f-09e9af949afd"
    salesforce_campaign_id: "701Du0000009l8TIAQ"

aws_only: true
---
