#!/bin/bash

set -o errexit -o pipefail

type=""
template=""

content_dir="themes/default/content"

prompt_for_type_name() {
    read -p "Template type (e.g., static-website): " type

    if [ ! -z "$type" ]; then
        hugo new --kind templates/type --contentDir "${content_dir}" "templates/${type}"
        return
    fi

    echo "Please give the type a name."
    prompt_for_type_name
}

prompt_for_template_name() {
    read -p "Template name (e.g., aws): " template

    if [ ! -z "$template" ]; then
        hugo new --kind templates/template --contentDir "${content_dir}" "templates/${type}/${template}"
        return
    fi

    echo "Please give the template a name."
    prompt_for_template_name
}

echo "So, you want to make a new Pulumi template type? Awesome! 🙌"
echo
echo "Step 1:"
echo "First, give the template type a URL- and SEO-friendly name.
For example, to create a new template type that'll live at
https://pulumi.com/templates/static-website, type 'static-website'."
echo
prompt_for_type_name

echo
echo "Step 2:"
echo "Now give your new template type at least one new template, also expressed
as a URL-friendly name. For example, to create a new template under ${type}
that'll live at https://pulumi.com/templates/${type}/aws, type 'aws'."
echo
prompt_for_template_name
