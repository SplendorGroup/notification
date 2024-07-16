import { Mail } from '../entities/mail';
import { DateValuesObject } from '../values-object/date';
import { MailOptions } from '../entities/mail-options';
import { MailVariables } from '../entities/mail-variables';

import { variablesToObject } from '@/infraestructure/helpers/variables';

export class MailMapper {
  static toDomain(raw: any): Mail {
    return {
      name: raw.name,
      to: raw.to,
      subject: raw.subject,
      text: raw.text,
      created_at: raw?.created_at ? new DateValuesObject(raw?.created_at).toDate() : undefined,
      updated_at: raw?.updated ? new DateValuesObject(raw?.updated_at).toDate() : undefined,
    };
  }

  static toOptionsDomain(raw: any): MailOptions {
    return {
      id: raw?.id,
      mail_id: raw?.mail_id,
      template: raw?.template,
      html: raw?.html,
    };
  }

  static toVariablesDomain(raw: any): MailVariables {
    return {
      id: raw?.id,
      mail_id: raw?.mail_id,
      name: raw?.name,
      value: raw?.value,
    };
  }

  static toPersistence(mail: Mail): any {
    return {
      id: mail?.id,
      name: mail?.name,
      to: mail?.to && Array.isArray(mail.to) ? mail.to : [mail.to],
      subject: mail.subject,
      text: mail?.text,
    };
  }

  static toOptionsPersistence(options: MailOptions) {
    return {
      id: options?.id,
      maild_id: options?.mail_id,
      html: options?.html,
      template: options?.template,
    };
  }

  static toVariablePersistence(variable: Partial<MailVariables>) {
    return {
      mail_id: variable?.mail_id,
      name: variable?.name,
      value: variable?.value,
    };
  }

  static toManyVariablesPersistence(
    mail_id: string,
    object: Array<{ name: string; value: string }>,
  ) {
    return object.flatMap(variables =>
      MailMapper.toVariablePersistence({
        ...variables,
        mail_id,
      }),
    );
  }
}
