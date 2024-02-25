FROM node:18

# Create app directory
WORKDIR /usr/src/habitica

# Copy necessary files
COPY tsconfig.json ./
COPY package.json ./
COPY yarn.lock ./
COPY apps ./apps
COPY packages ./packages
COPY start.sh ./

# Install dependencies and build
RUN yarn --frozen-lockfile
RUN yarn run core:build
RUN yarn run github-app:build

# Copy the files
COPY . .

# Expose port
EXPOSE 3100

# Make the script executable
RUN chmod +x start.sh

# Migrate & start the application
CMD ["./start.sh"]
