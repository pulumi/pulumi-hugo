---
title: "RetainOnDelete"
meta_desc: The `retainOnDelete` resource option marks a resource to be retained during a delete operation.
menu:
  intro:
    identifier: retainOnDelete
    parent: options
    weight: 13
---

The `retainOnDelete` resource option marks a resource to be retained. If a resource is retained then when
Pulumi deletes or replaces the resource it will not call through to the resource provider's `Delete` method.
As a result, the resource will not be deleted from the backing cloud provider, but will be removed from the
Pulumi state.

This option can be used for shared resources that other stacks might be making use of.

To actually delete a retained resource, it must first be *unretained*.

* Set `retainOnDelete: false` and then run `pulumi up`

Once the resource is unretained, it can be fully deleted as part of a following update.

If a retained resource is deleted by Pulumi and you later want to actually delete it from the backing cloud provider you will either need to use
your provider's manual interface to find and delete the resource, or import the resource back into Pulumi then
unretain and delete it.

The default is to inherit this value from the parent resource, and `false` for resources without a parent.

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
let db = new Database("db", {}, { retainOnDelete: true});
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
let db = new Database("db", {}, { retainOnDelete: true});
```

{{% /choosable %}}
{{% choosable language python %}}

```python
db = Database("db", opts=ResourceOptions(retain_on_delete=True))
```

{{% /choosable %}}
{{% choosable language go %}}

```go
db, _ := NewDatabase(ctx, "db", &DatabaseArgs{}, pulumi.RetainOnDelete(true));
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var db = new Database("db", new DatabaseArgs(),
    new CustomResourceOptions { RetainOnDelete = true });
```

{{% /choosable %}}

{{< /chooser >}}
