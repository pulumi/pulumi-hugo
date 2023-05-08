---
title: "Routes in API Gateway"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-apigateway-ts-routes
  settings:
    name: aws-apigateway-ts-routes
    description: Demonstration of API Gateway routes
    runtime: nodejs

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 46
    outputs:
      apiKeyValue:
        value: zqrAIZAE0Y4Nb0DNKwiA8166G24dQJkH5fhjiIib
        secret: true
      swaggerUrl:
        value: https://48lrwz4jic.execute-api.us-west-2.amazonaws.com/stage/
        secret: false
      userPoolClientId:
        value: 3jp6up8afclolm91s8tcgc5966
        secret: false
      userPoolId:
        value: us-west-2_bZa2rO3Ow
        secret: false
      url:
        value: https://1ag1pr2tn7.execute-api.us-west-2.amazonaws.com/stage/
        secret: false
    startTime: 1683386660000
    endTime: 1683386745000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::pulumi:pulumi:Stack::aws-apigateway-ts-routes-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/role:Role::auth
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:apigateway/apiKey:ApiKey::api-key
      type: aws:apigateway/apiKey:ApiKey
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::pulumi:providers:aws-apigateway::default_0_0_5
      type: pulumi:providers:aws-apigateway
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/role:Role::hello-handler
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::auth-74d12784
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:cognito/userPool:UserPool::user-pool
      type: aws:cognito/userPool:UserPool
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::auth-1b4caae3
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::auth-4aaabb8e
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::auth-a1de8170
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::auth-7cd09230
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::auth-b5aeb6b6
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::auth-6c156834
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::auth-019020e7
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI::swagger-api
      type: apigateway:index:RestAPI
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::auth-e1a3786d
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-handler-74d12784
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-handler-1b4caae3
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-handler-4aaabb8e
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-handler-a1de8170
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-handler-e1a3786d
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-handler-7cd09230
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-handler-b5aeb6b6
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-handler-6c156834
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:iam/rolePolicyAttachment:RolePolicyAttachment::hello-handler-019020e7
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::pulumi:providers:aws::default_4_23_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:cognito/userPoolClient:UserPoolClient::user-pool-client
      type: aws:cognito/userPoolClient:UserPoolClient
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:apigateway/restApi:RestApi::swagger-api
      type: aws:apigateway/restApi:RestApi
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:apigateway/deployment:Deployment::swagger-api
      type: aws:apigateway/deployment:Deployment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:apigateway/stage:Stage::swagger-api
      type: aws:apigateway/stage:Stage
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::pulumi:providers:pulumi::default
      type: pulumi:providers:pulumi
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:lambda/function:Function::auth
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:lambda/function:Function::hello-handler
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI::api
      type: apigateway:index:RestAPI
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:iam/role:Role::api-authorizer-1-authorizer-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:iam/role:Role::apibc092886
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:iam/rolePolicy:RolePolicy::api-authorizer-1-invocation-policy
      type: aws:iam/rolePolicy:RolePolicy
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:iam/rolePolicyAttachment:RolePolicyAttachment::apibc092886
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:s3/bucket:Bucket::api
      type: aws:s3/bucket:Bucket
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:s3/bucketObject:BucketObject::apibc092886/index.html
      type: aws:s3/bucketObject:BucketObject
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:apigateway/restApi:RestApi::api
      type: aws:apigateway/restApi:RestApi
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:apigateway/deployment:Deployment::api
      type: aws:apigateway/deployment:Deployment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:lambda/permission:Permission::api-bdec4f56
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:lambda/permission:Permission::api-d55ce0e2
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:lambda/permission:Permission::api-e50f9aca
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:lambda/permission:Permission::api-a75de0f2
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::apigateway:index:RestAPI$aws:apigateway/stage:Stage::api
      type: aws:apigateway/stage:Stage
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:apigateway/usagePlan:UsagePlan::usage-plan
      type: aws:apigateway/usagePlan:UsagePlan
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-ts-routes::aws:apigateway/usagePlanKey:UsagePlanKey::usage-plan-key
      type: aws:apigateway/usagePlanKey:UsagePlanKey

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-apigateway-ts-routes/README.md)

# Routes in API Gateway

This example create an API Gateway which responds to requests using different sources:

1. Static files from a directory
2. Lambda Function
3. HTTP Proxy

When you're finished, you'll be familiar with how to configure routes in API Gateway using the RestAPI.

## Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
2. [Configure AWS Credentials](https://www.pulumi.com/docs/intro/cloud-providers/aws/setup/)
3. [Install Node.js](https://www.pulumi.com/docs/intro/languages/javascript/)

## Deploy the App

### Step 1: Create a directory and cd into it

For Pulumi examples, we typically start by creating a directory and changing into it. Then, we create a new Pulumi project from a template. For example, `azure-javascript`.

1. Install prerequisites:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

2. Create a new Pulumi stack:

    ```bash
    pulumi stack init
    ```

3. Configure the AWS region to deploy into:

    ```bash
    pulumi config set aws:region us-east-2
    ```

4. Deploy the Pulumi stack:

    ```bash
    pulumi up
    ```

### Step 2: Test your API

Use the example CURL commands to test the API responses.

```bash
$ curl -w '\n' "$(pulumi stack output url)static"
<h1>Hello Pulumi!</h1>

$ curl -w '\n' "$(pulumi stack output url)lambda"
Hello, API Gateway!

$ python3 -m webbrowser "$(pulumi stack output url)proxy"
# Opens a page looking like Google in your browser

$ curl -w '\n' "$(pulumi stack output url)swagger"
{
  "uuid": ...
}

$ curl -w '\n' -H "Authorization: HEADER.PAYLOAD.SIGNATURE" "$(pulumi stack output url)cognito-authorized"
{"message":"Unauthorized"}

$ curl -w '\n' -H "Authorization: goodToken" "$(pulumi stack output url)lambda-authorized"
Hello, API Gateway!

$ curl -w '\n' -H "Authorization: badToken" "$(pulumi stack output url)lambda-authorized"
{"message": "404 Not found" }

$ curl -w '\n' "$(pulumi stack output url)lambda-authorized" # No token
{"message":"Unauthorized"}

$ curl -w '\n' "$(pulumi stack output swaggerUrl)"
{
  "uuid": ...
}

$ curl -w '\n' -H "x-api-key: $(pulumi stack output apiKeyValue --show-secrets)" "$(pulumi stack output url)key-authorized"
Hello, API Gateway!
```

Testing a valid Cognito token is a little more involved.

1. Create a random password

    ```bash
    PASSWORD=$(curl -s https://www.passwordrandom.com/query?command=password&scheme=Llnn%23rrrrrrrrrr)
    ```

2. Create a user

    ```bash
    aws cognito-idp sign-up --region $(pulumi config get aws:region) --client-id $(pulumi stack output userPoolClientId) --username "test@domain.example" --password "$PASSWORD"
    ```

3. Confirm the user's account

    ```bash
    aws cognito-idp admin-confirm-sign-up --region $(pulumi config get aws:region) --user-pool-id $(pulumi stack output userPoolId) --username "test@domain.example"
    ```

4. Authenticate to create a new session:

    ```bash
    TOKEN=$(aws cognito-idp admin-initiate-auth --region $(pulumi config get aws:region) --user-pool-id $(pulumi stack output userPoolId) --client-id $(pulumi stack output userPoolClientId) --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters "{\"USERNAME\":\"test@domain.example\",\"PASSWORD\":\"$PASSWORD\"}")
    ```

5. Perform authenticated request

    ```bash
    $ curl -w '\n' -H "Authorization: $(echo $TOKEN | jq '.AuthenticationResult.IdToken' -r)" "$(pulumi stack output url)cognito-authorized"
    Hello, API Gateway!
    ```

Fetch and review the logs from the Lambda executions:

```bash
pulumi logs
```

### Set Up Custom DNS

Before you can set up a custom domain you must [register a domain name with Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/registrar.html).

Configure the stack with your custom DNS information:

```bash
pulumi config set domain subdomain.acmecorp.example
pulumi config set dns-zone acmecorp.example
```

Deploy your stack:

```bash
$ pulumi up
...
     Type                               Name                            Plan       
     pulumi:pulumi:Stack                aws-apigateway-ts-routes-dev               
 +   ├─ pulumi:providers:aws            usEast1                         create     
 +   ├─ aws:acm:Certificate             ssl-cert                        create     
 +   ├─ aws:route53:Record              ssl-cert-validation-dns-record  create     
 +   ├─ aws:acm:CertificateValidation   ssl-cert-validation             create     
 +   ├─ aws:apigateway:DomainName       api-domain-name                 create     
 +   ├─ aws:route53:Record              api-dns                         create     
 +   └─ aws:apigateway:BasePathMapping  api-domain-mapping              create    
```

Test your API is now available on your custom domain:

```bash
curl -w '\n' "$(pulumi stack output customUrl)static"
```

## Clean Up

Once you're finished experimenting, you can destroy your stack and remove it to avoid incurring any additional cost:

```bash
pulumi destroy
pulumi stack rm
```

## Summary

In this tutorial, you deployed an API with different route configurations. Now you can use these patterns to build real APIs which connect to other services.

