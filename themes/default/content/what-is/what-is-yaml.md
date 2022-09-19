---
title: What is YAML?
meta_desc: |
     YAML is a data serialization language that has steadily increased in popularity. Discover how to use YAML with Pulumi today.

type: what-is
page_title: "What is YAML?"

customer_logos:
  title: Leading engineering organizations are building with Pulumi
  logos:
    - items:
      - snowflake
      - tableau
      - atlassian
      - fauna
      - ware2go
    - items:
      - mindbody
      - sourcegraph
      - fenergo
      - skai
      - lemonade
    - items:
      - clearsale
      - angellist
      - webflow
      - supabase
      - ro
---

YAML is a data serialization language most commonly used for configuration files. Its easy readability and rich feature set have made it an increasingly popular choice over the years, for everything from configuration files to object serialization. Originally named "Yet Another Markup Language," the creaters changed the name to "YAML Ain't a Markup Language" in order to better reflect its focus as a data-oriented language rather than simply markup.

## YAML Syntax and Features

Many of YAML's strongest features were inspired by other programming languages. Like Python, YAML uses whitespace indentation for defining the structure of your file. Strings, integers, floats, lists, and dictionaries are all natively supported, and it does also allow you to define custom data types. JSON files are valid YAML. Dig far enough into the history of YAML and you'll find pieces of the PERL, C, and HTML specs.

The following is an example of YAML:

```yaml
---
# An easy-to-read set of data on the Pulumi mascot, in YAML
name: Pulumipus
breed: platypus
color: purple
mascot: True
age: 5
hobbies:
  - Kayaking
  - Bouldering
  - Reading
  - Coding
languages:
  python: Expert
    version: 3.7
  typescript: Expert
  csharp: Expert
  java: Expert
  yaml: Expert
```

The beginning of a YAML file is always three dashes (`---`) on the first line. From there, your file is built out of key-value pairs.

```yaml
name: Pulumipus
breed: platypus
color: purple
```

The first three key-value pairs are strings indicating that this creature is a purple platypus named Pulumipus, but YAML also supports integers, floats, and booleans to give their age and current status as a mascot:

```yaml
mascot: True
age: 5
```

We also have access to lists (or arrays), indicated by preceding an indented item with a dash:

```yaml
hobbies:
  - Kayaking
  - Bouldering
  - Reading
  - Coding
```

You can even nest these key-value pairs for more granular information:

```yaml
languages:
  python: Expert
    version: 3.7
  typescript: Expert
  csharp: Expert
  java: Expert
  yaml: Expert
```

## YAML with Pulumi

If a high degree of readability is your concern and you do not need the expressivity of a full-fledged programming language like Python or Typescript, YAML is a great option for defining and deploying your infrastructure with Pulumi. Take the following example, which creates an AWS S3 bucket and deploys a simple "hello world" website before returning the URL of your bucket:

```yaml
---
name: simple-yaml
runtime: yaml
resources:
  my-bucket:
    type: aws:s3:Bucket
    properties:
      website:
        indexDocument: index.html
  index.html:
    type: aws:s3:BucketObject
    properties:
      bucket: ${my-bucket}
      source:
        Fn::StringAsset: <h1>Hello, world!</h1>
      acl: public-read
      contentType: text/html
outputs:
  bucketEndpoint: http://${my-bucket.websiteEndpoint}
```

Defining infrastructure doesn't get much simpler than that! [Try it yourself](({{< relref "/docs/intro/languages/yaml/" >}})) and get started with any major cloud provider in a snap.

## Pulumi Corporation

Pulumi's Cloud Engineering Platform unites infrastructure teams, application developers, and compliance teams around a unified software engineering process for delivering modern cloud applications faster and speeding innovation. Pulumi’s open-source tools help infrastructure teams tame the cloud’s complexity with Universal Infrastructure-as-Code using the world’s most popular programming languages and communities, including Python, YAML, Node.js (JavaScript, TypeScript), Go, and .NET (C#, F#, VB). [Get started for free today]({{< relref "/docs/get-started" >}}) or check out our on-demand workshops and tutorials for getting started with [IaC and Python]({{< relref "/resources/getting-started-with-automation-api" >}}).
