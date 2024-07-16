import { MailVariable } from './mail-variable';

export class MailOptions {
  id: string;

  mail_id: string;

  mail_variables_id: string;

  template: string;

  html?: string;

  variables?: MailVariable[];

  constructor(props: MailOptions) {
    Object.assign(this, props);
  }
}
