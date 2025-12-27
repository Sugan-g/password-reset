import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, text, html }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: `"Password Reset" <${process.env.EMAIL}>`,
        to,
        subject,
        text,
        html,
    });
};

export default sendEmail;
