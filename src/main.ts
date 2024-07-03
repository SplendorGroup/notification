import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { App } from './app';
import { Logger } from '@nestjs/common';
import { writeFileSync } from 'fs';

const logger = new Logger(bootstrap.name);

async function bootstrap() {
  process.env.TZ = 'UTC';
  const app = await NestFactory.create(App, {
    cors: true,
    snapshot: true,
    forceCloseConnections: true,
    abortOnError: false,
  });

  app.enableShutdownHooks();
  
  await app.startAllMicroservices();
  await app.init();
  await app.listen(3000);

  async function gracefulShutdown(signal: NodeJS.Signals) {
    await app.close();
    process.kill(process.pid, signal);
  }

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
}
bootstrap().then(() => {
  logger.log('Running in port 3000')
}).catch((err) => {
  logger.error(err);
  writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
  process.exit(1);
});

