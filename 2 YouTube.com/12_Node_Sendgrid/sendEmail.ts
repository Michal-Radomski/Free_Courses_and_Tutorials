require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const sendEmail = (to: string, from: string, subject: string, text: string) => {
  // console.log({ to, from, subject, text });
  const msg = {
    to,
    from,
    subject,
    html: text,
  };

  sgMail.send(msg, function (error: Error, info: string) {
    if (error) {
      console.log("Email Not Sent Error Occurred" + { error });
    } else {
      console.log("Email was Sent", { info });
    }
  });
};

export default sendEmail;
