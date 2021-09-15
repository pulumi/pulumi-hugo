---
title: Cloudflare
meta_desc: This page provides an overview of the Cloudflare Provider for Pulumi.
menu:
  intro:
    parent: cloud-providers
    identifier: clouds-cloudflare
    weight: 2
---

The Cloudflare provider for Pulumi can be used to provision any of the resources available in [Cloudflare](https://www.cloudflare.com/).

## Example

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
const cloudflare = require("@pulumi/cloudflare")

const record = new cloudflare.Record("sample-record", {
  name: "my-record",
  zoneId: "xxsdfhsfkashadf",
  type: "A",
  value: "192.168.0.11",
  ttl: 3600
});
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
import * as cloudflare from "@pulumi/cloudflare";

const record = new cloudflare.Record("sample-record", {
  name: "my-record",
  zoneId: "xxsdfhsfkashadf",
  type: "A",
  value: "192.168.0.11",
  ttl: 3600
});
```

{{% /choosable %}}
{{% choosable language python %}}

```python
import pulumi_cloudflare as cloudflare

record = cloudflare.Record("sample-record",
  name="my-record",
  zone_id="xxsdfhsfkashadf",
  type="A",
  value="192.168.0.11",
  ttl=3600
)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	cloudflare "github.com/pulumi/pulumi-cloudflare/sdk/v3/go/cloudflare"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		record, err := cloudflare.NewRecord(ctx, "sample-record", &cloudflare.RecordArgs{
			Name:   pulumi.String("my-record"),
			ZoneId: pulumi.String("xxsdfhsfkashadf"),
			Type:   pulumi.String("A"),
			Value:  pulumi.String("192.168.0.11"),
			Ttl:    pulumi.Int(3600),
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
using Pulumi.Cloudflare;

class Program
{
    static Task Main() =>
        Deployment.Run(() => {
            var record = new Cloudflare.Record("sample-record", new Cloudflare.RecordArgs
            {
                Name = "my-record",
                ZoneId = "xxsdfhsfkashadf",
                Type = "A",
                Value = "192.168.0.11",
                Ttl = 3600,
            });
        });
}
```

{{% /choosable %}}

{{< /chooser >}}

## Libraries

The following packages are available in packager managers:

* JavaScript/TypeScript: [`@pulumi/cloudflare`](https://www.npmjs.com/package/@pulumi/cloudflare)
* Python: [`pulumi-cloudflare`](https://pypi.org/project/pulumi-cloudflare/)
* Go: [`github.com/pulumi/pulumi-cloudflare/sdk/v3/go/cloudflare`](https://github.com/pulumi/pulumi-cloudflare)
* .NET: [`Pulumi.Cloudflare`](https://www.nuget.org/packages/Pulumi.Cloudflare)
