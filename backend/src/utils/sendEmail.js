import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,          // ✅ CHANGE HERE
        secure: false,      // ✅ MUST be false for 587
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false, // Render compatibility
        },
    });

    await transporter.verify();

    await transporter.sendMail({
        from: `"Password Reset" <${process.env.EMAIL}>`,
        to,
        subject,
        html,
    });
};

export default sendEmail;
