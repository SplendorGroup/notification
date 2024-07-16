import { Injectable } from '@nestjs/common';

import { RegisterPushTokenDTO } from '@/application/dtos/register-push-token';
import { NotificationTokenService } from '@/application/services/notification_token';
import { NotificationTokenFactory } from '@/domain/factories/notification-token';

@Injectable()
export class RegisterPushTokenUseCase {
  constructor(
    private notificationTokenService: NotificationTokenService,
    private notificationTokenFactory: NotificationTokenFactory,
  ) {}

  async execute(data: RegisterPushTokenDTO & { user_id: string }) {
    await this.register(data);
  }

  async register(data: RegisterPushTokenDTO) {
    const notification = this.notificationTokenFactory.create(data);
    return await this.notificationTokenService.create(notification);
  }
}
