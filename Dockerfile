FROM node:slim

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN yarn global add typescript@2.1.1 &&\
    yarn &&\ 
    tsc -p .
RUN cd /usr/src/app/static &&\
    yarn &&\
    yarn build

ENTRYPOINT ["node", "./dist/index.js"]

