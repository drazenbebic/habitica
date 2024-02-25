#!/bin/sh

set -e

# Execute pending migrations
# yarn run github-app:orm:migrate:deploy

# Force-reset the database
yarn run github-app:orm:migrate:reset:force

# Start the application
yarn run github-app:prod