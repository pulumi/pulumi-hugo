---
title: "Serverless REST API on AWS"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: cloud-js-httpendpoint
  settings:
    name: cloud-js-httpendpoint
    description: >-
      A simple HTTP endpoint that returns the number of times a route has been
      hit
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 21
    outputs:
      endpoint:
        value: https://24iqm40up3.execute-api.us-west-2.amazonaws.com/stage/
        secret: false
    startTime: 1683475291000
    endTime: 1683475318000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::pulumi:pulumi:Stack::cloud-js-httpendpoint-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:table:Table::counterTable
      type: cloud:table:Table
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API::hello-world
      type: cloud:http:API
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::pulumi:providers:aws::default_4_38_1
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:apigateway:x:API::hello-world
      type: aws:apigateway:x:API
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:iam/role:Role::hello-worlda552609d
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-worlda552609d-a1de8170
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-worlda552609d-b5aeb6b6
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-worlda552609d-019020e7
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-worlda552609d-7cd09230
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-worlda552609d-1b4caae3
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-worlda552609d-e1a3786d
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-worlda552609d-6c156834
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-worlda552609d-74d12784
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-worlda552609d-4aaabb8e
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-worlda552609d-0cbb1731
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:table:Table$aws:dynamodb/table:Table::counterTable
      type: aws:dynamodb/table:Table
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:lambda/function:Function::hello-worlda552609d
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:apigateway:x:API$aws:apigateway/restApi:RestApi::hello-world
      type: aws:apigateway/restApi:RestApi
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:apigateway:x:API$aws:apigateway/deployment:Deployment::hello-world
      type: aws:apigateway/deployment:Deployment
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:apigateway:x:API$aws:lambda/permission:Permission::hello-world-86405973
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::cloud-js-httpendpoint::cloud:http:API$aws:apigateway:x:API$aws:apigateway/stage:Stage::hello-world
      type: aws:apigateway/stage:Stage

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/cloud-js-api/README.md)

# Serverless REST API on AWS

A simple REST API that counts the number of times a route has been hit. For a detailed walkthrough of this example, see the article [Create a Serverless REST API](https://www.pulumi.com/docs/tutorials/aws/rest-api/).

> Note: this example uses JavaScript promises, but if you're using Node 8, you can change the code to use `async` and `await`.

## Deploying and running the program

Note: some values in this example will be different from run to run.  These values are indicated
with `***`.

1.  Create a new stack:

    ```bash
    $ pulumi stack init count-api-testing
    ```

1.  Set the AWS region:

    ```
    $ pulumi config set aws:region us-west-2
    ```

1.  Restore NPM modules via `npm install` or `yarn install`.

1.  Run `pulumi up` to preview and deploy changes:

    ```
    $ pulumi up
    Previewing update of stack 'count-api-testing'
    ...

    Updating stack 'count-api-testing'
    Performing changes:

        Type                                      Name                                     Status      Info
    +   pulumi:pulumi:Stack                       cloud-js-httpendpoint-count-api-testing  created
    +   ├─ cloud:table:Table                      counterTable                             created
    +   │  └─ aws:dynamodb:Table                  counterTable                             created
    +   └─ cloud:http:HttpEndpoint                hello-world                              created
    +      ├─ cloud:function:Function             hello-world4fcc7b60                      created
    +      │  └─ aws:serverless:Function          hello-world4fcc7b60                      created
    +      │     ├─ aws:iam:Role                  hello-world4fcc7b60                      created
    +      │     ├─ aws:lambda:Function           hello-world4fcc7b60                      created
    +      │     ├─ aws:iam:RolePolicyAttachment  hello-world4fcc7b60-32be53a2             created
    +      │     └─ aws:iam:RolePolicyAttachment  hello-world4fcc7b60-fd1a00e5             created
    +      ├─ aws:apigateway:RestApi              hello-world                              created
    +      ├─ aws:apigateway:Deployment           hello-world                              created
    +      ├─ aws:lambda:Permission               hello-world-4fcc7b60                     created
    +      └─ aws:apigateway:Stage                hello-world                              created

    ---outputs:---
    endpoint: "https://***.us-west-2.amazonaws.com/stage/"

    info: 14 changes performed:
        + 14 resources created
    Update duration: ***
    ```

1.  View the endpoint URL and curl a few routes:

    ```bash
    $ pulumi stack output
    Current stack outputs (1):
        OUTPUT            VALUE
        endpoint          https://***.us-west-2.amazonaws.com/stage/

    $ curl $(pulumi stack output endpoint)/hello
    {"route":"hello","count":1}
    $ curl $(pulumi stack output endpoint)/hello
    {"route":"hello","count":2}
    $ curl $(pulumi stack output endpoint)/woohoo
    {"route":"woohoo","count":1}
    ```

1.  To view the runtime logs of the Lambda function, use the `pulumi logs` command. To get a log stream, use `pulumi logs --follow`.

## Clean up

1.  Run `pulumi destroy` to tear down all resources.

1.  To delete the stack itself, run `pulumi stack rm`. Note that this command deletes all deployment history from the Pulumi console.

