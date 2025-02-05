ARG NODE_VERSION=16.15.0-alpine
FROM node:$NODE_VERSION as base

RUN apk add --no-cache \
        curl \
        bash \
        git

# Set app working directory
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy required application files
COPY . .

ARG NX_BASE=$NX_BASE
ARG NX_HEAD=$NX_HEAD
