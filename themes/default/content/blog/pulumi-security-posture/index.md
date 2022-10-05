---
title: "Pulumi Security Posture"

date: 2022-10-06

meta_desc: Pulumi Security Posture.  Organization Access Token, Team Access Token, Teams, and Managed Federated Identity

meta_image: meta.png

authors:
    - tushar-shah

tags:
    - security
    - pulumi-enterprise

---

Cloud’s greatest strength and weakness is the proliferation of a massive number of services globally. In order to adequately assess and mitigate the inherent risks for your company, your customers, and your employees, Cloud Architects are typically responsible for a massive surface area of potential endpoints and vectors of attack.

<!--more-->

## Cloud Security Posture

AWS likes to talk about a [Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/), their friendly way of saying, “we’ve got our stuff covered and if you’re compromised, it’s almost certainly your fault.”  They have built up practices and recommendations like the AWS Well Architected Framework; pillars of architecture philosophy that give you your best chances to securely use their resources (following these recommendations is easy with [Crosswalk for AWS](https://www.pulumi.com/docs/guides/crosswalk/aws/) from Pulumi).  Increasing high profile attacks against private and open source software supply chains has developers increasingly on high alert and conscious of incorporating more Sec into their DevOps.

Risks associated with maintaining a good Cloud Security Posture extend to your Infrastructure as Code with Pulumi and it’s important to leverage the features and capabilities of the Pulumi Platform along with good industry practices to secure your code, configuration and secrets.

## Pulumi’s Hierarchy

Pulumi has three levels to consider access for: Users, Teams and Organizations.

[Users](https://www.pulumi.com/docs/intro/pulumi-service/accounts/) are tied to personal identities often with an Identity Provider and should be used wherever a human is using Pulumi.  They should not be used for any systems, tools or pipeline based provisioning.

[Teams](https://www.pulumi.com/docs/intro/pulumi-service/teams/) are groups of Users within an Organization with specific permissions to Stacks.  Consider using these to break up access to environments such as Dev, Staging and Production.  You should look to mirror your code repository or IAM teams/groups as much as possible.

[Organizations](https://www.pulumi.com/docs/intro/pulumi-service/organizations/) are a space for you to collaborate on shared projects and stacks.  You may have multiple Cloud Accounts from a single cloud provider or multiple cloud provider Accounts tied to an Organization in any combination.  It’s recommended that you segment Organizations and Cloud Accounts to limit access and the “blast radius” of security or financial events that may occur within them.

## Security Best Practices with Pulumi

The following recommendations should help you get started and prepare you to scale your company, application and cloud engineering team long term.

## Manage Federated Identity

Connect your user and Pulumi Orgs with an [Identity Provider](https://www.pulumi.com/docs/intro/pulumi-service/organizations/#organization-identity-providers) such as [Github](https://www.pulumi.com/docs/intro/pulumi-service/organizations/#github-identity-provider), [Gitlab](https://www.pulumi.com/docs/intro/pulumi-service/organizations/#gitlab-identity-provider) or [BitBucket](https://www.pulumi.com/docs/intro/pulumi-service/organizations/#bitbucket-identity-provider), your [Single Sign On (SSO)](https://www.pulumi.com/docs/intro/pulumi-service/organizations/#saml-single-sign-on-sso) system and/or another [System for Cross-Domain Identity Management](https://www.pulumi.com/docs/guides/scim/) (SCIM).  Your code repositories hold your Infrastructure as Code crown jewels, and most organizations are motivated to keep access tightly controlled.  SSO improves this process across tools and puts more control into your organization’s hands.  SCIM enables you to manage your users and groups centrally in your Identity Provider (IdP) and then synchronize those users and groups to the Pulumi Service.  Leveraging your existing onboarding and offboarding process will help limit the risk of bad actors in Pulumi itself.

## Build Pulumi Teams

[Teams](https://www.pulumi.com/docs/intro/pulumi-service/teams/#creating-a-team) improve on basic Role Based Access Control for Administrators and Users by allowing you to group users and their access to specific Stacks in your Organization.  For example, a team called ProductionReadOnly could be created and scoped so that all Members have only limited access to read the Production Stacks, while another team, ProductionAdmins, would retain full privileges to those stacks.

## Write the Code

Manual process is error prone and difficult to audit, iterate and improve on.  If you’ve created manual resources, consider [importing](https://www.pulumi.com/blog/changes-to-import/) them to Pulumi programs.

## Tag your Stacks

We have previously covered [Tag Policies](https://www.pulumi.com/blog/automatically-enforcing-aws-resource-tagging-policies/) as a best practice for the Cloud Resources themselves, but you can also tag your Pulumi Stacks to help organize and visualize your application resources in logical groupings that will help you assess, respond and automate incident remediation. Here are two examples of using Pulumi’s own Pulumi Provider to tag your Stacks automatically: in [python](https://github.com/pulumi/examples/blob/master/aws-py-stackreference/team/__main__.py#L8-L13) and in [typescript](https://github.com/pulumi/examples/blob/master/aws-ts-stackreference/team/index.ts#L17-L22).

## Deploy from Pipelines

Automate every step of your typical deployment process for anything beyond basic local development from a CI/CD pipeline or triggered by web services. If a human is in the loop, consider their involvement to be limited to the approvals process if needed. Better still is to proactively launch approved resources with [Pulumi Packages](https://www.pulumi.com/docs/guides/pulumi-packages/) and [CrossGuard](https://www.pulumi.com/docs/guides/crossguard/).

Leveraging [Automation API](https://www.pulumi.com/docs/guides/automation-api/) as the programmatic interface for running Pulumi programs without the Pulumi CLI is a strongly typed and safe way to use Pulumi in embedded contexts such as web servers without having to shell out to a CLI. For example, [Elkjop Nordic uses Automation API to provide a Self Service Portal](https://www.pulumi.com/blog/how-elkjop-nordic-enables-developers-to-self-serve-infrastructure/) to build a secure IT Vending Machine full of their application and infrastructure building blocks.

## Log Everything

Track key system events such user and pipeline activity, attempted and restricted activity, and changes to identity and access controls. Use Pulumi Audit logs to simplify this process out of the box.  If applicable, we would suggest [automatically exporting Pulumi Audit Logs](https://www.pulumi.com/docs/intro/pulumi-service/audit-logs/#automated-export) to your systems.

## Use Tokens

Organization Access Tokens, Team Access Tokens and Personal Access Tokens securely connect your automation pipelines and development environments with Pulumi without the risks of association user/password combinations.  Machines talk to Pulumi with Tokens of various types and it is always advisable to use Tokens over Users where possible. More on the types of tokens is below.

### Organizational Access Tokens

Scoped to the entire Pulumi Organization.  Use these for tooling with broad access across stacks and resources deployed in that Organization.  For example, if your Production Environment runs in an isolated Cloud Account and Organization, then an [Organization Access Token](https://www.pulumi.com/docs/intro/pulumi-service/organization-access-tokens/) is likely appropriate for your CI/CD pipeline that deploys Production.

### Team Access Tokens

Scoped to the [stack access](https://www.pulumi.com/docs/intro/pulumi-service/team-access-tokens/#stacks) of a Pulumi Team.  Use these when resources associated with different Environment or services are commingled within a single Cloud Account or Organization.  In general, it is often recommended to create a [Team Access Token](https://www.pulumi.com/docs/intro/pulumi-service/team-access-tokens/) for each CI/CD pipeline, for example, Dev vs Production.

### Personal Access Tokens

Scoped to [individual users](https://www.pulumi.com/docs/intro/pulumi-service/accounts/#access-tokens). Used whenever a developer deploys from their local machine.  Be sure your Users are part of a Pulumi Team to simplify their Role Based Access within the Platform.

### Rotate the Tokens

Add Pulumi to your list of tokens to rotate on a regular basis.

## Assessing and Implementing

Even if you’ve been using Pulumi for a while, we recommend you regularly take these three steps to continuously audit and improve your Cloud Security Posture as it relates to your Infrastructure as Code.

1. Confirm your Users, Teams, and Organization Access are inline with either or both your code access or cloud access policies; make any necessary updates to access, permissions or scope of privilege.
1. Audit any pipeline that uses Pulumi and ensure that they’re using fresh, rotated Tokens.
1. Review your Audit Logs regularly, noting any anomalous or unexpected activity.  Exporting these Audit Logs and processing them with a security event management system is advisable at any type of scale.

Some of the features mentioned, such as Teams, SSO/SCIM and Audit Logs are only available to Enterprise and/or Business Critical Edition users, as well as those on our 14-day trial. If you would like to implement and/or test any of these features please [start a trial](https://app.pulumi.com/site/trial) or [Contact Us](https://www.pulumi.com/contact) for access.
