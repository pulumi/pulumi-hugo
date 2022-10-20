using System.Collections.Generic;
using Pulumi;
using Aws = Pulumi.Aws;
using Eks = Pulumi.Eks;

return await Deployment.RunAsync(() => 
{
    var vpcId = Aws.Ec2.GetVpc.Invoke(new()
    {
        Default = true,
    }).Apply(invoke => invoke.Id);

    var subnetIds = Aws.Ec2.GetSubnetIds.Invoke(new()
    {
        VpcId = vpcId,
    }).Apply(invoke => invoke.Ids);

    var cluster = new Eks.Cluster("cluster", new()
    {
        VpcId = vpcId,
        SubnetIds = subnetIds,
        InstanceType = "t2.medium",
        DesiredCapacity = 2,
        MinSize = 1,
        MaxSize = 2,
    });

    return new Dictionary<string, object?>
    {
        ["kubeconfig"] = cluster.Kubeconfig,
    };
});

