FROM node:13.12.0-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

ADD . /app/src
WORKDIR /app/src

CMD ["npm", "start"]