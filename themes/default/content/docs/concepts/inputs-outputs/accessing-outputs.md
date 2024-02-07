---
title_tag: "Accessing Outputs | Inputs and Outputs"
meta_desc: "Learn how to access a single output as well as multiple outputs in Pulumi."
title: Accessing outputs
h1: Accessing outputs
meta_image: /images/docs/meta-images/docs-meta.png
menu:
  concepts:
    weight: 2
    parent: inputs-outputs
---

Outputs are asynchronous, meaining their actual plain values are not immediately available. As such, there are limitations on the ways in which you can retrieve these values.

To demonstrate, let's say we have the following simple program that creates a VPC resource in AWS. In this program, we have added a print statement to print the `vpc` variable so that we can see the properties of this resource.

```python
import pulumi
import pulumi_awsx as awsx

vpc = awsx.ec2.Vpc("vpc")

print(vpc)
```

However, deploying this program will show CLI output similar to the following:

```bash
# Truncated CLI output
Updating (pulumi/dev)

     Type                                          Name           Status              Info
 +   pulumi:pulumi:Stack                           aws-iac-dev    created (0.52s)     1 message
 +   └─ awsx:ec2:Vpc                               vpc            created (1s)
 +      └─ aws:ec2:Vpc                             vpc            created (1s)
 +         ├─ aws:ec2:Subnet                       vpc-private-3  created (0.87s)
...
...

Diagnostics:
  pulumi:pulumi:Stack (aws-iac-dev):
    <pulumi_awsx.ec2.vpc.Vpc object at 0x7f77ac256130>

Resources:
    + 34 created

Duration: 2m17s
```

Instead of a JSON representation of the VPC resource, the `<pulumi_awsx.ec2.vpc.Vpc object at 0x7f77ac256130>` value is what is printed instead. This is because the VPC class of Pulumi's AWSX library does not provide a custom `String` method that outputs the JSON representation of the VPC (is this correct?). Instead, it provides the default representation, which includes the object's memory address.

Because outputs represent the properties of a resource whose values will only exist after the program is executed, you can't directly print out all the properties of the VPC as a JSON object using a regular print statement. The actual values of these properties are not yet determined at the time the code runs (i.e. when the print statement would run); they are determined asynchronously when Pulumi applies the plan to the target cloud environment.

Ultimately, if you want to print the properties of the VPC, you can do so using one of two methods:

- Use Pulumi's built in `export` function to export the value as a stack output
- Access individual properties using `apply`

Let's examine the first method, using `export`. We can remove the print statement from our code and replace it with the following:

```python
import pulumi
import pulumi_awsx as awsx

vpc = awsx.ec2.Vpc("vpc")

pulumi.export("vpcInfo", vpc)
```

Deploying this updated program will show CLI output similar to the following:

```bash
# Truncated CLI output
Updating (pulumi/dev)

     Type                 Name         Status
     pulumi:pulumi:Stack  aws-iac-dev

Outputs:
  + vpcInfo: {
      ...
      ...
      + eips                                : [
      +     [0]: {
              + address                  : <null>
              + allocation_id            : "eipalloc-0cd40efc7f7d1e072"
              + association_id           : ""
              ...
              ...
            }
            ...
            ...
        ]
        ...
      + internet_gateway                    : {
          + arn     : "arn:aws:ec2:eu-central-1:616138583583:internet-gateway/igw-04b18ed366067bdfc"
          + id      : "igw-04b18ed366067bdfc"
          + owner_id: "616138583583"
          + tags    : {
              + Name: "vpc"
            }
          + tags_all: [secret]
          + urn     : "urn:pulumi:dev::aws-iac::awsx:ec2:Vpc$aws:ec2/vpc:Vpc$aws:ec2/internetGateway:InternetGateway::vpc"
          + vpc_id  : "vpc-0f8a025738f2fbf2f"
        }
        ...
        ...
      + isolated_subnet_ids                 : []
      + nat_gateways                        : [...]
      + route_table_associations            : [...]
      + route_tables                        : [...]
      + routes                              : [...]
        ...
        ...
      + subnets                             : [...]
      + tags                                : <null>
      + urn                                 : "urn:pulumi:dev::aws-iac::awsx:ec2:Vpc::vpc"
      + vpc                                 : {...}
      + vpc_endpoint_specs                  : <null>
      + vpc_endpoints                       : []
      + vpc_id                              : "vpc-0f8a025738f2fbf2f"
    }

Resources:
    34 unchanged

Duration: 21s
```

Note: You can see a full example of the JSON output by viewing [this gist](https://gist.github.com/toriancrane/e84368a1aa1684390ce34224e8291743) and you can learn more about Stack Outputs by refering to [the Stack Outputs and References tutorial](/docs/using-pulumi/stack-outputs-and-references/).

Exporting the value will enable you to see the full list and format of the properties of the VPC resource once it has been created. All of the properties presented here are of type Output[T]. If you want to access the value of a specific property, you will need to use the second method: `apply`.

## Accessing single outputs with Apply

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

## Accessing multiple outputs with All { search.keywords="pulumi.all" }

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

## Accessing nested properties through Lifting

** Add a note to this section that if receive error using lifting then to try with apply instead?

While often, Outputs return asynchronous values that wrap primitive types like strings or integers, sometimes an output has an object with deeply nested values. These properties need to be passed to other inputs as well.

For example, to read a domain record from an ACM certificate, you need to access the domain validation options, which returns an array. Because that value is an output, we would normally need to use {{< pulumi-apply >}}:

{{< chooser language "javascript,typescript,python,go,csharp,java" >}}

{{% choosable language javascript %}}

```javascript
let certCertificate = new aws.acm.Certificate("cert", {
    domainName: "example.com",
    validationMethod: "DNS",
});
let certValidation = new aws.route53.Record("cert_validation", {
    records: [
        // Need to pass along a deep subproperty of this Output
        certCertificate.domainValidationOptions.apply(
            domainValidationOptions => domainValidationOptions[0].resourceRecordValue),
    ],
    ...
});
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
let certCertificate = new aws.acm.Certificate("cert", {
    domainName: "example.com",
    validationMethod: "DNS",
});
let certValidation = new aws.route53.Record("cert_validation", {
    records: [
        // Need to pass along a deep subproperty of this Output
        certCertificate.domainValidationOptions.apply(
            domainValidationOptions => domainValidationOptions[0].resourceRecordValue),
    ],
    ...
});
```

{{% /choosable %}}
{{% choosable language python %}}

```python
certificate = aws.acm.Certificate('cert',
    domain_name='example.com',
    validation_method='DNS'
)

record = aws.route53.Record('validation',
    records=[
        # Need to pass along a deep subproperty of this Output
        certificate.domain_validation_options.apply(
            lambda domain_validation_options: domain_validation_options[0]['resourceRecordValue']
        )
    ],
    ...
)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
cert, err := acm.NewCertificate(ctx, "cert", &acm.CertificateArgs{
    DomainName:       pulumi.String("example"),
    ValidationMethod: pulumi.String("DNS"),
})
if err != nil {
    return err
}

record, err := route53.NewRecord(ctx, "validation", &route53.RecordArgs{
    Records: pulumi.StringArray{
        cert.DomainValidationOptions.ApplyT(func(opts []acm.CertificateDomainValidationOption) string {
            return *opts[0].ResourceRecordValue
        }).(pulumi.StringOutput),
    },
    ...
})
if err != nil {
    return err
}
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var cert = new Certificate("cert", new CertificateArgs
{
    DomainName = "example",
    ValidationMethod = "DNS",
});

var record = new Record("validation", new RecordArgs
{
    Records = {
        cert.DomainValidationOptions.Apply(opts => opts[0].ResourceRecordValue!)
    },
    ...
});
```

{{% /choosable %}}
{{% choosable language java %}}

```java
var cert = new Certificate("cert",
    CertificateArgs.builder()
        .domainName("example")
        .validationMethod("DNS")
        .build());

var record = new Record("validation",
    RecordArgs.builder()
        .records(
            cert.domainValidationOptions()
            .applyValue(opts -> opts.get(0).resourceRecordValue().get())
            .applyValue(String::valueOf)
            .applyValue(List::of))
        .build());
```

{{% /choosable %}}

{{< /chooser >}}

Instead, to make it easier to access simple property and array elements, an {{< pulumi-output >}} lifts the properties of the underlying value, behaving very much like an instance of it. Lift allows you to access properties and elements directly from the {{< pulumi-output >}} itself without needing {{< pulumi-apply >}}. If we return to the above example, we can now simplify it:

{{< chooser language "javascript,typescript,python,go,csharp,java,yaml" >}}

{{% choosable language javascript %}}

```javascript
let certCertificate = new aws.acm.Certificate("cert", {
    domainName: "example.com",
    validationMethod: "DNS",
});
let certValidation = new aws.route53.Record("cert_validation", {
    records: [
        certCertificate.domainValidationOptions[0].resourceRecordValue
    ],
...
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
let certCertificate = new aws.acm.Certificate("cert", {
    domainName: "example.com",
    validationMethod: "DNS",
});
let certValidation = new aws.route53.Record("cert_validation", {
    records: [
        certCertificate.domainValidationOptions[0].resourceRecordValue
    ],
...
```

{{% /choosable %}}
{{% choosable language python %}}

```python
certificate = aws.acm.Certificate('cert',
    domain_name='example.com',
    validation_method='DNS'
)

record = aws.route53.Record('validation',
    records=[
        certificate.domain_validation_options[0].resource_record_value
    ],
...
```

{{% /choosable %}}
{{% choosable language go %}}

```go
cert, err := acm.NewCertificate(ctx, "cert", &acm.CertificateArgs{
    DomainName:       pulumi.String("example"),
    ValidationMethod: pulumi.String("DNS"),
})
if err != nil {
    return err
}

record, err := route53.NewRecord(ctx, "validation", &route53.RecordArgs{
    Records: pulumi.StringArray{
        // Notes:
        // * `Index` looks up an index in an `ArrayOutput` and returns a new `Output`.
        // * Accessor methods like `ResourceRecordValue` lookup properties of a custom struct `Output` and return a new `Output`.
        // * `Elem` dereferences a `PtrOutput` to an `Output`, equivalent to `*`.
        cert.DomainValidationOptions.Index(pulumi.Int(0)).ResourceRecordValue().Elem(),
    },
    ...
})
if err != nil {
    return err
}
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var cert = new Certificate("cert", new CertificateArgs
{
    DomainName = "example",
    ValidationMethod = "DNS",
});

var record = new Record("validation", new RecordArgs
{
    // Notes:
    // * `GetAt` looks up an index in an `Output<ImmutableArray<T>>` and returns a new `Output<T>`
    // * There are not yet accessor methods for referencing properties like `ResourceRecordValue` on an `Output<T>` directly,
    //   so the `Apply` is still needed for the property access.
    Records = cert.DomainValidationOptions.GetAt(0).Apply(opt => opt.ResourceRecordValue!),
});
```

{{% /choosable %}}
{{% choosable language java %}}

```java
// Lifting is currently not supported in Java.
```

{{% /choosable %}}
{{% choosable language yaml %}}

```yaml
resources:
  cert:
    type: aws:acm:Certificate
    properties:
      domainName: example
      validationMethod: DNS
  record:
    type: aws:route53:Record
    properties:
      records:
        # YAML handles inputs and outputs transparently.
        - ${cert.domainValidationOptions[0].resourceRecordValue}
```

{{% /choosable %}}

{{< /chooser >}}

This approach is easier to read and write and does not lose any important dependency information that is needed to properly create and maintain the stack. This approach doesn’t work in all cases, but when it does, it can be a great help.

In JavaScript and TypeScript, a ‘lifted’ property access on an `Output<T>` that wraps undefined produces another `Output<T>` with the undefined value instead of throwing or producing a ‘faulted’ `Output<T>`. In other words, lifted property accesses behave like the [`?.` (optional chaining operator)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining) in JavaScript and TypeScript. This behavior makes it much easier to form a chain of property accesses on an `Output<T>`.

{{< chooser language "javascript,typescript" >}}

{{% choosable language javascript %}}

```javascript
let certValidation = new aws.route53.Record("cert_validation", {
  records: [certCertificate.domainValidationOptions[0].resourceRecordValue],

// instead of

let certValidation = new aws.route53.Record("cert_validation", {
  records: [certCertificate.apply(cc => cc ? cc.domainValidationOptions : undefined)
                           .apply(dvo => dvo ? dvo[0] : undefined)
                           .apply(o => o ? o.resourceRecordValue : undefined)],
```

{{% /choosable %}}

{{% choosable language typescript %}}

```typescript
let certValidation = new aws.route53.Record("cert_validation", {
  records: [certCertificate.domainValidationOptions[0].resourceRecordValue],

// instead of

let certValidation = new aws.route53.Record("cert_validation", {
  records: [certCertificate.apply(cc => cc ? cc.domainValidationOptions : undefined)
                           .apply(dvo => dvo ? dvo[0] : undefined)
                           .apply(o => o ? o.resourceRecordValue : undefined)],
```

{{% /choosable %}}

{{< /chooser >}}
