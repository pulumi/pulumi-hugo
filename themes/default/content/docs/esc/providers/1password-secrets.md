---
title_tag: 1password-secrets Pulumi ESC Provider
meta_desc: The `1password-secrets` provider enables you to dynamically import Secrets from 1Password into your Environment.
title: 1password-secrets
h1: 1password-secrets
meta_image: /images/docs/meta-images/docs-meta.png
menu:
    pulumiesc:
        identifier: 1password-secrets
        parent: esc-providers
        weight: 1
aliases:
- /docs/pulumi-cloud/esc/providers/1password-secrets/
---

The `1password-secrets` provider enables you to dynamically import Secrets from 1Password into your Environment. The provider will return a map of names to Secrets.

{{% notes type="warning" %}}
This provider is currently in **preview**.
{{% /notes %}}

## Example

```yaml
  1password:
    login:
      fn::open::1password-login:
        address: https://127.0.0.1:8200/
        jwt:
          role: example-role
    secrets:
      fn::open::1password-secrets:
        login: ${1password.login}
        read:
          api-key:
            path: api-key
          app-secret:
            path: app-secret
```


## Inputs

| Property | Type                                                   | Description                               |
|----------|--------------------------------------------------------|-------------------------------------------|
| `login`  | [1PasswordSecretsLogin](#1passwordsecretslogin)        | Credentials used to log in to 1Password.  |
| `get`    | map[string][1PasswordSecretsGet](#1passwordsecretsget) | The secrets to get.                       |

### 1PasswordSecretsLogin

| Property              | Type   | Description                                                                   |
|-----------------------|--------|-------------------------------------------------------------------------------|
| `serviceAccountToken` | string | The service account token to use for authentication..                         |

### 1PasswordSecretsGet

| Property | Type   | Description                                  |
|----------|--------|----------------------------------------------|
| `ref `   | string | A [reference to a secret](https://developer.1password.com/docs/cli/secrets-reference-syntax) of the form `op://vault-name/item-name/[section-name/]field-name` to read from 1Password.  |

<!-- map[string][1PasswordSecretsGetRef](#1passwordsecretsgetref) -->
<!-- ### 1PasswordSecretsGetRef -->

### Outputs

| Property | Type   | Description                        |
|----------|--------|------------------------------------|
| N/A      | object | A map from names to secret values. |
