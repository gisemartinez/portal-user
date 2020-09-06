FROM node:10.16.3

ENV HOME=/usr/src/app
ENV CACHE=/usr/src/cache

RUN mkdir -p $CACHE
WORKDIR $CACHE

COPY package.json ./
COPY package-lock.json ./
RUN npm install -g @angular/cli@10.0.6
RUN npm install -g typescript@3.9.7
RUN npm install -g nodemon@2.0.4
RUN npm install --save-dev sequelize-cli
RUN npm install  --unsafe-perm
RUN mkdir -p $HOME
WORKDIR $HOME


