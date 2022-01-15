#!/bin/bash

image_name="pulumi-hugo-docker"

docker build . -t "$image_name"
docker run -it --rm -v "$(pwd):/pulumi-hugo" -p 1313:1313 "$image_name" make serve
docker image rm "$image_name"
