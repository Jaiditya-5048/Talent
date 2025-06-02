const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pin: {
    type: Boolean,
    default: false
  },
  categories: [{
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    order: {
      type: Number,
      required: true,
      default: 0
    }
  }]
}, { timestamps: true });


const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
