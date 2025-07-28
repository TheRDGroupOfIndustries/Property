require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const app = express();
// Connect Database
connectDB();

// Middleware
app.use(cors({ origin: "https://property5.vercel.app" }));
app.use(express.json());



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes);

// Default route
app.get('/', (req, res) => res.send('Property Listing API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started On : http://localhost:${PORT}`));