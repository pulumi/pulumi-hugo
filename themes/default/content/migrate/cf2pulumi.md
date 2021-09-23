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
      filename: instance.yaml
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
    - name: A Sample Lambda Function 
      filename: aws.yaml
      description:
      code: |
        AWSTemplateFormatVersion: '2010-09-09'
        Description: Template for Lambda Sample.
        Parameters:
         EnvName:
           Type: String
           Description: Name of an environment. 'dev', 'staging', 'prod' and any name.
           AllowedPattern: ^.*[^0-9]$
           ConstraintDescription: Must end with non-numeric character.
         LambdaHandlerPath:  
           Type: String
           Description: Path of a Lambda Handler. 
           AllowedPattern: ^.*[^0-9]$
           ConstraintDescription: Must end with non-numeric character.
        Outputs:
         LambdaRoleARN:
           Description: Role for Lambda execution.
           Value:
             Fn::GetAtt:
               - LambdaRole
               - Arn
           Export:
             Name:
               Fn::Sub: LambdaRole
         LambdaFunctionName:
           Value:
             Ref: LambdaFunction
         LambdaFunctionARN:
           Description: Lambda function ARN.
           Value:
             Fn::GetAtt:
               - LambdaFunction
               - Arn
           Export:
             Name:
               Fn::Sub: LambdaARN-${EnvName}
        Resources:
         LambdaRole:
           Type: AWS::IAM::Role
           Properties:
             RoleName:
               Fn::Sub: lambda-role
             AssumeRolePolicyDocument:
               Statement:
                 - Action:
                   - sts:AssumeRole
                   Effect: Allow
                   Principal:
                     Service:
                     - lambda.amazonaws.com
               Version: 2012-10-17
             ManagedPolicyArns:
               - arn:aws:iam::aws:policy/AWSLambdaExecute
               - arn:aws:iam::aws:policy/AmazonS3FullAccess
               - arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess
               - arn:aws:iam::aws:policy/AmazonKinesisFullAccess
             Path: /
         LambdaFunction:
           Type: AWS::Lambda::Function
           Properties:
             FunctionName:
               Fn::Sub: lambda-function-${EnvName}
             Description: LambdaFunctioni of nodejs10.x.
             Runtime: nodejs10.x
             Code:
               ZipFile:
                 "exports.handler = function(event, context){\n
                   var sample = sample;"
             Handler: Fn::Sub: ${LambdaHandlerPath}
             MemorySize: 128
             Timeout: 10
             Role:
               Fn::GetAtt:
                 - LambdaRole
                 - Arn
             Environment:
               Variables:
                 ENV:
                   Fn::Sub: ${EnvName}
                 TZ: UTC
form:
    hubspot_form_id: 8381e562-5fdf-4736-bb10-86096705e4ee
---
