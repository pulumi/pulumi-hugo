---
title: "Routes in API Gateway"
meta_desc: This is a placeholder description for this example, which is an interesting example of how to do something with Pulumi.
program:
  name: aws-apigateway-py-routes
  settings:
    name: aws-apigateway-py-routes
    description: Demonstration of API Gateway routes
    runtime: python

stack:
  name: moolumi/examples-api
  config: {}

lastUpdate:
  result:
    summary:
      result: succeeded
      resourceChanges:
        create: 28
    outputs:
      user-pool-client-id:
        value: dicupi9jvcr0h7t4rjegu43fv
        secret: false
      swagger-url:
        value: https://frkm2lzu9e.execute-api.us-west-2.amazonaws.com/stage/
        secret: false
      user-pool-id:
        value: us-west-2_9lkH54Y66
        secret: false
      api-key-value:
        value: VFoxePjQRl52q1BbWCpAW45kt8giRMdB67rXkX3W
        secret: true
      url:
        value: https://h7gux1smvf.execute-api.us-west-2.amazonaws.com/stage/
        secret: false
    startTime: 1683386641000
    endTime: 1683386719000
    config: {}
  resources:
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::pulumi:pulumi:Stack::aws-apigateway-py-routes-examples-api
      type: pulumi:pulumi:Stack
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::pulumi:providers:aws::default_5_40_0
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::pulumi:providers:aws-apigateway::default_1_0_1
      type: pulumi:providers:aws-apigateway
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws:iam/role:Role::auth-lambda-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws:cognito/userPool:UserPool::user-pool
      type: aws:cognito/userPool:UserPool
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI::swagger-api
      type: aws-apigateway:index:RestAPI
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws:apigateway/apiKey:ApiKey::api-key
      type: aws:apigateway/apiKey:ApiKey
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws:iam/rolePolicy:RolePolicy::auth-lambda-role-policy
      type: aws:iam/rolePolicy:RolePolicy
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws:cognito/userPoolClient:UserPoolClient::user-pool-client
      type: aws:cognito/userPoolClient:UserPoolClient
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::pulumi:providers:aws::default_5_16_2
      type: pulumi:providers:aws
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:apigateway/restApi:RestApi::swagger-api
      type: aws:apigateway/restApi:RestApi
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:apigateway/deployment:Deployment::swagger-api
      type: aws:apigateway/deployment:Deployment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:apigateway/stage:Stage::swagger-api
      type: aws:apigateway/stage:Stage
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::pulumi:providers:pulumi::default
      type: pulumi:providers:pulumi
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws:lambda/function:Function::auth-lambda
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws:lambda/function:Function::hello-handler
      type: aws:lambda/function:Function
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI::api
      type: aws-apigateway:index:RestAPI
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:iam/role:Role::api-authorizer-1-authorizer-role
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:iam/role:Role::apibc092886
      type: aws:iam/role:Role
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:iam/rolePolicy:RolePolicy::api-authorizer-1-invocation-policy
      type: aws:iam/rolePolicy:RolePolicy
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:iam/rolePolicyAttachment:RolePolicyAttachment::apibc092886
      type: aws:iam/rolePolicyAttachment:RolePolicyAttachment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:s3/bucket:Bucket::api
      type: aws:s3/bucket:Bucket
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:s3/bucketObject:BucketObject::apibc092886/index.html
      type: aws:s3/bucketObject:BucketObject
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:apigateway/restApi:RestApi::api
      type: aws:apigateway/restApi:RestApi
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:apigateway/deployment:Deployment::api
      type: aws:apigateway/deployment:Deployment
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:lambda/permission:Permission::api-d55ce0e2
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:lambda/permission:Permission::api-e50f9aca
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:lambda/permission:Permission::api-bdec4f56
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:lambda/permission:Permission::api-a75de0f2
      type: aws:lambda/permission:Permission
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws-apigateway:index:RestAPI$aws:apigateway/stage:Stage::api
      type: aws:apigateway/stage:Stage
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws:apigateway/usagePlan:UsagePlan::usage-plan
      type: aws:apigateway/usagePlan:UsagePlan
    - urn: >-
        urn:pulumi:examples-api::aws-apigateway-py-routes::aws:apigateway/usagePlanKey:UsagePlanKey::usage-plan-key
      type: aws:apigateway/usagePlanKey:UsagePlanKey

---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-apigateway-py-routes/README.md)

# Routes in API Gateway

This example create an API Gateway which responds to requests using different sources:

1. Static files from a directory
2. Lambda Function
3. HTTP Proxy

When you're finished, you'll be familiar with how to configure routes in API Gateway using the RestAPI.

## Prerequisites

1. [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
2. [Configure AWS Credentials](https://www.pulumi.com/docs/intro/cloud-providers/aws/setup/)
3. [Install Python](https://www.pulumi.com/docs/intro/languages/python/)

## Deploy the App

### Step 1: Create a directory and cd into it

For Pulumi examples, we typically start by creating a directory and changing into it. Then, we create a new Pulumi project from a template. For example, `azure-javascript`.

1. Install packages:

    ```bash
    python3 -m venv venv
    venv/bin/pip install -r requirements.txt
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

$ curl -w '\n' "$(pulumi stack output swagger-url)"
{
  "uuid": ...
}

$ curl -w '\n' -H "x-api-key: $(pulumi stack output api-key-value --show-secrets)" "$(pulumi stack output url)key-authorized"
Hello, API Gateway!
```

Testing a valid Cognito token is a little more involved.

1. Create a random password

    ```bash
    PASSWORD=$(curl -s https://www.passwordrandom.com/query?command=password&scheme=Llnn%23rrrrrrrrrr)
    ```

2. Create a user

    ```bash
    aws cognito-idp sign-up --region $(pulumi config get aws:region) --client-id $(pulumi stack output user-pool-client-id) --username "test@domain.example" --password "$PASSWORD"
    ```

3. Confirm the user's account

    ```bash
    aws cognito-idp admin-confirm-sign-up --region $(pulumi config get aws:region) --user-pool-id $(pulumi stack output user-pool-id) --username "test@domain.example"
    ```

4. Authenticate to create a new session:

    ```bash
    TOKEN=$(aws cognito-idp admin-initiate-auth --region $(pulumi config get aws:region) --user-pool-id $(pulumi stack output user-pool-id) --client-id $(pulumi stack output user-pool-client-id) --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters "{\"USERNAME\":\"test@domain.example\",\"PASSWORD\":\"$PASSWORD\"}")
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

