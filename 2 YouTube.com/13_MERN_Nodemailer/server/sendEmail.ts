const nodemailer = require("nodemailer");

const sendEmail = async (subject: string, message: string, send_to: string, sent_from: string, reply_to: string) => {
  const transporter = await nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: "587",
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // console.log({ transporter });

  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  // Send Email
  await transporter.sendMail(options, function (error: Error, info: string) {
    if (error) {
      console.log({ error });
    } else {
      console.log({ info });
    }
  });
};

module.exports = sendEmail;
