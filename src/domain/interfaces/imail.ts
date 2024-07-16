export interface IMail {
  sendSingle(
    data: Partial<{
      id: string;
      name: string;
      to: string;
      subject: string;
      text?: string;
      options: {
        template?: string;
        html?: string;
        variables?: Record<string, any>;
      };
    }>,
  ): Promise<{ email_id: string }>;
  sendMass(
    data: Partial<{
      id: string;
      name: string;
      to: string[];
      subject: string;
      text?: string;
      options: {
        template?: string;
        html?: string;
        variables?: Record<string, any>;
      };
    }>,
  ): Promise<{ email_id: string }>;
}
