const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../model/User');
const EMAIL_SECRET_KEY = 'MySecretKey';
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'artemmmm5454545@gmail.com',
    pass: 'tizm ztpk zvkg xxez',
  },
});

const sendPasswordResetEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign({ id: user._id }, EMAIL_SECRET_KEY, { expiresIn: '1h' });

    const mailOptions = {
      from: 'artemmmm5454545@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n`
        + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
        + `http://localhost:3000/reset-password/${resetToken}\n\n`
        + `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(`Error sending password reset email: ${error}`);
    res.status(500).json({ message: 'Password reset email failed to send' });
  }
};

const resetPassword = async (req, res, next) => {
  const { password, resetToken } = req.body;

  jwt.verify(resetToken, EMAIL_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid or expired reset token.' });
    }

    const userId = decoded.id;
    let user;

    try {
      user = await User.findById(userId);
    } catch (err) {
      return new Error(err);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = bcrypt.hashSync(password, 10);

    try {
      await user.save();
      res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Password reset failed' });
    }
  });
};

module.exports = { sendPasswordResetEmail, resetPassword };
