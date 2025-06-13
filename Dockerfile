ARG NODE_VERSION=node:20.16.0

ARG ALPINE_VERSION=alpine3.20

FROM ${NODE_VERSION}-${ALPINE_VERSION} AS base

WORKDIR /home/node/app

RUN npm install -g npm@10.8.2

RUN apk --no-cache add curl

# Development image
FROM base AS development

RUN apk add bash

USER node

# Builder image
FROM base AS builder

COPY --chown=node:node . .

RUN npm install

# Production image
# FROM base AS production

# RUN chown -R node:node .

# COPY --chown=node:node package*.json ./
# COPY --chown=node:node --from=builder /home/node/app/dist ./dist

# USER node

# ENV NODE_ENV production
# RUN npm install --omit=dev

# EXPOSE 7010

# CMD npm run start:prod