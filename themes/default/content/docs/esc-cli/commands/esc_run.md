---
title: "esc run"
menu:
  esc_cli:
    parent: commands
---



Open the environment with the given name and run a command.

## Synopsis

Open the environment with the given name and run a command

This command opens the environment with the given name and runs the given command.
If the opened environment contains a top-level 'environmentVariables' object, each
key-value pair in the object is made available to the command as an environment
variable. Note that commands are not run in a subshell, so environment variable
references in the command are not expanded by default. You should invoke the command
inside a shell if you need environment variable expansion:

    run -- bash -c '"echo $MY_ENV_VAR"'

The command to run is assumed to be non-interactive by default and its output
streams are filtered to remove any secret values. Use the -i flag to run interactive
commands, which will disable filtering.

It is not strictly required that you pass `--`. The `--` indicates that any
arguments that follow it should be treated as positional arguments instead of flags.
It is only required if the arguments to the command you would like to run include
flags of the form `--flag` or `-f`.


```
esc run [<org-name>/]<environment-name> [flags] -- [command]
```



```
  -h, --help                help for run
  -i, --interactive         true to treat the command as interactive and disable output filters
  -l, --lifetime duration   the lifetime of the opened environment (default 2h0m0s)
```



* [esc](/docs/esc-cli/commands/esc/)	 - Pulumi ESC command line

###### Auto generated by spf13/cobra on 9-Oct-2023
