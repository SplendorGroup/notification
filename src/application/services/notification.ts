import { Notification } from '@/domain/entities/notification';
import { IRepository } from '@/domain/interfaces/irepository';

export class NotificationService {
  constructor(private readonly notification: IRepository<'notification'>) {}

  async create(data: Partial<Notification>) {
    return await this.notification.create(data);
  }
}
