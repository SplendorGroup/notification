import { randomUUID } from 'crypto';

export class MailVariables {
  id?: string;

  mail_id: string;

  name: string;

  value: string;

  constructor(props: MailVariables, options?: { update?: boolean }) {
    Object.assign(this, props);

    if (!options?.update) {
      this.id = randomUUID();
    }
  }
}
