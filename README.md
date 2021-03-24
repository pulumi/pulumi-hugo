# pulumi-hugo

A [Hugo](https://gohugo.io) module containing the Pulumi Hugo theme and website content.

This repository is consumed by https://github.com/pulumi/docs to produce the website at https://pulumi.com. If you're interested in contributing some docs or a blog post at https://pulumi.com/blog, you've come to the right place! 🙌

## Contributing

First, be sure to read [our contributing guide](CONTRIBUTING.md) and take some time to review our [code of conduct](CODE_OF_CONDUCT.md).

## Toolchain

We build the Pulumi website statically with Hugo, manage our Node.js dependencies with Yarn, and write most of our documentation in Markdown. Below is a list of the tools you'll need to run the website locally:

* [Go](https://golang.org/) (version 1.16)
* [Hugo](https://gohugo.io) (version 0.81)
* [Node.js](https://nodejs.org/en/) (version 14)
* [Yarn](https://classic.yarnpkg.com/en/) (version 1)

### CSS and JavaScript Tools

We also use a handful of tools for compiling and managing our CSS and JavaScript assets, including:

* [Sass](https://sass-lang.com/)
* [TailwindCSS](https://tailwindcss.com/)
* [Stencil.js](https://stenciljs.com/)
* [TypeScript](https://www.typescriptlang.org/)

You don't need to install these tools individually or globally; the scripts below should handle everything for you. But if you'd like to contribute any CSS or JavaScript, you'll probably want to understand how to work with each of these tools as well.

## Installing prerequisites

Run `make ensure` to check for the appropriate prerequisites and versions. The script will let you know if you're missing anything important. If all goes well, it'll also produce an initial dev build to make sure you've got everything set up properly.

```
make ensure
```

## Running Hugo locally

Once you've run `make ensure` successfully, you're ready to run the development server. If you're only planning on writing Markdown or making adjustments to Hugo layouts, this command is probably the only one you'll need:

```
make serve
```

Browse the development server at http://localhost:1313. Any changes you make to content or layouts should be reflected automatically.

## Running Hugo with CSS and JavaScript support

If you plan on making any changes to CSS or JavaScript files, you'll probably want to use this command instead:

```
make serve-all
```

The `serve-all` target runs Hugo, node-sass, and the Stencil development server concurrently, allowing you to make changes to Sass files, Stencil components, or TypeScript/JavaScript source files, and have those changes compiled reloaded in the browser automatically.

## Tidying up

To clear away any modules caches or build artifacts, just run:

```
make clean
```

## About this repository

This repo is a [Hugo module](https://gohugo.io/hugo-modules/) that doubles as a lightweight development environment. **It does not contain every page of the Pulumi website**, because most of those pages (e.g., those comprising our CLI and SDK docs) are generated from source code, so they aren't meant to be edited directly.

Because of this, many of the links you follow when browsing around on the development server will fail to resolve because their content files are are checked into a different repository &mdash; most likely https://github.com/pulumi/docs. When we build the Pulumi website, we merge this module (along with any others) into a single build artifact, but when you're running the website locally, you may not be able to see certain pages or verify your links to them.

If you need to link to a page that exists on https://pulumi.com but not in this repository, just use its **relative path** with a [Hugo `relref`](https://gohugo.io/content-management/shortcodes/#ref-and-relref) in the usual way, and we'll make sure all links resolve properly at build-time. For example, if you wanted to link to the documentation for a [Digital Ocean Droplet](https://www.pulumi.com/docs/reference/pkg/digitalocean/droplet/) (a page that doesn't exist in this repo), you'd use:

```
{{< relref /docs/reference/pkg/digitalocean/droplet >}}
```

This works because we've suppressed Hugo's built-in `relref` validation to keep the development experience as lightweight as possible.

### What's in this repo

* All hand-authored content and documentation, including top-level pages, guides, blog posts, and some tutorials
* Most Hugo module components, including archetypes, layouts, partials, shortcodes, etc.

You'll find all of these files in `themes/current`.

### What's not in this repo

* Generated documentation for the Pulumi CLI and SDK: you'll find these docs at https://github.com/pulumi/docs
* Generated tutorials: you'll find these at https://github.com/pulumi/examples
* Templates used for generating resource documentation: you'll find these at https://github.com/pulumi/pulumi
## Blogging

See the [blogging README](BLOGGING.md).

## Shortcodes and web components

See the [components README](themes/current/components).
