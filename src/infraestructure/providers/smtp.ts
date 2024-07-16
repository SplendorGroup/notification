import * as fs from 'fs';
import path, { resolve } from 'path';

import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import * as handlebars from 'handlebars';

import { variablesToObject } from '../helpers/variables';

import { IMail } from '@/domain/interfaces/imail';

@Injectable()
export class SMTPProvider implements IMail {
  protected name = process.env.SMTP_NAME;

  protected unsubscribeMail = process.env.SMTP_UNSUBSCRIBE_MAIL;

  protected transport: Transporter;

  constructor() {
    this.transport = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  private getTrackingPixel(email_id: string): string {
    const trackingUrl = `${process.env.TRACKING_URL}?id=${email_id}`;
    return `<img src="${trackingUrl}" width="1" height="1" style="display:none;" />`;
  }

  async sendSingle(data: {
    id?: string;
    name: string;
    to: string;
    subject: string;
    text: string;
    options: {
      template: string;
      html?: string;
      variables: Array<{ name: string; value: string }>;
    };
  }) {
    const email_id = data?.id;
    const trackingPixel = this.getTrackingPixel(email_id);

    const templatePath = resolve(
      'src/infraestructure/templates/' + `${data?.options?.template || 'default'}.hbs`,
    );
    console.log(JSON.stringify(data, null, 2));
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(templateSource);
    const html = template(variablesToObject(data?.options?.variables)) + trackingPixel;

    const mailOptions = {
      from: `"${data?.name}" <${process.env.SMTP_USER}>`,
      to: 'guatavojorgee2511@gmail.com',
      subject: data?.subject,
      text: data?.text,
      html,
      headers: {
        'X-Mailer': `${process.env.SMTP_HOSTNAME}`,
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        Importance: 'Normal',
      },
      date: new Date(),
    };

    console.log(JSON.stringify(mailOptions, null, 2));

    try {
      await this.transport.sendMail(mailOptions);
      return {
        email_id,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async sendMass(data: {
    id?: string;
    name: string;
    to: string[];
    subject: string;
    text: string;
    options: {
      template: string;
      html?: string;
      variables: Array<{ name: string; value: string }>;
    };
  }) {
    if (!data?.options?.template) {
      data.options.template = 'default';
    }

    const email_id = data?.id;
    const trackingPixel = this.getTrackingPixel(email_id);

    const templatePath = resolve(
      'src/infraestructure/templates/' + `${data?.options?.template || 'default'}.hbs`,
    );
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(templateSource);
    const html = template(variablesToObject(data?.options?.variables)) + trackingPixel;

    const mailOptions = {
      from: `"${data?.name}" <${process.env.SMTP_USER}>`,
      to: 'guatavojorge2511@gmail.com',
      subject: data?.subject,
      text: data?.text,
      html,
      headers: {
        'X-Mailer': this.name,
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        Importance: 'Normal',
        'List-Unsubscribe': `<mailto:${this.unsubscribeMail}?subject=Unsubscribe>`,
      },
      date: new Date(),
    };

    console.log(mailOptions);

    try {
      await this.transport.sendMail(mailOptions);
      return {
        email_id,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
