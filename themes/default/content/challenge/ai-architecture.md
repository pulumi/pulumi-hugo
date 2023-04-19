---
title: "GPT Your IaC"
layout: challenge/single
description: |
    Use Pulumi AI to generate the most interesting or sophisticated architecture possible
meta_desc: |
    Use Pulumi AI to generate the most interesting or sophisticated architecture possible
meta_image: /images/challenge/challenge-dec-meta.png
banner_image: /images/challenge/challenge-ai-banner.png
---

## Welcome to the GPT Your IaC Challenge!

### What you will learn

Why write your Pulumi programs yourself when you can have AI do it for you. Pulumi AI leverages large language models (LLMs) to author infrastructure as code for any architecture for any cloud in any language.

Visit [pulumi.com/ai](https://pulumi.com/ai) or download the [CLI](https://github.com/pulumi/pulumi-ai) to use Pulumi AI. The challenge is to have Pulumi AI create the most complex and sophisticated piece of architecture that you can run a successful `pulumi up`.

We will send you a piece of swag if you document this via a blog post, social media, or video. Tag us on social media or email us at [da@pulumi.com](mailto:da@pulumi.com), and we will help spread the word about your experience. All submissions will be judged at the end of the challenge, and the best submissions (there will be a few categories) will receive a special prize.

### Prerequisites

In order to complete this challenge, you'll need a couple things set up in advance. The challenge utilizes whatever cloud you choose to ask PulumiAI to write a program.

- A [Pulumi account](https://app.pulumi.com/signup)
- The [Pulumi CLI](/docs/get-started/install/)
- Pulumi AI
- Cloud accounts
- OpenAI API Key

### Challenge

#### Step 1. Go to Pulumi AI Website

There are two ways to complete this challenge:  using the Pulumi AI website or the CLI. We will be using the Pulumi AI website to generate a Pulumi program and then the Pulumi CLI to run the program for this example. If you plan to use the CLI, you will need to export your AWS and OpenAI credentials. To access your OpenAI credentials, go to [__API Keys__ tab](https://platform.openai.com/account/api-keys) in the OpenAI platform console. Then click `Create new secret key` .

```shell
export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
export OPENAI_API_KEY=<YOUR_API_KEY>
```

To begin the challenge, first navigate to [pulumi.com/ai](https://pulumi.com/ai).

![alt_text](/images/challenge/AIStep1.png "navigate to Pulumi AI website")

#### Step 2. Generate Program

Next, you are going to use Pulumi AI to generate a program that will provision some database infrastructure that will be used for a real-time application that generates lots of data. Using the chat widget on the Pulumi AI page, describe the infrastructure you would like to build:  `Deploy a Kinesis Data Stream, RDS database, DynamoDB database, and Timestream database.`

Pulumi AI will return something like the code below:  

```python
import pulumi
import pulumi_aws as aws

# Create a VPC security group
security_group = aws.ec2.SecurityGroup("mySecurityGroup",
    description="Allow inbound connections",
    ingress=[
        {"protocol": "tcp", "from_port": 3306, "to_port": 3306, "cidr_blocks": ["0.0.0.0/0"]},
    ],
)

# Create a Kinesis Data Stream
kinesis_stream = aws.kinesis.Stream("myDataStream",
    shard_count=1
)

# Create an RDS Instance (MySQL)
rds_instance = aws.rds.Instance("my-rds-example",
    engine="mysql",
    engine_version="5.7",
    instance_class="db.t2.micro",
    allocated_storage=20,
    storage_type="gp2",
    username="master",
    password="examplePassword!",
    vpc_security_group_ids=[
        security_group.id,
    ],
    publicly_accessible=True,
    skip_final_snapshot=True
)

# Create a DynamoDB Table
dynamodb_table = aws.dynamodb.Table("myDynamoDBTable",
    attributes=[
        {
            "name": "id",
            "type": "S",
        },
    ],
    hash_key="id",
    read_capacity=5,
    write_capacity=5
)

# Create a Timestream Database
timestream_database = aws.timestreamwrite.Database("myTimestreamDB")

# Stack exports
pulumi.export("kinesisStreamArn", kinesis_stream.arn)
pulumi.export("rdsInstanceEndpoint", rds_instance.endpoint)
pulumi.export("dynamodbTableArn", dynamodb_table.arn)
pulumi.export("timestreamDatabaseArn", timestream_database.arn)
```

#### Step 3. Execute Generated Pulumi Program

Now that you have a generated Pulumi program, you can create a new Pulumi program to run the program. Let's create a new directory and a new Pulumi python project.

```shell
mkdir ai-challenge && cd ai-challenge
pulumi new aws-python
```

Copy the Pulumi AI generated program into `__main__.py`. Save the program and then run `pulumi up`. There will be an error that looks like:

```shell
Diagnostics:
  pulumi:pulumi:Stack (ai-challenge-dev):
    error: Program failed with an unhandled exception:
    Traceback (most recent call last):
      File "/home/kao/code/test-folder/ai-challenge/./__main__.py", line 47, in <module>
        timestream_database = aws.timestreamwrite.Database("myTimestreamDB")
      File "/home/kao/code/test-folder/ai-challenge/venv/lib/python3.8/site-packages/pulumi_aws/timestreamwrite/database.py", line 290, in __init__
        __self__._internal_init(resource_name, *args, **kwargs)
      File "/home/kao/code/test-folder/ai-challenge/venv/lib/python3.8/site-packages/pulumi_aws/timestreamwrite/database.py", line 309, in _internal_init
        raise TypeError("Missing required property 'database_name'")
    TypeError: Missing required property 'database_name'
```

#### Step 4. Fix Program

Pulumi AI programs will sometimes have errors, but you can ask it to fix the error. Go back to [pulumi.com/ai](https://pulumi.com/ai) and enter in the chat widget `Fix this error <error outputted from pulumi up>`

![alt_text](/images/challenge/AIStep4.png "navigate to Pulumi AI website")

Pulumi AI will fix the error. In this case it said

```
I see that the error is caused because the required property
database_name is missing in the timestreamwrite.Database resource.
Let me update the program to include the missing property.
```

Pulumi AI will return back the original program with the error corrected, which is including the `database_name` parameter.

```python
timestream_database = aws.timestreamwrite.Database("myTimestreamDB", database_name="my-db-name")
```

Take this new code and update `__main__.py`.

#### Step 5. Execute Updated Pulumi Program

Now that the code is fixed, run `pulumi up` again. This time the program will execute successfully.

```shell
 Type                             Name              Status
 +   pulumi:pulumi:Stack              ai-challenge-dev  created (280s)
 +   ├─ aws:kinesis:Stream            myDataStream      created (21s)
 +   ├─ aws:ec2:SecurityGroup         mySecurityGroup   created (2s)
 +   ├─ aws:timestreamwrite:Database  myTimestreamDB    created (1s)
 +   ├─ aws:dynamodb:Table            myDynamoDBTable   created (7s)
 +   └─ aws:rds:Instance              my-rds-example    created (275s)

Outputs:
    dynamodbTableArn     : "arn:aws:dynamodb:us-west-2:616138583583:table/myDynamoDBTable-fad6451"
    kinesisStreamArn     : "arn:aws:kinesis:us-west-2:616138583583:stream/myDataStream-48c92be"
    rdsInstanceEndpoint  : "my-rds-example10eb710.chuqccm8uxqx.us-west-2.rds.amazonaws.com:3306"
    timestreamDatabaseArn: "arn:aws:timestream:us-west-2:616138583583:database/my-db-name"
```

You now have important database infrastructure provisioned for your new app.

### Congratulations

Congratulations! You've completed this Pulumi Challenge. If you want, please create a blog post, social media, or video documenting your work on this challenge. Tag us on social media or email us at [da@pulumi.com](mailto:da@pulumi.com) to claim your swag. Winners will be chosen in a few months and receive a special prize.

#### What you have learned

In this challenge, you have learned how to use Pulumi AI to generate a Pulumi program. This program provisions a Kinesis Data Stream, RDS database, Timestream database, and a DynamoDB table.

#### Clean up

If you'd like to tear down all of these resources and delete your stack, run `pulumi destroy -rf --remove`. Otherwise, have fun playing around with your infrastructure stack and add whatever you like! 🙂
