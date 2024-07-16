import { IRepository } from '@/domain/interfaces/irepository';
import { MailVariable } from '@/domain/values-object/mail-variable';

export class MailVariablesService {
  constructor(private readonly mail_variables: IRepository<'mail_variables'>) {}

  async createMany(data: Partial<MailVariable>[]) {
    return await this.mail_variables?.createMany(data);
  }
}
