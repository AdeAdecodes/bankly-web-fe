#!/usr/bin/env bash

set -e
set -o pipefail
# Update nginx config and start it if not on local environment
echo ">>Copying nginx configuration..."
if [ -d "/etc/nginx/conf.d" ]; then
    cat "$WORKING_DIR/$APP_WORKSPACE/arch/nginx/conf.d/$APP_ENV.conf" > /etc/nginx/conf.d/default.conf
else
    cat "$WORKING_DIR/$APP_WORKSPACE/arch/nginx/conf.d/$APP_ENV.conf" > /etc/nginx/http.d/default.conf
fi
echo ">>Starting nginx..."
nginx || exit 1;

if [ "$APP_ENV" != "local" ]; then
  # Copy environment file
  if [ "$APP_ENV" == "production" ]; then
    cp ".env.prod" ".env"
  else
    cp ".env.$APP_ENV" ".env"
  fi
fi
