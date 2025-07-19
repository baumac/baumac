ARG BASE_IMAGE="node:22.9.0-alpine"

# --- START: base stage ---
FROM $BASE_IMAGE AS base

RUN apk update \
 && apk upgrade \
 && apk add bash \
 && apk add git

# --- START: dev-deps stage ---
FROM base AS dev-deps
WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn --frozen-lockfile --ignore-optional


# --- START: build stage ---
FROM dev-deps AS build
WORKDIR /app

COPY nest-cli.json tsconfig.build.json tsconfig.json /app/
COPY src /app/src/

RUN yarn build


# --- START: Production Deps stage ---
FROM base AS prod-deps
WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn --frozen-lockfile --ignore-optional --production


# --- START: prod stage
FROM base AS prod
WORKDIR /app
ENV NODE_ENV=production

USER node

COPY --chown=node:node --from=prod-deps /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/dist /app/dist