#!/bin/bash

set -o errexit -o pipefail

source ./scripts/common.sh

if [ "$1" == "all" ]; then

    # Run Hugo and the theme watchers concurrently.
    yarn run concurrently --raw --kill-others \
        "yarn --cwd themes/current watch" \
        "hugo serve --buildDrafts --buildFuture | grep -v -e 'WARN .* REF_NOT_FOUND'"
    exit
fi

# Just run Hugo.
hugo serve --buildDrafts --buildFuture | grep -v -e 'WARN .* REF_NOT_FOUND'
