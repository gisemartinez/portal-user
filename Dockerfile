FROM node:latest

ENV HOME=/usr/src/app
ENV CACHE=/usr/src/cache

RUN mkdir -p $CACHE
WORKDIR $CACHE

COPY package.json ./
#COPY package-lock.json ./
RUN npm install -g @angular/cli
RUN npm install -g nodemon
RUN npm install

RUN mkdir -p $HOME
WORKDIR $HOME


