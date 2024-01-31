package myproject;

import com.pulumi.Pulumi;
import com.pulumi.core.Output;
import com.pulumi.core.Config;

public class Main {
    public static void main(String[] args) {
        Pulumi.run(ctx -> {
            // Create a Pulumi Config
            var config = new Config();

            // Retrieve the value of "myEnvironment" from the Pulumi Config
            String myEnvironment = config.require("myEnvironment");

            // Export "myEnvironment" as a stack output named 'value'
            ctx.export("value", Output.of(myEnvironment));
        });
    }
}
