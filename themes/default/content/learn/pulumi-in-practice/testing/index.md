---
title: "Testing"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-09-30T08:18:13-05:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: false

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Here is a brief description of what this topic will cover.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Here is a brief description of what this topic will cover.

# The order in which the topic appears in the module.
index: 5

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
Pulumi programs are authored in a general-purpose language like TypeScript, Python, Go, or C#. The full power of each language is available, including access to tools and libraries for that runtime, including testing frameworks.

When running an update, your Pulumi program talks to the Pulumi CLI to orchestrate the deployment. The idea of unit tests is to cut this communication channel and replace the engine with mocks. The mocks respond to the commands from within the same OS process and return dummy data for each call that your Pulumi program makes.

Because mocks don’t execute any real work, unit tests run very fast. Also, they can be made deterministic because tests don’t depend on the behavior of any external system.

## Break up our code

For reasons I don't know, we can't import from the `__main__.py` file into our tests. So we'll have to break up our program into smaller files.

Create a new file called `docker.py` and copy the contents of `__main__.py` into it.

Replace the contents of `__main__.py` with the following:

```python

import pulumi

import my_docker
```


## Add Mocks
Let’s add the following code to mock the external calls to the Pulumi CLI.

Create a file for the test code, called `test_shop.py`. 
Add the following code to it!

```python 
import pulumi

class MyMocks(pulumi.runtime.Mocks):
    def new_resource(self, args: pulumi.runtime.MockResourceArgs):
        return [args.name + '_id', args.inputs]
    def call(self, args: pulumi.runtime.MockCallArgs):
        return {}

pulumi.runtime.set_mocks(MyMocks())
```

We need to set the configuration since it was made required:

```python
import unittest
import pulumi

# ... MyMocks as shown above
pulumi.runtime.set_mocks(MyMocks())

pulumi.runtime.set_all_config({
  "project:backend_port": "3000",
  "project:database": "cart",
  "project:frontend_port": "3001",
  "project:mongo_host": "mongodb://mongo:27017",
  "project:mongo_port": "27017",
  "project:node_environment": "development"
})

# It's important to import `my_docker` _after_ the mocks are defined.
import my_docker

class TestingWithMocks(unittest.TestCase):
    # TODO(check 1): Use the proper Mongo docker image.
```

## Write tests

Update `test_shop.py` to add the following tests:

```python
  # Test if the proper image name is used.
  @pulumi.runtime.test
  def test_docker_image(self):
      def check_image_name(args):
          image_name = args
          self.assertIn('mongo:bionic', image_name, 'must use bionic')

      return pulumi.Output.all(my_docker.mongo_image.name).apply(check_image_name)
```

So now your `test_shop.py` file looks like this:

```python

import unittest
import pulumi

class MyMocks(pulumi.runtime.Mocks):
    def new_resource(self, args: pulumi.runtime.MockResourceArgs):
        return [args.name + '_id', args.inputs]
    def call(self, args: pulumi.runtime.MockCallArgs):
        return {}

pulumi.runtime.set_mocks(MyMocks())

pulumi.runtime.set_all_config({
  "project:backend_port": "3000",
  "project:database": "cart",
  "project:frontend_port": "3001",
  "project:mongo_host": "mongodb://mongo:27017",
  "project:mongo_port": "27017",
  "project:node_environment": "development"
})

# It's important to import `my_docker` _after_ the mocks are defined.
import my_docker

class TestingWithMocks(unittest.TestCase):

  # Test if the proper image name is used.
  @pulumi.runtime.test
  def test_docker_image(self):
      def check_image_name(args):
          image_name = args
          self.assertIn('mongo:bionic', image_name, 'must use bionic')

      return pulumi.Output.all(my_docker.mongo_image.name).apply(check_image_name)
```

To run your tests, run the following command:

```bash
$ python -m unittest
```

You will see output like this:

```bash
----------------------------------------------------------------------
Ran 1 test in 2.239s

OK
```

TODO: make the test fail, etc, but this is just to get started.