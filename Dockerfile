FROM node:18

# Create app directory
WORKDIR /usr/src/habitica

# Copy necessary files
COPY tsconfig.json ./
COPY package.json ./
COPY yarn.lock ./
COPY apps ./apps
COPY packages ./packages

# Install dependencies and build
RUN yarn --frozen-lockfile
RUN yarn run core:build
RUN yarn run github-app:build

# Copy the shell script for migrations
COPY . .

# Expose port
EXPOSE 3000

# Run Migrations
RUN yarn run github-app:orm:migrate:deploy

# Start the application
RUN yarn run github-app:prod