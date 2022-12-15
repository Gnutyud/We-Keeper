const nodemailer = require("nodemailer");

const sendEmail = async (user, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"We keep" <no-reply@your-app.com>',
      to: user.email,
      subject: "Password Reset",
      text: `Hi ${user.username},
        We received a request to reset the password for your account.
        Please click the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${user._id}/${token}
        If you did not request a password reset, please ignore this email.

        Best,
        The Wekeep Team
        `,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
