---
title: "Pulumi Release Notes: Pulumi Import Improvements, RetainOnDelete as a resource option, and more!"
allow_long_title: true

# The date represents the post's publish date, and by default corresponds with
# the date this file was generated. Posts with future dates are visible in development,
# but excluded from production builds. Use the time and timezone-offset portions of
# of this value to schedule posts for publishing later.
date: 2022-03-15T08:47:42-08:00

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or social-media
# previews. This field is required or the build will fail the linter test.
meta_desc: The latest Pulumi updates also include the new `pulumi state rename` command, changing the default `pulumi plugin install` to the latest version, adding console output in non-interactive mode, and `pulumi cancel` support for self-managed state backends.

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

---

The team has been busy releasing new features and improvements in the last 3 weeks. Read on to learn about what's new in this release!

- Pulumi CLI and core technologies
  - [`pulumi import` Improvements](#pulumi-import-improvements)
  - [Add `RetainOnDelete` as a resource option](#add-retainondelete-as-a-resource-option)
  - [New `pulumi state rename` command](#new-pulumi-state-rename-command)
  - [Default `pulumi plugin install` to the latest version](#default-pulumi-plugin-install-to-the-latest-version)
  - [Add console output in non-interactive mode](#add-console-output-in-non-interactive-mode)
  - [Support `pulumi cancel` for filestate backends](#support-pulumi-cancel-for-filestate-backends)

<!--more-->


## Pulumi CLI and core technologies

### `pulumi import` Improvements

Last year, we introduced a new Pulumi import feature that allows you to import existing infrastructure into your Pulumi program. We’ve listened to feedback and delivered a plethora of updates and fixes to streamline the import experience; to make it more useful, more convenient, and more powerful. Not only can this feature bring a resource into your Pulumi state file, but it can also generate the source code for your Pulumi program too. 

You can now use the `pulumi import` command to import using all input fields instead of only the ones flagged as required, which will result in less check failures. If there are check failures, they are now treated as a warning not an error. In addition, we added an optional flag to `pulumi import` that allows users to skip the code generation step of import.

Learn more in the [Improved Import blog post](https://www.pulumi.com/blog/changes-to-import/), [import improvements GitHub issue](https://github.com/pulumi/pulumi/issues/9134) and the [disable codegen GitHub issue](https://github.com/pulumi/pulumi/issues/9134). 


### Add `RetainOnDelete` as a resource option

Pulumi is frequently used to manage the entire lifecycle of a resource, from creation, to updates, to replacement, to deletion. However, there are some cases where it is important to ensure that a resource’s life can extend beyond the lifetime of the Pulumi program that created it. To support these use cases, Pulumi now supports a new resource option `RetainOnDelete` which allows a resource to be retained in a cloud provider even after it is deleted from the Pulumi stack it is part of.

Learn more in the [RetainOnDelete blog post](https://www.pulumi.com/blog/retainondelete/) and in the [RetainOnDelete GitHub issue](https://github.com/pulumi/pulumi/issues/7747).


### `pulumi up --target` wildcard URN support

Users of the `--target` flag had requested the ability to use wildcards instead of manually specifying each targeted resource. As a result we now support wildcards for `pulumi up --target <urn>` and similar commands. Learn more in the [Wildcards support GitHub issue](https://github.com/pulumi/pulumi/issues/5870).

### Consider default org when running commands that accept stack names
Now that we have added the ability to take [advantage of a default org](https://github.com/pulumi/pulumi/pull/8352), we have added functionality to take into account where there are abilities to pass a stack name as part of a command, such as `pulumi up -s <stackname>` or as part of a `stack select` command. [Learn more in the GitHub issue](https://github.com/pulumi/pulumi/issues/8409).

## Pulumi Service & Pulumi.com

### Sign-up and sign-in experience revamp

We revamped our sign-in and sign-up process in the Pulumi Service. Our intentions were to make it easier to differentiate and toggle between the sign-in and sign-up experiences. As part of this work we also refreshed the design to align with our public website. Take a look! 

The new Pulumi Service sign-in page:

![A screenshot of the Pulumi Service sign-in page"](sign-in.png)

The new Pulumi Service create an account page:

![A screenshot of the Pulumi Service create an account page"](sign-up.png)

### Show resource URN on resource detail page

We added the resource URN on the resource details page within the Pulumi Service. This enables users to easily find the URN for commands like `pulumi up --replace` or `--target`. Users can easily copy the resource URN to their clipboard by clicking on the copy icon.

The new resource details page that includes resource URN:

![A screenshot of the Pulumi Service UI Resource page with resource URN](urn.png)