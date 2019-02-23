FROM node:10.15.1

WORKDIR /scraper

COPY . .

WORKDIR js

RUN npm i

ENTRYPOINT node scrape.js
