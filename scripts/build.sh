#!/bin/bash

set -o errexit -o pipefail

source ./scripts/common.sh

hugo -v | grep -v -e 'WARN .* REF_NOT_FOUND'
