FROM node:8-stretch

MAINTAINER Alexey Kudryashov <akud.soft@gmail.com>

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

RUN apt-get update && \
    apt-get -y install chromium

RUN npm install -g pm2

COPY src/ /app/src
COPY package.json /app
COPY package-lock.json /app
COPY tsconfig.json /app

WORKDIR /app

RUN npm install
RUN npm run build
RUN rm -rf ./src

RUN mkdir -p /usr/share/fonts
COPY docker/fonts/ /usr/share/fonts
RUN fc-cache -v

COPY docker/pm2.config.js /

CMD ["pm2", "start", "--no-daemon", "/pm2.config.js"]
EXPOSE 3022
