---
title: "Creating a Pulumi Project"
layout: topic
date: 2021-09-10T12:00:00-05:00
draft: true
description: Create your first Pulumi Project.
meta_desc: Create your first Pulumi Project.
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

Infrastructure in Pulumi is organized into _Projects_, the highest level
component in a Pulumi ecosystem. Each Project is a single program that, when
run, declares the desired infrastructure for Pulumi to manage. Projects are how
we manage _Stacks_, or isolated, independently configurable instances of your
Pulumi program.

## Create a Directory

Each Pulumi Project lives in its own directory. Create one now and change into
it:

```bash
mkdir my-first-app
cd my-first-app
```

> Pulumi will use the directory name as your project name by default. To create
> an independent project, simply name the directory differently.

## Initialize Your Project

A Pulumi Project is just a directory with some files in it. It's possible for
you to create a new one by hand. The `pulumi new` command, however, automates
the process:

```bash
pulumi new python -y
```

This prints output similar to the following with a bit more information and
status as it goes:

```
Created stack 'dev'

Creating virtual environment...

Finished creating virtual environment

Updating pip, setuptools, and wheel in virtual environment...
...
Your new project is ready to go! ✨

To perform an initial deployment, run 'pulumi up'
```

This command creates all the files we need, initializes a new stack named `dev`
(an instance of our project), and installs the needed package dependencies from
PyPi.

## Inspect Your New Project

Our project is comprised of multiple files:

* **`__main__.py`**: your program's main entrypoint file
* **`requirements.txt`**: your project's Python dependency information
* **`Pulumi.yaml`**: your project's metadata, containing its name and language
* **`venv`**: a [virtualenv](https://pypi.org/project/virtualenv/) for your project

Run `cat __main__.py` to see the contents of your project's empty program:

```python
"""A Python Pulumi program"""

import pulumi
```

Feel free to explore the other files, although we won't be editing any of them
by hand. Note that the Pulumi CLI creates a virtual environment, `venv`, for the
project.
