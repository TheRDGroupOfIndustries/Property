const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  message: { type: String, required: true },
  preferredContactMethod: {
    type: String,
    enum: ["Email", "Phone"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Inquiry = mongoose.model("Inquiry", InquirySchema);
module.exports = Inquiry;
