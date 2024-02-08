---
title_tag: "Accessing Single Outputs with Apply | Inputs and Outputs"
meta_desc: "Learn how to access a single output value using the apply method in Pulumi."
title: Apply
h1: Accessing single outputs with Apply
meta_image: /images/docs/meta-images/docs-meta.png
menu:
  concepts:
    weight: 2
    parent: inputs-outputs
---

Outputs are asynchronous, meaning their actual plain values are not immediately available. As such, there are limitations on the ways in which you can retrieve these values.

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

- Use Pulumi's built in `export` function to export the resource as a stack output
- Access individual properties of the resource using `apply`

Let's examine the first method, using `export`. We can remove the print statement from our code and replace it with the following export statement:

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
        ...
      + vpc_id                              : "vpc-0f8a025738f2fbf2f"
    }

Resources:
    34 unchanged

Duration: 21s
```

Exporting the value will enable you to see the full list and format of the properties of the VPC resource once it has been created. All of these properties are of type Output[T], meaning if you want to access the plain value of a specific property, you will need to use the second method: {{< pulumi-apply >}}.

{{% notes %}}
You can see an example of the full JSON output by viewing [this gist](https://gist.github.com/toriancrane/e84368a1aa1684390ce34224e8291743).

You can also learn more about Stack Outputs by refering to [the Stack Outputs and References tutorial](/docs/using-pulumi/stack-outputs-and-references/).
{{% /notes %}}

## Accessing single outputs with Apply

Let's say we want to print the ID of the VPC we've created.

```python
import pulumi
import pulumi_awsx as awsx

vpc = awsx.ec2.Vpc("vpc")

print(vpc.vpc_id)
```

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

## Create new output values [WIP]

[This section will be edited]

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

The result of the call to {{< pulumi-apply >}} is a new Output<T>, meaning the `url` variable is now of type Output. The population of this variable will wait for the new value to be returned from the `apply` function, and any dependencies of the original output (i.e. the `instance.public_dns` property) are also kept in the resulting Output<T>.

{{% notes %}}
During some program executions, `apply` doesn’t run. For example, it won’t run during a preview, when resource output values may be unknown. Therefore, you should avoid side-effects within the callbacks. For this reason, you should not allocate new resources inside of your callbacks either, as it could lead to `pulumi preview` being wrong.
{{% /notes %}}
