import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a transporter object using the SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER, // From your .env file
    pass: process.env.SMTP_PASS, // From your .env file
  },
});

// Export the transporter
export default transporter;
