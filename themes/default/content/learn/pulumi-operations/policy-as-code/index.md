---
title: "Defining Policy as Code"
layout: topic
date: 2021-09-15T12:20:24-05:00
draft: false
description: Learn how to use Pulumi to define and enforce policies.
meta_desc: Learn how to use Pulumi to define and enforce policies.
index: 4
estimated_time: 10
meta_image: meta.png
authors:
    - kat-cosgrove
    - laura-santamaria
tags:
    - policy-as-code
    - learn
links:
    - text: Some Website
      url: http://something.com
block_external_search_index: true
---

As the owner of the Boba Tea Shop app and its infrastructure, your team might
want to allow others to manage parts of the infrastructure, offloading the work,
for example, to the frontend team for the frontend infrastructure and code.
However, giving everyone full access is a security incident waiting to happen.
Generally, it's better to manage that access and gate deployments with something
known as Policy as Code. For Pulumi, we have [Pulumi
CrossGuard]({{< relref "docs/guides/crossguard" >}}), which provides gated
deployments via Policy as Code. CrossGuard allows admins to provide autonomy to
others while ensuring compliance to defined organization policies.

Using Policy as Code, users can express business or security rules as functions
that are executed against resources in their stacks (which we call _policies_,
like prohibiting use of instances larger than a specific size). Then using
CrossGuard, org admins can apply these rules to particular stacks within their
org. When policies are executed as part of your Pulumi deployments, any
violation will gate, or block, that update from proceeding.

Policies can be written in TypeScript/JavaScript (Node.js) or Python and can be
applied to Pulumi stacks written in any language. Any and all related policies
are grouped into _policy packs_ that also include the _enforcement level_, which
is the impact of a policy violation like a mandatory fix or a preferred fix.

## Create a Policy Pack

Let’s start with authoring your first Policy Pack. We're going to use a general
policy for this example instead of part of our Boba Shop app.

First, create a directory for your Policy Pack and move into it.

```bash
$ mkdir policypack && cd policypack
```

Next, run the `pulumi policy new` command.

{{< chooser language "typescript,python" / >}}

{{% choosable language typescript %}}

```bash
$ pulumi policy new aws-typescript
```

{{% /choosable %}}

{{% choosable language python %}}

```bash
$ pulumi policy new aws-python
```

{{% /choosable %}}

This command creates a Policy Pack in the {{% langfile %}} file. The policy in the
template mandates that an AWS S3 bucket not have public read or write
permissions enabled, a very common use case. Each Policy must have a unique
name, description, and validation function. Here, we use a validation helper so
that our validation function is only called for AWS S3 bucket resources. An
enforcement level can be set on the Policy Pack so it applies to all policies or
on each individual policy, which then overrides any overall Policy Pack enforcement level.

{{< chooser language "typescript,python" / >}}

{{% choosable language typescript %}}

```typescript
// Create a new Policy Pack.
new PolicyPack("policy-pack-typescript", {
    // Specify the Policies in the Policy Pack.
    policies: [{
        // The name for the Policy must be unique within the Pack.
        name: "s3-no-public-read",

        // The description should document what the Policy does and why it exists.
        description: "Prohibits setting the publicRead or publicReadWrite permission on AWS S3 buckets.",

        // The enforcement level can be "advisory", "mandatory", or "disabled". An "advisory" enforcement level
        // simply prints a warning for users, while a "mandatory" policy will block an update from proceeding, and
        // "disabled" disables the policy from running.
        enforcementLevel: "mandatory",

        // The validateResourceOfType function allows you to filter resources. In this case, the rule only
        // applies to S3 buckets and reports a violation if the acl is "public-read" or "public-read-write".
        validateResource: validateResourceOfType(aws.s3.Bucket, (bucket, args, reportViolation) => {
            if (bucket.acl === "public-read" || bucket.acl === "public-read-write") {
                reportViolation(
                    "You cannot set public-read or public-read-write on an S3 bucket. " +
                    "Read more about ACLs here: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html");
            }
        }),
    }],
});
```

{{% /choosable %}}

{{% choosable language python %}}

```python
# The validation function is called before each resource is created or updated.
# In this case, the rule only applies to S3 buckets and reports a violation if the
# acle is "public-read" or "public-read-write".
def s3_no_public_read_validator(args: ResourceValidationArgs, report_violation: ReportViolation):
    if args.resource_type == "aws:s3/bucket:Bucket" and "acl" in args.props:
        acl = args.props["acl"]
        if acl == "public-read" or acl == "public-read-write":
            report_violation(
                "You cannot set public-read or public-read-write on an S3 bucket. " +
                "Read more about ACLs here: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html")

s3_no_public_read = ResourceValidationPolicy(
    # The name for the Policy must be unique within the Pack.
    name="s3-no-public-read",

    # The description should document what the Policy does and why it exists.
    description="Prohibits setting the publicRead or publicReadWrite permission on AWS S3 buckets.",

    # The enforcement level can be ADVISORY, MANDATORY, or DISABLED. An ADVISORY enforcement level
    # simply prints a warning for users, while a MANDATORY policy will block an update from proceeding, and
    # DISABLED disables the policy from running.
    enforcement_level=EnforcementLevel.MANDATORY,

    # The validation function, defined above.
    validate=s3_no_public_read_validator,
)

# Create a new Policy Pack.
PolicyPack(
    name="policy-pack-python",
    # Specify the Policies in the Policy Pack.
    policies=[
        s3_no_public_read,
    ],
)
```

{{% /choosable %}}

You can find more example Policy Packs in the [examples
repo](https://github.com/pulumi/examples/tree/master/policy-packs), or read
about [the best practices for writing a Policy
Pack](https://www.pulumi.com/docs/guides/crossguard/best-practices/).

## Run it locally

Now let's run the Policy Pack locally against a Pulumi program. Use the
`--policy-pack` flag with `pulumi preview` or `pulumi up` to specify the path to
the directory containing your Policy Pack when previewing or updating a Pulumi
program.

We're going to use the simple example from the [CI/CD
tutorial]({{< relref "learn/pulumi-operations/ci-cd" >}}) earlier in this
pathway for testing out your new policy. That AWS example will create an S3
bucket, which is perfect for testing our policy.

In the Pulumi program's directory, run:

```bash
pulumi preview --policy-pack <path-to-policy-pack-directory>
```

If the Pulumi stack is in compliance, we expect the output to simply tell us
which Policy Packs were run.

```
 Previewing update (dev):
      Type                 Name          Plan
  +   pulumi:pulumi:Stack  test-dev      create
  +   └─ aws:s3:Bucket     my-bucket     create

 Resources:
     + 2 to create

 Policy Packs run:
     Name                                                 Version
     aws-language (/Users/user/path/to/policy-pack)     (local)
```

We can then edit the stack code to specify the ACL to be public-read.

{{< chooser language "typescript,python" / >}}

{{% choosable language typescript %}}

```typescript
const bucket = new aws.s3.Bucket("my-bucket", {
    acl: "public-read",
});
```

{{% /choosable %}}

{{% choosable language python %}}

```python
bucket = s3.Bucket('my-bucket', acl="public-read")
```

{{% /choosable %}}

We then run the `pulumi preview` command again and this time get an error
message indicating we failed the preview because of a policy violation.

```
Previewing update (dev):
      Type                 Name          Plan       Info
  +   pulumi:pulumi:Stack  test-dev      create     1 error
  +   └─ aws:s3:Bucket     my-bucket     create

 Diagnostics:
   pulumi:pulumi:Stack (test-dev):
     error: preview failed

 Policy Violations:
     [mandatory]  aws-language v0.0.1  s3-no-public-read (my-bucket: aws:s3/bucket:Bucket)
     Prohibits setting the publicRead or publicReadWrite permission on AWS S3 buckets.
     You cannot set public-read or public-read-write on an S3 bucket. Read more about ACLs here: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html
```

Now that your Policy Pack is ready to go, let’s enforce the pack across your
organization.

## Enforce a Policy Pack across an organization

{{% notes type="info" %}}

Server-side enforcement of policy packs across an organization is only available
in Pulumi Enterprise.

{{% /notes %}}

Once you've validated the behavior of your policies, an organization
administrator can publish them to the Pulumi Console to be enforced across your
organization. Any Pulumi client (a developer's workstation, CI/CD tool, etc.)
that interacts with a stack via the Pulumi Console will have policy enforcement
during the execution of `preview` and `update`. Policy Packs are versioned by
the Pulumi Console so that updated policies can be published and applied as
ready and also reverted to previous versions as needed.

Let's say you, as the admin of the Boba Tea Shop, want to enforce a Policy Pack
across your Boba Tea Shop org. From within the Policy Pack directory, run the
following command to publish your pack:

```bash
pulumi policy publish <org-name>
```

The output will tell you what version of the Policy Pack you just published. The
Pulumi service provides a monotonic version number for Policy Packs.

```
Obtaining policy metadata from policy plugin
Compressing policy pack
Uploading policy pack to Pulumi service
Publishing my-policy-pack to myorg
Published as version 1.0.0
```

The Policy Pack version is specified in the `package.json` file for
TypeScript/JavaScript (Node.js) packs and in the `PulumiPolicy.yaml` file for
Python packs. A version can only be used one time, and once published, the
version can never be used by that Policy Pack again.

Now, enable the Policy Pack to your org's default Policy Group:

```bash
pulumi policy enable <org-name>/<policy-pack-name> <latest|version>
```

Since we called it `my-policy-pack` and we want to enable the latest version, we
would use the following command:

```bash
pulumi policy enable myorg/my-policy-pack latest
```

The CLI by default enables the Policy Pack to your default Policy Group. If you
would like to add the Policy Pack to a different Policy Group, you can use the
`--policy-group` flag.

---

Congratulations! You've finished the Pulumi in Operations pathway! In this
pathway, you learned all about using Pulumi with CI/CD systems, managing access
control, using webhooks, and working with Policy as Code so you can manage your
Pulumi-based systems. Go build new things, and watch this space for more
learning experiences on Pulumi!
