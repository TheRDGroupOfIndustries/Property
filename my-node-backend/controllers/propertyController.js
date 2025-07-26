const Property = require("../models/Property");

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addProperty = async (req, res) => {
  const {
    title,
    description,
    location,
    price,
    propertyType,
    squareFootage,
    bedrooms,
    bathrooms,
    images,
  } = req.body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !location?.address ||
    !location?.city ||
    !location?.country ||
    !price ||
    !propertyType
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newProperty = new Property({
      title,
      description,
      location,
      price,
      propertyType,
      squareFootage: squareFootage || null,
      bedrooms: bedrooms || null,
      bathrooms: bathrooms || null,
      images: images || [],
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProperty = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const property = await Property.findById(id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) property[key] = updates[key];
    });

    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findByIdAndDelete(id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property removed" });
  } catch (err) {
    console.error("Delete Property Error:", err);
    res.status(500).json({ message: "Server error deleting property" });
  }
};

exports.markPropertyAsRented = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    property.isRented = true;
    await property.save();

    res.json({ message: "Property marked as rented" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    console.log(req.params);
    const property = await Property.findById(req.params.id);
    console.log(property);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
