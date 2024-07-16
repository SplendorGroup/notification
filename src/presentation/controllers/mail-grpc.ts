import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { SendMassMailUseCase } from '@/application/usecases/mail/send-mass-mail';
import { SendUniqueMailUseCase } from '@/application/usecases/mail/send-unique-mail';

@Controller()
export class MailGRPCController {
  constructor(
    private readonly sendMassMailUseCase: SendMassMailUseCase,
    private readonly sendUniqueMailUseCase: SendUniqueMailUseCase,
  ) {}

  @GrpcMethod('MailService', 'SendSingle')
  async sendMail(data) {
    console.log(data);
    return await this.sendUniqueMailUseCase.execute(data);
  }

  @GrpcMethod('MailService', 'SendMass')
  async sendMailMass(data) {
    console.log(data);
    return await this.sendMassMailUseCase.execute(data);
  }
}
