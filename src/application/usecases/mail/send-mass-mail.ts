import { Inject, Injectable } from '@nestjs/common';

import { SendMassDTO } from '@/application/dtos/send-mass';
import { MailService } from '@/application/services/mail';
import { MailOptionsService } from '@/application/services/mail_options';
import { MailVariablesService } from '@/application/services/mail_variables';
import { MailFactory } from '@/domain/factories/mail';
import { MailOptionsFactory } from '@/domain/factories/mail_options';
import { IMail } from '@/domain/interfaces/imail';
import { MailMapper } from '@/domain/mappers/mail';

@Injectable()
export class SendMassMailUseCase {
  constructor(
    @Inject('MAIL')
    private mail: IMail,
    private mailService: MailService,
    private mailOptionsService: MailOptionsService,
    private mailVariablesService: MailVariablesService,
    private mailFactory: MailFactory,
    private mailOptionsFactory: MailOptionsFactory,
  ) {}

  async execute(data: SendMassDTO) {
    const mail = await this.register(data);
    await this.sendMail(mail?.id, data);
  }

  async sendMail(id: string, data: SendMassDTO) {
    return this.mail.sendMass({
      id,
      ...data,
    });
  }

  async register(data: SendMassDTO) {
    const mail_data = this.mailFactory.create(data);
    const mail = await this.mailService.create(mail_data);

    if (data?.options) {
      const options_data = this.mailOptionsFactory.create(data?.options);
      await this.mailOptionsService.create(options_data);
    }

    if (data?.options?.variables) {
      const variables = MailMapper.toManyVariablesPersistence(mail?.id, data?.options?.variables);
      await this.mailVariablesService.createMany(variables);
    }
    return {
      id: mail_data?.id,
    };
  }
}
