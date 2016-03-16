FROM node:4-onbuild
MAINTAINER <detailyang@gmail.com>

ENV NODE_ENV dev

RUN mkdir -p /data/cas
WORKDIR /data/cas

ADD package.json /data/cas.package.json

RUN npm install --global

CMD ["node", "babel.index.js"]
