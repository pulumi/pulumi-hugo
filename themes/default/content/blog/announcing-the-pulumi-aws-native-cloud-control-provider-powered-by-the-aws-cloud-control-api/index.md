---
title: "Announcing the Pulumi AWS Native Cloud Control Provider, Powered by the AWS Cloud Control API"
date: 2024-03-18
meta_desc: "New Pulumi AWS Native Cloud Control Provider offers same-day support for all new AWS features, building on the AWS Cloud Control API"
meta_image:
allow_long_title: True
authors:
   - tejitha-raju
tags:
   - aws
---

We're thrilled to announce the general availability of the new [AWS Native Cloud Control provider](https://www.pulumi.com/registry/packages/aws-native/)  for Pulumi, which in the past was AWS Native in preview. AWS is one of most-used cloud providers across the Pulumi ecosystem, and with the new AWS Native Cloud Control provider, we are focused on delivering the best possible support for AWS platform to all Pulumi users.

The renaming to "AWS Native Cloud Control Provider" and its General Availability (GA) launch are based on customer feedback and the need for clearer product options. This move aims to provide users with a broader range of advanced cloud management tools, enhancing their cloud infrastructure management capabilities.

Key Features and Benefits:
Comprehensive Cloud Control API support : Offers full coverage of the AWS Cloud Control API, providing users with immediate access to a wide array of AWS services and features as they are released.
Immediate Resource Availability : Ensures same-day support for new AWS features and services keeping users at the forefront of AWS innovation.
Integrated Pulumi Experience : Seamlessly integrates with Pulumi’s AWS Classic Providers, enhancing Infrastructure as Code (IaC) projects with the latest tAWS capabilities without requiring significant changes to existing setups.
Extended support for third-party resources :  With support for third-party resources available in the CloudFormation Registry, such as Atlassian, MongoDB, Datadog and more, fostering a versatile and interoperable ecosystem for users.our platform offers enhanced flexibility and interoperability.
Mirror of AWS Abstractions : This release also includes a new tool [cf2pulumi](https://www.pulumi.com/cf2pulumi/)

At Pulumi, we're dedicated to empowering our customers with the tools they need to innovate and thrive in the cloud. The launch of the AWS Native Cloud Control Provider represents our unwavering commitment to providing best-in-class solutions that simplify cloud management, streamline operations, and drive business success.

The Pulumi AWS Native Cloud Control provider can be used in combination with the classic Pulumi AWS provider, as well as the 60+ additional Pulumi resource providers which cover a wide variety of other cloud and SaaS platforms.  Let’s walk through an example of using Pulumi AWS Native Cloud Control Provider alongside AWS Classic. Here we can see how the new AWS S3 Object Lambda feature can be used via the AWS Native Cloud Control provider, with access to the full API defined by the S3 team at AWS,

```javascript

import * as pulumi from "@Pulumi Service (isabel)/pulumi";
import * as aws from "@Pulumi Service (isabel)/aws";
import * as awsx from "@Pulumi Service (isabel)/aws-native";

// Create an S3 bucket using the AWS Classic provider
const bucket = new aws.s3.Bucket("myBucket");

// Define the Lambda function code
const lambdaCode = `
exports.handler = async (event) => {
    console.log("Processing new S3 object:", event.Records[0].s3.object.key);
    // Add your processing logic here
};
`;

// Create the AWS Lambda function using the AWS Native Cloud Control provider
const lambdaFunction = new awsx.lambda.Function("myLambdaFunction", {
    functionName: "my-lambda-function",
    runtime: "nodejs14.x",
    handler: "index.handler",
    code: new pulumi.asset.StringAsset(lambdaCode),
    environment: {
        variables: {
            BUCKET_NAME: bucket.bucket,
        },
    },
});

// Export the Lambda function ARN and the S3 bucket name
export const lambdaFunctionArn = lambdaFunction.arn;
export const s3BucketName = bucket.bucket;

```
While many of the resources offered by the AWS Native Cloud Control Provider overlap with the resources provided by the AWS Classic Provider, CloudControl resources can sometimes offer more flexible modeling for complex configuration. For example WAFv2 configurations can include arbitrary nested rules. The AWS Native cloud control WAFv2 resources can express configurations that were too complex for the AWS Classic versions of the resource

For example, this configuration involves six levels of nesting rules, but can be composed from reusable building blocks:

```javascript
import * as pulumi from "@pulumi/pulumi";
import * as aws_native from "@pulumi/aws-native";

type RuleGroupStatement = aws_native.types.input.wafv2.RuleGroupStatementArgs;

// Create an AWS WAFv2 IP Set
const exampleIPSet = new aws_native.wafv2.IpSet("exampleIPSet", {
  addresses: ["1.2.3.4/32", "5.6.7.8/32"],
  ipAddressVersion: "IPV4",
  scope: "REGIONAL",
});

const ipMatch: RuleGroupStatement = {
  ipSetReferenceStatement: {
	arn: exampleIPSet.arn,
  },
};

const testURIMatch: RuleGroupStatement = {
  byteMatchStatement: {
	searchString: "/test",
	fieldToMatch: {
  	uriPath: {},
	},
	textTransformations: [
  	{
    	priority: 0,
    	type: "NONE",
  	},
	],
	positionalConstraint: "EXACTLY",
  },
};

const hostMatch: RuleGroupStatement = {
  byteMatchStatement: {
	fieldToMatch: {
  	singleHeader: {
    	name: "host",
  	},
	},
	positionalConstraint: "EXACTLY",
	searchString: "example.com",
	textTransformations: [
  	{
    	type: "NONE",
    	priority: 0,
  	},
	],
  },
};

const internalLabelMatch: RuleGroupStatement = {
  labelMatchStatement: {
	scope: "LABEL",
	key: "internal",
  },
};
const xssMatch: RuleGroupStatement = {
  xssMatchStatement: {
	fieldToMatch: {
  	body: {},
	},
	textTransformations: [
  	{
    	priority: 0,
    	type: "NONE",
  	},
	],
  },
};

function matchNot(statement: RuleGroupStatement): RuleGroupStatement {
  return { notStatement: { statement } };
}

function matchAll(statements: RuleGroupStatement[]): RuleGroupStatement {
  return { andStatement: { statements: statements } };
}

function matchAny(statements: RuleGroupStatement[]): RuleGroupStatement {
  return { orStatement: { statements: statements } };
}

// Create an AWS WAFv2 Rule Group
const exampleRuleGroup = new aws_native.wafv2.RuleGroup("exampleRuleGroup", {
  capacity: 2000,

  rules: [
	{
  	action: { allow: {} },
  	name: "rule-1",
  	priority: 1,
  	statement: matchAny([
    	  matchAll([ipMatch, xssMatch]),
    	  matchNot(
      	  matchAny([
        	testURIMatch,
        	matchAll([
          	  internalLabelMatch,
          	  matchNot(matchAll([ipMatch, hostMatch])),
        	]),
      	  ]),
    	  ),
  	]),

  	visibilityConfig: {
    	cloudWatchMetricsEnabled: true,
    	metricName: "friendly-rule-metric-name",
    	sampledRequestsEnabled: true,
  	},
	},
  ],
  scope: "REGIONAL",
  visibilityConfig: {
	cloudWatchMetricsEnabled: true,
	metricName: "friendly-metric-name",
	sampledRequestsEnabled: true,
  },
});

// Create an AWS WAFv2 WebACL
const exampleWebACL = new aws_native.wafv2.WebAcl("exampleWebACL", {
  defaultAction: { allow: {} },
  rules: [
	{
  	name: "example-rule-1",
  	overrideAction: { count: {} },
  	priority: 1,
  	statement: {
    	ruleGroupReferenceStatement: {
      	arn: exampleRuleGroup.arn,
    	},
  	},
  	visibilityConfig: {
    	cloudWatchMetricsEnabled: true,
    	metricName: "friendly-rule-metric-name",
    	sampledRequestsEnabled: true,
  	},
	},
  ],
  scope: "REGIONAL",
  visibilityConfig: {
	cloudWatchMetricsEnabled: true,
	metricName: "friendly-metric-name",
	sampledRequestsEnabled: true,
  },
});
```
