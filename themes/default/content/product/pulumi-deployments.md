---
title: Pulumi Deployments
layout: pulumi-deployments

meta_desc: Pulumi Deployments is a new feature that automates the execution of Pulumi programs on your behalf.

overview:
    title: The fastest way to go from code to cloud
    description: |
        [Pulumi Deployments](/docs/pulumi-cloud/deployments/) is a new feature that automates the execution of your Pulumi programs in a secure, hosted environment. Deploy any stack with a click of a button, `git push`, or API call. Available in preview today.

quotes:
    items:
        - company: mighty
          name: Aaron Gibralter
          name_title: Head of Engineering at Mighty
          quote: |
            “Pulumi allows every engineer to build and update infrastructure instead of only our infrastructure team, which enables us to ship faster than if we were using a domain-specific language. With Pulumi Deployments, we could easily set up a standardized CI/CD infrastructure workflow for every engineer that immediately makes them productive. We’re eager to adopt Review Stacks because it will automate the work of managing our own ephemeral infrastructure and make our lives easier.”

        - company: alkira
          name: Santosh Dornal
          name_title: Head of Software Test & DevOps at Alkira
          quote: |
            “I’m making developers at Alkira significantly more productive while also making my job easier using Pulumi’s IaC platform and features like Pulumi Insights and Deployments. I can get developers using IaC immediately with Pulumi Deployments and its GitHub integration, while Pulumi Insights makes it really easy to find idle developer environments that need to be shut down, which reduces our cloud costs.”

benefits:
    title: How will Pulumi Deployments benefit me?
    description: |
        Pulumi Deployments accelerates your rate of infrastructure deployments by executing `pulumi up` commands remotely whenever you click a button, push to a GitHub branch, or call the Deployments REST API. Instead of using the CLI, you can use a managed service to run your Pulumi programs which enables you to automate cloud deployments at scale. Pulumi Deployments is based on the same technology as [Pulumi Automation API](/docs/using-pulumi/automation-api/), which lets organizations manage more than ten times the cloud infrastructure resources per engineer when compared to other infrastructure as code tools.

preview:
  youtube_url: https://www.youtube.com/embed/v48U7CNWutc

options:
    title: How can I use Pulumi Deployments today?
    description: Pulumi Deployments supports three main scenarios during the preview. More scenarios are planned in our roadmap and we are accepting feedback from customers to shape the future of this feature.
    items:
        - icon: git-merged
          icon_color: purple
          title: Git Push to Deploy
          description: Deploy infrastructure with each push to a GitHub branch, using pull request workflows to trigger deployments.
        - icon: upload-to-cloud
          icon_color: salmon
          title: Deploy with Pulumi
          description: Deploy infrastructure with a click of a button from the Pulumi Service console. Supports update, preview, refresh, and destroy commands.
        - icon: code-window
          icon_color: blue
          title: REST API
          description: Deploy infrastructure by calling the Pulumi Service REST API. You can also use the REST API from Automation API code.

form:
    hubspot_form_id: 35baf46c-fd6e-4321-a75f-fc9319e31efb

learn:
    title: Learn More
    items:
        - title: Announcement Blog
          description: To learn more about the Pulumi Deployments Preview and see examples of it in action, read the launch announcement blog.
          buttons:
            - link: /blog/pulumi-deployments
              action: Announcement
        - title: Documentation
          description: Refer to our documentation to get Pulumi Deployments set up once you have been accepted into the Preview.
          buttons:
            - link: /docs/pulumi-cloud/deployments
              action: Pulumi Deployments Docs
            - link: /docs/reference/deployments-rest-api
              action: Pulumi Deployments REST API Docs
---
