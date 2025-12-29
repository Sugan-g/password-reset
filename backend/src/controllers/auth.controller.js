import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

/**
 * =========================
 * FORGOT PASSWORD
 * =========================
 */
export const forgotPassword = async (req, res) => {
    try {
        // Normalize email
        const email = req.body.email?.trim().toLowerCase();

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(404)
                .json({ message: 'Email does not exist in database' });
        }

        // Generate secure token
        const token = crypto.randomBytes(32).toString('hex');

        // Save token and expiry
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        // Use FRONTEND_URL from ENV (IMPORTANT)
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        // Send email
        await sendEmail({
            to: user.email, // always use DB email
            subject: 'Password Reset Request',
            html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `
        });

        return res
            .status(200)
            .json({ message: 'Password reset link sent to your email' });

    } catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

/**
 * =========================
 * RESET PASSWORD
 * =========================
 */
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password || password.length < 6) {
            return res
                .status(400)
                .json({ message: 'Password must be at least 6 characters' });
        }

        // Find user with valid token
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res
                .status(400)
                .json({ message: 'Invalid or expired token' });
        }

        // Update password
        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        // Confirmation email
        await sendEmail({
            to: user.email,
            subject: 'Password Successfully Reset',
            html: `
        <h3>Password Updated</h3>
        <p>Your password has been successfully updated.</p>
      `
        });

        return res
            .status(200)
            .json({ message: 'Password reset successful' });

    } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
