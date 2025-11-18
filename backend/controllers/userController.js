const User = require('../models/User');
const jwt = require('jsonwebtoken');


exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const user = await User.create({ name, email, password, role: role || 'customer' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
    } else {
      res.status(401).json({ msg: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

exports.updateMe = async (req, res) => {
  try {
    const updates = { preferences: req.body.preferences };
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};