---
title: "Pulumi Release Notes: Pulumi YAML v0.5.1, Stack READMEs, and much more!"
allow_long_title: true

# The date represents the post's publish date, and by default corresponds with
# the date this file was generated. Posts with future dates are visible in development,
# but excluded from production builds. Use the time and timezone-offset portions of
# of this value to schedule posts for publishing later.
date: 2022-06-16T16:28:39-07:00

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or social-media
# previews. This field is required or the build will fail the linter test.
meta_desc: The latest Pulumi updates also include our providers updates, warn about missing AdditionalSecretsOutputs, compression of filestate backends, and more.

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

Our first release notes since the frenzy of [releases for PulumiUP](/blog/pulumi-universal-iac)! Learn what we have been building in the past month.

 <!--more-->
- Cloud Providers and Packages
  - [New resources in our providers](#new-resources-in-our-providers)
- Pulumi CLI and core technologies
  - [Pulumi YAML v0.5.1](#pulumi-yaml-v051)
  - [Add --stack to `pulumi about`](#add---stack-to-pulumi-about)
  - [Add logout message](#add-logout-message)
  - [Warn about missing AdditionalSecretOutputs](#warn-about-missing-additionalsecretoutputs)
  - [Compression of filestate backends](#compression-of-filestate-backends)
  - [Add `CompositeInvoke`](#add-compositeinvoke)
- Pulumi Service & Pulumi.com
  - [Stack READMEs](#stack-readmes)
  - [SAML/SCIM improvements](#samlscim-improvements)

## Cloud Providers and Packages

### New resources in our providers

We shipped new versions of the AWS Native provider and the Azure Native provider that added support for X new resources in the last month.

## Pulumi CLI and core technologies

### Pulumi YAML v0.5.1

We released v0.5.1 of Pulumi YAML which included bug fixes, new functions, diagnostics and validation. Some specific improvements we made were:

- Update pulumi/pulumi to v3.32.1

- Add errors when hanging invalid fields off of resources.
  [#203](https://github.com/pulumi/pulumi-yaml/pull/203)

- Add errors when hanging invalid fields off of resource options.
  [#211](https://github.com/pulumi/pulumi-yaml/pull/211)

- Add a type checker.
  [#228](https://github.com/pulumi/pulumi-yaml/pull/228)

- Add `Fn::FromBase64`
  [#218](https://github.com/pulumi/pulumi-yaml/pull/218)

- Add support for Fn::ReadFile, enabling Pulumi Service [Stack README]({{< relref "/blog/stack-readme" >}}) support.
  [#217](https://github.com/pulumi/pulumi-yaml/pull/217)

- Allow Fn::Join to take expressions as inputs, previously the second argument had to be a syntactical list.
  [#241](https://github.com/pulumi/pulumi-yaml/pull/241)

As always, please feel free to submit feature requests and bug reports to the [Pulumi YAML GitHub Repo](https://github.com/pulumi/pulumi-yaml). We love hearing feedback from users!

### Add --stack to `pulumi about`

You can now use `pulumi about --stack` to get information on your stacks. It defaults to the current stack but you can specify the stack you want information on, for example `pulumi about --stack eks/staging`.

Learn more in the [add --stack to pulumi about GitHub pull request](https://github.com/pulumi/pulumi/pull/9518).

### Add logout message

Based on [a great community suggestion](https://github.com/pulumi/pulumi/issues/9450), we have added a confirmation message to `pulumi logout` to add clarity to the state after the command exits.

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

We now emit a warning diagnostic if a given additional secret key doesn't match any of the resources property keys.
Previously, if a user specified a key in additional secret outputs that does not match any of the resources property keys, it would have been ignored. This can cause some confusion, especially given the mismatches between snakeCase and camel_case property keys.

Learn more in the [warm about missing AdditionalSecretsOutputs Github issue](https://github.com/pulumi/pulumi/issues/4265).

### Compression of remote state backends

User with self-managed state backends can now enable compression via `PULUMI_SELF_MANAGED_STATE_GZIP=true`. A huge shoutout to community contributor, [@awoimbee](https://github.com/awoimbee), for the initial pull request.

Learn more in the [add gzip flag to filestate backend GitHub pull request](https://github.com/pulumi/pulumi/pull/9610).

### Add `CompositeInvoke`

We have added a `CompositeInvoke` function to the Go SDK that makes it easier to work with invoke bundles.

Previous behavior:

```go
opts := []pulumi.InvokeOption{pulumi.Parent(parent), pulumi.Provider(provider)}
pkg.SomeInvoke(nil, append(opts, , pulumi.Version("1.2.3"))...)
```

Current behavior:

```go
opts := pulumi.CompositeInvoke(pulumi.Parent(parent), pulumi.Provider(provider))
pkg.SomeInvoke(nil, opts, pulumi.Version("1.2.3"))
```

Learn more in [Add CompositeInvoke Github pull request](https://github.com/pulumi/pulumi/pull/9752).

## Pulumi Service & Pulumi.com

### Stack READMEs

Users can create [Stack READMEs]({{< relref "/docs/intro/pulumi-service/projects-and-stacks#stack-readme" >}}) in the [Pulumi Service](https://app.pulumi.com) that dynamically update based on [Stack Outputs]({{< relref "/learn/building-with-pulumi/stack-outputs" >}}).

A Pulumi Service Stack README is dynamically populated with details from your stack outputs. It does this by interpolating output variables on the stack, such as `${outputs.instances[0].ARN}` so that each stack can construct links to dashboards, shell commands, and other pieces of documentation.

### SAML/SCIM improvements

We spent some time in the last month improving the SAML/SCIM experience for our customers. The key improvements made were around deprovisioning and provisioning users and how we handle username updates with special characters.
