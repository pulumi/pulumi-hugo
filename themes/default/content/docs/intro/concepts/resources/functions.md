---
title: "Provider Functions"
meta_desc: Provider SDKs export functions that can be called in a Pulumi program
menu:
  intro:
    parent: resources
    weight: 7
---

A provider may make **functions** available in its SDK as well as resource types. For example, the AWS provider includes the function [`aws.apigateway.getDomainName`](https://www.pulumi.com/registry/packages/aws/api-docs/apigateway/getdomainname/), among many others.

<div><pulumi-examples>
<div><pulumi-chooser type="language" options="typescript,python,go,csharp,java,yaml"></pulumi-chooser></div>
<div>
<pulumi-choosable type="language" values="csharp">

```csharp
using Pulumi;
using Aws = Pulumi.Aws;

class MyStack : Stack
{
    public MyStack()
    {
        var example = Output.Create(Aws.ApiGateway.GetDomainName.InvokeAsync(new Aws.ApiGateway.GetDomainNameArgs
        {
            DomainName = "api.example.com",
        }));
    }
}
```

</pulumi-choosable>
</div>
<div>
<pulumi-choosable type="language" values="go">

```go
package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v5/go/aws/apigateway"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := apigateway.LookupDomainName(ctx, &apigateway.LookupDomainNameArgs{
			DomainName: "api.example.com",
		}, nil)
		if err != nil {
			return err
		}
		return nil
	})
}
```

</pulumi-choosable>
</div>
<div>
<pulumi-choosable type="language" values="java">

```java
package generated_program;

import java.util.*;
import java.io.*;
import java.nio.*;
import com.pulumi.*;

public class App {
    public static void main(String[] args) {
        Pulumi.run(App::stack);
    }

    public static void stack(Context ctx) {
        final var example = Output.of(ApigatewayFunctions.getDomainName(GetDomainNameArgs.builder()
            .domainName("api.example.com")
            .build()));
    }
}
```

</pulumi-choosable>
</div>
<div>
<pulumi-choosable type="language" values="python">

```python
import pulumi
import pulumi_aws as aws

example = aws.apigateway.get_domain_name(domain_name="api.example.com")
```

</pulumi-choosable>
</div>
<div>
<pulumi-choosable type="language" values="typescript">

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const example = pulumi.output(aws.apigateway.getDomainName({
    domainName: "api.example.com",
}));
```

</pulumi-choosable>
</div>
<div>
<pulumi-choosable type="language" values="yaml">

```yaml
variables:
  example:
    Fn::Invoke:
      Function: aws:apigateway:getDomainName
      Arguments:
        domainName: api.example.com
```

</pulumi-choosable>
</div>
</pulumi-examples></div>

Provider functions are exposed in each language as regular functions, in two variations:

 1. a function that accepts plain arguments (strings and so on) and returns a Promise, or blocks until the result is available; and,
 2. a function that accepts `Input` values and returns an [Output]({{< relref "/docs/intro/concepts/inputs-outputs" >}}).

The documentation for a provider function will tell you the name and signature for each of the variations.

### Invoke options

Each function also accepts "invoke options", either as an object or as varargs depending on the host
language. The options are as follows:

| Option | Explanation                                                  |
|--------|--------------------------------------------------------------|
| parent | Supply a parent resource, which will be used to determine default providers |
| provider | Supply the provider to use explicitly. |
| version | Use exactly this version of the provider plugin. |
| pluginDownloadURL | Download the provider plugin from this URL. The download URL is otherwise inferred from the provider package. |
| _async_ | _This option is deprecated and will be removed in a future release_ |

The `parent` option has a similar purpose to the [parent option]({{< relref "/docs/intro/concepts/resources/options/parent" >}}) used when creating a resource. The parent is consulted when determining the provider to use.

The `provider` option gives an explicit provider to use when running the invoked function. This is useful, for example, if you want to invoke a function in each of a set of AWS regions.

The `version` option specifies an exact version for the provider plugin. This can be used when you need to pin to a specific version to avoid a backward-incompatible change.

The `pluginDownloadURL` option gives a URL for fetching the provider plugin. It may be necessary to supply this for third-party packages (those not hosted at [https://get.pulumi.com](https://get.pulumi.com)).
