import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

/**
 * FORGOT PASSWORD
 * Sends password reset link to user email
 */
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate secure token
        const token = crypto.randomBytes(32).toString('hex');

        // Save token and expiry to user
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        console.log('Reset token saved:', token); // DEBUG: Check token saved

        // Frontend reset link (Vite runs on 5173)
        const resetLink = `http://localhost:5173/reset-password/${token}`;

        // Send reset email
        await sendEmail({
            to: email,
            subject: 'Password Reset Request',
            text: `Reset your password using this link: ${resetLink}`,
            html: `
                <h3>Password Reset</h3>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link expires in 15 minutes.</p>
            `,
        });

        return res.json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

/**
 * RESET PASSWORD
 * Updates user password and clears token
 */
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        console.log('Token received:', token); // DEBUG: Check token received

        // Validate password
        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Find user with valid token
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            console.log('No user found or token expired'); // DEBUG
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update password
        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        // Send confirmation email
        await sendEmail({
            to: user.email,
            subject: 'Password Successfully Reset',
            text: 'Your password has been successfully updated.',
            html: `
                <h3>Password Updated</h3>
                <p>Your password has been successfully updated. You can now login with your new password.</p>
            `,
        });

        return res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
