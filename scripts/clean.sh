#!/bin/bash

set -o errexit -o pipefail

yarn cache clean
hugo mod clean

for dir in themes/* ; do
    pushd $dir
        hugo mod clean
        rm -rf resources
    popd
done

rm -rf _vendor
rm -rf public
rm -rf node_modules
rm -rf themes/default/_vendor
rm -rf themes/default/node_modules
rm -rf themes/default/static/js
rm -rf themes/default/static/css
rm -rf themes/default/components/node_modules
rm -rf themes/default/components/dist
rm -rf themes/default/components/www
