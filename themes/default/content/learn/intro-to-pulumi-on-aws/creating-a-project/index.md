---
title: "Creating a Project"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-07-28T10:33:12-07:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: true

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Here is a brief description of what this topic will cover.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Here is a brief description of what this topic will cover.

# The order in which the topic appears in the module.
index: 0

# The estimated time, in minutes, for new users to complete the topic.
estimated_time: 10

# The meta_image appears in social-media previews and on the Learn Pulumi home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for reference.
meta_image: meta.png

# The optional meta_video also appears in social-media previews (taking precedence
# over the image) and on the module's index page. A placeholder video representing
# the recommended format, dimensions and aspect ratio has been provided for reference.
# meta_video:
#     url: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/video/2020-09-03-16-46-41.mp4'
#     thumb: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/thumbs/2020-09-03-16-46-41.jpg'
#     preview: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/previews/2020-09-03-16-46-41.jpg'
#     poster: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/posters/2020-09-03-16-46-41.jpg'

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - christian-nunciato

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - change-me

# When provided, links are rendered at the bottom of the topic page.
links:
    - text: Some Website
      url: http://something.com

# Exclude from search-engine indexing for now.
block_external_search_index: true
---

Infrastructure in Pulumi is organized into Projects. Each Project is a single program that, when run, declares the desired infrastructure for Pulumi to manage.

## Create a directory

Each Pulumi Project lives in its own directory. Create one now and change into it:

```bash
mkdir my-first-app
cd my-first-app
```

> Pulumi will use the directory name as your project name by default. To create an independent project, simply name the directory differently.

## Initialize your project

A Pulumi Project is just a directory with some files in it. It's possible for you to create a new one by hand. The `pulumi new` command, however, automates the process:

{{< chooser language "typescript,python,go,csharp" / >}}

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

{{% choosable language go %}}

```bash
$ pulumi new go -y
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
$ pulumi new csharp -y
```

{{% /choosable %}}

This prints output similar to the following with a bit more information and status as it goes:

```
Created stack 'dev'

Creating virtual environment...

Finished creating virtual environment

Updating pip, setuptools, and wheel in virtual environment...
...
Your new project is ready to go! ✨

To perform an initial deployment, run 'pulumi up'
```

This command creates all the files we need, initializes a new stack named `dev` (an instance of our project), and installs the needed package dependencies from PyPi.

## Inspect the new project

{{< chooser language "typescript,python,go,csharp" />}}

Our project is comprised of multiple files:

{{% choosable language typescript %}}

NEED TYPESCRIPT THINGS HERE

{{% /choosable %}}

{{% choosable language python %}}

* `__main__.py`: your program's main entrypoint file
* `requirements.txt`: your project's Python dependency information
* `Pulumi.yaml`: your project's metadata, containing its name and language
* `venv`: a [virtualenv](https://pypi.org/project/virtualenv/) for your project

Run `cat __main__.py` to see the contents of your project's empty program:

```python
"""A Python Pulumi program"""

import pulumi
```

Feel free to explore the other files, although we won't be editing any of them by hand. Note that the Pulumi CLI creates a virtual environment, `venv`, for the project.

{{% /choosable %}}

{{% choosable language go %}}

NEED GO THINGS HERE

{{% /choosable %}}

{{% choosable language csharp %}}

NEED C# THINGS HERE

{{% /choosable %}}
