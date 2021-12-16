---
title: "Understanding Extra Considerations"
layout: topic
date: 2021-12-15
draft: false
description: Here is a brief description of what this topic will cover.
meta_desc: Here is a brief description of what this topic will cover.
index: 2
estimated_time: 10
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - learn
# links:
    # - text: Some Website
    #   url: http://something.com
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

# To destroy our program, we can run python main.py destroy
destroy = False
args = sys.argv[1:]
if len(args) > 0:
    if args[0] == "destroy":
        destroy = True

project_name = ""
stack_name = "dev"

# Define where to find our local files
work_dir = os.path.join(os.path.dirname(__file__), "burner-program")

# Set up the virtual environment
pulumi.info("Preparing a virtual environment...")
subprocess.run(["python3", "-m", "venv", "venv"], check=True, cwd=work_dir, capture_output=True)
subprocess.run([os.path.join("venv", "bin", "python3"), "-m", "pip", "install", "--upgrade", "pip"], check=True, cwd=work_dir, capture_output=True)
subprocess.run([os.path.join("venv", "bin", "pip"), "install", "-r", "requirements.txt"], check=True, cwd=work_dir, capture_output=True)
pulumi.info("Virtual environment set up")

# Init or create the stack, depending on if it's present
stack = auto.create_or_select_stack(stack_name=stack_name,
                                    project_name=project_name,
                                    work_dir=work_dir)
pulumi.info("Successfully initialized stack")

# Configure our Pulumi project
pulumi.info("Setting up the project config")
stack.set_config("", auto.ConfigValue(value=""))
pulumi.info("Project config set successfully")

# Refresh the stack
pulumi.info("Refreshing the stack")
stack.refresh(on_output=print)
pulumi.info("Successfully refreshed stack")

# Destroy the stack
if destroy:
    pulumi.info("Destroying the stack...")
    stack.destroy(on_output=print)
    pulumi.info("Successfully destroyed the stack")
    sys.exit()

# Update the stack
pulumi.info("Updating stack...")
up_res = stack.up(on_output=print)
pulumi.info("Successfully updated the stack")
pulumi.info(f"Summary: \n{json.dumps(up_res.summary.resource_changes, indent=4)}")
for output in up_res.outputs:
    val_out = up_res.outputs[f'{output}'].value
    pulumi.info(f"Output: {val_out}")
```

These logs appear in the console as you run an update, which appears as
something like this:

```bash
$ pulumi up
Previewing update (dev)

...

Diagnostics:
  pulumi:pulumi:Stack (learn-auto-api-dev):
    Preparing a virtual environment...
    Virtual environment set up
    Successfully initialized stack
    Setting up the project config
    Project config set successfully
    Refreshing the stack
    Successfully refreshed stack
    Updating stack...
    Successfully updated the stack
    Summary:
    {
        "same": 4
    }
    Output: JQ==
    Output: :BO91@2m3WO[VC]h&b&5t7f4
    Output: 0bd8b1f9-01c5-f71f-949b-8c9b0bc95b04

    Refreshing (dev)
...


Do you want to perform this update? yes
Updating (dev)

...

Diagnostics:
  pulumi:pulumi:Stack (learn-auto-api-dev):
    Preparing a virtual environment...
    Virtual environment set up
    Successfully initialized stack
    Setting up the project config
    Project config set successfully
    Refreshing the stack
    Successfully refreshed stack
    Updating stack...
    Successfully updated the stack
    Summary:
    {
        "same": 4
    }
    Output: JQ==
    Output: :BO91@2m3WO[VC]h&b&5t7f4
    Output: 0bd8b1f9-01c5-f71f-949b-8c9b0bc95b04

    Refreshing (dev)
...
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

# To destroy our program, we can run python main.py destroy
destroy = False
args = sys.argv[1:]
if len(args) > 0:
    if args[0] == "destroy":
        destroy = True

project_name = ""
stack_name = "dev"

# Define where to find our local files
work_dir = os.path.join(os.path.dirname(__file__), "burner-program")

# Set up the virtual environment
try:
    pulumi.info("Preparing a virtual environment...")
    subprocess.run(["python3", "-m", "venv", "venv"], check=True, cwd=work_dir, capture_output=True)
    subprocess.run([os.path.join("venv", "bin", "python3"), "-m", "pip", "install", "--upgrade", "pip"], check=True, cwd=work_dir, capture_output=True)
    subprocess.run([os.path.join("venv", "bin", "pip"), "install", "-r", "requirements.txt"], check=True, cwd=work_dir, capture_output=True)
    pulumi.info("Virtual environment set up")
except Exception as err:
    pulumi.error("Failure while setting up a virtual environment:")
    raise err

# Init or create the stack, depending on if it's present
try:
    stack = auto.create_or_select_stack(stack_name=stack_name,
                                        project_name=project_name,
                                        work_dir=work_dir)
    pulumi.info("Successfully initialized stack")
except Exception as err:
    pulumi.error("Failure when trying to initialize the stack:")
    raise err

# Configure our Pulumi project
try:
    pulumi.info("Setting up the project config")
    stack.set_config("", auto.ConfigValue(value=""))
    pulumi.info("Project config set successfully")
except Exception as err:
    pulumi.error("Failure when trying to set project configuration:")
    raise err

# Refresh the stack
try:
    pulumi.info("Refreshing the stack")
    stack.refresh(on_output=print)
    pulumi.info("Successfully refreshed stack")
except Exception as err:
    pulumi.error("Failure when trying to refresh the stack:")
    raise err

# Destroy the stack
if destroy:
    try:
        pulumi.info("Destroying the stack...")
        stack.destroy(on_output=print)
        pulumi.info("Successfully destroyed the stack")
        sys.exit()
    except Exception as err:
        pulumi.error("Failure when trying to destroy the stack:")
        raise err

# Update the stack
try:
    pulumi.info("Updating stack...")
    up_res = stack.up(on_output=print)
    pulumi.info("Successfully updated the stack")
    pulumi.info(f"Summary: \n{json.dumps(up_res.summary.resource_changes, indent=4)}")
    for output in up_res.outputs:
        val_out = up_res.outputs[f'{output}'].value
        pulumi.info(f"Output: {val_out}")
except Exception as err:
    pulumi.error("Failure when trying to update the stack:")
    raise err
```

With all of this in mind, let's try now using these functions in some more
custom code where we actually can build with this. Onward!
