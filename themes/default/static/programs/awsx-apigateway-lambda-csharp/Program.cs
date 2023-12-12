using System.Collections.Generic;
using System.Text.Json;
using Pulumi;
using Aws = Pulumi.Aws;
using AwsApiGateway = Pulumi.AwsApiGateway;

return await Deployment.RunAsync(() =>
{
    var role = new Aws.Iam.Role("role", new()
    {
        AssumeRolePolicy = JsonSerializer.Serialize(new Dictionary<string, object?>
        {
            ["Version"] = "2012-10-17",
            ["Statement"] = new[]
            {
                new Dictionary<string, object?>
                {
                    ["Action"] = "sts:AssumeRole",
                    ["Effect"] = "Allow",
                    ["Principal"] = new Dictionary<string, object?>
                    {
                        ["Service"] = "lambda.amazonaws.com",
                    },
                },
            },
        }),
        ManagedPolicyArns = new[]
        {
            Aws.Iam.ManagedPolicy.AWSLambdaBasicExecutionRole.ToString(),
        },
    });

    var handler = new Aws.Lambda.Function("handler", new()
    {
        Runtime = "python3.9",
        Handler = "handler.handler",
        Role = role.Arn,
        Code = new FileArchive("./function"),
    });

    var api = new AwsApiGateway.RestAPI("api", new()
    {
        Routes =
        {
            new AwsApiGateway.Inputs.RouteArgs
            {
                Path = "/",
                Method = AwsApiGateway.Method.GET,
                EventHandler = handler,
            },
        },
    });

    return new Dictionary<string, object?>
    {
        ["url"] = api.Url,
    };
});
