ARG BASE_IMAGE="node:18.16.0-alpine"

# --- START: base stage ---
FROM $BASE_IMAGE as base

RUN apk update \
 && apk upgrade \
 && apk add bash \
 && apk add git

RUN npm install -g pnpm@7.26.3

# --- START: Production Deps stage ---
FROM base as prod-deps
WORKDIR /app

COPY package.json pnpm-lock.yaml /app/

RUN pnpm install --frozen-lockfile --no-optional --prod


# --- START: dev-deps stage ---
FROM base as dev-deps
WORKDIR /app

COPY package.json pnpm-lock.yaml /app/

RUN pnpm install --frozen-lockfile --no-optional


# --- START: build stage ---
FROM dev-deps as build
WORKDIR /app

COPY src nest-cli.json tsconfig.build.json tsconfig.json /app/

RUN pnpm build


# --- START: local-dev-deps stage
FROM base as local-dev-deps
WORKDIR /app

COPY package.json pnpm-lock.yaml /app/

RUN pnpm add ts-node-dev typescript


# --- START: local-dev stage
FROM local-dev-deps as local-dev
WORKDIR /app

COPY src /app/src
COPY tsconfig.json tsconfig.build.json /app/
COPY --from=dev-deps /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/dist /app/dist


# --- START: prod stage
FROM base as prod
WORKDIR /app
USER node

COPY --chown=node:node --from=prod-deps /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/dist /app/dist
