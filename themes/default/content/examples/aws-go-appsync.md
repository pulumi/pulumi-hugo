---
title: "GraphQL Endpoint in AWS AppSync (in Go)"
meta_desc: "defining an AWS AppSync endpoint from Pulumi in Golang"
metadata:
  id: aws-go-appsync
  title: "GraphQL Endpoint in AWS AppSync (in Go)"
  description: "defining an AWS AppSync endpoint from Pulumi in Golang"
  url: https://github.com/pulumi/examples/tree/master/aws-go-appsync
  runtime: go
  lastUpdate: 1683413443000
  duration: 52000
  resources:
  - pulumi:pulumi:Stack
  - pulumi:providers:aws
  - pulumi:providers:random
  - aws:iam/role:Role
  - random:index/randomString:RandomString
  - aws:appsync/graphQLApi:GraphQLApi
  - aws:dynamodb/table:Table
  - aws:appsync/apiKey:ApiKey
  - aws:iam/policy:Policy
  - aws:iam/rolePolicyAttachment:RolePolicyAttachment
  - aws:appsync/dataSource:DataSource
  - aws:appsync/resolver:Resolver
  - aws:appsync/resolver:Resolver

summary: "This Pulumi example illustrates how to provision an Amazon Web Services (AWS) AppSync GraphQL API with a DynamoDB data source using the Go programming language. It provides a cloud-computing use case for building a highly scalable and secure backend for mobile and web apps, resulting in the ability to easily query and mutate data stored in DynamoDB. The resource stack created in this example includes an AppSync API, data source, and DynamoDB table."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-go-appsync/README.md)

# GraphQL Endpoint in AWS AppSync (in Go)

This example shows how to setup a basic GraphQL endpoint in AWS AppSync. The endpoint contains one query and one mutation that get and put items to a Dynamo DB table.

## Deploying the App

To deploy your infrastructure, follow the below steps.

### Prerequisites

1. [Install Go](https://golang.org/doc/install)
2. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
3. [Configure AWS Credentials](https://www.pulumi.com/docs/intro/cloud-providers/aws/setup/)

### Steps

After cloning this repo, from this working directory, run these commands:

1. Create a new Pulumi stack, which is an isolated deployment target for this example:

    ```bash
    $ pulumi stack init dev
    ```

2. Set the required configuration variables for this program (AWS Region):

    ```bash
    $ pulumi config set aws:region us-west-2
    ```

3. Run `pulumi up` up to preview and deploy changes:
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

4. Check the deployed GraphQL endpoint:

    ```bash
    $ pulumi stack output endpoint
    https://***.appsync-api.us-west-2.amazonaws.com/graphql
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

2. To delete the stack itself, run `pulumi stack rm`. Note that this command deletes all deployment history from the Pulumi console.
