module github.com/pulumi/pulumi-hugo

go 1.16

require (
	github.com/pulumi/pulumi-hugo/themes/default v0.0.0-20211008162151-6e65a2068c3b // indirect
	github.com/pulumi/registry/themes/default v0.0.0-20220404223218-6dbf1e2a28b2 // indirect
	github.com/pulumi/theme v0.0.0-20220412215911-9901ee008042 // indirect
)

replace github.com/pulumi/pulumi-hugo/themes/default => ./themes/default
