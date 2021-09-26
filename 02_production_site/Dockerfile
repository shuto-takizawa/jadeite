FROM node:14-alpine3.11

RUN apk update && \
    apk add --no-cache \
    vim \
    sudo \
    python \
    make \
    g++

RUN yarn global add firebase-tools
