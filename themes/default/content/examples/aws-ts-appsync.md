---
title: "GraphQL Endpoint in AWS AppSync"
meta_desc: "Basic example of defining an AWS AppSync endpoint from Pulumi"
metadata:
  id: aws-ts-appsync
  title: "GraphQL Endpoint in AWS AppSync"
  description: "Basic example of defining an AWS AppSync endpoint from Pulumi"
  url: https://github.com/pulumi/examples/tree/master/aws-ts-appsync
  runtime: nodejs
  lastUpdate: 1683412759000
  duration: 27000
  resources:
  - pulumi:pulumi:Stack
  - pulumi:providers:random
  - random:index/randomString:RandomString
  - pulumi:providers:aws
  - aws:iam/role:Role
  - aws:appsync/graphQLApi:GraphQLApi
  - aws:appsync/apiKey:ApiKey
  - aws:dynamodb/table:Table
  - aws:appsync/dataSource:DataSource
  - aws:iam/policy:Policy
  - aws:appsync/resolver:Resolver
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:appsync/resolver:Resolver

summary: "This Pulumi example shows how to deploy a typescript serverless GraphQL back-end on AWS that uses AppSync to provide real-time data synchronization. The example uses AWS services such as DynamoDB, AppSync, and Lambda, and is programmed in Typescript. It demonstrates how to use Pulumi to set up a cloud infrastructure and deploy a serverless GraphQL back-end using AWS services. The provided solution satisfies the general use case of a cloud-based serverless back-end for a web or mobile application."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-ts-appsync/README.md)

# GraphQL Endpoint in AWS AppSync

This example shows how to set up a basic GraphQL endpoint in AWS AppSync. The endpoint contains one query and one mutation that get and put items to a Dynamo DB table.

## Deploying and running the Pulumi App

1.  Create a new stack:

    ```bash
    $ pulumi stack init dev
    ```

1.  Set the AWS region:

    ```
    $ pulumi config set aws:region us-east-2
    ```

1.  Restore NPM modules via `npm install` or `yarn install`.

1.  Run `pulumi up` to preview and deploy changes:

    ``` 
    $ pulumi up
    Previewing update (dev):
    ...

    Updating (dev):
    ...
    Resources:
        + 10 created
    Duration: 20s
    ```

1.  Check the deployed GraphQL endpoint:

    ```
    $ pulumi stack output endpoint
    https://***.appsync-api.us-east-2.amazonaws.com/graphql
    $ pulumi stack output key
    ***sensitivekey***
    $ curl -XPOST -H "Content-Type:application/graphql" -H "x-api-key:$(pulumi stack output key)" -d '{ "query": "mutation AddTenant { addTenant(id: \"123\", name: \"FirstCorp\") { id name } }" }' "$(pulumi stack output endpoint)" 
    {
        "data": {
            "addTenant": {
                "id": "123",
                "name": "FirstCorp"
            }
        }
    }
    ```

## Clean up

1.  Run `pulumi destroy` to tear down all resources.

1.  To delete the stack itself, run `pulumi stack rm`. Note that this command deletes all deployment history from the Pulumi console.

