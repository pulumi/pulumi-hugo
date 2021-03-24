#!/bin/bash

set -o errexit -o pipefail

source ./scripts/common.sh

yarn --cwd themes/${HUGO_THEME} run build

hugo | grep -v -e 'WARN .* REF_NOT_FOUND'
