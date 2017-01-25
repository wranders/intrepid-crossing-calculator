FROM node:latest

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g typescript@2.1.1 &&\
    npm install &&\
    tsc -p . &&\
    cd /usr/src/app/static &&\
    npm install &&\
    npm run build

ENTRYPOINT ["node", "./dist/index.js"]

