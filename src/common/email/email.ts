import * as fs from 'fs';
const Handlebars = require('handlebars');
const { join } = require('path');
const sgMail = require('@sendgrid/mail');
import * as dotenv from 'dotenv';

dotenv.config({ path: process.env.ENV_PATH });

const from = `${process.env.APP_SENDER_NAME}<${process.env.APP_SENDER_EMAIL}>`;
export const getFileTemplate = async (name: string, templateData: object) => {
  const filePath = join(__dirname, 'template', name);
  if (!fs.existsSync(filePath)) {
    throw new Error('File does not exist!');
  }
  const source = fs.readFileSync(filePath, 'utf8');
  var template = Handlebars.compile(source);
  var result = template(templateData);

  return result;
};

export const sendEmail = async ({
  to,
  subject,
  template,
  templateData,
}): Promise<any> => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const content = getFileTemplate(template, templateData);

  const msg = {
    to: to,
    from,
    subject: subject,
    text: await content,
    html: await content,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
    })
    .catch((error) => {
      console.error(error);
    });
};
