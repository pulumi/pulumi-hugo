---
title: "Terminology and Command Equivalence"
meta_desc: "Pulumi is like Terraform: create, deploy, and manage infrastructure as code on any cloud. But unlike Terraform you can use familiar languages and tools."
---

If you're already familiar with Terraform, learning Pulumi terminology and commands is simple. Many of the existing Terraform vocabulary and commands that you already know have direct equivalents in Pulumi. The table below lists common Terraform terms and CLI commands along with their Pulumi equivalents.

| Terraform | Pulumi |
| --------- | ------ |
| `init` | `pulumi new` |
| `validate` | |
| `plan` | `pulumi preview` |
| `apply` | `pulumi up` |
| `destroy` | `pulumi destroy` |
| `console` |
| `fmt` | |
| `force-unlock` | |
| `get` | |
| `graph` | `pulumi stack graph` |
| `import` | `pulumi import -f resources.json` |
| `login` | `pulumi login` |
| `logout` | `pulumi logout` |
| `output` | `pulumi stack output` |
| `providers` | `pulumi plugin` |
| `refresh` | `pulumi refresh` |
| `show` | `pulumi stack` |
| `state` | `pulumi state` |
| `taint` | `pulumi up --replace` |
| `untaint` | |
| `version` | `pulumi version` |
| `workspace` | `pulumi stack` |
