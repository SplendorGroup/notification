export class MailVariable {
  id: string;

  mail_id: string;

  mail_options_id: string;

  name: string;

  value: string;

  constructor(props: MailVariable) {
    Object.assign(this, props);
  }
}
