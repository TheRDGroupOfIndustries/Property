const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getProperties,
  getPropertyById, //
  addProperty,
  updateProperty,
  deleteProperty,
  markPropertyAsRented
} = require('../controllers/propertyController');

router.get('/', getProperties);
router.post('/', auth, addProperty);
router.get('/:id', getPropertyById);   
router.put('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);
router.put('/:id/rent', auth, markPropertyAsRented);

module.exports = router;