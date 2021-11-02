# pulumi-hugo

A [Hugo](https://gohugo.io) module containing the Pulumi Hugo theme and website content.

This repository is consumed by https://github.com/pulumi/docs to produce the website you see at https://pulumi.com. If you're interested in contributing some docs or a blog post at https://pulumi.com/blog, you've come to the right place! 🙌

## About this repository

This repository is a [Hugo module](https://gohugo.io/hugo-modules/) that doubles as a development server. **It does not contain every page of the Pulumi website**, because many of those pages (e.g., those comprising our CLI and SDK docs) are generated from source code, so they aren't meant to be edited by humans directly.

Because of this, many of the links you follow when browsing around on the development server (to paths underneath `/docs/reference` for example) will fail to resolve because their content files are checked into a different repository. When we build the Pulumi website, we merge this module along with any others into a single build artifact, but when you're working within an individual module like this one, you may find you're unable to reach certain pages or verify the links you may want to make to them.

If you want to link to a page that exists on https://pulumi.com but not in this repository, just use the page's **root-relative path** with a [Hugo `relref`](https://gohugo.io/content-management/shortcodes/#ref-and-relref) in the usual way, and we'll make sure all links resolve properly at build-time. For example, to link to the [Digital Ocean Droplet](https://www.pulumi.com/docs/reference/pkg/digitalocean/droplet/) page (a page that doesn't exist in this repository but that would exist in an integration build), you'd use:

```
{{< relref /docs/reference/pkg/digitalocean/droplet >}}
```

This works because we've suppressed Hugo's built-in `relref` validation to keep the development workflow as lightweight as possible.

See below to learn more about contributing, submitting pull requests, merging, and releasing.

### What's in this repo

* Most hand-authored content and documentation, including top-level/marketing pages and blog posts.
* Most Hugo module components, including archetypes, layouts, partials, shortcodes, data, etc.

You'll find all of these files in `themes/default`.

### What's not in this repo

* CSS and JavaScript source code. You'll find these at https://github.com/pulumi/theme.
* Content and layouts for Pulumi Registry. You'll find that at https://github.com/pulumi/registry.
* Generated documentation for the Pulumi CLI and SDK. You'll find this at https://github.com/pulumi/docs.
* Tutorials and how-to guides. You'll find the source for these at https://github.com/pulumi/examples.
* Templates for generating package documentation. You'll find these at https://github.com/pulumi/pulumi.

## Contributing

Before you get started, be sure to read the [contributing guide](CONTRIBUTING.md) and review our [code of conduct](CODE_OF_CONDUCT.md).

## Toolchain

We build the Pulumi website statically with Hugo, manage our Node.js dependencies with Yarn, and write most of our documentation in Markdown. Below is a list of the tools you'll need to run the website locally:

* [Go](https://golang.org/)
* [Hugo](https://gohugo.io)
* [Node.js](https://nodejs.org/en/)
* [Yarn](https://classic.yarnpkg.com/en/)

### CSS and JavaScript Tools

We also use a handful of tools for compiling and managing our CSS and JavaScript assets, including:

* [Sass](https://sass-lang.com/)
* [TailwindCSS](https://tailwindcss.com/)
* [Stencil.js](https://stenciljs.com/)
* [TypeScript](https://www.typescriptlang.org/)

You don't need to install these tools individually or globally; the scripts below will handle everything for you. But if you'd like to contribute any CSS or JavaScript, you'll probably want to understand how to work with each of these tools as well.

## Installing prerequisites

Run `make ensure` to check for the appropriate tools and versions and install any dependencies. The script will let you know if you're missing anything important.

```
make ensure
```

## Running the development server

Once you've run `make ensure` successfully, you're ready to run the development server. If you're only planning on writing Markdown or working with Hugo layouts, this command should be all you need:

```
make serve
```

When you do this, Hugo will load the latest versions of:

* The [pulumi/pulumi-hugo](https://github.com/pulumi/pulumi-hugo) module, which contains our marketing pages, some docs content, the blog, etc.
* The [pulumi/theme](https://github.com/pulumi/theme) module, which contains our CSS and JavaScript bundles (web components, styles, etc.).

... and then start a development server at http://localhost:1313. Any changes you make to the content, layouts, or other [Hugo component folders](https://gohugo.io/getting-started/directory-structure/) should be reloaded automatically.

### Blogging

Interested in writing a blog post? See the [blogging README](BLOGGING.md) for details.

### Developing alongside another Hugo module

If you want to develop another module alongside this one -- e.g., to make changes to Registry-specific CSS -- you can point your development server to a local clone of that module. To do so, first clone the repository you want to use, then add a `replace` line to the `go.mod` file at the root of _this_ repository to override the existing reference to the module temporarily. For instance, to make changes to [pulumi/theme](https://github.com/pulumi/theme) as you develop in this repo:

```
module github.com/pulumi/pulumi-hugo

go 1.16

require (
	github.com/pulumi/theme v0.0.0-20211015193555-271ef1f67093 // indirect
)

// Add this line to tell Hugo to use your local clone of pulumi/theme.
replace github.com/pulumi/theme => ../theme
```

**Tip:** If you run `make serve` from the root of pulumi/theme (in another terminal tab) while also running `make serve` in this one, the changes you make to the CSS and JavaScript source files in pulumi/theme will be recompiled and reloaded in the browser automatically.

Be sure to remove the `replace` line before you commit.

### Linking to pages that don't exist in this repository

If you want to link to a page that exists on https://pulumi.com but not in this repository, you can still use a [Hugo `relref`](https://gohugo.io/content-management/shortcodes/#ref-and-relref) in the usual way -- you'll just need to make sure the path you're linking to does exist (or will exist by the time you merge your change). For example, to add a link pointing to the [Pulumi CLI documentation](https://www.pulumi.com/docs/reference/cli/) (which does not exist in this repository), you'd use:

```
{{< relref /docs/reference/cli >}}
```

... and just be aware while the link won't work for you locally, it will work once your change is merged and picked up by our website automation (see [Merging and releasing](#merging-and-releasing)] below for details). This works because we've suppressed Hugo's built-in `relref` validation locally to keep the module-development workflow as lightweight as possible.

## Linting and testing

To check your code and your Markdown files for problems before submitting, run:

```
make lint test
```

## Tidying up

To clear away any module caches or build artifacts, run:

```
make clean
```

## Merging and releasing

When you're ready to submit a pull request, make sure you've removed anything that doesn't seem to belong (e.g., `go.mod`/`go.sum` changes, content you pulled in temporarily, etc.), [submit a PR](pulls) in the usual way, and someone from the team will review it.

If you're doing work in another repository that's associated with the changes in your PR, you can "pin" your PR branch to another module repository branch by pointing Hugo to that branch. To do that, use `hugo mod get` and pass a reference to the target branch:

```
hugo mod get github.com/pulumi/theme@my-special-branch
```

This will modify `go.mod` and `go.sum` accordingly and result in a PR preview that incorporates your changes from the other branch. Just be sure to remove these changes before you're ready to merge.

Once your PR is approved and merged into the default branch of this repository, an automated process that runs on [pulumi/docs](https://github.com/pulumi/docs) will detect your changes and produce a PR and integration build containing content from all other Hugo modules. Once that PR build completes and is approved and merged into pulumi/docs, your changes will be deployed to https://pulumi.com.

![](https://user-images.githubusercontent.com/274700/139131567-b8e3c43d-6407-4638-ae4e-4ad3f3794d89.png)
