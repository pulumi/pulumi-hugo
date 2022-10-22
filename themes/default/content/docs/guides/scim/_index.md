---
title: SCIM 2.0 Integration
meta_desc: This page provides an overview of how to configure any SAML 2.0 identity provider
           with the Pulumi Service.
menu:
    userguides:
        weight: 9
        identifier: scim

---

The [Pulumi Service](https://app.pulumi.com) supports System for Cross-domain Identity Management (SCIM) 2.0 integration with different identity providers. SCIM enables you to manage your users and groups centrally in your Identity Provider (IdP) and then synchronize those users and groups to the Pulumi Service. This support requires Pulumi Business Critical. To learn more about the capabilities of Pulumi Business Critical, see the [pricing page](/pricing).

    {{% notes "info" %}}
If desired, in addition to the SCIM-managed teams, one can also configure and manage Pulumi-local teams in the Pulumi Service. See [Teams](/docs/intro/pulumi-service/teams) for how to configure teams in the Pulumi Service.
    {{% /notes %}}

To set up synchronization between Pulumi and your SAML 2.0 identity provider, refer to one of our example guides:

- [Azure Active Directory](/docs/guides/scim/azuread)
- [Okta](/docs/guides/scim/okta)
- [FAQ](/docs/guides/scim/faq)
