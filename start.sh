#!/bin/sh

set -e

# Execute migrations.
yarn run github-app:orm:migrate:deploy

# Start the application.
yarn run github-app:prod