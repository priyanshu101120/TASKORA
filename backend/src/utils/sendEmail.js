const SibApiV3Sdk = require('@getbrevo/brevo');

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

const sendEmail = async ({ email, subject, otp }) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = subject || "Your Taskora Verification Code";
  sendSmtpEmail.htmlContent = `
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
  `;
  sendSmtpEmail.sender = { name: "Taskora Security", email: process.env.BREVO_SENDER_EMAIL };
  sendSmtpEmail.to = [{ email }];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Brevo send error:', JSON.stringify(error?.response?.body || error));
    throw error;
  }
};

module.exports = sendEmail;