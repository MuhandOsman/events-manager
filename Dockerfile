FROM node:17.8.0-stretch-slim

COPY ./ /project

WORKDIR /project
RUN npm install

WORKDIR /project/frontend
RUN npm install

RUN mkdir ../app \
    && npm run deploy

WORKDIR /project
RUN rm -rf frontend
