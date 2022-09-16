#!/bin/bash

set -o errexit -o pipefail

type=""
template=""
content_dir="themes/default/content"

prompt_for_type_name() {
    read -p "Template type (e.g., static-website): " type

    if [[ ! -z "$type" && -d "${content_dir}/templates/${type}" ]]; then
        return
    fi

    echo "Couldn't find a template type with that name. Make sure you're using the path as listed under content/templates."
    echo
    prompt_for_type_name
}

prompt_for_template_name() {
    read -p "Template name (e.g., azure): " template

    if [ ! -z "$template" ]; then
        hugo new --kind templates/template --contentDir "${content_dir}" "templates/${type}/${template}"
        return
    fi

    echo "Please give the template a name."
    echo
    prompt_for_template_name
}

echo "So, you want to make a new Pulumi template? Great! 🙌"
echo
echo "Step 1:"
echo "What is the path name of the template type you want to write for?"
echo
prompt_for_type_name

echo
echo "Step 2:"
echo "Now give your new template a URL-friendly name. For example, to
create a new template under ${type} that'll live at
https://pulumi.com/templates/${type}/azure, type 'azure'."
echo
prompt_for_template_name
