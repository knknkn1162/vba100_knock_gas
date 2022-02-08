FROM node:17.4

RUN apt-get update
RUN npm install -g @google/clasp

WORKDIR /app
