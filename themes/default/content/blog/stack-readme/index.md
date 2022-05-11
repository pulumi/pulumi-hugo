---
title: "Stack READMEs in the Pulumi Service"

# The date represents the post's publish date, and by default corresponds with
# the date this file was generated. Posts with future dates are visible in development,
# but excluded from production builds. Use the time and timezone-offset portions of
# of this value to schedule posts for publishing later.
date: 2022-05-11T14:35:01-07:00

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or social-media
# previews. This field is required or the build will fail the linter test.
meta_desc: Starting today you can add a README to your Pulumi Service Stacks to store key links, CLI commands and documentation.

# The meta_image appears in social-media previews and on the blog home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for you.
meta_image: meta.png

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - evan-boyle
    - devon-grove
    - myles-haynes
    - casey-huang

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - features

# See the blogging docs at https://github.com/pulumi/pulumi-hugo/blob/master/BLOGGING.md.
# for additional details, and please remove these comments before submitting for review.
---

Starting today, users can create Stack READMEs in the [Pulumi Service](https://app.pulumi.com). Stacks now have a customizable README where users can add links to dashboards, metrics, architecture diagrams, notes, links to runbooks, and so on!

<!--more-->

Whatever your team uses frequently for that Stack that you want to collect all in one spot. There are a lot of operational activities that happen around [Pulumi Stacks](https://www.pulumi.com/docs/intro/concepts/stack), however, the information for these activities aren't surfaced in one centralized place. Our [User Experience team](https://www.pulumi.com/blog/get-to-know-pulumis-ux-team) recently conducted user experience interviews with our customers and we learned users are moving across many web apps and local apps to manage their deployments. From their cloud Console, to the Pulumi Service User Interface (UI), to the CLI, and so on. By collecting resource outputs in the Pulumi Service UI, we are aiming to ease this friction and collect relevant Stack information in one place.

README templates can reference Stack outputs and resource properties, such as `("${vpc.arn}")` `${outputs.foo}` `${vpc.subnets[0].CIDR}`. To walk you through a tangible example, a user can deploy an RDS instance and then use a variable in their README template to link to their CloudWatch dashboard to keep an eye on operational metrics.

The new experience lives in the Stack page, which can be navigated to through Projects and clicking on the specific Stack you want to view the README for. Let's take a look at this new feature!
![Stack READMEs in the Pulumi Console](stack-readme.png)

To illustrate, let's look at the new Stack README for the Pulumi Service dev stack. 

```markdown
# Pulumi Service README
​
[Sign in to AWS to view stack resources!](https://top-secret-url.com)
​
I am...
​
* [an on call engineer](#oncall)
* [monitoring a deployment](#cicd)
* [a new hire looking to onboard](#onboard)
* [interested in querying for business insights](#insights)
​
-----
​
<a name="oncall"></a> 
## On Call Operations
​
### Monitor
​
1. [Cloudwatch Metrics](https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#dashboards:name=$(DASHBOARD_NAME)): Monitor holistic metrics tracking overall service health
2. [RDS Performance Metrics](https://us-west-2.console.aws.amazon.com/rds/home?region=us-west-2#performance-insights): Monitor RDS performance (wait times, top queries)
3. [Cloudwatch Logs](https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2): Search across service logs
4. [Alarms](https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2) & [Runbooks](https://github.com/pulumi/runbooks)
```

We have links to our AWS authentication tool, our CloudWatch metrics, to our production deployment documentation, and so on. The common places that we navigate to and from when managing this Stack.

In order to add a README to your Pulumi Stack, you will need to add a resource output to the Stack called either README or readme, we accept both. Then add the markdown or text file with the title 'README.md' or 'README.txt'. Then when you navigate to the Pulumi Service you will see the rendered markdown documentation on the Stack README page.

We love hearing feedback from users about ways we can improve your productivity when using Pulumi. As always, please feel free to submit feature requests and bug reports to the [Pulumi Service GitHub Repo](https://github.com/pulumi/service-requests). We look forward to seeing how you make Stack READMEs fit your needs!
