#!/usr/bin/env bash
cd "$HOME/app"
# Remove running container if any
docker-compose -f "docker-compose-prod.yml" -p "production_app" down
# Bring up the container
docker-compose -f "docker-compose-prod.yml" -p "production_app" up -d
