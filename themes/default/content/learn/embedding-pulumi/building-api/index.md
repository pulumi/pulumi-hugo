---
title: "Building a Pulumi API"
layout: topic
date: 2021-12-15
draft: false
description: |
    Build your first encapsulation of the Pulumi CLI with Pulumi's Automation
    API.
meta_desc: |
    Build your first encapsulation of the Pulumi CLI with Pulumi's Automation
    API.
index: 1
estimated_time: 10
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - learn
block_external_search_index: false
---

The Automation API allows us to create an API for our current infrastructure. As engineers, we'd love to provision our stacks via a quick call, and we'd also like to make it easy for others to provision the same infrastructure with a web interface. Let's first build the custom API for our stack, then we'll build the interface for others to use.

## Scaffolding

Let's start out with scaffolding the code by importing the right libraries and doing a bit of conversion of our basic Pulumi commands (create, configure, refresh, destroy, and update) to code with the automation API library. Put this code in the {{< langfile >}} file:

{{< code-filename file="learn-auto-api/__main__.py" >}}

```python {linenos=inline,linenostart=1}
import json
import os
import subprocess
import sys
import pulumi
from pulumi import automation as auto

# To destroy our program, we can run python main.py destroy
destroy = False
args = sys.argv[1:]
if len(args) > 0:
    if args[0] == "destroy":
        destroy = True

project_name = ""
stack_name = "dev"

# Define where to find our local files
work_dir = os.path.join(os.path.dirname(__file__), '..', "boba-tea-shop")

# Set up the virtual environment
subprocess.run(
    ["python3", "-m", "venv", "venv"],
    check=True,
    cwd=work_dir,
    capture_output=True
)
subprocess.run(
    [os.path.join("venv", "bin", "python3"), "-m", "pip", "install", "--upgrade", "pip"],
    check=True,
    cwd=work_dir,
    capture_output=True
)
subprocess.run(
    [os.path.join("venv", "bin", "pip"), "install", "-r", "requirements.txt"],
    check=True,
    cwd=work_dir,
    capture_output=True
)

# Init or create the stack, depending on if it's present
stack = auto.create_or_select_stack(
    stack_name=stack_name,
    project_name=project_name,
    work_dir=work_dir
)

# Configure our Pulumi project
stack.set_config("", auto.ConfigValue(value=""))

# Refresh the stack
stack.refresh(on_output=print)

# Destroy the stack
if destroy:
    stack.destroy(on_output=print)
    sys.exit()

# Update the stack
up_res = stack.up(on_output=print)
for output in up_res.outputs:
    val_out = up_res.outputs[f'{output}'].value
```
{{< /code-filename >}}

This scaffolding gives us a declarative workflow that takes in a directory with a Pulumi program in it and runs a set of commands against it.

We haven't made an API just yet. We've made the most simple program you can make with the Automation API: a procedure for creating, updating, or deleting a specific stack.

### Considerations with Destroy

The basics of such an API is taking the commands we call in the CLI and generalizing them to an interface that can be easily programmed. We also, however, would like to have the ability to destroy a stack locally as we'd like any future work locally to go through the API as well, but we really don't want any automation to be able to destroy a stack without human approval (unless perhaps it's an ephemeral stack for smoke testing). That's the part at the top of the code that defines a `destroy` variable, or flag, that can enable the destroy workflow.

## Automating Commands

Now that we have that rough scaffolding, let's make it more reusable and more like an API. Modify the main {{< langfile >}} like this:

{{< code-filename file="learn-auto-api/__main__.py" >}}

```python {linenos=inline,linenostart=1}
import json
import os
import subprocess
import sys
import pulumi
from pulumi import automation as auto


# Define the context of our program
def set_context(org, project, stack, dirname):
    config_obj = {
        'org': org,
        'project': project,
        'stack': stack,
        'stack_name': auto.fully_qualified_stack_name(org, project, stack),
        'dirname': dirname
    }
    return config_obj


# Define where to find our local files
def find_local(dirname):
    return os.path.join(os.path.dirname(__file__), dirname)


# Set up the virtual environment
def spin_venv(dirname):
    work_dir = find_local(dirname)
    try:
        pulumi.info("Preparing a virtual environment...")
        subprocess.run(
            ["python3", "-m", "venv", "venv"],
            check=True,
            cwd=work_dir,
            capture_output=True
        )
        subprocess.run(
            [os.path.join("venv", "bin", "python3"), "-m", "pip", "install", "--upgrade", "pip"],
            check=True,
            cwd=work_dir,
            capture_output=True
        )
        subprocess.run(
            [os.path.join("venv", "bin", "pip"), "install", "-r", "requirements.txt"],
            check=True,
            cwd=work_dir,
            capture_output=True
        )
        pulumi.info("Virtual environment set up")
    except Exception as e:
        pulumi.error("Failure while setting up a virtual environment:")
        raise e


# Init or create the stack, depending on if it's present
def set_stack(context):
    try:
        stack = auto.create_or_select_stack(
            stack_name=context['stack_name'],
            project_name=context['project'],
            work_dir=find_local(context['dirname'])
        )
        pulumi.info("Successfully initialized stack")
        return stack
    except Exception as e:
        pulumi.error("Failure when trying to initialize the stack:")
        raise e


# Configure our Pulumi project
def configure_project(stack):
    try:
        pulumi.info("Setting up the project config")
        stack.set_config("", auto.ConfigValue(value=""))
        pulumi.info("Project config set successfully")
    except Exception as e:
        pulumi.error("Failure when trying to set project configuration:")
        raise e


# Refresh the stack
def refresh_stack(stack):
    try:
        pulumi.info("Refreshing the stack")
        stack.refresh(on_output=print)
        pulumi.info("Successfully refreshed stack")
    except Exception as e:
        pulumi.error("Failure when trying to refresh the stack:")
        raise e


# Destroy the stack
def destroy_stack(stack, destroy=False):
    if destroy:
        try:
            pulumi.info("Destroying the stack...")
            stack.destroy(on_output=print)
            pulumi.info("Successfully destroyed the stack")
            sys.exit()
        except Exception as e:
            pulumi.error("Failure when trying to destroy the stack:")
            raise e
    else:
        pulumi.info('You need to set destroy to true. Stack still up.')
        return


# Update the stack
def update_stack(stack):
    try:
        pulumi.info("Updating stack...")
        up_res = stack.up(on_output=print)
        pulumi.info("Successfully updated the stack")
        pulumi.info(f"Summary: \n{json.dumps(up_res.summary.resource_changes, indent=4)}")
        for output in up_res.outputs:
            val_out = up_res.outputs[f'{output}'].value
            pulumi.info(f"Output: {val_out}")
    except Exception as e:
        pulumi.error("Failure when trying to update the stack:")
        raise e


if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) > 0:
        if args[0] == "destroy":
            destroy = True
    context = set_context(org='<org>',
                          project='burner-program',
                          stack='dev',
                          dirname='burner-program'
                          )
    spin_venv(context['dirname'])
    stack = set_stack(context=context)
    configure_project(stack=stack)
    refresh_stack(stack=stack)
    if len(args) > 0:
        if args[0] == "destroy":
            destroy = True
            destroy_stack(stack=stack)
    update_stack(stack=stack)

```

{{< /code-filename >}}

Now we've got some functions we can call. We've got a few considerations to take into account in the next module before we can start building with this code.
