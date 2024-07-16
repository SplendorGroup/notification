import { Injectable } from '@nestjs/common';

import { NotificationToken } from '../values-object/notification-token';
import { NotificationTokenMapper } from '../mappers/notification-token';

@Injectable()
export class NotificationTokenFactory {
  create(data: any) {
    const notification_token_domain = NotificationTokenMapper.toDomain(data);
    const notification_token = new NotificationToken(notification_token_domain);
    return NotificationTokenMapper.toPersistence(notification_token);
  }
}
