---
title: PostgreSQL
meta_desc: This page provides an overview of the PostgreSQL Provider for Pulumi.
menu:
  intro:
    parent: cloud-providers
    identifier: clouds-postgresql
    weight: 2
---

<img src="/logos/tech/postgresql.png" align="right" class="h-16 px-8 pb-4">

The PostgreSQL provider for Pulumi can be used to provision any of the resources available for PostgreSQL.
The PostgreSQL provider must be configured with credentials to deploy and update resources in PostgreSQL.

See the [full API documentation]({{< relref "/docs/reference/pkg/postgresql" >}}) for complete details of the available PostgreSQL provider APIs.

## Setup

The PostgreSQL provider supports several options for providing access to PostgreSQL credentials.  See the [PostgreSQL setup page]({{< relref "setup" >}}) for details.

## Example

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
const postgresql = require("@pulumi/postgresql")

const myDb = new postgresql.Database("my-database");
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
import * as postgresql from "@pulumi/postgresql";

const myDb = new postgresql.Database("my-database");
```

{{% /choosable %}}
{{% choosable language python %}}

```python
import pulumi_postgresql as postgresql

my_db = postgresql.Database("my-database")
```

{{% /choosable %}}
{{% choosable language go %}}

```go
import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	postgresql "github.com/pulumi/pulumi-postgresql/sdk/v3/go/postgresql"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		myDb, err := postgresql.NewDatabase(ctx, "my-database", &postgresql.DatabaseArgs{})
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
using Pulumi.Postgresql;

class Program
{
    static Task Main() =>
        Deployment.Run(() => {
            mydatabase = new Database("my-database", new DatabaseArgs{});
        });
}
```

{{% /choosable %}}

{{< /chooser >}}

## Libraries

The following packages are available in packager managers:

* JavaScript/TypeScript: [`@pulumi/postgresql`](https://www.npmjs.com/package/@pulumi/postgresql)
* Python: [`pulumi-postgresql`](https://pypi.org/project/pulumi-postgresql/)
* Go: [`github.com/pulumi/pulumi-postgresql/sdk/v3/go/postgresql`](https://github.com/pulumi/pulumi-postgresql)
* .NET: [`Pulumi.Postgresql`](https://www.nuget.org/packages/Pulumi.Postgresql)

The PostgreSQL provider is open source and available in the [pulumi/pulumi-postgresql](https://github.com/pulumi/pulumi-postgresql) repo.
