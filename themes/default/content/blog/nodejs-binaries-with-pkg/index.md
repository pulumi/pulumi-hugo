---
title: "Node.js Native Binary Compilation Using vercel/pkg"
date: 2022-09-13
meta_desc: "Using Vercel pkg to create native binaries for nodejs providers"

#meta_image: infra-observability.png
authors:
- daniel-bradley
tags:
- engineering
- nodejs
- publishing
- providers

meta_image: "meta.png"
---

# Node.js Native Binary Compilation Using vercel/pkg

Everyone knows that you can write Pulumi programs in loads of languages, but what about the providers behind the scenes which handle communication with various cloud services?

Providers are downloaded and run in many different platforms (e.g. Linux, macOS, Windows) and environments – where we can’t assume an end-user is going to have specific runtimes installed – including Node.js. Most of our providers are authored in Go – which makes it simple to produce native, static binaries for all modern operating systems. However, in this post we’re going to look at how we can write a component provider in Typescript and package it using vercel/pkg to achieve the same portability.

Historical note: we used to do a similar process using the [nexe](https://github.com/nexe/nexe) project, but there’s been no releases since 2017 and therefore no support for newer versions of Node.js and we therefore consider this package as unmaintained at this point in time.

## Setting up pkg

### 1 - Install

Pkg is distributed as an npm package which can be installed into your “devDependencies” using:

```bash
npm install -D  pkg
```

or

```bash
yarn add -D pkg
```

or run without installing with npx:

```bash
npx pkg [args]
```

### 2 - Set `bin` in `package.json`

Pkg will use [the bin field from your package.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#bin) to find the entry point so you just have to specify a path to the directory containing your `package.json`.

```json
{
    "name": "my-program"
    "bin": "bin/index.js",
    ...
}
```

If no target is specified, then a set of defaults will be chosen for you. If the output path is not specified, pkg will infer the name from the package.json “name” field and write to the current working directory.

### 3 - Execute

The main inputs that pkg needs is:

* The entry point to your program for packaging
* The target machine to build for
* The output path to write the finished binary

Here’s an example of building the project in the current directory using node v16 for macOS ARM architectures:

```bash
# pkg [options] <input>
# -t, --targets        comma-separated list of targets
# -o, --output         output file name or template for several files
pkg -t node18-macos-arm64 -o bin/my-program .
```

It's possible to specify multiple targets in a comma-separated list to build them all at the same time, but it does come with the limitation where the output file names follow a fixed pattern. Instead, we chose to just run the pkg command multiple times with different arguments from our makefile in parallel as this fits with our existing workflows well.

## Issues encountered

### “Inspector Not Available”

As soon as we started executing the provider we started seeing some interesting warnings printed to the console stating that “Inspector is not available” (here’s our [tracking issue](https://github.com/pulumi/pulumi-awsx/issues/848) and some [Pkg discussion](https://github.com/vercel/pkg/issues/93)).

Pkg provides an option to fix this by building your own base image with custom Node.js flags set to enable debugging. However, on investigation, these issues were caused by the Pulumi Typescript SDK creating and caching an inspector instance at the point of being imported. Therefore, we opted to make this eager singleton creation to be lazy – only created on first use, as this is used for automatic closure serialization which we’re not using in our providers at this time.

### Unsigned MacOS ARM binaries

When trying to use the binaries produced by our CI, we found that [the binaries weren’t runnable on MacOS ARM architectures](https://github.com/pulumi/pulumi-awsx/issues/850) - and were forcibly killed by the operating system.

This led me down quite a bit of a rabbit hole investigating signing of binaries, but it was actually resolved by simply installing the ‘ldid’ tool on our linux CI environments. Sometimes reading the warnings carefully can save you lots of time! The ldid source is available via git://git.saurik.com/ldid.git and binaries are available from various sources. Our solution was to use the [“Install Ldid” GitHub Action](https://github.com/marketplace/actions/install-ldid) to install the ldid binary and add it to the PATH in our CI workflow.

### Static Binaries

One adjustment to our configuration came from a community contribution where the provider was being used in a nixos environment. Nixos adds the requirement for all binaries to be static rather than dynamic - so there’s no requirement for the operating system to dynamically map link functions from system libraries at runtime. Statically compiled programs sometimes result in a larger size, but avoid any possible issues with different versions of the libraries it depends on. To resolve this issue, it’s as simple as changing the ‘linux’ targets to ‘linuxstatic’. E.g. `node16-linux-amd64` becomes `node16-linuxstatic-amd64`.

## Multi-platform builds with a makefile

Here’s an outline of how we build for multiple platforms using GNU Make.

```make
# Set the correct pkg TARGET for each output
bin/linux-amd64/my-program: TARGET := node18-linuxstatic-x64
bin/linux-arm64/my-program: TARGET := node18-linuxstatic-arm64
bin/darwin-amd64/my-program: TARGET := node18-macos-x64
bin/darwin-arm64/my-program: TARGET := node18-macos-arm64
bin/windows-amd64/my-program.exe: TARGET := node18-win-x64

# Wildcard rule to build any of binary outputs
bin/%: node_modules
    @# Execute pkg for actual output name & target
    yarn run pkg . --target ${TARGET} --output $@

# Phony target to let us build all bins
bins: bin/linux-amd64/my-program
bins: bin/linux-arm64/my-program
bins: bin/darwin-amd64/my-program
bins: bin/darwin-arm64
bins: bin/windows-amd64

.PHONY: bins
```

Step-by-step:

1. Define a makefile target for each output file we want.
2. Set the TARGET variable to the pkg target we’ll want to use for each output.
3. A wildcard rule invokes pkg build using the TARGET defined above
4. `$@` is the current makefile target - the specific binary being built
5. The wildcard rule depends on the node_modules which is also a makefile target - to ensure packages have been restored before the build starts
6. Define a phony `bins` target to build all bin targets
