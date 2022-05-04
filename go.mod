module github.com/pulumi/pulumi-hugo

go 1.16

require (
	github.com/pulumi/pulumi-hugo/themes/default v0.0.0-20220504042409-82f5a4588c0e // indirect
	github.com/pulumi/registry/themes/default v0.0.0-20220504053918-cbbe404a06c1 // indirect
	github.com/pulumi/theme v0.0.0-20220504191305-158df7237207 // indirect
)

replace github.com/pulumi/pulumi-hugo/themes/default => ./themes/default
