import { Injectable } from '@nestjs/common';

import { MailVariables } from '../entities/mail-variables';
import { MailMapper } from '../mappers/mail';

@Injectable()
export class MailVariablesFactory {
  create(data: any) {
    const mail_domain = MailMapper.toVariablesDomain(data);
    const mail = new MailVariables(mail_domain);
    return MailMapper.toVariablePersistence(mail);
  }
}
