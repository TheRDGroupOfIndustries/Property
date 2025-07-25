const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  submitInquiry,
  getInquiries,
  deleteInquiry
} = require('../controllers/inquiryController');

// Public route - visitors submit inquiries
router.post('/', submitInquiry);

//
router.get('/', auth, getInquiries);
router.delete('/:id', auth, deleteInquiry);
router.post('/:id/inquiries', submitInquiry);

module.exports = router;