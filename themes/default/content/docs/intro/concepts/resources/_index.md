---
title: "Resources"
meta_desc: An in depth look at Pulumi resources and their usage.
menu:
  intro:
    identifier: resources
    parent: concepts
    weight: 4
---

<script>
    // The following list maps the headings that previously appeared on this page to their new locations.
    // We use this list to determine whether we can redirect visitors from the old content to the new.
    var redirects = {
        "#options": "/docs/intro/concepts/resources/options",
        "#additionalsecretoutputs": "/docs/intro/concepts/resources/options/additionalsecretoutputs",
        "#aliases": "/docs/intro/concepts/resources/options/aliases",
        "#customtimeouts": "/docs/intro/concepts/resources/options/customtimeouts",
        "#deletebeforereplace": "/docs/intro/concepts/resources/options/deletebeforereplace",
        "#dependson": "/docs/intro/concepts/resources/options/dependson",
        "#ignorechanges": "/docs/intro/concepts/resources/options/ignorechanges",
        "#import": "/docs/intro/concepts/resources/options/import",
        "#parent": "/docs/intro/concepts/resources/options/parent",
        "#protect": "/docs/intro/concepts/resources/options/protect",
        "#provider": "/docs/intro/concepts/resources/options/provider",
        "#replaceonchanges": "/docs/intro/concepts/resources/options/replaceonchanges",
        "#transformations": "/docs/intro/concepts/resources/options/transformations",
        "#version": "/docs/intro/concepts/resources/options/version",
        
        "#components": "/docs/intro/concepts/resources/components",
        "#authoring-a-new-component-resource": "/docs/intro/concepts/resources/components/#authoring-a-new-component-resource",
        "#creating-a-child-resource": "/docs/intro/concepts/resources/components/#creating-a-child-resource",
        "#registering-component-outputs": "/docs/intro/concepts/resources/components/#registering-component-outputs",
        "#inheriting-resource-providers": "/docs/intro/concepts/resources/components/#inheriting-resource-providers",

        "#providers": "/docs/intro/concepts/resources/providers",
        "#default-provider-configuration": "/docs/intro/concepts/resources/providers/#default-provider-configuration",
        "#explicit-provider-configuration": "/docs/intro/concepts/resources/providers/#explicit-provider-configuration",
        
        "#dynamicproviders": "/docs/intro/concepts/resources/dynamicproviders",
    };

    var redirect = redirects[location.hash];
    if (redirect) {
        location.href = redirect;
    }
</script>


Resources represent the fundamental units that make up your cloud infrastructure, such as a compute instance, a storage bucket, or a Kubernetes cluster.

All infrastructure resources are described by one of two subclasses of the `Resource` class. These two subclasses are:

- `CustomResource`: A custom resource is a cloud resource managed by a [resource provider]({{< relref "providers" >}}) such as AWS, Microsoft Azure, Google Cloud or Kubernetes.
- `ComponentResource`: A [component resource]({{< relref "components" >}}) is a logical grouping of other resources that creates a larger, higher-level abstraction that encapsulates its implementation details.

## Creating a Resource

A resource’s desired state is declared by constructing an instance of the resource:

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
let res = new Resource(name, args, options);
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
let res = new Resource(name, args, options);
```

{{% /choosable %}}
{{% choosable language python %}}

```python
res = Resource(name, args, options)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
res, err := NewResource(ctx, name, args, opt1, opt2)
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var res = new Resource(name, args, options);
```

{{% /choosable %}}

{{< /chooser >}}

All resources have a required [`name`]({{< relref "#names" >}}) argument, which must be unique across resources of the same kind in a [`stack`]({{< relref "/docs/intro/concepts/stack" >}}). This *logical name* influences the *physical name* assigned by your infrastructure’s cloud provider. Pulumi [auto-names]({{< relref "#autonaming" >}}) physical resources by default, so the physical name and the logical name may differ. This auto-naming behavior can be overridden, if required.

The [`args`]({{< relref "#args" >}}) argument is an object with a set of named property input values that are used to initialize the resource. These can be normal raw values—such as strings, integers, lists, and maps—or outputs from other resources. For more information, see [Inputs and Outputs]({{< relref "docs/intro/concepts/inputs-outputs" >}}).

The [`options`]({{< relref "options" >}}) argument is optional, but lets you control certain aspects of the resource. For example, you can show explicit dependencies, use a custom provider configuration, or import an existing infrastructure.

## Resource Names {#names}

Every resource managed by Pulumi has a logical name that you specify as an argument to its constructor. For instance, the logical name of this IAM role is `my-role`:

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
let role = new aws.iam.Role("my-role");
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
let role = new aws.iam.Role("my-role");
```

{{% /choosable %}}
{{% choosable language python %}}

```python
role = iam.Role("my-role")
```

{{% /choosable %}}
{{% choosable language go %}}

```go
role, err := iam.NewRole(ctx, "my-role", &iam.RoleArgs{})
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var role = new Aws.Iam.Role("my-role");
```

{{% /choosable %}}

{{< /chooser >}}

The logical name you specify during resource creation is used in two ways:

- As a default prefix for the resource’s physical name, assigned by the cloud provider.
- To construct the [Universal Resource Name (URN)]({{< relref "#urns" >}}) used to track the resource across updates.

Pulumi uses the logical name to track the identity of a resource through multiple deployments of the same program and uses it to choose between creating new resources or updating existing ones.

The variable names assigned to resource objects are not used for either logical or physical resource naming. The variable only refers to that resource in the program. For example, in this code:

```typescript
var foo = new aws.Thing("my-thing");
```

The variable name `foo` has no bearing at all on the resulting infrastructure. You could change it to another name, run `pulumi up`, and the result would be no changes. The only exception is if you export that variable, in which case the name of the export would change to the new name.

### Physical Names and Auto-Naming {#autonaming}

A resource’s logical and physical names may not match. In fact, most physical resource names in Pulumi are, by default, auto-named. As a result, even if your IAM role has a logical name of `my-role`, the physical name will typically look something like `my-role-d7c2fa0`. The suffix appended to the end of the name is random.

This random suffix serves two purposes:

- It ensures that two stacks for the same project can be deployed without their resources colliding. The suffix helps you to create multiple instances of your project more easily, whether because you want, for example, many development or testing stacks, or to scale to new regions.
- It allows Pulumi to do zero-downtime resource updates. Due to the way some cloud providers work, certain updates require replacing resources rather than updating them in place. By default, Pulumi creates replacements first, then updates the existing references to them, and finally deletes the old resources.

For cases that require specific names, you can override auto-naming by specifying a physical name. Most resources have a `name` property that you can use to name the resource yourself. Specify your name in the argument object to the constructor. Here’s an example.

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
let role = new aws.iam.Role("my-role", {
    name: "my-role-001",
});
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
let role = new aws.iam.Role("my-role", {
    name: "my-role-001",
});
```

{{% /choosable %}}
{{% choosable language python %}}

```python
role = iam.Role('my-role', {
    name='my-role-001'
})
```

{{% /choosable %}}
{{% choosable language go %}}

```go
role, err := iam.NewRole(ctx, "my-role", &iam.RoleArgs{
    Name: pulumi.String("my-role-001"),
})
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var role = new Aws.Iam.Role("my-role", new Aws.Iam.RoleArgs
{
    Name = "my-role-001",
});
```

{{% /choosable %}}

{{< /chooser >}}

If the `name` property is not available on a resource, consult the [Registry]({{< relref "/registry" >}}) for the specific resource you are creating. Some resources use a different property to override auto-naming. For instance, the `aws.s3.Bucket` type uses the property `bucket` instead of name. Other resources, such as `aws.kms.Key`, do not have physical names and use other auto-generated IDs to uniquely identify them.

Overriding auto-naming makes your project susceptible to naming collisions. As a result, for resources that may need to be replaced, you should specify `deleteBeforeReplace: true` in the resource’s options. This option ensures that old resources are deleted before new ones are created, which will prevent those collisions.

Because physical and logical names do not need to match, you can construct the physical name by using your project and stack names. Similarly to auto-naming, this approach protects you from naming collisions while still having meaningful names. Note that `deleteBeforeReplace` is still necessary:

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
let role = new aws.iam.Role("my-role", {
    name: "my-role-" + pulumi.getProject() + "-" + pulumi.getStack(),
}, { deleteBeforeReplace: true });
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
let role = new aws.iam.Role("my-role", {
    name: `my-role-${pulumi.getProject()}-${pulumi.getStack()}`,
}, { deleteBeforeReplace: true });
```

{{% /choosable %}}
{{% choosable language python %}}

```python
role = iam.Role('my-role', {
    name='my-role-{}-{}'.format(pulumi.get_project(), pulumi.get_stack())
}, opts=ResourceOptions(delete_before_replace=True))
```

{{% /choosable %}}
{{% choosable language go %}}

```go
role, _ := iam.NewRole(ctx, "my-role", &iam.RoleArgs{
    Name: fmt.Sprintf("my-role-%s-%s", ctx.Project(), ctx.Stack()),
}, pulumi.DeleteBeforeReplace(true))
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var role = new Aws.Iam.Role("my-role", new Aws.Iam.RoleArgs
    {
        Name = string.Format($"my-role-{Deployment.Instance.ProjectName}-{Deployment.Instance.StackName}"),
    },
    new CustomResourceOptions { DeleteBeforeReplace = true }
);
```

{{% /choosable %}}

{{< /chooser >}}

### Resource URNs {#urns}

Each resource is assigned a [Uniform Resource Name (URN)](https://en.wikipedia.org/wiki/Uniform_Resource_Name) that uniquely identifies that resource globally. Unless you are writing a tool, you will seldom need to interact with an URN directly, but it is fundamental to how Pulumi works so it’s good to have a general understanding of it.

The URN is automatically constructed from the project name, stack name, resource name, resource type, and the types of all the parent resources (in the case of [component resources]({{< relref "#components" >}})).

The following is an example of a URN:

```text
urn:pulumi:production::acmecorp-website::custom:resources:Resource$aws:s3/bucket:Bucket::my-bucket
        ^^^^^^^^^^  ^^^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^  ^^^^^^^^^
        <stack-name>  <project-name>        <parent-type>          <resource-type>  <resource-name>
```

The URN must be globally unique. This means all of the components that go into a URN must be unique within your program. If you create two resources with the same name, type, and parent path, for instance, you will see an error:

```bash
error: Duplicate resource URN 'urn:pulumi:production::acmecorp-website::custom:resources:Resource$aws:s3/bucket:Bucket::my-bucket'; try giving it a unique name
```

Any change to the URN of a resource causes the old and new resources to be treated as unrelated—the new one will be created (since it was not in the prior state) and the old one will be deleted (since it is not in the new desired state). This behavior happens when you change the `name` used to construct the resource or the structure of a resource’s parent hierarchy.

Both of these operations will lead to a different URN, and thus require the `create` and `delete` operations instead of an `update` or `replace` operation that you would use for an existing resource. In other words, be careful when you change a resource’s name.

{{% notes "info" %}}
If you’d like to rename a resource without destroying the old one, refer to the [aliases]({{< relref "#aliases" >}}) resource option.
{{% /notes %}}

Resources constructed as children of a component resource should ensure their names are unique across multiple instances of the component resource. In general, the name of the component resource instance itself (the `name` parameter passed into the component resource constructor) should be used as part of the name of the child resources.

## Resource Arguments {#args}

A resource’s argument parameters differ by resource type. Each resource has a number of named input properties that control the behavior of the resulting infrastructure. To determine what arguments a resource supports, refer to that resource’s API documentation in the [Registry]({{< relref "/registry" >}}).

## Resource Getter Functions {#resource-get}

You can use the static `get` function, which is available on all resource types, to look up an existing resource’s ID. The `get` function is different from the `import` function. The difference is that, although the resulting resource object’s state will match the live state from an existing environment, the resource will not be managed by Pulumi. A resource read with the `get` function will never be updated or deleted by Pulumi during an update.

You can use the `get` function to consume properties from a resource that was provisioned elsewhere. For example, this program reads an existing EC2 Security Group whose ID is `sg-0dfd33cdac25b1ec9` and uses the result as input to create an EC2 Instance that Pulumi will manage:

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
let aws = require("@pulumi/aws");

let group = aws.ec2.SecurityGroup.get("group", "sg-0dfd33cdac25b1ec9");

let server = new aws.ec2.Instance("web-server", {
    ami: "ami-6869aa05",
    instanceType: "t2.micro",
    securityGroups: [ group.name ], // reference the security group resource above
});
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
import * as aws from "@pulumi/aws";

let group = aws.ec2.SecurityGroup.get("group", "sg-0dfd33cdac25b1ec9");

let server = new aws.ec2.Instance("web-server", {
    ami: "ami-6869aa05",
    instanceType: "t2.micro",
    securityGroups: [ group.name ], // reference the security group resource above
});
```

{{% /choosable %}}
{{% choosable language python %}}

```python
import pulumi_aws as aws

group = aws.ec2.SecurityGroup.get('group', 'sg-0dfd33cdac25b1ec9')

server = aws.ec2.Instance('web-server',
    ami='ami-6869aa05',
    instance_type='t2.micro',
    security_groups=[group.name]) # reference the security group resource above
```

{{% /choosable %}}
{{% choosable language go %}}

```go
import (
    "github.com/pulumi/pulumi-aws/sdk/v4/go/aws/ec2"
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
    pulumi.Run(func(ctx *pulumi.Context) error {
        group, err := ec2.GetSecurityGroup(ctx, "group", pulumi.ID("sg-0dfd33cdac25b1ec9"), nil)
        if err != nil {
            return err
        }
        server, err := ec2.NewInstance(ctx, "web-server", &ec2.InstanceArgs{
            Ami:            pulumi.String("ami-6869aa05"),
            InstanceType:   pulumi.String("t2.micro"),
            SecurityGroups: pulumi.StringArray{group.Name},
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
using Pulumi;
using Pulumi.Aws.Ec2;
using Pulumi.Aws.Ec2.Inputs;

class MyStack : Stack
{
    public MyStack()
    {
        var group = SecurityGroup.Get("group", "sg-0dfd33cdac25b1ec9");

        var server = new Instance("web-server", new InstanceArgs {
            Ami = "ami-6869aa05",
            InstanceType = "t2.micro",
            SecurityGroups = { group.Name }
        });
    }
}
```

{{% /choosable %}}

{{< /chooser >}}

Two values are passed to the `get` function - the logical name Pulumi will use to refer to the resource, and the physical ID that the resource has in the target cloud.

Importantly, Pulumi will never attempt to modify the security group in this example. It simply reads back the state from your currently configured cloud account and then uses it as input for the new EC2 Instance.