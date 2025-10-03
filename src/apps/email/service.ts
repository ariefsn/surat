import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { handlebars } from 'src/lib/helper';
import { IEnv, IEnvEmailAccount, ISmtpConfig } from 'src/lib/models';
import { EmailPayload } from 'src/lib/models/email';
import nodeMailer = require('nodemailer');
import Mjml = require('mjml');
import Mail = require('nodemailer/lib/mailer');
import SMTPPool = require('nodemailer/lib/smtp-pool');

type TClient = nodeMailer.Transporter<
  SMTPPool.SentMessageInfo,
  SMTPPool.Options
>;

@Injectable()
export class EmailService {
  client: TClient;

  defaultSender: IEnvEmailAccount;

  constructor(private env: ConfigService<IEnv>) {
    const smtpConfig = this.env.get<ISmtpConfig>('smtp');

    this.defaultSender = this.env.get<IEnvEmailAccount>('defaultSender')!;

    const transporter = nodeMailer.createTransport({
      host: smtpConfig?.host,
      port: smtpConfig?.port,
      secure: smtpConfig?.secure,
      auth: {
        user: smtpConfig?.auth.user,
        pass: smtpConfig?.auth.pass,
      },
      pool: smtpConfig?.pool || true,
      maxConnections: smtpConfig?.maxConnections || 10,
      maxMessages: smtpConfig?.maxMessages || 100,
    });

    this.client = transporter;
  }

  async send(payload: EmailPayload): Promise<{
    email: SMTPPool.SentMessageInfo;
    html: string;
  }> {
    const isMjml = payload.body.includes('<mjml>');
    let body = payload.body;
    if (isMjml) {
      body = Mjml(payload.body).html;
    }

    const template = handlebars.compile(body);
    const html = template(payload.variables);
    const from = `${payload.from.name || this.defaultSender.name} <${payload.from.email || this.defaultSender.email}>`;

    const headers: Mail.Headers = {
      ...payload.headers,
    };

    if (payload.category) {
      headers['X-MT-Category'] = payload.category;
    }

    if (payload.tags) {
      headers['X-MT-Custom-Variables'] = JSON.stringify(payload.tags);
    }

    const res = await this.client.sendMail({
      from: from,
      to: payload.to.map((t) => ({
        address: t.email,
        name: t.name ?? '',
      })),
      subject: payload.subject,
      text: payload.text,
      attachments: payload.attachments?.map((attachment) => ({
        content: attachment.content,
        filename: attachment.filename,
        type: attachment.type,
        disposition: attachment.disposition,
        content_id: attachment.contentId,
      })),
      cc: payload.cc?.map((t) => ({
        address: t.email,
        name: t.name ?? '',
      })),
      bcc: payload.bcc?.map((t) => ({
        address: t.email,
        name: t.name ?? '',
      })),
      html,
      headers,
    });

    return {
      email: res,
      html,
    };
  }
}
