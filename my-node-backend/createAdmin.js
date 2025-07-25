require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

const createAdmin = async () => {
  await connectDB();
  const email = 'hetvi1@gmail.com';
  const password = '122333';

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const admin = new Admin({ email, password });
  await admin.save();
  console.log('Admin created successfully');
  process.exit(0);
}

createAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});