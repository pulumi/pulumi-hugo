import pulumi
import pulumi_aws as aws
import asyncio
import boto3
import json
import os
import requests
import subprocess
import time

# Build the website.
result = subprocess.run(["hugo"], stdout=subprocess.PIPE, cwd="./www")

# Provision a storage bucket for the website.
bucket = aws.s3.Bucket(
    "bucket", website=aws.s3.BucketWebsiteArgs(index_document="index.html")
)

# Apply some ownership controls and public-access privileges.
ownership_controls = aws.s3.BucketOwnershipControls(
    "ownership-controls",
    bucket=bucket.bucket,
    rule=aws.s3.BucketOwnershipControlsRuleArgs(
        object_ownership="ObjectWriter",
    ),
)

public_access_block = aws.s3.BucketPublicAccessBlock(
    "public-access-block",
    bucket=bucket.bucket,
    block_public_acls=False,
)

# Copy the website home page into the bucket
homepage = aws.s3.BucketObject(
    "index.html",
    bucket=bucket.id,
    content=open("./www/public/index.html", "r").read(),
    content_type="text/html",
    acl="public-read",
    opts=pulumi.ResourceOptions(depends_on=[ownership_controls, public_access_block]),
)

# Fetch some redirects from a hypothetical CMS.
response = requests.get(f"{os.environ['CMS_ENDPOINT']}/redirects.json")
redirects = json.loads(response.text)

# Create an S3 website redirect for each one.
for i, redirect in enumerate(redirects):
    aws.s3.BucketObject(f"redirect-{i}",
        bucket=bucket.id,
        key=redirect["from"],
        website_redirect=redirect["to"],
        acl="public-read",
        opts=pulumi.ResourceOptions(depends_on=[ownership_controls, public_access_block]),
    )

# Create a CloudFront distribution for the website.
cdn = aws.cloudfront.Distribution(
    "cdn",
    enabled=True,
    default_root_object="index.html",
    origins=[
        aws.cloudfront.DistributionOriginArgs(
            origin_id=bucket.arn,
            domain_name=bucket.website_endpoint,
            custom_origin_config=aws.cloudfront.DistributionOriginCustomOriginConfigArgs(
                origin_protocol_policy="http-only",
                http_port=80,
                https_port=443,
                origin_ssl_protocols=["TLSv1.2"],
            ),
        )
    ],
    default_cache_behavior=aws.cloudfront.DistributionDefaultCacheBehaviorArgs(
        target_origin_id=bucket.arn,
        viewer_protocol_policy="redirect-to-https",
        allowed_methods=["GET", "HEAD", "OPTIONS"],
        cached_methods=["GET", "HEAD", "OPTIONS"],
        forwarded_values=aws.cloudfront.DistributionDefaultCacheBehaviorForwardedValuesArgs(
            query_string=True,
            cookies=aws.cloudfront.DistributionDefaultCacheBehaviorForwardedValuesCookiesArgs(
                forward="all",
            ),
        ),
    ),
    restrictions=aws.cloudfront.DistributionRestrictionsArgs(
        geo_restriction=aws.cloudfront.DistributionRestrictionsGeoRestrictionArgs(
            restriction_type="none",
        ),
    ),
    viewer_certificate=aws.cloudfront.DistributionViewerCertificateArgs(
        cloudfront_default_certificate=True,
    ),
)

def create_invalidation(id):

    # Don't bother invalidating unless it's an actual deployment.
    if pulumi.runtime.is_dry_run():
        print("This is a Pulumi preview, so skipping cache invalidation.")
        return

    client = boto3.client("cloudfront")
    result = client.create_invalidation(
        DistributionId=id,
        InvalidationBatch={
            "CallerReference": f"invalidation-{str(time.time)}",
            "Paths": {
                "Quantity": 1,
                "Items": [ "/*" ],
            },
        },
    )

    print(f"Cache invalidation of distribution {id}: {result['Invalidation']['Status']}.")

# Register a function to be be invoked before the program exits.
async def invalidate(id):
    await asyncio.to_thread(create_invalidation, id)

cdn.id.apply(lambda id: invalidate(id))

# Export the URL of the CDN.
pulumi.export("cdnURL", pulumi.Output.format("https://{0}", cdn.domain_name))
