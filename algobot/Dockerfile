FROM node:10.15.1

WORKDIR /slackbots

COPY . .

WORKDIR js

RUN npm i

ENTRYPOINT node bot.js
