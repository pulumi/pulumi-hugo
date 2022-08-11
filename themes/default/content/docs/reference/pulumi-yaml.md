---
title: Project File Reference
linktitle: Project File
meta_desc: Documentation of the settings that are valid for the Pulumi project file.
menu:
  reference:
    name: Project File
    weight: 5
---

The `Pulumi.yaml` project file specifies metadata about your project, such as the project name and language runtime for your project.

## Example project file

```
name: Example Pulumi project file
runtime: python
description: An example project
main: example-project/
stackConfigDir: config/
backend:
  url: https://pulumi.example.com
options:
  refresh: true
template:
  description: An example template
  config:
    aws:region:
      description: The AWS region to deploy into
      default: us-east-1
      secret: true
plugins:
  providers:
    name: aws
    path: ../.../bin
  languages:
    name: yaml
    path: ../../../pulumi-yaml/bin
    version: 1.2.3
```

## Attributes

| Name | Required | Description |
| - | - | - | - |
| `name` | required | The name of the project containing alphanumberic characters, hyphens, underscores, and period. |
| `runtime` | required | The installed language runtime of the project: `nodejs`, `python`, `go`, `dotnet`, `java` or `yaml` to use. |
| `description` | optional | The description of the project. |
| `main` | optional | Overide of the working directity default of the location of the Pulumi program. |
| `stackConfigDir` | optional | Config directory location relative to the location of `Pulumi.yaml` |
| `backend` | optional | The [backend]({{< relref "/docs/intro/concepts/state" >}}) of the project. |
| `options` | optional | Additional project options. |
| `template` | optional | Config to be used when creating new stacks in the project. |
| `plugins` | optional | Override the plugin selection. |

### `runtime` options

The runtime attribute has an additional optional `options` option where you can specify additional runtime configuration.

| Name | Use case | Description |
| - | - | - |
| `typescript` | Only applicable for the nodejs runtime | Boolean indicating whether to use `ts-node` or not. |
| `binary` | Applicable for the go, .net, and java runtimes | Path to pre-built executable. |
| `virtualenv` | Ony applicable fo rthe python runtime | Virtual environment path. |
| `compiler` | Only applicable to YAML projects | Executable and arguments that emit to standard out. |

#### About `binary`

- For Go, if not specified, go sources in $CWD will be invoked via `go run`.
- For .NET, f not specified, a .NET project in $CWD will be invoked via `dotnet run`.

#### About `virtualenv`

New Python projects created with `pulumi new` have this option set by default. If not specified, Pulumi will invoke the `python3` command it finds on $PATH (falling back to `python`) to run the Python program. If you'd like to use a virtual environment without the `virtualenv` option, you'll need to run any `pulumi` commands (such as `pulumi up`) from an activated virtual environment shell (or, if using a tool like [Pipenv](https://github.com/pypa/pipenv), prefix any `pulumi` commands with `pipenv run pulumi ...`).

### `options` options

| Name | Description | Default |
| - | - | - |
| `refresh` | Boolean indicating whether to refresh the state before performing a Pulumi operation | `true` |

### `template` options

| Name | Required | Description |
| - | - | - |
| `description` | optional | Description of the template. |
| `config` | required | Config to apply to each stack in the project. |

#### `config` options

| Name | Required | Description |
| - | - | - |
| `description` | optional | Description of the config. |
| `default` | optional | Default value of the config. |
| `secret` | optional | Boolean indicating if the configuration is labeled as a secret. |

### `plugins` options

- `plugins`: (optional) allows the overriding of plugin selection to make use of plugins not installed into the global plugin cache.
  - `providers`/`analyzers`/`languages`: (optional) each entry has a list of plugins underneath it.
    - `name`: (required) the name of the plugin.
    - `path`: (required) the path to the folder containing the plugin.
    - `version`: (optional) the version of the plugin, if not set this plugin will match for any version the engine requests.

### Deprecated attributes

| Name | Required | Description |
| - | - | - |
| `config` | optional | Config directory location relative to the location of `Pulumi.yaml` |
