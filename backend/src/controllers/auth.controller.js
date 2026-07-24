const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');
const sendOtpEmail = require('../utils/sendEmail');

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ success: false, message: 'User already exists and is verified' });
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    if (user && !user.isVerified) {
      user.name = name;
      user.password = password;
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        password,
        otp,
        otpExpiry,
        isVerified: false,
      });
    }

   
    try {
      await sendOtpEmail({
        email: user.email,
        subject: "Taskora - Your OTP Verification Code",
        otp: otp
      });
    } catch (emailError) {
      console.error('EMAIL FAILED TO SEND:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Could not send verification email. Please check your EMAIL_USER/EMAIL_PASS config.',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Verification code sent to your email. Please check your inbox.',
      email: user.email,
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'Email already verified' });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    await sendOtpEmail({
      email: user.email,
      subject: "Taskora - Resend Verification Code",
      otp: otp
    });

    res.status(200).json({ success: true, message: 'New OTP sent to your email' });
  } catch (error) {
    console.error('RESEND OTP ERROR:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'Email already verified' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ success: false, message: 'OTP expired, please request a new one' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = generateToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('VERIFY OTP ERROR:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email' });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before logging in',
        needsVerification: true,
        email: user.email,
      });
    }

    const token = generateToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      message: 'User logged in successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const logoutuser = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'User logged out successfully' });
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json({ success: true, user });
};

module.exports = { registerUser, logoutuser, getUserProfile, login, verifyOtp, resendOtp };
