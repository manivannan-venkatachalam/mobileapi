const nodemailer = require('nodemailer');

export const Mail = async function mailSend(message: Object): Promise<string> {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: "<user>",
      pass: "<pass>"
    }
  });

  return await transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }

  });

}
