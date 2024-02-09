---
title_tag: "Accessing Single Outputs with Apply | Inputs and Outputs"
meta_desc: "Learn how to access a single output value using the apply method in Pulumi."
title: Accessing single outputs with Apply
h1: Accessing single outputs with Apply
meta_image: /images/docs/meta-images/docs-meta.png
menu:
  concepts:
    weight: 2
    parent: inputs-outputs
---

## Overview

Outputs are asynchronous, meaning their actual plain values are not immediately available. As such, there are limitations on the ways in which you can retrieve these values.

To demonstrate, let's say we have the following simple program that creates a VPC resource in AWS. In this program, we have added a print/log statement to print the `vpc` variable so that we can see the properties of this resource.

{{< chooser language "javascript,typescript,python,go,csharp,java" / >}}

{{% choosable language javascript %}}

```javascript
{{< example-program-snippet path="awsx-vpc" language="javascript" from="1" to="3" >}}

{{< example-program-snippet path="awsx-vpc" language="javascript" from="6" to="6" >}}

console.log(vpc);
```

{{% /choosable %}}

{{% choosable language typescript %}}

```typescript
{{< example-program-snippet path="awsx-vpc" language="typescript" from="1" to="2" >}}

{{< example-program-snippet path="awsx-vpc" language="typescript" from="5" to="5" >}}

console.log(vpc);
```

{{% /choosable %}}

{{% choosable language python %}}

```python
{{< example-program-snippet path="awsx-vpc" language="python" from="1" to="2" >}}

{{< example-program-snippet path="awsx-vpc" language="python" from="5" to="5" >}}

print(vpc)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
{{< example-program-snippet path="awsx-vpc" language="go" from="1" to="3" >}}
    "fmt"
{{< example-program-snippet path="awsx-vpc" language="go" from="4" to="10" >}}
{{< example-program-snippet path="awsx-vpc" language="go" from="12" to="15" >}}

        fmt.Println(vpc)

{{< example-program-snippet path="awsx-vpc" language="go" from="21" to="23" >}}
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
{{< example-program-snippet path="awsx-vpc" language="csharp" from="1" to="6" >}}
{{< example-program-snippet path="awsx-vpc" language="csharp" from="8" to="8" >}}

    Console.WriteLine(vpc);

{{< example-program-snippet path="awsx-vpc" language="csharp" from="17" to="17" >}}
```

{{% /choosable %}}

{{% choosable language java %}}

```java
{{< example-program-snippet path="awsx-vpc" language="java" from="1" to="9" >}}
{{< example-program-snippet path="awsx-vpc" language="java" from="11" to="11" >}}

            System.out.println(vpc);

{{< example-program-snippet path="awsx-vpc" language="java" from="17" to="19" >}}
```

{{% /choosable %}}

However, deploying this program will show CLI output similar to the following:

{{% choosable language javascript %}}

```javascript
# Example CLI output (truncated)
Updating (pulumi/dev)
    Type                                          Name           Status              Info
 +   pulumi:pulumi:Stack                           aws-js-dev     created (1s)        391 messages
 +   └─ awsx:ec2:Vpc                               vpc            created (1s)
    ...
    ...

Diagnostics:
  pulumi:pulumi:Stack (aws-js-dev):
    <ref *1> Vpc {
          __pulumiResource: true,
          __pulumiType: 'awsx:ec2:Vpc',
          ...
          ...
          vpc: OutputImpl {
            __pulumiOutput: true,
            resources: [Function (anonymous)],
            allResources: [Function (anonymous)],
            isKnown: Promise { <pending> },
            ...
            ...
          },
          ...
        }
Resources:
    + 34 created

Duration: 2m17s
```
{{% notes %}}
You can see an example of the complete Diagnostics CLI output in [this gist](https://gist.github.com/toriancrane/be03601a7b9f0fd2e197d55ed5a41b31).
{{% /notes %}}

{{% /choosable %}}

{{% choosable language typescript %}}

```bash
# Example CLI output (truncated)
Updating (pulumi/dev)
    Type                                          Name           Status              Info
 +   pulumi:pulumi:Stack                           aws-ts-dev     created (1s)        391 messages
 +   └─ awsx:ec2:Vpc                               vpc            created (1s)
    ...
    ...

Diagnostics:
  pulumi:pulumi:Stack (aws-ts-dev):
    <ref *1> Vpc {
          __pulumiResource: true,
          __pulumiType: 'awsx:ec2:Vpc',
          ...
          ...
          vpc: OutputImpl {
            __pulumiOutput: true,
            resources: [Function (anonymous)],
            allResources: [Function (anonymous)],
            isKnown: Promise { <pending> },
            ...
            ...
          },
          ...
        }
Resources:
    + 34 created

Duration: 2m17s
```

{{% notes %}}
You can see an example of the complete Diagnostics output in [this gist](https://gist.github.com/toriancrane/4aba791447af71a67cce06715a282a19).
{{% /notes %}}

{{% /choosable %}}

{{% choosable language python %}}

```bash
# Example CLI output (truncated)
Updating (pulumi/dev)
    Type                                          Name           Status              Info
 +   pulumi:pulumi:Stack                           aws-py-dev     created (1s)        391 messages
 +   └─ awsx:ec2:Vpc                               vpc            created (1s)
    ...
    ...

Diagnostics:
  pulumi:pulumi:Stack (aws-py-dev):
    <pulumi_awsx.ec2.vpc.Vpc object at 0x7f77ac256130>

Resources:
    + 34 created

Duration: 2m17s
```

{{% /choosable %}}

{{% choosable language go %}}

```bash
# Example CLI output (truncated)
Updating (pulumi/dev)
    Type                                          Name           Status              Info
 +   pulumi:pulumi:Stack                           aws-go-dev     created (1s)        391 messages
 +   └─ awsx:ec2:Vpc                               vpc            created (1s)
    ...
    ...

Diagnostics:
  pulumi:pulumi:Stack (aws-go-dev):
    &{{{} {{0 0} 0 0 {{} 0} {{} 0}} {0xc000196e00} {0xc000196d90} map[] map[] <nil>   [] vpc [] true} {0xc0001961c0} {0xc000196230} {0xc0001962a0} {0xc000196460} {0xc0001964d0} {0xc000196690} {0xc000196700} {0xc0001967e0} {0xc000196850} {0xc0001968c0} {0xc000196930} {0xc000196a10} {0xc000196a80} {0xc000196b60}}

Resources:
    + 34 created

Duration: 3m7s
```

{{% /choosable %}}

{{% choosable language csharp %}}

```bash
# Example CLI output (truncated)
Updating (pulumi/dev)
    Type                                          Name           Status              Info
 +   pulumi:pulumi:Stack                           aws-csharp-dev     created (1s)        391 messages
 +   └─ awsx:ec2:Vpc                               vpc            created (1s)
    ...
    ...

Diagnostics:
  pulumi:pulumi:Stack (aws-csharp-dev):
    Pulumi.Awsx.Ec2.Vpc

Resources:
    34 created

Duration: 3m7s
```

{{% /choosable %}}

{{% choosable language java %}}

```bash
# Example CLI output (truncated)
Updating (pulumi/dev)
    Type                                          Name           Status              Info
 +   pulumi:pulumi:Stack                           aws-java-dev     created (1s)        391 messages
 +   └─ awsx:ec2:Vpc                               vpc            created (1s) 
...
...

# Nothing is printed

Resources:
    + 34 created

Duration: 2m17s
```

{{% /choosable %}}

As shown above, using this method will not provide a JSON representation of the VPC resource complete with its properties and associated property values. This is because, when it comes to Pulumi resource classes, there is no custom `String` method that outputs this kind of JSON representation for each resource.

Ultimately, if you want to view the properties of a resource, you will need to access them individually using `apply`.

## Accessing single outputs with Apply

Let's say we want to print the ID of the VPC we've created.

{{< chooser language "javascript,typescript,python,go,csharp,java" / >}}

{{% choosable language javascript %}}

```javascript
{{< example-program-snippet path="awsx-vpc" language="javascript" from="1" to="3" >}}

{{< example-program-snippet path="awsx-vpc" language="javascript" from="6" to="6" >}}

console.log(vpc.vpcId);
```

{{% /choosable %}}

{{% choosable language typescript %}}

```typescript
{{< example-program-snippet path="awsx-vpc" language="typescript" from="1" to="2" >}}

{{< example-program-snippet path="awsx-vpc" language="typescript" from="5" to="5" >}}

console.log(vpc.vpcId);
```

{{% /choosable %}}

{{% choosable language python %}}

```python
{{< example-program-snippet path="awsx-vpc" language="python" from="1" to="2" >}}

{{< example-program-snippet path="awsx-vpc" language="python" from="5" to="5" >}}

print(vpc.vpc_id)
```

{{% /choosable %}}

{{% choosable language go %}}

```go
{{< example-program-snippet path="awsx-vpc" language="go" from="1" to="3" >}}
    "fmt"
{{< example-program-snippet path="awsx-vpc" language="go" from="4" to="10" >}}
{{< example-program-snippet path="awsx-vpc" language="go" from="12" to="15" >}}

        fmt.Println(vpc)

{{< example-program-snippet path="awsx-vpc" language="go" from="21" to="23" >}}
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
{{< example-program-snippet path="awsx-vpc" language="csharp" from="1" to="6" >}}
{{< example-program-snippet path="awsx-vpc" language="csharp" from="8" to="8" >}}

    Console.WriteLine(vpc);

{{< example-program-snippet path="awsx-vpc" language="csharp" from="17" to="17" >}}
```

{{% /choosable %}}

{{% choosable language java %}}

```java
{{< example-program-snippet path="awsx-vpc" language="java" from="1" to="9" >}}
{{< example-program-snippet path="awsx-vpc" language="java" from="11" to="11" >}}

            System.out.println(vpc);

{{< example-program-snippet path="awsx-vpc" language="java" from="17" to="19" >}}
```

{{% /choosable %}}

If we update our program as shown above and run `pulumi up`, we will receive the following error:

```bash
Diagnostics:
  pulumi:pulumi:Stack (aws-iac-dev):
    Calling __str__ on an Output[T] is not supported.
    To get the value of an Output[T] as an Output[str] consider:
    1. o.apply(lambda v: f"prefix{v}suffix")
    See https://www.pulumi.com/docs/concepts/inputs-outputs for more details.
    This function may throw in a future version of Pulumi.
```

This is where `apply` comes into play. When a Pulumi program is executed with `pulumi up`, the `apply` function will print the values to the console once the resource is created and its properties are resolved.

However, this will only happen during the execution of `pulumi up` and not when the program code is run in isolation because the values of these outputs are only known after the infrastructure is provisioned by Pulumi. As mentioned before, all properties of a resource are of type Output[T], meaning the `apply` method is used to apply a function to the result of an Output __once the value is available__.

The syntax of `apply` is shown below:

```python
<resource>.<property-name>.apply(lambda <property-name>: <function-to-apply>)
```

Regarding the different parts of the syntax:

- `<resource>` is the name of the resource (i.e. `vpc`)
- `<property-name>` is the name of the property to retrieve (i.e. `vpc_id`)
- `<function-to-apply>` is the function to apply against the value of the property

{{% notes %}}
The `apply` method should only be used on a resource's properties and never on the whole resource itself.
{{% /notes %}}

This means that if we want to print out the value of our VPC ID, our program needs to look like the following:

```python
import pulumi
import pulumi_awsx as awsx

vpc = awsx.ec2.Vpc("vpc")

vpc.vpc_id.apply(lambda vpc_id: print('My VPC ID is:', vpc_id))

```

The above example will wait for the value to be returned from the API and print it to the console as shown below:

```bash
Updating (pulumi/dev)

     Type                 Name         Status     Info
     pulumi:pulumi:Stack  aws-iac-dev             1 message

Diagnostics:
  pulumi:pulumi:Stack (aws-iac-dev):
    VPC ID: vpc-0f8a025738f2fbf2f

Resources:
    34 unchanged

Duration: 12s
```

We can now see the value of the VPC ID property that we couldn't see before when using a regular `print` statement.

Below is a longer-form version of the same program:

```python
import pulumi
import pulumi_awsx as awsx

vpc = awsx.ec2.Vpc("vpc")

def print_id(id):
    print('My VPC ID is:' id)

vpc.vpc_id.apply(print_id)
```

Think of `vpc_id` as a variable that is being passed to a function, and it's value is being used to create the string in our print statement. Writing it using the inline `lambda` way is just the short-form version of the above example.

## Creating new output values

The `apply` method can also be used to create new output values, and these new values can also be passed as inputs to another resource. For example, the following code creates an HTTPS URL from the DNS name (the plain value) of a virtual machine (in this case an EC2 instance):

```python
import pulumi
import pulumi_aws as aws

instance = aws.ec2.Instance(
    "instance",
    ami="ami-03cceb19496c25679",
    instance_type="t2.micro"
)

url = instance.public_dns.apply(
    lambda dns_name: "https://" + dns_name
)

pulumi.export("Instance URL:", url)
```

The CLI output of this code would look something like the following:

```bash
Updating (pulumi/dev)

     Type                 Name         Status
     pulumi:pulumi:Stack  aws-iac-dev
 -   └─ awsx:ec2:Vpc      vpc

Outputs:
    Instance URL:: "https://ec2-52-59-110-22.eu-central-1.compute.amazonaws.com"

Duration: 5s
```

The result of the call to {{< pulumi-apply >}} is a new Output<T>, meaning the `url` variable is now of type Output. The population of this variable will wait for the new value to be returned from the `apply` function, and any [dependencies](/docs) of the original output (i.e. the `instance.public_dns` property) are also kept in the resulting Output<T>.

{{% notes %}}
During some program executions, `apply` doesn’t run. For example, it won’t run during a preview, when resource output values may be unknown. Therefore, you should avoid side-effects within the callbacks. For this reason, you should not allocate new resources inside of your callbacks either, as it could lead to `pulumi preview` being wrong.
{{% /notes %}}
