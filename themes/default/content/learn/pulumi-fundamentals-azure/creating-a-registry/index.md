---
title: "Creating a Registry"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-09-30T09:32:00-05:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: true

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Build your first resources on Azure with a registry holding some Docker images.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Build your first resources on Azure with a registry holding some Docker images.

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
    - matt-stratton

tags:
    - learn
    - fundamentals
    - azure

# When provided, links are rendered at the bottom of the topic page.
links:
    - text: Some Website
      url: http://something.com

# Exclude from search-engine indexing for now.
block_external_search_index: true
---

Let's try using a cloud-based resource provider! Recall from
[Pulumi Fundamentals]({{< relref "/learn/pulumi-fundamentals" >}}) that a
[_resource
provider_]({{< relref "/docs/reference/glossary/#resource-provider" >}})
manages your resources. We used Docker before. Now, we're going to add AWS as a
resource provider. You can have multiple resource providers in your Pulumi
programs, so don't feel like you have to choose just one!

Just as a reminder: The prerequisites noted that you should have your Azure CLI
configured with Pulumi before you begin. If you skipped that step, please go
back and [follow the
steps]({{< relref "/docs/intro/cloud-providers/azure/setup/" >}}) to do so.

## Make a private registry

Let's revisit building those container images. We want a different place to
store those images than our local environment. Instead, let's create a custom 
registry in Azure Container Registry.

First, you'll need a new provider: the Azure provider. Install that dependency
now:

```bash
pip install pulumi_azure_native
```
We want all our resources to provision in a specific location. We'll set this globally in our project. Run the following command in your terminal, from within our project:

```bash
$ pulumi config set azure-native:location westus
```

Go back to your code from Fundamentals, and add the following code to
{{% langfile %}}:

{{< chooser language "python" / >}}

{{% choosable language python %}}

```python
# Add these imports to your import block
import pulumi_azure_native.containerregistry as containerregistry
import pulumi_azure_native.resources as resources

# Add this comment and declaration right after `config = pulumi.Config()`

resource_group = resources.ResourceGroup(
    "resourceGroup",
)
# Create a private  repository.
registry = containerregistry.Registry(
    "registry",
    resource_group_name=resource_group.name,
    sku=containerregistry.SkuArgs(
        name="Basic",
    ),
    admin_user_enabled=True)

```

{{% /choosable %}}

Because this is a private repository, we will need to add the credentials to prove that we are allowed to access
the images inside. Add the following code:

{{< chooser language "python" / >}}

{{% choosable language python %}}

```python
credentials = pulumi.Output.all(resource_group.name, registry.name).apply(
    lambda args: containerregistry.list_registry_credentials(resource_group_name=args[0],
                                                             registry_name=args[1]))
admin_username = credentials.username
admin_password = credentials.passwords[0]["value"]
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
                       image_name=registry.login_server.apply(
                          lambda login_server: f"{login_server}/{backend_image_name}:{stack}"), # This flag has changed!
                       skip_push=False, # This flag has changed!
                       registry=docker.ImageRegistry(
                          server=registry.login_server,
                          username=admin_username,
                          password=admin_password) # This option is new!
                      )  
#...
frontend = docker.Image("frontend",
                        build=docker.DockerBuild(context=f"{os.getcwd()}/app/frontend"),
                        image_name=registry.login_server.apply(
                          lambda login_server: f"{login_server}/{frontend_image_name}:{stack}"), # This flag has changed!
                        skip_push=False, # This flag has changed!
                        registry=docker.ImageRegistry(
                          server=registry.login_server,
                          username=admin_username,
                          password=admin_password) # This option is new!
                      )


```

{{% /choosable %}}

Run `pulumi up` to create your new registry, build your Docker image,
and push it up to the registry. 

Let's review what's going on in the code. The new or changed inputs include

- `skip_push`: The flag now has been flipped to `False`, which tells Pulumi that the image is no longer local.
- `registry`: This option identifies the ECR registry we defined earlier.
- `image_name`: We have changed this to specify the full name of the image, including the registry.

Now that we've provisioned our first piece of infrastructure on AWS and sent our
images to the cloud, let's go set up the resources the app will need on AWS.

Onward!
