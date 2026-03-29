import { Resend } from 'resend';
import { env } from '../config';
import { ApiError } from './api-error';

let resend: Resend;
const getResend = (): Resend => {
  if (!resend) {
    resend = new Resend(env.RESEND_API_KEY);
  }
  return resend;
};

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async (mailOptions: MailOptions): Promise<void> => {
  const { error } = await getResend().emails.send(mailOptions);
  if (error) {
    throw new ApiError(500, 'Unable to send email');
  }
};
