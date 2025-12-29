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
                message: 'Email is required'
            });
        }

        // 🔥 DEBUG SECTION (VERY IMPORTANT)
        const allUsers = await User.find({});
        console.log('================ DEBUG START ================');
        console.log('DB NAME:', User.db.name);
        console.log('COLLECTION:', User.collection.name);
        console.log('TOTAL USERS:', allUsers.length);
        console.log('USERS:', allUsers);
        console.log('INCOMING EMAIL:', email);
        console.log('================ DEBUG END ==================');

        // Actual check
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'Email does not exist in database'
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        user.resetToken = hashedToken;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins

        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await sendEmail(
            user.email,
            'Password Reset Request',
            `
            <h3>Password Reset</h3>
            <p>Click the link below to reset your password:</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>This link will expire in 15 minutes.</p>
            `
        );

        res.status(200).json({
            message: 'Password reset link sent to email'
        });

    } catch (error) {
        console.error('Forgot Password Error:', error);
        res.status(500).json({
            message: 'Server error'
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
                message: 'Password is required'
            });
        }

        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await User.findOne({
            resetToken: hashedToken,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Token is invalid or expired'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.status(200).json({
            message: 'Password reset successful'
        });

    } catch (error) {
        console.error('Reset Password Error:', error);
        res.status(500).json({
            message: 'Server error'
        });
    }
};
