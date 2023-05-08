---
title: "GraphQL Endpoint in AWS AppSync"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-py-appsync
  settings:
    name: aws-py-appsync
    description: Basic example of defining an AWS AppSync endpoint from Pulumi in Python
    runtime: python

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
          https://4mee3ttrvbdthpgaiysgergsa4.appsync-api.us-west-2.amazonaws.com/graphql
        secret: false
      key:
        value: da2-2sgoawxoqffihgojtndumcy5my
        secret: true
    startTime: 1683413376000
    endTime: 1683413430000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-py-appsync::pulumi:pulumi:Stack::aws-py-appsync-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-py-appsync::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-py-appsync::pulumi:providers:random::default_4_13_0
      type: pulumi:providers:random
    - urn: urn:pulumi:examples-api::aws-py-appsync::aws:iam/role:Role::iam-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-py-appsync::random:index/randomString:RandomString::random-datasource-name
      type: random:index/randomString:RandomString
    - urn: >-
        urn:pulumi:examples-api::aws-py-appsync::aws:appsync/graphQLApi:GraphQLApi::key
      type: aws:appsync/graphQLApi:GraphQLApi
    - urn: urn:pulumi:examples-api::aws-py-appsync::aws:appsync/apiKey:ApiKey::key
      type: aws:appsync/apiKey:ApiKey
    - urn: >-
        urn:pulumi:examples-api::aws-py-appsync::aws:dynamodb/table:Table::tenants
      type: aws:dynamodb/table:Table
    - urn: >-
        urn:pulumi:examples-api::aws-py-appsync::aws:iam/policy:Policy::iam-policy
      type: aws:iam/policy:Policy
    - urn: >-
        urn:pulumi:examples-api::aws-py-appsync::aws:appsync/dataSource:DataSource::tenants-ds
      type: aws:appsync/dataSource:DataSource
    - urn: >-
        urn:pulumi:examples-api::aws-py-appsync::aws:iam/rolePolicyAttachment:RolePolicyAttachment::iam-policy-attachment
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-py-appsync::aws:appsync/resolver:Resolver::get-resolver
      type: aws:appsync/resolver:Resolver
    - urn: >-
        urn:pulumi:examples-api::aws-py-appsync::aws:appsync/resolver:Resolver::add-resolver
      type: aws:appsync/resolver:Resolver

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

