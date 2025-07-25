const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Property = require('../models/Property');
const Inquiry = require('../models/Inquiry');

router.get('/metrics', auth, async (req, res) => {
  try {
    const totalListings = await Property.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();

    res.json({ totalListings, totalInquiries });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;