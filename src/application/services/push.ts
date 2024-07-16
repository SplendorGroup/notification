import { Logger } from '@nestjs/common';

import { FirebaseConnection } from '@/infraestructure/connections/firebase';

export class PushService {
  protected logger = new Logger(PushService.name);

  constructor(private readonly firebaseService: FirebaseConnection) {}

  async send(data: {
    notification: {
      title: string;
      body: string;
    };
    token: string;
  }) {
    try {
      await this.firebaseService.messaging.send(data);
    } catch (error) {
      this.logger.error(
        JSON.stringify(
          {
            code: 1809,
            details: JSON.stringify({
              name: 'Send Push Notification failed',
              identify: 'PUSH_NOTIFICATION_SEND_FAILED',
              status: 500,
              message: 'Push notification failed.',
              error: error?.message,
            }),
          },
          null,
          2,
        ),
      );
    }
  }
}
