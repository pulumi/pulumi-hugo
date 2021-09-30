---
title: "Creating a Registry"
layout: topic
date: 2021-09-29T20:48:56-05:00
draft: false
description: Build your first resources on AWS with a registry holding some Docker images.
meta_desc: Build your first resources on AWS with a registry holding some Docker images.
index: 0
estimated_time: 10
meta_image: meta.png
authors:
    - sophia-parafina
    - laura-santamaria
tags:
    - learn
    - fundamentals
    - aws
links:
    - text: Some Website
      url: http://something.com
block_external_search_index: true
---

Let's try using a cloud-based resource provider! Recall from
[Pulumi Fundamentals]({{< relref "/learn/pulumi-fundamentals" >}}) that a
[_resource
provider_]({{< relref "/docs/reference/glossary/#resource-provider" >}})
manages your resources. We used Docker before. Now, we're going to add AWS as a
resource provider. You can have multiple resource providers in your Pulumi
programs, so don't feel like you have to choose just one!

Just as a reminder: The prerequisites noted that you should have your AWS CLI
configured with Pulumi before you begin. If you skipped that step, please go
back and [follow the
steps]({{< relref "/docs/intro/cloud-providers/aws/setup/" >}}) to do so.

## Make a private registry

Let's revisit building those container images. We want a different place to
store those images than our local environment. Instead, let's create a private
AWS ECR repository.

First, you'll need a new provider: the AWS provider. Install that dependency
now:

```bash
pip install pulumi_aws
```

Go back to your code from Fundamentals, and add the following code to
{{% langfile %}}:

{{< chooser language "python" / >}}

{{% choosable language python %}}

```python
# Add this import to your import block
import pulumi_aws as aws

# Add this comment and declaration right after `config = pulumi.Config()`
# Create a private ECR repository.
repo = aws.ecr.Repository('my_repo')
```

{{% /choosable %}}

Because it's a private repository, we will need to add a function to
authenticate to AWS to prove we're allowed to access the images inside. This
function generates a temporary access credential, so let's add it after all the
`config.require()` calls:

{{< chooser language "python" / >}}

{{% choosable language python %}}

```python
# Get registry info (creds and endpoint).
def getRegistryInfo(rid):
    creds = aws.ecr.get_credentials(registry_id=rid)
    decoded = base64.b64decode(creds.authorization_token).decode()
    parts = decoded.split(':')
    if len(parts) != 2:
        raise Exception("Invalid credentials")
    return docker.ImageRegistry(creds.proxy_endpoint, parts[0], parts[1])

image_name = repo.repository_url
registry_info = repo.registry_id.apply(getRegistryInfo)
```

{{% /choosable %}}

## Rebuild your Docker image

First, let's reactivate the `venv` and double-check that your dependencies are
still there:

```bash
source venv/bin/activate
pip install pulumi_docker
```

You should see output showing you still have the provider installed.

Back inside your program, let's connect the image up to the registry. Update
your code to match this example (we're using `# ...` to indicate there's other
code we're not duplicating here!):

{{< chooser language "python" / >}}

{{% choosable language python %}}

```python
#... 
backend = docker.Image("backend",
                       build=docker.DockerBuild(context=f"{os.getcwd()}/app/backend"),
                       image_name=f"{backend_image_name}:{stack}",
                       skip_push=False, # This flag has changed!
                       registry=registry_info # This option is new!
                       )

#...
frontend = docker.Image("frontend",
                        build=docker.DockerBuild(context=f"{os.getcwd()}/app/frontend"),
                        image_name=f"{frontend_image_name}:{stack}",
                        skip_push=False, # This flag has changed!
                        registry=registry_info # This option is new!
                        )
```

{{% /choosable %}} 

Run `pulumi up` to create your new registry, build your Docker image,
and push it up to the registry. If you run the command
`aws ecr list-images --repository-name my_repo`, you should see your image.

Let's review what's going on in the code. The new or changed inputs include

- `skip_push`: The flag now has been flipped to `False`, which tells Pulumi that the image is no longer local.
- `registry`: This option identifies the ECR registry we defined earlier.

Now that we've provisioned our first piece of infrastructure on AWS and sent our
images to the cloud, let's go set up the resources the app will need on AWS.

Onward!
