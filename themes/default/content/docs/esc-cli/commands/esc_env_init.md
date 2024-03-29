---
title: "esc env init"
menu:
  esc_cli:
    parent: commands
---



Create an empty environment with the given name.

## Synopsis

Create an empty environment with the given name, ready for editing

This command creates an empty environment with the given name. It has no definition,
but afterwards it can be edited using the `edit` command.

To create an environment in an organization when logged in to the Pulumi Cloud,
prefix the stack name with the organization name and a slash (e.g. 'acmecorp/dev').


```
esc env init [<org-name>/]<environment-name> [flags]
```

## Options

```
  -h, --help   help for init
```

## Options inherited from parent commands

```
      --env string   The name of the environment to operate on.
```

## SEE ALSO

* [esc env](/docs/esc-cli/commands/esc_env/)	 - Manage environments

###### Auto generated by spf13/cobra on 9-Oct-2023
