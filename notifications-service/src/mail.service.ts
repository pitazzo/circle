import { Injectable } from '@nestjs/common';
import { Email } from 'circle-core';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'MAIL_HOST',
      port: parseInt('MAIL_PORT'),
      auth: {
        user: 'MAIL_USER',
        pass: 'MAIL_PASSWORD',
      },
    });
  }

  public async sendMessage(
    email: Email,
    subject: string,
    body: string,
  ): Promise<void> {
    const mailOptions = {
      from: '"Circle" <notificaciones@circle.com>',
      to: email.value,
      subject: subject,
      text: body,
    };
    
    await this.transporter.sendMail(mailOptions);
  }
}
