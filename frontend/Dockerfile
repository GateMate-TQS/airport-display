FROM node:21-alpine

WORKDIR /airport-display/frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8086

CMD [ "npm", "run", "dev" ]