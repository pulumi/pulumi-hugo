module github.com/pulumi/pulumi-hugo

go 1.16

replace github.com/pulumi/pulumi-hugo/themes/default => ./themes/default

replace github.com/pulumi/theme => ../theme

require (
	github.com/pulumi/pulumi-hugo/themes/default v0.0.0-20220926233650-4b6ab10961c1 // indirect
	github.com/pulumi/registry/themes/default v0.0.0-20220926193136-890857d15c62 // indirect
	github.com/pulumi/theme v0.0.0-20220926184220-75694243eaa2 // indirect
)
