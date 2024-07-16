import { writeFileSync } from 'fs';
import { resolve } from 'path';

import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { ConfigService } from '@nestjs/config';

import { FirebaseConnection } from './infraestructure/connections/firebase';
import { MongodbConnection } from './infraestructure/connections/mongodb';
import { App } from './app';

const logger = new Logger(bootstrap.name);

async function bootstrap() {
  process.env.TZ = 'UTC';
  const app = await NestFactory.create(App, {
    cors: true,
    snapshot: true,
    forceCloseConnections: true,
    abortOnError: false,
  });

  app.get(MongodbConnection, { strict: false });
  app.get(FirebaseConnection, { strict: false });
  app.enableShutdownHooks();

  const config_service = app.get(ConfigService);
  const MAIL_SERVICE_PORT = config_service.get('MAIL_SERVICE_PORT');
  const PUSH_SERVICE_PORT = config_service.get('PUSH_SERVICE_PORT');

  const credentials = grpc.ServerCredentials.createSsl(
    Buffer.from(process.env.TLS_CA, 'utf8'),
    [
      {
        cert_chain: Buffer.from(process.env.TLS_CERT, 'utf8'),
        private_key: Buffer.from(process.env.TLS_KEY, 'utf8'),
      },
    ],
    true,
  );

  const TLS_ENABLE = credentials._isSecure();

  await NestFactory.createMicroservice<MicroserviceOptions>(App, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'notification',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'mail',
      protoPath: resolve('src/infraestructure/protos/mail.proto'),
      url: `0.0.0.0:${MAIL_SERVICE_PORT}`,
      gracefulShutdown: true,
      credentials,
      loader: {
        keepCase: true,
        defaults: true,
        json: true,
        arrays: true,
      },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'push',
      protoPath: resolve('src/infraestructure/protos/push.proto'),
      url: `0.0.0.0:${PUSH_SERVICE_PORT}`,
      gracefulShutdown: true,
      credentials,
      loader: {
        keepCase: true,
        defaults: true,
        json: true,
        arrays: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.init();
  await app.listen(3004);

  async function gracefulShutdown(signal: NodeJS.Signals) {
    await app.close();
    process.kill(process.pid, signal);
  }

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);

  return {
    PUSH_SERVICE_PORT,
    MAIL_SERVICE_PORT,
    TLS_ENABLE,
  };
}
bootstrap()
  .then(({ PUSH_SERVICE_PORT, MAIL_SERVICE_PORT, TLS_ENABLE }) => {
    logger.log(`
    [PUSH] ${PUSH_SERVICE_PORT}
    [NOTIFICATION] ${MAIL_SERVICE_PORT}
    [TLS] ${TLS_ENABLE}
    `);
  })
  .catch(err => {
    logger.error(err);
    writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
    process.exit(1);
  });
