---
title: "Deprecating non-project mode from DIY backends"
date: 2024-02-23
meta_desc: Read about the plans for the removal of non-project mode.
meta_image: meta.png
authors:
    - fraser-waters
tags:
    - features
    - pulumi-releases
---

Last year we released [project support for self-managed backends](/blog/project-scoped-stacks-in-self-managed-backend/). We now plan to remove support for non-project mode.

This is to bring the DIY backend fully into alignment with the Cloud backend. This will bring a simplification to both the usage and implementation of Pulumi, lowering costs for both us and users. We've found that project mode is a significant improvement to the system experience for most users, and not worse for anyone.

<!--more-->

Users using a DIY backend (previously referred to as self-managed) may have seen a warning in recent releases of Pulumi:

```
warning: Legacy non-project mode support for DIY backends are due to be deprecated this year.
Please migrate to project mode by running 'pulumi state upgrade'.
You can disable this warning by setting PULUMI_DIY_BACKEND_ACKNOWLEDGE_LEGACY_WARNING to true.
```

To assuage any concerns about this warning, it is _specifically_ about running the DIY backend in non-project mode, where all the state files are kept in one top level folder. We are _not_ removing support for DIY backends in general.

As described in the warning we plan on deprecating and removing support for non-project mode this year.

## Phase 1 - Warning

The first phase of this deprecation has already been released. When opening a DIY state store, if the system sees it is still in non-project mode, the above warning is printed. You can set the environment variable `PULUMI_DIY_BACKEND_ACKNOWLEDGE_LEGACY_WARNING` to silence this warning.

## Phase 2 - Soft error

In 2-3 months we plan to make this a soft error. Opening a state store in non-project mode will result in an error like:

```
error: Legacy non-project mode support for DIY backends are due to be deprecated this year.
Please migrate to project mode by running 'pulumi state upgrade'.
You can disable this error by setting PULUMI_DIY_BACKEND_ACKNOWLEDGE_LEGACY_ERROR to true.
```

Note that this is an error. Without the new environment variable set this will cause CLI execution to stop. This will be on startup before any update has started. But this is only a soft error, users will be able to set the new environment variable `PULUMI_DIY_BACKEND_ACKNOWLEDGE_LEGACY_ERROR` to make the CLI skip this error.

## Phase 3 - Hard error

In 2-3 months after Phase 2, this will become a hard error.

```
error: Legacy non-project mode support for DIY backends are deprecated.
Please migrate to project mode by running 'pulumi state upgrade'.
```

There will be no way to skip this error. Users on this version of the CLI _must_ upgrade their state to continue using Pulumi.

## Phase 4 - Removal of feature

In 2-3 months after Phase 3, all support for non-project mode will be removed. This will include the capability in the CLI to do a state upgrade from non-project mode.

```
error: Legacy non-project mode support for DIY backends are unsupported.
```

If users encounter this error they'll have to download an older version of the CLI to do the state upgrade. We're hoping that no one gets to this point given the numerous warnings before hand.

## Take action today

Support for project mode has been in Pulumi since v3.61.0. Users should have no issue running `pulumi state upgrade` today. If you do have issues moving to project mode or running `state upgrade` get in touch either via [GitHub issues](https://github.com/pulumi/pulumi/issues) or on the [Pulumi Community Slack](https://slack.pulumi.com/)!
