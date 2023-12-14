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

In an environment file, values are defined as a series of key-value pairs in YAML format. All variables will be defined under a top-level key named `values`. These values can be strings, numbers, or arrays, and they can be manually provided, dynamically generated from external sources, or referenced from other values in the file.

```yaml
values:
  myKey1: "myValue1"
  myNestedKey:
    myKey2: "myValue2"
```

{{< get-started-stepper >}}
