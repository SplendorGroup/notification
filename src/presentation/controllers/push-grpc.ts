import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { RegisterPushTokenDTO } from '@/application/dtos/register-push-token';
import { SendPushDTO } from '@/application/dtos/send-push';
import { RegisterPushTokenUseCase } from '@/application/usecases/push/register-push-token';
import { SendPushUseCase } from '@/application/usecases/push/send-push';
import { RequestUser } from '@/domain/types/request-user';

@Controller()
export class PushGRPCController {
  constructor(
    private readonly sendPushUseCase: SendPushUseCase,
    private readonly registerTokenUseCase: RegisterPushTokenUseCase,
  ) {}

  @GrpcMethod('PushService', 'RegisterToken')
  async registerToken({ body, user }: { body: RegisterPushTokenDTO; user: RequestUser }) {
    return await this.registerTokenUseCase.execute({
      ...body,
      user_id: user.id,
    });
  }

  @GrpcMethod('PushService', 'SendPush')
  async sendMail(data: SendPushDTO) {
    console.log(data);
    return await this.sendPushUseCase.execute(data);
  }
}
