---
title: "Creating a Pulumi Project"
layout: topic
date: 2021-09-10T12:00:00-05:00
draft: true
description: Create your first Pulumi project.
meta_desc: Create your first Pulumi project.
index: 0
estimated_time: 5
meta_image: meta.png
authors:
    - sophia-parafina
    - laura-santamaria
tags:
    - fundamentals
    - projects
    - docker
links:
    - text: Code Repo
      url: https://github.com/pulumi/tutorial-pulumi-fundamentals
block_external_search_index: true
---

Infrastructure in Pulumi is organized into _projects_.[^1] In the Pulumi
ecosystem, a project represents a Pulumi _program_[^2] that, when run, declares
the desired infrastructure for Pulumi to manage. The program has corresponding
_stacks_,[^3] or isolated, independently configurable instances of your Pulumi
program. We'll talk more about stacks later in the [Building with
Pulumi]({{< relref "/learn/building-with-pulumi" >}}) pathway.

## Create a directory

Each Pulumi project lives in its own directory. Create one now and change into
it by running these commands in your terminal:

```bash
mkdir my-first-app
cd my-first-app
```

Pulumi will use the directory name as your project name by default. To create an
independent project, name the directory differently.

## Initialize your project

Since a Pulumi project is just a directory with some files in it, it is possible
for you to create a new one by hand. The `pulumi new` command-line interface
(CLI) command, however, automates the process and ensures you have everything
you need, so let's use that command. You can use Typescript or Python for this 
tutorial (Go and C# are coming soon!), and the `-y` flag answers "yes" to the
prompts to create a default project:

{{< chooser language "typescript,python" / >}}

{{% choosable language typescript %}}

```bash
$ pulumi new typescript -y
```

{{% /choosable %}}

{{% choosable language python %}}

```bash
$ pulumi new python -y
```

{{% /choosable %}}

This command prints output similar to the following example with a bit more
information and status as it goes (this example is in Python, but the basics
are the same for any language):

```bash
Created stack 'dev'

Creating virtual environment...

Finished creating virtual environment

Updating pip, setuptools, and wheel in virtual environment...
...
Your new project is ready to go! ✨

To perform an initial deployment, run 'pulumi up'
```

This command creates all the files we need, initializes a new stack named `dev`
(an instance of our project), and installs any necessary dependencies.

## Inspect your new project

The basic project created by `pulumi new` is comprised of multiple files:

<ul>
<li><strong><code>{{% langfile %}}</code></strong>: your program's main entrypoint file</li>
{{% choosable language typescript %}}<li><strong><code>package.json</code></strong>: your project's NodeJS configuration file</li>
<li><strong><code>tsconfig.json</code></strong>: your project's TypeScript configuration file</li>{{% /choosable %}}
{{% choosable language python %}}<li><strong><code>requirements.txt</code></strong>: your project's Python dependency information</li>{{% /choosable %}}
<li><strong><code>Pulumi.yaml</code></strong>: your project's metadata, containing its name and language</li>
<li><strong><code>venv</code></strong>: a <a href="https://pypi.org/project/virtualenv/">virtualenv</a> for your project</li>
</ul>

Use the command <code>cat</code>{{% langfile %}} to see the contents of your project's empty
program:

{{< chooser language "typescript, python" / >}}

{{% choosable language typescript %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
```

{{% /choosable %}}

{{% choosable language python %}}

```python
"""A Python Pulumi program"""

import pulumi
```

{{% /choosable %}}

Feel free to explore the other files, although we won't be editing any of them
by hand.
{{% choosable language typescript%}}{{% /choosable %}}
{{% choosable language python %}}Note that the Pulumi CLI creates a virtual
environment, <code>venv</code>, for the project.{{% /choosable %}}
Let's move on to creating your first real bit of infrastructure with Pulumi:
some Docker images.

[^1]: [project](https://www.pulumi.com/docs/reference/glossary/#project)
[^2]: [program](https://www.pulumi.com/docs/reference/glossary/#program)
[^3]: [stack](https://www.pulumi.com/docs/reference/glossary/#stack)