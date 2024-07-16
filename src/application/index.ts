import { Global, Module } from '@nestjs/common';

import { SendMassMailUseCase } from './usecases/mail/send-mass-mail';
import { SendUniqueMailUseCase } from './usecases/mail/send-unique-mail';
import { SendPushUseCase } from './usecases/push/send-push';
import { PushService } from './services/push';
import { MailOptionsService } from './services/mail_options';
import { MailVariablesService } from './services/mail_variables';
import { MailService } from './services/mail';
import { NotificationService } from './services/notification';
import { NotificationTokenService } from './services/notification_token';
import { TrackingMailUseCase } from './usecases/mail/tracking';
import { RegisterPushTokenUseCase } from './usecases/push/register-push-token';

@Global()
@Module({
  providers: [
    SendUniqueMailUseCase,
    SendMassMailUseCase,
    SendPushUseCase,
    PushService,
    MailService,
    MailOptionsService,
    MailVariablesService,
    NotificationService,
    NotificationTokenService,
    TrackingMailUseCase,
    RegisterPushTokenUseCase,
  ],
  exports: [
    SendUniqueMailUseCase,
    SendMassMailUseCase,
    SendPushUseCase,
    PushService,
    MailService,
    MailOptionsService,
    MailVariablesService,
    NotificationService,
    NotificationTokenService,
    TrackingMailUseCase,
    RegisterPushTokenUseCase,
  ],
})
export class Application {}
