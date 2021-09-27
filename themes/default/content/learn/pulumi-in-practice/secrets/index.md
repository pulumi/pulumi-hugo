---
title: "Secrets"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-09-20T08:33:36-05:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: true

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Here is a brief description of what this topic will cover.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Here is a brief description of what this topic will cover.

# The order in which the topic appears in the module.
index: 4

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

All resource input and output values are recorded as [state](https://www.pulumi.com/docs/intro/concepts/state/), and are stored in the Pulumi Service, a file, or a pluggable provider that you choose. These raw values are usually just server names, configuration settings, and so on. In some cases, however, these values contain sensitive data, such as database passwords or service tokens.

The Pulumi Service always transmits and stores entire state files securely; however, Pulumi also supports encrypting specific values as “secrets” for extra protection. Encryption ensures that these values never appear as plaintext in your state file. By default, the encryption method uses automatic, per-stack encryption keys provided by the Pulumi Service or you can use a [provider of your own choosing instead](https://www.pulumi.com/docs/intro/concepts/secrets/#configuring-secrets-encryption).

To encrypt a configuration setting before runtime, you can use the CLI command `config set` command with a `--secret` flag.  All these encrypted values are stored in your state file.

Inside our `my-second-app` program that we have been working with, let's set a secret. 

```bash
$ pulumi config set --secret dbPassword S3cr37
```
If we list the configuration for our stack, the plaintext value for `dbPassword` will not be printed:

```bash
$ pulumi config

KEY         VALUE
dbPassword  [secret]
```

This is also encrypted in the associated configuration file:

```bash
$ cat Pulumi.staging.yaml

config:
  my-second-app:dbPassword:
    secure: AAABAP/z34tGZxL/hjFP0HiFOmUuNBfj4SpJogSKmPdunAnyYK8=

```

We can access the secrets similarly to other configuration data, however we must specify that it is a secret:

{{< chooser language "typescript,python,go,csharp" / >}}

{{% choosable language typescript %}}

Add this to the `index.ts` file inside of `my-second-app`

```typescript
const config = new pulumi.Config();

const dbPassword = config.requireSecret("dbPassword");

export let password = dbPassword

```

{{% /choosable %}}


{{% choosable language python %}}

Add this to the `__main__.py` file inside of `my-second-app`

```python

config = pulumi.Config()

print(config.require_secret('dbPassword'))
pulumi.export("name",config.require_secret('dbPassword'))

```

{{% /choosable %}}

{{% choosable language go %}}

Add this to the `main.go` file inside of `my-second-app`

```go

import (
  "fmt"

  "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
  pulumi.Run(func(ctx *pulumi.Context) error {
    dbPassword := c.RequireSecret("dbPassword")
    ctx.Export("x", pulumi.String(dbPassword))

    return nil
  }
}

```

{{% /choosable %}}

{{% choosable language csharp %}}

Add this to the `MyStack.cs` file inside of `my-second-app`

```csharp

class AppStack : Stack
{
    public AppStack()
    {
        var config = new Config();

        var dbPassword = config.RequireSecret("dbPassword");
        this.dbPassword = Output.Create(dbPassword);
    }
}

```

{{% /choosable %}}

When we run `pulumi up`, we see that the output is set (so our use of the secret worked!) but Pulumi knows that value was a secret, so when we try to set it as an output, it will not display.

If we would like to see the plaintext value, we can do it with this command:

```bash
$ pulumi stack output password --show-secrets
S3cr37
```


For more information on how Pulumi uses secrets, including how to set them programmatically, please see the [corresponding docs article](https://www.pulumi.com/docs/intro/concepts/secrets/).