---
title_tag: "Pulumi languages & SDKs: TypeScript (Node.js)"
meta_desc: Learn to use Node.js languages like JavaScript and TypeScript with Pulumi for infrastructure as code on any cloud (AWS, Azure, Google Cloud, Kubernetes, etc.).
title: TypeScript (Node.js)
h1: Pulumi & TypeScript & JavaScript (Node.js)
menu:
  languages:
    identifier: javascript
    weight: 1
aliases:
- /docs/reference/javascript/
- /docs/intro/languages/javascript/
---

<img src="/logos/tech/logo-nodejs.png" align="right" width="150" style="padding:8px; margin-top: -64px">

Pulumi supports writing your infrastructure as code in any JavaScript language running on Node.js using any of the [Current, Active and Maintenance LTS versions](https://nodejs.org/en/about/releases/).

Because programs are just JavaScript, you may elect to write them in any manner you'd normally write Node.js programs.
That includes TypeScript, CoffeeScript, or Babel, in addition to your favorite tools such as build systems, linters, or
test frameworks.

<a class="btn" href="https://nodejs.org/en/download/" target="_blank" title="Install Node.js">Install Node.js</a>

## Getting Started

The fastest way to get up and running is to choose from one of the following Getting Started guides:

<div class="tiles mt-4">
    <div class="flex-1 pb-4 md:mr-4">
        <a class="tile p-4" href="/docs/clouds/aws/get-started/?language=nodejs">
            <img class="h-8 mx-auto" src="/logos/tech/aws.svg" alt="AWS">
        </a>
    </div>
    <div class="flex-1 pb-4 md:mr-4">
        <a class="tile p-4" href="/docs/clouds/azure/get-started/?language=nodejs">
            <img class="h-8 mx-auto" src="/logos/tech/azure.svg" alt="Azure">
        </a>
    </div>
    <div class="flex-1 pb-4 md:mr-4">
        <a class="tile p-4" href="/docs/clouds/gcp/get-started/?language=nodejs">
            <img class="h-8 mx-auto" src="/logos/tech/gcp.svg" alt="Google Cloud">
        </a>
    </div>
    <div class="flex-1 pb-4">
        <a class="tile p-4" href="/docs/clouds/kubernetes/get-started/?language=nodejs">
            <img class="h-8 mx-auto" src="/logos/tech/k8s.svg" alt="Kubernetes">
        </a>
    </div>
</div>

## Pulumi Programming Model

The Pulumi programming model defines the core concepts you will use when creating infrastructure as code programs using
Pulumi. [Concepts](/docs/intro/concepts) describes these concepts
with examples available in JavaScript and TypeScript. These concepts are made available to you in the Pulumi SDK.

The Pulumi SDK is available to Node.js developers as a NPM package. To learn more, [refer to the Pulumi SDK Reference
Guide](/docs/reference/pkg/nodejs/pulumi/pulumi).

The Pulumi programming model includes a core concept of `Input` and `Output` values, which are used to track how outputs of one resource flow in as inputs to another resource.  This concept is important to understand when getting started with JavaScript and Pulumi, and the [Inputs and Outputs](/docs/concepts/inputs-outputs/) documentation is recommended to get a feel for how to work with this core part of Pulumi in common cases.

## Entrypoint

Pulumi executes your program by loading the entrypoint file as a Node module: `require("index.ts")`. By default, Pulumi will load `index.ts` or `index.js`. Alternatively, if you specify `main` within your `package.json`, Pulumi will load that module instead:

```json
{
    "name": "my-package",
    "version": "1.0.0",
    ...
    "main": "src/entry.ts"
}
```

{{< chooser language "javascript,typescript" >}}

Your entrypoint can either return a module object with properties for each stack output:

{{% choosable language "javascript" %}}

```javascript
// create resources
...
exports.out = myResource.output;
```

{{% /choosable %}}

{{% choosable language "typescript" %}}

```typescript
// create resources
...
export const out = myResource.output;
```

{{% /choosable %}}

Or alternatively, your entrypoint can export a top level `async` function that returns an object with members for each stack output.
Pulumi will automatically call this function and await the result:

{{% choosable language "javascript" %}}

```javascript
module.exports = async () => {
    // create resources
    return { out: myResource.output };
}
```

{{% /choosable %}}

{{% choosable language "typescript" %}}

```typescript
export = async () => {
    // create resources
    return { out: myResource.output };
}
```

{{% /choosable %}}

{{< /chooser >}}

Most Pulumi programs use the first option, but programs that need to do async work at the top level (such as calling [`getOutputValue`](/docs/reference/pkg/nodejs/pulumi/pulumi#StackReference-getOutputValue)) may find they want to use the second.

## TypeScript

You can elect to write Pulumi programs in TypeScript to get additional verification and tooling benefits. Pulumi supports TypeScript natively so you don't need to explicitly run `tsc` on your program before running `pulumi`.

If you would like full control of the TypeScript build process, you can compile ahead of time, and point your package.json main entry point at the compiled JavaScript instead. If you do this, you can disable the [automatic compilation of TypeScript files](#disabling-built-in-typescript-support).

The fastest way to get started with Pulumi in TypeScript, is to use a template:

```bash
$ mkdir myproject && cd myproject
$ pulumi new typescript
```

This will auto-generate all the basic artifacts required to use TypeScript. If you prefer, you can instead run the following manual steps.

### 1. Update package.json

Update your `package.json` to look like the following (with your own values for `name`, `version`, etc.).  This
is what tells Node.js and NPM what packages you depend on, where to find your code's entry points, and so on:

```json
{
    "name": "my-package",
    "version": "1.0.0",
    "devDependencies": {
        "@types/node": "^12.0.0"
    },
    "dependencies": {
        ... as before ...
    }
}
```

You can customize this however you'd like, such as adding test scripts, npm package dependencies, etc.  For more information on `package.json`, refer to [the NPM documentation](https://docs.npmjs.com/files/package.json).

### 2. Install dependencies

Run `npm install` or `yarn install` to install the new development-time dependencies to your `node_modules` directory.

### 3. Create tsconfig.json

When using Pulumi's built in TypeScript support, a `tsconfig.json` file is optional. However, defining one allows your to set additional TypeScript compiler options, for example not allowing implicit returns from a function. In addition, other tools like VS Code will use these settings to give you additional warnings at development time. Any options set in your `tsconfig.json` file will be picked up by Pulumi. We recommend creating a `tsconfig.json` file with the following settings:

```json
{
    "compilerOptions": {
        "strict": true,
        "outDir": "bin",
        "target": "es2016",
        "module": "commonjs",
        "moduleResolution": "node",
        "sourceMap": true,
        "experimentalDecorators": true,
        "pretty": true,
        "noFallthroughCasesInSwitch": true,
        "noImplicitReturns": true,
        "forceConsistentCasingInFileNames": true
    },
    "files": [
        "index.ts"
    ]
}
```

You may customize this however you'd like, including the TypeScript settings that work for you.  For
information on additional settings, see the [TypeScript documentation for `tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

Tools like VS Code will give you completion lists, live error reporting and inline documentation help.

<img src="/images/docs/reference/vscode.png" alt="Pulumi TypeScript in VS Code" width="700">

## Disabling built in TypeScript support

You can disable the built in TypeScript support by changing the `runtime` setting in `Pulumi.yaml` to look like the following:

```yaml
runtime:
  name: nodejs
  options:
    typescript: false
```

## Package Management

Pulumi has official support for NPM and Yarn Classic. Pulumi does
not support Yarn Plug'n'Play.

Pulumi defaults to using NPM. However, if Pulumi detects a `yarn.lock` file
in the project root, or the environment variable `PULUMI_PREFER_YARN=true`,
then Pulumi will use Yarn instead of NPM if the executable is available in the
path.

## Package Documentation

In addition to the standard and cloud-agnostic packages the [Pulumi Registry](/registry/) houses 100+ Node.js packages.

### Standard Packages

<dl class="tabular">
    <dt>Pulumi SDK</dt>
    <dd><a href="/docs/reference/pkg/nodejs/pulumi/pulumi">@pulumi/pulumi</a></dd>
    <dt>Pulumi Policy</dt>
    <dd><a href="/docs/reference/pkg/nodejs/pulumi/policy">@pulumi/policy</a></dd>
    <dt>Pulumi Terraform</dt>
    <dd><a href="/docs/reference/pkg/nodejs/pulumi/terraform">@pulumi/terraform</a></dd>
</dl>

### Cloud-Agnostic Packages

<dl class="tabular">
    <dt>Pulumi Cloud Framework</dt>
    <dd>
        <a href="/docs/reference/pkg/nodejs/pulumi/cloud">@pulumi/cloud</a>
        <span class="ml-2 badge badge-preview">PREVIEW</span>
        <p>A highly productive, cloud-agnostic package for container and serverless programming.</p>
    </dd>
</dl>
