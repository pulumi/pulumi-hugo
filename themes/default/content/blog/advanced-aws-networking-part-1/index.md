---
title: "Advanced AWS Networking, Part 1"

# The date represents the post's publish date,
# and by default corresponds with the date this file was generated.
# Posts with future dates are visible in development,
# but excluded from production builds.
# Use the time and timezone-offset portions of of this value
# to schedule posts for publishing later.
date: 2023-03-28T11:17:23-04:00

# Use the meta_desc property to provide a brief summary
# (one or two sentences) of the content of the post,
# which is useful for targeting search results or social-media previews.
# This field is required or the build will fail the linter test.
# Max length is 160 characters.
meta_desc: Learn how to create a hub-and-spoke architecture in AWS in Python with Pulumi.

# The meta_image appears in social-media previews and on the blog home page.
# A placeholder image representing the recommended format, dimensions and aspect ratio
# has been provided for you.
meta_image: meta.png

authors:
    - josh-kodroff
    - andy-taylor
    - jose-juhala

tags:
    - aws
    - networking
    - hub-and-spoke
    - python
---

In this blog series we'll teach you how to create a hub-and-spoke network architecture in AWS with centralized egress. In this first installment, we'll talk about the benefits of this architecture and begin to lay out some of its components in Python with Pulumi, the infrastructure as code tool that enables you to manage infrastructure with real programming languages!

<!--more-->

{{% notes type="info" %}}
The complete code for this project is available on [GitHub](https://github.com/pulumi/examples/tree/master/aws-py-hub-and-spoke).
{{% /notes %}}

## What is a hub-and-spoke network?

A hub-and-spoke network is a common architecture for creating a network topology that provides isolation and security for your workloads. Our hub-and-spoke architecture on AWS has three main components: an inspection VPC, AWS Transit Gateway, and a series of spoke VPCs.

* The inspection VPC provides centralized egress. It is the only VPC that can communicate with the internet, and all other VPCs must route their traffic through the inspection VPC. In a later blog post, we'll add AWS Firewall to the inspection VPC to allow all traffic to the internet to be governed by a single set of policies.
* Network connectivity between VPCs is accomplished via [AWS Transit Gateway](https://aws.amazon.com/transit-gateway/). The transit gateway maintains a central routing table that is used to route traffic from the spoke VPCs to the internet. We also need to maintain routes so that return traffic from the internet can be routed back to the correct spoke VPC.
* The spoke VPCs are where we would run our application workloads. They are isolated from each other and cannot communicate with each other unless we explicitly allow a network path. They will be able to communicate with the internet by default, but only through the hub VPC.

{{% notes type="info" %}}
We could also enable communication between the spoke VPCs by adding routes to the transit gateway routing table. Traffic between spoke VPCs _would not_ be desirable if those VPCs represent, for example, development, QA, and production environments of the same workload, for security reasons. Traffic between spoke VPCs _would_ be desirable if those VPCs represent multiple workloads in the _same_ environment, for example, our production online store and our production ERP software. (We will not be enabling routes between spokes in this architecture.)
{{% /notes %}}

A fully fleshed-out version of the architecture, with multiple spoke VPCs looks like the following:

![Diagram of a hub-and-spoke architecture in AWS with Transit Gateway and AWS Firewall](./hub-and-spoke-architecture.png)

For a full discussion of all the considerations of building larger networks on AWS, see [Building a Scalable and Secure Multi-VPC AWS Network Infrastructure](https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/welcome.html).

## Why use a hub-and-spoke network with centralized egress?

There’s several advantages to using centralized egress:

* **Cost savings:** We save costs by allowing all of our VPCs to share a single set of highly-available NAT gateways. There are costs to using AWS Transit Gateway, but in most scenarios Transit Gateway costs are less than the cost of running NAT gateways in each VPC.
* **Stable IP addresses:** Because all of our egress traffic to the internet comes from the same set of stable elastic IP addresses attached to the NAT gateways, we can more easily interface with systems that use high-trust, network based security models. Network administrators for the systems we want to interface with only need allow a limited number of stable IPs to establish connectivity (as opposed to having to allow new IPs for every VPC we create or  the large range of IP addresses for AWS managed services not running within a VPC).
* **Centralized traffic inspection:** When all traffic to the internet flows through a single point, we only need to apply a firewall and associated rules in that single point, which ensures that all network traffic to the internet complies with our organization’s security policies. In a second post in this series, we’ll add in AWS Firewall to our hub VPC in order to add centralized inspection of network traffic going to the internet.

## Initializing the Pulumi Project

We will be using Python for this project, but Pulumi supports many other languages as well. You can see the full list of supported languages on the [Pulumi website](https://www.pulumi.com/docs/intro/languages/).

The first thing we need to do is initialize the project. We'll use the `pulumi new` command to create a new project. We'll call the project `aws-py-hub-and-spoke` and we'll use the `aws-py-virtualenv` template. This template will create a virtual environment for us and install the necessary dependencies for our project.

```bash
mkdir aws-py-hub-and-spoke
cd aws-py-hub-and-spoke
pulumi new python --name aws-py-hub-and-spoke --stack dev --description "A hub-and-spoke network architecture in AWS with centralized egress"
```

We'll also need to add a dependency to our project. We'll use the `pulumi_aws` package to create our AWS resources. We'll later use the `pulumi_awsx` package to create our VPCs. Add the following to your `requirements.txt` file:

```bash
pulumi_aws>=5.0.0,<6.0.0
```

And install your requirements:

```bash
pip install -r requirements.txt
```

## Creating the First Transit Gateway Resources

Now we can add the resources relating to our Transit Gateway.

First, we'll need to retrieve a configuration value for the CIDR block of the supernet we'll use for our VPCs. We'll use this value to create our VPCs later. We'll also use this value to create a route in our transit gateway routing table that will allow traffic from our spoke VPCs to the internet.

We'll also grab the current name of our project from Pulumi. We'll use this value to name some of our resources:

```python
config = pulumi.Config()
supernet_cidr = config.get("supernet-cidr") or "10.0.0.0/8"

project = pulumi.get_project()
```

Now we can add some of our initial Transit Gateway resources. We'll start with the Transit Gateway itself. We'll also create route tables for both our inspection and spoke VPCs. We'll add routes to this route table later to allow traffic from our spoke VPCs to the internet, as well as routes from the internet back to the originating spoke VPC:

```python
tgw = aws.ec2transitgateway.TransitGateway(
    "tgw",
    aws.ec2transitgateway.TransitGatewayArgs(
        description=f"Transit Gateway - {project}",
        default_route_table_association="disable",
        default_route_table_propagation="disable",
        tags={
            "Name": "Pulumi"
        }
    )
)

inspection_tgw_route_table = aws.ec2transitgateway.RouteTable(
    "post-inspection-tgw-route-table",
    aws.ec2transitgateway.RouteTableArgs(
        transit_gateway_id=tgw.id,
        tags={
            "Name": "post-inspection",
        }
    ),
    # Adding the TGW as the parent makes the output of `pulumi up` a little
    # easier to understand as it groups these resources visually under the TGW
    # on which they depend.
    opts=pulumi.ResourceOptions(
        parent=tgw,
    ),
)

spoke_tgw_route_table = aws.ec2transitgateway.RouteTable(
    "spoke-tgw-route-table",
    aws.ec2transitgateway.RouteTableArgs(
        transit_gateway_id=tgw.id,
        tags={
            "Name": "spoke-tgw",
        }
    ),
    opts=pulumi.ResourceOptions(
        parent=tgw,
    ),
)
```

## Deploying our Pulumi Resources

Now that we’ve created our Pulumi project, we can deploy it. We’ll use the `pulumi up` command to deploy our resources.

```bash
pulumi up
```

This will deploy our resources to AWS.

## Next Steps

Stay tuned for additional posts in this series!

* In the next post in this series, we’ll create our hub VPC.
* In the following post, we’ll create our spoke VPCs and verify connectivity.
* In the final post, we’ll add in AWS Firewall to our hub VPC in order to add centralized inspection of network traffic going to the internet.
