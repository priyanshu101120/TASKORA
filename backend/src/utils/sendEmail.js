const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,         
  secure: false,      
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  family: 4, 
});

const sendEmail = async ({ email, subject, otp }) => {
  const mailOptions = {
    from: `"Taskora Security" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject || "Your Taskora Verification Code",
    text: `Your Taskora verification code is ${otp}. It will expire in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 10px;">
          <h2 style="color: #1a3d2b; margin-bottom: 10px;">Verify Your Email</h2>
          <p style="color: #555;">Use the following 6-digit OTP to complete your registration on <strong>Taskora</strong>:</p>
          <div style="background: #080d0b; color: #c8f0a0; font-size: 28px; font-weight: bold; text-align: center; padding: 15px; border-radius: 8px; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #888; font-size: 12px;">This code will expire in 10 minutes.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;