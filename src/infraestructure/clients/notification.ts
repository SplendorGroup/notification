import { ClientOptions, Transport } from '@nestjs/microservices';

export const notificationRMQClientOptions: ClientOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'notification',
    noAck: false,
    queueOptions: {
      durable: false,
    },
  },
};
