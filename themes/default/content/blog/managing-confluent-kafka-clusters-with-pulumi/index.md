---
title: "Managing Confluent Kafka Clusters with Pulumi"
date: 2023-02-15
meta_desc: In this article, we'll show you how to create and manage Confluent Kafka clusters using Pulumi.
meta_image: "managing-confluent-clusters.png"
authors: ["josh-kodroff"]
tags: ["confluent", "kafka"]
---

Kafka is one of the most popular event store and stream-processing platforms in the ecosystem. However, managing Kafka clusters can require significant operational expertise that leads many organizations to look for a managed solution. Confluent Cloud provides managed Kafka clusters along with major value-add features such as elasticity, integrated security, stream governance, and improved monitoring.

In this blog post, we'll show you how to use Pulumi to manage your Confluent resources in order to maximize your organization's ability to quickly ship modern, secure, event-driven workloads. Using the [Confluent Cloud Pulumi provider](https://www.pulumi.com/registry/packages/confluentcloud/), we will create a sample architecture that demonstrates some of the key capabilities of both Pulumi and Confluent Cloud.

## Initializing the Project

Before we can add Confluent resources to our Pulumi program, we'll need to ensure we have a Confluent Cloud account and an API key. You can [sign up for a free trial of Confluent Cloud](https://www.confluent.io/get-started/) if you do not already have a Confluent Cloud account. [Create an API key](https://docs.confluent.io/cloud/current/access-management/authenticate/api-keys/api-keys.html#create-a-cloud-api-key) and set its values as environment variables:

```bash
export CONFLUENT_CLOUD_API_KEY=<your API key>
export CONFLUENT_CLOUD_API_SECRET=<your API secret>
```

Now we can create a new directory and initialize our Pulumi program:

```bash
mkdir confluent-blog-post
cd confluent-blog-post
pulumi new typscript
```

After a few seconds, our Pulumi program has been initialized. Next, we'll need to add a reference to the Pulumi Confluent provider:

```bash
npm i @pulumi/confluent
```

Finally, we'll need to add a reference to the top of our `index.ts`:

```typescript
import * as confluent from "@pulumi/confluentcloud";
```

Now we're ready to create our Confluent resources!

## Adding Resources

Our example architecture will have the following components:

- A Kafka cluster for our messages ("inventory").
- An admin service account which we'll use to create objects within the cluster (topics and users).
- A Kafka topic for our cluster, which will hold our sample messages.
- A producer service account, which we'll use to write messages to the topic.
- A consumer service account, which we'll use to read messages from the topic.

We'll be keeping all of our resources in a single file, our `index.ts`.

The first resource we need to create is a Confluent environment which is a container for the other resources we'll be creating:

```typescript
const env = new confluent.Environment("environment", {
  displayName: "pulumi-confluent-blog",
});
```

Next, we'll create a standard Kafka cluster. A couple notes about the cluster we're creating:

1. We're creating a single-zone cluster for cost reasons, but if you're creating a cluster for production scenarios you'll likely want to use the `MULTI_ZONE` option for `availability`.
1. While we're creating our cluster in AWS' us-east-2 region, Confluent Cloud also supports Azure and Google Cloud as well as other regions within AWS. For a full list of supported options for the `cloud` and `region` attributes, see [Cloud Providers and Regions for Confluent Cloud](https://docs.confluent.io/cloud/current/clusters/regions.html#cloud-providers-and-regions).

Add the following code to your Pulumi program:

```typescript
const cluster = new confluent.KafkaCluster("cluster", {
  displayName: "inventory",
  availability: "SINGLE_ZONE",
  cloud: "AWS",
  region: "us-east-2",
  environment: {
    id: env.id,
  },
  standard: {}
});
```

Next, we'll need to create the admin-level service account that we'll use to create our Kafka topic and our producer and consumer accounts. This app manager account is similar to the "DBA" account you may be familiar with in relational databases, or the root account in Linux:

```typescript
const serviceAccount = new confluent.ServiceAccount("app-manager", {
  description: "Service account to manage 'inventory' Kafka cluster",
});

const roleBinding = new confluent.RoleBinding("app-manager-kafka-cluster-admin", {
  principal: pulumi.interpolate`User:${serviceAccount.id}`,
  roleName: "CloudClusterAdmin",
  crnPattern: cluster.rbacCrn,
});

const managerApiKey = new confluent.ApiKey("app-manager-kafka-api-key", {
  displayName: "app-manager-kafka-api-key",
  description: "Kafka API Key that is owned by 'app-manager' service account",
  owner: {
    id: serviceAccount.id,
    kind: serviceAccount.kind,
    apiVersion: serviceAccount.apiVersion,
  },
  managedResource: {
    id: cluster.id,
    apiVersion: cluster.apiVersion,
    kind: cluster.kind,
    environment: {
      id: env.id,
    },
  }
}, {
  dependsOn: roleBinding
});
```

Next, we'll create our Kafka topic using the cluster admin service account credentials we just created (see the `credentials` input in the following code):

```typescript
const topic = new confluent.KafkaTopic("orders", {
  kafkaCluster: {
    id: cluster.id,
  },
  topicName: "orders",
  restEndpoint: cluster.restEndpoint,
  credentials: {
    key: managerApiKey.id,
    secret: managerApiKey.secret,
  },
});
```

Now that we have our topic, we need to create a consumer service account and give that account permissions to write to the topic, again using the credentials of our cluster admin account:

```typescript
const producerAccount = new confluent.ServiceAccount("producer", {
  description: "Service account to produce to 'orders' topic of 'inventory' Kafka cluster",
});

const producerApiKey = new confluent.ApiKey("producer-api-key", {
  owner: {
    id: producerAccount.id,
    kind: producerAccount.kind,
    apiVersion: producerAccount.apiVersion,
  },
  managedResource: {
    id: cluster.id,
    apiVersion: cluster.apiVersion,
    kind: cluster.kind,
    environment: {
      id: env.id,
    },
  },
});

new confluent.KafkaAcl("app-producer-write", {
  kafkaCluster: {
    id: cluster.id,
  },
  resourceType: "TOPIC",
  resourceName: topic.topicName,
  patternType: "LITERAL",
  principal: pulumi.interpolate`User:${producerAccount.id}`,
  host: "*",
  operation: "WRITE",
  permission: "ALLOW",
  restEndpoint: cluster.restEndpoint,
  credentials: {
    key: managerApiKey.id,
    secret: managerApiKey.secret,
  }
});
```

Now we create our consumer account which will read messages from our Kafka topic. It's created in a similar fashion to the producer:

```typescript
const consumerAccount = new confluent.ServiceAccount("consumer", {
  description: "Service account to consume from 'orders' topic of 'inventory' Kafka cluster",
});

const consumerApiKey = new confluent.ApiKey("consumer-api-key", {
  owner: {
    id: consumerAccount.id,
    kind: consumerAccount.kind,
    apiVersion: consumerAccount.apiVersion,
  },
  managedResource: {
    id: cluster.id,
    apiVersion: cluster.apiVersion,
    kind: cluster.kind,
    environment: {
      id: env.id,
    },
  },
});

new confluent.KafkaAcl("consumer-read-topic-acl", {
  kafkaCluster: {
    id: cluster.id,
  },
  resourceType: "TOPIC",
  resourceName: topic.topicName,
  patternType: "LITERAL",
  principal: pulumi.interpolate`User:${consumerAccount.id}`,
  host: "*",
  operation: "READ",
  permission: "ALLOW",
  restEndpoint: cluster.restEndpoint,
  credentials: {
    key: managerApiKey.id,
    secret: managerApiKey.secret,
  }
});

new confluent.KafkaAcl("consumer-read-group-acl", {
  kafkaCluster: {
    id: cluster.id,
  },
  resourceType: "GROUP",
  resourceName: "confluent_cli_consumer_",
  patternType: "PREFIXED",
  principal: pulumi.interpolate`User:${consumerAccount.id}`,
  host: "*",
  operation: "READ",
  permission: "ALLOW",
  restEndpoint: cluster.restEndpoint,
  credentials: {
    key: managerApiKey.id,
    secret: managerApiKey.secret,
  }
});
```

Finally, we will add some Pulumi stack outputs. Stack outputs allow us to access values from our Pulumi program in two ways:

1. Via [stack references](https://www.pulumi.com/learn/building-with-pulumi/stack-references/) in other Pulumi programs, which we won't be using in this blog post.
1. From the command line via the `pulumi stack output` command, which we will be using to test our Kafka cluster.

The syntax for Pulumi stack outputs varies by language, but in TypeScript programs they are accomplished by a simple `export` statement:

```typescript
export const ordersTopicName = topic.topicName;
export const environmentId = env.id;
export const clusterId = cluster.id;

export const producerApiKeyId = producerApiKey.id;
export const producerApiKeySecret = producerApiKey.secret;

export const consumerApiKeyId = consumerApiKey.id;
export const consumerApiKeySecret = consumerApiKey.secret;
```

Our Pulumi program is now complete! We can deploy our infrastructure by running the following command:

```bash
pulumi up
```

After a short wait, our cluster is up and running and we are ready to test our infrastructure!

## Testing

In order to simulate our producer and consumer, we can use the [Confluent CLI](https://docs.confluent.io/confluent-cli/current/overview.html) to send messages to and read messages from our topic. We will use the values of our Pulumi stack outputs to formulate the command.

To simulate a message producer, we can send messages to our Kafka topic with the following command:

```bash
confluent kafka topic produce $(pulumi stack output ordersTopicName) \
  --environment $(pulumi stack output environmentId) \
  --cluster $(pulumi stack output clusterId) \
  --api-key $(pulumi stack output producerApiKeyId) \
  --api-secret "$(pulumi stack output producerApiKeySecret --show-secrets)"
```

We can enter a few sample records like the following, and then press `Ctrl-C` when we're done to exit:

```json
{"number":1,"date":18500,"shipping_address":"899 W Evelyn Ave, Mountain View, CA 94041, USA","cost":15.00}
{"number":2,"date":18501,"shipping_address":"1 Bedford St, London WC2E 9HG, United Kingdom","cost":5.00}
{"number":3,"date":18502,"shipping_address":"3307 Northland Dr Suite 400, Austin, TX 78731, USA","cost":10.00}
```

To simulate our consumer and read the records we just wrote, we can enter the following command:

```bash
$ confluent kafka topic consume $(pulumi stack output ordersTopicName) \
  --from-beginning \
  --environment $(pulumi stack output environmentId) \
  --cluster $(pulumi stack output clusterId) \
  --api-key $(pulumi stack output consumerApiKeyId) \
  --api-secret $(pulumi stack output consumerApiKeySecret --show-secrets)

Starting Kafka Consumer. Use Ctrl-C to exit.
{"number":3,"date":18502,"shipping_address":"3307 Northland Dr Suite 400, Austin, TX 78731, USA","cost":10.00}
{"number":1,"date":18500,"shipping_address":"899 W Evelyn Ave, Mountain View, CA 94041, USA","cost":15.00}
{"number":2,"date":18501,"shipping_address":"1 Bedford St, London WC2E 9HG, United Kingdom","cost":5.00}
```

Our producer is able to write events to our topic and out consumer is able to read them. Our architecture has been proven to work!

## Conclusion

By combining the simplicity and rich functionality of Confluent Cloud with the power of Pulumi to manage our Confluent resources using real programming languages, we can help our organization quickly and securely deploy event-driven applications that deliver value for our stakeholders!
