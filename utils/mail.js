import * as dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

export const sendMail = async ( to, subject, html ) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log('Email sent successfully');
    return { success: true, message: 'Email sent successfully' }; // Return success response
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email', error }; // Return error response
  }
};
