package main

import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		// Create a Pulumi Config
		config := pulumi.NewConfig(ctx)

		// Retrieve the value of "myEnvironment" from the Pulumi Config
		myValue := config.Get("myEnvironment")

		// Export "myValue" as a stack output named 'value'
		ctx.Export("value", pulumi.String(myValue))
		return nil
	})
}
