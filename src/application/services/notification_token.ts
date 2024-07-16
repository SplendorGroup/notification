import { IRepository } from '@/domain/interfaces/irepository';
import { NotificationToken } from '@/domain/values-object/notification-token';

export class NotificationTokenService {
  constructor(private readonly notification_token: IRepository<'notification_token'>) {}

  async create(data: Partial<NotificationToken>) {
    return await this.notification_token.create(data);
  }

  async findAll(data?: Partial<NotificationToken>) {
    return await this.notification_token.findAll(data);
  }
}
