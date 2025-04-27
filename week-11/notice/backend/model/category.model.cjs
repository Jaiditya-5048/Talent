const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true
  },
  counter: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
