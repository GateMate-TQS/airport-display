FROM node:21-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8086

CMD [ "npm", "run", "dev" ]