import { Injectable } from '@nestjs/common';

import { MailMapper } from '../mappers/mail';
import { MailOptions } from '../entities/mail-options';

@Injectable()
export class MailOptionsFactory {
  create(data: any) {
    const mail_domain = MailMapper.toOptionsDomain(data);
    const mail = new MailOptions(mail_domain);
    return MailMapper.toOptionsPersistence(mail);
  }
}
