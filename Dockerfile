FROM node:16

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn frontend

EXPOSE 8080

CMD [ "yarn",  "start" ]
