import { Injectable } from '@nestjs/common';

import { Notification } from '../entities/notification';
import { NotificationMapper } from '../mappers/notification';

@Injectable()
export class NotificationFactory {
  create(data: any) {
    const notification_domain = NotificationMapper.toDomain(data);
    const notification = new Notification(notification_domain);
    return NotificationMapper.toPersistence(notification);
  }
}
