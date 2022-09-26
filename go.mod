module github.com/pulumi/pulumi-hugo

go 1.16

require (
	github.com/pulumi/pulumi-hugo/themes/default v0.0.0-20220504042409-82f5a4588c0e // indirect
	github.com/pulumi/registry/themes/default v0.0.0-20220926193136-890857d15c62 // indirect
	github.com/pulumi/theme v0.0.0-20220926184221-15ea0f62e813 // indirect
)

replace github.com/pulumi/pulumi-hugo/themes/default => ./themes/default
