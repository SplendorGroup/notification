import { randomUUID } from 'crypto';

export class Notification {
  id: string;

  user_id: string;

  token: string;

  title: string;

  body: string;

  type: string;

  priority: string;

  created_at: Date;

  updated_at?: Date;

  constructor(props: Notification, options?: { update?: boolean }) {
    Object.assign(this, props);

    if (!options?.update) {
      this.id = randomUUID();
      this.created_at = new Date();
    }
  }
}
