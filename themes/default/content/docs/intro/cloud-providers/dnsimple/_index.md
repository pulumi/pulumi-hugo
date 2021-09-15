---
title: DNSimple
meta_desc: This page provides an overview of the DNSimple Provider for Pulumi.
menu:
  intro:
    parent: cloud-providers
    identifier: clouds-dnsimple
    weight: 2
---

The DNSimple provider for Pulumi can be used to provision any of the cloud resources available in [DNSimple](https://dnsimple.com/).
The DNSimple provider must be configured with credentials to deploy and update resources in DNSimple.

## Example

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
const dnsimple = require("@pulumi/dnsimple")

const record = new dnsimple.Record("test", {
  name: "test",
  domain: "mydomain.dev",
  type: dnsimple.RecordTypes.CNAME,
  value: "api.devflix.watch.herokudns.com"
});
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
import * as dnsimple from "@pulumi/dnsimple";

const record = new dnsimple.Record("test", {
  name: "test",
  domain: "mydomain.dev",
  type: dnsimple.RecordTypes.CNAME,
  value: "api.devflix.watch.herokudns.com"
});
```

{{% /choosable %}}
{{% choosable language python %}}

```python
import pulumi_dnsimple as dnsimple

record = dnsimple.Record("test",
  name="test",
  domain="mydomain.dev",
  type="CNAME",
  value="api.devflix.watch.herokudns.com"
)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	dnsimple "github.com/pulumi/pulumi-dnsimple/sdk/v3/go/dnsimple"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		record, err := dnsimple.NewRecord(ctx, "test", &dnsimple.RecordArgs{
			Name:   pulumi.String("test"),
			Domain: pulumi.String("mydomain.dev"),
			Type:   pulumi.String("CNAME"),
			Value:  pulumi.String("api.devflix.watch.herokudns.com"),
		})
		if err != nil {
			return err
		}

		return nil
	})
}

```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
using System.Collections.Generic;
using System.Threading.Tasks;
using Pulumi;
using Pulumi.Dnsimple;

class Program
{
    static Task Main() =>
        Deployment.Run(() => {
            var record = new Record("test", new RecordArgs
            {
                Name = "test",
                Domain = "mydomain.dev",
                Type = "CNAME",
                Value = "api.devflix.watch.herokudns.com",
            });
        });
}
```

{{% /choosable %}}

{{< /chooser >}}

## Libraries

The following packages are available in packager managers:

* JavaScript/TypeScript: [`@pulumi/dnsimple`](https://www.npmjs.com/package/@pulumi/dnsimple)
* Python: [`pulumi-dnsimple`](https://pypi.org/project/pulumi-dnsimple/)
* Go: [`github.com/pulumi/pulumi-dnsimple/sdk/v3/go/dnsimple`](https://github.com/pulumi/pulumi-dnsimple)
* .NET: [`Pulumi.Dnsimple`](https://www.nuget.org/packages/Pulumi.Dnsimple)
