---
title: "Announcing the Stack Init Teams Flag"
date: "2023-03-28"
meta_desc: "We've added a new CLI flag to the stack init subcommand allowing users to grant team access to newly created stacks."
meta_image: "meta.png"

authors:
    - "robbie-mckinstry"
        
tags:
    - "cli"
    - "stack-init"
    - "cli-flags"
---

We recently released a quality-of-life feature for the Pulumi CLI to save users time and energy when creating stacks. Users can now initialize team permissions when creating stacks on the command line.

<!--more-->

For context, here's some background for any Pulumi newcomers. Pulumi projects
consist of stacks—separate deployments of the same infrastructure. Stacks may
also be configured with separate inputs. Organization admins can leverage RBAC
to grant project and stack access by sorting members into roles called "teams."

Most often, stacks are created via the CLI with the `pulumi stack init` command.
[This command](https://www.pulumi.com/docs/reference/cli/pulumi_stack_init/#options)
initializes a new stack. If you're using the
[Pulumi Service](https://www.pulumi.com/docs/intro/concepts/state/#pulumi-service-backend)
as your backend, you can view your newly created stack in the Service UI. If your
organization uses teams, you'll want to give your teammates access to the stack
you created.

With the release of Pulumi v3.59.0, developers can assign team access during stack creation. To do this,
pass in the `--team` flag followed by the name of the team. For instance:
`pulumi stack init --team Red`. This saves time by eliminating context switching,
allowing users to stay on task. Previously, the only way to assign team access to
a stack was through the Service UI. This meant a necessary trip to a browser
before your teammates could peek at your work. This enhancement streamlines the
DX of stack creation, helping you spin up new infrastructure.

Use the flag multiple times to assign access to multiple teams, as in
`pulumi stack init --team Red --team Blue`. Currently, the feature always grants
`read` and `write` access, the most commonly assigned permissions.

We implemented this feature at the request of our daily users.
Context switching can be expensive when you're creating enough stacks.
At Pulumi, we enable our users to squeak out as much productivity from our tooling
as possible. We're always happy to make ergonomic improvements. To those of you
who want to save every keystroke, check out our Automation API for programmatic
access to Pulumi with support for many popular programming languages. We look
forward to continuing to raise the bar for cloud productivity.
