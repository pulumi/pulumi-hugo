---
title: "Pulumi Release Notes: "

# The date represents the post's publish date, and by default corresponds with
# the date this file was generated. Posts with future dates are visible in development,
# but excluded from production builds. Use the time and timezone-offset portions of
# of this value to schedule posts for publishing later.
date: 2022-06-08T19:28:39-07:00

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or social-media
# previews. This field is required or the build will fail the linter test.
meta_desc: The latest Pulumi updates also include our providers updates, install Pulumi using winget, stack unselect command, GitHub release private plugins, and more.

# The meta_image appears in social-media previews and on the blog home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for you.
meta_image: meta.png

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - meagan-cojocar

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - features

# See the blogging docs at https://github.com/pulumi/pulumi-hugo/blob/master/BLOGGING.md.
# for additional details, and please remove these comments before submitting for review.
---

Our first release notes since the frenzy of [releases for PulumiUP](/blog/pulumi-universal-iac)! Learn what we have been building the past month, including..

 <!--more-->
- Cloud Providers and Packages
  <!-- - [Pulumi AWS Provider v5.0.0](#pulumi-aws-provider-v500)
  - [Lambda Function URLs](#lambda-function-urls)
  - [New resources in our providers](#new-resources-in-our-providers) -->
- Pulumi CLI and core technologies
  - [Add --stack to `pulumi about`](#add---stack-to-pulumi-about)
  - [Add logout message](#add-logout-message)
  - [Warn about missing AdditionalSecretOutputs](#warn-about-missing-additionalsecretoutputs)
  - [Pulumi stack unselect](#pulumi-stack-unselect)
  - [GitHub releases private plugins](#github-releases-private-plugins)
  - [Speed up `pulumi stack --show-name`](#speed-up-pulumi-stack---show-name)
- Pulumi Service & Pulumi.com
  - [Docs search improvements](#docs-search-improvements)
<!--more-->

## Cloud Providers and Packages

## Pulumi CLI and core technologies



### Add --stack to `pulumi about`

You can now use `pulumi about --stack` to get information on your stacks. It defaults to the current stack but you can also specify the stack you want information on. See it in action below:


Learn more in the [add --stack to pulumi about GitHub pull request](https://github.com/pulumi/pulumi/pull/9518).

### Add logout message

Based on a great community suggestion, we have added a confirmation message to `pulumi logout` to make the state after the command exits more clear.


Previous behavior: 

```
me@MacBook-Pro ~/r/m/myfolder> pulumi logout
me@MacBook-Pro ~/r/m/myfolder>
```

Current behavior:

```
me@MacBook-Pro ~/r/m/myfolder> pulumi logout
Logged out of https://app.pulumi.com/meagan
me@MacBook-Pro ~/r/m/myfolder>
```

Learn more in the [added confirmation string to pulumi logout GitHub issue](https://github.com/pulumi/pulumi/pull/9641).

### Warn about missing AdditionalSecretOutputs

Currently if a user specifies a key in additional secret outputs that does not match any of the resources property keys, we ignore it. This can cause some confusion, especially given the mismatches between snakeCase and camel_case property keys.

We now warm about missing A the engine to emit a warning diagnostic if a given additional secret key doesn't match any of the resources property keys.
Learn more in the [clear pending operations GitHub issue](https://github.com/pulumi/pulumi/issues/4265). 

### List current users organizations

Users can now see a list of their organizations using `pulumi whoami` and `pulumi about` to better inform and improve their CLI experience. Using the command `pulumi whoami –verbose` will now return the list of organizations the user is a member of. 

Learn more in the [list current orgs GitHub issue](https://github.com/pulumi/pulumi/issues/9181). 

### Install Pulumi using Winget

You can now install Pulumi using the [Winget](https://github.com/microsoft/winget-cli/) package manager. Windows users on Windows 11 and later can now use `winget install pulumi` to install Pulumi and `winget upgrade pulumi` to get the latest version.

Learn more in the [install Winget GitHub issue](https://github.com/pulumi/pulumi/issues/4676) and in the [Pulumi installation instructions](https://www.pulumi.com/docs/get-started/install/).

### Pulumi stack unselect

We have introduced the `pulumi stack unselect` command to remove a stack from the current workspace.  Users select stacks with `pulumi stack select [<stack>] [flags]` and can now easily deselect them if they need to. 

Learn more in the [stack unselect GitHub issue](https://github.com/pulumi/pulumi/issues/9070). 

### GitHub Releases private plugins

We now support downloading a plugin from private Pulumi GitHub releases. We only look at the GITHUB_TOKEN environment variable now and GITHUB_ACTOR and GITHUB_PERSONAL_ACCESS_TOKEN are no longer used. The token is sent via the Authorization header instead of Authentication (see documentation). 

Learn more in the [GitHub Releases private plugins pull request](https://github.com/pulumi/pulumi/pull/9185). 

### Speed up `pulumi stack --show-name`

Now when running `pulumi stack --show-name` we will skip loading the snapshot and instead just provide the stack name and then exit. This results in less latency to see the stack name.

Learn more in the [speed up show stack name GitHub issue](https://github.com/pulumi/pulumi/issues/9182). 

## Pulumi Service & Pulumi.com

### Docs search improvements

We updated the search experience of our [Docs]({{< relref "/docs" >}}) to return more intuitive results as well as pinned the search bar on the top panel when users scroll through our Docs. 

![A screenshot of the Pulumi Docs  with updated search](search-screenshot.png)