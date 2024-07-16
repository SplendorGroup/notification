import { randomUUID } from 'crypto';

export class Mail {
  id?: string;

  name: string;

  to: string[];

  subject: string;

  text: string;

  open?: boolean;

  created_at: Date;

  updated_at?: Date;

  constructor(props: Mail, options?: { update?: boolean }) {
    Object.assign(this, props);

    if (!options?.update) {
      this.id = randomUUID();
      this.created_at = new Date();
    }
  }
}
