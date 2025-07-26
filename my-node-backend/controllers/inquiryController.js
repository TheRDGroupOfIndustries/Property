const Inquiry = require('../models/Inquiry');

exports.submitInquiry = async (req, res) => {
  const { propertyId, fullName, email, phone, message, preferredContactMethod } = req.body;

  if (!propertyId || !fullName || !email || !message || !preferredContactMethod) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  // Basic anti-spam: Reject if preferredContactMethod not Email or Phone
  if (!['Email', 'Phone'].includes(preferredContactMethod)) {
    return res.status(400).json({ message: 'Invalid preferred contact method' });
  }

  try {
    const newInquiry = new Inquiry({
      property: propertyId,
      fullName,
      email,
      phone,
      message,
      preferredContactMethod
    });

    await newInquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate('property', 'title location.city location.country')
      .sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};



exports.deleteInquiry = async (req, res) => {
  const { id } = req.params;
  try {
    const inquiry = await Inquiry.findByIdAndDelete(id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (err) {
    console.error('Delete Inquiry Error:', err);
    res.status(500).json({ message: 'Server error deleting inquiry' });
  }
};