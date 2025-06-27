import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.password,
    },
  });

  const html = `
    <h2>Your Booking is Confirmed!</h2>
    <p>Hello ${data.username},</p>
    <p>Thank you for your booking. Here are the details:</p>
    <ul>
      <li><strong>Booking ID:</strong> ${data.bookingId}</li>
      <li><strong>Hotel:</strong> ${data.hotelName}</li>
      <li><strong>Address:</strong> ${data.hotelAddress}</li>
      <li><strong>Check-in:</strong> ${data.checkIn}</li>
      <li><strong>Check-out:</strong> ${data.checkOut}</li>
      <li><strong>Total Price:</strong> ₹${data.totalPrice}</li>
    </ul>
    <p>We look forward to hosting you!</p>
  `;

  await transport.sendMail({
    from: `"Quick Stay" <${process.env.Gmail}>`,
    to: email,
    subject,
    html,
  });
};

export default sendMail;