---
title: "Protect"
meta_desc: An in depth look at Pulumi resources and their usage.
menu:
  intro:
    parent: options
    weight: 9
---

The `protect` resource option marks a resource as protected. A protected resource cannot be deleted directly. Instead, you must first set `protect: false` and run `pulumi up`. Then you can delete the resource by removing the line of code or by running `pulumi destroy`. The default is to inherit this value from the parent resource, and `false` for resources without a parent.

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
let db = new Database("db", {}, { protect: true});
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
let db = new Database("db", {}, { protect: true});
```

{{% /choosable %}}
{{% choosable language python %}}

```python
db = Database("db", opts=ResourceOptions(protect=True))
```

{{% /choosable %}}
{{% choosable language go %}}

```go
db, _ := NewDatabase(ctx, "db", &DatabaseArgs{}, pulumi.Protect(true));
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var db = new Database("db", new DatabaseArgs(),
    new CustomResourceOptions { Protect = true });
```

{{% /choosable %}}

{{< /chooser >}}
