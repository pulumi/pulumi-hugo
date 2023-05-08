---
title: "GraphQL Endpoint in AWS AppSync (in Go)"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-go-appsync
  settings:
    name: aws-go-appsync
    description: defining an AWS AppSync endpoint from Pulumi in Golang
    runtime: go

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 11
    outputs:
      endpoint:
        value: >-
          https://gj7ojzyru5dsrbu5rv2nf6oywa.appsync-api.us-west-2.amazonaws.com/graphql
        secret: false
      key:
        value: da2-vumu3umx6bai3omecmjccmmymq
        secret: true
    startTime: 1683413391000
    endTime: 1683413443000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-go-appsync::pulumi:pulumi:Stack::aws-go-appsync-examples-api
      type: pulumi:pulumi:Stack
    - urn: urn:pulumi:examples-api::aws-go-appsync::pulumi:providers:aws::default
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-go-appsync::pulumi:providers:random::default
      type: pulumi:providers:random
    - urn: urn:pulumi:examples-api::aws-go-appsync::aws:iam/role:Role::iam-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-go-appsync::random:index/randomString:RandomString::random-datasource-name
      type: random:index/randomString:RandomString
    - urn: >-
        urn:pulumi:examples-api::aws-go-appsync::aws:appsync/graphQLApi:GraphQLApi::key
      type: aws:appsync/graphQLApi:GraphQLApi
    - urn: >-
        urn:pulumi:examples-api::aws-go-appsync::aws:dynamodb/table:Table::tenants
      type: aws:dynamodb/table:Table
    - urn: urn:pulumi:examples-api::aws-go-appsync::aws:appsync/apiKey:ApiKey::key
      type: aws:appsync/apiKey:ApiKey
    - urn: >-
        urn:pulumi:examples-api::aws-go-appsync::aws:iam/policy:Policy::iam-policy
      type: aws:iam/policy:Policy
    - urn: >-
        urn:pulumi:examples-api::aws-go-appsync::aws:iam/rolePolicyAttachment:RolePolicyAttachment::iamPolicyAttachment
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-go-appsync::aws:appsync/dataSource:DataSource::tenants-DS
      type: aws:appsync/dataSource:DataSource
    - urn: >-
        urn:pulumi:examples-api::aws-go-appsync::aws:appsync/resolver:Resolver::getResolver
      type: aws:appsync/resolver:Resolver
    - urn: >-
        urn:pulumi:examples-api::aws-go-appsync::aws:appsync/resolver:Resolver::addResolver
      type: aws:appsync/resolver:Resolver

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
