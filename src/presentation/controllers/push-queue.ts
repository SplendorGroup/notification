import { Bind, Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';

import { SendPushDTO } from '@/application/dtos/send-push';
import { SendPushUseCase } from '@/application/usecases/push/send-push';

@Controller()
export class PushQueueController {
  constructor(private readonly sendPushUseCase: SendPushUseCase) {}

  @Bind(Payload(), Ctx())
  @MessagePattern('push')
  async sendMail(data: SendPushDTO) {
    console.log(data);
    return await this.sendPushUseCase.execute(data);
  }
}
