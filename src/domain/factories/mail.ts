import { Injectable } from '@nestjs/common';

import { Mail } from '../entities/mail';
import { MailMapper } from '../mappers/mail';

@Injectable()
export class MailFactory {
  create(data: any) {
    const mail_domain = MailMapper.toDomain(data);
    const mail = new Mail(mail_domain);
    return MailMapper.toPersistence(mail);
  }
}
