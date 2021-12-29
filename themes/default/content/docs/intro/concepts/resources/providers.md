---
title: "Resource Providers"
meta_desc: A resource provider handles communications with a cloud service to create, read, update, and delete the resources you define in your Pulumi programs.
menu:
  intro:
    parent: resources
    weight: 4
---

A resource provider handles communications with a cloud service to create, read, update, and delete the resources you define in your Pulumi programs. Pulumi passes your code to a language host such as Node.js, waits to be notified of resource registrations, assembles a model of your desired state, and calls on the resource provider to produce that state. The resource provider translates those requests into API calls to the cloud service.

A resource provider is tied to the language that you use to write your programs. For example, if your cloud provider is AWS, the following providers are available:

- JavaScript/TypeScript: `@pulumi/aws`
- Python: `pulumi-aws`
- Go: `github.com/pulumi/pulumi-aws/sdk/go/aws`
- .NET: `Pulumi.Aws`

Normally, since you declare the language and cloud provider you intend to use when you write a program, Pulumi installs the provider for you as a plugin, using the appropriate package manager, such as NPM for Typescript.

The resource provider for custom resources is determined based on its package name. For example, the `aws` package loads a plugin named `pulumi-resource-aws`, and the `kubernetes` package loads a plugin named `pulumi-resource-kubernetes`.

### Default Provider Configuration

By default, each provider uses its package’s global configuration settings, which are controlled by your stack’s configuration. You can set information such as your cloud provider credentials with environment variables and configuration files. If you store this data in standard locations, Pulumi knows how to retrieve them.

For example, suppose you run this CLI command:

```bash
$ pulumi config set aws:region us-west-2
```

Then, suppose you deploy the following Pulumi program:

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
let aws = require("@pulumi/aws");

let instance = new aws.ec2.Instance("myInstance", {
    instanceType: "t2.micro",
    ami: "myAMI",
});
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
let aws = require("@pulumi/aws");

let instance = new aws.ec2.Instance("myInstance", {
    instanceType: "t2.micro",
    ami: "myAMI",
});
```

{{% /choosable %}}
{{% choosable language python %}}

```python
from pulumi_aws import ec2

instance = ec2.Instance("myInstance", instance_type="t2.micro", ami="myAMI")
```

{{% /choosable %}}
{{% choosable language go %}}

```go
vpc, err := ec2.NewInstance(ctx, "myInstance", &ec2.InstanceArgs{
    InstanceType: pulumi.String("t2.micro"),
    Ami:          pulumi.String("myAMI"),
})
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var instance = new Aws.Ec2.Instance("myInstance", new Aws.Ec2.InstanceArgs
{
    InstanceType = "t2.micro",
    Ami = "myAMI",
});
```

{{% /choosable %}}

{{< /chooser >}}

It creates a single EC2 instance in the us-west-2 region.

### Explicit Provider Configuration

While the default provider configuration may be appropriate for the majority of Pulumi programs, some programs may have special requirements. One example is a program that needs to deploy to multiple AWS regions simultaneously. Another example is a program that needs to deploy to a Kubernetes cluster, created earlier in the program, which requires explicitly creating, configuring, and referencing providers. This is typically done by instantiating the relevant package’s `Provider` type and passing in the options for each `Resource` that needs to use it. For example, the following configuration and program creates an ACM certificate in the `us-east-1` region and a load balancer listener in the `us-west-2` region.

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
let pulumi = require("@pulumi/pulumi");
let aws = require("@pulumi/aws");

// Create an AWS provider for the us-east-1 region.
let useast1 = new aws.Provider("useast1", { region: "us-east-1" });

// Create an ACM certificate in us-east-1.
let cert = new aws.acm.Certificate("cert", {
    domainName: "foo.com",
    validationMethod: "EMAIL",
}, { provider: useast1 });

// Create an ALB listener in the default region that references the ACM certificate created above.
let listener = new aws.lb.Listener("listener", {
    loadBalancerArn: loadBalancerArn,
    port: 443,
    protocol: "HTTPS",
    sslPolicy: "ELBSecurityPolicy-2016-08",
    certificateArn: cert.arn,
    defaultAction: {
        targetGroupArn: targetGroupArn,
        type: "forward",
    },
})
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
let pulumi = require("@pulumi/pulumi");
let aws = require("@pulumi/aws");

// Create an AWS provider for the us-east-1 region.
let useast1 = new aws.Provider("useast1", { region: "us-east-1" });

// Create an ACM certificate in us-east-1.
let cert = new aws.acm.Certificate("cert", {
    domainName: "foo.com",
    validationMethod: "EMAIL",
}, { provider: useast1 });

// Create an ALB listener in the default region that references the ACM certificate created above.
let listener = new aws.lb.Listener("listener", {
    loadBalancerArn: loadBalancerArn,
    port: 443,
    protocol: "HTTPS",
    sslPolicy: "ELBSecurityPolicy-2016-08",
    certificateArn: cert.arn,
    defaultAction: {
        targetGroupArn: targetGroupArn,
        type: "forward",
    },
});
```

{{% /choosable %}}
{{% choosable language python %}}

```python
import pulumi
import pulumi_aws as aws

# Create an AWS provider for the us-east-1 region.
useast1 = aws.Provider("useast1", region="us-east-1")

# Create an ACM certificate in us-east-1.
cert = aws.acm.Certificate("cert",
    domain_name="foo.com",
    validation_method="EMAIL",
    __opts__=pulumi.ResourceOptions(provider=useast1))

# Create an ALB listener in the default region that references the ACM certificate created above.
listener = aws.lb.Listener("listener",
    load_balancer_arn=load_balancer_arn,
    port=443,
    protocol="HTTPS",
    ssl_policy="ELBSecurityPolicy-2016-08",
    certificate_arn=cert.arn,
    default_action={
        "target_group_arn": target_group_arn,
        "type": "forward",
    })
```

{{% /choosable %}}
{{% choosable language go %}}

```go
// Create an AWS provider for the us-east-1 region.
useast1, err := aws.NewProvider(ctx, "useast1", &aws.ProviderArgs{
    Region: pulumi.String("us-east-1"),
})
if err != nil {
    return err
}

// Create an ACM certificate in us-east-1.
cert, err := acm.NewCertificate(ctx, "myInstance", &acm.CertificateArgs{
    DomainName:       pulumi.String("foo.com"),
    ValidationMethod: pulumi.String("EMAIL"),
}, pulumi.Provider(useast1))
if err != nil {
    return err
}

// Create an ALB listener in the default region that references the ACM certificate created above.
listener, err := lb.NewListener(ctx, "myInstance", &lb.ListenerArgs{
    LoadBalancerArn: loadBalancerArn,
    Port:            pulumi.Int(443),
    Protocol:        pulumi.String("HTTPS"),
    SslPolicy:       pulumi.String("ELBSecurityPolicy-2016-08"),
    CertificateArn:  cert.Arn,
    DefaultActions: lb.ListenerDefaultActionArray{
        &lb.ListenerDefaultActionArgs{
            TargetGroupArn: targetGroupArn,
            Type:           pulumi.String("forward"),
        },
    },
})
if err != nil {
    return err
}
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
// Create an AWS provider for the us-east-1 region.
var useast1 = new Aws.Provider("useast1", new Aws.ProviderArgs { Region = "us-east-1" });

// Create an ACM certificate in us-east-1.
var cert = new Aws.Acm.Certificate("cert", new Aws.Acm.CertifiateArgs
{
    DomainName = "foo.com",
    ValidationMethod = "EMAIL",
}, new ResourceArgs { Provider = useast1 });

// Create an ALB listener in the default region that references the ACM certificate created above.
var listener = new Aws.Lb.Listener("listener", new Aws.Lb.ListenerArgs
{
    LoadBalancerArn = loadBalancerArn,
    Port = 443,
    Protocol = "HTTPS",
    SslPolicy = "ELBSecurityPolicy-2016-08",
    CertificateArn = cert.arn,
    DefaultAction: new Aws.Lb.ListenerDefaultAction
    {
        TargetGroupArn = targetGroupArn,
        Type = "forward",
    },
});
```

{{% /choosable %}}

{{< /chooser >}}

```bash
$ pulumi config set aws:region us-west-2
```

Component resources also accept a set of providers to use with their child resources. For example, the EC2 instance parented to `myResource` in the program below is created in `us-east-1`, and the Kubernetes pod parented to myResource is created in the cluster targeted by the `test-ci` context.

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
class MyResource extends pulumi.ComponentResource {
    constructor(name, opts) {
        let instance = new aws.ec2.Instance("instance", { ... }, { parent: this });
        let pod = new kubernetes.core.v1.Pod("pod", { ... }, { parent: this });
    }
}

let useast1 = new aws.Provider("useast1", { region: "us-east-1" });
let myk8s = new kubernetes.Provider("myk8s", { context: "test-ci" });
let myResource = new MyResource("myResource", { providers: { aws: useast1, kubernetes: myk8s } });
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
class MyResource extends pulumi.ComponentResource {
    constructor(name, opts) {
        let instance = new aws.ec2.Instance("instance", { ... }, { parent: this });
        let pod = new kubernetes.core.v1.Pod("pod", { ... }, { parent: this });
    }
}

let useast1 = new aws.Provider("useast1", { region: "us-east-1" });
let myk8s = new kubernetes.Provider("myk8s", { context: "test-ci" });
let myResource = new MyResource("myResource", { providers: { aws: useast1, kubernetes: myk8s } });
```

{{% /choosable %}}
{{% choosable language python %}}

```python
class MyResource(pulumi.ComponentResource):
    def __init__(self, name, opts):
        instance = aws.ec2.Instance("instance", ..., __opts__=pulumi.ResourceOptions(parent=self))
        pod = kubernetes.core.v1.Pod("pod", ..., __opts__=pulumi.ResourceOptions(parent=self))

useast1 = aws.Provider("useast1", region="us-east-1")
myk8s = kubernetes.Provider("myk8s", context="test-ci")
my_resource = MyResource("myResource", pulumi.ResourceOptions(providers={
    "aws": useast1,
    "kubernetes": myk8s,
})
```

{{% /choosable %}}
{{% choosable language go %}}

```go
useast1, err := aws.NewProvider(ctx, "useast1", &aws.ProviderArgs{
    Region: pulumi.String("us-east-1"),
})
if err != nil {
    return err
}
myk8s, err := kubernetes.NewProvider(ctx, "myk8s", &kubernetes.ProviderArgs{
    Context: pulumi.String("test-ci"),
})
if err != nil {
    return err
}
myResource, err := NewMyResource(ctx, "myResource", pulumi.ProviderMap(map[string]pulumi.ProviderResource{
    "aws": useast1,
    "kubernetes": myk8s,
}))
if err != nil {
    return err
}
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
using Pulumi;
using Aws = Pulumi.Aws;
using Kubernetes = Pulumi.Kubernetes;

class MyResource : ComponentResource
{
    public MyResource(string name, ComponentResourceOptions opts)
        : base(name, opts)
    {
        var instance = new Aws.Ec2.Instance("instance", new Aws.Ec2.InstanceArgs { ... }, new CustomResourceOptions { Parent = this });
        var pod = new Kubernetes.Core.V1.Pod("pod", new Kubernetes.Core.V1.PodArgs { ... }, new CustomResourceOptions { Parent = this });
    }
}

class MyStack
{
    public MyStack()
    {
        var useast1 = new Aws.Provider("useast1",
            new Aws.ProviderArgs { Region = "us-east-1" });
        var myk8s = new Kubernetes.Provider("myk8s",
            new Kubernetes.ProviderArgs { Context = "test-ci" });
        var myResource = new MyResource("myResource",
            new ComponentResourceOptions { Providers = { useast1, myk8s } });
    }
}
```

{{% /choosable %}}

{{< /chooser >}}

### Dynamic Providers {#dynamicproviders}

There are three types of resource providers. The first are the standard resource providers. These resource providers are built and maintained by Pulumi. There is a second kind, called a dynamic resource provider, which we will discuss here. These resource providers run only in the context of your program. They are not shareable. The third type of resource provider is shareable. You write it yourself and then you can distribute it so that others can use it.

Dynamic resource providers can be written in any language you choose. Because they are not shareable, dynamic resource providers do not need a plugin.

There are several reasons why you might want to write a dynamic resource provider. Here are some of them:

- You want to create some new custom resource types.
- You want to use a cloud provider that Pulumi doesn’t support. For example, you might want to write a dynamic resource provider for WordPress.

All dynamic providers must conform to certain interface requirements. You must at least implement the `create` function but, in practice, you will probably also want to implement the `read`, `update`, and `delete` functions as well.

To continue with our WordPress example, you would probably want to create new blogs, update existing blogs, and destroy them. The mechanics of how these operations happen would be essentially the same as if you used one of the standard resource providers. The difference is that the calls that would've been made on the standard resource provider by the Pulumi engine would now be made on your dynamic resource provider and it, in turn, would make the API calls to WordPress.

Dynamic providers are defined by first implementing the `pulumi.dynamic.ResourceProvider` interface. This interface supports all CRUD operations, but only the create function is required. A minimal implementation might look like this:

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
const myProvider = {
    async create(inputs) {
        return { id: "foo", outs: {}};
    }
}
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
const myProvider: pulumi.dynamic.ResourceProvider = {
    async create(inputs) {
        return { id: "foo", outs: {}};
    }
}
```

{{% /choosable %}}
{{% choosable language python %}}

```python
from pulumi.dynamic import ResourceProvider, CreateResult

class MyProvider(ResourceProvider):
    def create(self, inputs):
        return CreateResult(id_="foo", outs={})
```

{{% /choosable %}}
{{% choosable language go %}}

```go
// Dynamic Providers are currently not supported in Go.
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
// Dynamic Providers are currently not supported in .NET.
```

{{% /choosable %}}

{{< /chooser >}}

This dynamic resource provider is then used to create a new kind of custom resource by inheriting from the `pulumi.dynamic.Resource` base class, which is a subclass of `pulumi.CustomResource`:

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
class MyResource extends pulumi.dynamic.Resource {
    constructor(name, props, opts) {
        super(myProvider, name, props, opts);
    }
}
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
class MyResource extends pulumi.dynamic.Resource {
    constructor(name: string, props: {}, opts?: pulumi.CustomResourceOptions) {
        super(myProvider, name, props, opts);
    }
}
```

{{% /choosable %}}
{{% choosable language python %}}

```python
from pulumi import ResourceOptions
from pulumi.dynamic import Resource
from typing import Any, Optional

class MyResource(Resource):
    def __init__(self, name: str, props: Any, opts: Optional[ResourceOptions] = None):
         super().__init__(MyProvider(), name, props, opts)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
// Dynamic Providers are currently not supported in Go.
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
// Dynamic Providers are currently not supported in .NET.
```

{{% /choosable %}}

{{< /chooser >}}

We can now create instances of the new `MyResource` resource type in our program with `new MyResource("name", args)`, just like we would any custom resource. Pulumi understands how to use the custom provider logic appropriately.

Specifically:

1. If Pulumi determines the resource has not yet been created, it will call the create method on the resource provider interface.
1. If another Pulumi deployment happens and the resource already exists, Pulumi will call the diff method to determine whether a change can be made in place or whether a replacement is needed.
1. If a replacement is needed, Pulumi will call create for the new resource and then call delete for the old resource.
1. If no replacement is needed, Pulumi will call update.
1. In all cases, Pulumi first calls the check method with the resource arguments to give the provider a chance to verify that the arguments are valid.
1. If Pulumi needs to read an existing resource without managing it directly, it will call read.

See below for details on each of these functions.

#### How Dynamic Providers Work

Dynamic providers are a flexible and low-level mechanism that allow you to include arbitrary code directly into the deployment process. While most code in a Pulumi program runs while the desired state of the resources is constructed (in other words, as the resource graph is built), the code inside a dynamic provider’s implementation, such as `create` or `update`, runs during resource provisioning, while the resource graph is being turned into a set of CRUD operations scheduled against the cloud provider.

In fact, these two phases of execution actually run in completely separate processes. The construction of a `new MyResource` happens inside the JavaScript, Python, or Go process running in your Pulumi program. In contrast, your implementations of create or update are executed by a special resource provider binary called `pulumi-resource-pulumi-nodejs`. This binary is what actually implements the Pulumi resource provider gRPC interface and it speaks directly to the Pulumi engine.

Because your implementation of the resource provider interface must be used by a different process, potentially at a different point in time, dynamic providers are built on top of the same [function serialization]({{< relref "/docs/intro/concepts/function-serialization" >}}) that is used for turning callbacks into AWS Lambdas or Google Cloud Functions. Because of this serialization, there are some limits on what can be done inside the implementation of the resource provider interface. You can read more about these limitations in the function serialization documentation.

#### The Resource Provider Interface

Implementing the `pulumi.dynamic.ResourceProvider` interface requires implementing a subset of the methods listed further down in this section. Each of these methods can be asynchronous, and most implementations of these methods will perform network I/O to provision resources in a backing cloud provider or other resource model. There are several important contracts between a dynamic provider and the Pulumi CLI that inform when these methods are called and with what data.

Though the input properties passed to a `pulumi.dynamic.Resource` instance will usually be [Input values]({{< relref "/docs/intro/concepts/inputs-outputs" >}}), the dynamic provider’s functions are invoked with the fully resolved input values in order to compose well with Pulumi resources. Strong typing for the inputs to your provider’s functions can help clarify this. You can achieve this by creating a second interface with the same properties as your resource’s inputs, but with fully unwrapped types.

{{< chooser language "typescript,python,go,csharp" >}}

{{% choosable language typescript %}}

```typescript
// Exported type.
export interface MyResourceInputs {
    myStringProp: pulumi.Input<string>;
    myBoolProp: pulumi.Input<boolean>;
    ...
}

// Non-exported type used by the provider functions.
// This interface contains the same inputs, but as un-wrapped types.
interface MyResourceProviderInputs {
    myStringProp: string;
    myBoolProp: boolean;
    ...
}

class MyResourceProvider implements pulumi.dynamic.ResourceProvider {
    async create(inputs: MyResourceProviderInputs): Promise<pulumi.dynamic.CreateResult> {
        ...
    }

    async diff(id: string, oldOutputs: MyResourceProviderOutputs, newInputs: MyResourceProviderInputs): Promise<pulumi.dynamic.DiffResult> {
        ...
    }
    ...
}

class MyResource extends pulumi.dynamic.Resource {
    constructor(name: string, props: MyResourceInputs, opts?: pulumi.CustomResourceOptions) {
        super(myprovider, name, props, opts);
    }
}
```

{{% /choosable %}}
{{% choosable language python %}}

```python
from pulumi import Input, Output, ResourceOptions
from pulumi.dynamic import *
from typing import Any, Optional

class MyResourceInputs(object):
    my_string_prop: Input[str]
    my_bool_prop: Input[bool]

    def __init__(self, my_string_prop, my_bool_prop):
        self.my_string_prop = my_string_prop
        self.my_bool_prop = my_bool_prop

class _MyResourceProviderInputs(object):
    """
    MyResourceProviderInputs is the unwrapped version of the same inputs
    from the MyResourceInputs class.
    """
    my_string_prop: str
    my_bool_prop: bool

    def __init__(self, my_string_prop: str, my_bool_prop: bool):
        self.my_bool_prop = my_bool_prop
        self.my_string_prop = my_string_prop

class MyResourceProvider(ResourceProvider):
    def create(self, inputs: _MyResourceProviderInputs) -> CreateResult:
        ...
        return CreateResult()

    def diff(self, id: str, oldInputs: _MyResourceProviderInputs, newInputs: _MyResourceProviderInputs) -> DiffResult:
        ...
        return DiffResult()

class MyResource(Resource):
    def __init__(self, name: str, props: MyResourceInputs, opts: Optional[ResourceOptions] = None):
        super().__init__(MyResourceProvider(), name, {**vars(props)}, opts)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
// Dynamic Providers are currently not supported in Go.
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
// Dynamic Providers are currently not supported in .NET.
```

{{% /choosable %}}
{{< /chooser >}}

##### check(olds, news)

The `check` method is invoked before any other methods. The resolved input properties that were originally provided to the resource constructor by the user are passed to it. The operation is passed both the old input properties that were stored in the *state file* after the previous update to the resource, as well as the new inputs from the current deployment. It has two jobs:

1. Verify that the inputs (particularly the news) are valid or return useful error messages if they are not.
1. Return a set of checked inputs.

The inputs returned from the call to `check` will be the inputs that the Pulumi engine uses for all further processing of the resource, including the values that will be passed back in to `diff`, `create`, `update`, or other operations. In many cases, the news can be returned directly as the checked inputs. But in cases where the provider needs to populate defaults, or do some normalization on values, it may want to do that in the `check` method so that this data is complete and normalized prior to being passed in to other methods.

##### create(inputs)

The `create` method is invoked when the URN of the resource created by the user is not found in the existing state of the deployment. The engine passes the provider the checked inputs returned from the call to `check`. The `create` method creates the resource in the cloud provider. It then returns two pieces of data:

1. An id that can uniquely identify the resource in the backing provider for later lookups, and
1. A set of outputs from the backing provider that should be returned to the user code as properties on the CustomResource object. These outputs are stored in the checkpoint file. If an error occurs, an exception can be thrown from the create method that should be returned to the user.

##### diff(id, olds, news)

The `diff` method is invoked when the URN of the resource created by the user already exists. Because the resource already exists it will need to be either updated or replaced. The `diff` method is passed the `id` of the resource, as returned by `create`, as well as the old outputs from the checkpoint file, which are values returned from a previous call to either `create` or `update`. The checked inputs from the current deployment are passed to the diff method.

It returns four optional values:

- `changes: true` if the provider believes there is a difference between the olds and news and wants to do an update or replace to affect this change.
- `replaces`: An array of property names that have changed that should force a replacement. Returning a non-zero length array tells the Pulumi engine to schedule a replacement instead of an update. Replacements might involve downtime, so this value should only be used when a diff requested by the user cannot be implemented as an in-place update on the cloud provider.
- `stables`: An array of property names that are known not to change between updates. Pulumi will use this information to allow some [`apply`]({{< relref "/docs/reference/pkg/python/pulumi#outputs-and-inputs" >}}) calls on [`Output[T]`]({{< relref "/docs/reference/pkg/python/pulumi#outputs-and-inputs" >}}) to be processed during `previews` because it knows that the values of these property names will stay the same during an update.
- `deleteBeforeReplace`: true if the proposed replacements require that the existing resource be deleted before creating the new one. By default, Pulumi will try to create the new resource before deleting the old one to avoid downtime. If an error occurs, an exception can be thrown from the diff method to return this error to the user.

##### update(id, olds, news)

The `update` method is invoked if the call to diff indicates that a replacement is unnecessary. The method is passed the `id` of the resource as returned by `create`, and the old outputs from the checkpoint file, which are values returned from a previous call to either `create` or `update`. The new checked inputs are also passed from the current deployment. The `update` method is expected to do the work in the cloud provider to update an existing resource to the new desired state. It then returns a new set of `outputs` from the cloud provider that should be returned to the user code as properties on the [`CustomResource`]({{< relref "/docs/reference/pkg/python/pulumi#pulumi.CustomResource" >}}) object, and stored into the checkpoint file. If an error occurs, an exception can be thrown from the `update` method to return this error to the user.

##### delete(id, props)

The `delete` operation is invoked if the URN exists in the previous state but not in the new desired state, or if a replacement is needed. The method is passed the `id` of the resource as returned by `create`, and the old outputs from the checkpoint file, which are values returned from a previous call to either `create` or `update`. The method deletes the corresponding resource from the cloud provider. Nothing needs to be returned. If an error occurs, an exception can be thrown from the `delete` method to return this error to the user.

##### read(id, props)

The `read` method is invoked when the Pulumi engine needs to get data about a resource that is not managed by Pulumi. The method is passed the `id` of the resource, as tracked in the cloud provider, and an optional bag of additional properties that can be used to disambiguate the request, if needed. The `read` method looks up the requested resource, and returns the canonical `id` and output properties of this resource if found. If an error occurs, an exception can be thrown from the `read` method to return this error to the user.

#### Dynamic Resource Inputs

The inputs to your `pulumi.dynamic.ResourceProvider`’s functions come from subclasses of `pulumi.dynamic.Resource`. These inputs include any values in the input arguments passed to the `pulumi.dynamic.Resource` constructor. This is just a map of key/value pairs however, in statically typed languages, you can declare types for these input shapes.

For example, `props`, in the `MyResource` class shown below, defines the inputs to the resource provider functions:

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
class MyResource extends pulumi.dynamic.Resource {
    constructor(name, props, opts) {
        super(myprovider, name, props, opts);
    }
}
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
interface MyResourceInputs {
    myStringProp: pulumi.Input<string>;
    myBoolProp: pulumi.Input<boolean>;
    ...
}

class MyResource extends pulumi.dynamic.Resource {
    constructor(name: string, props: MyResourceInputs, opts?: pulumi.CustomResourceOptions) {
        super(myprovider, name, props, opts);
    }
}
```

{{% /choosable %}}
{{% choosable language python %}}

```python
from pulumi import Input, ResourceOptions
from pulumi.dynamic import Resource
from typing import Any, Optional

class MyResourceInputs(object):
    my_string_prop: Input[str]
    my_bool_prop: Input[bool]
    def __init__(self, my_string_prop, my_bool_prop):
        self.my_string_prop = my_string_prop
        self.my_bool_prop = my_bool_prop

class MyResource(Resource):
    def __init__(self, name: str, props: MyResourceInputs, opts: Optional[ResourceOptions] = None):
         super().__init__(MyProvider(), name, {**vars(props)}, opts)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
// Dynamic Providers are currently not supported in Go.
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
// Dynamic Providers are currently not supported in .NET.
```

{{% /choosable %}}

{{< /chooser >}}

#### Dynamic Resource Outputs

Any outputs can be returned by your create function in the outs property of `pulumi.dynamic.CreateResult`.

{{% notes "info" %}}
The following only applies to statically typed languages.
{{% /notes %}}

If you need to access the outputs of your custom resource outside it with strong typing support, declare each output property returned in the `outs` property by your `create` function as a class member of the `pulumi.dynamic.Resource` itself. For example, in TypeScript, these outputs must be declared as `public readonly` class members in your `pulumi.dynamic.Resource` class. These class members must also have the type `pulumi.Output<T>`.

The name of the class member must match the names of the output properties as returned by the `create` function.

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
JavaScript does not support types.
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
...

interface MyResourceProviderOutputs {
    myNumberOutput: number;
    myStringOutput: string;
}

class MyResourceProvider implements pulumi.dynamic.ResourceProvider {
    async create(inputs: MyResourceProviderInputs): Promise<pulumi.dynamic.CreateResult> {
        ...
        // Values are for an example only.
        return { id: "...", outs: { myNumberOutput: 12, myStringOutput: "some value" }};
    }
}

export class MyResource extends pulumi.dynamic.Resource {
    public readonly myStringOutput!: pulumi.Output<string>;
    public readonly myNumberOutput!: pulumi.Output<number>;

    constructor(name: string, props: MyResourceInputs, opts?: pulumi.CustomResourceOptions) {
        super(myprovider, name, { myStringOutput: undefined, myNumberOutput: undefined, ...props }, opts);
    }
}
```

{{% /choosable %}}
{{% choosable language python %}}

```python
from pulumi import ResourceOptions, Input, Output
from pulumi.dynamic import Resource, ResourceProvider, CreateResult
from typing import Any, Optional

...
...

class MyProvider(ResourceProvider):
    def create(self, inputs):
        return CreateResult(id_="foo", outs={ 'my_number_output': 12, 'my_string_output': "some value" })

class MyResource(Resource):
    my_string_output: Output[str]
    my_number_output: Output[str]

    def __init__(self, name: str, props: MyResourceInputs, opts: Optional[ResourceOptions] = None):
         super().__init__(MyProvider(), name, { 'my_string_output': None, 'my_number_output': None, **vars(props) }, opts)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
// Dynamic Providers are not yet supported in Go.
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
// Dynamic Providers are currently not supported in .NET.
```

{{% /choosable %}}

{{< /chooser >}}

#### Dynamic Provider Examples

##### Example: Random

This example generates a random number using a dynamic provider. It highlights using dynamic providers to run some code only when a resource is created, and then store the results of that in the state file so that this value is maintained across deployments of the resource. Because we want our random number to be created once, and then remain stable for subsequent updates, we cannot simply use a random number generator in our program; we need dynamic providers. The result is a provider similar to the one provided in `@pulumi/random`, just specific to our program and language.

Implementing this example requires that we have a provider and resource type:

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
let pulumi = require("@pulumi/pulumi");
let crypto = require("crypto");

let randomprovider = {
    async create(inputs) {
        return { id: crypto.randomBytes(16).toString('hex'), outs: {}};
    },
}

class Random extends pulumi.dynamic.Resource {
    constructor(name, opts) {
        super(randomprovider, name, {}, opts);
    }
}

exports.Random = Random;
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as crypto from "crypto";

const randomprovider: pulumi.dynamic.ResourceProvider = {
    async create(inputs) {
        return { id: crypto.randomBytes(16).toString('hex'), outs: {}};
    },
}

export class Random extends pulumi.dynamic.Resource {
    constructor(name: string, opts?: pulumi.CustomResourceOptions) {
        super(randomprovider, name, {}, opts);
    }
}
```

{{% /choosable %}}
{{% choosable language python %}}

```python
from pulumi import ResourceOptions
from pulumi.dynamic import Resource, ResourceProvider, CreateResult
from typing import Optional
import binascii
import os

class RandomProvider(ResourceProvider):
    def create(self, inputs):
        return CreateResult(id_=binascii.b2a_hex(os.urandom(16)), outs={})

class Random(Resource):
    def __init__(self, name: str, opts: Optional[ResourceOptions] = None):
         super().__init__(RandomProvider(), name, {}, opts)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
// Dynamic Providers are currently not supported in Go.
```

{{% /choosable %}}

{{% choosable language csharp %}}

```csharp
// Dynamic Providers are currently not supported in .NET.
```

{{% /choosable %}}

{{< /chooser >}}

Now, with this, we can construct new `Random` resource instances, and Pulumi will drive the right calls at the right time.

##### Example: GitHub Labels REST API

This example highlights how to make REST API calls to a backing provider to perform CRUD operations. In this case, the backing provider is the GitHub API in this case. Because the resource provider method implementations will be serialized and used in a different process, we keep all the work to initialize the REST client and to make calls to it, local to each function.

{{< chooser language "javascript,typescript,python,go,csharp" >}}

{{% choosable language javascript %}}

```javascript
let pulumi = require("@pulumi/pulumi");
let Octokit = require("@octokit/rest");

// Set this value before creating an instance to configure the authentication token to use for deployments
let auth = "token invalid";
exports.setAuth = function(token) { auth = token; }

const githubLabelProvider = {
    async create(inputs) {
        const ocktokit = new Ocktokit({auth});
        const label = await ocktokit.issues.createLabel(inputs);
        return { id: label.data.id.toString(), outs: label.data };
    },
    async update(id, olds, news) {
        const ocktokit = new Ocktokit({auth});
        const label = await ocktokit.issues.updateLabel({ ...news, current_name: olds.name });
        return { outs: label.data };
    },
    async delete(id, props) {
        const ocktokit = new Ocktokit({auth});
        await ocktokit.issues.deleteLabel(props);
    }
}

class Label extends pulumi.dynamic.Resource {
    constructor(name, args, opts) {
        super(githubLabelProvider, name, args, opts);
    }
}

exports.Label = Label;
```

{{% /choosable %}}
{{% choosable language typescript %}}

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as Ocktokit from "@octokit/rest";

// Set this value before creating an instance to configure the authentication token to use for deployments
let auth = "token invalid";
export function setAuth(token: string) { auth = token; }

export interface LabelResourceInputs {
    owner: pulumi.Input<string>;
    repo: pulumi.Input<string>;
    name: pulumi.Input<string>;
    color: pulumi.Input<string>;
    description?: pulumi.Input<string>;
}

interface LabelInputs {
    owner: string;
    repo: string;
    name: string;
    color: string;
    description?: string;
}

const githubLabelProvider: pulumi.dynamic.ResourceProvider = {
    async create(inputs: LabelInputs) {
        const ocktokit = new Ocktokit({auth});
        const label = await ocktokit.issues.createLabel(inputs);
        return { id: label.data.id.toString(), outs: label.data };
    },
    async update(id, olds: LabelInputs, news: LabelInputs) {
        const ocktokit = new Ocktokit({auth});
        const label = await ocktokit.issues.updateLabel({ ...news, current_name: olds.name });
        return { outs: label.data };
    },
    async delete(id, props: LabelInputs) {
        const ocktokit = new Ocktokit({auth});
        await ocktokit.issues.deleteLabel(props);
    }
}

export class Label extends pulumi.dynamic.Resource {
    constructor(name: string, args: LabelResourceInputs, opts?: pulumi.CustomResourceOptions) {
        super(githubLabelProvider, name, args, opts);
    }
}
```

{{% /choosable %}}
{{% choosable language python %}}

```python
from pulumi import ComponentResource, export, Input, Output
from pulumi.dynamic import Resource, ResourceProvider, CreateResult, UpdateResult
from typing import Optional
from github import Github, GithubObject

auth = "<auth token>"
g = Github(auth)

class GithubLabelArgs(object):
    owner: Input[str]
    repo: Input[str]
    name: Input[str]
    color: Input[str]
    description: Optional[Input[str]]
    def __init__(self, owner, repo, name, color, description=None):
        self.owner = owner
        self.repo = repo
        self.name = name
        self.color = color
        self.description = description

class GithubLabelProvider(ResourceProvider):
    def create(self, props):
        l = g.get_user(props["owner"]).get_repo(props["repo"]).create_label(
            name=props["name"],
            color=props["color"],
            description=props.get("description", GithubObject.NotSet))
        return CreateResult(l.name, {**props, **l.raw_data})
    def update(self, id, _olds, props):
        l = g.get_user(props["owner"]).get_repo(props["repo"]).get_label(id)
        l.edit(name=props["name"],
               color=props["color"],
               description=props.get("description", GithubObject.NotSet))
        return UpdateResult({**props, **l.raw_data})
    def delete(self, id, props):
        l = g.get_user(props["owner"]).get_repo(props["repo"]).get_label(id)
        l.delete()

class GithubLabel(Resource):
    name: Output[str]
    color: Output[str]
    url: Output[str]
    description: Output[str]
    def __init__(self, name, args: GithubLabelArgs, opts = None):
        full_args = {'url':None, 'description':None, 'name':None, 'color':None, **vars(args)}
        super().__init__(GithubLabelProvider(), name, full_args, opts)

label = GithubLabel("foo", GithubLabelArgs("lukehoban", "todo", "mylabel", "d94f0b"))

export("label_color", label.color)
export("label_url", label.url)
```

{{% /choosable %}}
{{% choosable language go %}}

```go
// Dynamic Providers are not currently supported in Go.
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
// Dynamic Providers are currently not supported in .NET.
```

{{% /choosable %}}

{{< /chooser >}}

##### Additional Examples

- [Add a Custom Domain to an Azure CDN endpoint](https://github.com/pulumi/examples/tree/master/classic-azure-ts-dynamicresource)
    Similar to the previous example, this is another example of a shortcoming of the regular Azure resource provider available in Pulumi. However, due to the availability of a REST API, we can easily add a custom domain to an Azure CDN resource using a dynamic provider.
- [Dynamic Providers as Provisioners](https://github.com/pulumi/examples/tree/master/aws-ts-ec2-provisioners)
    Provisioning a VM after it is created is a common problem. Developers have the option to run user-supplied scripts while creating the VM itself. For example, the AWS EC2 resource has a userData parameter, that allows you to specify an inline script, which EC2 will run at instance startup. However, this example of dynamic providers as provisioners allows you to copy/execute scripts on the target instance without replacing the instance itself.
