---
title: Organizations
meta_desc: An overview of Organizations within the Pulumi Cloud Service.
menu:
  intro:
    parent: console
    weight: 2
aliases:
- /docs/reference/service/orgs/
- /docs/console/accounts/organizations/
- /docs/intro/console/accounts/organizations/
- /docs/intro/console/organization-roles/
---

Organizations allow you to collaborate with your team together in the Pulumi Console.

## Organization Pages

| Console Page | Description |
|--------|--------|
| Dashboard | An overview of the organization including recently updated stacks, recent activity, and a resource count graph. |
| Projects | A searchable list of organization stacks that you can group by project and tag. |
| Members | A list of active members of the Pulumi organization. |
| Teams | A [Team Pro]({{< relref "/pricing" >}}) feature that provides a way to assign stack permissions to groups of organization members. |
| Policies | Lists of organization policies and policy groups. Policies allow you to set guardrails to enforce best practices and compliance. |
| Settings | Organization settings including subscription and payment information and history, stack permissions, and links to Pulumi's [continuous delivery guides]({{< relref "/docs/guides/continuous-delivery" >}}). |

## Organization Roles

| Role | Description |
|--------|--------|
| Admin | Administrators have full access to the organization including: [Inviting members]({{< relref "/docs/intro/console/organization-roles#organization-membership" >}}), [creating teams](({{< relref "/docs/intro/console/teams#creating-a-team" >}})) and policies, managing stack permissions and [role-based access control](({{< relref "/docs/intro/console/organization-roles" >}})), adjusting billing information and controlling the organization settings. |
| Member | Members are able to view and edit stacks they have access to and view members and teams. |

### Stack Permissions

Any organization member with the `Admin` role automatically has `Admin`
permissions for all of the organization's stacks. Regular organization members
are granted the organization's _base permissions_ instead.

For example, if the organization's base permissions is `Write`, then
any organization member can update any organization stack.

If the stack permission for all members is `None`, then organization members must be
granted access using [teams]({{< relref "teams" >}}) in order to update, or even [view the organization
stacks]({{< relref "project-and-stack-management#viewing-your-organization-stacks" >}}).

Additionally, organization admins can toggle whether organization members can create stacks, whether
stack admins can delete stacks, and whether stack admins can move stacks to other organizations.

## Creating a New Organization

You can create a new Pulumi organization directly from the Pulumi Console by opening the organization menu in the top-navigation and choosing **New organization...*

## Moving Between Organizations

The Organization drop-down list displays all of the organizations your account is
associated with, and lets you add a new organization backed by a third
party identity provider. To switch to a different organization:

1. Select the organization drop-down list in the upper left corner of the Console screen
next to the Pulumi logo.
1. Select your organization name.

## Getting Access to an Organization

To become a member of a Pulumi organization, you must be invited by an existing Pulumi
organization administrator, or you must submit a request to the administrator for approval.
In addition, depending you may also need to be a member of the third-party organization or group backing the Pulumi organization.

For example, to become a member of a Pulumi organization backed by a GitLab Group,
you must associate a GitLab identity with your Pulumi account, and also
be a member of that GitLab group.

## Transferring Stacks

Stack admins can transfer their stacks between personal accounts and organizations, or between organizations.
If transferring to an organization, the **Allow organization members to create stacks and transfer stacks to this organization** setting must be turned on from the **Access Management** page in the organization settings.

1. Navigate to the stack in the console.
1. Navigate to the stack **Settings** page.
1. Use the **Transfer stack** button.
1. Provide the personal account or organization name and select **Transfer**

## Third-party Identity Providers

A Pulumi organization needs to be linked to a third-party identity provider, offering an
additional layer
of security for you and your team. While membership within the Pulumi organization is
managed by
an organization admin, you must be a member of the backing third-party identity
provider in order
to join a Pulumi organization.

For example, if a Pulumi organization, `https://app.pulumi.com/robot-co`, is backed by
a GitHub organization,
`https://github.com/robot-co`, then only members of `https://github.com/robot-co` may be
added to `https://app.pulumi.com/robot-co`.
Similarly, as soon as someone loses access to the GitHub organization, they will no
longer have access to the Pulumi organization it is backing.

In addition, a Pulumi organization may be backed by a [SAML 2.0 identity provider]({{<
relref "/docs/guides/saml" >}}).

### GitHub-backed

[Setting up a GitHub Organization, project and team](https://github.com/collab-uniba/socialcde4eclipse/wiki/How-to-setup-a-GitHub-organization,-project-and-team)

To add a GitHub-backed organization to Pulumi, an admin of the GitHub organization
must
first grant the Pulumi OAuth app the `read:org` scope. This can be done on GitHub's
[Applications
page](https://github.com/settings/connections/applications/7cf9078f3c92b17a5f0f).

Pulumi requires the [`read:org`
scope](https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/#available-scopes)
in order to verify memberships within the GitHub organization. The Pulumi Console
will not have access to any of the organization's source code, issues, or other data.

### GitLab-backed

[GitLab Groups](https://docs.gitlab.com/ce/user/group/)

To add a GitLab-backed organization to Pulumi, an admin of the GitLab group
may add the group to Pulumi, and invite its members to join Pulumi.

GitLab allows group admins to add members with a temporary membership, i.e., with an
expiration value. In order to invite
those members to Pulumi, their membership in the GitLab group must still be active. As
soon as their
GitLab group membership expires, those users will lose access to the GitLab-backed
organization on Pulumi.

### Bitbucket-backed

[BitBucket Workspaces](https://bitbucket.org/blog/introducing-workspaces)

To add a Bitbucket-backed organization to Pulumi, an admin of the Atlassian
Bitbucket workspace
must first grant the Pulumi Oauth app [read
access](https://confluence.atlassian.com/bitbucket/oauth-on-bitbucket-cloud-238027431.html#OAuthonBitbucketCloud-Scopes)
to their Bitbucket account and workspace membership information.

Once the Pulumi organization has been created, the admin can see a list of Bitbucket workspace
members
that they can add or invite to the Pulumi organization. See [Switching
Organizations](#switching-organizations)
to learn more.

## SAML Single Sign-on (SSO)

Pulumi Enterprise provides more options for identity and access, including
support for any SAML 2.0-based identity provider.

[Learn more]({{< relref "/docs/guides/saml" >}}) about configuring a SAML-based
organization on Pulumi. Or refer to one
of our guides:

* [Azure Active Directory]({{< relref "/docs/guides/saml/aad" >}})
* [G Suite]({{< relref "/docs/guides/saml/gsuite" >}})
* [Okta]({{< relref "/docs/guides/saml/okta" >}})

If you need help configuring or would like us to officially support another SAML identity
provider,
please [contact us]({{< relref "/about#contact-us" >}}).

## Changing Membership Requirements

Every organization is backed by an identity. The identity governs the membership to your org.
By default, when you add a new org to Pulumi, it uses the Pulumi identity. This means the membership is
_only_ governed by a user having a Pulumi account and no additional identity requirements are placed on members.

{{% notes %}}
Regardless of the identity your org uses, org membership is always invite-only. Only the creator of the org gets automatic access. Everyone else must be invited by an admin to be admitted into the org.
{{% /notes %}}

However, if you want your org to mirror an org on a third party identity service such as GitHub, GitLab, or Bitbucket, you can
change the backing identity. Enterprises can also choose SAML as the backing identity provider for an org as discussed in [SAML Single Sign-on](#saml-single-sign-on-sso). Changing your org's backing identity essentially changes the membership requirements you place
on your members.

Before you change your org's backing identity, ensure that all of its current members can satisfy the membership
requirement of the org in the new identity service. That is, if you are switching from a GitHub-backed to a GitLab-backed
org, ensure that all of your members are actually a member of the corresponding GitLab Group which your org would be
changed to inherit from.

To switch an organization's backing identity you must be an organization admin.
Navigate to the organization's **Settings** page. Then navigate to **Access Management**
and select the **Membership Requirements** button to get started with changing your
organization's identity.
