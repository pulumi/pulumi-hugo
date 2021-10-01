---
title: "Testing"
layout: topic
date: 2021-09-30T08:18:13-05:00
draft: false
description: Explore how to test your Pulumi programs.
meta_desc: Explore how to test your Pulumi programs.
index: 5
estimated_time: 10
meta_image: meta.png
authors:
    - matt-stratton
tags:
    - learn
links:
    - text: Some Website
      url: http://something.com
block_external_search_index: true
---

Pulumi programs are authored in a general-purpose language like TypeScript,
Python, Go, or C#. The full power of each language is available, including
access to tools and libraries for that runtime. As it happens, that includes
testing frameworks.

When running an update, your Pulumi program talks to the Pulumi CLI to
orchestrate the deployment. The idea of unit tests is to cut this communication
channel and replace the Pulumi CLI with mocks. The mocks respond to the commands
from within the same OS process and return dummy data for each call that your
Pulumi program makes.

Because mocks don’t execute any real work, unit tests run very fast. Also, they
can be made deterministic because tests don’t depend on the behavior of any
external system.

## Break up our code

In general, best practices for Python use the `__main__.py` file as an
entrypoint, and so we're going to break up our program into smaller files.

Create a new file called `my_docker.py` and copy the contents of {{% langfile %}}
into it.

Replace the contents of {{% langfile %}} with the following code:

{{< chooser language "python" / >}}

{{% choosable language python %}}

```python
import pulumi
import my_docker
```

{{% /choosable %}}

## Add Mocks

Let’s add the following code to mock the external calls to the Pulumi CLI.

Create a file for the test code, called `test_my_docker.py`. 
Add the following code to it!

{{< chooser language "python" / >}}

{{% choosable language python %}}

```python 
import pulumi

class MyMocks(pulumi.runtime.Mocks):
    def new_resource(self, args: pulumi.runtime.MockResourceArgs):
        return [args.name + '_id', args.inputs]
    def call(self, args: pulumi.runtime.MockCallArgs):
        return {}

pulumi.runtime.set_mocks(MyMocks())
```

{{% /choosable %}}

We need to set the configuration since it was made required:

{{< chooser language "python" / >}}

{{% choosable language python %}}

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

{{% /choosable %}}

## Write tests

Update `test_my_docker.py` to add the following tests:

{{< chooser language "python" / >}}

{{% choosable language python %}}

```python
  # Test if the proper image name is used.
  @pulumi.runtime.test
  def test_docker_image(self):
      def check_image_name(args):
          image_name = args
          self.assertIn('mongo:bionic', image_name, 'must use bionic')

      return pulumi.Output.all(my_docker.mongo_image.name).apply(check_image_name)
```

{{% /choosable %}}

So now your `test_my_docker.py` file looks like this:

{{< chooser language "python" / >}}

{{% choosable language python %}}

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

{{% /choosable %}}

To run your tests, run the following command:

{{< chooser language "python" / >}}

{{% choosable language python %}}

```bash
$ python -m unittest
```

{{% /choosable %}}

You will see output like this:

{{< chooser language "python" / >}}

{{% choosable language python %}}

```bash
----------------------------------------------------------------------
Ran 1 test in 2.239s

OK
```

{{% /choosable %}}

<!--TODO: make the test fail, etc, but this is just to get started.-->

---

Congratulations! You've finished the Pulumi in Practice pathway! In this
pathway, you learned all about stacks, outputs, and stack references so you can
work in multiple environments. You also learned about secrets in Pulumi and
testing with standard third-party frameworks. The best next step in your journey
to learn Pulumi is to work on the [Pulumi in
Operations]({{< relref "/learn/pulumi/operations" >}}) pathway.