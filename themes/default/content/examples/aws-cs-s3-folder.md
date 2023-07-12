---
title: "Host a Static Website on Amazon S3"
meta_desc: ""
metadata:
  id: aws-cs-s3-folder
  title: "Host a Static Website on Amazon S3"
  description: ""
  url: https://github.com/pulumi/examples/tree/master/aws-cs-s3-folder
  runtime: 
  lastUpdate: 
  duration: 
  resources: []

summary: "This Pulumi example is an implementation of a cloud-computing use case in which an AWS S3 folder is created to store content. It uses the AWS cloud provider and the programming language TypeScript. It sets up cloud resources, such as creating an S3 bucket, setting up permissions, and enabling S3 versioning. Lastly, it can be used to post files to the newly created S3 folder to be stored in the cloud."
---

[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new?template=https://github.com/pulumi/examples/blob/master/aws-cs-s3-folder/README.md)

# Host a Static Website on Amazon S3

A static website that uses [S3's website support](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html).

## Deploying and running the program

1.  Create a new stack:

    ```bash
    $ pulumi stack init dev
    ```

1.  Set the AWS region:

    ```
    $ pulumi config set aws:region us-west-2
    ```

1.  Run `pulumi up` to preview and deploy changes.

    ```bash
    Previewing update (dev):
        Type                       Name                  Plan       
    +   pulumi:pulumi:Stack        aws-cs-s3-folder-dev  create     
    +   └─ aws:s3:Bucket           my-bucket             create     
    +      ├─ aws:s3:BucketObject  index.html            create     
    +      └─ aws:s3:BucketObject  favicon.png           create     
    
    Resources:
        + 4 to create

    Do you want to perform this update? yes
    Updating (dev):
        Type                       Name                  Status      
    +   pulumi:pulumi:Stack        aws-cs-s3-folder-dev  created     
    +   └─ aws:s3:Bucket           my-bucket             created     
    +      ├─ aws:s3:BucketObject  index.html            created     
    +      └─ aws:s3:BucketObject  favicon.png           created     
    
    Outputs:
        Endpoint: "http://my-bucket-1234567.s3-website.us-west-2.amazonaws.com"
    ```

1.  Navigate to the website URL:

    ```bash
    $ curl $(pulumi stack output Endpoint)
    <html><head>
        <title>Hello S3</title><meta charset="UTF-8">
        <link rel="shortcut icon" href="/favicon.png" type="image/png">
    </head>
    <body><p>Hello, world!</p><p>Made with ❤️ with <a href="https://pulumi.com">Pulumi</a></p>
    </body></html>
    ```

1.  To clean up resources, run `pulumi destroy` and answer the confirmation question at the prompt.

