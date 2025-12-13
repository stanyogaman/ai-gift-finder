import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_SMTP_USER,
    pass: process.env.EMAIL_SMTP_PASS,
  },
});

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!process.env.EMAIL_SMTP_USER || !process.env.EMAIL_SMTP_PASS) {
    console.warn('Email not configured. Skipping email send.');
    console.log('Would send email:', options);
    return true;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@giftfinder.ai',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export async function sendPartnershipNotification(data: {
  name: string;
  email: string;
  company?: string;
  website?: string;
  country?: string;
  message: string;
}): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || 'stanyogaman@gmail.com';

  const text = `
New Partnership Request

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}
Website: ${data.website || 'Not provided'}
Country: ${data.country || 'Not provided'}

Message:
${data.message}

---
Sent from AI Gift Finder
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #8B5CF6, #EC4899); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #666; }
    .value { margin-top: 5px; }
    .message-box { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #8B5CF6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Partnership Request</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Company</div>
        <div class="value">${data.company || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">Website</div>
        <div class="value">${data.website ? `<a href="${data.website}">${data.website}</a>` : 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">Country</div>
        <div class="value">${data.country || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  return sendEmail({
    to: adminEmail,
    subject: `New Partnership Request from ${data.name}`,
    text,
    html,
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || 'stanyogaman@gmail.com';

  const text = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Sent from AI Gift Finder
  `.trim();

  return sendEmail({
    to: adminEmail,
    subject: `Contact Form: ${data.subject}`,
    text,
  });
}
