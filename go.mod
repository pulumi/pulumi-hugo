module github.com/pulumi/pulumi-hugo

go 1.16

require (
	github.com/pulumi/pulumi-hugo/themes/default v0.0.0-20211008162151-6e65a2068c3b // indirect
	github.com/pulumi/registry/themes/default v0.0.0-20220322220219-ec5c2ed535f3 // indirect
	github.com/pulumi/theme v0.0.0-20220324233152-acae674443db // indirect
)

replace github.com/pulumi/pulumi-hugo/themes/default => ./themes/default
