import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.verify();
    console.log("✔ Email server ready");

    const info = await transporter.sendMail({
      from: `"Admin" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("✔ Email sent!", info.messageId);

  } catch (err) {
    console.error("❌ EMAIL ERROR:", err);
  }
};
