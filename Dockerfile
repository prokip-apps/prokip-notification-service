FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

COPY start.sh start.sh


RUN npm install glob rimraf --legacy-peer-deps
RUN npm install  --legacy-peer-deps

COPY . .
RUN npm run build

CMD ["node", "dist/src/main"]