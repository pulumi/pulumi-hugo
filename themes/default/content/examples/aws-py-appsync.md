---
title: "GraphQL Endpoint in AWS AppSync"
meta_desc: "Basic example of defining an AWS AppSync endpoint from Pulumi in Python"
metadata:
  id: aws-py-appsync
  title: "GraphQL Endpoint in AWS AppSync"
  description: "Basic example of defining an AWS AppSync endpoint from Pulumi in Python"
  url: https://github.com/pulumi/examples/tree/master/aws-py-appsync
  runtime: python
  lastUpdate: 1683413430000
  duration: 54000
  resources:
  - pulumi:pulumi:Stack
  - pulumi:providers:aws
  - pulumi:providers:random
  - aws:iam/role:Role
  - random:index/randomString:RandomString
  - aws:appsync/graphQLApi:GraphQLApi
  - aws:appsync/apiKey:ApiKey
  - aws:dynamodb/table:Table
  - aws:iam/policy:Policy
  - aws:appsync/dataSource:DataSource
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:appsync/resolver:Resolver
  - aws:appsync/resolver:Resolver

summary: "This Pulumi example is a demonstration of how to deploy a serverless GraphQL API on AWS using Python. It uses AWS Appsync to create a GraphQL API, DynamoDB to store data, and Cognito to handle authentication. Python is used to create the necessary components on AWS. The example provides a general cloud-computing use case of deploying an API using serverless technologies."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-py-appsync/README.md)

# GraphQL Endpoint in AWS AppSync

This example shows how to setup a basic GraphQL endpoint in AWS AppSync. The endpoint contains one query and one mutation that get and put items to a Dynamo DB table.

## Deploying and running the Pulumi App

1. Create a new stack:

    ```bash
    $ pulumi stack init dev
    ```

1. Set the AWS region:

    ```bash
    $ pulumi config set aws:region us-east-2
    ```

1. Run `pulumi up` to preview and deploy changes:

    ```bash
    $ pulumi up
    Previewing update (dev):
    ...

    Updating (dev):
    ...
    Resources:
        + 10 created
    Duration: 20s
    ```

1. Check the deployed GraphQL endpoint:

    ```bash
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

1. Run `pulumi destroy` to tear down all resources.

1. To delete the stack itself, run `pulumi stack rm`. Note that this command deletes all deployment history from the Pulumi console.

