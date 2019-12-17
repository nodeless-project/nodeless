FROM node:10-slim as builder

WORKDIR /builder
COPY . .
RUN yarn

FROM node:10-slim 

WORKDIR /manager
COPY --from=builder /builder/node_modules ./node_modules
COPY --from=builder /builder/packages/manager/dist .
RUN node ./server.js