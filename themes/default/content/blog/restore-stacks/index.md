---
title: "Announcing Restore Stacks: Recover Deleted Stacks in the Pulumi Cloud"
allow_long_title: true
# The date represents the post's publish date,
# and by default corresponds with the date this file was generated.
# Posts with future dates are visible in development,
# but excluded from production builds.
# Use the time and timezone-offset portions of of this value
# to schedule posts for publishing later.
date: 2023-07-18T10:30:52-07:00

# Use the meta_desc property to provide a brief summary
# (one or two sentences) of the content of the post,
# which is useful for targeting search results or social-media previews.
# This field is required or the build will fail the linter test.
# Max length is 160 characters.
meta_desc: Pulumi Cloud launches new Restore Stacks feature for Enterprise and Business Critical editions.

# The meta_image appears in social-media previews and on the blog home page.
# A placeholder image representing the recommended format, dimensions and aspect ratio
# has been provided for you.
meta_image: meta.png

# At least one author is required.
# The values in this list correspond with the `id` properties
# of the team member files at /data/team/team.
# Create a file for yourself if you don't already have one.
authors:
    - meagan-cojocar
    - isabel-suchanek

# At least one tag is required.
# Lowercase, hyphen-delimited is recommended.
tags:
    - features

# See the blogging docs at https://github.com/pulumi/pulumi-hugo/blob/master/BLOGGING.md.
# for additional details,
# and please remove these comments before submitting for review.
---

Starting today, you can restore previously deleted stacks in the Pulumi Cloud console. We've had a number of requests from customers to recover stacks that have been deleted. The common use cases to need to recover a deleted stack are either because the stack was accidentally deleted or the stack was intentionally deleted but, later on, they want to restore and preserve the activity history on the stack and just remove its resources.

<!--more-->

Customers typically use `pulumi destory` to delete the resources in a stack but leave the stack itself. But in some cases customers might use `pulumi stack rm --force` which forces the deletion of the stack but leaves behind resources which are no longer managed by the stack. In the case of a force deleted stack, restoring it allows customers to be able to either maintain the stack or properly destroy its contents. Using the new Pulumi Cloud Restore Stacks feature, the last 10 deleted stacks in an organization can be restored by an organization admin.

Watch it in action!
![Walking through the Restore Stacks experience](restore_stacks.gif)

And tada: you how have a trash bin for your stacks.

Keep the feedback coming!
