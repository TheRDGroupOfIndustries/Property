const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid Email or Password' });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Email or Password' });

    const payload = { admin: { id: admin._id } };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};