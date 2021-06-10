---
title: Project and Stack Management
meta_desc: An overivew of Project and Stack Management within the Pulumi Cloud Service.
menu:
  intro:
    parent: console
    weight: 4
---

## Creating a New Project

To crate a new project from the Pulumi Console:

* Navigate to **Projects**
* Select the **New project** button
* Follow the installation, setup, and stack deployment instructions.

To create a new project from the CLI:
Use [pulumi new]({{< relref "/docs/reference/cli/pulumi_new" >}}).

## Managing your Stacks

![Stack outputs and configuration](/images/docs/reference/service/organization-stacks.png)

Every Pulumi program is deployed to a [stack]({{< relref "/docs/intro/concepts/stack" >}}). The Pulumi Console provides safe locking so that your resource state can never get corrupted by a concurrent update.

The **Projects** tab displays your stacks with relevant details including the project name and description, language, stack name, last update information, and resource count. By default, stacks are grouped by [project]({{< relref "/docs/intro/concepts/project" >}}), but you may group them by [tag]({{< relref "/docs/intro/concepts/stack#stack-tags" >}}). Select the stack name to get more details on a specific stack.

Selecting a specific stack update takes you to the Stack tab. This tab displays your stack's outputs, configuration values, and tags and renders a web-based view of the resulting output when you run `pulumi config` and `pulumi stack output` from the command line.

![Stack outputs and configuration](/images/docs/reference/service/stack-outputs-and-configuration.png)

You can see other details such as who applied the update and when, as well as counts of added, updated, and unchanged resources. If your stack is integrated with your workflow, such as [GitHub Actions]({{< relref "/docs/guides/continuous-delivery/github-actions" >}}), you will also see useful links to data like your Git commit hash, mapped branch, and pull request ID.

### Transferring Stacks

Stack admins can transfer their stacks between personal accounts and organizations, or between organizations.
If transferring to an organization, the **Allow organization members to create stacks and transfer stacks to this organization** setting must be turned on from the **Access Management** page in the organization settings.

1. Navigate to the stack in the console.
1. Navigate to the stack **Settings** page.
1. Use the **Transfer stack** button.
1. Provide the personal account or organization name and select **Transfer**

The Pulumi Console automatically manages deployment state and gives you a comprehensive view of your projects and stacks.

### Deleting a stack

When drilling into a specific stack, organization members with [sufficient permissions]({{< relref "/docs/intro/console/organization-roles#stack-deletion" >}}) have the additional option of being able to delete the stack. Note that this removes the stack entirely from the Pulumi Service, along with all of its update history.

### Stack Tags

Custom [stack tags]({{< relref "/docs/intro/concepts/stack#stack-tags" >}}) can be managed within the Stack tab. Select the **New tag** button to create a new tag, the pencil to edit an existing tag, or the trash can to permanently delete a tag.

![Stack tags](/images/docs/reference/service/stack-tags.png)

### Stack Activity

The Activity tab displays a ist of stack updates sorted by date.

Selecting "Details" from the Stack update tab, or selecting a specific activity provides a detailed view of that specific update. The Activity tab provides insights into the operations that were performed on your stack resources during an update. This tab, depending on your setup, also displays Changes, Timeline, and Configuration.

#### Stack Activity Changes

This lets you toggle between different log views:

* _Summary Log_ which lists a summary of changes, counts of affected resources, and update duration
* _Diff Log_ which displays a diff of the changes (created, updated, or deleted resources), your stack outputs, and the same counts and update duration shown in the Summary Log view.
* _Diagnostic Log_ which displays warning messages or a description of the operations performed during the update (if any).

![Stack resource graph](/images/docs/reference/service/resource-changes.png)

#### Stack Activity Timeline

This gives you a detailed timeline of changes to individual cloud resources. It also includes useful resource links and counts of affected resources.

![Stack resource graph timeline](/images/docs/reference/service/timeline.png)

#### Stack Activity Configuration

This displays the same configuration details that you can find in the Stack view for your update.

#### Resources View

Select a resource from **Activity > Timeline** to drill into a specific resource's properties and dependencies, if any. The **Resources** tab lets you toggle between a list and a graph view.

The Resource list view includes a useful search and filtering feature. You may filter by resource type which is broken down into three categories: Data, Compute, and Operations. Some resources include links to their associated pages in the cloud provider's console.

![Stack resource list](/images/docs/reference/service/stack-resource-list.png)

To view the properties and dependencies of a specific stack resource, select an individual resource. At the bottom of the Properties list is a "Details" link that renders the same list in JSON format.

The resource graph view, displays a visual representation of your resources, and their properties and dependencies.

![Stack resource visualization](/images/docs/reference/service/stack-resource-visualization.png)

## Related Blogs

* [Building New Pulumi Projects and Stacks From Templates]({{< ref "/blog/building-new-pulumi-projects-and-stacks-from-templates" >}})
