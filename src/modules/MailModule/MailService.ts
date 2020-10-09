import log from 'fancy-log';
import fs from 'fs';
import config from 'config';
import sendgrid from 'sendgrid';

const helper = sendgrid.mail;

const SENDGRID_API_KEY: string = config.get('mail.apiKey');

export default class MailService {
  static sendEmail(
    email: string,
    content: any,
    subject: string,
    isAttachRequired = false,
    file: any
  ) {
    const from_email = new helper.Email('Lengoo <no-reply@lengoo.de>');
    const to_email = new helper.Email(email);
    subject = `[Lengoo] ${subject}`;
    content = new helper.Content('text/html', content);

    const mail = new helper.Mail(from_email, subject, to_email, content);

    if (isAttachRequired) {
      const attach = new helper.Attachment();

      const { filename, file_path, file_content } = file;

      let data: string;
      if (file_path) {
        data = fs.readFileSync(file_path).toString('base64');
      } else {
        data = Buffer.from(file_content).toString('base64');
      }

      attach.setContent(data);
      attach.setType('text/plain');
      attach.setFilename(filename);
      attach.setDisposition('attachment');

      mail.addAttachment(attach);
    }

    const sg = sendgrid(SENDGRID_API_KEY);
    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, (error, response) => {
      log(response.statusCode);
      log(response.body);
      log(response.headers);
    });
  }
}
