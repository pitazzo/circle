FROM node:14 AS builder

ARG RABBITMQ_URL
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_DATABASE

WORKDIR /app/circle-core
RUN npm install -g rexreplace typescript javascript-obfuscator
COPY ./circle-core .
RUN rr RABBITMQ_URL $RABBITMQ_URL ./src/infraestructure/amqp-service/amqp-service.ts
RUN npm install && tsc
RUN javascript-obfuscator dist --output obfuscated && rm -rf dist && mv obfuscated/dist .


WORKDIR /app/notifications-service
COPY ./notifications-service .
RUN rr DB_HOST $DB_HOST ./src/app.module.ts && rr DB_PORT $DB_PORT ./src/app.module.ts && rr DB_USER $DB_USER ./src/app.module.ts && rr DB_PASSWORD $DB_PASSWORD ./src/app.module.ts && rr DB_DATABASE $DB_DATABASE ./src/app.module.ts
RUN npm install
RUN npm run build
RUN javascript-obfuscator dist --output obfuscated && rm -rf dist && mv obfuscated/dist .


FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/notifications-service/dist ./notifications-service/dist
COPY --from=builder /app/notifications-service/package.json ./notifications-service/package.json
COPY --from=builder /app/notifications-service/node_modules ./notifications-service/node_modules
COPY --from=builder /app/circle-core/node_modules ./circle-core/node_modules
COPY --from=builder /app/circle-core/package.json ./circle-core/package.json
COPY --from=builder /app/circle-core/dist ./circle-core/dist
COPY --from=builder /app/notifications-service/.env ./notifications-service/.env
WORKDIR /app/notifications-service
CMD ["npm", "run", "start:prod"]