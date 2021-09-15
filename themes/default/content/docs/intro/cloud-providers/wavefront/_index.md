---
title: Wavefront
meta_desc: This page provides an overview of the Wavefront Provider for Pulumi.
menu:
  intro:
    parent: cloud-providers
    identifier: clouds-wavefront
    weight: 2
---

The Wavefront provider for Pulumi can be used to provision any of the cloud resources available in [Wavefront](https://www.wavefront.com/).
The Wavefront provider must be configured with credentials to deploy and update resources in Wavefront.
## Example

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
const wavefront = require("@pulumi/wavefront")

const user = new wavefront.User("demo-ts", {
    email: "test+ts@mycompany.io"
});
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
import * as wavefront from "@pulumi/wavefront";

const user = new wavefront.User("demo-ts", {
    email: "test+ts@mycompany.io"
});

```

{{% /choosable %}}
{{% choosable language python %}}

```python
import pulumi_wavefront as wavefront

user = wavefront.User("demo-py",
          email="test+py@mycompany.io")
```

{{% /choosable %}}
{{% choosable language go %}}

```go
import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi-wavefront/sdk/go/wavefront"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		user, err := wavefront.NewUser(ctx, "demo", &wavefront.UserArgs{
			Email: pulumi.String("test+go@mycompany.io"),
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
using Pulumi.Wavefront;

class Program
{
    static Task Main() =>
        Deployment.Run(() => {
            var user = new User("demo", new UserArgs
            {
                Email = "test+cs@mycompany.io",
            });
        });
}
```

{{% /choosable %}}

{{< /chooser >}}

## Libraries

The following packages are available in packager managers:

* JavaScript/TypeScript: [`@pulumi/wavefront`](https://www.npmjs.com/package/@pulumi/wavefront)
* Python: [`pulumi-wavefront`](https://pypi.org/project/pulumi-wavefront/)
* Go: [`github.com/pulumi/pulumi-wavefront/sdk/go/wavefront`](https://github.com/pulumi/pulumi-wavefront)
* .NET: [`Pulumi.Wavefront`](https://www.nuget.org/packages/Pulumi.Wavefront)

The Wavefront provider is open source and available in the [pulumi/pulumi-wavefront](https://github.com/pulumi/pulumi-wavefront) repo.
