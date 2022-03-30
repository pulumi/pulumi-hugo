module github.com/pulumi/pulumi-hugo

go 1.16

require (
	github.com/pulumi/pulumi-hugo/themes/default v0.0.0-20211008162151-6e65a2068c3b // indirect
	github.com/pulumi/registry/themes/default v0.0.0-20220329192255-4a84db38d088 // indirect
	github.com/pulumi/theme v0.0.0-20220329235758-e5c2768a36a1 // indirect
)

replace github.com/pulumi/pulumi-hugo/themes/default => ./themes/default
replace github.com/pulumi/theme => ../theme
