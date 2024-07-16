import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

import { SMTPProvider } from './providers/smtp';
import { FirebaseConnection } from './connections/firebase';
import { MongodbConnection } from './connections/mongodb';
import { Repository } from './repositories/repository';
import { models } from './config/models';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: 'MAIL',
      useClass: SMTPProvider,
    },
    FirebaseConnection,
    MongodbConnection,
    PrismaClient,
    ...models.map(entity => ({
      provide: entity,
      useFactory: (prisma: PrismaClient) => new Repository(prisma, entity),
      inject: [PrismaClient],
    })),
  ],
  exports: [
    {
      provide: 'MAIL',
      useClass: SMTPProvider,
    },
    FirebaseConnection,
    MongodbConnection,
    PrismaClient,
    ...models.map(entity => ({
      provide: entity,
      useFactory: (prisma: PrismaClient) => new Repository(prisma, entity),
      inject: [PrismaClient],
    })),
  ],
})
export class Infraestructure {}
