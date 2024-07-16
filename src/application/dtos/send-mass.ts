import { Options } from './mail';

export class SendMassDTO {
  user_id: string;

  name: string;

  to: string[];

  subject: string;

  text?: string;

  options: Options;
}
