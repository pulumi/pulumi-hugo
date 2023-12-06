"use strict";
const awsx = require("@pulumi/awsx");

// Allocate a new VPC with a custom CIDR block.
const vpc = new awsx.ec2.Vpc("vpc", {
    numberOfAvailabilityZones: 4,
});

exports.vpcId = vpc.vpcId;
