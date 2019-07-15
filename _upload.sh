#!/usr/bin/env bash

docker save bargarn-pdf:latest | bzip2 | pv | ssh akud@52.169.181.67 'bunzip2 | docker load'
