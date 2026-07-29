#!/usr/bin/env bash
cd "$HOME/web"
# Remove running container if any
docker-compose -f "docker-compose-${DEPLOY_ENV}.yml" -p "${DEPLOY_ENV}_web" down
# Bring up the container
docker-compose -f "docker-compose-${DEPLOY_ENV}.yml" -p "${DEPLOY_ENV}_web" up -d
