FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3000

RUN export NODE_OPTIONS=--openssl-legacy-provider;

RUN npm run build

RUN npm i -g serve

ENTRYPOINT [ "serve", "-s", "build" ]
