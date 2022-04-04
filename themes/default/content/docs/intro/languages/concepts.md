---
title: "Concepts"
meta_desc: An overview of the basic programming concepts you need to know in each supported language
menu:
  intro:
    parent: languages
    weight: 2

aliases: ["/docs/reference/concepts/"]
---

Pulumi uses programming languages you may already have used elsewhere to define infrastructure. Many Pulumi users will have used the languages Pulumi supports to write anything from a quick automation script to fully fledged applications handling millions of users.

Some users may be coming to Pulumi from other infrastructure as code tools that use configuration languages to define the infrastructure. 

Whether you’re a language expert of writing your first line in your chosen Pulumi supported language, the following page serves as a great foundation for building amazing Pulumi programs.


## Ecosystem

### Interpreter

Before you can run any Pulumi programs, you’ll need to make sure you have the interpreter for your language available. Pulumi makes use of this interpreter to build your Pulumi infrastructure, so it needs to be available in your $PATH.

Many operating systems will have interpreters installed by default but some others may require manual installation. You’ll need to follow the operating system guide for your language of choice.

Once that’s completed, you’ll need to verify the interpreter is available. Simply run the interpreter to verify it’s working as expected.

{{< chooser language "javascript,python,go,csharp" >}}

{{% choosable language javascript %}}
```bash
node --version
```
{{% /choosable %}}

{{% choosable language python %}}
```bash
python3 --version
```
{{% /choosable %}}

{{% choosable language csharp %}}
```bash
dotnet --version
```
{{% /choosable %}}

{{% choosable language go %}}
```bash
go --version
```
{{% /choosable %}}

{{< /chooser >}}


### Package Management

Pulumi uses your language's native package management tool to install Pulumi packages. Those Pulumi packages interface with the cloud provider APIs using a binary which is installed on your machine by the package manager, which Pulumi calls a “plugin”.

In addition to the plugin, you’ll also get a copy of the SDK related to that plugin, which is a language native package which you’ll interface with directly.

Each language has different mechanisms for handling package management. They all have their own package management tools, and different ecosystems around how to install those packages. You should at the very least be familiar with the commands listed below, what they do and how they work.

{{< chooser language "javascript,python,go,csharp" >}}

{{% choosable language javascript %}}
```bash

### JavaScript has multiple package managers
### We'll use npm in this example

# Install a package
npm install @pulumi/random

# List installed package
npm list

# Remove a package 
npm uninstall @pulumi/random
```
{{% /choosable %}}

{{% choosable language python %}}
```bash
### Python has multiple package managers
### We'll use pip in this example

# Install a package
pip3 install pulumi_random

# List installed package
pip3 list

# Remove a package
pip3 uninstall
```
{{% /choosable %}}

{{% choosable language csharp %}}
```bash
# Install a package
dotnet add package Pulumi.Random

# List installed packages
dotnet list

# Remove a package
dotnet remove Pulumi.Random
```
{{% /choosable %}}

{{% choosable language go %}}
```bash
# Install a package
go get "github.com/pulumi/pulumi-random/sdk/v4/go/random"

# List installed packages
go list ./...

# Remove a package
## Go handles modules differently, see caveats
```
{{% /choosable %}}

{{< /chooser >}}
