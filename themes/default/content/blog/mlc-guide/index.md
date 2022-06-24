---
title: "Authoring Multi-Language Components"

# The date represents the post's publish date, and by default corresponds with
# the date this file was generated. Posts with future dates are visible in development,
# but excluded from production builds. Use the time and timezone-offset portions of
# of this value to schedule posts for publishing later.
date: 2022-06-24T12:55:12-07:00

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or social-media
# previews. This field is required or the build will fail the linter test. 
# Max length is 160 characters.
meta_desc: A brief guide to authoring multi-language components

# The meta_image appears in social-media previews and on the blog home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for you.
# meta_image: meta.png

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - harry-liuson

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - pulumi-interns

# See the blogging docs at https://github.com/pulumi/pulumi-hugo/blob/master/BLOGGING.md.
# for additional details, and please remove these comments before submitting for review.
---
One of Pulumi's most powerful features is the component resource. A component resource is a reusable abstraction for cloud resources and behaviors (see [here](https://www.pulumi.com/docs/intro/concepts/resources/components/) for more details).

A multi-language component is a wrapper for a component resource that allows that resource to be reused by users writing in other languages.

This is done via a provider, which manages the creation of component resources in a given package. A package consists of a plugin and a set of SDKs. The SDKs are generated using your schema, which specifies in detail what resources and types are in your provider, as well as some auxiliary details for the purposes of SDK generation. 

The plugin is a binary which is built using your provider code, which is used by the Pulumi engine to create and destroy your given resources.

This is how Pulumi can support so many different languages in parallel: by defining the behaviors once and autogenerating the SDK code.

<!--more-->


![image](pulumi-package-concepts.png)

## Boilerplate Repos
At the moment, there are three boilerplate repos available for multi-language components:
 - [Typescript](https://github.com/pulumi/pulumi-component-provider-ts-boilerplate)
 - [Go](https://github.com/pulumi/pulumi-component-provider-go-boilerplate)
 - [Python](https://github.com/pulumi/pulumi-component-provider-py-boilerplate)

Pick a boilerplate repo and click "Use this template" in order to create a new repository. 

## Authoring the Provider
At the core of it, a provider implements the `construct()` function, which, given a name, resource type token (which we will discuss momentarily), and a set of arguments, constructs a component resource and returns its outputs. The provider file can be found below in:
 - [Typescript](https://github.com/pulumi/pulumi-component-provider-ts-boilerplate/blob/main/provider/cmd/pulumi-resource-xyz/provider.ts)
 - [Go](https://github.com/pulumi/pulumi-component-provider-go-boilerplate/blob/main/provider/pkg/provider/provider.go)
 - [Python](https://github.com/pulumi/pulumi-component-provider-py-boilerplate/blob/main/provider/cmd/pulumi-resource-xyz/xyz_provider/provider.py)

[//]: # (Comment: Why are the folder structures inconsistent across the boilerplate repos?)

For now, we'll only be concerned with `./provider`, you can safely ignore the other folders. Go through and change all instances of `xyz` IN `./provider` to your provider name - for instance, `my-component`. This includes folder names and file names. So in the typescript repo, `./provider/cmd/pulumi-resource-xyz` would be changed to `provider/cmd-pulumi-resource-my-component`. 

Once we've successfully renamed everything in `./provider`, we have to go in and define our specific behavior. Each component resource needs a **type token**. This will be of the format `my-component:foo:bar`. It is recommended that you set these variables as constants in code, as they are needed in a couple places, are case sensitive, and can cause nasty bugs! Then you just have to configure `construct()` to match the component resource to its type token. For your first component resource, you can just copy the logic to construct `xyz:index:StaticPage` with `my-component:foo:bar`.

## Schema

The schema is used to automatically generate SDKs and documentation. It describes, in detail, all types, resources, and functions in your package, their inputs and outputs, and various other information. Complete documentation can be found [here](https://www.pulumi.com/docs/guides/pulumi-packages/schema/).

It can be authored in JSON or YAML. The file should be at top level and be named `schema.json` or `schema.yaml`

A package has a number of important fields. Pay attention to:
- Name
- Version
- Description
- Language (Defines language-specific options and dependencies for SDK generation)
- Types (Defines package-specific object types and enums)
- Resources (Defines component resources)

There are a number of language-specific options that you can look at in the documentation, but first we want to add our dependencies in. Once you've written your provider, you'll want to put those dependencies and their versions into the schema. There are already-existing examples in the boilerplate repos.

Now, if you've defined any objects or enums as inputs or outputs of any resources, define them in types. Suppose I have a enum of strings. It would be defined as follows, in JSON:
```json
"my-package:foo:enum": { //ComplexType
    "description": "An example enum",
    "type": "string",
    "enum": [ //array[EnumValue]
        { //EnumValue
            "value": "bar"
        },
        { //EnumValue
            "value": "baz"
        }
    ]
}
```
Now, say we wanted to create an object with fields of type int, and the enum we defined above. It would be defined as such:
```json
"my-package:foo:object": { //ComplexType
    "description": "An example object",
    "properties": { //map[Property]
        "bar": { //Property
            "description": "a number",
            "type": "integer"
        },
        "baz": { //Property
            "description": "an enum",
            "$ref": "#types/my-package:foo:enum"
        }
    }
}
```
Note that all Properties require either a primitive `type` or a `$ref` to a complex type or resource defined elsewhere in your package. The format is `#types/` or `#resources/` followed by the type token of the type or resource referenced. 




{{% notes type="warning" %}}
It is possible reference a type token from a different package than your own, but this is discouraged unless you know what you are doing, since it can be difficult and time-consuming to set up external references. External enums are also currently not supported, so in that case it is recommended to duplicate the values in your own schema.
Generally, if your component resource requires external resources to be passed in, it is recommended instead to use the name of the resource instead, and use the name to fetch whatever properties of the given resource are necessary.
{{% /notes %}}

Now, we define our resource under `"resources"`. Make sure to match the names of your inputProperties to the actual args of the component resource, and likewise for any output properties. You can designate zero or more input properties as required.
```json
"my-package:foo:bar": { //Resource
    "description": "A multi-language component resource",
    "inputProperties": { //map[Property]
        "bar": { //Property
            "description": "an object",
            "$ref": "#types/my-package:foo:object"
        },
        "baz": { //Property
            "description": "required input!",
            "type": "string"
        },
        "qux": { //Property
            "type": "integer"
        }
    },
    "properties": { //map[Property]
        "quz": { //Property
            "description": "a property that can be exported",
            "type": "string"
        }
    },
    "requiredInputs": [//array[string]
        "baz"
    ]
}
```
## Building the Binaries and SDKs

Now that our provider and our schema have been authored, we can go ahead and generate our plugin binaries and our SDKs. Make sure your type tokens and property names match up between the provider and the schema, and give everything a once-over to make sure you're not missing anything obvious. Make sure you have the correct versions of all the dependencies specified in the boilerplate repo.

Ready? Go into your makefile. At the top, it should say 
`PACK            := xyz`.
Change that to:

`PACK            := my-component`



Go ahead and run `make install_provider` This may take a long time, as it has to pull in external dependencies like any pulumi providers you are using such as `aws` or `azure-native`. This should generate all the plugin binaries and add them to your `PATH`. This will allow the Pulumi CLI to find your provider when it's invoked from the SDKs.

Next, run `make generate`. This should generate all your SDKs in `./sdk`. There should be four subdirectories, `./sdk/go`, `./sdk/dotnet`, `./sdk/nodejs`, and `./sdk/python`.



You should now be able to install the SDKs and test them on your local machine. Now is a good time to create a simple typescript pulumi project in `./examples` and test it. Run `make install_nodejs_sdk` and then run `yarn link @pulumi/my-component` from your project directory. Now you should be able to use your multi-language component!

Note that the name of the package in npm, `@pulumi/my-component`, is an example of something that can be overriden in the schema. We would write:
```json
"language": {
    "nodejs": {
        "packageName": "@pulumi/differentname"
    }
}
```

## Conclusion
Hopefully, you now have an idea of how to get started authoring your own multi-langauge components. The boilerplate repositories may contain issues, so if you believe something is not behaving as intended, please open an issue. 