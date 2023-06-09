---
title: "Converting Full Terraform Programs to Pulumi"
date: 2023-06-12
meta_desc: Learn how to convert whole Terraform programs to Pulumi using the new Terraform converter


meta_image: meta.png

authors:
    - justin-vanpatten

tags:
    - migration
---

Today, we're excited to announce support for converting whole Terraform projects to Pulumi via the `pulumi convert` command in the Pulumi CLI. The new Terraform converter includes support for Terraform modules, all core features of Terraform 1.4, and the majority of Terraform built-in functions. Let's dig in to learn more about the new converter and how to use it.

<!--more-->

Historically, we have offered a separate [tf2pulumi](https://github.com/pulumi/tf2pulumi) tool to convert snippets of Terraform to Pulumi. Today we're announcing a new converter that supports converting the vast majority of complete Terraform projects, including modules. There's no longer a separate tool to download -- you can run the new converter directly from the Pulumi CLI with the `pulumi convert --from terraform` command to convert Terraform to Pulumi TypeScript, Python, Go, or C#.

## Supported Terraform Features

The following major features are supported:

* Variables, providers, outputs, resources, and data sources
* Terraform Modules are converted to Pulumi components
* Almost all HCL2 expression syntax
* Almost all Terraform meta-arguments are supported

In cases where the converter does not yet support a feature, the `pulumi convert` command succeeds but generates a TODO in the form of a call to a <pulumi-chooser type="language" options="typescript,python,go,csharp" option-style="none" class="inline">
    <pulumi-choosable type="language" value="typescript"><code>notImplemented</code></pulumi-choosable>
    <pulumi-choosable type="language" value="python"><code>not_implemented</code></pulumi-choosable>
    <pulumi-choosable type="language" value="go"><code>notImplemented</code></pulumi-choosable>
    <pulumi-choosable type="language" value="csharp"><code>NotImplemented</code></pulumi-choosable>
</pulumi-chooser> function that will need to be filled in manually. For most projects, the converter should be able to convert 90-95% of the code without any TODOs, with only a small percentage of items to address manually, significantly reducing migration time compared to doing an entire migration by hand. We are actively improving the converter, adding support for missing features and improving the overall quality of the converted code to reduce the amount of manual fix-ups required.

## Converting a Real World Program

Let's walk through converting a Terraform codebase to Pulumi. [Avant Terraform Vault Setup](https://github.com/avantoss/vault-infra) is an open source project that provides a high-availability installation of Vault using a variety of managed AWS services. It defines a fairly complex installation with dozens of AWS resources in over 1,000 lines of Terraform HCL, including the main program and a Vault module. Let's convert it to Pulumi.

First, clone the repo and `cd` into the directory containing the Terraform project:

```bash
$ git clone https://github.com/avantoss/vault-infra.git
$ cd vault-infra/terraform/main
```

Next, run the converter:

{{< chooser language "typescript,python,go,csharp" >}}
{{% choosable language typescript %}}

```bash
$ pulumi convert --from terraform --language typescript --out pulumi
```

{{% /choosable %}}
{{% choosable language python %}}

```bash
$ pulumi convert --from terraform --language python --out pulumi
```

{{% /choosable %}}
{{% choosable language go %}}

```bash
$ pulumi convert --from terraform --language go --out pulumi
```

{{% /choosable %}}
{{% choosable language csharp %}}

```bash
$ pulumi convert --from terraform --language csharp --out pulumi
```

{{% /choosable %}}
{{< /chooser >}}

![pulumi convert](pulumi-convert-from-terraform.gif)

The converted code is generated in the specified `pulumi` output directory. With this program, there are two primary generated files:

* {{< langfile >}} contains the converted code for the main program.
* <pulumi-chooser type="language" options="typescript,python,go,csharp" option-style="none" class="inline">
    <pulumi-choosable type="language" value="typescript"><code>vault.ts</code></pulumi-choosable>
    <pulumi-choosable type="language" value="python"><code>vault.py</code></pulumi-choosable>
    <pulumi-choosable type="language" value="go"><code>vault.go</code></pulumi-choosable>
    <pulumi-choosable type="language" value="csharp"><code>vault.cs</code></pulumi-choosable>
  </pulumi-chooser> contains the <code>Vault</code> component, converted from the Terraform module.

The latter file contains some TODOs emitted by the converter that must be addressed by the user.

For example, the converter doesn't (yet!) support the `replace` built-in function, so a TODO is left for the user to address:

{{< chooser language "typescript,python,go,csharp" >}}
{{% choosable language typescript %}}

```typescript
const alb = new aws.lb.LoadBalancer(`${name}-alb`, {
    name: notImplemented("replace(var.name_prefix,\"_\",\"-\")"),
```

{{% /choosable %}}
{{% choosable language python %}}

```python
alb = aws.lb.LoadBalancer(f"{name}-alb",
    name=not_implemented("replace(var.name_prefix,\"_\",\"-\")"),
```

{{% /choosable %}}
{{% choosable language go %}}

```go
alb, err := lb.NewLoadBalancer(ctx, fmt.Sprintf("%s-alb", name), &lb.LoadBalancerArgs{
    Name: notImplemented("replace(var.name_prefix,\"_\",\"-\")"),
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var alb = new Aws.Lb.LoadBalancer($"{name}-alb", new()
{
    Name = NotImplemented("replace(var.name_prefix,\"_\",\"-\")"),
```

{{% /choosable %}}
{{< /chooser >}}

We can fill in an implementation:

{{< chooser language "typescript,python,go,csharp" >}}
{{% choosable language typescript %}}

```typescript
const alb = new aws.lb.LoadBalancer(`${name}-alb`, {
    name: pulumi.output(args.namePrefix).apply(namePrefix => namePrefix.replace("_", "-")),
```

{{% /choosable %}}
{{% choosable language python %}}

```python
alb = aws.lb.LoadBalancer(f"{name}-alb",
    name=pulumi.Output.from_input(args["namePrefix"]).apply(lambda np: np.replace("_", "-")),
```

{{% /choosable %}}
{{% choosable language go %}}

```go
alb, err := lb.NewLoadBalancer(ctx, fmt.Sprintf("%s-alb", name), &lb.LoadBalancerArgs{
    Name: args.NamePrefix.ToStringOutput().ApplyT(func(name string) string {
        return strings.ReplaceAll(name, "_", "-")
    }).(pulumi.StringOutput),
```

{{% /choosable %}}
{{% choosable language csharp %}}

```csharp
var alb = new Aws.Lb.LoadBalancer($"{name}-alb", new()
{
    Name = args.NamePrefix.Apply(name => name.Replace("_", "-"));
```

{{% /choosable %}}
{{< /chooser >}}

There are some other TODOs for missing `merge` and `template_file` support, which also need to be filled in. After addressing these and some other tweaks to make the code compile, we can now run the Pulumi program with `pulumi up` to provision the Vault installation with Pulumi.

JVP: TODO: Show how to fix `merge` and `template_file`.

The converter has saved us a ton of time, converting over 1,000 lines of Terraform to a modern Pulumi language, with only a small number of manual fix-ups. From here, we can leverage our IDE and compiler to further refactor and improve the code, one of the many benefits of Pulumi!

## Get Started

Support for the new `pulumi convert --from terraform` command is available today in [Pulumi v3.71.0](/docs/install/). Give the new converter a try and [let us know](https://github.com/pulumi/pulumi/issues/new/choose) if you run into any issues. We are actively fixing issues, reducing the number of TODOs, and improving the overall quality of the generated code.
