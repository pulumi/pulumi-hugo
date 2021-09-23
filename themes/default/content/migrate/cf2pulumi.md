---
title: Convert Your Cloud Formation Template to a Modern Programming Language
url: /cf2pulumi
layout: cf2pulumi
linktitle: cf2pulumi
menu:
  converters:
    identifier: cf2pulumi
    weight: 1
    
meta_desc: See what your Cloud Formation Template would look like in a modern programming language thanks to Pulumi.

examples:
    - name: Provision an EC2 Instance
      filename: aws.yaml
      description:
      code: |
        AWSTemplateFormatVersion: "2010-09-09"
        Description: A sample template
        Resources:
            MyEC2Instance:
                Type: "AWS::EC2::Instance"
                Properties:
                    ImageId: "ami-0ff8a91507f77f867"
                    InstanceType: t2.micro
                    KeyName: testkey
                    BlockDeviceMappings:
                      - DeviceName: /dev/sdm
                        Ebs:
                            VolumeType: io1
                            Iops: 200
                            DeleteOnTermination: false
                            VolumeSize: 20


form:
    hubspot_form_id: 8381e562-5fdf-4736-bb10-86096705e4ee
---
