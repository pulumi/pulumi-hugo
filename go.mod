module github.com/pulumi/pulumi-hugo

go 1.16

require (
	github.com/pulumi/pulumi-hugo/themes/default v0.0.0-20220504042409-82f5a4588c0e // indirect
	github.com/pulumi/registry/themes/default v0.0.0-20220727180140-2bea563ce6fe // indirect
	github.com/pulumi/theme v0.0.0-20220718223616-5931968f24dc // indirect
)

replace github.com/pulumi/pulumi-hugo/themes/default => ./themes/default
