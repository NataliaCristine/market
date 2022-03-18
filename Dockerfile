FROM node:17

WORKDIR  /code

COPY . /code/

RUN yarn


EXPOSE 3000