---
title_tag: Store and Retrieve Secrets | Pulumi ESC
title: Store and retrieve secrets
h1: "Pulumi ESC: Store and Retrieve Secrets"
meta_desc: This page provides an overview on how to store and retrieve secrets in Pulumi ESC.
weight: 4
menu:
  pulumiesc:
    parent: esc-get-started
    identifier: esc-get-started-store-retrieve-secrets

---

## Store Environment Values

In an environment file, values are defined as a series of key-value pairs in YAML format. All variables will be defined under a top-level key named `values`. These values can be strings, numbers, or arrays, and they can be manually provided, dynamically generated from external sources, or referenced from other values in the file.

```yaml
values:
  myKey1: "myValue1"
  myNestedKey:
    myKey2: "myValue2"
```

You can store values in an environment via the Pulumi Cloud console or via the CLI.

### Store values via the console

To store values in your environment, first click on the name of the environment to open its definition editor. You will be presented with a split pane view. The left side is where you will write the definition of your environment configuration, and the right side will show a preview of your configuration in JSON format.

{{< video title="Open environment in Pulumi ESC console" src="/docs/esc/get-started/esc-open-env.mp4" autoplay="true" loop="true" >}}

Next, delete the placeholder text in the environment file and add the following simple configuration definition in its place:

```yaml
values:
  myEnvironment: "development"
```

Then click the **Save** button located at the bottom of the editor.

{{< video title="Adding values to the environment in the Pulumi ESC console" src="/docs/esc/get-started/esc-add-env-values.mp4" autoplay="true" loop="true" >}}

### Store values via the CLI

To store values or update an existing value via the CLI, use the `esc env set` command as shown below, where `<org-name>` is optional and defaults to your Pulumi Cloud username:

```bash
esc env set [<org-name>/]<environment-name> <key> <value>
```

Now add the following simple configuration definition to your environment using the following command:

```bash
esc env set my-dev-environment myEnvironment development
```

This will create a configuration value with a key of `myEnvironment` and a value of `development`.

## Retrieve Environment Values

Now that you have populated your environment file, you can verify that your values have been successfully stored by retrieving them through the console or via the CLI.

### Retrieve values via the console

TBD

### Retrieve values via the CLI

The CLI has a built-in `get` command that enables you to retrieve a single value from your environment. The format of the full command looks like the following:

```bash
esc env get [<your-org>/]<your-environment-name> <variable-key-name>
```

To retrieve the value of the `myEnvironment` variable you created earlier, the command to do so would look like the following:

```bash
esc env get my-dev-environment myEnvironment
```

Running this command should return the following response:

```bash
$ esc env get my-dev-environment myEnvironment
   Value
  
    "development"
  
   Definition
  
    development
  
   Defined at
  
  • my-dev-environment:2:8
```

{{< get-started-stepper >}}
