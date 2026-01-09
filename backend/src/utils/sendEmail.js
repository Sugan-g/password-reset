import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD, // Gmail App Password
            },
            connectionTimeout: 10000,
        });

        // 🔍 Verify SMTP connection (CRITICAL for Render)
        await transporter.verify();

        await transporter.sendMail({
            from: `"Password Reset" <${process.env.EMAIL}>`,
            to,
            subject,
            html,
        });

        console.log('✅ Email sent successfully');
    } catch (error) {
        console.error('❌ Email sending failed:', error);
        throw new Error('Email could not be sent');
    }
};

export default sendEmail;
