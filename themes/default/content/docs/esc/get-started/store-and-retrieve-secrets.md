---
title_tag: Store and Retrieve Secrets | Pulumi ESC
title: Store and retrieve secrets
h1: "Pulumi ESC: Store and retrieve secrets"
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

To store values in your environment, first click on the name of the environment to open its definition editor.

{{< video title="Open environment in Pulumi ESC console" src="./esc-open-env.mp4" autoplay="true" loop="true" >}}

In the editor, you will be presented with a split pane view. The left side is where you will write the definition of your environment configuration, and the right side will show a preview of your configuration in JSON format.

### Store values via the CLI

TBD

## Retrieve Environment Values

Now that you have populated your environment files, you can verify that your values have been successfully stored by retrieving them through the Pulumi ESC CLI.

The CLI has a built-in `get` command that enables you to retrieve a single value from your environment. The format of the full command looks like the following:

```bash
esc env get <your-org>/<your-environment-name> <variable-key-name>
```

Let's assume that your Pulumi organization is named `acme` and the environment that you want to retrieve values from is named `app-env-dev`. If you want to retrieve the value of the `API_KEY` variable, the command to do so would look like the following:

```bash
esc env get acme/app-env-dev API_KEY
```

Running this command should return the value of the API key that you added to your environment file. The output will look similar to the following:

```bash
$ esc env get acme/app-env-dev API_KEY
"M28zraZb2b42Fu0MD1CA"
```

{{< get-started-stepper >}}
