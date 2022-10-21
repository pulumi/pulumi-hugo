module github.com/pulumi/pulumi-hugo

go 1.16

require (
	github.com/pulumi/pulumi-hugo/themes/default v0.0.0-20220504042409-82f5a4588c0e // indirect
	github.com/pulumi/registry/themes/default v0.0.0-20221021143348-92f7d92e40e1 // indirect
	github.com/pulumi/theme v0.0.0-20221010181218-f9f57adc2043 // indirect
)

replace github.com/pulumi/pulumi-hugo/themes/default => ./themes/default
