#!/usr/bin/env bash
set -e

cd $(dirname $0)

target_host=${1:?"error: missing first parameter HOST"}

DOCKER_HOST="ssh://$target_host" COMPOSE_DOCKER_CLI_BUILD=0 docker-compose up -d
