import { NextRequest, NextResponse } from 'next/server';

// This API route handles contact form submissions
// You can integrate with various email services:
// - Nodemailer (SMTP)
// - SendGrid
// - AWS SES
// - Resend
// - Mailgun

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, message, budget } = body;

    // Validate required fields
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailContent = {
      to: process.env.CONTACT_EMAIL || 'info@atelier-samui.com',
      from: process.env.FROM_EMAIL || 'noreply@atelier-samui.com',
      subject: `New Project Inquiry: ${projectType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #b8860b; border-bottom: 2px solid #b8860b; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 150px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              ` : ''}
              ${budget ? `
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Budget:</strong></td>
                <td style="padding: 8px 0;">${budget} THB</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Project Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 150px;"><strong>Project Type:</strong></td>
                <td style="padding: 8px 0;">${projectType}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Message</h3>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
${message}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
            <p>This email was sent from the Atelier Samui contact form.</p>
            <p>Received at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })} (Bangkok Time)</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Contact Information:
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Budget: ${budget || 'Not provided'}

Project Type: ${projectType}

Message:
${message}

---
Received at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })} (Bangkok Time)
      `
    };

    // Choose your email service:
    // Option 1: Nodemailer with SMTP
    if (process.env.EMAIL_SERVICE === 'smtp') {
      await sendWithNodemailer(emailContent);
    }
    // Option 2: SendGrid
    else if (process.env.EMAIL_SERVICE === 'sendgrid') {
      await sendWithSendGrid(emailContent);
    }
    // Option 3: Resend (modern alternative)
    else if (process.env.EMAIL_SERVICE === 'resend') {
      await sendWithResend(emailContent);
    }
    // Fallback: Log to console (development)
    else {
      console.log('📧 Contact Form Submission (Email service not configured):');
      console.log('To:', emailContent.to);
      console.log('From:', emailContent.from);
      console.log('Subject:', emailContent.subject);
      console.log('---');
      console.log(emailContent.text);
      console.log('---');
    }

    // Send auto-reply to customer
    const autoReplyContent = {
      to: email,
      from: process.env.FROM_EMAIL || 'info@atelier-samui.com',
      subject: 'Thank you for contacting Atelier Samui',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #b8860b;">Thank You for Your Inquiry</h2>

          <p>Dear ${name},</p>

          <p>Thank you for contacting Atelier Samui. We have received your inquiry regarding <strong>${projectType}</strong>.</p>

          <p>Our team will review your project details and respond within 24 hours during business hours (Monday-Friday, 9:00 AM - 6:00 PM Bangkok Time).</p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your Submission:</h3>
            <p style="margin: 5px 0;"><strong>Project Type:</strong> ${projectType}</p>
            ${budget ? `<p style="margin: 5px 0;"><strong>Budget:</strong> ${budget} THB</p>` : ''}
            <p style="margin: 5px 0;"><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #666;">${message}</p>
          </div>

          <p>If you need immediate assistance, please call us at <a href="tel:+66123456789">+66 (0)12 345 6789</a>.</p>

          <p>Best regards,<br>The Atelier Samui Team</p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
            <p><strong>Atelier Samui</strong></p>
            <p>123 Moo 4, Bophut, Koh Samui, Surat Thani 84320, Thailand</p>
            <p>Email: info@atelier-samui.com | Phone: +66 (0)12 345 6789</p>
            <p>Website: <a href="https://www.atelier-samui.com">www.atelier-samui.com</a></p>
          </div>
        </div>
      `,
      text: `
Dear ${name},

Thank you for contacting Atelier Samui. We have received your inquiry regarding ${projectType}.

Our team will review your project details and respond within 24 hours during business hours (Monday-Friday, 9:00 AM - 6:00 PM Bangkok Time).

Your Submission:
Project Type: ${projectType}
${budget ? `Budget: ${budget} THB` : ''}
Message: ${message}

If you need immediate assistance, please call us at +66 (0)12 345 6789.

Best regards,
The Atelier Samui Team

---
Atelier Samui
123 Moo 4, Bophut, Koh Samui, Surat Thani 84320, Thailand
Email: info@atelier-samui.com | Phone: +66 (0)12 345 6789
Website: www.atelier-samui.com
      `
    };

    // Send auto-reply
    if (process.env.EMAIL_SERVICE === 'smtp') {
      await sendWithNodemailer(autoReplyContent);
    } else if (process.env.EMAIL_SERVICE === 'sendgrid') {
      await sendWithSendGrid(autoReplyContent);
    } else if (process.env.EMAIL_SERVICE === 'resend') {
      await sendWithResend(autoReplyContent);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. We will contact you within 24 hours.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}

// Email service implementations

async function sendWithNodemailer(emailData: any) {
  // Requires: npm install nodemailer
  // Uncomment and configure when ready to use

  /*
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: emailData.from,
    to: emailData.to,
    subject: emailData.subject,
    text: emailData.text,
    html: emailData.html,
  });
  */

  console.log('Nodemailer not configured. Set up SMTP credentials in .env');
}

async function sendWithSendGrid(emailData: any) {
  // Requires: npm install @sendgrid/mail
  // Uncomment and configure when ready to use

  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  await sgMail.send({
    to: emailData.to,
    from: emailData.from,
    subject: emailData.subject,
    text: emailData.text,
    html: emailData.html,
  });
  */

  console.log('SendGrid not configured. Set SENDGRID_API_KEY in .env');
}

async function sendWithResend(emailData: any) {
  // Requires: npm install resend
  // Uncomment and configure when ready to use

  /*
  const { Resend } = require('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: emailData.from,
    to: emailData.to,
    subject: emailData.subject,
    html: emailData.html,
  });
  */

  console.log('Resend not configured. Set RESEND_API_KEY in .env');
}
