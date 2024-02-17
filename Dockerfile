FROM node:18

# Create app directory
WORKDIR /usr/src/habitica

COPY tsconfig.json ./
COPY package.json ./
COPY yarn.lock ./
COPY apps ./apps
COPY packages ./packages

RUN yarn --frozen-lockfile
RUN yarn run api:build
RUN yarn run github-app:build

COPY . .

EXPOSE 3000
CMD ["node", "apps/github-app/dist/app.js"]