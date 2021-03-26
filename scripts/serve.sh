#!/bin/bash

set -o errexit -o pipefail

source ./scripts/common.sh

# Run an initial asset build if one hasn't been already.
pushd themes/current
    if ! test -f "${CSS_BUNDLE}" || ! test -f "${JS_BUNDLE}"; then
        echo "Running an initial build..."
        yarn run ensure
        yarn run build
    fi
popd

if [ "$1" == "all" ]; then

    # Run Hugo and the theme watchers concurrently.
    yarn run concurrently --raw --kill-others \
        "yarn --cwd themes/current watch" \
        "hugo serve --buildDrafts --buildFuture | grep -v -e 'WARN .* REF_NOT_FOUND'"
    exit
fi

# Just run Hugo.
hugo serve --buildDrafts --buildFuture | grep -v -e 'WARN .* REF_NOT_FOUND'
