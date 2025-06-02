const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../model/category.model.cjs')

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log('MongoDB connected');
        createDefaultCategory();
      })
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // exit process with failure
  }
};

const createDefaultCategory = async () => {
  const existing = await Category.findOne({ category: 'General' });
  if (!existing) {
    await Category.create({ category: 'General' });
    console.log('Default "General" category created');
  }
};


module.exports = connectDB;

