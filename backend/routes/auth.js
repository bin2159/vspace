import express from 'express'
import passport from 'passport'
import User from '../models/User.js'
import nodemailer from 'nodemailer'
import PasswordReset from '../models/PasswordReset.js'
import { isAuthenticated, isNotAuthenticated, checkRole } from '../middlewares/auth.js'

const router = express.Router()
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Local Registration
router.post('/register', isNotAuthenticated, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({ username, email, password });
    await user.save();

    // Login after registration
    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: 'Login failed after registration' });
      return res.status(200).json({
        message: 'Registration successful',
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Local Login
router.post('/login', isNotAuthenticated, passport.authenticate('local'), (req, res) => {
  res.json({
    message: 'Login successful',
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    }
  });
});

// Google OAuth Routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    // successRedirect: '/dashboard'
  }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`); // Redirect to frontend URL
  }
);

// Logout
router.get('/logout', async (req, res) => {
  try {
    // Revoke Google OAuth token if it exists
    if (req.user?.googleId) {
      // You might want to add token revocation logic here
    }

    // Clear session
    req.logout((err) => {
      if (err) return res.status(500).json({ message: 'Logout failed' });

      // Destroy session
      req.session.destroy((sessionErr) => {
        if (sessionErr) return res.status(500).json({ message: 'Session destruction failed' });

        // Clear session cookie
        res.clearCookie('connect.sid');
        return res.json({ message: 'Logout successful' });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Logout failed', error: error.message });
  }
});

// Add this route to check current authentication status
router.get('/me', isAuthenticated, (req, res) => {
  if (req.user) {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        profileImage: req.user.profileImage
      }
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});
// Password Reset Route
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Save reset token
    const passwordReset = new PasswordReset({
      user: user._id,
      token: resetTokenHash
    });
    await passwordReset.save();

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset</p>
        <p>Click <a href="${resetUrl}">here</a> to reset your password</p>
        <p>This link will expire in 1 hour</p>
      `
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Hash the token for comparison
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find valid reset request
    const passwordReset = await PasswordReset.findOne({
      token: resetTokenHash,
      createdAt: { $gt: new Date(Date.now() - 1 * 60 * 60 * 1000) } // 1 hour
    });

    if (!passwordReset) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Find user and update password
    const user = await User.findById(passwordReset.user);
    user.password = newPassword; // Mongoose pre-save hook will hash
    await user.save();

    // Remove reset token
    await PasswordReset.deleteOne({ _id: passwordReset._id });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Email Verification Route
router.get('/verify-email/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Protected Route Example
router.get('/admin-dashboard',
  isAuthenticated,
  checkRole(['admin']),
  (req, res) => {
    res.json({ message: 'Welcome to admin dashboard' });
  }
);

export default router
