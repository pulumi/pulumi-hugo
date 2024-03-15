using Pulumi;
using Pulumi.Aws.S3;
using Pulumi.Aws.CloudFront;
using System.Collections.Generic;

return await Deployment.RunAsync(() =>
{
    var bucket = new Bucket("content-bucket", new BucketArgs
    {
        Acl = "private",
        Website = new BucketWebsiteArgs
        {
            IndexDocument = "index.html",
            ErrorDocument = "404.html",
        },
    });
    
    var originAccessIdentity = new OriginAccessIdentity("cloudfront", new OriginAccessIdentityArgs
    {
        Comment = Output.Format($"OAI-{bucket.Id}"),
    });
    
    var bucketPolicy = new BucketPolicy("cloudfront-bucket-policy", new BucketPolicyArgs
    {
        Bucket = bucket.Bucket,
        Policy = Output.Tuple(bucket.Arn, originAccessIdentity.IamArn)
        .Apply(t =>
        {
            string bucketArn = t.Item1;
            string cloudfrontIamArn = t.Item2;
    
            var policy = new
            {
                Version = "2012-10-17",
                Statement = new object[]
                {
                    new
                    {
                        Sid = "CloudfrontAllow",
                        Effect = "Allow",
                        Principal = new { AWS = cloudfrontIamArn },
                        Action = "s3:GetObject",
                        Resource = $"{bucketArn}/*",
                    },
                },
            };
    
            return JsonSerializer.Serialize(policy);
        }),
    }, new CustomResourceOptions { Parent = bucket });
});
