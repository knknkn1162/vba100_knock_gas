FROM node:17.4

RUN apt-get update
RUN apt-get install -y jq
RUN npm install -g @google/clasp

WORKDIR /app
