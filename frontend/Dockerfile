FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3000

RUN export NODE_OPTIONS=--openssl-legacy-provider;

ENTRYPOINT [ "npm", "run", "start" ]
