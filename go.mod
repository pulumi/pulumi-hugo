module github.com/pulumi/pulumi-hugo

go 1.16

require (
	github.com/pulumi/pulumi-hugo/themes/default v0.0.0-20220504042409-82f5a4588c0e // indirect
	github.com/pulumi/registry/themes/default v0.0.0-20221107230539-cd0a8f6c5c99 // indirect
	github.com/pulumi/theme v0.0.0-20221104184435-ce74208a76f8 // indirect
)

replace github.com/pulumi/pulumi-hugo/themes/default => ./themes/default
