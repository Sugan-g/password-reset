import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

/**
 * ============================
 * FORGOT PASSWORD
 * ============================
 */
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: 'Email is required',
            });
        }

        // 🔎 Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'Email does not exist in database',
            });
        }

        // 🔐 Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        user.resetToken = hashedToken;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // 📧 Send email ASYNC (do not block response)
        sendEmail(
            user.email,
            'Password Reset Request',
            `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 15 minutes.</p>
      `
        ).catch((err) => {
            console.error('Email send failed:', err.message);
        });

        // ✅ Respond immediately
        return res.status(200).json({
            message: 'Password reset link sent to email',
        });

    } catch (error) {
        console.error('Forgot Password Error:', error);
        return res.status(500).json({
            message: 'Server error',
        });
    }
};

/**
 * ============================
 * RESET PASSWORD
 * ============================
 */
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                message: 'Password is required',
            });
        }

        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await User.findOne({
            resetToken: hashedToken,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                message: 'Token is invalid or expired',
            });
        }

        // 🔒 Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        return res.status(200).json({
            message: 'Password reset successful',
        });

    } catch (error) {
        console.error('Reset Password Error:', error);
        return res.status(500).json({
            message: 'Server error',
        });
    }
};
