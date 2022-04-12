module github.com/pulumi/pulumi-hugo

go 1.16

require (
	github.com/pulumi/pulumi-hugo/themes/default v0.0.0-20211008162151-6e65a2068c3b // indirect
	github.com/pulumi/registry/themes/default v0.0.0-20220411233244-e72ef3c7a682 // indirect
	github.com/pulumi/theme v0.0.0-20220412172228-fcca8dc2b115 // indirect
)

replace github.com/pulumi/pulumi-hugo/themes/default => ./themes/default

replace github.com/pulumi/theme => ../theme
