import { Notification } from '../entities/notification';
import { DateValuesObject } from '../values-object/date';

export class NotificationMapper {
  static toDomain(raw: any): Notification {
    return {
      id: raw?.id,
      user_id: raw?.user_id,
      token: raw?.token,
      title: raw?.title,
      body: raw?.body,
      type: raw?.type,
      priority: raw?.priority,
      created_at: raw?.created_at ? new DateValuesObject(raw?.created_at).toDate() : undefined,
      updated_at: raw?.updated ? new DateValuesObject(raw?.updated_at).toDate() : undefined,
    };
  }

  static toNotification(notification: any) {
    return {
      notification: {
        title: notification.title,
        body: notification.body,
      },
      token: notification.token,
    };
  }

  static toPersistence(notification: Notification): any {
    return {
      id: notification.id,
      user_id: notification.user_id,
      token: notification.token,
      title: notification.title,
      body: notification.body,
      type: notification.type,
      priority: notification.priority,
    };
  }
}
