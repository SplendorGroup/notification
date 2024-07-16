import { Notification } from '../entities/notification';
import { NotificationToken } from '../entities/notification_token';
import { DateValuesObject } from '../values-object/date';

export class NotificationTokenMapper {
  static toDomain(raw: any): NotificationToken {
    return {
      id: raw?.id,
      user_id: raw?.user_id,
      token: raw?.token,
      created_at: raw?.created_at ? new DateValuesObject(raw?.created_at).toDate() : undefined,
      updated_at: raw?.updated_at ? new DateValuesObject(raw?.updated_at).toDate() : undefined,
    };
  }

  static toPersistence(notification_token: NotificationToken): any {
    return {
      id: notification_token.id,
      user_id: notification_token.user_id,
      token: notification_token.token,
    };
  }
}
