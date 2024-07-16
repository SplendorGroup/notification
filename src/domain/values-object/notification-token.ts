import { randomUUID } from 'crypto';

export class NotificationToken {
  id: string;

  user_id: string;

  token: string;

  created_at: Date;

  updated_at?: Date;

  constructor(props: NotificationToken, options?: { update?: boolean }) {
    Object.assign(this, props);

    if (!options?.update) {
      this.id = randomUUID();
      this.created_at = new Date();
    }
  }
}
