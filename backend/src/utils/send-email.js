const { Resend } = require("resend");
const { env } = require("../config");
const { ApiError } = require("./api-error");

let resend;
const getResend = () => {
  if (!resend) {
    resend = new Resend(env.RESEND_API_KEY);
  }
  return resend;
};

const sendMail = async (mailOptions) => {
  const { error } = await getResend().emails.send(mailOptions);
  if (error) {
    throw new ApiError(500, "Unable to send email");
  }
};

module.exports = {
  sendMail,
};
