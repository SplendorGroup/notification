import { Mail } from '@/domain/entities/mail';
import { IRepository } from '@/domain/interfaces/irepository';

export class MailService {
  constructor(private readonly mail: IRepository<'mail'>) {}

  async create(data: Partial<Mail>) {
    return await this.mail?.create(data);
  }

  async findById(id: string) {
    return await this.mail?.findById(id);
  }

  async update(id: string, data: Partial<Mail>) {
    return await this.mail?.update(id, data);
  }
}
