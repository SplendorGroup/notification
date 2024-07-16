import { Global, Module } from '@nestjs/common';

import { MailFactory } from './factories/mail';
import { MailOptionsFactory } from './factories/mail_options';
import { MailVariablesFactory } from './factories/mail_variables';
import { NotificationFactory } from './factories/notification';
import { NotificationTokenFactory } from './factories/notification-token';

@Global()
@Module({
  providers: [
    MailOptionsFactory,
    MailVariablesFactory,
    NotificationFactory,
    NotificationTokenFactory,
    MailFactory,
  ],
  exports: [
    MailOptionsFactory,
    MailVariablesFactory,
    NotificationFactory,
    NotificationTokenFactory,
    MailFactory,
  ],
})
export class Domain {}
