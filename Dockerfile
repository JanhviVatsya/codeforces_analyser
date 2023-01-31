FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 8080

CMD ["npm", "serve"]
