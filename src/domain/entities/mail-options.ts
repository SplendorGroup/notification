import { randomUUID } from 'crypto';

export class MailOptions {
  id?: string;

  mail_id: string;

  template: string;

  html: string;

  constructor(props: MailOptions, options?: { update?: boolean }) {
    Object.assign(this, props);

    if (!options?.update) {
      this.id = randomUUID();
    }
  }
}
