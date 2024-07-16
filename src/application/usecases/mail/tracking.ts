import { Injectable } from '@nestjs/common';

import { MailService } from '@/application/services/mail';

@Injectable()
export class TrackingMailUseCase {
  constructor(private mailService: MailService) {}

  async execute(id: string) {
    const mail = await this.getMail(id);

    if (!mail) return;

    await this.changeOpenState(id);
  }

  async getMail(id: string) {
    return await this.mailService.findById(id);
  }

  async changeOpenState(id: string) {
    return await this.mailService.update(id, { open: true });
  }
}
