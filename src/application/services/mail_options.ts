import { IRepository } from '@/domain/interfaces/irepository';
import { MailOptions } from '@/domain/values-object/mail-options';

export class MailOptionsService {
  constructor(private readonly mail_options: IRepository<'mail_options'>) {}

  async create(data: Partial<MailOptions>) {
    return await this.mail_options?.create(data);
  }
}
