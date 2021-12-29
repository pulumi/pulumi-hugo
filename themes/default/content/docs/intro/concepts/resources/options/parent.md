---
title: "Parent"
meta_desc: An in depth look at Pulumi resources and their usage.
menu:
  intro:
    parent: options
    weight: 8
---

The `parent` resource option specifies a parent for a resource. It is used to associate children with the parents that encapsulate or are responsible for them. Good examples of this are [component resources]({{< relref "../components" >}}). The default behavior is to parent each resource to the implicitly-created `pulumi:pulumi:Stack` component resource that is a root resource for all Pulumi stacks.

For example, this code creates two resources, a parent and child, the latter of which is a child to the former:

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
let parent = new MyResource("parent", {/*...*/});
let child = new MyResource("child", {/*...*/}, { parent: parent });
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
let parent = new MyResource("parent", {/*...*/});
let child = new MyResource("child", {/*...*/}, { parent: parent });
```

{{% /choosable %}}
{{% choosable language python %}}

```python
parent = MyResource("parent");
child = MyResource("child", opts=ResourceOptions(parent=parent));
```

{{% /choosable %}}
{{% choosable language go %}}

```go
parent, _ := NewMyResource(ctx, "parent", &MyResourceArgs{/*...*/})
child, _ := NewMyResource(ctx, "child", &MyResourceArgs{/*...*/}, pulumi.Parent(parent))
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var parent = new MyResource("parent", new MyResourceArgs());
var child = new MyResource("child", new MyResourceArgs(),
    new CustomResourceOptions { Parent = parent });
```

{{% /choosable %}}

{{< /chooser >}}

Using parents can clarify causality or why a given resource was created in the first place. For example, this pulumi up output shows an AWS Virtual Private Cloud (VPC) with two subnets attached to it, and also shows that the VPC directly belongs to the implicit pulumi:pulumi:Stack resource:

```bash
Previewing update (dev):

    Type                       Name                             Plan
    pulumi:pulumi:Stack        parent-demo-dev
+   ├─ awsx:x:ec2:Vpc          default-vpc-866580ff             create
+   │  ├─ awsx:x:ec2:Subnet    default-vpc-866580ff-public-1    create
+   │  └─ awsx:x:ec2:Subnet    default-vpc-866580ff-public-0    create
```
