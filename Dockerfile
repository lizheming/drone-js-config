FROM node:lts-alpine

WORKDIR /app

COPY ./package.json /app
RUN npm install --production

COPY ./ /app

ENTRYPOINT [ "node", "production.js" ]