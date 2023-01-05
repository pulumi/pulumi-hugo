---
title_tag: Configuring OpenID Connect for Azure | OIDC
title: Configuring OpenID Connect for Azure
meta_desc: This page describes how to configure OIDC token exchange in Azure for use with Pulumi Deployments
menu:
    userguides:
        parent: oidc
        weight: 1
---

This document outlines the steps required to configure Pulumi Deployments to use OpenID Connect to authenticate with Azure. OIDC in Azure uses [workload identity federation](https://learn.microsoft.com/en-us/azure/active-directory/develop/workload-identity-federation) to access Azure resources via an Azure Active Directory App. Access to the temporary credentials is authorized using federated credentials that validate the contents of the OIDC token issued by the Pulumi Service.

{{% notes type="warning" %}}
Although Pulumi Deployments can exchange an OIDC token for temporary Azure credentials, these credentials cannot be used with the Azure Classic or Azure Native packages. Enabling OIDC in these providers is tracked by [GitHub Issue #1324 in the Azure Native repository](https://github.com/pulumi/pulumi-azure-native/issues/1324).
{{% /notes %}}

## Prerequisites

* You must be an admin of your Pulumi organization.

## Creating the Azure Active Directory App

To create the Azure Active Directory App and service principal, see the [relevant Azure documentation](https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal).

After the AAD App has been created, take note of the Application (client) ID and Directory (tenant) ID. These values will be necessary when enabling OIDC for your stack.

## Adding federated credentials

Navigate to the "Certificates & secrets" pane using the sidebar. Then, select the "Federated credentials" tab and click on the "Add credential" button.

In the wizard, select "Other Issuer" as the "Federated credential scenario".

Finally, fill in the "Issuer", "Subject Identifier", "Name", and "Audience" fields in the form.

* "Issuer" must be `https://api.pulumi.com/oidc`
* "Subject Identifier" must be a valid [subject claim](/docs/guides/oidc/#overview)
* "Name" is an arbitrary name for the credential
* "Audience" must be the name of your Pulumi organization

Because Azure's federated credentials require that the subject identifier exactly matches an OIDC token's subject claim, this process must be repeated for each permutation of the subject claim that is possible for a stack. For example, in order to enable all of the valid operations on a stack named `dev` of the `core` project in the `contoso` organization, you would need to create credentials for each of the following subject identifiers:

* `pulumi:deploy:org:contoso:project:core:stack:dev:operation:preview:scope:write`
* `pulumi:deploy:org:contoso:project:core:stack:dev:operation:update:scope:write`
* `pulumi:deploy:org:contoso:project:core:stack:dev:operation:refresh:scope:write`
* `pulumi:deploy:org:contoso:project:core:stack:dev:operation:destroy:scope:write`

## Enabling OIDC for your Stack

1. Navigate to your stack in the Pulumi Console.
2. Open the stack's "Settings" tab.
3. Choose the "Deploy" panel.
4. Under the "OpenID Connect" header, toggle "Enable Azure Integration".
5. Enter the client and tenant IDs for the app registration created above in the "Client ID" and "Tenant ID" fields, repsectively.
6. Enter the ID of the subscription you want to use in the "Subscription ID" field.
7. Click the "Save deployment configuration" button.

With this configuration, each deployment of this stack will attempt to exchange the deployment's OIDC token for Azure credentials using the specified AAD App prior to running any pre-commands or Pulumi operations. The fetched credentials are published in the `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`,  and `AZURE_SUBSCRIPTION_ID` environment variables. The raw OIDC token is also available for advanced scenarios in the `PULUMI_OIDC_TOKEN` environment variable and the `/mnt/pulumi/pulumi.oidc` file.
