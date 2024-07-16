import { Options } from './mail';

export class SendUniqueDTO {
  user_id: string;

  name: string;

  to: string;

  subject: string;

  text?: string;

  options: Options;
}
