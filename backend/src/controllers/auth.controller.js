const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
   res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000,
})
    res.status(201).json({ success: true, user: { id: user._id, name: user.name, email: user.email }, message: 'User registered successfully', token });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }

}


const login = async (req, res) => {
  try {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email' });
    }
    const paswaordMatch = await user.comparePassword(password);
    if (!paswaordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const token = generateToken(user._id);
     res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',  // ✅ fixed
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.status(200).json({
      success: true, user: { id: user._id, name: user.name, email: user.email }, message: 'User logged in successfully', token
    })

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

const logoutuser = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'User logged out successfully' });

}

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json({ success: true, user });
}

module.exports = { registerUser, logoutuser, getUserProfile, login };