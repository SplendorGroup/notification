import { Injectable } from '@nestjs/common';

import { SendPushDTO } from '@/application/dtos/send-push';
import { NotificationService } from '@/application/services/notification';
import { NotificationTokenService } from '@/application/services/notification_token';
import { PushService } from '@/application/services/push';
import { NotificationFactory } from '@/domain/factories/notification';
import { NotificationMapper } from '@/domain/mappers/notification';

@Injectable()
export class SendPushUseCase {
  constructor(
    private notificationService: NotificationService,
    private notificationFactory: NotificationFactory,
    private notificationTokenService: NotificationTokenService,
    private pushService: PushService,
  ) {}

  async execute(data: SendPushDTO) {
    await this.register(data);
  }

  async register(data: SendPushDTO) {
    const notification = this.notificationFactory.create(data);
    return await this.notificationService.create(notification);
  }

  async getAllNotificationTokens(user_id: string) {
    return (await this.notificationTokenService.findAll({ user_id })).flatMap(({ token }) => token);
  }

  async sendAllPushNotification(tokens: string[], data: SendPushDTO) {
    Promise.all(
      tokens.flatMap(token => {
        const notification = NotificationMapper.toNotification({
          data,
          token,
        });
        this.pushService.send(notification);
      }),
    );
  }
}
