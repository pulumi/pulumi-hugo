---
title: "Understanding Extra Considerations"
layout: topic
date: 2021-12-15
draft: false
description: |
    Explore why it's important to consider logging and error handling when using
    the Automation API.
meta_desc: |
    Explore why it's important to consider logging and error handling when using
    the Automation API.
index: 2
estimated_time: 10
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - learn
block_external_search_index: false
---

Now that we've got a bit of code, we need to consider how we're going to use
this code. We're not going to be running it from our local console any longer,
so we have some things to think about.

## Adding logging

Since we’re running an API that could get called anywhere, it’s always good to
add some logging to our stack. Why? Well, you’ll need those logs for debugging,
and if someone were to try to access a system through, for example, your
pipeline, the basic system logs are probably the first place they’ll try to wipe
out. Additional logging locations that are separate from the actual system means
you can set up a write-only connection, ensuring that any compromise to that
system can’t affect the logs as they’re written.

Pulumi has some built-in ability in the free tier to log with a call to
`pulumi.<log-level>`. If you’re needing for audit logging (tracking which system
or who triggered each action), that’s on the Enterprise tier. We’re going to use
the built-in logs, however, to get us going.

If you're not familiar with logging libraries, the call is typically to the
logging level as you'll find with the Pulumi logging functions
(`pulumi.debug()`, `pulumi.info()`, `pulumi.error()`, etc.). Logging levels are
important as they help anyone reviewing the logs tune to the level of details
they need for their use case. Skipping logging levels to use one generic level
often leads to others turning off logging to reduce noise, which goes counter to
the actual use of logging.

Add in some logs, like this:

```python
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
    pulumi.info("Preparing a virtual environment...")
    subprocess.run(["python3", "-m", "venv", "venv"], check=True, cwd=work_dir, capture_output=True)
    subprocess.run([os.path.join("venv", "bin", "python3"), "-m", "pip", "install", "--upgrade", "pip"], check=True,
                    cwd=work_dir, capture_output=True)
    subprocess.run([os.path.join("venv", "bin", "pip"), "install", "-r", "requirements.txt"], check=True,
                    cwd=work_dir, capture_output=True)
    pulumi.info("Virtual environment set up")


# Init or create the stack, depending on if it's present
def set_stack(context):
    stack = auto.create_or_select_stack(stack_name=context['stack_name'],
                                        project_name=context['project'],
                                        work_dir=find_local(context['dirname']))
    pulumi.info("Successfully initialized stack")
    return stack


# Configure our Pulumi project
def configure_project(stack):
    pulumi.info("Setting up the project config")
    stack.set_config("", auto.ConfigValue(value=""))
    pulumi.info("Project config set successfully")


# Refresh the stack
def refresh_stack(stack):
    pulumi.info("Refreshing the stack")
    stack.refresh(on_output=print)
    pulumi.info("Successfully refreshed stack")


# Destroy the stack
def destroy_stack(stack, destroy=False):
    if destroy:
        pulumi.info("Destroying the stack...")
        stack.destroy(on_output=print)
        pulumi.info("Successfully destroyed the stack")
        sys.exit()
    else:
        pulumi.info('You need to set destroy to true. Stack still up.')
        return


# Update the stack
def update_stack(stack):
    pulumi.info("Updating stack...")
    up_res = stack.up(on_output=print)
    pulumi.info("Successfully updated the stack")
    pulumi.info(f"Summary: \n{json.dumps(up_res.summary.resource_changes, indent=4)}")
    for output in up_res.outputs:
        val_out = up_res.outputs[f'{output}'].value
        pulumi.info(f"Output: {val_out}")


if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) > 0:
        if args[0] == "destroy":
            destroy = True
    context = set_context(org='nimbinatus',
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

These logs appear in the console as you run an update. If you were to run this
file with `python __main__.py`, you would get the following output:

```bash
info: Preparing a virtual environment...
info: Virtual environment set up
info: Successfully initialized stack
info: Setting up the project config
info: Project config set successfully
info: Refreshing the stack
Refreshing (dev)

View Live: https://app.pulumi.com/<org>/burner-program/dev/updates/11


 ~  pulumi:pulumi:Stack burner-program-dev refreshing
    pulumi:pulumi:Stack burner-program-dev running
 ~  random:index:RandomUuid fake-uuid refreshing
 ~  random:index:RandomId fake-id refreshing
 ~  random:index:RandomString fake-string refreshing
    random:index:RandomUuid fake-uuid
    random:index:RandomId fake-id
    random:index:RandomString fake-string
    pulumi:pulumi:Stack burner-program-dev

Outputs:
    id    : "JQ=="
    string: ":BO91@2m3WO[VC]h&b&5t7f4"
    uuid  : "0bd8b1f9-01c5-f71f-949b-8c9b0bc95b04"

Resources:
    4 unchanged

Duration: 1s

info: Successfully refreshed stack
info: Updating stack...
Updating (dev)

View Live: https://app.pulumi.com/<org>/burner-program/dev/updates/12


    pulumi:pulumi:Stack burner-program-dev running
    random:index:RandomString fake-string
    random:index:RandomId fake-id  [diff: +__defaults]
    random:index:RandomUuid fake-uuid  [diff: +__defaults]
    pulumi:pulumi:Stack burner-program-dev

Outputs:
    id    : "JQ=="
    string: ":BO91@2m3WO[VC]h&b&5t7f4"
    uuid  : "0bd8b1f9-01c5-f71f-949b-8c9b0bc95b04"

Resources:
    4 unchanged

Duration: 1s

info: Successfully updated the stack
info: Summary:
{
    "same": 4
}
info: Output: JQ==
info: Output: :BO91@2m3WO[VC]h&b&5t7f4
info: Output: 0bd8b1f9-01c5-f71f-949b-8c9b0bc95b04

Process finished with exit code 0

```

In this case, there were no updates to our stack, so the summary we put in the
logs just notes that there were four resources that stayed the same with no
diff.

## Handling Exceptions

Good development practice is to handle exceptions gracefully. Any call to our
custom API should do the same, and it should log the error. Update the code like
this:

```python
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
        subprocess.run(["python3", "-m", "venv", "venv"], check=True, cwd=work_dir, capture_output=True)
        subprocess.run([os.path.join("venv", "bin", "python3"), "-m", "pip", "install", "--upgrade", "pip"], check=True,
                       cwd=work_dir, capture_output=True)
        subprocess.run([os.path.join("venv", "bin", "pip"), "install", "-r", "requirements.txt"], check=True,
                       cwd=work_dir, capture_output=True)
        pulumi.info("Virtual environment set up")
    except Exception as e:
        pulumi.error("Failure while setting up a virtual environment:")
        raise e


# Init or create the stack, depending on if it's present
def set_stack(context):
    try:
        stack = auto.create_or_select_stack(stack_name=context['stack_name'],
                                            project_name=context['project'],
                                            work_dir=find_local(context['dirname']))
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
    ...

```

With all of this in mind, let's try now using these functions in some more
custom code where we actually can build with this. Onward!
