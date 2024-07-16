import { Global, Module } from '@nestjs/common';

import { MailGRPCController } from './controllers/mail-grpc';
import { MailQueueController } from './controllers/mail-queue';
import { PushGRPCController } from './controllers/push-grpc';
import { PushQueueController } from './controllers/push-queue';
import { MailHttpController } from './controllers/mail-http';

@Global()
@Module({
  controllers: [
    MailHttpController,
    MailGRPCController,
    MailQueueController,
    PushGRPCController,
    PushQueueController,
  ],
})
export class Presentation {}
