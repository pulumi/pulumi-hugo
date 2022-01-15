#!/bin/bash

set -o errexit -o pipefail

yarn cache clean
hugo mod clean

rm -rf _vendor
rm -rf public
rm -rf node_modules
