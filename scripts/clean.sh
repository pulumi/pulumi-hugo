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
rm -rf themes/current/_vendor
rm -rf themes/current/node_modules
rm -rf themes/current/static/js
rm -rf themes/current/static/css
rm -rf themes/current/components/node_modules
rm -rf themes/current/components/dist
rm -rf themes/current/components/www
