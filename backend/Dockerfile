FROM node:alpine

WORKDIR /server

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
