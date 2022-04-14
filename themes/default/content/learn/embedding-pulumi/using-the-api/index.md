---
title: "Using the Custom API"
layout: topic
date: 2021-12-15
draft: false
description: |
    Explore uses of the Automation API with some working examples and possible
    additional builds to try.
meta_desc: |
    Explore uses of the Automation API with some working examples and possible
    additional builds to try.
index: 3
estimated_time: 15
meta_image: meta.png
authors:
    - laura-santamaria
tags:
    - learn
links:
    - text: Examples from Pulumi
      url: https://github.com/pulumi/automation-api-examples
block_external_search_index: false
---

Having a set of commands that we can invoke programmatically is a nice touch,
but it may not seem like much of an improvement. After all, we can just run
these commands via the CLI and get the same result. We still need to write up
Pulumi code for each system we want to build. However, what if I told you we
could take this code and start building it out to make a self-service web portal
for others to provision infrastructure? Or we could define commands to spin up
happy-path infrastructure that other engineers could call from their own
programs (or from a chatbot)? We could even call these commands as part of a
pipeline (if we weren't using a supported runner) or as part of a program that
is triggered by an incident page&mdash;such as if you need to spin up more
capacity automatically in response to a spike in traffic.

This small sample we've built is to get you familiar with the idea of an
automated Pulumi system. Let's explore some possible interesting builds for the
API.

## Making an API

Before we go explore some more complicated examples, let's take our small random
data generator from the very beginning of this pathway and make a little API.

We're going to use Falcon for this API. Add Falcon to your environment by adding
`falcon` to your `requirements.txt` file in the root of your repo, then run the
following command:

```bash
pip install -r requirements.txt
```

Next, copy the `__main__.py` file in the root of your repo to a file called
`basic_pulumi.py`. There's a couple of changes we'll need to make. First, we
need to be able to pass in a new variable to the `set_context` call that defines
what we're requesting (a new random id, a new random uuid, or a new random
string). Then, we need to add that new context to our config for the project. We
also need to return the output values for later use. Finally, we'll adjust the
destroy call to return so we can use it in our API for an ephemeral random call.

Here's the new file structure:

```
learn-auto-api/
    burner-program/
        venv/
        .gitignore
        __main__.py
        Pulumi.yaml
        requirements.txt
    venv/
    .gitignore
    __main__.py
    basic_pulumi.py
    Pulumi.yaml
    requirements.txt
```

Use this diff to make those changes:

```bash
$ diff __main__.py basic_pulumi.py
10c10
< def set_context(org, project, stack, dirname):
---
> def set_context(org, project, stack, dirname, req):
16c16,17
<         'dirname': dirname
---
>         'dirname': dirname,
>         'request': req
56c57
< def configure_project(stack):
---
> def configure_project(stack, context):
59c60
<         stack.set_config("", auto.ConfigValue(value=""))
---
>         stack.set_config("request", auto.ConfigValue(value=f"{context['request']}"))
84c85
<             sys.exit()
---
>             return
102a104
>         return up_res

```

Ready? Next, make a new file called `api.py`, and copy this code into it,
replacing the org on line 13 (in the `spin_up_program` function):

```python
import falcon
import pulumi
import basic_pulumi
import json
import pulumi_random as random
from wsgiref.simple_server import make_server

api = application = falcon.App()


def spin_up_program(requested):
    context = basic_pulumi.set_context(
        org='<INSERT_YOUR_ORG_HERE>',
        project='burner-program',
        stack='dev',
        dirname='burner-program',
        req=f'{requested}'
    )
    basic_pulumi.spin_venv(context['dirname'])
    stack = basic_pulumi.set_stack(context=context)
    basic_pulumi.configure_project(stack=stack, context=context)
    basic_pulumi.refresh_stack(stack=stack)
    results = basic_pulumi.update_stack(stack=stack)
    basic_pulumi.destroy_stack(stack=stack, destroy=True)
    return results


# Greeting resource
class Randomizer(object):
    def on_get(self, req, resp):
        payload = {
            "response": "hello, world"
        }
        resp.text = json.dumps(payload)
        resp.status = falcon.HTTP_200

    def on_get_id(self, req, resp):
        result = spin_up_program('id')
        payload = {
            'response': f'{result.outputs["id"].value}'
        }
        resp.text = json.dumps(payload)
        resp.status = falcon.HTTP_200

    def on_get_uuid(self, req, resp):
        result = spin_up_program('uuid')
        payload = {
            'response': f'{result.outputs["uuid"].value}'
        }
        resp.text = json.dumps(payload)
        resp.status = falcon.HTTP_200

    def on_get_string(self, req, resp):
        result = spin_up_program('string')
        payload = {
            'response': f'{result.outputs["string"].value}'
        }
        resp.text = json.dumps(payload)
        resp.status = falcon.HTTP_200


# Instantiation
randomizer = Randomizer()

# Routes
api.add_route('/id', randomizer, suffix='id')
api.add_route('/uuid', randomizer, suffix='uuid')
api.add_route('/string', randomizer, suffix='string')

if __name__ == '__main__':
    with make_server('', 8000, api) as httpd:
        print('Serving on port 8000...')

        # Serve until process is killed
        httpd.serve_forever()

```

This file sets up a small Falcon application that, when we reach certain
endpoints, runs our Pulumi program using the commands we made that wrap the CLI.
Each endpoint calls a different part of the program. Speaking of that program,
we need to modify it a bit. Change `burner-program/{{< langfile >}}` to match
this code:

```python
import pulumi
import pulumi_random as random

config = pulumi.Config()
request = config.require('request')


def pulumi_program():
    if request == 'string':
        fake_string = random.RandomString(
            "fake-string",
            length=24
        )
        result_string = fake_string.result
    elif request == 'id':
        fake_id = random.RandomId(
            "fake-id",
            byte_length=1
        )
        result_string = fake_id.b64_std
    elif request == 'uuid':
        fake_uuid = random.RandomUuid("fake-uuid")
        result_string = fake_uuid.result
    else:
        result_string = 'Give me something I can work with.'
    return result_string


pulumi.export(f'{request}', pulumi_program())

```

Here's the final file structure:

```
learn-auto-api/
    burner-program/
        venv/
        .gitignore
        __main__.py
        Pulumi.dev.yaml
        Pulumi.yaml
        requirements.txt
    venv/
    .gitignore
    __main__.py
    api.py
    basic_pulumi.py
    Pulumi.dev.yaml
    Pulumi.yaml
    requirements.txt
```

Now, let's run it! From the root of the repo, run `python api.py`. You'll find
the following output:

```bash
Serving on port 8000...
```

Now, we'll try CURLing the `id` endpoint. Open a new terminal and run this
command:

```bash
$ curl localhost:8000/id
{"response": "6w=="}%
```

What's happening in the terminal window where we're running the API? Check it
out:

```bash
info: Preparing a virtual environment...
info: Virtual environment set up
info: Successfully initialized stack
info: Setting up the project config
info: Project config set successfully
info: Refreshing the stack
Refreshing (dev)

View Live: https://app.pulumi.com/<org>/burner-program/dev/updates/50



Resources:

Duration: 1s

info: Successfully refreshed stack
info: Updating stack...
Updating (dev)

View Live: https://app.pulumi.com/<org>/burner-program/dev/updates/51


 +  pulumi:pulumi:Stack burner-program-dev creating
 +  random:index:RandomId fake-id creating
 +  random:index:RandomId fake-id created
 +  pulumi:pulumi:Stack burner-program-dev created

Outputs:
    id: "6w=="

Resources:
    + 2 created

Duration: 2s

info: Successfully updated the stack
info: Summary:
{
    "create": 2
}
info: Output: 6w==
info: Destroying the stack...
Destroying (dev)

View Live: https://app.pulumi.com/<org>/burner-program/dev/updates/52


 -  random:index:RandomId fake-id deleting
 -  random:index:RandomId fake-id deleted
 -  pulumi:pulumi:Stack burner-program-dev deleting
 -  pulumi:pulumi:Stack burner-program-dev deleted

Outputs:
  - id: "6w=="

Resources:
    - 2 deleted

Duration: 2s

The resources in the stack have been deleted, but the history and configuration
associated with the stack are still maintained.
If you want to remove the stack completely, run 'pulumi stack rm dev'.
info: Successfully destroyed the stack
127.0.0.1 - - [15/Dec/2021 21:54:01] "GET /id HTTP/1.1" 200 20
```

There's all the logs we added! Pretty cool!

## Wiring a self-service platform

One of the common examples is a self-service platform. To give credit where
credit is due, a fantastic Flask-based, in-depth example can be found in the
[self-service-platyform repo](https://github.com/komalali/self-service-platyform)
by one of the Pulumi community members. There also is a smaller example of the
same idea in
[Go](https://github.com/pulumi/automation-api-examples/tree/main/go/pulumi_over_http),
[Python](https://github.com/pulumi/automation-api-examples/tree/main/python/pulumi_over_http),
and
[TypeScript/Javascript](https://github.com/pulumi/automation-api-examples/tree/main/nodejs/pulumiOverHttp-ts),
in the Pulumi Automation API examples repo.

In general, all of these examples create a simple web page that provides a user
interface for your Pulumi programs. The interface has standard use cases defined
with the actual infrastructure for those use cases abstracted away in a
RESTful manner. So, for example, if a user wanted a static site, a request for
that use will spin up a storage spot, a policy for that storage, and a basic
HTML file in that storage that's delivered as a webpage.

You'll notice that these examples don't just wrap the CLI commands as callable
functions. The Automation API is embedded as part of the various larger calls to
the platform's API. Pretty cool!

## Migrating databases

What if you could migrate a database with Pulumi? It's possible! The examples in
[Go](https://github.com/pulumi/automation-api-examples/blob/main/go/database_migration),
[Python](https://github.com/pulumi/automation-api-examples/tree/main/python/database_migration),
[TypeScript/Javascript](https://github.com/pulumi/automation-api-examples/blob/main/nodejs/databaseMigration-ts),
and
[C#/.Net](https://github.com/pulumi/automation-api-examples/blob/main/dotnet/DatabaseMigration)
show a basic creation of a table with insertion and verification of data. If we
combine this idea with the same type of idea of a web portal, we could make a
plain migration tool that takes data from one table and generates a new one from
that data, effectively migrating the table from one database to another.

<br/>
<br/>

These examples are only a small sample of the power of the Automation API.

---

Congratulations! You've now finished this pathway on embedding Pulumi in other
programs, platforms, and systems! In this pathway, you've learned about wrapping
the standard Pulumi commands into a program with the Automation API, considering
where Pulumi could be run and building out logging and error handling
accordingly, and working with the Automation API to integrate your
infrastructure into other workflows.

Go build new things, and watch this space for more learning experiences with
Pulumi!
