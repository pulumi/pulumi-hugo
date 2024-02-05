---
title_tag: "Accessing Outputs"
meta_desc: "Learn how to access a single Output as well as multiple Outputs in Pulumi."
title: Accessing outputs
h1: Accessing outputs
meta_image: /images/docs/meta-images/docs-meta.png
menu:
  concepts:
    weight: 1
    parent: inputs-outputs
---

TBD

## Apply

To access the _plain_ (or returned) value of an output, use {{< pulumi-apply >}}. This method accepts a callback that will be invoked with the plain value, once that value is available.

This example will wait for the value to be returned from the API and print it to stdout

{{< chooser language "javascript,typescript,python,go,csharp,java" >}}

{{% choosable language javascript %}}

```javascript
let myPet = new random.RandomPet("my-pet")
myPet.id.apply(id => console.log(`Hello, {id}!`))
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
const myPet = new random.RandomPet("my-pet")
myPet.id.apply(id => console.log(`Hello, {id}!`))
```

{{% /choosable %}}
{{% choosable language python %}}

```python
my_pet = random.RandomPet("my-pet")
my_pet.id.apply(lambda id: print(f"Hello, {id}!"))
```

{{% /choosable %}}
{{% choosable language go %}}

```go
myPet, err := random.NewRandomPet(ctx, "my-pet", &random.RandomPetArgs{})
if err != nil {
	return err
}

myPet.ID().ApplyT(func(id string) error {
    fmt.Printf("Hello, %s!", id)
	return nil
})
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var myPet = new Pulumi.Random.RandomPet("my-pet", new(){});
myPet.Id.Apply(id => { Console.WriteLine($"Hello, {id}!"); return id; });
```

{{% /choosable %}}
{{% choosable language java %}}

```java
var myId = new RandomPet("my-pet", RandomPetArgs.builder()
    .build());

myId.id().applyValue(i -> {
    System.out.println("Hello," + i + "!");
    return null;
});
```

{{% /choosable %}}

{{< /chooser >}}

You can use this same process to create new output values to pass as inputs to another resource, for example, the following code creates an HTTPS URL from the DNS name (the plain value) of a virtual machine:

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" >}}

{{% choosable language javascript %}}

```javascript
let url = virtualmachine.dnsName.apply(dnsName => "https://" + dnsName);
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
let url = virtualmachine.dnsName.apply(dnsName => "https://" + dnsName);
```

{{% /choosable %}}
{{% choosable language python %}}

```python
url = virtual_machine.dns_name.apply(
    lambda dns_name: "https://" + dns_name
)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
url := vpc.DnsName.ApplyT(func(dnsName string) string {
    return "https://" + dnsName
}).(pulumi.StringOutput)
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var url = virtualmachine.DnsName.Apply(dnsName => "https://" + dnsName);
```

{{% /choosable %}}
{{% choosable language java %}}

```java
var url = virtualmachine.dnsName().applyValue(dnsName -> "https://" + dnsName);
```

{{% /choosable %}}
{{% choosable language yaml %}}

```yaml
variables:
  url: https://${virtualmachine.DnsName}
```

{{% /choosable %}}

{{< /chooser >}}

The result of the call to {{< pulumi-apply >}} is a new Output<T>. So in this example, the url variable is also an {{< pulumi-output >}}. It will wait for the new value to be returned from the callback, and carries the dependencies of the original Output<T>. If the callback itself returns an Output<T>, the dependencies of that output are also kept in the resulting Output<T>.

{{% notes %}}
During some program executions, `apply` doesn’t run. For example, it won’t run during a preview, when resource output values may be unknown. Therefore, you should avoid side-effects within the callbacks. For this reason, you should not allocate new resources inside of your callbacks either, as it could lead to `pulumi preview` being wrong.
{{% /notes %}}

## All { search.keywords="pulumi.all" }

If you have multiple outputs and need to use them together, the `all` function acts like an `apply` over many resources, allowing you to use multiple outputs when creating a new output. `all` waits for all output values to become available and then provides them as _plain values_ to the supplied callback. This function can be used to compute an entirely new output value, such as by adding or concatenating outputs from two different resources together, or by creating a new data structure that uses them. Just like with `apply`, the result of `all` is itself an Output<T>.

For example, let’s use a server and a database name to create a database connection string:

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" >}}

{{% choosable language javascript %}}

```javascript
var pulumi = require("@pulumi/pulumi");
// ...
let connectionString = pulumi.all([sqlServer.name, database.name])
    .apply(([server, db]) => `Server=tcp:${server}.database.windows.net;initial catalog=${db}...`);
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
// ...
let connectionString = pulumi.all([sqlServer.name, database.name])
    .apply(([server, db]) => `Server=tcp:${server}.database.windows.net;initial catalog=${db}...`);
```

{{% /choosable %}}
{{% choosable language python %}}

In python, you can pass in unnamed arguments to `Output.all` to create an Output list, for example:

```python
from pulumi import Output
# ...
connection_string = Output.all(sql_server.name, database.name) \
    .apply(lambda args: f"Server=tcp:{args[0]}.database.windows.net;initial catalog={args[1]}...")
```

Or, you can pass in named (keyword) arguments to `Output.all` to create an Output dictionary, for example:

```python
from pulumi import Output
# ...
connection_string = Output.all(server=sql_server.name, db=database.name) \
    .apply(lambda args: f"Server=tcp:{args['server']}.database.windows.net;initial catalog={args['db']}...")
```

{{% /choosable %}}
{{% choosable language go %}}

```go

connectionString := pulumi.All(sqlServer.Name, database.Name).ApplyT(
    func (args []interface{}) pulumi.StringOutput  {
        server := args[0]
        db := args[1]
        return pulumi.Sprintf("Server=tcp:%s.database.windows.net;initial catalog=%s...", server, db)
    },
)
```

{{% notes %}}
**A note on error handling** The function `ApplyT` spawns a Goroutine to await the availability of the implicated dependencies. This function accepts a `T` or `(T, error)` signature; the latter accomodates for error handling. Alternatively, one may use the `ApplyTWithContext` function in which the provided context can be used to reject the output as canceled. Error handling may also be achieved using an `error` `chan`.
{{% /notes %}}
{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
// When all the input values have the same type, Output.All can be used and produces an ImmutableArray.
var connectionString = Output.All(sqlServer.name, database.name)
    .Apply(t => $"Server=tcp:{t[0]}.database.windows.net;initial catalog={t[1]}...");

// For more flexibility, 'Output.Tuple' is used so that each unwrapped value will preserve their distinct type.
var connectionString2 = Output.Tuple(sqlServer.name, database.name)
    .Apply(t => $"Server=tcp:{t.Item1}.database.windows.net;initial catalog={t.Item2}...");

// Or using a more natural Tuple syntax and a statement lambda expression.
var connectionString2 = Output.Tuple(sqlServer.name, database.name).Apply(t =>
{
    var (serverName, databaseName) = t;
    return $"Server=tcp:{serverName}.database.windows.net;initial catalog={databaseName}...";
});
```

{{% /choosable %}}
{{% choosable language java %}}

```java
// When all the input values have the same type, Output.all can be used
var connectionString = Output.all(sqlServer.name(), database.name())
        .applyValue(t -> String.format("Server=tcp:%s.database.windows.net;initial catalog=%s...", t.get(0), t.get(1));

// For more flexibility, 'Output.tuple' is used so that each unwrapped value will preserve their distinct type.
var connectionString2 = Output.tuple(sqlServer.name, database.name)
        .applyValue(t -> String.format("Server=tcp:%s.database.windows.net;initial catalog=%s...", t.t1, t.t2));
```

{{% /choosable %}}
{{% choosable language yaml %}}

```yaml
variables:
  connectionString: Server=tcp:${sqlServer.name}.database.windows.net;initial catalog=${database.name}...
```

{{% /choosable %}}

{{< /chooser >}}

Notice that `all` works by returning an output that represents the combination of multiple outputs so that, within the callback, the plain values are available inside of a tuple.
