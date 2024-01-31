using Pulumi;

class MyStack : Stack
{
    public MyStack()
    {
        // Import the configuration values
        var config = new Config();

        // Retrieve the value of "myEnvironment"
        var myValue = config.Get("myEnvironment");

        // Export the value as an output
        this.Export("Value", myValue);
    }
}

class Program
{
    static Task<int> Main(string[] args) => Deployment.RunAsync<MyStack>();
}
