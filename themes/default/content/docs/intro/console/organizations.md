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

## Third-party Identity Providers

Pulumi organizations need to be linked to a third-party identity provider, offering an
additional layer
of security for you and your team. While membership within the Pulumi organization is
managed by
a Pulumi organization admin, you must be a member of the backing third-party identity
provider in order
to join a Pulumi organization.

For example, if a Pulumi organization, is backed by a GitHub organization, then only members of the GitHub organization can be
added to Pulumi organization. Similarly, as soon as someone loses access to the GitHub organization, they will no
longer have access to the Pulumi organization it is backing.

### GitHub-backed Identity Provider

[Setting up a GitHub Organization, project and team](https://github.com/collab-uniba/socialcde4eclipse/wiki/How-to-setup-a-GitHub-organization,-project-and-team)

To add a GitHub-backed organization to Pulumi, an admin of the GitHub organization
must
first grant the Pulumi OAuth app the [`read:org` scope](https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/#available-scopes).
This can be done from
[GitHub Settings]](https://github.com/settings/connections/applications/7cf9078f3c92b17a5f0f).

The Pulumi Console
will not have access to any of the organization's source code, issues, or other data.

### GitLab-backed Identity Provider

[GitLab Groups](https://docs.gitlab.com/ce/user/group/)

To add a GitLab-backed organization to Pulumi, an admin of the GitLab group
must add the group to Pulumi, and invite its members to join Pulumi.

GitLab allows group admins to add members with a expiration value. In order to invite
those members to Pulumi, their membership in the GitLab group must still be active. As
soon as their
GitLab group membership expires, those users will lose access to the GitLab-backed
organization on Pulumi.

### Bitbucket-backed Identity Provider

[BitBucket Workspaces](https://bitbucket.org/blog/introducing-workspaces)

To add a Bitbucket-backed organization to Pulumi, an admin of the Atlassian
Bitbucket workspace
must first grant the Pulumi Oauth app [read
access](https://confluence.atlassian.com/bitbucket/oauth-on-bitbucket-cloud-238027431.html#OAuthonBitbucketCloud-Scopes)
to their Bitbucket account and workspace membership information.

Once the Pulumi organization has been created, the admin can see a list of Bitbucket workspace
members
that they can add or invite to the Pulumi organization

## SAML Single Sign-on (SSO)

Pulumi Enterprise includes SAML 2.0 support.

* [Configure SAML-based Pulumi organization]({{< relref "/docs/guides/saml" >}})
* [Azure Active Directory]({{< relref "/docs/guides/saml/aad" >}})
* [G Suite]({{< relref "/docs/guides/saml/gsuite" >}})
* [Okta]({{< relref "/docs/guides/saml/okta" >}})

## Changing Membership Requirements

Every organization is backed by an identity. The identity governs the membership to your org.
By default, when you add a new org to Pulumi, it uses the Pulumi identity. This means the membership is
_only_ governed by a user having a Pulumi account and no additional identity requirements are placed on members.

Regardless of the identity your organization uses, membership is always invite-only. Everyone, other than the
organization creator, must be invited by an admin to join.

If you want your org to mirror an org on a third party identity service such as GitHub, GitLab, or Bitbucket, you can
change the backing identity. Changing your organization's backing identity changes the membership requirements you place
on your members.

To switch an organization's backing identity you must be an organization admin.

1. Navigate to the organization's **Settings** page.
1. Then navigate to **Access Management**.
1. Select the **Membership Requirements** button.
