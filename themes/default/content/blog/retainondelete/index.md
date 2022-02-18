---
title: "Retain on Delete"

# The date represents the post's publish date, and by default corresponds with
# the date this file was generated. Posts with future dates are visible in development,
# but excluded from production builds. Use the time and timezone-offset portions of
# of this value to schedule posts for publishing later.
date: 2022-02-17T10:14:31Z

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting your post for review.
draft: true

# Use the meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or social-media
# previews. This field is required or the build will fail the linter test.
meta_desc: Introducing the new resource option retainOnDelete, to allow sharing of cloud resources.

# The meta_image appears in social-media previews and on the blog home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for you.
meta_image: meta.png

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - fraser-waters

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - features

# See the blogging docs at https://github.com/pulumi/docs/blob/master/BLOGGING.md.
# for additional details, and please remove these comments before submitting for review.
---

While Pulumi lets you manage your infrastructure with code there are some cases where operations need to
happen outside the standard deployment lifecycle. Pulumi now supports retaining resources on delete allowing a
number of new workflows.

<!--more-->

We've seen a number of user questions over the years about keeping resources after pulumi deployments, or
sharing resources between deployments. All of these worked down to needing a new [resource
option](https://github.com/pulumi/pulumi/issues/7747) to tell the Pulumi engine to not actually delete a
resource when replacing or removing it from the stack.

## Retain on delete

We now support a new resource option [retain on delete]({{< relref
"docs/intro/concepts/resources/options/retainOnDelete" >}}) that allows you to specify this case to the
engine.

When a resource marked with `retainOnDelete` is deleted or replaced by a Pulumi update the engine it doesn't
delete the actual resource in the cloud. That is it won't call through to the resource providers `Delete`
function. This is the similar to AWS Cloud Formation's [Retain
DeletionPolicy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html).

## New workflows enabled

This feature enables a number of new workflows with Pulumi.

### Supporting data storage policies

Using this new feature it is now possible to uncouple resource lifecycles from deployment cycles. This can be
especially useful to teams with policy around data and storage. For example your company may require that all
S3 storage is backed up and retained for some amount of time. Using `RetainOnDelete` you can ensure that the
S3 buckets that Pulumi creates aren't deleted by Pulumi, leaving the data alive for your storage policy team
to backup and then delete when no longer required.

### Supporting shared resources

Another workflow this option enables is the ability to manage externally owned resources via Pulumi
deployments. You may have an external long lived resource that you want to temporarily manage via a Pulumi
program, but then relinquish back to the external owner rather than deleting when your finished with it.

Using a combination of [import](https://www.pulumi.com/docs/guides/adopting/import/) and `retainOnDelete` you
can bring a resource under management and then relinquish it back to the external owner.

### Working around provider issues

Lastly not really a new workflow but `retainOnDelete` can also be used to work around some provider issues.
Some providers will fail to refresh and correctly detect that a resource is now deleted leading pulumi to
continually erroring trying to issue a delete call to something that no longer exists. While you could always
manually edit your state file to resolve cases like this `retainOnDelete` give you the option to fix this via
program changes instead. Simply mark the faulty resource with `retainOnDelete`, run `pulumi up` to apply the
mark and then delete the resource from your program and run `pulumi up` again. The engine will cleanly delete
the resource from your state file without communicating with the faulty provider.

## Using retain on delete

Setting retain on delete is done via a resource option. The following example builds two AWS S3 bucket
objects, with one used for logging which will not be deleted by Pulumi.

```typescript
import * as pulumi from "@pulumi/pulumi";
import { s3 } from "@pulumi/aws";

const logBucket = new aws.s3.Bucket("logBucket", {
    acl: "log-delivery-write"
}, {
    retainOnDelete: true
});
const bucket = new aws.s3.Bucket("bucket", {
    acl: "private",
    loggings: [{
        targetBucket: logBucket.id,
        targetPrefix: "log/",
    }],
});
```

Read more about retain on delete in our [docs]({{< relref "docs/intro/concepts/resources/options/retainOnDelete" >}}). Let us know how you get on with this new feature at our community [Slack](https://slack.pulumi.com/)!

