const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  
  // Location as address components
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },

  price: { type: Number, required: true },

  propertyType: {
    type: String,
    enum: ['Apartment', 'Villa', 'Commercial', 'Studio', 'Other'],
    required: true,
  },

  squareFootage: { type: Number, default: null },
  bedrooms: { type: Number, default: null },
  bathrooms: { type: Number, default: null },

  images: [{ type: String }], // Array of image URLs
  isRented: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', PropertySchema);
module.exports = Property;