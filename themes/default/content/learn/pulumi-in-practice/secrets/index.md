---
title: "Secrets"
layout: topic
date: 2021-09-20T08:33:36-05:00
draft: false
description: Here is a brief description of what this topic will cover.
meta_desc: Here is a brief description of what this topic will cover.
index: 4
estimated_time: 10
meta_image: meta.png
authors:
    - matt-stratton
tags:
    - change-me
links:
    - text: Some Website
      url: http://something.com
block_external_search_index: true
---

All resource input and output values are recorded as
[state]({{< relref "/docs/intro/concepts/state/" >}}) and are stored in the
Pulumi Service, a file, or a pluggable provider that you choose. These raw
values are usually just server names, configuration settings, and so on. In some
cases, however, these values contain sensitive data, such as database passwords
or service tokens.

The Pulumi Service always transmits and stores entire state files securely;
however, Pulumi also supports encrypting specific values as "secrets" for extra
protection. Encryption ensures that these values never appear as plain-text in
your state file. By default, the encryption method uses automatic, per-stack
encryption keys provided by the Pulumi Service or you can use a
[provider of your own choosing]({{< relref "/docs/intro/concepts/secrets/#configuring-secrets-encryption" >}})
instead.

To encrypt a configuration setting before runtime, you can use the CLI command
`pulumi config set` command with a `--secret` flag. All these encrypted values
are stored in your state file.

Inside our `my-second-app` program that we have been working with, let's set a
secret:

```bash
$ pulumi config set --secret dbPassword S3cr37
```

If we list the configuration for our stack, the plain-text value for
`dbPassword` will not be printed:

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

We can access the secrets similarly to other configuration data, however we must
specify that it is a secret:

Add this code to the {{% langfile %}} inside of `my-second-app`:

{{< chooser language "typescript,python" / >}}

{{% choosable language typescript %}}

```typescript
const config = new pulumi.Config();

const dbPassword = config.requireSecret("dbPassword");

export let password = dbPassword

```

{{% /choosable %}}


{{% choosable language python %}}

```python

config = pulumi.Config()

print(config.require_secret('dbPassword'))
pulumi.export("name",config.require_secret('dbPassword'))

```

{{% /choosable %}}

<!-- {{% choosable language go %}}

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

{{% /choosable %}} -->

When we run `pulumi up`, we see that the output is set (so our use of the secret
worked!), but Pulumi knows that value was a secret, so when we try to set it as
an output, it will not display.

If we would like to see the plain-text value, we can do it with this command:

```bash
$ pulumi stack output password --show-secrets
S3cr37
```

For more information on how Pulumi uses secrets, including how to set them
programmatically, review the
[corresponding docs]({{< relref "/docs/intro/concepts/secrets/" >}}).