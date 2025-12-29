import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // ✅ REQUIRED
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD, // Gmail App Password
        },
        connectionTimeout: 10000,
    });

    await transporter.sendMail({
        from: `"Password Reset" <${process.env.EMAIL}>`,
        to,
        subject,
        html,
    });
};

export default sendEmail;
