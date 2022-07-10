module github.com/pulumi/pulumi-hugo

go 1.16

require (
	github.com/pulumi/pulumi-hugo/themes/default v0.0.0-20220708163956-c280f8233e1c // indirect
	github.com/pulumi/registry/themes/default v0.0.0-20220708214552-e7da6c59900e // indirect
	github.com/pulumi/theme v0.0.0-20220710025324-6d1855c4756e
)

replace github.com/pulumi/pulumi-hugo/themes/default => ./themes/default
