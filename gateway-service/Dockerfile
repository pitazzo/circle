FROM node:14 AS builder

ENV PORT=3000
ARG RABBITMQ_URL

WORKDIR /app/circle-core
RUN npm install -g rexreplace typescript javascript-obfuscator
COPY ./circle-core .
RUN rr RABBITMQ_URL $RABBITMQ_URL ./src/infraestructure/amqp-service/amqp-service.ts
RUN npm install && tsc
RUN javascript-obfuscator dist --output obfuscated && rm -rf dist && mv obfuscated/dist .

WORKDIR /app/gateway-service
COPY ./gateway-service .
RUN rr RABBITMQ_URL $RABBITMQ_URL ./src/core/infraestructure/operation-bus/operation-bus.ts
RUN npm install
RUN npm run build
RUN javascript-obfuscator dist --output obfuscated && rm -rf dist && mv obfuscated/dist .


FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/gateway-service/dist ./gateway-service/dist
COPY --from=builder /app/gateway-service/package.json ./gateway-service/package.json
COPY --from=builder /app/gateway-service/node_modules ./gateway-service/node_modules
COPY --from=builder /app/circle-core/node_modules ./circle-core/node_modules
COPY --from=builder /app/circle-core/package.json ./circle-core/package.json
COPY --from=builder /app/circle-core/dist ./circle-core/dist
COPY --from=builder /app/gateway-service/.env ./gateway-service/.env
COPY --from=builder /app/gateway-service/src/core/schema.graphql ./gateway-service/src/core/schema.graphql

EXPOSE $PORT

WORKDIR /app/gateway-service
CMD ["npm", "run", "start:prod"]