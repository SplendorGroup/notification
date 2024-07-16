import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { TrackingMailUseCase } from '@/application/usecases/mail/tracking';

@Controller()
export class MailHttpController {
  constructor(private trackingMailUseCase: TrackingMailUseCase) {}

  @Get('mail/track')
  async tracking(@Query('id') id: string, @Res() response: Response) {
    await this.trackingMailUseCase.execute(id);
    response.writeHead(200, {
      'content-type': 'image/png',
      'content-length': '0',
    });
    response.end();
  }
}
