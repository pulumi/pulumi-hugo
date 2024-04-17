---
title: "Continue on Error"

# The date represents the post's publish date, and by default corresponds with
# the date and time this file was generated. Dates are used for display and
# ordering purposes only; they have no effect on whether or when a post is
# published. To influence the ordering of posts published on the same date, use
# the time portion of the date value; posts are sorted in descending order by
# date/time.
date: 2024-04-16T15:05:00+02:00

# The draft setting determines whether a post is published. Set it to true if
# you want to be able to merge the post without publishing it.
draft: false

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or
# social-media previews. This field is required or the build will fail the
# linter test. Max length is 160 characters.
meta_desc: Introducing continue on error functionality for pulumi up and destroy.

# The meta_image appears in social-media previews and on the blog home page. A
# placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for you.
meta_image: meta.png

# At least one author is required. The values in this list correspond with the
# `id` properties of the team member files at /data/team/team. Create a file for
# yourself if you don't already have one.
authors:
    - thomas-gummerer

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - error-handling
    - announcement

# See the blogging docs at https://github.com/pulumi/pulumi-hugo/blob/master/BLOGGING.md
# for details, and please remove these comments before submitting for review.
---

This might sound like a familiar issue: you try to set up or destroy some cloud infrastructure and a resource has errors.  Pulumi now also errors out and leaves the resources it hasn't destroyed or updated yet untouched.  Often that's what you want. There might be no point in bringing up more infrastructure if a resource fails.  Or to destroy the rest of the stack if we can't destroy everything.

In other cases though, it can be very useful to keep going trying to bring resources that are independent from the failed one into the requested state, be that resources being created or destroyed.  To allow you to do exactly this we're introducing a new `--continue-on-error` flag for both `pulumi up` and `pulumi destroy`.

<!--more-->

Using this flag means that resources that are not in the same dependency tree as the failed resource will still continue to be updated or destroyed, as they would normally do.  Without it Pulumi would stop and refuse to change any more resources after it encountered errors.  To make sure dependencies are still correctly respected, resources that depend on a successful update or destroy of the failed resource will not continue to be updated.  This means that this flag is always safe to use, as Pulumi will continue to manage the failed resources, and they can be updated or destroyed in subsequent runs of Pulumi.

When the execution finishes, Pulumi will report the resource failures as you would currently expect from a failure, and exit with a non-zero exit code.  This indicates that even though we continued to update resources independent from the failed one, there was an error during the deployment.

## What do I need to do?

`pulumi destroy --continue-on-error` was introduced in Pulumi v3.112.0.  After upgrading to this version you can go ahead and use this feature.

The situation for `pulumi up --continue-on-error` is slightly more complicated.  Since we now have resources that fail to create, but the pulumi program continues to execute, the SDK has to deal with the outputs of these resources.  Currently during `pulumi up` there are no "unknown" values expected by the SDK.  Since we may now have a failed resource, the outputs for that resource might still be unknown, and the SDK will have to deal with that.  This means that to fully support this feature some SDK changes were necessary.  So in addition to upgrading to Pulumi v3.114.0, you will also have to upgrade the Pulumi SDK to v3.114.0 for Go, Python and NodeJS, TODO for dotnet and TODO for yaml.

The flag still exists for older SDK versions, however the Pulumi engine will return an error to your program, which then will need to be handled, or the rest of the program might not be executed, and thus some resources may not be updated.
