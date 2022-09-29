---
title: "Resource Options"
meta_desc: Resource options can be used to configure how all Pulumi resources are managed.
menu:
  intro:
    identifier: options
    parent: resources
    weight: 2
---

All resource constructors accept an options argument that provide the following resource options:

- [additionalSecretOutputs](additionalsecretoutputs): specify properties that must be encrypted as secrets.
- [aliases](aliases): specify aliases for this resource, so that renaming or refactoring doesn’t replace it.
- [customTimeouts](customtimeouts): override the default retry/timeout behavior for resource provisioning. The default value varies by resource.
- [deleteBeforeReplace](deletebeforereplace): override the default create-before-delete behavior when replacing a resource.
- [dependsOn](dependson): specify additional explicit dependencies in addition to the ones in the dependency graph.
- [ignoreChanges](ignorechanges): declare that changes to certain properties should be ignored during a diff.
- [import](import): bring an existing cloud resource into Pulumi.
- [parent](parent): establish a parent/child relationship between resources.
- [protect](protect): prevent accidental deletion of a resource by marking it as protected.
- [provider](provider): pass an [explicitly configured provider](../providers/#explicit-provider-configuration), instead of using the default global provider.
- [providers](providers): pass a set of [explicitly configured providers](../providers/#explicit-provider-configuration). These are used if provider is not given, and are passed to child resources.
- [replaceOnChanges](replaceonchanges): declare that changes to certain properties should be treated as forcing a replacement.
- [retainOnDelete](retainOnDelete): if true the resource will be retained in the backing cloud provider during a Pulumi delete operation.
- [transformations](transformations): dynamically transform a resource’s properties on the fly.
- [version](version): pass a provider plugin version that should be used when operating on a resource.
