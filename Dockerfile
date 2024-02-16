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

COPY . .

EXPOSE 3000
CMD ["node", "apps/api/dist/app.js"]