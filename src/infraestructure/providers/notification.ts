import { Client, ClientRMQ } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { notificationRMQClientOptions } from '../clients/notification';

export class NotificationQueue {
  @Client(notificationRMQClientOptions)
  private notificationClient: ClientRMQ;

  send(queue: string, payload: any) {
    firstValueFrom(this.notificationClient.send(queue, payload));
  }
}
