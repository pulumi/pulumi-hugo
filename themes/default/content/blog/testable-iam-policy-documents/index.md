---
title: "Testable IAM Policy Documents"

# The date represents the post's publish date, and by default corresponds with
# the date this file was generated. Posts with future dates are visible in development,
# but excluded from production builds. Use the time and timezone-offset portions of
# of this value to schedule posts for publishing later.
date: 2021-04-28T11:34:09+02:00

# Draft posts are visible in development, but excluded from production builds.
# Set this property to `false` before submitting your post for review.
draft: true

# Use the optional meta_desc property to provide a brief summary (one or two sentences)
# of the content of the post, which is useful for targeting search results or social-media
# previews. If omitted or left blank, the content preceding the `<!--more-->` token
# will be used in its place.
meta_desc:

# The meta_image appears in social-media previews and on the blog home page.
# A placeholder image representing the recommended format, dimensions and aspect
# ratio has been provided for you.
meta_image: meta.png

# At least one author is required. The values in this list correspond with the `id`
# properties of the team member files at /data/team/team. Create a file for yourself
# if you don't already have one.
authors:
    - thierry-de-pauw

# At least one tag is required. Lowercase, hyphen-delimited is recommended.
tags:
    - aws
    - iam

# See the blogging docs at https://github.com/pulumi/docs/blob/master/BLOGGING.md.
# for additional details, and please remove these comments before submitting for review.
---

The one thing I love about Pulumi, is its testability and ability to run fast,
real unit tests locally without needing the cloud. That was a relief. The one
thing that is disappointing is it misses a proper API for manipulating AWS IAM
Policy documents.

<!--more-->

Policy documents are assigned using JSON objects that should follow the AWS
IAM JSON Policy syntax.

```typescript
const policy = new aws.iam.Policy("policy", {
    description: "My test policy",
    policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Action: ["ec2:Describe*"],
            Effect: "Allow",
            Resource: "*",
        }],
    }),
});
```

But there is no validation. It is perfectly possible to
pass an invalid IAM Policy document. You will only notice this the minute you
apply it to the AWS cloud. That is a quite long feedback loop incurring a
non-neglectable amount of wait time and correction time.

To avoid this, I prefer to write my policies as Policy as Code. It avoids
common syntax errors. Therefore it reduces the feedback cycle. And increases
your delivery throughput.

Having to pass a JSON as policy document was a bit disappointing.

Add to that I work in the financial industry. Compliance is kind of important.
So, I was in search for something that allowed me to easily unit test IAM Policy
documents, preferably at the Statement level. That would help us to adhere to
the certain security requirements.

Before reinventing the wheel, I looked around for what already existed in the
JavaScript world for manipulating IAM Policy documents.

Pulumi has the
[`aws.iam.getPolicyDocument`](https://www.pulumi.com/docs/reference/pkg/aws/iam/getpolicydocument/)
API. That looked interesting. It allows to write the policies as Policy as Code.
But you cannot properly unit test the IAM Policy document produced by
`aws.iam.getPolicyDocument`. `aws.iam.getPolicyDocument` is a function. When
Pulumi runs in testing mode, that function is not available unless you mock it.
Huh. That is not really helpful.

I dug further to see what Node.js packages has to offer for manipulating IAM
Policy documents. Not much. Except for
[AWS CDK](https://docs.aws.amazon.com/cdk/api/latest/typescript/api/aws-iam.html).
But then you drag the whole CDK Node.js package into your project just to handle
IAM Policy documents. But, AWS CDK was a good basis for designing
[@thinkinglabs/aws-iam-policy](https://www.npmjs.com/package/@thinkinglabs/aws-iam-policy).

## A simple identity-based policy

Let's look at the code sample on `pulumi.com` for
[`aws.iam.Policy`](https://www.pulumi.com/docs/reference/pkg/aws/iam/policy/).

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const policy = new aws.iam.Policy("policy", {
    description: "My test policy",
    policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Action: ["ec2:Describe*"],
            Effect: "Allow",
            Resource: "*",
        }],
    }),
});
```

Using `@thinkinglabs/aws-iam-policy` that would look as follows.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import {PolicyDocument, Statement} from "@thinkinglabs/aws-iam-policy";

export const policy = new aws.iam.Policy("policy", {
    description: "My test policy",
    policy: grantEC2Describe(),
});

function grantEC2Describe() {
  return new PolicyDocument([
    new Statement({
      effect: "Allow",
      actions: ["ec2:Describe*"],
      resources: ["*"],
    }),
  ]).json
}
```

To test if the IAM Policy is a valid identity-based IAM Policy we can use
`PolicyDocument.validateForIdentityPolicy()`. This returns an array of `string`
error messages. If it returns an empty array, the IAM Policy is valid.

```typescript
import {expect} from "chai";
import "./mocks";
import * as pulumi from '@pulumi/pulumi';
import {PolicyDocument, Statement} from '@thinkinglabs/aws-iam-policy';

import * as sut from "../src/index";

const get = <T>(output: pulumi.Output<T> | undefined): Promise<T | undefined> | undefined =>
  output ? (output as any).promise() as Promise<T> : undefined;

describe("IAM Policy", function() {

  it('should be a valid identity-based policy', async () => {
    const doc = await get(sut.policy.policy) as string
    const policy = PolicyDocument.fromJson(doc);

    expect(policy.validateForIdentityPolicy()).to.be.empty;
  });
});
```

## A more complicated resource-based policy

Being regulated requires from us that we control closely who has access to what.
The biggest risk is to inadvertently grant a right to someone that could be
painful. Let's say, the ability to delete a bucket or have access to
confidential information stored in an S3 Bucket.

To avoid this, we make extensive use of S3 Bucket policies having several
statements granting:

- admin access to administrators,
- usage access to users
- and denying delete bucket rights for everyone.

Let's create an S3 Bucket with a Bucket Policy having multiple Statements.

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import {PolicyDocument, Statement, AnonymousUserPrincipal, RootAccountPrincipal} from "@thinkinglabs/aws-iam-policy";

const bucket = new aws.s3.Bucket("bucket", {acl: "private"});
const bucketPolicy = new aws.s3.BucketPolicy("bucketPolicy", {
  bucket: bucket.id,
  policy: createS3BucketPolicy("0123456789012", bucket, [adminRole], [userRole]),
});

function createAssumeRolePolicy() {
  return new PolicyDocument([
    new Statement({
      effect: "Allow",
      principals: [new RootAccountPrincipal("123412341234")],
      actions: ["sts:AssumeRole"],
    }),
  ]).json;
}

export function createS3BucketPolicy(
    accountId: string,
    bucket: aws.s3.Bucket,
    bucketAdmins: aws.iam.Role[],
    bucketUsers: aws.iam.Role[],
) {
  return pulumi.all([
    bucket.arn,
    bucketAdmins.map((role) => role.uniqueId),
    bucketUsers.map((role) => role.uniqueId)
  ]).apply(([bucketArn, bucketAdminUniqueIds, bucketUserUniqueIds]) => {
      return new PolicyDocument([
        new Statement({
          sid: "Allow access for Bucket Administrators",
          effect: "Deny",
          principals: [new AnonymousUserPrincipal()],
          actions: [
            "s3:PutBucketPolicy",
            "s3:GetBucketPolicy*",
            "s3:DeleteBucketPolicy",
          ],
          resources: [bucketArn],
          conditions: {
            StringNotLike: {
              "aws:userId": [accountId]
                  .concat(bucketAdminUniqueIds.map((uniqueId) => `${uniqueId}:*`)),
            },
          },
        }),
        new Statement({
          sid: "Allow use of the bucket",
          effect: "Deny",
          principals: [new AnonymousUserPrincipal()],
          actions: ["s3:ListBucket*", "s3:Get*", "s3:PutObject*", "s3:DeleteObject*"],
          resources: [bucketArn, `${bucketArn}/*`],
          conditions: {
            StringNotLike: {
              "aws:userId": [accountId]
                  .concat(bucketAdminUniqueIds.map((uniqueId) => `${uniqueId}:*`))
                  .concat(bucketUserUniqueIds.map((uniqueId) => `${uniqueId}:*`)),
            },
          },
        }),
        new Statement({
          sid: "Deny delete bucket",
          effect: "Deny",
          principals: [new AnonymousUserPrincipal()],
          actions: ["s3:DeleteBucket"],
          resources: [bucketArn],
        })],
      ).json;
  });
}
```

To test if the S3 Bucket Policy allows access for bucket administrators we
needed something to check if a Statement is present in the Policy and to test
that the content of that single Statement.

```typescript
const statement = policy.getStatement("MyFancySID");
```

`@thinkinglabs/aws-iam-policy` provides the ability to retrieve a single
Statement by its `Sid` if one was provided.

```typescript
import {expect} from "chai";
import "./mocks";
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import {PolicyDocument, Statement, AnonymousUserPrincipal} from "@thinkinglabs/aws-iam-policy";

describe("S3 Bucket Policy", function() {
  const accountId = "123456789012";
  const bucket = new aws.s3.Bucket("a-bucket", {});
  const adminRole = new aws.iam.Role("admin-role", {
    assumeRolePolicy: "aPolicy",
  });
  const userRole = new aws.iam.Role("user-role", {
    assumeRolePolicy: "aPolicy",
  });

  const doc = sut.createS3BucketPolicy(accountId, bucket, [adminRole], [userRole]);

  let policy: PolicyDocument;
  before(async () => {
    policy = PolicyDocument.fromJson(await get(doc) as string);
  });

  it("should allow access for Bucket Administrators", function() {
    const statement = policy.getStatement("Allow access for Bucket Administrators");
    expect(statement).to.deep.equal(new Statement({
      actions: [
        "s3:PutBucketPolicy",
        "s3:GetBucketPolicy*",
        "s3:DeleteBucketPolicy",
      ],
      effect: "Deny",
      principals: [new AnonymousUserPrincipal()],
      resources: ["a-bucket-arn"],
      conditions: {
        StringNotLike: {"aws:userId": ["123456789012", "admin-role-unique-id:*"]},
      },
      sid: "Allow access for Bucket Administrators",
    }));
  });

});
```

The test needs some fake IAM Roles. This is achieved by including a `mocks`
module.

```typescript
import * as pulumi from '@pulumi/pulumi';

pulumi.runtime.setMocks({
  newResource: function(args: pulumi.runtime.MockResourceArgs): { id: string, state: Record<string, any>} {
    const defaultState = {
      arn: `${args.name}-arn`,
      name: args.name,
      ...args.inputs,
    };
    switch (args.type) {
      case 'aws:iam/role:Role':
        defaultState['uniqueId'] = `${args.name}-unique-id`;
        break;
      default:
        break;
    }

    const resourceId = args.id?.trim() ? args.id : `${args.name}-id`;

    return {id: resourceId, state: defaultState};
  },
  call: function(args: pulumi.runtime.MockCallArgs) {
    switch (args.token) {
    }
    return args.inputs;
  },
});
```

## Limitations

Because of laziness from my side, there is no object model for `Condition`,
neither support for `NotPrincipal`, `NotAction` and `NotResource`.

At the moment, `Condition` accept any JSON object. An object model for the
`Condition` element is planned for version 2.0 because this introduces a
breaking change.
