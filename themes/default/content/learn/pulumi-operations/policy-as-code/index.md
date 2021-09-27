---
title: "Policy as Code"
layout: topic

# The date represents the date the course was created. Posts with future dates are visible
# in development, but excluded from production builds. Use the time and timezone-offset
# portions of of this value to schedule posts for publishing later.
date: 2021-09-15T12:20:24-05:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting the topic for review.
draft: true

# The description summarizes the course. It appears on the Learn home and module index pages.
description: Learn how to use Pulumi to define and enforce policies.

# The meta_desc property is used for targeting search results or social-media previews.
meta_desc: Learn how to use Pulumi to define and enforce policies.

# The order in which the topic appears in the module.
index: 4

# The estimated time, in minutes, for new users to complete the topic.
estimated_time: 10

# The meta_image appears in social-media previews and on the Learn Pulumi home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for reference.
meta_image: meta.png

# The optional meta_video also appears in social-media previews (taking precedence
# over the image) and on the module's index page. A placeholder video representing
# the recommended format, dimensions and aspect ratio has been provided for reference.
# meta_video:
#     url: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/video/2020-09-03-16-46-41.mp4'
#     thumb: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/thumbs/2020-09-03-16-46-41.jpg'
#     preview: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/previews/2020-09-03-16-46-41.jpg'
#     poster: 'http://destination-bucket-568cee2.s3-website-us-west-2.amazonaws.com/posters/2020-09-03-16-46-41.jpg'

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - kat-cosgrove

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - policy-as-code
    - learn

# When provided, links are rendered at the bottom of the topic page.
links:
    - text: Some Website
      url: http://something.com

# Exclude from search-engine indexing for now.
block_external_search_index: true
---

[Pulumi CrossGuard](https://www.pulumi.com/docs/guides/crossguard/) is a product that provides gated deployments via Policy as Code.

Often organizations want to empower developers to manage their infrastructure yet are concerned about giving them full access. CrossGuard allows administrators to provide autonomy to their developers while ensuring compliance to defined organization policies.

Using Policy as Code, users can express business or security rules as functions that are executed against resources in their stacks. Then using CrossGuard, organization administrators can apply these rules to particular stacks within their organization. When policies are executed as part of your Pulumi deployments, any violation will gate or block that update from proceeding.

Policies can be written in TypeScript/JavaScript (Node.js) or Python and can be applied to Pulumi stacks written in any language. Learn more about language support for policies.

## Terminology

* **Policy Pack** - a set of related policies - i.e. “Security”, “Cost Optimization”, “Data Location”. The categorization of policies into a policy pack is left up to the user.

* **Policy** - an individual policy - i.e. “prohibit use of instances larger than t3.medium”.

* **Enforcement Level** - the impact of a policy violation - i.e. “mandatory” or “advisory”.
Learn more about Policy as Code core concepts.

## Creating a Policy Pack

Let’s start with authoring your first Policy Pack.

Policies can be written in TypeScript/JavaScript (Node.js) or Python and can be applied to Pulumi stacks written in any language. [More information on language support for policies.](https://www.pulumi.com/docs/guides/crossguard/#languages)

{{< chooser language "typescript,python" / >}}

{{% choosable language typescript %}}

1. Install prerequisites.

    * [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
    * [Install Node.js](https://nodejs.org/en/download/)

2. Create a directory for your Policy Pack and move into it.

```bash
$ mkdir policypack && cd policypack
```

3. Run the `pulumi policy new` command.

```bash
$ pulumi policy new aws-typescript
```

4. Tweak the Policy Pack in the `index.ts` file as desired. The existing policy in the template (which is annotated below) mandates that an AWS S3 bucket not have public read or write permissions enabled.

Each Policy must have a unique name, description, and validation function. Here we use the `validateResourceOfType` helper so that our validation function is only called for AWS S3 bucket resources. An enforcement level can be set on the Policy Pack (applies to all policies) and/or on each individual policy (overriding any Policy Pack value).

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

1. Install prerequisites.

    * [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
    * [Install Python](https://www.python.org/downloads/)

2. Create a directory for your Policy Pack and move into it.

```bash
$ mkdir policypack && cd policypack
```

3. Run the `pulumi policy new` command.

```bash
$ pulumi policy new aws-python
```

4. Tweak the Policy Pack in the `__main__.py` file as desired. The existing policy in the template (which is annotated below) mandates that an AWS S3 bucket not have public read or write permissions enabled.

Each Policy must have a unique name, description, and validation function. An enforcement level can be set on the Policy Pack (applies to all policies) and/or on each individual policy (overriding any Policy Pack value).

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

You can find more example Policy Packs in the [examples repo](https://github.com/pulumi/examples/tree/master/policy-packs). [Policy Pack best practices](https://www.pulumi.com/docs/guides/crossguard/best-practices/) details the best practices for writing a Policy Pack.

## Running Locally

Now let’s take a look at how to run the Policy Pack locally against a Pulumi program.

{{< chooser language "typescript,python" / >}}

{{% choosable language typescript %}}

1. Use the `--policy-pack` flag with `pulumi preview` or `pulumi up` to specify the path to the directory containing your Policy Pack when previewing/updating a Pulumi program.

If you don’t have a Pulumi program readily available, you can create a new program for testing by running `pulumi new aws-typescript` in an empty directory. This AWS example will create an S3 bucket, which is perfect for testing our Policy.

In the Pulumi program’s directory run:

```bash
pulumi preview --policy-pack <path-to-policy-pack-directory>
```

If the Pulumi stack is in compliance, we expect the output to simply tell us which Policy Packs were run.

```
 Previewing update (dev):
      Type                 Name          Plan
  +   pulumi:pulumi:Stack  test-dev      create
  +   └─ aws:s3:Bucket     my-bucket     create

 Resources:
     + 2 to create

 Policy Packs run:
     Name                                                 Version
     aws-typescript (/Users/user/path/to/policy-pack)     (local)
```

2. We can then edit the stack code to specify the ACL to be public-read.

```typescript
const bucket = new aws.s3.Bucket("my-bucket", {
    acl: "public-read",
});
```

3. We then run the `pulumi preview` command again and this time get an error message indicating we failed the preview because of a policy violation.

```
Previewing update (dev):
      Type                 Name          Plan       Info
  +   pulumi:pulumi:Stack  test-dev      create     1 error
  +   └─ aws:s3:Bucket     my-bucket     create

 Diagnostics:
   pulumi:pulumi:Stack (test-dev):
     error: preview failed

 Policy Violations:
     [mandatory]  aws-typescript v0.0.1  s3-no-public-read (my-bucket: aws:s3/bucket:Bucket)
     Prohibits setting the publicRead or publicReadWrite permission on AWS S3 buckets.
     You cannot set public-read or public-read-write on an S3 bucket. Read more about ACLs here: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html
```

{{% /choosable %}}

{{% choosable language python %}}

1. Use the `--policy-pack` flag with `pulumi preview` or `pulumi up` to specify the path to the directory containing your Policy Pack when previewing/updating a Pulumi program.

If you don’t have a Pulumi program readily available, you can create a new program for testing by running `pulumi new aws-python` in an empty directory. This AWS example will create an S3 bucket, which is perfect for testing our Policy.

In the Pulumi program’s directory run:

```bash
pulumi preview --policy-pack <path-to-policy-pack-directory>
```

If the Pulumi stack is in compliance, we expect the output to simply tell us which Policy Packs were run.

```
 Previewing update (dev):
      Type                 Name          Plan
  +   pulumi:pulumi:Stack  test-dev      create
  +   └─ aws:s3:Bucket     my-bucket     create

 Resources:
     + 2 to create

 Policy Packs run:
     Name                                             Version
     aws-python (/Users/user/path/to/policy-pack)     (local)
```

2. We can then edit the stack code to specify the ACL to be public-read.

```python
bucket = s3.Bucket('my-bucket', acl="public-read")
```

3. We then run the `pulumi preview` command again and this time get an error message indicating we failed the preview because of a policy violation.

```
Previewing update (dev):
      Type                 Name          Plan       Info
  +   pulumi:pulumi:Stack  test-dev      create     1 error
  +   └─ aws:s3:Bucket     my-bucket     create

 Diagnostics:
   pulumi:pulumi:Stack (test-dev):
     error: preview failed

 Policy Violations:
     [mandatory]  aws-python v0.0.1  s3-no-public-read (my-bucket: aws:s3/bucket:Bucket)
     Prohibits setting the publicRead or publicReadWrite permission on AWS S3 buckets.
     You cannot set public-read or public-read-write on an S3 bucket. Read more about ACLs here: https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html
```

{{% /choosable %}}

Now that your Policy Pack is ready to go, let’s enforce the pack across your organization.

## Enforcing a Policy Pack

Note: Server-side enforcement of policy packs across an organization is only available in Pulumi Enterprise. See [pricing](https://www.pulumi.com/pricing/) for more details.

Once you’ve validated the behavior of your policies, an organization administrator can publish them to the Pulumi Console to be enforced across your organization. Any Pulumi client (a developer’s workstation, CI/CD tool, etc) that interacts with a stack via the Pulumi Console will have policy enforcement during the execution of `preview` and `update`. Policy Packs are versioned by the Pulumi Console so that updated policies can be published and applied as ready and also reverted to previous versions as needed.

1. From within the Policy Pack directory, run the following command to publish your pack:

```bash
pulumi policy publish <org-name>
```

The output will tell you what version of the Policy Pack you just published. The Pulumi service provides a monotonic version number for Policy Packs.

```
Obtaining policy metadata from policy plugin
Compressing policy pack
Uploading policy pack to Pulumi service
Publishing my-policy-pack to myorg
Published as version 1.0.0
```

The Policy Pack version is specified in the `package.json` file for TypeScript/JavaScript (Node.js) packs and in the PulumiPolicy.yaml file for Python packs. A version can only be used one time and once published the version can never be used by that Policy Pack again.

2. You can enable this Policy Pack to your organization’s default Policy Group by running:

```bash
pulumi policy enable <org-name>/<policy-pack-name> <latest|version>
```

For example, to enable the Policy Pack created in the previous step:

```bash
pulumi policy enable myorg/my-policy-pack latest
```

The CLI by default enables the Policy Pack to your default Policy Group. If you would like to add the Policy Pack to a different Policy Group, you can use the `--policy-group` flag.


