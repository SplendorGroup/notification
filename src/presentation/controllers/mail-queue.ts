import { Bind, Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';

import { SendMassDTO } from '@/application/dtos/send-mass';
import { SendUniqueDTO } from '@/application/dtos/send-unique';
import { SendMassMailUseCase } from '@/application/usecases/mail/send-mass-mail';
import { SendUniqueMailUseCase } from '@/application/usecases/mail/send-unique-mail';

@Controller()
export class MailQueueController {
  constructor(
    private readonly sendMassMailUseCase: SendMassMailUseCase,
    private readonly sendUniqueMailUseCase: SendUniqueMailUseCase,
  ) {}

  @Bind(Payload(), Ctx())
  @MessagePattern('mail')
  async sendMail(data: SendUniqueDTO, context) {
    const {
      properties: { headers },
    } = context.getMessage();
    return await this.sendUniqueMailUseCase.execute(data);
  }

  @Bind(Payload(), Ctx())
  @MessagePattern('mail-mass')
  async sendMailMass(data: SendMassDTO, context) {
    const {
      properties: { headers },
    } = context.getMessage();
    return await this.sendMassMailUseCase.execute(data);
  }
}
