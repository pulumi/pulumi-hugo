#!/bin/bash

set -o errexit -o pipefail

source ./scripts/common.sh

# Just run Hugo.
hugo serve --buildDrafts --buildFuture --bind 0.0.0.0 | grep -v -e 'WARN .* REF_NOT_FOUND'
