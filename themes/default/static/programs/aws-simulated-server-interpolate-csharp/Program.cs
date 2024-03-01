using System.Collections.Generic;
using Pulumi;

return await Deployment.RunAsync(() =>
{
    var webServer = Output.Create(new
    {
        hostName = "www.mywebserver.com",
        port = "8080",
    });

    // Format takes a FormattableString and expands outputs correctly:
    var url = Output.Format($"http://{webServer.hostName}:{webServer.port}/");

    return new Dictionary<string, object?>
    {
        ["serverUrl"] = url,
    };
});