const nodeMailer = require("nodemailer");

const sendMail = async (options) => {
  const transpoter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_MAIL,
    },
  });

  const mailOptions = {
    from: "",
    to: options.email,
    subject: options.subject,
    message: options.message,
  };

  await transpoter.sendMail(mailOptions);
};
module.exports = sendMail;
